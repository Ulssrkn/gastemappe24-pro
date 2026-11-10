import React from 'react';
import { Edit3, ImagePlus, Plus, Trash2 } from 'lucide-react';
import AddressAutocomplete from '../guide/AddressAutocomplete.jsx';
import QrPrintPanel from './QrPrintPanel.jsx';
import { quickAccessDefaults, themeColors } from '../guide/guideContent.js';
import renderSafeIconByName from '../guide/PresetIcon.jsx';
import dashboardDemoCopy from '../i18n/dashboardDemoCopy.js';

export default function GuideEditor({
  workspace,
  currentTheme,
  dashboardSection,
  dw,
  groupedCategories,
  lang,
  pilot,
  t,
  readOnlyDemo = false,
}) {
  const {
    guestPageUrl,
    handleDeleteCategory,
    hotel,
    qrPrintFormat,
    quickEditLang,
    removeImage,
    setEditingCategory,
    setHotel,
    setIsEditorModalOpen,
    setQrPrintFormat,
    setQuickEditLang,
    updateQuickCardText,
  } = workspace;
  const ui = dashboardDemoCopy[lang] || dashboardDemoCopy.de;
  const addPhotoLabel = ui.addPhoto;
  return (
    <div id="editor" className={`${dashboardSection === 'editor' ? '' : 'hidden'} max-w-6xl mx-auto space-y-6`}>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[.2em] text-amber-700">
          {dw.accommodations.workspace}
        </p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{dw.nav.editor}</h1>
        <p className="mt-1 text-sm text-slate-500">{dw.accommodations.description}</p>
      </div>
      <nav
        aria-label={dw.nav.editor}
        className="sticky top-2 z-30 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur"
      >
        <div className="flex gap-1 overflow-x-auto">
          {[
            ['editor-property-profile', dw.editorSections.profile],
            ['editor-guest-sections', dw.editorSections.guestContent],
            ['editor-quick-access', dw.editorSections.quickAccess],
            ['editor-theme', dw.editorSections.theme],
            ['editor-logo', dw.editorSections.logo],
            ['editor-photos', dw.editorSections.photos],
            ['editor-qr', dw.editorSections.qr],
          ].map(([target, label]) => (
            <button
              key={target}
              type="button"
              onClick={() =>
                document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="shrink-0 rounded-xl px-3 py-2 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
      <fieldset disabled={readOnlyDemo} className="contents">
      {/* 1. HOTEL BİLGİLERİ */}
      <div
        id="editor-property-profile"
        className="scroll-mt-24 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4"
      >
        <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec1Title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { key: 'name', label: ui.profileFields.name, type: 'text' },
            { key: 'phone', label: ui.profileFields.phone, type: 'tel' },
            { key: 'email', label: ui.profileFields.email, type: 'email' },
            { key: 'website', label: ui.profileFields.website, type: 'url' },
            { key: 'address', label: ui.profileFields.address, type: 'text', autocomplete: true },
            { key: 'reviewPlatform', label: ui.profileFields.reviewPlatform, type: 'select' },
            {
              key: 'googleReviewUrl',
              label:
                hotel.reviewPlatform === 'airbnb'
                  ? 'Airbnb link (optional)'
                  : hotel.reviewPlatform === 'booking'
                    ? 'Booking.com review link'
                    : hotel.reviewPlatform === 'tripadvisor'
                      ? 'Tripadvisor review link'
                      : hotel.reviewPlatform === 'custom'
                        ? ui.profileFields.googleReviewUrl
                        : ui.profileFields.googleReviewUrl,
              type: 'url',
            },
            { key: 'locationTitle', label: ui.profileFields.locationTitle, type: 'text' },
          ].map((field) => (
            <div key={field.key} className="relative">
              <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">{field.label}</label>
              {field.key === 'reviewPlatform' ? (
                <select
                  value={hotel.reviewPlatform || 'google'}
                  onChange={(e) => setHotel((prev) => ({ ...prev, reviewPlatform: e.target.value }))}
                  className="w-full p-3 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                >
                  <option value="google">Google</option>
                  <option value="airbnb">Airbnb</option>
                  <option value="booking">Booking.com</option>
                  <option value="tripadvisor">Tripadvisor</option>
                  <option value="custom">{ui.reviewPlatforms.other}</option>
                </select>
              ) : field.autocomplete ? (
                <AddressAutocomplete
                  lang={lang}
                  value={hotel[field.key] || ''}
                  onChange={(value) => setHotel((prev) => ({ ...prev, [field.key]: value }))}
                  className="w-full p-3 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              ) : (
                <input
                  type={field.type}
                  value={hotel[field.key] || ''}
                  onChange={(e) => setHotel((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full p-3 text-sm border border-stone-200 rounded-xl bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              )}
              {field.key === 'reviewPlatform' && (
                <p className="mt-1 text-[10px] text-stone-400">
                  {ui.reviewHelp}
                </p>
              )}
              {field.autocomplete && (
                <p className="mt-1 text-[10px] text-stone-400">
                  {ui.addressHelp}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-stone-500">
          {ui.saveHelp}
        </p>
      </div>

      <div
        id="editor-guest-sections"
        className="scroll-mt-24 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec6Title}</h3>
          <button
            onClick={() => {
              setEditingCategory(null);
              setIsEditorModalOpen(true);
            }}
            className={`${currentTheme.bg} text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:opacity-95 transition cursor-pointer flex items-center gap-2`}
          >
            <Plus className="w-4 h-4" /> {t.btnAddCategory}
          </button>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedCategories).map(([groupName, groupItems]) => (
            <div key={groupName} className="space-y-2">
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block">
                {groupName}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {groupItems.map((cat) => {
                  const presetObj = cat.presetData;
                  const title =
                    cat.customTitle ||
                    (presetObj && presetObj.title && (presetObj.title[lang] || presetObj.title.de)) ||
                    t.categoryFallback || 'Category';

                  return (
                    <div
                      key={cat.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className={`p-2 rounded-xl ${currentTheme.bgLight}`}>
                          {renderSafeIconByName(cat.icon, currentTheme)}
                        </div>
                        <span className="text-xs font-bold text-slate-900 truncate">{title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setIsEditorModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-slate-900 hover:bg-stone-200/60 transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="editor-quick-access"
        className="scroll-mt-24 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-700">
              {ui.quickTitle}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1">
              {ui.quickDescription}
            </p>
          </div>
          <select
            aria-label={ui.quickLanguage}
            value={quickEditLang}
            onChange={(e) => setQuickEditLang(e.target.value)}
            className="bg-white border border-stone-200 text-xs rounded-xl px-3 py-2"
          >
            <option value="de">🇩🇪 Deutsch</option>
            <option value="en">🇬🇧 English</option>
            <option value="tr">🇹🇷 Türkçe</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="hr">🇭🇷 Hrvatski</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="es">🇪🇸 Español</option>
            <option value="sv">🇸🇪 Svenska</option>
            <option value="nb">🇳🇴 Norsk</option>
            <option value="sq">🇦🇱 Shqip</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'wifi', enabled: 'showWifi', label: ui.quickCards.wifi },
            { id: 'parking', enabled: 'showParking', label: ui.quickCards.parking },
            { id: 'breakfast', enabled: 'showBreakfast', label: ui.quickCards.breakfast },
            { id: 'checkin', enabled: 'showCheckInOut', label: ui.quickCards.checkin },
          ].map((card) => (
            <div key={card.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800">{card.label}</span>
                <label className="flex items-center gap-2 text-[11px] font-semibold text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hotel[card.enabled] !== false}
                    onChange={(e) => setHotel((prev) => ({ ...prev, [card.enabled]: e.target.checked }))}
                    className="accent-emerald-700 w-4 h-4"
                  />
                  {ui.show}
                </label>
              </div>
              <label className="block text-[10px] font-bold uppercase text-stone-500">
                {ui.title}
                <input
                  value={
                    hotel.quickAccessContent?.[quickEditLang]?.[card.id]?.title ??
                    quickAccessDefaults[quickEditLang][card.id].title
                  }
                  onChange={(e) => updateQuickCardText(card.id, 'title', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs"
                />
              </label>
              <label className="block text-[10px] font-bold uppercase text-stone-500">
                {ui.description}
                <textarea
                  rows="2"
                  value={
                    hotel.quickAccessContent?.[quickEditLang]?.[card.id]?.description ??
                    quickAccessDefaults[quickEditLang][card.id].description
                  }
                  onChange={(e) => updateQuickCardText(card.id, 'description', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs resize-y"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-3 space-y-3">
          <div className="text-xs font-bold text-slate-800">{ui.wifiAccess}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block text-[10px] font-bold uppercase text-stone-500">
              {ui.network}
              <input
                value={hotel.wifiSsid || ''}
                onChange={(e) => setHotel((prev) => ({ ...prev, wifiSsid: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs"
              />
            </label>
            <label className="block text-[10px] font-bold uppercase text-stone-500">
              {ui.password}
              <input
                type="password"
                value={hotel.wifiPass || ''}
                onChange={(e) => setHotel((prev) => ({ ...prev, wifiPass: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs"
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={hotel.publishGuestWifi === true}
                onChange={(event) =>
                  setHotel((previous) => ({ ...previous, publishGuestWifi: event.target.checked }))
                }
              />
              {pilot.publishWifi}
            </label>
          </div>
        </div>
      </div>

      {/* 2. TEMA RENKLERİ */}
      <div
        id="editor-theme"
        className="scroll-mt-24 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4"
      >
        <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec2Title}</h3>
        <div className="flex flex-wrap gap-2.5">
          {themeColors.map((tc) => (
            <button
              key={tc.id}
              onClick={() => setHotel({ ...hotel, themeColor: tc.id })}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-2 ${hotel.themeColor === tc.id ? `${tc.bg} text-white border-transparent shadow` : 'bg-stone-50 text-stone-700 border-stone-200'}`}
            >
              <span className={`w-3 h-3 rounded-full ${tc.bg}`}></span>
              {tc.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LOGO YÜKLEME */}
      <div
        id="editor-logo"
        className="scroll-mt-24 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4"
      >
        <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec3Title}</h3>
        <div className="flex items-center gap-4">
          {hotel.logoUrl ? (
            <img
              src={hotel.logoUrl}
              alt="Logo"
              className="w-12 h-12 rounded-xl object-cover border shadow-xs"
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-xl ${currentTheme.bgLight} ${currentTheme.text} flex items-center justify-center font-black`}
            >
              LOGO
            </div>
          )}
          <p className="text-xs text-stone-500">{pilot.uploadPaused}</p>
          {hotel.logoUrl && (
            <button
              type="button"
              className="text-xs underline"
              onClick={() => setHotel((previous) => ({ ...previous, logoUrl: '' }))}
            >
              {pilot.remove}
            </button>
          )}
        </div>
      </div>

      {/* 4. SLIDER FOTOĞRAF YÖNETİMİ */}
      <div
        id="editor-photos"
        className="scroll-mt-24 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className={`font-black text-xs ${currentTheme.text} uppercase tracking-wider`}>{t.sec4Title}</h3>
          <div className="flex items-center gap-3">
            <p className="text-xs text-stone-500">{pilot.uploadPaused}</p>
            {readOnlyDemo && <button type="button" disabled className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 disabled:cursor-not-allowed"><ImagePlus className="h-4 w-4" />{addPhotoLabel}</button>}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Array.isArray(hotel.images) ? hotel.images : []).map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden border aspect-video group shadow-xs bg-stone-100"
            >
              <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
              <button
                aria-label={pilot.remove + ' ' + (idx + 1)}
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition shadow cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      </fieldset>
      <QrPrintPanel
        currentTheme={currentTheme}
        guestPageUrl={guestPageUrl}
        hotel={hotel}
        pilot={pilot}
        qrPrintFormat={qrPrintFormat}
        setQrPrintFormat={setQrPrintFormat}
        t={t}
        lang={lang}
      />
      {/* 6. DİNAMİK PRESET KATEGORİLER (3-ADIMLI MODAL SİSTEMİ) */}
    </div>
  );
}
