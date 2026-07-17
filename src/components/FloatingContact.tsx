import { useState } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONTACT_INFO = {
  email: 'support@safesync.co.ke',
  phone: '+254 720 889 352',
  whatsapp: 'https://wa.me/254720889352',
};

export default function FloatingContact() {
  const [hovered, setHovered] = useState<string | null>(null);

  const contacts = [
    { id: 'email', icon: Mail, label: CONTACT_INFO.email, link: `mailto:${CONTACT_INFO.email}` },
    { id: 'phone', icon: Phone, label: CONTACT_INFO.phone, link: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}` },
    { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', link: CONTACT_INFO.whatsapp },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {contacts.map((contact) => (
        <div 
          key={contact.id}
          className="relative flex items-center justify-end"
          onMouseEnter={() => setHovered(contact.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === contact.id && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-14 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap border border-gray-100"
              >
                {contact.label}
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href={contact.link}
            target={contact.id === 'whatsapp' ? '_blank' : undefined}
            rel={contact.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className="bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <contact.icon className="w-6 h-6" />
          </a>
        </div>
      ))}
    </div>
  );
}
