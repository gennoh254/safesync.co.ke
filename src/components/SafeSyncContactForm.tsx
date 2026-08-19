import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle } from 'lucide-react';

export default function SafeSyncContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();
  
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = formData.name && isValidEmail(formData.email) && formData.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    }
  };

  const isDark = theme === 'dark';

  return (
    <section id="contact" className={`py-24 px-6 md:px-32 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Form Section */}
        <div className="lg:w-1/2 w-full">
            <div className="mb-8">
                <h2 className={`font-display text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Send an Inquiry</h2>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-lg`}>Have questions or interested in partnering with us? Fill out the form and we'll get back to you shortly.</p>
            </div>
            
            <AnimatePresence mode="wait">
            {isSubmitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-8 rounded-2xl flex flex-col items-center justify-center text-center ${isDark ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}
                >
                    <CheckCircle className="w-16 h-16 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p>We've received your inquiry and will get back to you soon.</p>
                </motion.div>
            ) : (
                <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6" 
                    onSubmit={handleSubmit}
                >
                  <input required type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full min-h-[44px] p-4 border text-sm rounded-xl ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'}`} />
                  <input required type="email" placeholder="Work Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full min-h-[44px] p-4 border text-sm rounded-xl ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'}`} />
                  <textarea required placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full min-h-[128px] p-4 border text-sm h-32 rounded-xl ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'}`} />
                  <motion.button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitted} 
                    className="w-full min-h-[44px] py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:bg-opacity-50 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Inquiry →
                  </motion.button>
                </motion.form>
            )}
            </AnimatePresence>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full rounded-3xl overflow-hidden shadow-2xl">
            <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Professional inquiry"
                className="w-full h-full object-cover aspect-[4/3]"
            />
        </div>
      </div>
    </section>
  );
}
