
import { useState } from 'react';

export default function CookieConsent() {
  const [show, setShow] = useState(true);

  const accept = () => {
    setShow(false);
  };

  const reject = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] w-[calc(100%-40px)] max-w-[325px]">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0B1F3A]/95 px-5 py-6 text-center shadow-2xl backdrop-blur-md sm:px-7 sm:py-7">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />

        <div className="relative z-10">

          {/* Heading */}
          <h2 className="mb-3 text-2xl font-extrabold leading-tight text-white">
            We Respect Your Privacy
          </h2>

          {/* Description */}
          <p className="mb-4 text-sm font-medium leading-6 text-white/95">
            We use cookies to improve your experience on our site and to offer
            you individualized help. When you select "Accept All," you agree
            to our usage of cookies.
          </p>

          {/* Cookie policy */}
          <a
            href="/cookie-policy"
            className="mb-5 inline-block text-sm font-semibold text-sky-400 transition hover:text-sky-300 hover:underline"
          >
            View Cookie Policy
          </a>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={accept}
              className="rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Accept All
            </button>

            <button
              onClick={reject}
              className="rounded-md bg-[#ED111C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
