import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Skeleton from './Skeleton';

const faq = [
  { q: 'How do I book a service on SafeSync?', a: 'Simply sign in to your SafeSync account, select the service you need, share your location, provide the necessary details, and submit your request. SafeSync will instantly connect you with the nearest available responder and provide real-time updates until assistance arrives.' },
  { q: 'Where is SafeSync App Available?', a: 'We are currently operating in Nairobi and expanding to other major cities.' },
  { q: 'Can I leave my House Key with my Service Provider?', a: 'No. Please note that our Terms of Service require you to be present when the service is being provided. Any exceptions to this rule are made at your own risk.' },
  { q: 'Is SafeSync free to download?', a: 'Yes, the SafeSync app is free to download on both the App Store and Google Play Store.' },
  { q: 'How do I become a responder?', a: 'You can apply through our partnership portal. Visit the section on our website to start your application.' },
  { q: 'Is my data secure?', a: 'Yes, SafeSync employs industry-standard encryption and security protocols to ensure your data and privacy are protected at all times.' },
];

export default function SafeSyncFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 px-6 md:px-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">
        {/* Text Section */}
        <div className="lg:w-2/5 space-y-8">
            <h2 className="text-5xl font-bold font-display leading-tight text-slate-900">
                Frequently <br/>
                asked questions
            </h2>
            {/* Image Section */}
            <div className="rounded-none overflow-hidden w-full max-w-sm">
                {loading ? <Skeleton className="w-full h-[300px]" /> : (
                <img
                    src="/assets/about.jpg"
                    alt="Person thinking"
                    className="w-full object-cover"
                />
                )}
            </div>
        </div>

        {/* FAQ Section */}
        <div className="lg:w-3/5 space-y-2">
              {loading 
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="py-6 border-b border-slate-200 space-y-2">
                        <Skeleton className="w-full h-8" />
                        <Skeleton className="w-3/4 h-4" />
                    </div>
                  ))
                : faq.map((item, i) => (
                <div key={i} className="border-b border-slate-200">
                  <button
                    onClick={() => toggleItem(i)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className="font-bold text-lg text-slate-900">{item.q}</h3>
                    {openItems.includes(i) ? (
                        <Minus className="w-5 h-5 shrink-0 text-slate-900" />
                    ) : (
                        <Plus className="w-5 h-5 shrink-0 text-slate-900" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openItems.includes(i) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pb-6"
                        >
                            <p className="text-slate-600 leading-relaxed">{item.a}</p>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
