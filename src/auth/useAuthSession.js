import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

export default function useAuthSession(enabled = true) {
  const [authSession, setAuthSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [recoveringPassword, setRecoveringPassword] = useState(false);
  const ownerRef = useRef({ id: null });

  useEffect(() => {
    if (!enabled || !supabase) {
      setAuthLoading(false);
      return undefined;
    }
    let mounted = true;
    const syncSession = (session) => {
      const id = session?.user?.id || null;
      if (ownerRef.current.id !== id) ownerRef.current = { id };
      setAuthSession(session);
    };
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.warn('Could not restore Supabase session:', error);
      syncSession(data?.session || null);
      setAuthLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setRecoveringPassword(true);
      if (event === 'SIGNED_OUT') setRecoveringPassword(false);
      syncSession(session || null);
      setAuthLoading(false);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [enabled]);
  return { authSession, authLoading, recoveringPassword, setRecoveringPassword, ownerRef };
}
