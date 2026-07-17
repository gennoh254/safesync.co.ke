import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faq = [
  { q: 'How do I book a service on SafeSync?', a: 'Simply sign in to your SafeSync account, select the service you need, share your location, provide the necessary details, and submit your request. SafeSync will instantly connect you with the nearest available responder and provide real-time updates until assistance arrives.' },
  { q: 'Where is SafeSync App Available?', a: 'We are currently operating in Nairobi and expanding to other major cities.' },
  { q: 'Can I leave my House Key with my Service Provider?', a: 'No. Please note that our Terms of Service require you to be present when the service is being provided. Any exceptions to this rule are made at your own risk.' },
  { q: 'Is SafeSync free to download?', a: 'Yes, the SafeSync app is free to download on both the App Store and Google Play Store.' },
  { q: 'How do I become a responder?', a: 'You can apply through our partnership portal. Visit the section on our website to start your application.' },
  { q: 'Is my data secure?', a: 'Yes, SafeSync employs industry-standard encryption and security protocols to ensure your data and privacy are protected at all times.' },
];

export default function SafeSyncFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 px-6 md:px-32 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 font-display text-primary">
            Frequently Asked Questions
            <div className="h-1 bg-pink-500 w-40 mx-auto mt-2" />
        </h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
          {faq.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleItem(i)}
                className="w-full p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="font-bold text-gray-900">{item.q}</h3>
                {openItems.includes(i) ? (
                    <Minus className="w-5 h-5 text-primary shrink-0" />
                ) : (
                    <Plus className="w-5 h-5 text-primary shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openItems.includes(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                        <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
    </section>
  );
}
