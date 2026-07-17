import { ChevronLeft, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Breadcrumb from './Breadcrumb';

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content?: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  sections: Section[];
  heroImage: string;
  children?: React.ReactNode;
}

export default function LegalLayout({ title, subtitle, sections, heroImage, children }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="bg-[#fcfaf7] min-h-screen text-gray-800 scroll-smooth">
      <div className="relative w-full h-80 bg-gray-900 overflow-hidden">
        <img 
          src={heroImage}
          alt="Hero" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-6 md:left-32">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: title }]} />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{title}</h2>
          <p className="text-white/80">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6 md:px-32 flex flex-col md:flex-row gap-12">
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-24">
            <h4 className="font-bold text-primary mb-4">Table of Contents</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {sections.map(section => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`} 
                    className={`transition-colors ${activeSection === section.id ? 'text-primary font-bold' : 'hover:text-primary'}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 space-y-8">
          {sections.map(section => (
            <motion.div 
              key={section.id} 
              id={section.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">{section.title}</h3>
              </div>
              {section.content && <p className="text-gray-600">{section.content}</p>}
            </motion.div>
          ))}
          {children}
        </main>
      </div>
    </div>
  );
}
