import { MousePointerClick, MapPin, BellRing, CheckCircle2, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n';


const steps = [
  {
    icon: MousePointerClick,
    title: 'Get Started with SafeSync',
    desc: 'Individuals create personal accounts, while organizations onboard their teams, designate administrators, and configure their emergency response structure.',
  },
  {
    icon: MapPin,
    title: 'Activate an Emergency Alert',
    desc: 'Individual users and organization members can trigger an emergency alert through the SafeSync app and share their GPS location.',
  },
  {
    icon: BellRing,
    title: 'Coordinate the Response',
    desc: 'Relevant response personnel receive alerts and coordinate assistance according to the user’s account type and configured response process.',
  },
  {
    icon: CheckCircle2,
    title: 'Track and Resolve',
    desc: 'Follow the response process while relevant administrators and responders manage incidents and record their outcomes.',
  },
];


export default function SafeSyncHowItWorks() {
  const [activeProtocol, setActiveProtocol] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const protocols = [
    { title: t.MedicalEmergency, desc: t.MedicalDesc, image: '/assets/medic-emergency.jpg' },
    { title: t.FireProtocol, desc: t.FireDesc, image: '/assets/fire-protocal' },
    { title: t.IntrusionAlert, desc: t.IntrusionDesc, image: '/assets/intrudion-alert' },
    { title: t.Flooding, desc: t.FloodingDesc, image: '/assets/flooding-incident' },
    { title: t.NaturalDisaster, desc: t.NaturalDisasterDesc, image: 'https://images.unsplash.com/photo-1474487548455-7d3539850f15?auto=format&fit=crop&q=80&w=400' },
  ];

  const next = () => setActiveProtocol((prev) => (prev + 1) % protocols.length);
  const prev = () => setActiveProtocol((prev) => (prev - 1 + protocols.length) % protocols.length);

  return (
    <section id="benefits" className="py-24 px-6 md:px-32 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16">
            <span className="absolute -top-12 left-0 text-8xl font-black text-gray-100 z-0 select-none">HOW IT WORKS</span>
            <h2 className="relative z-10 font-display text-4xl text-primary font-bold mb-4">How it Works</h2>
            <div className="relative z-10 h-1.5 bg-secondary w-20 rounded-full" />
        </div>
        <div className="grid md:grid-cols-4 gap-8 mb-24">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-outline/20">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-3">{i + 1}. {step.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
            <h3 className="font-display text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <AlertTriangle className="text-secondary" />
                {t.QuickGuide}
            </h3>
            <div className="relative h-[400px] flex items-center justify-center rounded-2xl overflow-hidden">
                <button onClick={prev} className="absolute left-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40">
                    <ChevronLeft />
                </button>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProtocol}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-8 text-white"
                        style={{ backgroundImage: `url(${protocols[activeProtocol].image})` }}
                    >
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/60" />
                        
                        <div className="relative z-10 text-center max-w-2xl">
                            <h4 className="font-display text-4xl font-bold mb-4">{protocols[activeProtocol].title}</h4>
                            <p className="text-white/90 text-lg">{protocols[activeProtocol].desc}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <button onClick={next} className="absolute right-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40">
                    <ChevronRight />
                </button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                {protocols.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all ${i === activeProtocol ? 'w-8 bg-secondary' : 'w-2 bg-gray-300'}`} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
