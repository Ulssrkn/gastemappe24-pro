// Records anonymous guest events without collecting visitor identifiers.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function reply(status: number, extraHeaders = {}) {
  const errors: Record<number, string> = {
    400: "Invalid guest event",
    404: "Guest guide is unavailable",
    405: "Method not allowed",
    413: "Request is too large",
    429: "Rate limit exceeded",
    502: "Could not record guest event",
    503: "Analytics is not configured",
  };
  const body = status === 200 ? { ok: true } : { error: errors[status] };
  return new Response(JSON.stringify(body), { status, headers: { ...headers, ...extraHeaders } });
}

serve(async req => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return reply(405);
  if (!supabaseUrl || !serviceRoleKey) return reply(503);
  if (!req.body) return reply(400);

  let body;
  const reader = req.body.getReader();
  try {
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 1024) {
        await reader.cancel();
        return reply(413);
      }
      text += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(text + decoder.decode());
  } catch {
    return reply(400);
  } finally {
    reader.releaseLock();
  }

  const slug = typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const page = body?.page_key ?? body?.page ?? "guest_home";
  if (!/^[a-z0-9][a-z0-9-]{2,59}$/.test(slug) || typeof page !== "string" || !/^[A-Za-z0-9_-]{1,80}$/.test(page)) {
    return reply(400);
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/gm24_record_guest_event`, {
      method: "POST",
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_slug: slug, p_event: page }),
    });
    if (!response.ok) return reply(502);
    const status = await response.json();
    if (![200, 400, 404, 429].includes(status)) return reply(502);
    return status === 429 ? reply(429, { "Retry-After": "60" }) : reply(status);
  } catch {
    return reply(502);
  }
});
