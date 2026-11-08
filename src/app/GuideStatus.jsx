import React from 'react';
import AuthGate from '../components/AuthGate.jsx';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

export function GuestStatus({ guestSlug, guestPageStatus, children }) {
  if (guestSlug && (guestPageStatus === 'loading' || guestPageStatus === 'idle')) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center text-sm text-stone-500">
        Gästemappe wird geladen …
      </main>
    );
  }

  if (guestSlug && guestPageStatus !== 'ready') {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-5">
        <section className="max-w-md bg-white border border-stone-200 rounded-3xl p-7 text-center space-y-3">
          <h1 className="text-xl font-black text-slate-900">Gästemappe nicht verfügbar</h1>
          <p className="text-sm text-stone-500">
            Dieser Link ist ungültig oder die Unterkunft hat ihre Gästemappe noch nicht veröffentlicht.
          </p>
        </section>
      </main>
    );
  }
  return children;
}

export function DashboardStatus({
  authSession,
  authLoading,
  canManage,
  cloudDataError,
  trialExpired,
  accountRecord,
  lang,
  pilot,
  setAppMode,
  setShowWelcomeScreen,
  children,
}) {
  if (!isSupabaseConfigured) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
        <section className="max-w-xl bg-white border border-stone-200 rounded-3xl p-7 space-y-3">
          <h1 className="text-xl font-black text-slate-900">Supabase-Verbindung noch nicht konfiguriert</h1>
          <p className="text-sm text-stone-600">
            Für den geschützten Dashboard-Zugang müssen in Vercel die Umgebungsvariablen VITE_SUPABASE_URL und
            VITE_SUPABASE_ANON_KEY hinterlegt werden. Danach bitte ein neues Deployment starten.
          </p>
          <button
            onClick={() => {
              setAppMode('guest');
              setShowWelcomeScreen(false);
            }}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-bold text-white"
          >
            Zur Gastansicht
          </button>
        </section>
      </main>
    );
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center text-sm text-stone-500">
        Anmeldestatus wird geprüft …
      </main>
    );
  }

  if (!authSession?.user) {
    return <AuthGate supabase={supabase} lang={lang} />;
  }

  if (!canManage) {
    return (
      <main className="min-h-screen grid place-content-center gap-4 p-6 text-center">
        <p role="status">{cloudDataError || pilot.loading}</p>
        {cloudDataError && (
          <button type="button" onClick={() => window.location.reload()}>
            {pilot.retry}
          </button>
        )}
      </main>
    );
  }

  if (trialExpired) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
        <section className="w-full max-w-xl bg-white border border-amber-200 rounded-3xl p-7 space-y-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-wider text-amber-700">
            Gastemappe24 Pro · Konto
          </div>
          <h1 className="text-2xl font-black text-slate-900">Deine Testphase ist beendet</h1>
          <p className="text-sm text-stone-600">
            Deine 30-tägige Testphase ist abgelaufen. Dein Zugang ist vorübergehend gesperrt. Deine Unterkünfte
            und Inhalte bleiben gespeichert und werden nicht gelöscht.
          </p>
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-stone-500">Aktuelles Paket</span>
              <strong>{accountRecord.plan_code || 'Trial'}</strong>
            </div>
            <div className="flex justify-between gap-3 mt-2">
              <span className="text-stone-500">Status</span>
              <strong className="text-amber-700">Zugang pausiert</strong>
            </div>
          </div>
          <p className="text-xs text-stone-500">Bitte kontaktiere den Anbieter, um dein Paket zu aktivieren.</p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setAppMode('guest');
            }}
            className="rounded-xl bg-stone-900 text-white px-4 py-2.5 text-xs font-bold"
          >
            Abmelden
          </button>
        </section>
      </main>
    );
  }
  return children;
}
