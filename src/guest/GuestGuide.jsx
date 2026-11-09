import React, { useState } from 'react';
import LanguageSelect from '../components/LanguageSelect.jsx';
import {
  ArrowRight,
  Car,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Compass,
  Copy,
  Info,
  Navigation,
  Star,
  Sun,
  Wifi,
} from 'lucide-react';
import GuestCategoryDisplay from './GuestCategoryDisplay.jsx';
import LegalLinks from '../guide/LegalLinks.jsx';
import analyticsCopy from '../analyticsCopy.js';
import { quickAccessDefaults } from '../guide/guideContent.js';
import renderSafeIconByName from '../guide/PresetIcon.jsx';
import { supabase } from '../lib/supabaseClient.js';

export default function GuestGuide({
  navigation,
  published,
  forecast,
  groupedCategories,
  currentTheme,
  guestSlug,
  hotel,
  lang,
  pilot,
  setAppMode,
  setLang,
  t,
}) {
  const { activeTab, navigateGuest, selectedCategory, setShowWelcomeScreen, showWelcomeScreen } = navigation;
  const { guestFeedback, guestPageStatus, feedbackPending, feedbackFailed, submitGuestFeedback, trackGuestEvent, trackGuestPageView } = published;
  const { getWeatherDescription, weather, weatherLabels } = forecast;
  const selectedCategoryTitle = selectedCategory?.presetData?.title?.[lang] || selectedCategory?.title;
  const selectedCategoryGroup = selectedCategory
    ? Object.entries(groupedCategories).find(([, items]) => items.some((item) => item.id === selectedCategory.id))?.[0] || selectedCategory.groupName
    : '';
  const showGuideFeedback =
    guestSlug && supabase && guestPageStatus === 'ready' && activeTab === 'services' && !selectedCategory;
  const [currentSlide] = useState(0);
  const [copiedWifi, setCopiedWifi] = useState(false);
  const copyWifiLabels = {
    de: { copy: 'Kopieren', copied: 'Kopiert' },
    en: { copy: 'Copy', copied: 'Copied' },
    tr: { copy: 'Kopyala', copied: 'Kopyalandı' },
    fr: { copy: 'Copier', copied: 'Copié' },
    hr: { copy: 'Kopiraj', copied: 'Kopirano' },
    it: { copy: 'Copia', copied: 'Copiato' },
    es: { copy: 'Copiar', copied: 'Copiado' },
    sv: { copy: 'Kopiera', copied: 'Kopierat' },
    no: { copy: 'Kopier', copied: 'Kopiert' },
    sq: { copy: 'Kopjo', copied: 'U kopjua' },
  };
  const copyWifiLabel = copyWifiLabels[lang] || copyWifiLabels.de;
  const getQuickCardText = (cardId, field) => {
    const language = lang === 'nb' ? 'no' : lang === 'cs' ? 'en' : lang;
    const card =
      hotel.quickAccessContent?.[language]?.[cardId] ||
      hotel.quickAccessContent?.de?.[cardId] ||
      quickAccessDefaults.de[cardId];
    return card?.[field] || quickAccessDefaults.de[cardId][field];
  };
  const copyWifiPassword = () => {
    if (!hotel.wifiPass) return;
    trackGuestEvent('action_wifi_copy');
    navigator.clipboard.writeText(hotel.wifiPass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };
  const quickAccessTitle = ({ de: 'Schnellzugriff', en: 'Quick access', tr: 'Hızlı erişim', fr: 'Accès rapide', es: 'Acceso rápido', hr: 'Brzi pristup', sq: 'Qasje e shpejtë', sv: 'Snabbåtkomst', nb: 'Hurtigtilgang', no: 'Hurtigtilgang', it: 'Accesso rapido' })[lang] || 'Quick access';
  const quickCardConfig = [
    hotel.showWifi && { id: 'wifi', icon: Wifi, title: getQuickCardText('wifi', 'title'), description: getQuickCardText('wifi', 'description') },
    hotel.showParking && { id: 'parking', icon: Car, title: getQuickCardText('parking', 'title'), description: getQuickCardText('parking', 'description') },
    hotel.showBreakfast && { id: 'breakfast', icon: Coffee, title: getQuickCardText('breakfast', 'title'), description: getQuickCardText('breakfast', 'description') },
    hotel.showCheckInOut && { id: 'checkin', icon: Clock, title: getQuickCardText('checkin', 'title'), description: getQuickCardText('checkin', 'description') },
  ].filter(Boolean);
  const activeQuickCards = quickCardConfig.map((item) => {
    const Icon = item.icon;
    return (
      <details key={item.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition open:shadow-sm">
        <summary className="flex cursor-pointer list-none items-center gap-3 px-3.5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
          <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl " + currentTheme.bgLight + " " + currentTheme.text}><Icon className="h-4 w-4" /></span>
          <span className="min-w-0 flex-1 text-xs font-extrabold text-slate-900">{item.title}</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-90" />
        </summary>
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="text-xs leading-relaxed text-slate-600">{item.description}</p>
          {item.id === 'wifi' && (hotel.wifiSsid || hotel.wifiPass) && <div className="mt-3 flex flex-wrap gap-2">{hotel.wifiSsid && <span className="rounded-lg bg-stone-50 px-3 py-2 font-mono text-[11px] text-slate-700">{hotel.wifiSsid}</span>}{hotel.wifiPass && <span className="rounded-lg bg-stone-50 px-3 py-2 font-mono text-[11px] text-slate-700">{hotel.wifiPass}</span>}</div>}
          {item.id === 'wifi' && hotel.wifiPass && <button type="button" onClick={copyWifiPassword} aria-label={copiedWifi ? copyWifiLabel.copied : copyWifiLabel.copy} className={"mt-3 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-bold " + currentTheme.bg + " text-white"}>{copiedWifi ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copiedWifi ? copyWifiLabel.copied : copyWifiLabel.copy}</button>}
          {hotel.address && (item.id === 'parking' || item.id === 'checkin') && <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(hotel.address)} onClick={() => trackGuestEvent('action_route')} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2 text-[10px] font-bold text-slate-700"><Navigation className="h-3.5 w-3.5" />{t.navRoute}</a>}
        </div>
      </details>
    );
  });
  const ac = analyticsCopy[lang] || analyticsCopy.en;
  if (showWelcomeScreen) {
    return (
      <div className="h-[100dvh] min-h-[320px] bg-slate-950 max-w-md mx-auto shadow-2xl relative overflow-hidden flex flex-col justify-between font-sans">
        <div className="absolute inset-0 z-0">
          <img
            src={hotel.images?.[0] || '/guide-cover.svg'}
            alt="Welcome"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        </div>

        <div className="relative z-10 flex min-w-0 items-center justify-between gap-3 p-6 text-white">
          <span
            title={hotel.name}
            className="min-w-0 flex-1 line-clamp-2 break-words text-xs font-bold uppercase leading-tight"
          >
            {hotel.name}
          </span>
          <LanguageSelect
            lang={lang}
            onChange={setLang}
            label={pilot.language}
            className="shrink-0 rounded-xl border border-white/30 bg-black/40 px-2.5 py-1.5 text-xs text-white cursor-pointer"
          />
        </div>

        <div className="relative z-10 px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] space-y-4 text-white shrink-0">
          <h1 className="line-clamp-3 break-words text-3xl font-black leading-tight">{hotel.name}</h1>
          <button
            onClick={() => setShowWelcomeScreen(false)}
            className={`w-full ${currentTheme.bg} text-white py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center gap-2 cursor-pointer`}
          >
            <span>{t.welcomeButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <LegalLinks copy={pilot} onCover />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 pb-32 max-w-md mx-auto shadow-2xl relative border-x border-slate-200">
      <header className="p-5 pt-6 pb-2 bg-stone-50 sticky top-0 z-40 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {hotel.logoUrl ? (
            <img src={hotel.logoUrl} alt="Logo" className="h-8 w-8 shrink-0 rounded-lg border object-cover" />
          ) : (
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${currentTheme.bg} text-xs font-black text-white`}
            >
              B
            </div>
          )}
          <span
            title={hotel.name}
            className="block min-w-0 flex-1 line-clamp-2 break-words text-[11px] font-bold leading-tight tracking-wider uppercase text-slate-800"
          >
            {hotel.name}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSelect
            lang={lang}
            onChange={setLang}
            label={pilot.language}
            className="bg-white border text-xs font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer"
          />
          {!guestSlug && (
            <button
              onClick={() => setAppMode('dashboard')}
              className="text-stone-600 p-1 text-xs cursor-pointer"
            >
              🔑
            </button>
          )}
        </div>
      </header>

      <main className="p-5 space-y-5">
        {selectedCategory ? (
          <div className="space-y-4 animate-fade-in">
            <button
              onClick={() => window.history.back()}
              className={`text-xs font-bold ${currentTheme.text} cursor-pointer flex items-center gap-1`}
            >
              &larr; {t.detailBack}
            </button>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-3xl shadow-md border border-stone-200 flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl ${currentTheme.bgLight} flex items-center justify-center shadow-xs`}
                >
                  {renderSafeIconByName(selectedCategory.icon, currentTheme)}
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900 leading-tight">
                    {selectedCategoryTitle}
                  </h2>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${currentTheme.text}`}>
                    {selectedCategoryGroup}
                  </span>
                </div>
              </div>

              <GuestCategoryDisplay
                category={selectedCategory}
                currentTheme={currentTheme}
                lang={lang}
                t={t}
                onGuestEvent={trackGuestEvent}
              />
            </div>
          </div>
        ) : activeTab === 'home' ? (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-0.5 pt-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 block">
                {hotel.locationTitle}
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {t.greetingHello}
                <br />
                <span className={currentTheme.text}>{t.greetingWelcome}</span>
              </h1>
            </div>

            {/* SLİDER ALANI */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 bg-slate-900 border border-stone-200">
              <img
                src={
                  (hotel.images && hotel.images[currentSlide]) ||
                  (hotel.images && hotel.images[0]) ||
                  '/guide-cover.svg'
                }
                alt="Slide"
                className="w-full h-full object-cover"
              />
            </div>

            {/* LIVE HOTEL WEATHER — Open-Meteo, based on the saved hotel address */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-3 ${currentTheme.bgLight} rounded-xl ${currentTheme.text}`}>
                  <Sun className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-slate-900 uppercase">
                    {(weatherLabels[lang] || weatherLabels.de).loading && weather.status === 'loading'
                      ? (weatherLabels[lang] || weatherLabels.de).loading
                      : weather.status === 'ready'
                        ? getWeatherDescription(weather.code, weatherLabels[lang] || weatherLabels.de)
                        : weather.status === 'missing'
                          ? (weatherLabels[lang] || weatherLabels.de).missing
                          : (weatherLabels[lang] || weatherLabels.de).unavailable}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate">
                    {weather.status === 'ready'
                      ? weather.place
                      : weather.status === 'loading'
                        ? (weatherLabels[lang] || weatherLabels.de).loading
                        : weather.status === 'missing'
                          ? (weatherLabels[lang] || weatherLabels.de).missing
                          : (weatherLabels[lang] || weatherLabels.de).unavailable}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-black text-slate-900">
                  {weather.status === 'ready' ? `${weather.temperature}°C` : '—'}
                </div>
              </div>
            </div>

            {activeQuickCards.length > 0 && (
              <section className="space-y-2.5 pt-2">
                <h2 className="px-1 text-sm font-black tracking-tight text-slate-900">{quickAccessTitle}</h2>
                <div className="space-y-2">{activeQuickCards}</div>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="px-1">
              <p className={"text-[10px] font-black uppercase tracking-[0.2em] " + currentTheme.text}>{t.welcomeBadge}</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{t.navGaestemappe}</h1>
            </div>
            {Object.entries(groupedCategories).map(([groupName, groupItems]) => {
              const groupIcon = groupItems[0]?.mainCatObj?.icon || 'Compass';
              return (
                <section key={groupName} className={"overflow-hidden rounded-[1.6rem] border " + currentTheme.border + " bg-gradient-to-b from-white to-stone-50/90 shadow-sm"}>
                  <div className={"flex items-center gap-3 px-4 py-3.5 " + currentTheme.bgLight}>
                    <span className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/90 " + currentTheme.text + " shadow-sm"}>{renderSafeIconByName(groupIcon, currentTheme)}</span>
                    <h2 className="min-w-0 flex-1 truncate text-sm font-black tracking-tight text-slate-900">{groupName}</h2>
                    <span className={"flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-bold " + currentTheme.text}>{groupItems.length}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 p-3">
                    {(groupItems || []).map((cat) => {
                      const presetObj = cat.presetData;
                      const title = cat.customTitle || (presetObj && presetObj.title && (presetObj.title[lang] || presetObj.title.de)) || 'Kategorie';
                      return (
                        <button key={cat.id} onClick={() => {
                          const analyticsCategoryId = String(cat.id).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 68);
                          trackGuestPageView('category_' + analyticsCategoryId);
                          navigateGuest('services', { ...cat, title, groupName });
                        }} className="group flex min-h-[112px] w-full flex-col items-start justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
                          <span className="flex w-full items-center justify-between gap-2">
                            <span className={"flex h-9 w-9 items-center justify-center rounded-xl " + currentTheme.bgLight + " " + currentTheme.text}>{renderSafeIconByName(cat.icon, currentTheme)}</span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                          </span>
                          <span className="mt-3 line-clamp-2 text-xs font-extrabold leading-snug text-slate-900">{title}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
        {showGuideFeedback && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" aria-live="polite">
            <p className="text-sm font-bold text-slate-900">{guestFeedback ? ac.thanks : ac.helpfulPrompt}</p>
            {!guestFeedback && (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => submitGuestFeedback('yes')}
                  disabled={feedbackPending}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                >
                  {ac.yes}
                </button>
                <button
                  type="button"
                  onClick={() => submitGuestFeedback('no')}
                  disabled={feedbackPending}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-50"
                >
                  {ac.no}
                </button>
              </div>
            )}
            {feedbackFailed && <p className="mt-2 text-sm text-red-700">{ac.feedbackRetry}</p>}
          </section>
        )}
        <LegalLinks copy={pilot} />
      </main>

      {/* ALT NAVİGASYON ÇUBUĞU */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t z-50 shadow-2xl">
        <nav className="px-3 py-2 flex justify-around items-center">
          <button
            onClick={() => {
              if (activeTab !== 'home' || selectedCategory) trackGuestPageView('guest_home');
              navigateGuest('home');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'home' && !selectedCategory ? currentTheme.text : 'text-stone-400'}`}
          >
            <Info className="w-5 h-5" />
            <span>{t.navHome}</span>
          </button>
          <button
            onClick={() => {
              if (activeTab !== 'services' || selectedCategory) trackGuestPageView('guest_services');
              navigateGuest('services');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${activeTab === 'services' || selectedCategory ? currentTheme.text : 'text-stone-400'}`}
          >
            <Compass className="w-5 h-5" />
            <span>{t.navGaestemappe}</span>
          </button>
          {((hotel.googleReviewUrl && /^https?:\/\//i.test(hotel.googleReviewUrl)) ||
            hotel.reviewPlatform === 'airbnb') && (
            <a
              href={
                hotel.googleReviewUrl && /^https?:\/\//i.test(hotel.googleReviewUrl)
                  ? hotel.googleReviewUrl
                  : 'https://www.airbnb.com/trips/v1'
              }
              onClick={() => trackGuestEvent('action_review')}
              target="_blank"
              rel="noreferrer"
              className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}
            >
              <Star className="w-5 h-5 fill-current" />
              <span>{t.navReview}</span>
            </a>
          )}
          {hotel.address && !/Musterstraße 1|12345 Musterstadt/i.test(hotel.address) ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
              onClick={() => trackGuestEvent('action_route')}
              target="_blank"
              rel="noreferrer"
              className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${currentTheme.text} hover:opacity-80`}
            >
              <Navigation className="w-5 h-5" />
              <span>{t.navRoute}</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Hoteladresse im Hotelprofil hinterlegen"
              className="flex flex-col items-center gap-1 text-[10px] font-bold text-stone-300 cursor-not-allowed"
            >
              <Navigation className="w-5 h-5" />
              <span>{t.navRoute}</span>
            </span>
          )}
        </nav>
      </div>
    </div>
  );
}
