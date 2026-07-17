import { useState } from 'react';
import { motion } from 'motion/react';

export default function SafeSyncContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = formData.name && isValidEmail(formData.email) && formData.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-32 bg-surface-container-low">
      <div className="max-w-xl mx-auto bg-white p-12 shadow-sm border border-outline/20">
        <div className="relative mb-8">
            <span className="absolute -top-12 left-0 text-8xl font-black text-gray-100 z-0 select-none">INQUIRY</span>
            <h2 className="relative z-10 font-display text-4xl text-primary font-bold mb-4">Send an Inquiry</h2>
            <div className="relative z-10 h-1.5 bg-secondary w-20 rounded-full" />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 border border-outline/30 text-sm rounded-xl" />
          <input type="email" placeholder="Work Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 border border-outline/30 text-sm rounded-xl" />
          <textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-4 border border-outline/30 text-sm h-32 rounded-xl" />
          <motion.button 
            type="submit" 
            disabled={!isFormValid || isSubmitted} 
            className="w-full py-4 bg-black text-white font-bold font-display hover:opacity-90 disabled:bg-opacity-50 rounded-xl hover:scale-105 transition-transform"
            animate={isSubmitted ? { backgroundColor: '#22c55e' } : { backgroundColor: '#000000' }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitted ? 'Sent!' : 'Send Inquiry'}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
