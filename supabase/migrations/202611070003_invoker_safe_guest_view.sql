-- Correct the public guest projection to use invoker permissions and RLS.
-- Public access is restricted to explicitly published rows and three safe columns.

drop view if exists public.gm24_guest_pages;

drop policy if exists "Public can read published guest pages" on public.gm24_hotels;
create policy "Public can read published guest pages"
  on public.gm24_hotels
  for select
  to anon
  using (public_content <> '{}'::jsonb);

revoke all on table public.gm24_hotels from anon;
grant select (slug, name, public_content) on table public.gm24_hotels to anon;

create view public.gm24_guest_pages
with (security_barrier = true, security_invoker = true)
as
select slug, name, public_content
from public.gm24_hotels
where public_content <> '{}'::jsonb;

revoke all on table public.gm24_guest_pages from public;
grant select on table public.gm24_guest_pages to anon, authenticated;

comment on view public.gm24_guest_pages is
  'Public guest-facing projection. Invoker permissions and RLS apply; only slug, display name and explicitly published public_content are exposed.';
