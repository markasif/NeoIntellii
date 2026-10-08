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

  // Validate before checking configuration: a malformed request is a 400
  // whether or not this deploy can send mail.
  const body = (typeof req.body === "string" ? safeJson(req.body) : req.body) as Partial<ToolEmailRequest> | null;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid body" });
  }
  if (!isToolKind(body.tool)) {
    return res.status(400).json({ error: "Unknown tool" });
  }
  if (!isEmailAddress(body.email)) {
    return res.status(400).json({ error: "Invalid email" });
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
