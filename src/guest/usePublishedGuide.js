import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { normalizeHotel } from '../guide/guideContent.js';

export default function usePublishedGuide(guestSlug, setHotel, setCategories) {
  const feedbackKey = () => `gm24_confirmed_feedback_${guestSlug}_${new Date().toISOString().slice(0, 10)}`;
  const trackGuestPageView = async (pageKey) => {
    if (!guestSlug || !supabase || !/^[a-zA-Z0-9_-]{1,80}$/.test(pageKey)) return false;
    try {
      const { data, error } = await supabase.functions.invoke('track-view', {
        body: { slug: guestSlug, page_key: pageKey },
      });
      if (error) throw error;
      return data?.ok === true;
    } catch (error) {
      console.warn('Analytics tracking unavailable:', error);
      return false;
    }
  };
  const trackGuestEvent = trackGuestPageView;
  const [guestFeedback, setGuestFeedback] = useState(() => {
    try {
      return guestSlug ? sessionStorage.getItem(feedbackKey()) || '' : '';
    } catch {
      return '';
    }
  });
  const [feedbackPending, setFeedbackPending] = useState(false);
  const [feedbackFailed, setFeedbackFailed] = useState(false);

  const submitGuestFeedback = async (answer) => {
    if (guestFeedback || feedbackPending) return;
    setFeedbackPending(true);
    setFeedbackFailed(false);
    const saved = await trackGuestEvent(answer === 'yes' ? 'feedback_helpful' : 'feedback_not_helpful');
    setFeedbackPending(false);
    if (!saved) {
      setFeedbackFailed(true);
      return;
    }
    setGuestFeedback(answer);
    try {
      sessionStorage.setItem(feedbackKey(), answer);
    } catch {}
  };
  const [guestPageStatus, setGuestPageStatus] = useState('idle');

  useEffect(() => {
    if (!guestSlug) {
      setGuestPageStatus('idle');
      return undefined;
    }
    if (!supabase) {
      setGuestPageStatus('error');
      return undefined;
    }
    let active = true;
    const loadGuestPage = async () => {
      setGuestPageStatus('loading');
      try {
        const { data, error } = await supabase
          .rpc('gm24_read_guest_guide', { p_slug: guestSlug })
          .maybeSingle();
        if (error) throw error;
        if (!data || !data.public_content || typeof data.public_content !== 'object') {
          if (active) setGuestPageStatus('not_found');
          return;
        }
        if (!active) return;
        const content = data.public_content;
        setHotel(normalizeHotel(content.hotel, data.name));
        setCategories(Array.isArray(content.categories) ? content.categories : []);
        setGuestPageStatus('ready');
        // Count every successfully opened guest guide view; no visitor identifiers are stored.
        trackGuestPageView('guest_home');
      } catch (error) {
        console.error('Public guest page could not be loaded:', error);
        if (active) setGuestPageStatus('error');
      }
    };
    loadGuestPage();
    return () => {
      active = false;
    };
  }, [guestSlug]);
  return { trackGuestPageView, trackGuestEvent, guestFeedback, feedbackPending, feedbackFailed, submitGuestFeedback, guestPageStatus };
}
