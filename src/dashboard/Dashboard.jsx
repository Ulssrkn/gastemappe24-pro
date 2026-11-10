import React from 'react';
import dashboardWorkspaceCopy from '../dashboardWorkspaceCopy.js';
import AccommodationDialogs from './AccommodationDialogs.jsx';
import AccommodationsSection from './AccommodationsSection.jsx';
import AnalyticsSection from './AnalyticsSection.jsx';
import DashboardHeader from './DashboardHeader.jsx';
import DashboardNavigation from './DashboardNavigation.jsx';
import DashboardOverview from './DashboardOverview.jsx';
import GuideEditor from './GuideEditor.jsx';
import MembershipSection from './MembershipSection.jsx';
import getGuideSetup from './guideSetup.js';

export default function Dashboard({
  workspace,
  navigation,
  analytics,
  groupedCategories,
  currentTheme,
  lang,
  setLang,
  pilot,
  t,
  onGuestPreview,
  onSignOut,
  readOnlyDemo = false,
}) {
  const dw = dashboardWorkspaceCopy[lang] || dashboardWorkspaceCopy.de;
  const { dashboardSection, navigateDashboardSection } = navigation;
  const setup = getGuideSetup(workspace.hotel, workspace.categories);
  const section = { dashboardSection, dw };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip box-border bg-[#f5f6f8] font-sans text-slate-800 p-3 sm:p-6 md:py-8 md:pr-10 md:pl-[18rem] space-y-6 sm:space-y-8 relative pb-28">
      <DashboardNavigation {...section} navigateDashboardSection={navigateDashboardSection} readOnlyDemo={readOnlyDemo} />
      <AccommodationDialogs workspace={workspace} currentTheme={currentTheme} lang={lang} pilot={pilot} t={t} />
      <DashboardHeader
        workspace={workspace}
        lang={lang}
        pilot={pilot}
        setLang={setLang}
        t={t}
        onGuestPreview={onGuestPreview}
        onSignOut={onSignOut}
        readOnlyDemo={readOnlyDemo}
      />
      <DashboardOverview
        {...section}
        workspace={workspace}
        setup={setup}
        navigateDashboardSection={navigateDashboardSection}
        readOnlyDemo={readOnlyDemo}
      />
      <AccommodationsSection {...section} workspace={workspace} readOnlyDemo={readOnlyDemo} />
      <MembershipSection {...section} workspace={workspace} lang={lang} readOnlyDemo={readOnlyDemo} />
      <AnalyticsSection
        {...section}
        analytics={analytics}
        categories={workspace.categories}
        lang={lang}
        navigateDashboardSection={navigateDashboardSection}
        setup={setup}
        t={t}
      />
      <GuideEditor
        {...section}
        workspace={workspace}
        currentTheme={currentTheme}
        groupedCategories={groupedCategories}
        lang={lang}
        pilot={pilot}
        t={t}
        readOnlyDemo={readOnlyDemo}
      />
    </div>
  );
}
