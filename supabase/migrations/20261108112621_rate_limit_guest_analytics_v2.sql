create table if not exists public.gm24_analytics_rate_limits (
  hotel_id uuid primary key references public.gm24_hotels(id),
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count between 0 and 600)
);
alter table public.gm24_analytics_rate_limits enable row level security;
revoke all on table public.gm24_analytics_rate_limits from public, anon, authenticated;
grant all on table public.gm24_analytics_rate_limits to service_role;
create or replace function public.gm24_check_analytics_rate_limit(p_hotel_id uuid)
returns boolean language plpgsql security definer set search_path=pg_catalog,public as $$
declare accepted_count integer;
begin
 if p_hotel_id is null then return false; end if;
 insert into public.gm24_analytics_rate_limits(hotel_id,window_start,request_count)
 values(p_hotel_id,date_trunc('minute',now()),1)
 on conflict(hotel_id) do update
 set request_count=case when public.gm24_analytics_rate_limits.window_start<date_trunc('minute',now()) then 1 else public.gm24_analytics_rate_limits.request_count+1 end,
 window_start=date_trunc('minute',now())
 where public.gm24_analytics_rate_limits.window_start<date_trunc('minute',now()) or public.gm24_analytics_rate_limits.request_count<600
 returning request_count into accepted_count;
 return accepted_count is not null;
end; $$;
revoke all on function public.gm24_check_analytics_rate_limit(uuid) from public,anon,authenticated;
grant execute on function public.gm24_check_analytics_rate_limit(uuid) to service_role;
create or replace function public.gm24_increment_page_view(p_hotel_id uuid,p_page_key text)
returns void language plpgsql security definer set search_path=pg_catalog,public as $$
begin
 if p_page_key is null or not (p_page_key in ('guest_home','guest_services','guest_route','guest_review','action_route','action_wifi_copy','action_review','action_call','action_website','feedback_helpful','feedback_not_helpful') or p_page_key ~ '^category_[A-Za-z0-9_-]{1,68}$') then raise exception 'Invalid analytics event' using errcode='22023'; end if;
 insert into public.gm24_analytics_daily(hotel_id,event_date,page_key,views) values(p_hotel_id,(timezone('utc',now()))::date,p_page_key,1)
 on conflict(hotel_id,event_date,page_key) do update set views=public.gm24_analytics_daily.views+1;
end; $$;
revoke all on function public.gm24_increment_page_view(uuid,text) from public,anon,authenticated;
grant execute on function public.gm24_increment_page_view(uuid,text) to service_role;
