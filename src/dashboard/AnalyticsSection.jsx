import React from 'react';
import {
  Map,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  MapPin,
  MessageSquare,
  MousePointerClick,
  TrendingUp,
} from 'lucide-react';
import analyticsCopy from '../analyticsCopy.js';
import { categoryPresets } from '../guide/presetCatalog.js';

export default function AnalyticsSection({
  analytics,
  setup,
  categories,
  dashboardSection,
  dw,
  lang,
  navigateDashboardSection,
  t,
}) {
  const { analyticsLoading, analyticsPeriodDays, analyticsRows, setAnalyticsPeriodDays } = analytics;
  const { setupCompletedCount, setupProgress, setupSteps } = setup;
  const ac = analyticsCopy[lang] || analyticsCopy.en;
  const analyticsDashboardTitles = {
    de: 'Was deine Gäste wirklich nutzen',
    en: 'What your guests really use',
    tr: 'Misafirlerinin gerçekten kullandıkları',
    fr: 'Ce que vos voyageurs utilisent vraiment',
    es: 'Lo que tus huéspedes realmente usan',
    cs: 'Co hosté skutečně používají',
    sq: 'Çfarë përdorin vërtet mysafirët',
    sv: 'Vad dina gäster faktiskt använder',
    nb: 'Hva gjestene faktisk bruker',
    no: 'Hva gjestene faktisk bruker',
    it: 'Cosa usano davvero i tuoi ospiti',
    hr: 'Što vaši gosti zaista koriste',
  };
  const analyticsPeriodLabels = {
    de: { 7: 'Letzte 7 Tage', 30: 'Letzte 30 Tage', 90: 'Letzte 90 Tage' },
    en: { 7: 'Last 7 days', 30: 'Last 30 days', 90: 'Last 90 days' },
    tr: { 7: 'Son 7 gün', 30: 'Son 30 gün', 90: 'Son 90 gün' },
    fr: { 7: '7 derniers jours', 30: '30 derniers jours', 90: '90 derniers jours' },
    es: { 7: 'Últimos 7 días', 30: 'Últimos 30 días', 90: 'Últimos 90 días' },
    cs: { 7: 'Posledních 7 dní', 30: 'Posledních 30 dní', 90: 'Posledních 90 dní' },
    sq: { 7: '7 ditët e fundit', 30: '30 ditët e fundit', 90: '90 ditët e fundit' },
    sv: { 7: 'Senaste 7 dagarna', 30: 'Senaste 30 dagarna', 90: 'Senaste 90 dagarna' },
    nb: { 7: 'Siste 7 dager', 30: 'Siste 30 dager', 90: 'Siste 90 dager' },
    no: { 7: 'Siste 7 dager', 30: 'Siste 30 dager', 90: 'Siste 90 dager' },
    it: { 7: 'Ultimi 7 giorni', 30: 'Ultimi 30 giorni', 90: 'Ultimi 90 giorni' },
    hr: { 7: 'Posljednjih 7 dana', 30: 'Posljednjih 30 dana', 90: 'Posljednjih 90 dana' },
  };
  const analyticsComparisonLabels = {
    de: 'gegenüber den vorherigen {days} Tagen',
    en: 'compared with the previous {days} days',
    tr: 'önceki {days} güne göre',
    fr: 'par rapport aux {days} jours précédents',
    es: 'frente a los {days} días anteriores',
    cs: 'oproti předchozím {days} dnům',
    sq: 'krahasuar me {days} ditët e mëparshme',
    sv: 'jämfört med föregående {days} dagar',
    nb: 'sammenlignet med de foregående {days} dagene',
    no: 'sammenlignet med de foregående {days} dagene',
    it: 'rispetto ai {days} giorni precedenti',
    hr: 'u usporedbi s prethodnih {days} dana',
  };
  const selectedAnalyticsRange = (analyticsPeriodLabels[lang] || analyticsPeriodLabels.en)[analyticsPeriodDays];
  const analyticsComparison = (analyticsComparisonLabels[lang] || analyticsComparisonLabels.en).replace(
    '{days}',
    analyticsPeriodDays
  );
  const analyticsToday = new Date();
  const todayKey = analyticsToday.toISOString().slice(0, 10);
  const currentStart = new Date(analyticsToday.getTime() - (analyticsPeriodDays - 1) * 86400000)
    .toISOString()
    .slice(0, 10);
  const previousStart = new Date(analyticsToday.getTime() - (analyticsPeriodDays * 2 - 1) * 86400000)
    .toISOString()
    .slice(0, 10);
  const previousEnd = new Date(analyticsToday.getTime() - analyticsPeriodDays * 86400000)
    .toISOString()
    .slice(0, 10);
  const actionEvent = (key) =>
    key.startsWith('action_') || key.startsWith('feedback_') || key === 'guest_route' || key === 'guest_review';
  const currentRows = analyticsRows.filter(
    (row) => row.event_date >= currentStart && row.event_date <= todayKey
  );
  const previousRows = analyticsRows.filter(
    (row) => row.event_date >= previousStart && row.event_date <= previousEnd
  );
  const rowSum = (rows) => rows.reduce((sum, row) => sum + Number(row.views || 0), 0);
  const guideViews = rowSum(currentRows.filter((row) => !actionEvent(row.page_key)));
  const previousGuideViews = rowSum(previousRows.filter((row) => !actionEvent(row.page_key)));
  const guideChange = previousGuideViews
    ? Math.round(((guideViews - previousGuideViews) / previousGuideViews) * 100)
    : null;
  const usefulClicks = rowSum(
    currentRows.filter((row) =>
      [
        'action_route',
        'action_wifi_copy',
        'action_review',
        'action_call',
        'action_website',
        'guest_route',
        'guest_review',
      ].includes(row.page_key)
    )
  );
  const feedbackYes = rowSum(currentRows.filter((row) => row.page_key === 'feedback_helpful'));
  const feedbackNo = rowSum(currentRows.filter((row) => row.page_key === 'feedback_not_helpful'));
  const feedbackTotal = feedbackYes + feedbackNo;
  const feedbackRate = feedbackTotal ? Math.round((feedbackYes / feedbackTotal) * 100) : null;
  const categoryTotals = currentRows
    .filter((row) => row.page_key.startsWith('category_'))
    .reduce((out, row) => {
      out[row.page_key] = (out[row.page_key] || 0) + Number(row.views || 0);
      return out;
    }, {});
  const getAnalyticsPageLabel = (key) => {
    if (key === 'guest_home') return t.navHome;
    if (key === 'guest_services') return t.navGaestemappe;
    if (key.startsWith('category_')) {
      const id = key.slice(9);
      const category = categories.find(
        (item) =>
          String(item.id)
            .replace(/[^A-Za-z0-9_-]/g, '')
            .slice(0, 68) === id
      );
      const preset = category?.presetData || categoryPresets.find((item) => item.id === category?.presetId);
      return (
        category?.customTitle ||
        category?.title ||
        preset?.title?.[lang] ||
        preset?.title?.de ||
        'Guest section'
      );
    }
    return key.replace(/[_-]+/g, ' ');
  };
  const topCategories = Object.entries(categoryTotals)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 5);
  const topCategory = topCategories[0] || null;
  const dailyGuideViews = Array.from({ length: analyticsPeriodDays }, (_, i) => {
    const date = new Date(analyticsToday.getTime() - (analyticsPeriodDays - 1 - i) * 86400000)
      .toISOString()
      .slice(0, 10);
    return {
      date,
      value: rowSum(currentRows.filter((row) => row.event_date === date && !actionEvent(row.page_key))),
    };
  });
  const chartMax = Math.max(1, ...dailyGuideViews.map((day) => day.value));
  return (
    <section
      id="analytics"
      className={`${dashboardSection === 'analytics' ? '' : 'hidden'} mx-auto w-full min-w-0 max-w-6xl space-y-6 sm:space-y-8`}
    >
      <section className="border-b border-slate-200 pb-5 sm:pb-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-emerald-800">
              {dw.setup.label}
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
              {setupProgress === 100 ? dw.setup.ready : dw.setup.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {setupCompletedCount} {dw.setup.of} {setupSteps.length} {dw.setup.steps} · {setupProgress}%
            </p>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-700 transition-all duration-500"
            style={{ width: `${setupProgress}%` }}
          />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1 sm:gap-3">
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
              className="min-w-0 text-center"
            >
              <span
                className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${step.done ? 'bg-emerald-700 text-white' : 'border border-amber-600 bg-white text-amber-800'}`}
              >
                {step.done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className="text-[10px] font-bold">{index + 1}</span>
                )}
              </span>
              <span
                className={`mt-1.5 block text-[9px] leading-tight sm:text-[10px] ${step.done ? 'text-slate-500' : 'font-semibold text-slate-800'}`}
              >
                {dw.setup.items[index]}
              </span>
            </button>
          ))}
        </div>
      </section>

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold normal-case tracking-normal text-slate-800 shadow-sm">
            <Calendar className="h-4 w-4 text-emerald-800" />
            <span className="sr-only">{ac.range}</span>
            <select
              aria-label={ac.range}
              value={analyticsPeriodDays}
              onChange={(event) => setAnalyticsPeriodDays(Number(event.target.value))}
              className="cursor-pointer appearance-none border-0 bg-transparent pr-1 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {[7, 30, 90].map((days) => (
                <option key={days} value={days}>
                  {(analyticsPeriodLabels[lang] || analyticsPeriodLabels.en)[days]}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </label>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {analyticsDashboardTitles[lang] || analyticsDashboardTitles.en}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{ac.intro}</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-4 sm:gap-x-7">
        <article className="border-b border-slate-200 py-3 sm:border-b-0">
          <p className="flex min-h-7 items-center gap-2 text-[10px] font-bold uppercase leading-snug tracking-wide text-slate-500">
            <BookOpen className="h-5 w-5 shrink-0 text-emerald-800" />
            <span>{ac.views}</span>
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <strong className="text-3xl font-black tabular-nums tracking-tight text-slate-900">
              {analyticsLoading ? '…' : guideViews}
            </strong>
            {guideChange !== null && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-900">
                <TrendingUp className="h-3.5 w-3.5" />
                {guideChange > 0 ? '+' : ''}
                {guideChange}%
              </span>
            )}
          </div>
          <p className="mt-1 text-[10px] leading-snug text-slate-500">
            {guideChange === null ? ac.noComparison : analyticsComparison}
          </p>
        </article>
        <article className="border-b border-slate-200 py-3 sm:border-b-0">
          <p className="flex min-h-7 items-center gap-2 text-[10px] font-bold uppercase leading-snug tracking-wide text-slate-500">
            <MapPin className="h-5 w-5 shrink-0 text-emerald-800" />
            <span>{ac.topSection}</span>
          </p>
          <p className="mt-1 line-clamp-2 text-base font-extrabold leading-tight text-slate-900">
            {analyticsLoading ? '…' : topCategory ? getAnalyticsPageLabel(topCategory[0]) : '—'}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-slate-500">
            {topCategory ? `${topCategory[1]} ${ac.viewsUnit}` : ac.noSections}
          </p>
        </article>
        <article className="py-3">
          <p className="flex min-h-7 items-center gap-2 text-[10px] font-bold uppercase leading-snug tracking-wide text-slate-500">
            <MousePointerClick className="h-5 w-5 shrink-0 text-emerald-800" />
            <span>{ac.actions}</span>
          </p>
          <p className="mt-1 text-3xl font-black tabular-nums tracking-tight text-slate-900">
            {analyticsLoading ? '…' : usefulClicks}
          </p>
          <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-500">{ac.actionsNote}</p>
        </article>
        <article className="py-3">
          <p className="flex min-h-7 items-center gap-2 text-[10px] font-bold uppercase leading-snug tracking-wide text-slate-500">
            <MessageSquare className="h-5 w-5 shrink-0 text-emerald-800" />
            <span>{ac.helpful}</span>
          </p>
          <p className="mt-1 text-3xl font-black tabular-nums tracking-tight text-slate-900">
            {analyticsLoading ? '…' : feedbackRate === null ? '—' : feedbackRate + '%'}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-slate-500">
            {feedbackTotal ? `${feedbackTotal} ${ac.responses}` : ac.noResponses}
          </p>
        </article>
      </div>

      <p className="border-l-2 border-amber-500 py-1 pl-3 text-xs leading-relaxed text-slate-700">
        {topCategory
          ? ac.insightText.replace('{section}', getAnalyticsPageLabel(topCategory[0]))
          : ac.noInsight}
      </p>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-start gap-2">
            <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {ac.trend} · {selectedAnalyticsRange}
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">{ac.viewsNote}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-600">
            {guideViews} {ac.viewsUnit}
          </span>
        </div>
        <div className="relative mt-4 h-32 sm:h-40">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-0">
            <span className="border-t border-dashed border-slate-200" />
            <span className="border-t border-dashed border-slate-200" />
            <span className="border-t border-dashed border-slate-200" />
            <span className="border-t border-slate-300" />
          </div>
          <div className="relative z-10 flex h-full items-end gap-[3px] sm:gap-1">
            {dailyGuideViews.map((day) => (
              <div
                key={day.date}
                title={day.date + ': ' + day.value}
                className="flex h-full min-w-0 flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-[2px] bg-emerald-800"
                  style={{
                    height: day.value ? Math.max(7, (day.value / chartMax) * 100) + '%' : '2px',
                    opacity: day.value ? 0.82 : 0.12,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[9px] text-slate-400">
          <span>{currentStart}</span>
          <span>{todayKey}</span>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
            <Map className="h-5 w-5 text-emerald-800" />
            {ac.topList}
          </h2>
          <span className="text-[10px] font-semibold text-slate-500">{selectedAnalyticsRange}</span>
        </div>
        <div className="mt-2 divide-y divide-slate-200">
          {topCategories.map(([key, value], index) => (
            <div
              key={key}
              className="grid grid-cols-[24px_minmax(0,1fr)_minmax(52px,.7fr)_auto] items-center gap-2 py-3 sm:gap-4"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-900">
                {index + 1}
              </span>
              <span className="min-w-0 truncate text-xs font-semibold text-slate-800">
                {getAnalyticsPageLabel(key)}
              </span>
              <span className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full bg-emerald-700"
                  style={{ width: Math.max(5, (value / (topCategory?.[1] || 1)) * 100) + '%' }}
                />
              </span>
              <strong className="whitespace-nowrap text-[10px] font-bold tabular-nums text-slate-600">
                {value} {ac.viewsUnit}
              </strong>
            </div>
          ))}
          {!analyticsLoading && !topCategories.length && (
            <p className="flex items-center gap-2 py-4 text-xs text-slate-500">
              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
              {ac.noSections}
            </p>
          )}
        </div>
      </section>
      <p className="text-[10px] leading-relaxed text-slate-400">{ac.privacy}</p>
    </section>
  );
}
