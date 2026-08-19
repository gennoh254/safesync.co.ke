import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PartnershipForm from './PartnershipForm';
import CompanyRegistrationForm from './CompanyRegistrationForm';

export default function PartnerCard() {
  const [isPartnershipFormOpen, setIsPartnershipFormOpen] = useState(false);
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  const images = [
    'https://images.unsplash.com/photo-1555949963-aa90dcee99e5?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573164713715-17761005a30e?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <section className="py-24 px-6 md:px-32 bg-slate-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.img whileHover={{ scale: 1.05 }} src={images[0]} alt="Partners" className="w-full h-64 object-cover" />
            <motion.img whileHover={{ scale: 1.05 }} src={images[1]} alt="Partners" className="w-full h-64 object-cover mt-12" />
            <motion.img whileHover={{ scale: 1.05 }} src={images[2]} alt="Partners" className="w-full h-64 object-cover -mt-12" />
            <motion.img whileHover={{ scale: 1.05 }} src={images[3]} alt="Partners" className="w-full h-64 object-cover" />
          </motion.div>
        <div className="text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the SafeSync Response Network</h2>
          <p className="text-lg mb-8 opacity-90">Become a critical part of our emergency response infrastructure. Collaborate with command centers, local responders, and hospitals to provide life-saving assistance when it matters most.</p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/demo" className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:scale-105 transition-transform">Demo</Link>
            <button onClick={() => setIsPartnershipFormOpen(true)} className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:scale-105 transition-transform">Request Partnership</button>
            <button onClick={() => setIsRegistrationFormOpen(true)} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-transform">Register Company</button>
          </div>
        </div>
      </div>
      {isPartnershipFormOpen && <PartnershipForm onClose={() => setIsPartnershipFormOpen(false)} />}
      {isRegistrationFormOpen && <CompanyRegistrationForm onClose={() => setIsRegistrationFormOpen(false)} />}
    </section>
  );
}
