import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

export default function useDashboardAnalytics({ hotelRecord, authSession, guestSlug, appMode }) {
  const [analyticsRows, setAnalyticsRows] = useState([]);
  const [analyticsPeriodDays, setAnalyticsPeriodDays] = useState(30);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    const hotelId = hotelRecord?.id;
    if (!supabase || !hotelId || guestSlug || hotelRecord?.owner_id !== authSession?.user?.id) {
      setAnalyticsRows([]);
      return undefined;
    }
    let active = true;
    const loadAnalytics = async () => {
      setAnalyticsLoading(true);
      const rows = [];
      const since = new Date(Date.now() - 180 * 86400000).toISOString().slice(0, 10);
      const pageSize = 500;
      for (let start = 0; active; start += pageSize) {
        const { data, error } = await supabase
          .from('gm24_analytics_daily')
          .select('event_date, page_key, views')
          .eq('hotel_id', hotelId)
          .gte('event_date', since)
          .order('event_date', { ascending: false })
          .order('page_key')
          .range(start, start + pageSize - 1);
        if (!active) return;
        if (error) {
          console.warn('Analytics could not be loaded:', error);
          setAnalyticsRows([]);
          setAnalyticsLoading(false);
          return;
        }
        const entries = data || [];
        rows.push(...entries.filter((row) => row?.page_key));
        if (entries.length < pageSize) break;
      }
      if (!active) return;
      setAnalyticsRows(rows);
      setAnalyticsLoading(false);
    };
    loadAnalytics();
    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') loadAnalytics();
    };
    window.addEventListener('focus', refreshWhenVisible);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    return () => {
      active = false;
      window.removeEventListener('focus', refreshWhenVisible);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [hotelRecord?.id, authSession?.user?.id, guestSlug, appMode]);
  return { analyticsRows, analyticsPeriodDays, setAnalyticsPeriodDays, analyticsLoading };
}
