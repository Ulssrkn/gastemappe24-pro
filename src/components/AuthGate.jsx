import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthGate({ supabase }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    setError('');
    try {
      if (mode === 'reset') {
        const { error: requestError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin
        });
        if (requestError) throw requestError;
        setMessage('Wenn diese E-Mail registriert ist, erhältst du einen Link zum Zurücksetzen des Passworts.');
      } else if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password
        });
        if (signUpError) throw signUpError;
        setMessage(data.session
          ? 'Konto erstellt. Du wirst angemeldet …'
          : 'Konto erstellt. Bitte bestätige zuerst deine E-Mail-Adresse über den zugesandten Link.');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (signInError) throw signInError;
      }
    } catch (err) {
      setError(err?.message || 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setBusy(false);
    }
  };

  const title = mode === 'signup' ? 'Hotelkonto erstellen'
    : mode === 'reset' ? 'Passwort zurücksetzen'
    : 'Hotel-Dashboard';
  const submitLabel = mode === 'signup' ? 'Konto erstellen'
    : mode === 'reset' ? 'Reset-Link senden'
    : 'Anmelden';

  return (
    <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="bg-stone-900 text-white font-black px-3 py-1.5 rounded-xl text-sm">G</span>
            <span className="font-extrabold tracking-tight">gastemappe24 <span className="text-amber-700 text-xs">PRO</span></span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">{title}</h1>
          <p className="text-sm text-stone-500">
            {mode === 'signup'
              ? 'Erstelle ein persönliches Konto für die Verwaltung deiner Unterkunft.'
              : mode === 'reset'
                ? 'Wir senden dir einen Link an deine E-Mail-Adresse.'
                : 'Bitte melde dich an, um deine Unterkunft zu verwalten.'}
          </p>
        </header>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="gm24-auth-email" className="block text-xs font-bold text-stone-600">E-Mail-Adresse</label>
            <input id="gm24-auth-email" type="email" autoComplete="email" required value={email}
              onChange={event => setEmail(event.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200" />
          </div>
          {mode !== 'reset' && (
            <div className="space-y-1.5">
              <label htmlFor="gm24-auth-password" className="block text-xs font-bold text-stone-600">Passwort</label>
              <div className="relative">
                <input id="gm24-auth-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  minLength={8} required value={password} onChange={event => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-amber-200" />
                <button type="button" onClick={() => setShowPassword(value => !value)}
                  aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-stone-500 hover:text-stone-900"
                  title={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'signup' && <p className="text-[11px] text-stone-400">Mindestens 8 Zeichen.</p>}
            </div>
          )}
          {error && <p role="alert" className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-sm text-emerald-800">{message}</p>}
          <button type="submit" disabled={busy}
            className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white hover:bg-black disabled:opacity-50">
            {busy ? 'Bitte warten …' : submitLabel}
          </button>
        </form>

        <div className="flex flex-wrap justify-between gap-3 text-xs">
          {mode === 'login' ? (
            <>
              <button type="button" onClick={() => { setMode('signup'); setError(''); setMessage(''); }} className="font-bold text-amber-800">Konto erstellen</button>
              <button type="button" onClick={() => { setMode('reset'); setError(''); setMessage(''); }} className="text-stone-500 underline">Passwort vergessen?</button>
            </>
          ) : (
            <button type="button" onClick={() => { setMode('login'); setError(''); setMessage(''); }} className="font-bold text-amber-800">Zurück zur Anmeldung</button>
          )}
        </div>
        <p className="text-[11px] leading-relaxed text-stone-400">
          Deine Zugangsdaten werden direkt von Supabase Auth verarbeitet. Teile dein Passwort niemals mit dem Support.
        </p>
      </section>
    </main>
  );
}
