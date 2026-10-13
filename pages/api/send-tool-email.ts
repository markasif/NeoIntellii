import type { NextApiRequest, NextApiResponse } from "next";
import {
  buildToolEmail,
  isEmailAddress,
  isToolKind,
  type ToolEmailRequest,
} from "@/lib/toolEmail";

/**
 * Sends a visitor the results they asked for from one of the tools.
 *
 * This lives in the Next app rather than in a separate function service on
 * purpose: it ships with every deploy of the site, so the form and the email
 * that answers it can never be out of step, and RESEND_API_KEY stays a
 * server-only secret the browser never sees.
 *
 * Required environment variable:
 *   RESEND_API_KEY   Resend key. Without it the route answers 503 and the
 *                    caller carries on - the lead is already in Netlify Forms.
 * Optional:
 *   EMAIL_FROM       "NeoIntelli <noreply@neointelli.com>". Must be a
 *                    domain verified in Resend or Resend rejects the send.
 *   EMAIL_REPLY_TO   Optional. Omitted by default so these stay no-reply.
 *   EMAIL_BCC        Internal address to copy on every result email.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "NeoIntelli <noreply@neointelli.com>";

/** Caps what a single submission can carry into a template. */
const MAX_FIELDS = 40;
const MAX_VALUE_LENGTH = 500;
const MAX_PAYLOAD_BYTES = 10000;
const MAX_EMAIL_LENGTH = 254;

/** Rate limiter configuration: max 5 sends per IP per 60 seconds */
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const history = ipRequestHistory.get(ip) ?? [];
  const validHistory = history.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validHistory.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, validHistory);
    return true;
  }

  validHistory.push(now);
  ipRequestHistory.set(ip, validHistory);

  // Housekeeping: prevent memory growth if thousands of distinct IPs hit endpoint
  if (ipRequestHistory.size > 500) {
    for (const [key, timestamps] of ipRequestHistory.entries()) {
      const active = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) ipRequestHistory.delete(key);
      else ipRequestHistory.set(key, active);
    }
  }

  return false;
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0].trim();
  }
  return req.socket.remoteAddress || "127.0.0.1";
}

function hasHeaderInjection(str?: string): boolean {
  return typeof str === "string" && /[\r\n]/.test(str);
}

/**
 * Keeps the tool data to flat, short, printable values. The templates escape
 * everything they render; this stops anyone posting a novel through the form.
 */
function sanitizeData(input: unknown): ToolEmailRequest["data"] {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const clean: ToolEmailRequest["data"] = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>).slice(0, MAX_FIELDS)) {
    if (typeof value === "number" && Number.isFinite(value)) clean[key] = value;
    else if (typeof value === "string") clean[key] = value.slice(0, MAX_VALUE_LENGTH);
  }
  return clean;
}

function trimmed(value: unknown, max = 120): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim().slice(0, max);
  return text === "" ? undefined : text;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. IP Rate Limiting Check
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Too many requests. Please wait a minute before requesting another report." });
  }

  // 2. Payload size check
  const rawBodyString = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
  if (rawBodyString.length > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({ error: "Payload too large" });
  }

  // Validate before checking configuration: a malformed request is a 400
  // whether or not this deploy can send mail.
  const body = (typeof req.body === "string" ? safeJson(req.body) : req.body) as (Partial<ToolEmailRequest> & Record<string, unknown>) | null;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid body" });
  }

  // 3. Honeypot Check: silently pretend success if a bot filled the trap fields
  if (
    (typeof body["bot-field"] === "string" && body["bot-field"].trim() !== "") ||
    (typeof body.website === "string" && body.website.trim() !== "") ||
    (typeof body.honeypot === "string" && body.honeypot.trim() !== "")
  ) {
    return res.status(200).json({ ok: true, id: null });
  }

  if (!isToolKind(body.tool)) {
    return res.status(400).json({ error: "Unknown tool" });
  }
  if (!isEmailAddress(body.email) || body.email.length > MAX_EMAIL_LENGTH) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // 4. Header Injection Protection
  if (hasHeaderInjection(body.email) || hasHeaderInjection(typeof body.name === "string" ? body.name : undefined) || hasHeaderInjection(typeof body.company === "string" ? body.company : undefined)) {
    return res.status(400).json({ error: "Malformed input characters" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not the visitor's problem, and not worth failing their submission over.
    console.error("send-tool-email: RESEND_API_KEY is not configured");
    return res.status(503).json({ error: "Email sending is not configured" });
  }

  const request: ToolEmailRequest = {
    tool: body.tool,
    email: body.email.trim(),
    name: trimmed(body.name),
    company: trimmed(body.company),
    data: sanitizeData(body.data),
  };

  const { subject, html, text } = buildToolEmail(request);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || DEFAULT_FROM,
        to: [request.email],
        ...(process.env.EMAIL_REPLY_TO ? { reply_to: process.env.EMAIL_REPLY_TO } : {}),
        ...(process.env.EMAIL_BCC ? { bcc: [process.env.EMAIL_BCC] } : {}),
        subject,
        html,
        text,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("send-tool-email: Resend rejected the send", response.status, payload);
      return res.status(502).json({ error: "Email send failed" });
    }

    return res.status(200).json({ ok: true, id: (payload as { id?: string }).id ?? null });
  } catch (error) {
    console.error("send-tool-email: Resend request failed", error);
    return res.status(502).json({ error: "Email send failed" });
  }
}

function safeJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
