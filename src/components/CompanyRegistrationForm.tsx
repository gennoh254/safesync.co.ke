import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle, Loader2, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://api.safesync.co.ke/api/v1';

// Limits mirror the backend schema (app/modules/organizations/schemas.py).
const MAX_TEXT_LEN = 200;
const MAX_ADDRESS_LEN = 500;
const MAX_PHONE_LEN = 30;
const PHONE_PREFIX = '+254';

// ---- Payment config -------------------------------------------------------
const PLANS = {
  semiannual: { label: 'Semi-annual', period: '6 months', price: 6000 },
  annual: { label: 'Annual', period: '12 months', price: 12000 },
} as const;
type PlanKey = keyof typeof PLANS;
type PayMethod = 'mpesa' | 'card';

/** Server-side view of what this organisation owes (GET /payments/onboarding/plans). */
interface Quote {
  plans: { code: PlanKey; name: string; period_months: number; total: number }[];
  locked_plan: PlanKey | null; // set once a part payment exists
  paid: number;
  min_part_payment: number;
}

const MIN_PART_PAYMENT = 500; // smallest instalment (KSh). Adjust to taste.
const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 100; // ~5 minutes (matches the M-Pesa prompt expiry)
const MPESA_RE = /^(?:\+?254|0)?[17]\d{8}$/;

type OrganizationType = 'client' | 'service_provider';
type ServiceSubProviderType = 'medical' | 'fire';
type OwnershipType = 'public' | 'private';
type Step = 'details' | 'payment' | 'challenge' | 'waiting' | 'done';

interface FormState {
  organizationName: string;
  organizationType: OrganizationType;
  serviceProviderSubtype: ServiceSubProviderType;
  ownershipType: OwnershipType;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  phone: string;
  address: string;
}

const INITIAL_STATE: FormState = {
  organizationName: '',
  organizationType: 'client',
  serviceProviderSubtype: 'medical',
  ownershipType: 'public',
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
  phone: `${PHONE_PREFIX} `,
  address: '',
};

/** Shape of every payment response from the backend (ChargeResponse). */
interface ChargeResponse {
  reference: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  next_action?: 'send_pin' | 'send_otp' | 'send_phone' | 'send_birthday' | 'open_url' | 'pay_offline' | null;
  display_text?: string | null;
  url?: string | null;
  reason?: string | null;
}

const CHALLENGE_COPY: Record<string, { title: string; placeholder: string; secret?: boolean }> = {
  send_pin: { title: 'Enter your card PIN', placeholder: 'Card PIN', secret: true },
  send_otp: { title: 'Enter the OTP sent to you', placeholder: 'One-time password' },
  send_phone: { title: 'Enter your phone number', placeholder: '+254 7...' },
  send_birthday: { title: 'Enter your date of birth', placeholder: 'YYYY-MM-DD' },
};

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * FastAPI returns `detail` as a string for our own errors (409, 500, ...)
 * and as an array of { loc, msg } objects for validation errors (422).
 */
function extractErrorMessage(body: unknown, fallback = 'Something went wrong. Please try again.'): string {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const messages = detail
      .map((item) => (item as { msg?: unknown })?.msg)
      .filter((msg): msg is string => typeof msg === 'string')
      .map((msg) => msg.replace(/^Value error,\s*/i, ''));
    if (messages.length > 0) return messages.join(' ');
  }
  return fallback;
}

async function api<T>(path: string, init?: RequestInit, fallback?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(extractErrorMessage(body, fallback));
  return body as T;
}

