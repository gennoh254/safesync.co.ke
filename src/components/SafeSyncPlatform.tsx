import { Shield } from 'lucide-react';
import { useState, useEffect } from 'react';


const sections = [
  { title: 'Client App', features: ['Panic button', 'GPS location sharing', 'Alert confirmation', 'Emergency status updates'], image: '/assets/overview1.png' },
  { title: 'Responder Side', features: ['Incoming emergency alerts', 'Live map location', 'Accept/reject incidents', 'Mark incidents resolved'], image: '/assets/overview2.png' },
  { title: 'Super Admin', features: ['Company onboarding', 'Analytics', 'Responder management', 'Incident oversight'], image: 'https://images.unsplash.com/photo-1573164713715-17761005a30e?auto=format&fit=crop&q=80&w=800' },
];

export default function SafeSyncPlatform() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    setIsImageLoading(true);
  }, [activeIdx]);

  return (
    <section id="platform" className="py-24 px-6 md:px-32 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16">
            <span className="absolute -top-12 left-0 text-8xl font-black text-outline-variant/20 z-0 select-none">PLATFORM OVERVIEW</span>
            <h2 className="relative z-10 font-display text-4xl text-primary font-bold mb-4">Platform Overview</h2>
            <div className="relative z-10 h-1.5 bg-secondary w-20 rounded-full" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6">
                {sections.map((s, i) => (
                    <button key={i} onClick={() => setActiveIdx(i)} className={`p-6 border text-left shadow-sm transition-all rounded-2xl ${activeIdx === i ? 'bg-primary-container border-primary' : 'bg-surface-container border-outline/20 hover:border-primary'}`}>
                        <h3 className={`text-xl font-bold mb-4 ${activeIdx === i ? 'text-on-primary' : 'text-primary'}`}>{s.title}</h3>
                        <ul className="space-y-3">
                             {s.features.map(f => (
                                 <li key={f} className={`flex items-center gap-2 font-medium text-sm ${activeIdx === i ? 'text-on-primary/90' : 'text-on-surface-variant'}`}>
                                     <span className={`w-2 h-2 rounded-full flex-shrink-0 ${activeIdx === i ? 'bg-background' : 'bg-secondary'}`} />
                                     {f}
                                 </li>
                             ))}
                        </ul>
                    </button>
                ))}
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6 items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden shadow-xl bg-surface-container rounded-3xl">
                  {isImageLoading && <div className="absolute inset-0 animate-pulse bg-outline-variant" />}
                  <img 
                    src={sections[activeIdx].image} 
                    alt={sections[activeIdx].title} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsImageLoading(false)}
                  />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
