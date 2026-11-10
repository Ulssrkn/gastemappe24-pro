import React from 'react';
import { Trash2 } from 'lucide-react';

export default function AccommodationsSection({ workspace, dashboardSection, dw, readOnlyDemo = false }) {
  const {
    accommodationLimitReached,
    accountRecord,
    cloudDataError,
    cloudDataStatus,
    hotelRecord,
    hotelRecords,
    selectAccommodation,
    selectedHotelId,
    setClonePreviewOpen,
    setCreateAccommodationOpen,
    setDeleteAccommodationTarget,
    setNewAccommodationName,
    trialExpired,
  } = workspace;
  return (
    <section
      id="accommodations"
      className={`${dashboardSection === 'accommodations' ? '' : 'hidden'} w-full max-w-6xl mx-auto space-y-4`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-700">
            {dw.accommodations.workspace}
          </p>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            {dw.accommodations.title}
          </h2>
          <p className="text-xs text-stone-500 mt-1">{dw.accommodations.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setNewAccommodationName('');
              setCreateAccommodationOpen(true);
            }}
            disabled={readOnlyDemo || trialExpired || !accountRecord || accommodationLimitReached}
            className="rounded-xl bg-slate-900 text-white px-4 py-2.5 text-xs font-bold shadow-lg shadow-slate-900/10 disabled:opacity-40"
          >
            + {dw.accommodations.add}
          </button>
          <button
            onClick={() => setClonePreviewOpen(true)}
            disabled={readOnlyDemo || trialExpired || !hotelRecord || accommodationLimitReached}
            className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:border-amber-300 disabled:opacity-40"
          >
            {dw.accommodations.copy}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {hotelRecords.map((item, index) => {
          const active = item.id === selectedHotelId;
          return (
            <article
              key={item.id}
              className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${active ? 'border-amber-400 bg-white shadow-lg shadow-amber-900/5 ring-1 ring-amber-200' : 'border-stone-200 bg-white/80 hover:border-stone-300 hover:shadow-md'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <button onClick={() => selectAccommodation(item.id)} disabled={readOnlyDemo} className="min-w-0 flex-1 text-left">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider ${active ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-500'}`}
                  >
                    {active ? dw.accommodations.active : `${dw.accommodations.item} ${index + 1}`}
                  </span>
                  <h3 className="mt-3 truncate text-base font-black text-slate-900">
                    {item.name || 'Unbenannte Unterkunft'}
                  </h3>
                  <p className="mt-1 truncate text-[10px] text-stone-400">{item.slug}</p>
                </button>
                <button
                  type="button"
                  aria-label={`Unterkunft ${item.name || ''} löschen`}
                  title="Unterkunft löschen"
                  disabled={readOnlyDemo || hotelRecords.length <= 1}
                  onClick={() => setDeleteAccommodationTarget(item)}
                  className="rounded-lg border border-stone-200 p-2 text-stone-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
                <span className="text-[10px] text-stone-500">{dw.accommodations.content}</span>
                <button
                  onClick={() => selectAccommodation(item.id)}
                  disabled={readOnlyDemo}
                  className={`rounded-lg px-3 py-2 text-[10px] font-bold ${active ? 'bg-amber-700 text-white' : 'bg-stone-100 text-slate-700 hover:bg-stone-200'}`}
                >
                  {active ? dw.accommodations.opened : dw.accommodations.open}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="rounded-xl border border-stone-200 bg-white/80 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-xs">
          <span className="font-bold text-stone-700">{readOnlyDemo ? 'Demo-Daten: ' : 'Cloud-Speicher: '}</span>
          <span
            className={
              cloudDataStatus === 'ready'
                ? 'text-emerald-700'
                : cloudDataStatus === 'error'
                  ? 'text-red-700'
                  : 'text-stone-500'
            }
          >
            {readOnlyDemo
              ? 'Beispiel-Unterkunft'
              : cloudDataStatus === 'ready'
              ? 'Verbunden'
              : cloudDataStatus === 'loading' || cloudDataStatus === 'saving'
                ? 'Wird geladen …'
                : cloudDataStatus === 'error'
                  ? 'Prüfung erforderlich'
                  : 'Nicht verbunden'}
          </span>
          {hotelRecord?.slug && <span className="ml-3 text-stone-400">Aktuelle ID: {hotelRecord.slug}</span>}
        </div>
        {cloudDataError && (
          <p role="alert" className="text-[11px] text-red-700">
            {cloudDataError}
          </p>
        )}
      </div>
    </section>
  );
}
