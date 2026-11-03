
import {
  Mail,
  Phone,
  MessageSquare,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SafeSyncFooter() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/YOUR_INSTAGRAM_HANDLE/",
      icon: <Instagram size={20} />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@safesync.app?lang=en",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.55v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.18-.02-.36-.05-.53v-3.61a6.5 6.5 0 1 0 3.6 5.81V9.75a8.38 8.38 0 0 0 4.9 1.57V7.77a4.8 4.8 0 0 1-1.13-1.08z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/YOUR-LINKEDIN-PAGE/",
      icon: <Linkedin size={20} />,
    },
  ];

  return (
    <footer className="bg-primary-container px-6 pb-8 pt-20 text-white md:px-24 lg:px-32">
      <div className="mx-auto max-w-7xl">

        {/* Top Footer */}
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-5">

          {/* Logo and Contact */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img
                src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/logo2_mojna5"
                alt="SafeSync Logo"
                className="h-20"
              />
            </div>

            <p className="mt-5 max-w-sm leading-7 text-white/70">
              SafeSync is an intelligent emergency response platform
              connecting citizens, responders, hospitals and command
              centres to deliver faster, safer and more coordinated
              emergency assistance.
            </p>

            {/* Contact details */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-[#ED111C]" />
                <span>support@safesync.co.ke</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-[#ED111C]" />
                <span>+254 720 889 352</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare size={18} className="shrink-0 text-[#ED111C]" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-bold tracking-wide text-white">
                FOLLOW SAFESYNC
              </h3>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow SafeSync on ${social.name}`}
                    title={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ED111C] hover:bg-[#ED111C] hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Platform
            </h3>

            <div className="flex flex-col gap-3 text-white/70">
              <a href="#platform" className="transition hover:text-white">
                Overview
              </a>
              <a href="#benefits" className="transition hover:text-white">
                Benefits
              </a>
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="transition hover:text-white">
                How It Works
              </a>
              <a href="/documentation" className="transition hover:text-white">
                Documentation
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-white/70">
              <a href="#about" className="transition hover:text-white">
                About SafeSync
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact Us
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQs
              </a>
              <a href="#" className="transition hover:text-white">
                Support Portal
              </a>
            </div>
          </div>

          {/* Legal and Downloads */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-3 text-white/70">
              <Link to="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </Link>

              <Link to="/terms" className="transition hover:text-white">
                Terms &amp; Conditions
              </Link>

              <Link to="/cookie-policy" className="transition hover:text-white">
                Cookie Policy
              </Link>
            </div>

            {/* Download App */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Download App
              </h3>

              <div className="space-y-4">

                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.safesync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition duration-300 hover:opacity-80"
                >
                  <img
                    src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/playstore_ae7fqk"
                    alt="Google Play"
                    className="h-8 w-8 object-contain"
                  />

                  <div className="leading-tight">
                    <p className="text-xs text-white/60">Get it on</p>
                    <p className="text-sm font-semibold text-white">
                      Google Play Store
                    </p>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="https://apps.apple.com/app/safesync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition duration-300 hover:opacity-80"
                >
                  <img
                    src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/apple-logo_dcz0jz"
                    alt="App Store"
                    className="h-8 w-8 object-contain"
                  />

                  <div className="leading-tight">
                    <p className="text-xs text-white/60">Download on the</p>
                    <p className="text-sm font-semibold text-white">
                      Apple App Store
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-sm text-white/60 md:flex-row">

            <p>
              © {new Date().getFullYear()} SafeSync Technologies.
              All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </Link>

              <Link to="/terms" className="transition hover:text-white">
                Terms &amp; Conditions
              </Link>

              <Link to="/cookie-policy" className="transition hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
