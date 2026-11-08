revoke insert, update, delete, truncate, references, trigger on table public.gm24_accounts from authenticated;
grant select on table public.gm24_accounts to authenticated;
grant update (requested_plan_code) on table public.gm24_accounts to authenticated;
