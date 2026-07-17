import {
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SafeSyncFooter() {
  return (
    <footer className="bg-primary-container text-white pt-20 pb-8 px-6 md:px-24 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer */}
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo */}
          <div className="lg:col-span-2">
            <div className="mb-6">
                <img src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/logo2_mojna5" alt="SafeSync Logo" className="h-20" />
            </div>

            <p className="mt-5 text-white/70 leading-7 max-w-sm">
              SafeSync is an intelligent emergency response platform
              connecting citizens, responders, hospitals and command
              centres to deliver faster, safer and more coordinated
              emergency assistance.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@safesync.co.ke</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+254 720 889 352</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare size={18} />
                <span>24/7 Emergency Support</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Platform
            </h3>
            <div className="flex flex-col gap-3 text-white/70">
              <a href="#platform" className="hover:text-white transition">
                Overview
              </a>
              <a href="#benefits" className="hover:text-white transition">
                Benefits
              </a>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition">
                How It Works
              </a>
              <a href="/documentation" className="hover:text-white transition">
                Documentation
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Company
            </h3>
            <div className="flex flex-col gap-3 text-white/70">
              <a href="#about" className="hover:text-white transition">
                About SafeSync
              </a>
              <a href="#contact" className="hover:text-white transition">
                Contact Us
              </a>
              <a href="#faq" className="hover:text-white transition">
                FAQs
              </a>
              <a href="#" className="hover:text-white transition">
                Support Portal
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">
              Legal
            </h3>
            <div className="flex flex-col gap-3 text-white/70">
              <a
                href="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </a>
              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms &amp; Conditions
              </Link>
              <a
                href="/cookie-policy"
                className="hover:text-white transition"
              >
                Cookie Policy
              </a>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4 text-white">
                Download App
              </h3>
              <div className="space-y-4">
                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.safesync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition duration-300"
                >
                  <img
                    src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/playstore_ae7fqk"
                    alt="Google Play"
                    className="w-8 h-8 object-contain"
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
                  className="flex items-center gap-3 hover:text-white transition duration-300"
                >
                  <img
                    src="https://res.cloudinary.com/di15s67o/image/upload/f_auto,q_auto/apple-logo_dcz0jz"
                    alt="App Store"
                    className="w-8 h-8 object-contain"
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

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} SafeSync Technologies.
              All Rights Reserved.
            </p>
            <div className="flex gap-6 flex-wrap justify-center">
              <a
                href="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </a>
              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms &amp; Conditions
              </Link>
              <a
                href="/cookie-policy"
                className="hover:text-white transition"
              >
                Cookies
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-white/40 text-xs">
             • SafeSync Version 1.0.0  •
          </div>
        </div>
      </div>
    </footer>
  );
}
