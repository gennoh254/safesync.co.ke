import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/254750197234"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 right-8 z-[9999] bg-[#25D366] text-white p-3 shadow-xl hover:bg-[#20bd5a] transition-all duration-300 rounded-full ring-4 ring-[#25D366]/30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}
