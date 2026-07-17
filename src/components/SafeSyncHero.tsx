import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, MapPin, Users, Clock, Bell, CheckCircle } from 'lucide-react';

const workflows = {
  client: [
    { id: 1, title: 'Alert', icon: Shield, screenshot: '/assets/client1.png' },
    { id: 2, title: 'Track', icon: MapPin, screenshot: 'assets/client2.png' },
    { id: 3, title: 'Wait for Respond', icon: Clock, screenshot: '/assets/client1.png' },
  ],
  responder: [
    { id: 1, title: 'Receive', icon: Bell, screenshot: '/assets/responder1.png' },
    { id: 2, title: 'Track', icon: MapPin, screenshot: '/assets/responder3.png' },
    { id: 3, title: 'Resolve', icon: CheckCircle, screenshot: '/assets/responder2.png' },
  ]
};

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
    <section className="pt-32 pb-24 px-6 md:px-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-red-900/90 z-0" />
      <div className="absolute inset-0 bg-[url('/assets/intrusion-a.jpg')] bg-cover bg-center bg-fixed z-[-1]" />
      
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-semibold text-sm mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <span>KENYA'S EMERGENCY RESPONSE CONCIERGE</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight font-bold tracking-tighter">
            <span style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>Real-Time Emergency</span> Response
          </h1>
          <p className="text-lg text-white/90 mb-10 max-w-xl">
            SafeSync helps modern organizations respond faster to fire and medical emergencies through real-time alerts, GPS tracking, and seamless coordination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-3 px-4 h-12 bg-black text-white rounded-xl border border-white/20 hover:scale-105 transition-transform">
                  <img src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/apple-logo_dcz0jz" alt="App Store" className="w-8 h-8" />
                  <div className="text-xs">
                      <div className="text-[10px] opacity-70">Download on</div>
                      <div className="font-bold">App Store</div>
                  </div>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 h-12 bg-black text-white rounded-xl border border-white/20 hover:scale-105 transition-transform">
                  <img src="/assets/playstore.png" alt="Google Play" className="w-8 h-8" />
                  <div className="text-xs">
                      <div className="text-[10px] opacity-70">Get it on</div>
                      <div className="font-bold">Google Play</div>
                  </div>
              </a>
            </div>
          </div>
        </div>

        <div className="relative justify-self-center py-10 md:py-0 w-full flex flex-col items-center justify-center gap-8">
          <div className="flex bg-white/10 rounded-full p-1 mb-4 backdrop-blur-sm border border-white/20 mx-auto w-fit">
            <button onClick={() => { setActiveView('client'); setActiveStep(0); }} className={`px-6 py-2 rounded-full font-bold transition-all ${activeView === 'client' ? 'bg-white text-black' : 'text-white'}`}>Client</button>
            <button onClick={() => { setActiveView('responder'); setActiveStep(0); }} className={`px-6 py-2 rounded-full font-bold transition-all ${activeView === 'responder' ? 'bg-white text-black' : 'text-white'}`}>Responder</button>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Steps positioned around the phone */}
            {steps.map((step, idx) => (
              <button 
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`absolute z-20 flex items-center gap-4 text-white font-bold transition-all ${activeStep === idx ? 'scale-110' : 'opacity-70'}`}
                style={{
                  top: idx === 0 ? '10%' : idx === 1 ? '45%' : '80%',
                  left: idx % 2 === 0 ? '-10rem' : 'auto',
                  right: idx % 2 !== 0 ? '-10rem' : 'auto',
                }}
              >
                {idx % 2 === 0 && <span className="text-sm">{step.id}. {step.title}</span>}
                <div className={`p-4 rounded-full bg-white/20 backdrop-blur-md border ${activeStep === idx ? 'border-pink-400 bg-pink-500/20' : 'border-white/10'}`}>
                    <step.icon className="w-6 h-6" />
                </div>
                {idx % 2 !== 0 && <span className="text-sm">{step.id}. {step.title}</span>}
                {/* Connecting line */}
                <div className={`absolute top-1/2 w-16 h-0.5 bg-white/30 ${idx % 2 === 0 ? 'left-full' : 'right-full'}`} />
              </button>
            ))}
            
            {/* Phone Screen */}
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-[280px] h-[550px] border-8 border-gray-900 rounded-[3rem] bg-gray-800 shadow-2xl relative overflow-hidden z-10"
            >
                <div className="absolute top-0 inset-x-8 h-4 bg-gray-900 rounded-b-xl z-10"></div>
                <img src={steps[activeStep].screenshot} alt="App UI" className="h-full w-full object-cover transition-opacity duration-300" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
