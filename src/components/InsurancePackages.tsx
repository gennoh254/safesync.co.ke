import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Target, Home, Plane, Baby, Users, RefreshCw, Lock, X, CheckCircle } from 'lucide-react';

const packages = [
  { title: 'Personal Safety', icon: Shield, desc: 'Real-time panic alerts and GPS tracking.', details: 'The ultimate protection for individuals on the go.', benefits: ['24/7 Monitoring', 'GPS Location Sharing', 'Panic Button Integration'] },
  { title: 'Corporate Shield', icon: Zap, desc: 'Enterprise-wide incident management.', details: 'Ensuring your workforce stays safe everywhere.', benefits: ['Incident Reporting', 'Auto-Protocols', 'Enterprise Dashboard'] },
  { title: 'Public Infrastructure', icon: Target, desc: 'Coordinated safety measures.', details: 'Public space security for events and city centers.', benefits: ['Event Monitoring', 'Crowd Management', 'Real-time Alerts'] },
  { title: 'Home Security', icon: Home, desc: 'Advanced residential safety monitoring.', details: 'Residential protection for your family.', benefits: ['Motion Sensors', 'Alarm Monitoring', 'Family Check-ins'] },
  { title: 'Travel Safety', icon: Plane, desc: 'Global coverage for travelers.', details: 'Travel securely anywhere in the world.', benefits: ['24/7 Global Response', 'Emergency Medical Coverage', 'Trip Monitoring'] },
  { title: 'Child Safety', icon: Baby, desc: 'Specialized monitoring for little ones.', details: 'Protecting your most precious ones.', benefits: ['Geofencing', 'Safe Zone Alerts', 'Instant Notification'] },
  { title: 'Senior Care', icon: Users, desc: 'Reliable safety solutions for the elderly.', details: 'Empowering seniors to live independently.', benefits: ['Fall Detection', 'Medication Reminders', 'Family Check-in'] },
  { title: 'Disaster Recovery', icon: RefreshCw, desc: 'Comprehensive rebuild plans.', details: 'Recover fast from any disaster.', benefits: ['Recovery Planning', 'Loss Assessment', 'Resource Coordination'] },
  { title: 'Data Protection', icon: Lock, desc: 'Secure encryption for safety data.', details: 'Keeping your personal information private.', benefits: ['AES-256 Encryption', 'Secure Backup', 'Access Control'] },
];

export default function InsurancePackages() {
  const [selectedPackage, setSelectedPackage] = useState<null | typeof packages[0]>(null);

  return (
    <section id="insurance" className="py-24 px-6 md:px-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Insurance & Protection Packages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.button
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${pkg.title}`}
              onClick={() => setSelectedPackage(pkg)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPackage(pkg)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
              className="p-8 border border-outline-variant hover:border-primary transition-all hover:scale-105 bg-gray-50 flex flex-col items-center text-center w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                <pkg.icon className="w-12 h-12 text-red-500 mb-6" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
              <p className="text-on-surface-variant mb-6">{pkg.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button 
                onClick={() => setSelectedPackage(null)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                aria-label="Close modal"
              >
                <X />
              </button>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2 text-green-600 mb-4"
              >
                <CheckCircle className="w-8 h-8" />
                <span className="font-bold">Details Loaded</span>
              </motion.div>
              <h3 id="modal-title" className="text-3xl font-bold mb-4">{selectedPackage.title}</h3>
              <p className="text-gray-600 mb-6">{selectedPackage.details}</p>
              <h4 className="font-bold mb-2">Key Benefits:</h4>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                {selectedPackage.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
