-- Enforce accommodation limits for trials and activated plans.
-- The trigger serializes inserts per owner so concurrent API requests cannot
-- exceed a limit. Existing accommodation rows are not modified or removed.

create or replace function public.gm24_enforce_accommodation_limit()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  account_record public.gm24_accounts%rowtype;
  accommodation_count bigint;
  accommodation_limit integer;
begin
  -- Serialize concurrent inserts for one owner, including the first insert
  -- before the AFTER INSERT trial initializer has created an account row.
  perform pg_advisory_xact_lock(hashtextextended(new.owner_id::text, 240324));

  select count(*) into accommodation_count
  from public.gm24_hotels h
  where h.owner_id = new.owner_id;

  select * into account_record
  from public.gm24_accounts a
  where a.owner_id = new.owner_id;

  if not found then
    if accommodation_count = 0 then
      return new;
    end if;
    raise exception 'An account is required before adding another accommodation.' using errcode = '23514';
  end if;

  if account_record.subscription_status = 'trial'
     and account_record.trial_ends_at > now() then
    accommodation_limit := 3;
  elsif account_record.subscription_status = 'active' then
    accommodation_limit := case account_record.plan_code
      when 'single' then 1
      when 'multi' then 3
      when 'business' then 10
      else 0
    end;
  else
    accommodation_limit := 0;
  end if;

  if accommodation_limit = 0 or accommodation_count >= accommodation_limit then
    raise exception 'The current plan does not allow another accommodation.' using errcode = '23514';
  end if;

  return new;
end;
$$;

revoke all on function public.gm24_enforce_accommodation_limit() from public, anon, authenticated;

drop trigger if exists gm24_enforce_accommodation_limit on public.gm24_hotels;
create trigger gm24_enforce_accommodation_limit
  before insert on public.gm24_hotels
  for each row execute function public.gm24_enforce_accommodation_limit();

drop policy if exists "Eligible accounts create accommodations" on public.gm24_hotels;
create policy "Eligible accounts create accommodations"
  on public.gm24_hotels for insert
  to authenticated
  with check (
    owner_id = (select auth.uid())
    and (
      (
        exists (
          select 1 from public.gm24_accounts a
          where a.owner_id = (select auth.uid())
            and (
              (a.subscription_status = 'trial' and a.trial_ends_at > now())
              or a.subscription_status = 'active'
            )
        )
        and (
          select count(*) from public.gm24_hotels h
          where h.owner_id = (select auth.uid())
        ) < coalesce((
          select case
            when a.subscription_status = 'trial' then 3
            when a.subscription_status = 'active' and a.plan_code = 'single' then 1
            when a.subscription_status = 'active' and a.plan_code = 'multi' then 3
            when a.subscription_status = 'active' and a.plan_code = 'business' then 10
            else 0
          end
          from public.gm24_accounts a
          where a.owner_id = (select auth.uid())
        ), 0)
      )
      or (
        not exists (
          select 1 from public.gm24_accounts a
          where a.owner_id = (select auth.uid())
        )
        and not exists (
          select 1 from public.gm24_hotels h
          where h.owner_id = (select auth.uid())
        )
      )
    )
  );
