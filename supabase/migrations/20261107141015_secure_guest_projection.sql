alter table public.gm24_hotels
  add column if not exists public_content jsonb not null default '{}'::jsonb;

revoke all on table public.gm24_hotels from anon;
grant select, insert, update, delete on table public.gm24_hotels to authenticated;

create or replace view public.gm24_guest_pages
with (security_barrier = true)
as
select slug, name, public_content
from public.gm24_hotels
where public_content <> '{}'::jsonb;

revoke all on table public.gm24_guest_pages from public;
grant select on table public.gm24_guest_pages to anon, authenticated;

revoke all on function public.rls_auto_enable() from public, anon, authenticated;

comment on view public.gm24_guest_pages is
  'Public guest-facing projection. Only slug, display name and explicitly published public_content are exposed.';
