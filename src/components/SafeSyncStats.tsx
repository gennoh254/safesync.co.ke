import { motion, useInView, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

const baseStats = [
  { label: 'Services Provided', value: 12571, prefix: '+', suffix: '' },
  { label: 'Active Customers', value: 11567, prefix: '', suffix: '' },
  { label: 'Service Providers', value: 1568, prefix: '', suffix: '' },
  { label: 'App Downloads', value: 10600, prefix: '', suffix: '+' },
];

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const startAnimation = () => {
        animate(0, value, {
          duration: 2,
          onUpdate: (v) => {
            if (nodeRef.current) {
              nodeRef.current.textContent = `${prefix}${Math.floor(v).toLocaleString()}${suffix}`;
            }
          },
        });
      };

      startAnimation(); // Run once immediately
      const interval = setInterval(startAnimation, 5000); // Run every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isInView, value, prefix, suffix]);

  return <div ref={nodeRef} className="text-4xl font-black text-red-900 mb-2 font-display tracking-tight" />;
}

export default function SafeSyncStats() {
  return (
    <section className="py-12 px-6 -mt-24 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {baseStats.map((stat, i) => (
            <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
            >
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
