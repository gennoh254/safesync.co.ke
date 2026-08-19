import { motion } from 'motion/react';
import { Zap, Clock, ShieldCheck } from 'lucide-react';

const impactFeatures = [
  {
    title: 'Rapid Deployment',
    description: 'Our platform ensures responders are alerted within seconds, minimizing critical response times.',
    icon: <Zap className="text-emerald-600" size={32} />,
  },
  {
    title: 'Mission-Critical Reliability',
    description: 'Designed for high-pressure environments, ensuring connectivity when it matters most.',
    icon: <Clock className="text-emerald-600" size={32} />,
  },
  {
    title: 'Seamless Coordination',
    description: 'Uniting public safety agencies and private responders for unified, efficient action.',
    icon: <ShieldCheck className="text-emerald-600" size={32} />,
  },
];

export default function SafeSyncImpact() {
  return (
    <section className="bg-slate-50 py-24 px-6 md:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Driving Safer Futures
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            SafeSync is committed to transforming how emergency services are coordinated, making communities safer and more resilient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
