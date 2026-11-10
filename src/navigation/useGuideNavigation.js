import { useEffect, useRef, useState } from 'react';

const dashboardSections = ['overview', 'accommodations', 'analytics', 'editor', 'membership'];

function dashboardSectionFromHash(hash) {
  const section = hash.replace(/^#(?:dashboard-)?/, '');
  return dashboardSections.includes(section) ? section : 'overview';
}

export default function useGuideNavigation(initialWelcome = true) {
  const [dashboardSection, setDashboardSection] = useState(() => {
    const hash = typeof window === 'undefined' ? '' : window.location.hash;
    return dashboardSectionFromHash(hash);
  });

  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(initialWelcome);
  const navigateDashboardSection = (section) => {
    const normalized = dashboardSections.includes(section) ? section : 'overview';
    const nextHash = `#dashboard-${normalized}`;
    if (typeof window !== 'undefined' && window.location.hash !== nextHash)
      window.history.pushState({ gm24Dashboard: true, dashboardSection: normalized }, '', nextHash);
    setDashboardSection(normalized);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const guestNavigationRef = useRef({ activeTab: 'home', selectedCategory: null });
  useEffect(() => {
    guestNavigationRef.current = { activeTab, selectedCategory };
  }, [activeTab, selectedCategory]);
  const navigateGuest = (tab, category = null) => {
    if (typeof window !== 'undefined' && !document.getElementById('dashboard-overview')) {
      window.history.pushState({ gm24Guest: true, activeTab: tab, selectedCategory: category }, '');
    }
    setActiveTab(tab);
    setSelectedCategory(category);
  };
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const isDashboard = () => Boolean(document.getElementById('dashboard-overview'));
    if (!isDashboard())
      window.history.replaceState(
        { ...(window.history.state || {}), gm24Guest: true, activeTab: 'home', selectedCategory: null },
        ''
      );
    const handlePopState = (event) => {
      if (isDashboard()) {
        const hash = window.location.hash;
        setDashboardSection(dashboardSectionFromHash(hash));
        if (!hash) window.location.hash = 'dashboard-overview';
        return;
      }
      if (event.state?.gm24Guest) {
        setActiveTab(event.state.activeTab === 'services' ? 'services' : 'home');
        setSelectedCategory(event.state.selectedCategory || null);
      } else {
        const current = guestNavigationRef.current;
        if (current.selectedCategory) setSelectedCategory(null);
        else if (current.activeTab === 'services') setActiveTab('home');
        else window.history.pushState({ gm24Guest: true, activeTab: 'home', selectedCategory: null }, '');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  return {
    dashboardSection,
    navigateDashboardSection,
    activeTab,
    selectedCategory,
    setSelectedCategory,
    showWelcomeScreen,
    setShowWelcomeScreen,
    navigateGuest,
  };
}

