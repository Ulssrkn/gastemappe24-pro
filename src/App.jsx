import React, { lazy, Suspense, useEffect, useState } from 'react';
import { DashboardStatus, GuestStatus } from './app/GuideStatus.jsx';
import useAuthSession from './auth/useAuthSession.js';
import AuthGate from './components/AuthGate.jsx';
import useDashboardAnalytics from './dashboard/useDashboardAnalytics.js';
import useGuideWorkspace from './dashboard/useGuideWorkspace.js';
import GuestGuide from './guest/GuestGuide.jsx';
import useGuideWeather from './guest/useGuideWeather.js';
import usePublishedGuide from './guest/usePublishedGuide.js';
import groupCategories from './guide/groupCategories.js';
import { themeColors } from './guide/guideContent.js';
import translations from './i18n/guideCopy.js';
import { supabase } from './lib/supabaseClient.js';
import useGuideNavigation from './navigation/useGuideNavigation.js';
import pilotCopy from './pilotCopy.js';
import DemoAdmin from './demo/DemoAdmin.jsx';

const Dashboard = lazy(() => import('./dashboard/Dashboard.jsx'));

function AppShell() {
  const [lang, setLang] = useState('de');
  const [appMode, setAppMode] = useState('guest');
  const guestSlug =
    typeof window !== 'undefined'
      ? window.location.pathname.match(/^\/g\/([a-z0-9-]+)\/?$/i)?.[1] || null
      : null;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = translations[lang] || translations.de;
  const pilot = pilotCopy[lang] || pilotCopy.de;
  const auth = useAuthSession();
  const navigation = useGuideNavigation();
  const { setSelectedCategory, setShowWelcomeScreen } = navigation;
  const workspace = useGuideWorkspace({ ...auth, guestSlug, setSelectedCategory, pilot });
  const { hotel, categories, hotelRecord, setHotel, setCategories } = workspace;
  const published = usePublishedGuide(guestSlug, setHotel, setCategories);
  const forecast = useGuideWeather(hotel, lang);
  const analytics = useDashboardAnalytics({ hotelRecord, authSession: auth.authSession, guestSlug, appMode });
  const currentTheme = themeColors.find((theme) => theme.id === hotel.themeColor) || themeColors[0];
  const groupedCategories = groupCategories(categories, lang);

  if (auth.recoveringPassword && auth.authSession && !guestSlug) {
    return (
      <AuthGate
        supabase={supabase}
        lang={lang}
        recovery
        onRecovered={() => {
          auth.setRecoveringPassword(false);
          setAppMode('dashboard');
        }}
      />
    );
  }

  if (appMode === 'dashboard') {
    return (
      <DashboardStatus
        authSession={auth.authSession}
        authLoading={auth.authLoading}
        canManage={workspace.canManage}
        cloudDataError={workspace.cloudDataError}
        trialExpired={workspace.trialExpired}
        accountRecord={workspace.accountRecord}
        lang={lang}
        pilot={pilot}
        setAppMode={setAppMode}
        setShowWelcomeScreen={setShowWelcomeScreen}
      >
        <Suspense
          fallback={
            <p className="p-6 text-sm text-slate-600" role="status">
              {pilot.loading}
            </p>
          }
        >
          <Dashboard
            workspace={workspace}
            navigation={navigation}
            analytics={analytics}
            groupedCategories={groupedCategories}
            currentTheme={currentTheme}
            lang={lang}
            setLang={setLang}
            pilot={pilot}
            t={t}
            onGuestPreview={() => {
              setAppMode('guest');
              setShowWelcomeScreen(false);
            }}
            onSignOut={async () => {
              await supabase.auth.signOut();
              setAppMode('guest');
              setShowWelcomeScreen(true);
            }}
          />
        </Suspense>
      </DashboardStatus>
    );
  }

  return (
    <GuestStatus guestSlug={guestSlug} guestPageStatus={published.guestPageStatus}>
      <GuestGuide
        navigation={navigation}
        published={published}
        forecast={forecast}
        groupedCategories={groupedCategories}
        currentTheme={currentTheme}
        guestSlug={guestSlug}
        hotel={hotel}
        lang={lang}
        setLang={setLang}
        setAppMode={setAppMode}
        pilot={pilot}
        t={t}
      />
    </GuestStatus>
  );
}

function App() {
  const isPublicAdminDemo =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('demo') === 'admin';
  return isPublicAdminDemo ? <DemoAdmin /> : <AppShell />;
}

export default App;
