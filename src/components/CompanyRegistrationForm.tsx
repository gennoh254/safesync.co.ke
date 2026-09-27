import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.safesync.co.ke';

type OrganizationType = 'client' | 'service_provider';

interface FormState {
  organizationName: string;
  organizationType: OrganizationType;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  phone: string;
  address: string;
}

const INITIAL_STATE: FormState = {
  organizationName: '',
  organizationType: 'client',
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
  phone: '+254 ',
  address: '',
};

export default function CompanyRegistrationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+254')) {
      val = '+254 ' + val.replace(/^\+254\s*/, '');
    }
    setFormData((prev) => ({ ...prev, phone: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/organizations/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_name: formData.organizationName,
          organization_type: formData.organizationType,
          phone: formData.phone,
          address: formData.address,
          admin_first_name: formData.adminFirstName,
          admin_last_name: formData.adminLastName,
          admin_email: formData.adminEmail,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.detail ?? 'Registration failed. Please check your information and try again.'
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error registering organization:', err);
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${
    isDark
      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
  }`;
  const labelClass = `text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
    isDark ? 'text-slate-400' : 'text-slate-600'
  }`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className={`${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        } p-6 sm:p-10 rounded-3xl max-w-lg w-full relative my-auto shadow-2xl border`}
      >
        <button
          onClick={onClose}
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
            Register Your Organization
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
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
                Check <strong>{formData.adminEmail}</strong> for confirmation. You can log in to SafeSync
                anytime with this email — we'll send a verification code to it.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
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
                      className={`min-h-[48px] px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
                        formData.organizationType === opt.value
                          ? isDark
                            ? 'bg-slate-100 text-slate-900 border-slate-100'
                            : 'bg-slate-900 text-white border-slate-900'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={labelClass}>
                  Organization Name <span className="text-red-500">●</span>
                </label>
                <input
                  required
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
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Phone Number
                </label>
                <input
                  placeholder="+254 7..."
                  value={formData.phone}
                  className={inputClass}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Address
                </label>
                <input
                  placeholder="Address / Location"
                  value={formData.address}
                  className={inputClass}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full min-h-[48px] p-4 font-bold rounded-xl transition-all shadow-lg disabled:opacity-60 ${
                  isDark ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {submitting ? 'Registering...' : 'Register →'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}