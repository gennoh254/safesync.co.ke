
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  Shield,
  MapPin,
  Clock,
  Bell,
  CheckCircle,
} from 'lucide-react';

const workflows = {
  client: [
    { id: 1, title: 'Alert', icon: Shield, screenshot: '/assets/client1.png' },
    { id: 2, title: 'Track', icon: MapPin, screenshot: '/assets/client2.png' },
    { id: 3, title: 'Wait for Respond', icon: Clock, screenshot: '/assets/client3.png' },
  ],
  responder: [
    { id: 1, title: 'Receive', icon: Bell, screenshot: '/assets/responder1.png' },
    { id: 2, title: 'Track', icon: MapPin, screenshot: '/assets/responder2.png' },
    { id: 3, title: 'Resolve', icon: CheckCircle, screenshot: '/assets/responder3.png' },
  ],
};

const mantras = ['PROTECT', 'ALERT', 'RESPOND'];

function TypewriterMantra() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(mantras[wordIndex]);
      return;
    }

    const currentWord = mantras[wordIndex];

    // Typing and deleting speed
    const typingSpeed = 100;
    const deletingSpeed = 60;

    // Total time allocated to each word: 2 seconds
    const cycleDuration = 3000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % mantras.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, shouldReduceMotion]);

  return (
    <div
      className="mb-7 flex min-h-[52px] items-center gap-2"
      aria-label={`SafeSync: ${mantras[wordIndex]}`}
    >
      <span className="text-sm font-bold tracking-[0.25em] text-white/90 sm:text-base">
        SAFESYNC
      </span>

      <span className="text-xl font-bold text-[#ED111C]">|</span>

      <span className="min-w-[155px] text-xl font-extrabold tracking-[0.12em] text-white sm:text-2xl md:text-3xl">
        {displayText}

        {!shouldReduceMotion && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-1 inline-block text-[#ED111C]"
          >
            |
          </motion.span>
        )}
      </span>
    </div>
  );
}

export default function SafeSyncHero() {
  const [activeView, setActiveView] = useState<'client' | 'responder'>('client');
  const [activeStep, setActiveStep] = useState(0);

  const steps = workflows[activeView];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 md:px-32">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/mission2.jpg')] bg-cover bg-center bg-no-repeat bg-fixed" />

      {/* Original SafeSync Red Overlay */}
      <div className="absolute inset-0 z-0 bg-red-900/70" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span>KENYA'S EMERGENCY RESPONSE CONCIERGE</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tighter text-white md:text-6xl">
            <span
              style={{
                WebkitTextStroke: '1px white',
                color: 'transparent',
              }}
            >
              Real-Time Emergency
            </span>{' '}
            Response
          </h1>

          {/* Animated SafeSync Mantra */}
          <TypewriterMantra />

          {/* Description */}
          <p className="mb-10 max-w-xl text-lg leading-8 text-white/90">
            SafeSync helps modern organizations respond faster to fire and
            medical emergencies through real-time alerts, GPS tracking,
            and seamless coordination.
          </p>

          {/* Download Buttons */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <div className="flex gap-4">

              {/* App Store */}
              <a
                href="#"
                className="flex h-12 items-center gap-3 rounded-xl border border-white/20 bg-black px-4 text-white transition-transform hover:scale-105"
              >
                <img
                  src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/apple-logo_dcz0jz"
                  alt="App Store"
                  className="h-8 w-8"
                />

                <div className="text-xs">
                  <div className="text-[10px] opacity-70">Download on</div>
                  <div className="font-bold">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="flex h-12 items-center gap-3 rounded-xl border border-white/20 bg-black px-4 text-white transition-transform hover:scale-105"
              >
                <img
                  src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/playstore_ae7fqk"
                  alt="Google Play"
                  className="h-8 w-8"
                />

                <div className="text-xs">
                  <div className="text-[10px] opacity-70">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </a>

            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - APP SHOWCASE */}
        <div className="relative flex w-full flex-col items-center justify-center gap-8 justify-self-center py-10 md:py-0">

          {/* Client / Responder Selector */}
          <div className="mx-auto mb-4 flex w-fit rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm">

            <button
              onClick={() => {
                setActiveView('client');
                setActiveStep(0);
              }}
              className={`rounded-full px-6 py-2 font-bold transition-all ${
                activeView === 'client'
                  ? 'bg-white text-[#0B1F3A]'
                  : 'text-white'
              }`}
            >
              Client
            </button>

            <button
              onClick={() => {
                setActiveView('responder');
                setActiveStep(0);
              }}
              className={`rounded-full px-6 py-2 font-bold transition-all ${
                activeView === 'responder'
                  ? 'bg-white text-[#0B1F3A]'
                  : 'text-white'
              }`}
            >
              Responder
            </button>

          </div>

          <div className="relative flex flex-col items-center">

            {/* Workflow Steps */}
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`absolute z-20 flex items-center gap-4 font-bold text-white transition-all ${
                  activeStep === idx ? 'scale-110' : 'opacity-70'
                }`}
                style={{
                  top: idx === 0 ? '10%' : idx === 1 ? '45%' : '80%',
                  left: idx % 2 === 0 ? '-10rem' : 'auto',
                  right: idx % 2 !== 0 ? '-10rem' : 'auto',
                }}
              >
                {idx % 2 === 0 && (
                  <span className="text-sm">
                    {step.id}. {step.title}
                  </span>
                )}

                <div
                  className={`rounded-full border p-4 backdrop-blur-md ${
                    activeStep === idx
                      ? 'border-[#ED111C] bg-[#ED111C]/20'
                      : 'border-white/10 bg-white/20'
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                </div>

                {idx % 2 !== 0 && (
                  <span className="text-sm">
                    {step.id}. {step.title}
                  </span>
                )}

                {/* Connecting Line */}
                <div
                  className={`absolute top-1/2 h-0.5 w-16 bg-white/30 ${
                    idx % 2 === 0 ? 'left-full' : 'right-full'
                  }`}
                />
              </button>
            ))}

            {/* Floating Phone */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
              className="relative z-10 h-[550px] w-[280px] overflow-hidden rounded-[3rem] border-8 border-gray-900 bg-gray-800 shadow-2xl"
            >
              <div className="absolute inset-x-8 top-0 z-10 h-4 rounded-b-xl bg-gray-900" />

              <img
                key={`${activeView}-${activeStep}`}
                src={steps[activeStep].screenshot}
                alt={`${activeView} app screen - ${steps[activeStep].title}`}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
