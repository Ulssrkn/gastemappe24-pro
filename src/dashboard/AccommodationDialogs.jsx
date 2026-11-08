import React from 'react';
import { Trash2 } from 'lucide-react';
import CompactPresetEditorModal from '../guide/CompactPresetEditorModal.jsx';

export default function AccommodationDialogs({ workspace, currentTheme, lang, pilot, t }) {
  const {
    cloneAccommodation,
    cloneOptions,
    clonePreviewOpen,
    cloudDataStatus,
    createAccommodation,
    createAccommodationOpen,
    deleteAccommodation,
    deleteAccommodationTarget,
    editingCategory,
    handleSaveCategoryModal,
    hotel,
    hotelRecord,
    isEditorModalOpen,
    newAccommodationName,
    setCloneOptions,
    setClonePreviewOpen,
    setCreateAccommodationOpen,
    setDeleteAccommodationTarget,
    setEditingCategory,
    setIsEditorModalOpen,
    setNewAccommodationName,
  } = workspace;
  return (
    <>
      {createAccommodationOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="gm24-create-title"
            tabIndex={-1}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">Neue Unterkunft</p>
            <h2 id="gm24-create-title" className="mt-1 text-xl font-black text-slate-900">
              Was möchtest du hinzufügen?
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Es wird eine leere, eigenständige Gästemappe angelegt. Du kannst den Namen später ändern.
            </p>
            <input
              data-initial-focus
              aria-label={t.lblHotelName}
              value={newAccommodationName}
              onChange={(e) => setNewAccommodationName(e.target.value)}
              placeholder="z. B. Apartment Sonnengarten"
              className="mt-4 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setCreateAccommodationOpen(false)}
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-600"
              >
                {pilot.cancel}
              </button>
              <button
                onClick={createAccommodation}
                disabled={!newAccommodationName.trim() || cloudDataStatus === 'saving'}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40"
              >
                {pilot.create}
              </button>
            </div>
          </section>
        </div>
      )}
      {deleteAccommodationTarget && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="gm24-delete-title"
            tabIndex={-1}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 id="gm24-delete-title" className="mt-4 text-lg font-black text-slate-900">
              Unterkunft wirklich löschen?
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              <strong>{deleteAccommodationTarget.name || 'Unbenannte Unterkunft'}</strong> und die dazugehörigen
              Gästemappen-Inhalte werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setDeleteAccommodationTarget(null)}
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-600"
              >
                {pilot.cancel}
              </button>
              <button
                onClick={deleteAccommodation}
                disabled={cloudDataStatus === 'saving'}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"
              >
                {pilot.delete}
              </button>
            </div>
          </section>
        </div>
      )}
      {clonePreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="gm24-clone-title"
            tabIndex={-1}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                Unterkunft kopieren
              </p>
              <h2 id="gm24-clone-title" className="text-xl font-black text-slate-900 mt-1">
                Kopie vorbereiten
              </h2>
              <p className="text-xs text-stone-500 mt-1">Quelle: {hotelRecord?.name || hotel.name}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3 space-y-3 text-sm">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={cloneOptions.categories}
                  onChange={(e) =>
                    setCloneOptions((previous) => ({ ...previous, categories: e.target.checked }))
                  }
                  className="mt-1 accent-amber-700"
                />
                <span>
                  <strong>Kategorien und ausgewählte Presets</strong>
                  <span className="block text-xs text-stone-500">
                    Die vorhandenen Kategorien werden in die neue Unterkunft kopiert.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={cloneOptions.texts}
                  onChange={(e) => setCloneOptions((previous) => ({ ...previous, texts: e.target.checked }))}
                  className="mt-1 accent-amber-700"
                />
                <span>
                  <strong>Eigene Texte</strong>
                  <span className="block text-xs text-stone-500">
                    Beschreibungen und allgemeine Informationstexte werden übernommen.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={cloneOptions.design}
                  onChange={(e) => setCloneOptions((previous) => ({ ...previous, design: e.target.checked }))}
                  className="mt-1 accent-amber-700"
                />
                <span>
                  <strong>Design und Farbthema</strong>
                  <span className="block text-xs text-stone-500">Das aktuelle Farbthema wird übernommen.</span>
                </span>
              </label>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs text-amber-900">
              Nicht kopiert werden: WLAN-Zugangsdaten, Adresse, Telefonnummer, E-Mail, Website, Logo, Bilder,
              QR-Link und Statistiken. Die Original-Unterkunft bleibt unverändert.
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setClonePreviewOpen(false)}
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-600"
              >
                {pilot.cancel}
              </button>
              <button
                onClick={cloneAccommodation}
                disabled={cloudDataStatus === 'saving'}
                className="rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-bold text-white"
              >
                {pilot.copy}
              </button>
            </div>
          </section>
        </div>
      )}

      <CompactPresetEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => {
          setIsEditorModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategoryModal}
        currentTheme={currentTheme}
        lang={lang}
        t={t}
        editingCategory={editingCategory}
      />
    </>
  );
}
