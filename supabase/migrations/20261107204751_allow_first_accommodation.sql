-- Allow exactly the first accommodation insert for a newly signed-up account.
-- The AFTER INSERT trigger on gm24_hotels creates the account trial row.
-- Subsequent inserts require an active trial or subscription.

drop policy if exists "Eligible accounts create accommodations" on public.gm24_hotels;
create policy "Eligible accounts create accommodations"
  on public.gm24_hotels for insert
  to authenticated
  with check (
    owner_id = auth.uid()
    and (
      exists (
        select 1 from public.gm24_accounts a
        where a.owner_id = auth.uid()
          and (
            a.subscription_status = 'active'
            or (a.subscription_status = 'trial' and a.trial_ends_at > now())
          )
      )
      or (
        not exists (select 1 from public.gm24_accounts a where a.owner_id = auth.uid())
        and not exists (select 1 from public.gm24_hotels h where h.owner_id = auth.uid())
      )
    )
  );
