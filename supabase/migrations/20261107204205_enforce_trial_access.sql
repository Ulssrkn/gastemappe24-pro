-- Enforce trial/subscription state at the database boundary.
-- Owners can still read their saved data after expiry, but cannot publish or edit it.

drop policy if exists "Hotel owners manage their own hotel" on public.gm24_hotels;

drop policy if exists "Hotel owners read their own accommodations" on public.gm24_hotels;
create policy "Hotel owners read their own accommodations"
  on public.gm24_hotels for select
  to authenticated
  using (owner_id = auth.uid());

drop policy if exists "Eligible accounts create accommodations" on public.gm24_hotels;
create policy "Eligible accounts create accommodations"
  on public.gm24_hotels for insert
  to authenticated
  with check (
    owner_id = auth.uid()
    and exists (
      select 1 from public.gm24_accounts a
      where a.owner_id = auth.uid()
        and (
          a.subscription_status = 'active'
          or (a.subscription_status = 'trial' and a.trial_ends_at > now())
        )
    )
  );

drop policy if exists "Eligible accounts update accommodations" on public.gm24_hotels;
create policy "Eligible accounts update accommodations"
  on public.gm24_hotels for update
  to authenticated
  using (
    owner_id = auth.uid()
    and exists (
      select 1 from public.gm24_accounts a
      where a.owner_id = auth.uid()
        and (
          a.subscription_status = 'active'
          or (a.subscription_status = 'trial' and a.trial_ends_at > now())
        )
    )
  )
  with check (owner_id = auth.uid());

drop policy if exists "Hotel owners delete their own accommodations" on public.gm24_hotels;
create policy "Hotel owners delete their own accommodations"
  on public.gm24_hotels for delete
  to authenticated
  using (owner_id = auth.uid());
