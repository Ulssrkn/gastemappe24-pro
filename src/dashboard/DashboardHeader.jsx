import React from 'react';
import LanguageSelect from '../components/LanguageSelect.jsx';
import { LogOut, Save } from 'lucide-react';
import dashboardDemoCopy from '../i18n/dashboardDemoCopy.js';

export default function DashboardHeader({ workspace, lang, pilot, onGuestPreview, onSignOut, setLang, t, readOnlyDemo = false }) {
  const { cloudDataStatus, guidePublished, handleSaveData, isSaved, trialExpired } = workspace;
  const ui = dashboardDemoCopy[lang] || dashboardDemoCopy.de;
  return (
    <div
      id="dashboard-home"
      className="w-full max-w-6xl mx-auto min-w-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm sm:px-6"
    >
      <div className="flex items-center gap-2">
        {readOnlyDemo ? <img src="/gastemappe24-logo.svg" alt="Gastemappe24" className="h-9 w-auto max-w-[180px] object-contain object-left" /> : <><span className="bg-slate-900 text-amber-300 font-black px-3 py-1.5 rounded-xl text-sm">G</span><span className="font-extrabold text-lg tracking-tight">gastemappe<span className="text-amber-700">24</span></span></>}
      </div>
      <div className="w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-3">
        <LanguageSelect
          lang={lang}
          onChange={setLang}
          label={pilot.language}
          className="bg-white border border-stone-200 text-xs rounded-xl px-2.5 py-2 cursor-pointer"
        />
        {!readOnlyDemo && <><button
          onClick={() => handleSaveData()}
          disabled={cloudDataStatus === 'saving' || trialExpired}
          className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" /> {isSaved ? t.savedMsg : t.saveBtn}
        </button>
        <button
          type="button"
          onClick={() => handleSaveData(true)}
          disabled={cloudDataStatus === 'saving' || trialExpired}
          className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
        >
          {pilot.publish}
        </button>
        <span role="status" className="text-xs text-slate-600">
          {guidePublished ? pilot.published : pilot.unpublished}
        </span>
        </>}
        {readOnlyDemo && <span className="rounded-xl bg-indigo-50 px-3 py-2 text-[11px] font-bold text-indigo-800">{ui.demo}</span>}
        <button
          onClick={onGuestPreview}
          className="border border-slate-200 bg-white text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
        >
          {t.guestViewBtn}
        </button>
        {!readOnlyDemo && <button
          onClick={onSignOut}
          disabled={cloudDataStatus === 'saving'}
          className="border border-stone-200 text-stone-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-stone-50 transition cursor-pointer inline-flex items-center gap-1"
        >
          <LogOut className="w-3.5 h-3.5" /> Abmelden
        </button>}
      </div>
    </div>
  );
}
