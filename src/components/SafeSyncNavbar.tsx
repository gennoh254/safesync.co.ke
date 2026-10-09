import { Menu, X, Phone, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SafeSyncNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Industries', href: isHomePage ? '#industries' : '/#industries', isRouter: false },
    { name: 'Benefits', href: isHomePage ? '#benefits' : '/#benefits', isRouter: false },
    { name: 'About', href: isHomePage ? '#about' : '/#about', isRouter: false },
    // { name: 'Safety Blog', href: '/blog', isRouter: true },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-colors duration-300">
      {/* Top Header on top of the navbar */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800/80 text-[11px] leading-tight py-1 px-6 md:px-32">
        <div className="flex items-center justify-between gap-4">
          {/* Left: 24/7 Hotline & Network Status */}
          <div className="flex items-center gap-3 sm:gap-5 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="hidden sm:inline">24/7 Rapid Emergency Response Network</span>
              <span className="sm:hidden font-semibold">24/7 Response</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <a 
              href="tel:+254720889352" 
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-red-400" />
              <span>Hotline: +254 720 889 352</span>
            </a>
          </div>

          {/* Far Right: Terms & Conditions link */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/terms"
              className="flex items-center gap-1 font-medium text-slate-200 hover:text-emerald-400 transition-colors group cursor-pointer"
            >
              <FileText className="w-3 h-3 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <span className="underline decoration-slate-600 underline-offset-2 group-hover:decoration-emerald-400">
                Terms &amp; Conditions
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-background/95 backdrop-blur-md shadow-sm border-b border-outline-variant border-t-2 border-t-red-600 transition-colors duration-300">
        <div className="flex items-center justify-between px-6 md:px-32 h-14">
          <Link to="/" className="flex items-center">
            <img src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/safesync-logo_ooeqqg" alt="SafeSync Logo" className="h-12" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navItems.map(item => (
              item.isRouter ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-on-surface-variant font-medium hover:text-secondary transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-on-surface-variant font-medium hover:text-secondary transition-colors"
                >
                  {item.name}
                </a>
              )
            ))}
            <a 
              href={isHomePage ? '#contact' : '/#contact'} 
              className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-1 text-on-surface-variant hover:text-secondary" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-outline-variant p-6 flex flex-col gap-4 shadow-lg">
            {navItems.map(item => (
              item.isRouter ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant font-medium hover:text-secondary transition-colors py-1"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-on-surface-variant font-medium hover:text-secondary transition-colors py-1"
                >
                  {item.name}
                </a>
              )
            ))}
            <Link
              to="/terms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-on-surface-variant font-medium hover:text-secondary transition-colors py-1"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Terms &amp; Conditions</span>
            </Link>
            <a 
              href={isHomePage ? '#contact' : '/#contact'} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-full text-center hover:bg-emerald-700 transition-colors mt-2"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

