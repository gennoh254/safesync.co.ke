import { School, Hospital, Building2, Building, Factory, Calendar, Shield, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const industries = [
  { icon: School, title: 'Schools', desc: 'Rapid response for campus safety.', img: '/assets/school.jpg' },
  { icon: Hospital, title: 'Hospitals', desc: 'Critical coordination.', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400' },
  { icon: Building2, title: 'Real Estate', desc: 'Smart security.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400' },
  { icon: Building, title: 'Corporates', desc: 'Enterprise-grade safety.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
  { icon: Factory, title: 'Factories', desc: 'Occupational safety.', img: '/assets/factories.jpg' },
  { icon: Calendar, title: 'Events', desc: 'High-density safety.', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400' },
  { icon: Shield, title: 'Insurers', desc: 'Claims-ready incident data.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400' },
  { icon: Truck, title: 'Logistics', desc: 'Secure fleet & driver safety.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400' },
];

export default function SafeSyncIndustries() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="industries" className="py-24 px-6 md:px-32 bg-surface-container-high transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16">
          <span className="absolute -top-12 left-0 text-8xl font-black text-gray-100 z-0 select-none">Environment</span>
          <h2 className="font-display text-4xl text-primary text-left font-bold relative z-10">Built for Every Environment</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                hoveredIdx !== null && hoveredIdx !== i ? 'blur-sm scale-95 opacity-50' : 'scale-100 opacity-100'
              }`}
            >
              <img src={item.img} alt={item.title} className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <item.icon className="text-white mb-2 w-8 h-8" />
                <h4 className="font-display font-bold text-xl text-white">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
