import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(true);

  const accept = () => {
    setShow(false);
  };

  const reject = () => {
    setShow(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 ${show ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full border border-gray-100 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍪</span>
            <h2 className="text-lg font-bold text-gray-900">Manage cookies</h2>
          </div>
          <Globe className="text-gray-500" size={20} />
        </div>
        
        <p className="text-xs text-gray-700 mb-6 leading-relaxed">
          We use cookies to improve your experience. Change settings at any time <a href="/cookie-policy" className="underline text-gray-900 font-medium">here</a>.
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <a href="/cookie-policy" className="text-emerald-700 font-semibold text-xs hover:underline">
              More Info
            </a>
            <div className="flex items-center gap-3">
              <button onClick={reject} className="text-gray-500 font-semibold text-xs hover:underline">Deny</button>
              <button onClick={accept} className="px-4 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-full hover:bg-emerald-700 transition-colors">
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
