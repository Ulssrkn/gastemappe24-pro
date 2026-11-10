import React from 'react';
import { ArrowRight, CheckCircle2, Settings, Sparkles } from 'lucide-react';
import dashboardWorkspaceCopy from '../dashboardWorkspaceCopy.js';
import dashboardDemoCopy from '../i18n/dashboardDemoCopy.js';

export default function DashboardOverview({
  workspace,
  setup,
  dashboardSection,
  dw,
  navigateDashboardSection,
  lang = 'de',
  readOnlyDemo = false,
}) {
  const { cloudDataStatus, hotel, hotelRecord, hotelRecords } = workspace;
  const { setupSteps, setupCompletedCount, setupProgress } = setup;
  const localHour = new Date().getHours();
  const ui = dashboardDemoCopy[lang] || dashboardDemoCopy.de;
  const dashboardGreetingPeriod =
    localHour < 5 || localHour >= 22
      ? 'night'
      : localHour < 11
        ? 'morning'
        : localHour < 18
          ? 'day'
          : 'evening';
  const dashboardGreeting =
    dw.greeting?.[dashboardGreetingPeriod] || dashboardWorkspaceCopy.en.greeting[dashboardGreetingPeriod];
  return (
    <>
      <section
        id="dashboard-overview"
        className={`${dashboardSection === 'overview' ? '' : 'hidden'} w-full max-w-6xl mx-auto overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-[#142536] via-[#1c3447] to-[#294456] px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-9 sm:py-9`}
      >
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wide text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              {dw.hero.badge}
            </div>
            <p className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {dashboardGreeting}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {dw.hero.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">{dw.hero.description}</p>
          </div>
          <div className="min-w-[220px] rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-slate-300">
              <span
                className={`h-2 w-2 rounded-full ${cloudDataStatus === 'ready' ? 'bg-emerald-400' : cloudDataStatus === 'error' ? 'bg-rose-400' : 'bg-amber-300'}`}
              />
              {readOnlyDemo
                ? ui.sampleData
                : cloudDataStatus === 'ready'
                ? dw.hero.connected
                : cloudDataStatus === 'error'
                  ? dw.hero.error
                  : dw.hero.status}
            </div>
            <p className="mt-2 truncate text-base font-bold text-white">
              {hotelRecord?.name || hotel.name || 'Deine Unterkunft'}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              {hotelRecords.length} {hotelRecords.length === 1 ? dw.hero.one : dw.hero.many}
            </p>
            <button
              type="button"
              onClick={() => navigateDashboardSection('editor')}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-800 hover:bg-slate-100"
            >
              <Settings className="h-3.5 w-3.5" />
              {dw.nav.editor}
            </button>
          </div>
        </div>
      </section>

      <section
        id="setup-guide"
        className={`${dashboardSection === 'overview' ? '' : 'hidden'} w-full max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-amber-700">
              {dw.setup.label}
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
              {setupProgress === 100 ? dw.setup.ready : dw.setup.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">{dw.setup.description}</p>
          </div>
          <div className="flex items-center gap-3 sm:min-w-[230px]">
            <div className="min-w-0 flex-1">
              <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                <span>
                  {setupCompletedCount} {dw.setup.of} {setupSteps.length} {dw.setup.steps}
                </span>
                <span className="font-extrabold text-slate-900">{setupProgress} %</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${setupProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {setupSteps.map((step, index) => (
            <button
              key={step.target}
              type="button"
              onClick={() => {
                navigateDashboardSection('editor');
                setTimeout(
                  () =>
                    document
                      .getElementById(step.target)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                  80
                );
              }}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 text-left transition hover:border-slate-200 hover:bg-white"
            >
              {step.done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[9px] font-bold text-slate-400">
                  {index + 1}
                </span>
              )}
              <span className={`text-[11px] font-semibold ${step.done ? 'text-slate-500' : 'text-slate-800'}`}>
                {dw.setup.items[index]}
              </span>
              {!step.done && <ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-400" />}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
