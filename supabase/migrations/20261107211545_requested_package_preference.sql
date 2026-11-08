-- Store a customer's non-binding package preference before payments are introduced.
alter table public.gm24_accounts
  add column if not exists requested_plan_code text
  check (requested_plan_code is null or requested_plan_code in ('single', 'multi', 'business'));

drop policy if exists "Account owners request a package" on public.gm24_accounts;
create policy "Account owners request a package"
  on public.gm24_accounts
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

grant update (requested_plan_code) on public.gm24_accounts to authenticated;
