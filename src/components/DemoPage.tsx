import { motion } from 'motion/react';
import SafeSyncNavbar from './SafeSyncNavbar';
import SafeSyncFooter from './SafeSyncFooter';

export default function DemoPage() {
  return (
    <div className="font-sans text-on-background">
      <SafeSyncNavbar />
      <section className="py-24 px-6 md:px-32 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">SafeSync Platform Demo</h1>
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="SafeSync Platform Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="mt-12 text-center">
            <a href="/" className="inline-block px-10 py-4 bg-black text-white font-bold hover:scale-105 transition-transform rounded-xl shadow-lg">
              Back to Home
            </a>
          </div>
        </div>
      </section>
      <SafeSyncFooter />
    </div>
  );
}