export default function CompanyRegistrationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [step, setStep] = useState<Step>('details');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Payment state
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanKey>('annual');
  const [method, setMethod] = useState<PayMethod>('mpesa');
  const [payMode, setPayMode] = useState<'full' | 'part'>('full');
  const [partAmount, setPartAmount] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paidTotal, setPaidTotal] = useState(0);
  const [notice, setNotice] = useState('');
  const [challenge, setChallenge] = useState<{ action: string; text?: string | null; url?: string | null } | null>(null);
  const [challengeValue, setChallengeValue] = useState('');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const referenceRef = useRef('');
  const payingRef = useRef(0);

  const stopPolling = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  useEffect(() => stopPolling, []);

  const planTotal = (key: PlanKey) => quote?.plans.find((p) => p.code === key)?.total ?? PLANS[key].price;
  const total = planTotal(plan);
  const remaining = Math.max(0, total - paidTotal);
  const minPart = Math.min(quote?.min_part_payment ?? MIN_PART_PAYMENT, remaining);

  const loadQuote = async (orgId: string | null = organizationId): Promise<Quote | null> => {
    if (!orgId) return null;
    try {
      const q = await api<Quote>(`/payments/onboarding/plans?organization_id=${encodeURIComponent(orgId)}`);
      setQuote(q);
      setPaidTotal(q.paid);
      if (q.locked_plan) setPlan(q.locked_plan);
      return q;
    } catch {
      return null; // fall back to the built-in prices; the server still enforces the real amounts
    }
  };

  // ---- Step 1: register -----------------------------------------------------
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith(PHONE_PREFIX)) {
      val = `${PHONE_PREFIX} ` + val.replace(/^\+?254\s*/, '');
    }
    setFormData((prev) => ({ ...prev, phone: val }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    void registerOrg(true);
  };

  /** thenPay=false is the original behaviour: register, show the success screen, pay later. */
  const registerOrg = async (thenPay: boolean) => {
    setError('');

    // Already registered: never register twice.
    if (organizationId) {
      setStep(thenPay ? 'payment' : 'done');
      return;
    }

    setSubmitting(true);
    const phone = formData.phone.trim();
    const phoneProvided = phone.replace(/\s/g, '') !== PHONE_PREFIX;
    const address = formData.address.trim();

    try {
      const res = await api<{ organization_id?: string; id?: string }>(
        '/organizations/register',
        {
          method: 'POST',
          body: JSON.stringify({
            organization_name: formData.organizationName.trim(),
            organization_type: formData.organizationType,
            ...(formData.organizationType === 'service_provider' && {
              service_provider_type: formData.serviceProviderSubtype,
              ownership_type: formData.ownershipType,
            }),
            phone: phoneProvided ? phone : null,
            address: address || null,
            admin_first_name: formData.adminFirstName.trim(),
            admin_last_name: formData.adminLastName.trim(),
            admin_email: formData.adminEmail.trim(),
          }),
        },
        'Registration failed. Please check your information and try again.'
      );
      const orgId = res.organization_id ?? res.id ?? null;
      setOrganizationId(orgId);
      if (!thenPay) return setStep('done');
      if (!orgId) return setStep('done'); // registered, but can't start a payment: pay after logging in
      if (phoneProvided) setMpesaPhone(phone.replace(/\s/g, ''));
      await loadQuote(orgId);
      setStep('payment');
    } catch (err) {
      console.error('Error registering organization:', err);
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Step 2: pay ----------------------------------------------------------
  const settle = async (res: ChargeResponse) => {
    if (res.status === 'SUCCESS') {
      stopPolling();
      setReceipt(res.reference);
      setChallenge(null);
      setChallengeValue('');
      // The server is the source of truth for what has been paid so far.
      const q = await loadQuote();
      const newPaid = q?.paid ?? paidTotal + payingRef.current;
      const totalNow = q?.plans.find((p) => p.code === plan)?.total ?? total;
      setPaidTotal(newPaid);
      if (newPaid >= totalNow) {
        setStep('done');
      } else {
        setNotice(`KSh ${fmt(payingRef.current)} received. Balance remaining: KSh ${fmt(totalNow - newPaid)}.`);
        setPayMode('full');
        setPartAmount('');
        setStep('payment');
      }
      return;
    }
    if (res.status === 'FAILED') {
      stopPolling();
      setChallenge(null);
      setError(res.reason || 'Payment was not completed.');
      setStep('payment');
      return;
    }
    // PENDING
    const action = res.next_action;
    if (action && CHALLENGE_COPY[action]) {
      setChallenge({ action, text: res.display_text });
      setChallengeValue('');
      setStep('challenge');
    } else if (action === 'open_url' && res.url) {
      window.open(res.url, '_blank', 'noopener');
      setChallenge({ action, url: res.url, text: res.display_text });
      setStep('challenge');
      startPolling();
    } else {
      setStep('waiting');
      startPolling();
    }
  };

  const startPolling = () => {
    stopPolling();
    let tries = 0;
    timer.current = setInterval(async () => {
      tries += 1;
      try {
        const s = await api<ChargeResponse>(`/payments/onboarding/status/${referenceRef.current}`);
        if (s.status !== 'PENDING') settle({ ...s, reference: referenceRef.current });
      } catch {
        /* transient network error, keep polling */
      }
      if (tries >= MAX_POLLS) {
        stopPolling();
        setChallenge(null);
        setError("We didn't receive a confirmation. If money was deducted, it will reflect shortly.");
        setStep('payment');
      }
    }, POLL_INTERVAL_MS);
  };

  const validatePayment = (): { amount: number; body: Record<string, unknown> } | string => {
    const amount = payMode === 'full' ? remaining : parseInt(partAmount, 10);
    if (!amount || amount < minPart) return `Minimum payment is KSh ${fmt(minPart)}.`;
    if (amount > remaining) return `You only owe KSh ${fmt(remaining)}.`;

    const body: Record<string, unknown> = { organization_id: organizationId, plan, amount, method };

    if (method === 'mpesa') {
      if (!MPESA_RE.test(mpesaPhone.replace(/[\s-]/g, ''))) {
        return 'Enter a valid M-Pesa number, e.g. 0712 345 678.';
      }
      body.phone = mpesaPhone;
    } else {
      const number = cardNumber.replace(/\D/g, '');
      const [mm, yy] = cardExpiry.split('/').map((s) => parseInt(s, 10));
      if (number.length < 12 || number.length > 19) return "That card number doesn't look right.";
      if (!mm || mm < 1 || mm > 12 || Number.isNaN(yy)) return 'Enter the expiry as MM/YY.';
      if (!/^\d{3,4}$/.test(cardCvv)) return 'Enter the 3 or 4 digit security code.';
      body.card = { number, cvv: cardCvv, expiry_month: mm, expiry_year: yy };
    }
    return { amount, body };
  };

  const handlePay = async () => {
    setError('');
    setNotice('');
    if (!organizationId) return setError('Registration is incomplete. Please go back and try again.');

    const check = validatePayment();
    if (typeof check === 'string') return setError(check);

    setSubmitting(true);
    try {
      const res = await api<ChargeResponse>('/payments/onboarding/pay', {
        method: 'POST',
        body: JSON.stringify(check.body),
      });
      payingRef.current = check.amount;
      referenceRef.current = res.reference;
      setCardNumber('');
      setCardCvv(''); // never keep card details around once they've been sent
      settle(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChallengeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge || !challengeValue.trim()) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await api<ChargeResponse>(`/payments/onboarding/charge/${referenceRef.current}/step`, {
        method: 'POST',
        body: JSON.stringify({ step: challenge.action.replace('send_', ''), value: challengeValue.trim() }),
      });
      settle(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Styling --------------------------------------------------------------
  const inputClass = `w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${
    isDark
      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
  }`;
  const labelClass = `text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
    isDark ? 'text-slate-400' : 'text-slate-600'
  }`;
  const mutedClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const optionClass = (active: boolean, accent: 'dark' | 'green' = 'dark') =>
    `min-h-[48px] px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
      active
        ? accent === 'green'
          ? isDark ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-emerald-600 text-white border-emerald-600'
          : isDark ? 'bg-slate-100 text-slate-900 border-slate-100' : 'bg-slate-900 text-white border-slate-900'
        : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
    }`;
  const primaryBtn = `w-full min-h-[48px] p-4 font-bold rounded-xl transition-all shadow-lg disabled:opacity-60 ${
    isDark ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-slate-900 text-white hover:bg-slate-800'
  }`;

  const busy = step === 'waiting' || step === 'challenge';
  const heading =
    step === 'details' || step === 'done' ? 'Register Your Organization' : 'Activate Your Subscription';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className={`${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        } p-6 sm:p-10 rounded-3xl max-w-lg w-full relative my-auto shadow-2xl border`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-4 right-4 p-2 z-10 rounded-full transition-colors ${
            isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
        >
          <X size={24} />
        </button>

        <div className="mb-8 flex flex-col items-center justify-center">
          <a href="#" className="flex items-center justify-center mb-3">
            <img
              src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/safesync-logo_ooeqqg"
              alt="SafeSync Logo"
              className="h-12 sm:h-14 object-contain"
            />
          </a>
          <h2 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {heading}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {/* ------------------------------------------------------ DONE */}
          {step === 'done' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-8 rounded-2xl flex flex-col items-center justify-center text-center ${
                isDark ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              <CheckCircle className="w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold mb-2">You're Onboarded!</h3>
              <p>
                {paidTotal > 0 && (
                  <>
                    Payment of <strong>KSh {fmt(paidTotal)}</strong> received{receipt ? ` (receipt ${receipt})` : ''}
                    {paidTotal < total ? `; KSh ${fmt(total - paidTotal)} still due` : ''}.{' '}
                  </>
                )}
                Check <strong>{formData.adminEmail}</strong> for confirmation. You can log in to SafeSync anytime
                with this email — we'll send a verification code to it.
              </p>
            </motion.div>
          )}

          {/* ------------------------------------------------- WAITING */}
          {step === 'waiting' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center gap-3 py-6"
            >
              <Loader2 className={`w-10 h-10 animate-spin ${isDark ? 'text-white' : 'text-slate-900'}`} />
              <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {method === 'mpesa' ? 'Check your phone' : 'Processing payment'}
              </h3>
              <p className={`text-sm ${mutedClass}`}>
                {method === 'mpesa'
                  ? 'Enter your M-Pesa PIN on the prompt to complete the payment.'
                  : 'Please wait while we confirm your payment.'}
              </p>
            </motion.div>
          )}

          {/* ----------------------------------------------- CHALLENGE */}
          {step === 'challenge' && challenge && (
            <motion.form
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleChallengeSubmit}
              className="space-y-4"
            >
              {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}

              {challenge.action === 'open_url' ? (
                <div className="flex flex-col items-center text-center gap-3">
                  <Loader2 className={`w-10 h-10 animate-spin ${isDark ? 'text-white' : 'text-slate-900'}`} />
                  <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Complete verification with your bank
                  </h3>
                  <p className={`text-sm ${mutedClass}`}>
                    A secure bank page opened in a new tab. Finish there and this window will update automatically.
                  </p>
                  {challenge.url && (
                    <a
                      href={challenge.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold underline"
                    >
                      Didn't open? Click here
                    </a>
                  )}
                </div>
              ) : (
                <>
                  <label className={labelClass}>{CHALLENGE_COPY[challenge.action].title}</label>
                  {challenge.text && <p className={`text-sm ${mutedClass}`}>{challenge.text}</p>}
                  <input
                    autoFocus
                    required
                    type={CHALLENGE_COPY[challenge.action].secret ? 'password' : 'text'}
                    inputMode={challenge.action === 'send_birthday' ? 'text' : 'numeric'}
                    placeholder={CHALLENGE_COPY[challenge.action].placeholder}
                    value={challengeValue}
                    onChange={(e) => setChallengeValue(e.target.value)}
                    className={inputClass}
                  />
                  <button type="submit" disabled={submitting} className={primaryBtn}>
                    {submitting ? 'Verifying...' : 'Continue →'}
                  </button>
                </>
              )}
            </motion.form>
          )}

          {/* -------------------------------------------------- PAYMENT */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              <p className={`text-sm text-center ${mutedClass}`}>
                <strong>{formData.organizationName}</strong> is registered. Choose a plan and pay now, in full or in
                part.
              </p>

              {notice && (
                <p className={`p-3 rounded-xl text-sm font-medium text-center ${
                  isDark ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {notice}
                </p>
              )}
              {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}

              {/* Plan */}
              <div className="space-y-1.5">
                <label className={labelClass}>Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(PLANS) as PlanKey[]).map((key) => (
                    <button
                      type="button"
                      key={key}
                      disabled={paidTotal > 0}
                      onClick={() => {
                        setPlan(key);
                        setPayMode('full');
                        setPartAmount('');
                      }}
                      className={`${optionClass(plan === key)} disabled:opacity-60 flex flex-col items-center`}
                    >
                      <span>{PLANS[key].label}</span>
                      <span className="text-xs font-normal opacity-80">
                        KSh {fmt(planTotal(key))} / {PLANS[key].period}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <label className={labelClass}>Amount to pay now</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setPayMode('full')} className={optionClass(payMode === 'full', 'green')}>
                    {paidTotal > 0 ? 'Pay balance' : 'Pay in full'} · KSh {fmt(remaining)}
                  </button>
                  <button type="button" onClick={() => setPayMode('part')} className={optionClass(payMode === 'part', 'green')}>
                    Pay part
                  </button>
                </div>
                {payMode === 'part' && (
                  <>
                    <input
                      inputMode="numeric"
                      placeholder={`Amount (min KSh ${fmt(minPart)})`}
                      value={partAmount}
                      onChange={(e) => setPartAmount(e.target.value.replace(/\D/g, ''))}
                      className={inputClass}
                    />
                    <div className="flex gap-2">
                      {[0.25, 0.5, 0.75].map((f) => {
                        const v = Math.round((remaining * f) / 100) * 100;
                        return v >= minPart && v < remaining ? (
                          <button
                            type="button"
                            key={f}
                            onClick={() => setPartAmount(String(v))}
                            className={`flex-1 min-h-[38px] rounded-xl border text-xs font-bold ${
                              partAmount === String(v)
                                ? 'border-emerald-600 text-emerald-600'
                                : isDark ? 'border-slate-700 text-slate-300' : 'border-slate-200 text-slate-600'
                            }`}
                          >
                            {fmt(v)}
                          </button>
                        ) : null;
                      })}
                    </div>
                    <p className={`text-xs ${mutedClass}`}>
                      Balance after this payment: KSh{' '}
                      {fmt(Math.max(0, remaining - (parseInt(partAmount, 10) || 0)))}
                    </p>
                  </>
                )}
              </div>

              {/* Method */}
              <div className="space-y-1.5">
                <label className={labelClass}>Pay with</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setMethod('mpesa')} className={`${optionClass(method === 'mpesa')} flex items-center justify-center gap-2`}>
                    <Smartphone size={18} /> M-Pesa
                  </button>
                  <button type="button" onClick={() => setMethod('card')} className={`${optionClass(method === 'card')} flex items-center justify-center gap-2`}>
                    <CreditCard size={18} /> Bank card
                  </button>
                </div>
              </div>

              {method === 'mpesa' ? (
                <div className="space-y-1.5">
                  <label className={labelClass}>M-Pesa phone number</label>
                  <input
                    type="tel"
                    placeholder="0712 345 678"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Card number</label>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      maxLength={23}
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(
                          e.target.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim()
                        )
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Expiry</label>
                      <input
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          const d = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setCardExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                        }}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelClass}>CVV</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button type="button" onClick={handlePay} disabled={submitting} className={primaryBtn}>
                {submitting
                  ? 'Processing...'
                  : `Pay KSh ${fmt(payMode === 'full' ? remaining : parseInt(partAmount, 10) || 0)} →`}
              </button>

              <p className={`text-xs text-center flex items-center justify-center gap-1 ${mutedClass}`}>
                <ShieldCheck size={14} /> Secured by Paystack. We never store your card number, CVV or PIN.
              </p>

              <button
                type="button"
                onClick={() => setStep('done')}
                className={`w-full text-sm font-semibold underline ${mutedClass}`}
              >
                {paidTotal > 0 ? "I'll pay the rest later" : "I'll pay later"}
              </button>
            </motion.div>
          )}

          {/* --------------------------------------------------- DETAILS */}
          {step === 'details' && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleRegister}
              className="space-y-5"
            >
              {error && <p className="text-red-500 mb-4 text-center text-sm font-medium">{error}</p>}

              <div className="space-y-1.5">
                <label className={labelClass}>
                  Organization Type <span className="text-red-500">●</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: 'client', label: 'Needs emergency services' },
                      { value: 'service_provider', label: 'Provides emergency services' },
                    ] as const
                  ).map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setFormData((prev) => ({ ...prev, organizationType: opt.value }))}
                      className={optionClass(formData.organizationType === opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Sub-type field for Service Providers */}
              <AnimatePresence>
                {formData.organizationType === 'service_provider' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    <label className={labelClass}>
                      Service Category <span className="text-red-500">●</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { value: 'medical', label: 'Medical Service Provider' },
                          { value: 'fire', label: 'Fire Service Provider' },
                        ] as const
                      ).map((subOpt) => (
                        <button
                          type="button"
                          key={subOpt.value}
                          onClick={() => setFormData((prev) => ({ ...prev, serviceProviderSubtype: subOpt.value }))}
                          className={optionClass(formData.serviceProviderSubtype === subOpt.value, 'green')}
                        >
                          {subOpt.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5 pt-3">
                      <label className={labelClass}>
                        Ownership <span className="text-red-500">●</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(
                          [
                            { value: 'public', label: 'Public / Government' },
                            { value: 'private', label: 'Private' },
                          ] as const
                        ).map((ownOpt) => (
                          <button
                            type="button"
                            key={ownOpt.value}
                            onClick={() => setFormData((prev) => ({ ...prev, ownershipType: ownOpt.value }))}
                            className={optionClass(formData.ownershipType === ownOpt.value, 'green')}
                          >
                            {ownOpt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className={labelClass}>
                  Organization Name <span className="text-red-500">●</span>
                </label>
                <input
                  required
                  maxLength={MAX_TEXT_LEN}
                  placeholder="Organization Name"
                  value={formData.organizationName}
                  className={inputClass}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organizationName: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    First Name <span className="text-red-500">●</span>
                  </label>
                  <input
                    required
                    maxLength={MAX_TEXT_LEN}
                    placeholder="First Name"
                    value={formData.adminFirstName}
                    className={inputClass}
                    onChange={(e) => setFormData((prev) => ({ ...prev, adminFirstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Last Name <span className="text-red-500">●</span>
                  </label>
                  <input
                    required
                    maxLength={MAX_TEXT_LEN}
                    placeholder="Last Name"
                    value={formData.adminLastName}
                    className={inputClass}
                    onChange={(e) => setFormData((prev) => ({ ...prev, adminLastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>
                  Email <span className="text-red-500">●</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={formData.adminEmail}
                  className={inputClass}
                  onChange={(e) => setFormData((prev) => ({ ...prev, adminEmail: e.target.value }))}
                />
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  This becomes the login for your organization's super admin account.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  maxLength={MAX_PHONE_LEN}
                  placeholder="+254 7..."
                  value={formData.phone}
                  className={inputClass}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>Address</label>
                <input
                  maxLength={MAX_ADDRESS_LEN}
                  placeholder="Address / Location"
                  value={formData.address}
                  className={inputClass}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <button type="submit" disabled={submitting} className={primaryBtn}>
                {submitting ? 'Registering...' : 'Register & pay now →'}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={(e) => {
                  const form = (e.currentTarget as HTMLButtonElement).form;
                  if (form?.reportValidity()) void registerOrg(false);
                }}
                className={`w-full min-h-[48px] p-4 font-bold rounded-xl border transition-all disabled:opacity-60 ${
                  isDark
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Register without paying
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {busy && <p className={`mt-6 text-xs text-center ${mutedClass}`}>Please don't close this window.</p>}
      </div>
    </div>
  );
}