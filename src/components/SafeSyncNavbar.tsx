
import { Menu, X, Phone, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeSyncAnimatedLogo from './SafeSyncAnimatedLogo';

export default function SafeSyncNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Industries', href: isHomePage ? '#industries' : '/#industries' },
    { name: 'Benefits', href: isHomePage ? '#benefits' : '/#benefits' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
  ];

  const contactHref = isHomePage ? '#contact' : '/#contact';

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* Top Information Bar */}
      <div className="bg-[#14243A] text-white border-b border-white/10">
        <div className="flex items-center justify-between gap-4 px-6 md:px-32 py-2 text-[11px]">

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-2 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E11D1C] animate-pulse" />
              <span className="hidden sm:inline">
                Emergency Response & Coordination
              </span>
              <span className="sm:hidden">24/7 Response</span>
            </span>

            <span className="hidden md:inline text-white/30">|</span>

            <a
              href="tel:+254746129446"
              className="hidden md:flex items-center gap-2 text-white/75 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E11D1C]" />
              <span>+254 746 129 446</span>
            </a>
          </div>

          <Link
            to="/terms"
            className="flex items-center gap-1.5 text-white/75 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#E11D1C]" />
            <span className="underline underline-offset-2 decoration-white/30 hover:decoration-[#E11D1C]">
              Terms &amp; Conditions
            </span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="relative bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#14243A]/10">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#E11D1C]" />

        <div className="flex items-center justify-between px-6 md:px-32 h-[76px]">

          {/* Brand */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <SafeSyncAnimatedLogo className="w-10 h-10 md:w-11 md:h-11" />

            <div className="flex flex-col select-none">
              <div className="flex items-center tracking-tight font-display font-black text-xl text-[#14243A] group-hover:text-[#E11D1C] transition-colors leading-none">
                <span>Safe</span>
                <span className="text-[#E11D1C]">Sync</span>
                <span className="ml-1.5 w-1.5 h-1.5 bg-[#E11D1C] rounded-full" />
              </div>
              <span className="text-[9px] font-bold tracking-[0.18em] text-[#14243A]/60 uppercase mt-1">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9 ml-auto">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-semibold text-[#14243A]/80 hover:text-[#E11D1C] transition-colors duration-200 group py-2"
              >
                {item.name}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#E11D1C] group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            <a
              href={contactHref}
              className="px-6 py-3 bg-[#E11D1C] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#C90D16] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#14243A] hover:bg-[#14243A]/5 hover:text-[#E11D1C] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#14243A]/10 shadow-xl px-6 py-6 flex flex-col gap-5">

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#14243A] font-semibold hover:text-[#E11D1C] transition-colors py-1"
              >
                {item.name}
              </a>
            ))}

            <Link
              to="/terms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-[#14243A] font-semibold hover:text-[#E11D1C] transition-colors"
            >
              <FileText className="w-4 h-4 text-[#E11D1C]" />
              Terms &amp; Conditions
            </Link>

            <a
              href={contactHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full px-5 py-3 bg-[#E11D1C] text-white font-bold rounded-lg text-center hover:bg-[#C90D16] transition-colors"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
