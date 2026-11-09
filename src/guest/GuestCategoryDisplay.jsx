import React, { useState } from 'react';
import { Check, CheckCircle2, ExternalLink, MapPin, Navigation, Phone, XCircle } from 'lucide-react';
import { OTHER_CUSTOM, customTextLabels, optionId, optionLabel } from '../guide/presetOptions.js';
import { categoryPresets } from '../guide/presetCatalog.js';
import guestCardCopy from '../guestCardCopy.js';
import renderSafeIconByName from '../guide/PresetIcon.jsx';

const GuestCheckoutChecklist = ({ field, selected, customTask, lang }) => {
  const [completed, setCompleted] = useState([]);
  const copy = {
    de: {
      title: 'Check-out-Checkliste',
      hint: 'Vor der Abreise',
      progress: (done, total) => done + ' von ' + total + ' erledigt',
    },
    en: {
      title: 'Check-out checklist',
      hint: 'Before you leave',
      progress: (done, total) => done + ' of ' + total + ' completed',
    },
    tr: {
      title: 'Çıkış kontrol listesi',
      hint: 'Ayrılmadan önce',
      progress: (done, total) => done + ' / ' + total + ' tamamlandı',
    },
    fr: {
      title: 'Liste de départ',
      hint: 'Avant de partir',
      progress: (done, total) => done + ' sur ' + total + ' terminé(s)',
    },
    es: {
      title: 'Lista de salida',
      hint: 'Antes de irte',
      progress: (done, total) => done + ' de ' + total + ' completados',
    },
    cs: {
      title: 'Kontrolní seznam při odjezdu',
      hint: 'Před odjezdem',
      progress: (done, total) => done + ' z ' + total + ' hotovo',
    },
    sq: {
      title: 'Lista e largimit',
      hint: 'Para se të largohesh',
      progress: (done, total) => done + ' nga ' + total + ' të përfunduara',
    },
    sv: {
      title: 'Checklista för utcheckning',
      hint: 'Innan du åker',
      progress: (done, total) => done + ' av ' + total + ' klara',
    },
    nb: {
      title: 'Sjekkliste for utsjekking',
      hint: 'Før du drar',
      progress: (done, total) => done + ' av ' + total + ' fullført',
    },
    it: {
      title: 'Lista di controllo per il check-out',
      hint: 'Prima di partire',
      progress: (done, total) => done + ' di ' + total + ' completati',
    },
  }[lang] || {
    title: 'Check-out checklist',
    hint: 'Before you leave',
    progress: (done, total) => done + ' of ' + total + ' completed',
  };
  const selectedValues = Array.isArray(selected) ? selected : [];
  const options = (field?.options || []).filter((option) => selectedValues.includes(optionId(option)));
  const tasks = [
    ...options,
    ...(selectedValues.includes(OTHER_CUSTOM) && String(customTask).trim()
      ? [{ id: OTHER_CUSTOM, label: { [lang]: String(customTask).trim(), de: String(customTask).trim() } }]
      : []),
  ];
  if (!tasks.length) return null;
  const doneCount = tasks.filter((task) => completed.includes(optionId(task))).length;
  const toggle = (id) =>
    setCompleted((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    );
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{copy.title}</h3>
          <p className="mt-0.5 text-[10px] text-slate-500">{copy.hint}</p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200">
          {copy.progress(doneCount, tasks.length)}
        </span>
      </div>
      <div className="divide-y divide-slate-100 px-4">
        {tasks.map((task) => {
          const id = optionId(task),
            checked = completed.includes(id);
          return (
            <label
              key={id}
              className="flex cursor-pointer items-start gap-3 py-3 text-sm leading-relaxed text-slate-700"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(id)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
              />
              <span className={checked ? 'text-slate-400 line-through' : ''}>{optionLabel(task, lang)}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
};

const GuestCategoryDisplay = ({ category, currentTheme, lang, t, onGuestEvent }) => {
  const presetObj = categoryPresets.find((p) => p.id === category.presetId);
  const fieldValues = category.fieldValues || {};
  const copy = guestCardCopy[lang] || guestCardCopy.de;
  const typeDetails = { museum: copy.museum, nature: copy.nature, guided: copy.guided };
  const selectedAttractionTypes =
    presetObj?.id === 'UMG_001' && Array.isArray(fieldValues.attraction_types)
      ? fieldValues.attraction_types.filter((type) => type in typeDetails)
      : [];
  const contentCards = Array.isArray(fieldValues.contentCards)
    ? fieldValues.contentCards.filter((card) =>
        String(card.titleTranslations?.[lang] || card.titleTranslations?.de || card.title || '').trim()
      )
    : [];
  const safeWebUrl = (value) => {
    try {
      const url = new URL(String(value || '').trim());
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
    } catch {
      return '';
    }
  };
  const openMapUrl = (address) =>
    address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : '';
  if (presetObj?.id === 'REG_004')
    return (
      <GuestCheckoutChecklist
        field={presetObj.schema?.find((item) => item.key === 'checkout_tasks')}
        selected={fieldValues.checkout_tasks || []}
        customTask={fieldValues.checkout_tasks__customText || ''}
        lang={lang}
      />
    );

  return (
    <div className="space-y-4">
      {selectedAttractionTypes.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {selectedAttractionTypes.map((type) => {
            const field = presetObj.schema.find((item) => item.key === 'attraction_types');
            const option = (field?.options || []).find((item) => optionId(item) === type);
            return (
              <article key={type} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    {renderSafeIconByName(
                      type === 'museum' ? 'Building' : type === 'nature' ? 'MapPin' : 'Compass',
                      currentTheme
                    )}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {option ? optionLabel(option, lang) : type}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{typeDetails[type]}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {contentCards.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {contentCards.map((card, index) => {
            const description =
              card.descriptionTranslations?.[lang] || (lang === 'de' ? card.description : '') || '';
            const website = safeWebUrl(card.url);
            const mapUrl = openMapUrl(String(card.address || '').trim());
            const phone = String(card.phone || '').trim();
            const tel = phone.replace(/[^0-9+*#]/g, '');
            return (
              <article
                key={card.id || index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900">{card.titleTranslations?.[lang] || card.titleTranslations?.de || card.title}</h3>
                      {card.hours && (
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          {card.hours}
                        </p>
                      )}
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600">
                      {presetObj?.title?.[lang] || presetObj?.title?.de || category.title}
                    </span>
                  </div>
                  {description && <p className="mt-2 text-xs leading-relaxed text-slate-600">{description}</p>}
                  {card.address && (
                    <p className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-500">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {card.address}
                    </p>
                  )}
                </div>
                {(website || mapUrl || tel) && (
                  <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-slate-50/70 p-3">
                    {mapUrl && (
                      <a
                        href={mapUrl}
                        onClick={() => onGuestEvent?.('action_route')}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        {copy.route}
                      </a>
                    )}
                    {website && (
                      <a
                        href={website}
                        onClick={() => onGuestEvent?.('action_website')}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {copy.website}
                      </a>
                    )}
                    {tel && (
                      <a
                        href={`tel:${tel}`}
                        onClick={() => onGuestEvent?.('action_call')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {copy.call}
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
      {presetObj && presetObj.schema && presetObj.schema.length > 0 && (
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-5">
          {(Array.isArray(presetObj.schema) ? presetObj.schema : []).map((field) => {
            const rawVal = fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.default;
            const fieldLabel = (field.label && (field.label[lang] || field.label.de)) || field.key;

            if (field.key === 'attraction_types') return null;

            if (
              rawVal === undefined ||
              rawVal === null ||
              rawVal === '' ||
              (Array.isArray(rawVal) && rawVal.length === 0)
            )
              return null;

            return (
              <div
                key={field.key}
                className="border-b border-slate-100 last:border-0 pb-4 last:pb-0 flex flex-col gap-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {fieldLabel}
                </span>

                {field.type === 'boolean' ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold pt-0.5">
                    {rawVal ? (
                      <span className="text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-2 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.yesLabel}
                      </span>
                    ) : (
                      <span className="text-stone-600 bg-stone-100 px-3.5 py-2 rounded-2xl border border-stone-200 flex items-center gap-2 shadow-xs">
                        <XCircle className="w-4 h-4 text-stone-400" /> {t.noLabel}
                      </span>
                    )}
                  </div>
                ) : field.type === 'multiselect' && Array.isArray(rawVal) ? (
                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    {rawVal
                      .filter((item) => item !== OTHER_CUSTOM)
                      .map((item) => {
                        const option = (field.options || []).find((candidate) => optionId(candidate) === item);
                        return (
                          <div
                            key={item}
                            className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 text-xs font-semibold text-slate-700"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200">
                              <Check className="h-3 w-3" />
                            </span>
                            {option ? optionLabel(option, lang) : item}
                          </div>
                        );
                      })}
                    {rawVal.includes(OTHER_CUSTOM) && fieldValues[field.key + '__customText'] && (
                      <p className="w-full mt-2 text-xs text-slate-700 whitespace-pre-line">
                        {fieldValues[field.key + '__customText']}
                      </p>
                    )}
                  </div>
                ) : field.type === 'select' ? (
                  <div className="text-xs font-extrabold text-slate-900 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200/70">
                    {rawVal === OTHER_CUSTOM
                      ? customTextLabels[lang] || customTextLabels.de
                      : (() => {
                          const option = (field.options || []).find(
                            (candidate) => optionId(candidate) === rawVal
                          );
                          return option ? optionLabel(option, lang) : String(rawVal);
                        })()}
                    {rawVal === OTHER_CUSTOM && fieldValues[field.key + '__customText'] && (
                      <p className="mt-2 whitespace-pre-line font-medium">
                        {fieldValues[field.key + '__customText']}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-xs font-extrabold text-slate-900 bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200/70">
                    {String(rawVal)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {(category.customTextTranslations?.[lang] || category.customText) && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 text-sm leading-relaxed space-y-1.5">
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
            {t.moreInfo}
          </span>
          <p className="whitespace-pre-line font-medium">
            {category.customTextTranslations?.[lang] ?? category.customText}
          </p>
        </div>
      )}
    </div>
  );
};

export default GuestCategoryDisplay;
