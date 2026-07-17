import { Cookie, Settings, BarChart, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import LegalLayout from './LegalLayout';

const sections = [
  { id: 'what-are-cookies', title: '1. What are Cookies', icon: Cookie, content: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.' },
  { id: 'how-we-use', title: '2. How We Use Cookies', icon: Settings, content: 'We use cookies for session management to keep you logged in and for analytics purposes to understand how visitors use our website, which helps us improve our services.' },
  { id: 'types-of-cookies', title: '3. Types of Cookies', icon: BarChart, content: 'We use essential cookies (necessary for the website to function) and performance/analytics cookies (to track website usage and performance).' },
  { id: 'your-choices', title: '4. Your Choices', icon: ShieldCheck, content: 'You can choose to disable cookies through your browser settings, although this may affect the functionality of some parts of our website.' },
];

export default function SafeSyncCookiePolicy() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="Last Updated: June 26, 2026"
      sections={sections}
      heroImage="https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&q=80&w=2000"
    >
        <div className="bg-primary text-white p-8 rounded-2xl mt-12">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><Mail className="w-5 h-5" /> support@safesync.co.ke</div>
              <div className="flex items-center gap-2"><Phone className="w-5 h-5" /> +254 720 889 352</div>
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Nairobi, Kenya</div>
            </div>
        </div>
    </LegalLayout>
  );
}

