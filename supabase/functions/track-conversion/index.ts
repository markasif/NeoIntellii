import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/**
 * track-conversion
 * Server-side conversion sink. Today it logs structured events so they
 * appear in Edge Function logs and are ready for forwarding to GA4
 * Measurement Protocol, Google Ads Offline Conversions, or a CRM webhook
 * once those integrations are configured.
 *
 * Stub on purpose - no PII storage, no third-party calls yet.
 */

type Payload = {
  event?: string;
  params?: Record<string, unknown>;
  attribution?: Record<string, unknown>;
  page?: string;
  referrer?: string;
  ts?: number;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Payload = {};
  try {
    body = (await req.json()) as Payload;
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!body.event || typeof body.event !== "string") {
    return new Response(JSON.stringify({ error: "missing_event" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const record = {
    kind: "conversion",
    event: body.event,
    page: body.page,
    referrer: body.referrer,
    attribution: body.attribution ?? {},
    params: body.params ?? {},
    received_at: new Date().toISOString(),
    client_ts: body.ts,
    ua: req.headers.get("user-agent") ?? null,
  };

  // Structured JSON log - easy to grep in Edge Function logs and to
  // forward later to GA4 MP / Google Ads / CRM.
  console.log(JSON.stringify(record));

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});