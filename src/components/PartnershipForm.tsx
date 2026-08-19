import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function PartnershipForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ companyName: '', contactName: '', email: '', phone: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+254 7')) {
      val = '+254 7' + val.replace(/^\+254 7/, '');
    }
    setFormData({...formData, phone: val});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'partnerships'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting request:', error);
      setError('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className={`${isDark ? 'bg-slate-900' : 'bg-white'} p-6 sm:p-8 rounded-2xl max-w-lg w-full relative my-auto`}>
        <button onClick={onClose} className={`absolute top-1 right-1 p-2 z-10 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
          <X size={28} />
        </button>
        <h2 className={`text-3xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Request Partnership</h2>
        
        <AnimatePresence mode="wait">
        {isSubmitted ? (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-8 rounded-2xl flex flex-col items-center justify-center text-center ${isDark ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}
            >
                <CheckCircle className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
                <p>We've received your request and will get back to you soon.</p>
            </motion.div>
        ) : (
            <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
            >
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="space-y-2">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                    <input required placeholder="Full Name" value={formData.contactName} className={`w-full min-h-[48px] p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} onChange={e => setFormData({...formData, contactName: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Work Email</label>
                        <input required type="email" placeholder="Work Email" value={formData.email} className={`w-full min-h-[48px] p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Company</label>
                        <input required placeholder="Company Name" value={formData.companyName} className={`w-full min-h-[48px] p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Phone Number</label>
                    <input required placeholder="+254 7..." value={formData.phone} className={`w-full min-h-[48px] p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} onChange={handlePhoneChange} />
                </div>
                
                <div className="space-y-2">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tell us about your organization</label>
                    <textarea required placeholder="Description" value={formData.description} className={`w-full min-h-[120px] p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                
                <button type="submit" disabled={submitting} className="w-full min-h-[48px] p-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-900/20">
                    {submitting ? 'Submitting...' : 'Submit Request →'}
                </button>
                <p className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>By submitting this form, you agree to our <a href="/privacy-policy" className="underline font-medium hover:text-emerald-600">Privacy Policy</a>.</p>
            </motion.form>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
