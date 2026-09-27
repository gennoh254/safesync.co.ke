import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function CompanyRegistrationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', contactName: '', phone: '+254 ', location: '', industry: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+254')) {
      val = '+254 ' + val.replace(/^\+254\s*/, '');
    }
    setFormData({...formData, phone: val});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      // 1. Create company record
      await addDoc(collection(db, 'companies'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        ownerId: 'placeholder', // will be updated upon first login/magic link
      });
      
      // 2. Send magic link
      const auth = getAuth();
      const actionCodeSettings = {
        url: window.location.origin + '/finish-registration', // Redirect URL
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings);
      window.localStorage.setItem('emailForRegistration', formData.email);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error registering:', error);
      setError('Failed to register. Please check your information and try again.');
      setSubmitting(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-6 sm:p-10 rounded-3xl max-w-lg w-full relative my-auto shadow-2xl border`}>
        <button 
          onClick={onClose} 
          className={`absolute top-4 right-4 p-2 z-10 rounded-full transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
        >
          <X size={24} />
        </button>

        {/* Header with Styled Logo */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <a href="#" className="flex items-center justify-center mb-3">
            <img 
              src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/safesync-logo_ooeqqg" 
              alt="SafeSync Logo" 
              className="h-12 sm:h-14 object-contain" 
            />
          </a>
          <h2 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Register Your Company
          </h2>
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
                <h3 className="text-2xl font-bold mb-2">Registration Initiated!</h3>
                <p>Please check your email for the magic link to complete your registration.</p>
            </motion.div>
        ) : (
            <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-5"
            >
                {error && <p className="text-red-500 mb-4 text-center text-sm font-medium">{error}</p>}
                
                <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Company Name <span className="text-red-500">●</span>
                    </label>
                    <input 
                      required 
                      placeholder="Company Name" 
                      value={formData.name} 
                      className={`w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Email <span className="text-red-500">●</span>
                    </label>
                    <input 
                      required 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email} 
                      className={`w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Contact Name <span className="text-red-500">●</span>
                    </label>
                    <input 
                      required 
                      placeholder="Contact Name" 
                      value={formData.contactName} 
                      className={`w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} 
                      onChange={e => setFormData({...formData, contactName: e.target.value})} 
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Phone Number
                    </label>
                    <input 
                      required 
                      placeholder="+254 7..." 
                      value={formData.phone} 
                      className={`w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} 
                      onChange={handlePhoneChange} 
                    />
                </div>

                <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Location <span className="text-red-500">●</span>
                    </label>
                    <input 
                      required 
                      placeholder="Location / City / Address" 
                      value={formData.location} 
                      className={`w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} 
                      onChange={e => setFormData({...formData, location: e.target.value})} 
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Industry <span className="text-red-500">●</span>
                    </label>
                    <input 
                      required 
                      placeholder="Industry" 
                      value={formData.industry} 
                      className={`w-full min-h-[48px] px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`} 
                      onChange={e => setFormData({...formData, industry: e.target.value})} 
                    />
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className={`w-full min-h-[48px] p-4 font-bold rounded-xl transition-all shadow-lg ${isDark ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                    {submitting ? 'Registering...' : 'Register →'}
                </button>
            </motion.form>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}