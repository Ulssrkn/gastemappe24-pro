// Privacy-minimal public page-view counter for Gastemappe24 Pro.
// Deliberately does not read or persist IP, user-agent, referrer, cookies,
// visitor identifiers, device details, or other guest data.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }
  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "Analytics service is not configured" }), { status: 503, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const slug = typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
    const page = typeof body?.page === "string" ? body.page.trim() : "home";

    if (!/^[a-z0-9][a-z0-9-]{2,59}$/.test(slug) || !/^[a-zA-Z0-9_-]{1,80}$/.test(page)) {
      return new Response(JSON.stringify({ error: "Invalid hotel or page" }), { status: 400, headers: corsHeaders });
    }

    const hotelResponse = await fetch(
      `${supabaseUrl}/rest/v1/gm24_hotels?slug=eq.${encodeURIComponent(slug)}&select=id,owner_id&limit=1`,
      { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` } },
    );
    if (!hotelResponse.ok) {
      return new Response(JSON.stringify({ error: "Could not resolve hotel" }), { status: 502, headers: corsHeaders });
    }
    const hotels = await hotelResponse.json();
    if (!Array.isArray(hotels) || !hotels[0]?.id) {
      return new Response(JSON.stringify({ error: "Hotel not found" }), { status: 404, headers: corsHeaders });
    }

    // This function uses the service-role key and therefore bypasses RLS.
    // Re-check the same eligibility rule as the public guest-page policy
    // before recording a view, so expired/suspended pages cannot keep
    // accumulating analytics through direct function calls.
    const accountResponse = await fetch(
      `${supabaseUrl}/rest/v1/gm24_accounts?owner_id=eq.${encodeURIComponent(hotels[0].owner_id)}&select=subscription_status,trial_ends_at&limit=1`,
      { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` } },
    );
    if (!accountResponse.ok) {
      return new Response(JSON.stringify({ error: "Could not verify guest page access" }), { status: 502, headers: corsHeaders });
    }
    const accounts = await accountResponse.json();
    const account = Array.isArray(accounts) ? accounts[0] : null;
    const trialIsActive = account?.subscription_status === "trial"
      && account?.trial_ends_at
      && new Date(account.trial_ends_at).getTime() > Date.now();
    const subscriptionIsActive = account?.subscription_status === "active";
    if (!trialIsActive && !subscriptionIsActive) {
      return new Response(JSON.stringify({ error: "Guest page is unavailable" }), { status: 404, headers: corsHeaders });
    }

    const countResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/gm24_increment_page_view`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_hotel_id: hotels[0].id, p_page_key: page }),
    });
    if (!countResponse.ok) {
      return new Response(JSON.stringify({ error: "Could not record page view" }), { status: 502, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders });
  }
});
