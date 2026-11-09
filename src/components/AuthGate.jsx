import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import authCopy from '../authCopy.js';

const languageNames = { de:'Deutsch', en:'English', tr:'Türkçe', fr:'Français', es:'Español', cs:'Čeština', sq:'Shqip', sv:'Svenska', nb:'Norsk', it:'Italiano', hr:'Hrvatski' };

export default function AuthGate({ supabase, lang = 'de', onLangChange, passwordRecovery = false, onPasswordUpdated }) {
  const [mode, setMode] = useState(passwordRecovery ? 'update' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const c = authCopy[lang] || authCopy.en;

  useEffect(() => {
    if (passwordRecovery) setMode('update');
  }, [passwordRecovery]);

  const clearMessages = () => { setError(''); setMessage(''); };
  const authReturnUrl = `${window.location.origin}/?mode=dashboard`;

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    clearMessages();
    try {
      if ((mode === 'signup' || mode === 'update') && password !== confirmPassword) {
        setError(c.mismatch);
        return;
      }
      if (mode === 'reset') {
        const { error: requestError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: authReturnUrl });
        if (requestError) throw requestError;
        setMessage(c.resetDone);
      } else if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(), password, options: { emailRedirectTo: authReturnUrl }
        });
        if (signUpError) throw signUpError;
        if (data.session) setMessage(c.signupDone);
        else setMessage(c.signupDone);
      } else if (mode === 'update') {
        const { error: updateError } = await supabase.auth.updateUser({ password });
        if (updateError) throw updateError;
        setMessage(c.passwordDone);
        onPasswordUpdated?.();
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (signInError) throw signInError;
      }
    } catch (err) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const title = mode === 'signup' ? c.signup : mode === 'reset' ? c.reset : mode === 'update' ? c.update : c.login;
  const description = mode === 'signup' ? c.signupText : mode === 'reset' ? c.resetText : mode === 'update' ? c.updateText : c.loginText;
  const submitLabel = mode === 'signup' ? c.create : mode === 'reset' ? c.send : mode === 'update' ? c.save : c.signIn;

  return (
    <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="bg-stone-900 text-white font-black px-3 py-1.5 rounded-xl text-sm">G</span>
              <span className="font-extrabold tracking-tight">gastemappe24 <span className="text-amber-700 text-xs">PRO</span></span>
            </div>
            <select aria-label="Language" value={lang} onChange={event => onLangChange?.(event.target.value)} className="rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-xs">
              {Object.entries(languageNames).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
            </select>
          </div>
          <h1 className="text-2xl font-black text-slate-900">{title}</h1>
          <p className="text-sm text-stone-500">{description}</p>
        </header>

        <form onSubmit={submit} className="space-y-4">
          {mode !== 'update' && <div className="space-y-1.5">
            <label htmlFor="gm24-auth-email" className="block text-xs font-bold text-stone-600">{c.email}</label>
            <input id="gm24-auth-email" type="email" autoComplete="email" required value={email}
              onChange={event => setEmail(event.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200" />
          </div>}
          {mode !== 'reset' && <>
            <div className="space-y-1.5">
              <label htmlFor="gm24-auth-password" className="block text-xs font-bold text-stone-600">{mode === 'update' ? c.password : c.password}</label>
              <div className="relative">
                <input id="gm24-auth-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  minLength={8} required value={password} onChange={event => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-amber-200" />
                <button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? c.hide : c.show}
                  aria-pressed={showPassword} className="absolute inset-y-0 right-0 flex items-center px-4 text-stone-500 hover:text-stone-900">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {(mode === 'signup' || mode === 'update') && <p className="text-[11px] text-stone-400">{c.minimum}</p>}
            </div>
            {(mode === 'signup' || mode === 'update') && <div className="space-y-1.5">
              <label htmlFor="gm24-auth-confirm" className="block text-xs font-bold text-stone-600">{c.confirm}</label>
              <input id="gm24-auth-confirm" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength={8} required value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200" />
            </div>}
          </>}
          {error && <p role="alert" className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-sm text-emerald-800">{message}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white hover:bg-black disabled:opacity-50">
            {busy ? c.wait : submitLabel}
          </button>
        </form>

        <div className="flex flex-wrap justify-between gap-3 text-xs">
          {mode === 'login' ? <>
            <button type="button" onClick={() => { setMode('signup'); clearMessages(); }} className="font-bold text-amber-800">{c.create}</button>
            <button type="button" onClick={() => { setMode('reset'); clearMessages(); }} className="text-stone-500 underline">{c.forgot}</button>
          </> : mode === 'update' ? null : <button type="button" onClick={() => { setMode('login'); clearMessages(); }} className="font-bold text-amber-800">{c.back}</button>}
        </div>
        <p className="text-[11px] leading-relaxed text-stone-400">{c.credentials}</p>
      </section>
    </main>
  );
}

