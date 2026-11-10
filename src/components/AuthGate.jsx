import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import pilotCopy from '../pilotCopy.js';

export default function AuthGate({ supabase, lang, recovery = false, onRecovered }) {
  const copy = pilotCopy[lang] || pilotCopy.de;
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const switchMode = next => {
    setMode(next);
    setPassword('');
    setShowPassword(false);
    setMessage('');
    setError('');
  };

  const submit = async event => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage('');
    setError('');
    try {
      if (recovery) {
        const result = await supabase.auth.updateUser({ password });
        if (result.error) throw result.error;
        setPassword('');
        onRecovered();
      } else if (mode === 'reset') {
        const result = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
        if (result.error) throw result.error;
        setMessage(copy.resetSent);
      } else if (mode === 'signup') {
        const result = await supabase.auth.signUp({ email: email.trim(), password });
        if (result.error) throw result.error;
        if (!result.data.session) setMessage(copy.confirmEmail);
      } else {
        const result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (result.error) throw result.error;
      }
    } catch {
      setError(copy.authError);
    } finally {
      setBusy(false);
    }
  };

  const title = recovery ? copy.recovery : mode === 'signup' ? copy.signup : mode === 'reset' ? copy.reset : copy.login;
  const submitLabel = recovery ? copy.savePassword : mode === 'reset' ? copy.sendReset : title;

  return (
    <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
        <header className="space-y-2">
          <p className="text-sm font-extrabold tracking-tight">Gastemappe24 Pro</p>
          <h1 className="text-2xl font-black text-slate-900">{title}</h1>
        </header>
        <form onSubmit={submit} className="space-y-4">
          {!recovery && <label className="block text-xs font-bold text-stone-600">
            {copy.email}
            <input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600" />
          </label>}
          {(mode !== 'reset' || recovery) && <div className="relative">
            <label className="block text-xs font-bold text-stone-600">
              {copy.password}
              <input type={showPassword ? 'text' : 'password'} autoComplete={recovery || mode === 'signup' ? 'new-password' : 'current-password'}
                minLength={recovery || mode === 'signup' ? 8 : undefined} required value={password} onChange={event => setPassword(event.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-amber-600" />
            </label>
            <button type="button" onClick={() => setShowPassword(value => !value)}
              aria-label={showPassword ? copy.hidePassword : copy.showPassword} aria-pressed={showPassword}
              className="absolute bottom-0 right-0 px-4 py-3 text-slate-600">
              {showPassword ? <EyeOff aria-hidden="true" className="w-5 h-5" /> : <Eye aria-hidden="true" className="w-5 h-5" />}
            </button>
          </div>}
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="text-sm text-emerald-700">{message}</p>}
          <button type="submit" disabled={busy}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
            {submitLabel}
          </button>
        </form>
        {!recovery && <div className="flex flex-wrap justify-between gap-3 text-xs font-bold text-amber-900">
          {mode === 'login' ? <>
            <button type="button" onClick={() => switchMode('signup')}>{copy.signup}</button>
            <button type="button" onClick={() => switchMode('reset')}>{copy.reset}</button>
          </> : <button type="button" onClick={() => switchMode('login')}>{copy.login}</button>}
        </div>}
        {!recovery && (
          <a href="/?demo=admin" className="block text-center text-xs font-bold text-indigo-900 underline underline-offset-4">
            {({
              de: 'Dashboard-Demo ansehen',
              en: 'Explore the dashboard demo',
              tr: 'Yönetim paneli demosunu incele',
              fr: 'Découvrir la démo du tableau de bord',
              es: 'Explorar la demo del panel',
              hr: 'Pogledajte demo nadzorne ploče',
              sq: 'Shiko demonstrimin e panelit',
              sv: 'Utforska demo av kontrollpanelen',
              nb: 'Utforsk demoen av dashbordet',
              it: 'Esplora la demo del pannello',
            })[lang] || 'Explore the dashboard demo'}
          </a>
        )}
      </section>
    </main>
  );
}
