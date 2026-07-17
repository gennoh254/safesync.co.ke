import { BookOpen, Shield, AlertTriangle, User, Lock, Database, Copyright, Wifi, Scale, Ban, RefreshCw, Mail, Phone, MapPin, Info, Map } from 'lucide-react';
import LegalLayout from './LegalLayout';

const sections = [
  { id: 'about', title: '1. About Safesync', icon: Info, content: 'Safesync operates a technology-enabled emergency response platform that facilitates communication and coordination between individuals or organizations requiring emergency assistance and independent emergency response service providers. Safesync provides coordination and dispatch services and does not itself provide emergency response services unless expressly stated.' },
  { id: 'eligibility', title: '2. Eligibility', icon: User, content: 'You must be at least eighteen (18) years old or otherwise legally capable of entering into binding agreements to use the Platform. Organizations may register through authorized representatives.' },
  { id: 'user-accounts', title: '3. User Accounts', icon: Lock, content: 'Users may be required to register an account. You agree to provide accurate information, keep your login credentials confidential, notify Safesync immediately of unauthorized account access, and keep your contact information updated. You are responsible for all activities carried out using your account.' },
  { id: 'use-of-platform', title: '4. Use of the Platform', icon: Shield, content: 'The Platform may be used to request emergency assistance, report incidents, access emergency preparedness information, subscribe to emergency monitoring services, receive notifications and alerts, manage emergency contacts, and access services made available by Safesync. Users shall use the Platform lawfully and responsibly.' },
  { id: 'emergency-requests', title: '5. Emergency Requests', icon: AlertTriangle, content: 'When an emergency request is submitted, Safesync will make reasonable efforts to notify and dispatch an appropriate emergency response partner. Submission of a request does not guarantee that a responder will accept the request, arrive within a specified time, or that emergency services will always be available.' },
  { id: 'location-services', title: '6. Location Services', icon: Map, content: 'To facilitate emergency response, the Platform may collect and process your location information. You consent to the use of location services where necessary to coordinate emergency assistance.' },
  { id: 'subscriptions', title: '7. Subscriptions', icon: BookOpen, content: 'Certain Platform features may require a paid subscription. Subscription plans, fees, billing cycles, renewal terms and cancellation procedures shall be communicated separately.' },
  { id: 'payments', title: '8. Payments', icon: Copyright, content: 'Where emergency services attract additional charges beyond subscription benefits, users agree to pay the applicable fees communicated before or after service delivery, as applicable.' },
  { id: 'user-responsibilities', title: '9. User Responsibilities', icon: User, content: 'Users agree not to submit false emergency alerts, misuse emergency services, interfere with Platform operations, impersonate another person, upload malicious software, or provide false information. False emergency reports may result in suspension or termination.' },
  { id: 'limitation-of-liability', title: '10. Limitation of Liability', icon: Scale, content: 'Safesync acts as a technology platform and is not responsible for acts or omissions of independent emergency response providers, delays caused by external factors, injury, death, property damage, or decisions made by emergency responders.' },
  { id: 'independent-service-providers', title: '11. Independent Service Providers', icon: Shield, content: 'Emergency response partners operate as independent entities. Safesync does not employ or control independent responders.' },
  { id: 'intellectual-property', title: '12. Intellectual Property', icon: Copyright, content: 'All intellectual property rights relating to the Platform remain the exclusive property of Safesync Limited unless otherwise stated.' },
  { id: 'privacy', title: '13. Privacy', icon: Database, content: 'Safesync processes personal information in accordance with its Privacy Policy and applicable data protection laws, including the Data Protection Act, 2019 of Kenya.' },
  { id: 'suspension-and-termination', title: '14. Suspension and Termination', icon: Ban, content: 'Safesync may suspend or terminate user accounts for breaches of these Terms, fraudulent use, repeated false requests, or unlawful conduct.' },
  { id: 'force-majeure', title: '15. Force Majeure', icon: RefreshCw, content: 'Safesync shall not be liable for delays or failure to perform arising from circumstances beyond its reasonable control.' },
  { id: 'amendments', title: '16. Amendments', icon: RefreshCw, content: 'Safesync may amend these Terms from time to time. Updated Terms shall become effective upon publication on the Platform.' },
  { id: 'governing-law', title: '17. Governing Law', icon: Scale, content: 'These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya.' },
  { id: 'dispute-resolution', title: '18. Dispute Resolution', icon: Scale, content: 'The Parties shall first seek to resolve disputes through good-faith negotiations, then mediation, and finally arbitration in Nairobi in accordance with the Arbitration Act of Kenya.' },
  { id: 'contact-information', title: '19. Contact Information', icon: Mail, content: 'For enquiries regarding these Terms, please contact Safesync Limited via the contact details provided on our website.' },
];

export default function SafeSyncTerms() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Last Updated: June 26, 2026"
      sections={sections}
      heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
    >
      {/* Need Help */}
      <div className="bg-primary text-white p-8 rounded-2xl mt-12">
        <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
        <p className="mb-6 opacity-90">If you have questions regarding these Terms & Conditions, contact us.</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2"><Mail className="w-5 h-5" /> support@safesync.co.ke</div>
          <div className="flex items-center gap-2"><Phone className="w-5 h-5" /> +254 720 889 352</div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Nairobi, Kenya</div>
        </div>
      </div>
    </LegalLayout>
  );
}

