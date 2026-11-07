-- Gastemappe24 Pro: privacy-minimal, hotel-separated analytics foundation.
-- Stores aggregate daily page-view counters only. No IP, visitor ID, device, user-agent,
-- cookie, referrer, name, email, or phone is stored in analytics.

create table if not exists public.gm24_hotels (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  name text not null default '',
  profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gm24_hotels_slug_format check (slug ~ '^[a-z0-9][a-z0-9-]{2,59}$')
);

create table if not exists public.gm24_analytics_daily (
  hotel_id uuid not null references public.gm24_hotels(id) on delete cascade,
  event_date date not null default (timezone('utc', now()))::date,
  page_key text not null,
  views bigint not null default 0 check (views >= 0),
  primary key (hotel_id, event_date, page_key),
  constraint gm24_analytics_page_key_length check (char_length(page_key) between 1 and 80)
);

create index if not exists gm24_analytics_daily_hotel_date_idx
  on public.gm24_analytics_daily (hotel_id, event_date desc);

alter table public.gm24_hotels enable row level security;
alter table public.gm24_analytics_daily enable row level security;

drop policy if exists "Hotel owners manage their own hotel" on public.gm24_hotels;
create policy "Hotel owners manage their own hotel"
  on public.gm24_hotels for all
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "Hotel owners read their own aggregate analytics" on public.gm24_analytics_daily;
create policy "Hotel owners read their own aggregate analytics"
  on public.gm24_analytics_daily for select
  to authenticated
  using (
    exists (
      select 1 from public.gm24_hotels h
      where h.id = gm24_analytics_daily.hotel_id
        and h.owner_id = auth.uid()
    )
  );

-- Only the server-side tracking function (service_role) can increment counters.
create or replace function public.gm24_increment_page_view(p_hotel_id uuid, p_page_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_page_key is null or char_length(p_page_key) < 1 or char_length(p_page_key) > 80 then
    raise exception 'Invalid page key';
  end if;

  insert into public.gm24_analytics_daily (hotel_id, event_date, page_key, views)
  values (p_hotel_id, (timezone('utc', now()))::date, p_page_key, 1)
  on conflict (hotel_id, event_date, page_key)
  do update set views = public.gm24_analytics_daily.views + 1;
end;
$$;

revoke all on function public.gm24_increment_page_view(uuid, text) from public, anon, authenticated;
grant execute on function public.gm24_increment_page_view(uuid, text) to service_role;

grant select, insert, update, delete on public.gm24_hotels to authenticated;
grant select on public.gm24_analytics_daily to authenticated;
