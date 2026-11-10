import React, { useMemo, useRef, useState } from 'react';
import Dashboard from '../dashboard/Dashboard.jsx';
import useDashboardAnalytics from '../dashboard/useDashboardAnalytics.js';
import useGuideWorkspace from '../dashboard/useGuideWorkspace.js';
import groupCategories from '../guide/groupCategories.js';
import { themeColors } from '../guide/guideContent.js';
import translations from '../i18n/guideCopy.js';
import pilotCopy from '../pilotCopy.js';
import useGuideNavigation from '../navigation/useGuideNavigation.js';

function sampleAnalytics(categories) {
  const rows = [];
  const today = new Date();
  const ids = (categories || []).slice(0, 6).map((category) =>
    String(category.id).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 68)
  );
  for (let offset = 179; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const eventDate = date.toISOString().slice(0, 10);
    const dayIndex = 179 - offset;
    rows.push({ event_date: eventDate, page_key: 'guest_home', views: 4 + (dayIndex % 13) });
    rows.push({ event_date: eventDate, page_key: 'guest_services', views: 3 + (dayIndex % 9) });
    rows.push({ event_date: eventDate, page_key: 'action_route', views: dayIndex % 4 });
    ids.forEach((id, index) => {
      rows.push({ event_date: eventDate, page_key: `category_${id}`, views: (dayIndex * (index + 3) + index * 7) % (24 - index * 2) });
    });
    if (dayIndex % 3 === 0) rows.push({ event_date: eventDate, page_key: 'action_website', views: 1 + (dayIndex % 3) });
  }
  return rows;
}

export default function DemoAdmin() {
  const [lang, setLang] = useState('de');
  const navigation = useGuideNavigation();
  const ownerRef = useRef({ id: null });
  const pilot = pilotCopy[lang] || pilotCopy.de;
  const t = translations[lang] || translations.de;
  const baseWorkspace = useGuideWorkspace({
    authSession: null,
    recoveringPassword: false,
    ownerRef,
    guestSlug: null,
    setSelectedCategory: navigation.setSelectedCategory,
    pilot,
  });
  const demoRecord = useMemo(() => ({
    id: 'demo-waldquell',
    slug: 'waldquell-am-tegernsee-demo',
    name: 'Waldquell am Tegernsee · DEMO',
    owner_id: null,
  }), []);
  const demoAccount = useMemo(() => ({
    subscription_status: 'trial',
    plan_code: 'trial',
    trial_ends_at: new Date(Date.now() + 21 * 86400000).toISOString(),
    requested_plan_code: 'single',
  }), []);
  const workspace = {
    ...baseWorkspace,
    hotelRecord: demoRecord,
    hotelRecords: [demoRecord],
    selectedHotelId: demoRecord.id,
    accountRecord: demoAccount,
    accommodationLimit: 3,
    accommodationLimitReached: false,
    trialDaysLeft: 21,
    trialExpired: false,
    canManage: false,
    cloudDataStatus: 'ready',
    guidePublished: true,
    guestPageUrl: typeof window !== 'undefined' ? `${window.location.origin}/` : '/',
  };
  const analyticsBase = useDashboardAnalytics({
    hotelRecord: null,
    authSession: null,
    guestSlug: null,
    appMode: 'demo',
  });
  const demoRows = useMemo(() => sampleAnalytics(baseWorkspace.categories), [baseWorkspace.categories]);
  const analytics = { ...analyticsBase, analyticsRows: demoRows, analyticsLoading: false };
  const currentTheme = themeColors.find((theme) => theme.id === workspace.hotel.themeColor) || themeColors[0];
  const groupedCategories = groupCategories(workspace.categories, lang);

  return (
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
      readOnlyDemo
      onGuestPreview={() => {
        if (typeof window !== 'undefined') window.location.assign('/');
      }}
      onSignOut={() => {}}
    />
  );
}
