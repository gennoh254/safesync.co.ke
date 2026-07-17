import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function SafeSyncNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md shadow-sm border-b border-outline-variant border-t-4 border-t-red-600 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 md:px-32 h-16">
        <a href="#" className="flex items-center">
            <img src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/safesync-logo_ooeqqg" alt="SafeSync Logo" className="h-16" />
        </a>
        
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {[
            { name: 'Platform', href: '#platform' },
            { name: 'Industries', href: '#industries' },
            { name: 'Benefits', href: '#benefits' },
            { name: 'About', href: '#about' },
          ].map(item => (
            <a key={item.name} href={item.href} className="text-on-surface-variant font-medium hover:text-secondary transition-colors">
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-outline-variant p-6 flex flex-col gap-4">
          {[
            { name: 'Platform', href: '#platform' },
            { name: 'Industries', href: '#industries' },
            { name: 'Benefits', href: '#benefits' },
            { name: 'About', href: '#about' },
          ].map(item => (
            <a key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant font-medium hover:text-secondary transition-colors">
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
