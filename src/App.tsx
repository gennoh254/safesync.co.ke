<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import { AuthForm, AccountType } from './components/LoginForm';
import { PasswordRecovery } from './components/PasswordRecovery';
import { HomeDashboard } from './components/HomeDashboard';
import { ReceiverLayout } from './components/ReceiverLayout';
import { AdminLayout } from './components/AdminLayout';
import { AlertProvider } from './context/AlertContext';
import { ThemeProvider } from './context/ThemeContext';
import { PushNotificationProvider } from './context/PushNotificationContext';
import { Header } from './components/Header';
import { FooterStatusBar } from './components/Footer';
import { supabase } from './lib/supabase';

type AppView = 'login' | 'recovery' | 'admin';

export default function App() {
  const [userType, setUserType] = useState<AccountType | null>(null);
  const [authView, setAuthView] = useState<AppView>('login');
  const [initializing, setInitializing] = useState(true);

  // Listen for auth state changes (handles session restore, login, logout)
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && mounted) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile && mounted) {
          setUserType(profile.user_type as AccountType);
        } else if (session.user.user_metadata?.user_type && mounted) {
          // Fallback to user_metadata if profile doesn't exist
          // Create missing profile
          const userType = session.user.user_metadata.user_type as AccountType;
          await supabase.from('profiles').upsert({
            id: session.user.id,
            name: session.user.user_metadata.name || '',
            email: session.user.email || '',
            user_type: userType,
            organization_name: session.user.user_metadata.organization_name || '',
            phone: '',
            response_types: [],
          }, { onConflict: 'id' });
          setUserType(userType);
        }
      }
      if (mounted) setInitializing(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT' || !session) {
        setUserType(null);
        setAuthView('login');
        return;
      }

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setUserType(profile.user_type as AccountType);
        } else if (session.user.user_metadata?.user_type) {
          // Fallback to user_metadata if profile doesn't exist
          // Create missing profile
          const userType = session.user.user_metadata.user_type as AccountType;
          await supabase.from('profiles').upsert({
            id: session.user.id,
            name: session.user.user_metadata.name || '',
            email: session.user.email || '',
            user_type: userType,
            organization_name: session.user.user_metadata.organization_name || '',
            phone: '',
            response_types: [],
          }, { onConflict: 'id' });
          setUserType(userType);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserType(null);
    setAuthView('login');
  };

  // Admin portal view (no auth required)
  if (authView === 'admin') {
    return (
      <ThemeProvider>
        <AdminLayout onExit={() => setAuthView('login')} />
      </ThemeProvider>
    );
  }

  if (initializing) {
    return (
      <ThemeProvider>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <PushNotificationProvider>
      <AlertProvider>
        {!userType ? (
          <div className="flex flex-col min-h-screen bg-gray-100 text-black">
            <Header />

            <main className="flex-grow flex items-center justify-center p-8">
              {authView === 'login' ? (
                <AuthForm
                  onAuthenticate={(type) => setUserType(type)}
                  onRecoverPassword={() => setAuthView('recovery')}
                  onAdminPortal={() => setAuthView('admin')}
                />
              ) : (
                <PasswordRecovery
                  onBack={() => setAuthView('login')}
                />
              )}
            </main>

            <FooterStatusBar />
          </div>
        ) : (
          <div className="flex flex-col min-h-screen bg-white text-black items-center justify-center">
            {userType === 'Client' ? (
              <HomeDashboard onLogout={handleLogout} />
            ) : userType === 'Administrator' ? (
              <AdminLayout onExit={handleLogout} />
            ) : (
              <ReceiverLayout onLogout={handleLogout} />
            )}
          </div>
        )}
      </AlertProvider>
      </PushNotificationProvider>
    </ThemeProvider>
>>>>>>> f5c5807984db4133d11d89442cd66571f7a199e3
  );
}
