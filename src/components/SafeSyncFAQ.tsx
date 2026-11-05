import { useState } from 'react';
import {
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faq = [
  {
    q: 'How do I request assistance through SafeSync?',
    a: 'Simply sign in to your SafeSync account, select the service you need, share your location, provide the required details and submit your request. SafeSync helps connect you with available service providers and keeps you informed as your request progresses.',
  },
  {
    q: 'How does SafeSync use my location?',
    a: 'Your location helps service providers identify where assistance is needed. When you submit a request, SafeSync uses the location information you share to facilitate coordination and help responders reach you.',
  },
  {
    q: 'Can I track my service request?',
    a: 'Yes. SafeSync is designed to provide updates on your request, helping you stay informed about its progress and the response process.',
  },
  {
    q: 'Where is SafeSync currently available?',
    a: 'SafeSync is currently focused on Nairobi, Kenya, with plans to expand into other locations. Service availability may vary depending on the area and participating service providers.',
  },
  {
    q: 'Is SafeSync free to download?',
    a: 'Yes. The SafeSync application is free to download on supported app stores. Any applicable service charges will depend on the service requested and the relevant provider.',
  },
  {
    q: 'How can my organization partner with SafeSync?',
    a: 'Organizations interested in joining the SafeSync network can contact our team through the partnership enquiry section. Our team can guide you through the onboarding process, registration requirements and integration opportunities.',
  },
  {
    q: 'How can I become a verified service provider or responder?',
    a: 'Service providers interested in joining SafeSync can submit a partnership enquiry through our website. Our team will guide you through the registration, verification and onboarding process.',
  },
  {
    q: 'How does SafeSync protect my information?',
    a: 'We recognize the importance of personal information, particularly when sharing location details during an emergency. SafeSync is designed with data protection and privacy in mind, and we handle information in accordance with our Privacy Policy and applicable data protection requirements.',
  },
  {
    q: 'What should I do while waiting for assistance?',
    a: 'Remain in a safe location whenever possible, keep your phone accessible and follow any relevant instructions from emergency personnel. If you are facing immediate danger or a life-threatening emergency, contact the appropriate emergency services directly.',
  },
];

// Pure SVG Emergency Response Illustration (Stands on its own without background card)
function EmergencyResponseIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of emergency medical response and ambulance"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <clipPath id="arch-clip">
            <path d="M40 0 H440 C462 0 480 18 480 40 V400 C480 444 444 480 400 480 H40 C17.9 480 0 462 0 440 V40 C0 17.9 17.9 0 40 0 Z" />
          </clipPath>
          <filter id="card-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0B1F3A" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Clipped Container with Arch/Rounded Corners Matching the Design */}
        <g clipPath="url(#arch-clip)">
          {/* Background Sky / Environment */}
          <rect width="480" height="480" fill="#E2E8F0" />
          
          {/* Distant Trees & Buildings Horizon */}
          <path d="M0 260 L80 230 L160 245 L240 210 L320 235 L400 200 L480 225 V480 H0 Z" fill="#CBD5E1" />
          <path d="M0 300 L120 270 L260 285 L380 255 L480 280 V480 H0 Z" fill="#94A3B8" />

          {/* Ambulance Van Silhouette & Details in Background */}
          <g transform="translate(140, 170)">
            <rect x="0" y="40" width="280" height="150" rx="20" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M190 40 L250 90 H280 V170 H190 V40 Z" fill="#E2E8F0" />
            <circle cx="70" cy="190" r="26" fill="#0B1F3A" />
            <circle cx="70" cy="190" r="12" fill="#64748B" />
            <circle cx="220" cy="190" r="26" fill="#0B1F3A" />
            <circle cx="220" cy="190" r="12" fill="#64748B" />
            <rect x="55" y="85" width="30" height="10" fill="#ED111C" rx="2" />
            <rect x="65" y="75" width="10" height="30" fill="#ED111C" rx="2" />
            <path d="M0 115 H280 V145 H0 Z" fill="#ED111C" fillOpacity="0.1" />
            <path d="M20 115 H140 V145 H20 Z" fill="#ED111C" />
            <rect x="110" y="26" width="60" height="14" rx="4" fill="#0B1F3A" />
            <rect x="115" y="20" width="22" height="10" rx="3" fill="#38BDF8" />
            <rect x="143" y="20" width="22" height="10" rx="3" fill="#ED111C" />
          </g>

          {/* Foreground Ground Curve */}
          <path d="M-50 350 Q120 310 280 370 T530 380 V500 H-50 Z" fill="#334155" />
          <path d="M-20 370 Q150 330 320 400 T500 410 V500 H-20 Z" fill="#0B1F3A" />

          {/* Responder & Patient Graphic */}
          <g transform="translate(30, 280)">
            <rect x="20" y="80" width="160" height="60" rx="15" fill="#475569" />
            <circle cx="45" cy="100" r="18" fill="#D97706" />
            <path d="M100 20 L135 60 L120 110 H80 L70 60 Z" fill="#ED111C" />
            <path d="M100 20 L115 50 L100 70 L85 50 Z" fill="#0B1F3A" />
            <circle cx="100" cy="45" r="8" fill="white" />
            <rect x="97" y="42" width="6" height="2" fill="#ED111C" />
            <rect x="99" y="40" width="2" height="6" fill="#ED111C" />
            <circle cx="100" cy="-2" r="14" fill="#3F2514" />
            <path d="M86 0 C86 -12 114 -12 114 0 Z" fill="#1E1E1E" />
            <rect x="145" y="80" width="45" height="38" rx="6" fill="#ED111C" />
            <rect x="160" y="74" width="15" height="8" rx="2" fill="#0B1F3A" />
            <rect x="157" y="92" width="21" height="6" rx="2" fill="white" />
            <rect x="164" y="87" width="7" height="16" rx="2" fill="white" />
          </g>

          <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.6" stopColor="#0B1F3A" stopOpacity="0" />
            <stop offset="1" stopColor="#0B1F3A" stopOpacity="0.85" />
          </linearGradient>
          <rect width="480" height="480" fill="url(#vignette)" pointerEvents="none" />
        </g>

        {/* --- FLOATING UI ELEMENTS --- */}

        {/* Top-Left Floating Pill Card */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#card-shadow)"
        >
          <rect x="25" y="30" width="215" height="56" rx="28" fill="white" stroke="#F1F5F9" strokeWidth="1" />
          <circle cx="55" cy="58" r="18" fill="#FEE2E2" />
          <path d="M51 52 H59 V59 C59 61.2 57.2 63 55 63 C52.8 63 51 61.2 51 59 Z" fill="#ED111C" />
          <rect x="49" y="63" width="12" height="3" rx="1.5" fill="#0B1F3A" />
          <path d="M47 48 L49 50 M63 48 L61 50" stroke="#ED111C" strokeWidth="2" strokeLinecap="round" />
          <text x="82" y="52" fill="#0B1F3A" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            Emergency Help
          </text>
          <text x="82" y="66" fill="#64748B" fontSize="10" fontWeight="600" fontFamily="sans-serif">
            When You Need It
          </text>
        </motion.g>

        {/* Bottom Floating Badge */}
        <motion.g
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#card-shadow)"
        >
          <rect x="25" y="395" width="205" height="46" rx="23" fill="#0B1F3A" fillOpacity="0.85" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <circle cx="50" cy="418" r="14" fill="rgba(255,255,255,0.1)" />
          <path d="M50 409 L56 412 V418 C56 421.8 53.5 424.8 50 426 C46.5 424.8 44 421.8 44 418 V412 L50 409Z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M47 418 L49 420 L53 415" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="75" y="422" fill="white" fontSize="11" fontWeight="700" letterSpacing="0.5px" fontFamily="sans-serif">
            Safe • Fast • Reliable
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export default function SafeSyncFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white px-5 py-20 text-[#0B1F3A] sm:px-8 md:px-12 md:py-28 lg:px-20"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#ED111C]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ED111C]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ED111C]">
            <span className="h-2 w-2 rounded-full bg-[#ED111C]" />
            FAQs
          </span>

          <h2 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Frequently Asked
            <span className="block text-[#ED111C]">
              Questions
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
            Find quick answers to common questions about SafeSync,
            our services and how to get started.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Illustration / Image standalone without wrapper card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24 lg:col-span-6"
          >
            <EmergencyResponseIllustration />
          </motion.div>

          {/* Right: Numbered FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="space-y-4">
              {faq.map((item, index) => {
                const isOpen = openItems.includes(index);
                const answerId = `faq-answer-${index}`;

                return (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#ED111C]/30 bg-[#ED111C]/[0.025] shadow-md shadow-[#ED111C]/5'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6 sm:py-6"
                    >
                      <div className="flex items-center gap-4">
                        {/* Numbered Question Icon/Badge */}
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold transition-colors ${
                            isOpen
                              ? 'bg-[#ED111C] text-white shadow-sm shadow-red-500/30'
                              : 'bg-red-50 text-[#ED111C]'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <h4 className={`text-sm font-bold leading-6 sm:text-base ${
                          isOpen ? 'text-[#ED111C]' : 'text-[#0B1F3A]'
                        }`}>
                          {item.q}
                        </h4>
                      </div>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#ED111C] text-white'
                            : 'bg-slate-100 text-[#0B1F3A]'
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={17} />
                        ) : (
                          <Plus size={17} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={answerId}
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: 'easeInOut' },
                            opacity: { duration: 0.25 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:pl-[4.75rem] sm:pr-6">
                            <p className="text-sm leading-8 text-slate-600">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Tagline */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-red-200" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B1F3A]">
                Stay Safe. Stay Connected.
              </p>
              <div className="h-px flex-1 bg-red-200" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}