import React from 'react';
import { ChevronDown, CreditCard } from 'lucide-react';

export default function MembershipSection({ workspace, dashboardSection, dw, lang, readOnlyDemo = false }) {
  const {
    accommodationLimit,
    accountRecord,
    chooseRequestedPlan,
    hotelRecords,
    requestedPlanCode,
    trialDaysLeft,
  } = workspace;
  return (
    <section
      id="membership"
      className={`${dashboardSection === 'overview' ? '' : 'hidden'} w-full max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-slate-400">
              {dw.package.label}
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
              {accountRecord?.subscription_status === 'trial'
                ? dw.package.trial
                : `${accountRecord?.plan_code || 'Gastemappe24'} ${dw.package.packageSuffix}`}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {dw.package.used.replace('{count}', hotelRecords.length).replace('{limit}', accommodationLimit)}
              {accountRecord?.trial_ends_at
                ? ` · ${dw.package.trialEnds} ${new Date(accountRecord.trial_ends_at).toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : `${lang}-${lang.toUpperCase()}`)}`
                : accountRecord?.paid_until
                  ? ` · ${dw.package.paidUntil} ${new Date(accountRecord.paid_until).toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : `${lang}-${lang.toUpperCase()}`)}`
                  : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-3 sm:min-w-[210px]">
          <div className="min-w-0 flex-1">
            <div className="flex justify-between gap-2 text-[10px] font-semibold text-slate-500">
              <span>
                {accountRecord?.subscription_status === 'trial'
                  ? dw.package.trialPeriod
                  : dw.package.packageName}
              </span>
              <span className="text-slate-800">
                {accountRecord?.subscription_status === 'trial' && trialDaysLeft !== null
                  ? `${trialDaysLeft} ${dw.package.days}`
                  : dw.package.active}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{
                  width: `${accountRecord?.subscription_status === 'trial' && trialDaysLeft !== null ? Math.max(0, Math.min(100, ((30 - trialDaysLeft) / 30) * 100)) : 100}%`,
                }}
              />
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1.5 text-[9px] font-bold ${accountRecord?.subscription_status === 'trial' ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-700'}`}
          >
            {accountRecord?.subscription_status === 'trial' ? dw.package.trialPeriod : dw.package.active}
          </span>
        </div>
      </div>
      <details className="group mt-4 border-t border-slate-100 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-bold text-slate-700 hover:text-slate-950">
          <span>{dw.package.compare}</span>
          <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
        </summary>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { code: 'single', name: 'Single', ...dw.package.plans.single },
            { code: 'multi', name: 'Multi', ...dw.package.plans.multi, featured: true },
            { code: 'business', name: 'Business', ...dw.package.plans.business },
          ].map((plan) => (
            <article
              key={plan.code}
              className={`rounded-2xl border p-4 ${plan.featured ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200 bg-white'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-amber-800">
                    {dw.package.popular}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs font-bold text-amber-800">{plan.capacity}</p>
              <p className="mt-2 min-h-[32px] text-[10px] text-slate-500">{plan.desc}</p>
              <ul className="mt-3 space-y-1.5 text-[10px] text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-emerald-700">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                disabled={readOnlyDemo}
                onClick={() => chooseRequestedPlan(plan.code)}
                className={`mt-4 w-full rounded-xl px-3 py-2.5 text-[10px] font-bold transition ${requestedPlanCode === plan.code ? 'bg-amber-600 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                {requestedPlanCode === plan.code ? dw.package.requested : dw.package.choose}
              </button>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-slate-500">{dw.package.disclaimer}</p>
      </details>
    </section>
  );
}
