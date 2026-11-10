import React from 'react';
import { BarChart3, Building2, CreditCard, LayoutDashboard, Settings } from 'lucide-react';
import dashboardDemoCopy from '../i18n/dashboardDemoCopy.js';

export default function DashboardNavigation({ dashboardSection, dw, navigateDashboardSection, readOnlyDemo = false }) {
  const ui = dashboardDemoCopy[dw.language] || dashboardDemoCopy.de;
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200/80 bg-white px-5 py-7 md:flex">
        <button
          type="button"
          onClick={() => navigateDashboardSection('overview')}
          className="flex items-center gap-3 px-2 text-left"
        >
          {readOnlyDemo ? (
            <img src="/gastemappe24-logo.svg" alt="Gastemappe24" className="h-10 w-auto max-w-[190px] object-contain object-left" />
          ) : (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-black text-amber-300 shadow-sm">G</span>
              <span className="text-[15px] font-extrabold tracking-tight text-slate-900">
                gastemappe<span className="text-amber-700">24</span>
                <span className="block pt-0.5 text-[9px] font-bold uppercase tracking-[.2em] text-slate-400">Gastgeber-Workspace</span>
              </span>
            </>
          )}
        </button>
        <div className="mt-10 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
          Arbeitsbereich
        </div>
        <nav className="mt-3 space-y-1.5">
          {[
            [LayoutDashboard, dw.nav.overview, 'overview'],
            [Building2, dw.nav.accommodations, 'accommodations'],
            [BarChart3, dw.nav.analytics, 'analytics'],
            [Settings, dw.nav.editor, 'editor'],
          ].map(([Icon, label, section]) => (
            <button
              key={label}
              type="button"
              onClick={() => navigateDashboardSection(section)}
              aria-current={dashboardSection === section ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition ${dashboardSection === section ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Icon className="h-[17px] w-[17px]" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-8 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">
          Konto
        </div>
        <button
          type="button"
          onClick={() => {
            navigateDashboardSection('overview');
            setTimeout(
              () =>
                document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
              60
            );
          }}
          className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <CreditCard className="h-[17px] w-[17px]" />
          {dw.nav.package}
        </button>
        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {readOnlyDemo ? ui.demo : dw.hero.status}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{readOnlyDemo ? ui.demoHint : dw.hero.description}</p>
        </div>
      </aside>
      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur md:hidden">
        {[
          [LayoutDashboard, dw.nav.start, 'overview'],
          [Building2, dw.nav.accommodations, 'accommodations'],
          [BarChart3, dw.nav.analytics, 'analytics'],
          [Settings, dw.nav.edit, 'editor'],
        ].map(([Icon, label, section]) => (
          <button
            key={label}
            type="button"
            onClick={() => navigateDashboardSection(section)}
            aria-current={dashboardSection === section ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[9px] font-semibold ${dashboardSection === section ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
