import { Database, Eye, Share2, Shield, Mail, Phone, MapPin, FileText } from 'lucide-react';
import LegalLayout from './LegalLayout';

const sections = [
  { id: 'introduction', title: '1. Introduction', icon: FileText, content: 'At Safesync Technologies, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you interact with our website or services. By using our platform, you agree to the practices described below.' },
  { id: 'data-collection', title: '2. Data Collection', icon: Database, content: 'We collect information you provide directly (contact information, user-generated content, preferences) and information collected automatically (cookies, device type, IP address, logs, analytics) to enhance your experience.' },
  { id: 'usage', title: '3. Data Usage', icon: Eye, content: 'We use your data to provide and improve our services, personalize content, communicate with you, and comply with legal obligations as required under the Data Protection Act, 2019 of Kenya.' },
  { id: 'sharing', title: '4. Third-Party Disclosure', icon: Share2, content: 'We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, or if required by law.' },
  { id: 'security', title: '5. Data Security', icon: Shield, content: 'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.' },
  { id: 'contact', title: '6. Contact Information', icon: Mail, content: 'For any questions or concerns regarding this Privacy Policy, please contact us at support@safesync.co.ke.' },
];

export default function SafeSyncPrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Last Updated: June 26, 2026"
      sections={sections}
      heroImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=2000"
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

