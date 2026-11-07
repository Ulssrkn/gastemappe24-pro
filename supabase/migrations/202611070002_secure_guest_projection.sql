-- Gastemappe24 Pro: secure public guest-page projection.
-- Apply after 202611070001_saas_analytics.sql.
-- The base hotel row remains owner-only; guests receive only the explicitly
-- published fields through this narrow view. Never expose owner_id or private
-- dashboard fields through the public view.

alter table public.gm24_hotels
  add column if not exists public_content jsonb not null default '{}'::jsonb;

-- The owner policy from migration 001 remains the only direct table policy.
-- Public guests must not receive direct SELECT on gm24_hotels.
revoke all on table public.gm24_hotels from anon;
grant select, insert, update, delete on table public.gm24_hotels to authenticated;

create or replace view public.gm24_guest_pages
with (security_barrier = true)
as
select
  slug,
  name,
  public_content
from public.gm24_hotels
where public_content <> '{}'::jsonb;

-- The view intentionally exposes only published guest-facing content.
revoke all on table public.gm24_guest_pages from public;
grant select on table public.gm24_guest_pages to anon, authenticated;

-- A guest can read the public projection, but cannot enumerate owner records
-- or access the underlying hotel table through the anon role.
-- Analytics remain readable only by authenticated hotel owners (migration 001).

-- Close the unnecessary direct RPC execution surface flagged by Supabase
-- Security Advisor. The event trigger itself continues to enforce RLS on
-- newly created public tables.
revoke all on function public.rls_auto_enable() from public, anon, authenticated;

comment on view public.gm24_guest_pages is
  'Public guest-facing projection. Only slug, display name and explicitly published public_content are exposed.';
