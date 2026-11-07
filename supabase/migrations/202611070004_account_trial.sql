-- Account-level trial and subscription foundation.
-- The 30-day trial starts automatically with the first accommodation.
-- Existing accommodation data is preserved and backfilled from the earliest created_at.

create table if not exists public.gm24_accounts (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  plan_code text not null default 'trial',
  subscription_status text not null default 'trial'
    check (subscription_status in ('trial', 'active', 'suspended', 'cancelled')),
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  paid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gm24_accounts enable row level security;
drop policy if exists "Account owners read their subscription status" on public.gm24_accounts;
create policy "Account owners read their subscription status"
  on public.gm24_accounts for select
  to authenticated
  using (owner_id = auth.uid());

revoke all on table public.gm24_accounts from anon, public;
grant select on table public.gm24_accounts to authenticated;

-- Existing accounts start their trial from their first existing accommodation,
-- not from the date this migration is installed.
insert into public.gm24_accounts (
  owner_id, plan_code, subscription_status, trial_started_at, trial_ends_at
)
select
  h.owner_id,
  'trial',
  case when min(h.created_at) + interval '30 days' > now() then 'trial' else 'suspended' end,
  min(h.created_at),
  min(h.created_at) + interval '30 days'
from public.gm24_hotels h
group by h.owner_id
on conflict (owner_id) do nothing;

create or replace function public.gm24_start_first_accommodation_trial()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.gm24_accounts (
    owner_id, plan_code, subscription_status, trial_started_at, trial_ends_at
  )
  values (
    new.owner_id, 'trial', 'trial', now(), now() + interval '30 days'
  )
  on conflict (owner_id) do nothing;
  return new;
end;
$$;

drop trigger if exists gm24_start_trial_on_first_accommodation on public.gm24_hotels;
create trigger gm24_start_trial_on_first_accommodation
  after insert on public.gm24_hotels
  for each row execute function public.gm24_start_first_accommodation_trial();

revoke all on function public.gm24_start_first_accommodation_trial() from public, anon, authenticated;
grant execute on function public.gm24_start_first_accommodation_trial() to service_role;

-- Guest pages are publicly readable only while the account has an active trial
-- or an active paid subscription. Expired trial data is retained, not deleted.
drop policy if exists "Public can read published guest pages" on public.gm24_hotels;
create policy "Public can read published guest pages"
  on public.gm24_hotels
  for select
  to anon
  using (
    public_content <> '{}'::jsonb
    and exists (
      select 1
      from public.gm24_accounts a
      where a.owner_id = gm24_hotels.owner_id
        and (
          a.subscription_status = 'active'
          or (
            a.subscription_status = 'trial'
            and a.trial_ends_at > now()
          )
        )
    )
  );

comment on table public.gm24_accounts is
  'One subscription/trial record per customer account. Trial starts on first accommodation creation; accommodation records are never deleted on expiry.';
