/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SafeSyncNavbar from './components/SafeSyncNavbar';
import SafeSyncHero from './components/SafeSyncHero';
import SafeSyncStats from './components/SafeSyncStats';
import { motion } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import RouterScrollToTop from './components/RouterScrollToTop';

import SafeSyncHowItWorks from './components/SafeSyncHowItWorks';
import SafeSyncPlatform from './components/SafeSyncPlatform';
import SafeSyncIndustries from './components/SafeSyncIndustries';
import PartnerCard from './components/PartnerCard';
import SafeSyncPartners from './components/SafeSyncPartners';
import InsurancePackages from './components/InsurancePackages';
import SafeSyncAbout from './components/SafeSyncAbout';
import SafeSyncFAQ from './components/SafeSyncFAQ';
import SafeSyncTerms from './components/SafeSyncTerms';
import SafeSyncPrivacyPolicy from './components/SafeSyncPrivacyPolicy';
import SafeSyncCookiePolicy from './components/SafeSyncCookiePolicy';
import SafeSyncContactForm from './components/SafeSyncContactForm';
import SafeSyncFooter from './components/SafeSyncFooter';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import FloatingContact from './components/FloatingContact';
import ChatBot from './components/ChatBot';
import DemoPage from './components/DemoPage';

const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function HomePage() {
  return (
      <div className="font-sans text-on-background bg-background transition-colors duration-300">
        <ScrollProgressBar />
        <FloatingContact />
        <ChatBot />
        <SafeSyncNavbar />
        <SafeSyncHero />
        <AnimationWrapper><SafeSyncStats /></AnimationWrapper>

        <AnimationWrapper><SafeSyncHowItWorks /></AnimationWrapper>
        <AnimationWrapper><SafeSyncPlatform /></AnimationWrapper>
        <AnimationWrapper><SafeSyncIndustries /></AnimationWrapper>
        <AnimationWrapper><PartnerCard /></AnimationWrapper>
        <AnimationWrapper><SafeSyncPartners /></AnimationWrapper>
        <AnimationWrapper><InsurancePackages /></AnimationWrapper>
        <AnimationWrapper><SafeSyncAbout /></AnimationWrapper>
        <AnimationWrapper><SafeSyncFAQ /></AnimationWrapper>
        <AnimationWrapper><SafeSyncContactForm /></AnimationWrapper>
        <SafeSyncFooter />
        <ScrollToTop />
      </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
        <BrowserRouter>
          <RouterScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/terms" element={<SafeSyncTerms />} />
            <Route path="/privacy-policy" element={<SafeSyncPrivacyPolicy />} />
            <Route path="/cookie-policy" element={<SafeSyncCookiePolicy />} />
          </Routes>
        </BrowserRouter>
    </LanguageProvider>
  );
}
