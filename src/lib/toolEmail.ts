/**
 * Result emails for the interactive tools.
 *
 * A visitor who fills in "Email me this cost estimate" is asking for something
 * they can forward to finance, so the email carries the whole result - the
 * team, every cost line, the US comparison - not a "thanks, we'll be in touch".
 *
 * Pure string building, no network and no secrets: pages/api/send-tool-email.ts
 * owns the Resend call, this owns what the message says. That split is what
 * makes the copy testable.
 */

export type ToolKind = "cost" | "roi" | "readiness";

export interface ToolEmailRequest {
  tool: ToolKind;
  name?: string;
  email: string;
  company?: string;
  /** The tool's inputs and results, as posted by ToolLeadCapture. */
  data: Record<string, string | number | undefined>;
}

export interface BuiltEmail {
  subject: string;
  html: string;
  /** Plain-text alternative. Mail clients that get only HTML score worse. */
  text: string;
}

const BOOKING_URL = "https://neointelli.com/book-a-call";
const SITE_URL = "https://www.neointelli.com";

const INK = "#0a1628";
const MUTED = "#64748b";
const BODY = "#334155";
const BRAND = "#0a93bd";
const DEEP = "#36326a";
const WASH = "#f5f5f7";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "$37,683". Anything that is not a number comes back as "-". */
export function money(value: unknown): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** "$37,683 - $42,950", collapsed to one figure when the range is flat. */
export function moneyRange(low: unknown, high: unknown): string {
  const l = money(low);
  const h = money(high);
  if (l === "-" && h === "-") return "-";
  if (l === h) return l;
  if (l === "-" || h === "-") return l === "-" ? h : l;
  return `${l} - ${h}`;
}

const has = (value: unknown): boolean =>
  value !== undefined && value !== null && String(value).trim() !== "";

/** A first name to greet with, or nothing rather than a wrong guess. */
function greeting(name?: string): string {
  const first = String(name ?? "").trim().split(/\s+/)[0];
  return first ? `Hi ${escapeHtml(first)},` : "Hi there,";
}

/* ------------------------------------------------------------------ layout */

function shell(title: string, intro: string, inner: string, name?: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${WASH};font-family:Helvetica,Arial,sans-serif;color:${INK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(intro)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WASH};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:${DEEP};padding:22px 32px;">
          <img src="${SITE_URL}/images/neointelli-logo-white.png" width="111" height="32" alt="NeoIntelli" style="display:block;border:0;outline:none;text-decoration:none;height:32px;width:111px;" />
        </td></tr>
        <tr><td style="padding:32px;">
          <div style="margin:0 0 20px;padding:10px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;line-height:1.5;color:${MUTED};">This is an automated email. Please do not reply.</div>
          <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;color:${INK};line-height:1.3;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${BODY};">${greeting(name)}</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${BODY};">${escapeHtml(intro)}</p>
          ${inner}
          <div style="margin:32px 0 8px;text-align:center;">
            <a href="${BOOKING_URL}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:8px;">Book a 30-minute GCC call</a>
          </div>
          <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:${BODY};">Questions about any of these numbers? Email <a href="mailto:reachus@neointelli.com" style="color:${BRAND};text-decoration:none;">reachus@neointelli.com</a> or use the button above. Please do not reply to this message.</p>
          <p style="margin:20px 0 0;font-size:14px;color:${BODY};">- The NeoIntelli Team</p>
        </td></tr>
        <tr><td style="background:${WASH};padding:20px 32px;text-align:center;font-size:12px;color:${MUTED};line-height:1.6;">
          NeoIntelli - Bengaluru, India - <a href="${SITE_URL}" style="color:${BRAND};text-decoration:none;">neointelli.com</a><br>
          You are receiving this because you asked for these results on neointelli.com.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/** The headline figures, one boxed row each. */
function highlights(rows: Array<[string, string]>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
    ${rows
      .map(
        ([label, value]) => `<tr><td style="padding:0 0 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WASH};border-radius:8px;">
        <tr><td style="padding:14px 16px;">
          <div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">${escapeHtml(label)}</div>
          <div style="font-size:19px;color:${INK};font-weight:600;">${escapeHtml(value)}</div>
        </td></tr>
      </table>
    </td></tr>`,
      )
      .join("")}
  </table>`;
}

/** The cost breakdown, as a real table - this is the part finance reads. */
function breakdownTable(rows: Array<[string, string, string]>): string {
  const head = `<tr>
      <th align="left" style="padding:8px 0;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;">Category</th>
      <th align="right" style="padding:8px 0;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;">Monthly</th>
      <th align="right" style="padding:8px 0;font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;">Annual</th>
    </tr>`;
  const body = rows
    .map(
      ([label, monthly, annual], index) => `<tr>
      <td style="padding:10px 0;font-size:14px;color:${INK};${index === rows.length - 1 ? "font-weight:600;border-top:1px solid #e2e8f0;" : ""}">${escapeHtml(label)}</td>
      <td align="right" style="padding:10px 0;font-size:13px;color:${BODY};${index === rows.length - 1 ? "font-weight:600;border-top:1px solid #e2e8f0;" : ""}">${escapeHtml(monthly)}</td>
      <td align="right" style="padding:10px 0;font-size:13px;color:${BODY};${index === rows.length - 1 ? "font-weight:600;border-top:1px solid #e2e8f0;" : ""}">${escapeHtml(annual)}</td>
    </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">${head}${body}</table>`;
}

function note(text: string): string {
  return `<p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">${escapeHtml(text)}</p>`;
}

/** Joins the plain-text body, dropping omitted lines but keeping blank ones. */
function textBlock(lines: Array<string | false | undefined>): string {
  const kept = lines.filter((line): line is string => typeof line === "string");
  return [
    ...kept,
    "",
    "This is an automated email. Please do not reply.",
    "Questions: reachus@neointelli.com",
    "Book a 30-minute GCC call:",
    BOOKING_URL,
    "",
    "- The NeoIntelli Team",
    "neointelli.com",
  ].join("\n");
}

/* ------------------------------------------------------------- cost estimate */

function buildCost(d: ToolEmailRequest["data"], name?: string): BuiltEmail {
  const monthly = moneyRange(d.monthlyLow, d.monthlyHigh);
  const annual = moneyRange(d.annualLow, d.annualHigh);
  const usEquiv = moneyRange(d.usEquivLow, d.usEquivHigh);
  const savings = moneyRange(d.savingsLow, d.savingsHigh);
  const savingsPct = has(d.savingsPctLow) && has(d.savingsPctHigh) ? ` (${d.savingsPctLow}-${d.savingsPctHigh}%)` : "";

  const setup = [
    has(d.totalTeam) ? `${d.totalTeam} people` : null,
    has(d.city) ? String(d.city) : null,
    has(d.seniority) ? `${d.seniority} mix` : null,
    has(d.engagement) ? String(d.engagement) : null,
    has(d.blueprintPod) ? String(d.blueprintPod) : null,
    has(d.complexityTier) ? String(d.complexityTier) : null,
  ].filter(Boolean) as string[];

  const perMonth = (low: unknown, high: unknown) =>
    has(low) || has(high) ? moneyRange(Number(low) / 12, Number(high) / 12) : "-";

  const rows: Array<[string, string, string]> = [];
  if (has(d.salaryLow) || has(d.salaryHigh)) {
    rows.push(["Salaries & benefits", perMonth(d.salaryLow, d.salaryHigh), moneyRange(d.salaryLow, d.salaryHigh)]);
  }
  if (has(d.infraLow) || has(d.infraHigh)) {
    rows.push(["Office & infrastructure", perMonth(d.infraLow, d.infraHigh), moneyRange(d.infraLow, d.infraHigh)]);
  }
  if (has(d.opsLow) || has(d.opsHigh)) {
    rows.push(["Operations & compliance", perMonth(d.opsLow, d.opsHigh), moneyRange(d.opsLow, d.opsHigh)]);
  }
  if (Number(d.partnerHigh) > 0) {
    rows.push(["GCC partner fee", perMonth(d.partnerLow, d.partnerHigh), moneyRange(d.partnerLow, d.partnerHigh)]);
  }
  if (Number(d.smeHigh) > 0) {
    rows.push(["Strategic advisory (fractional SME)", perMonth(d.smeLow, d.smeHigh), moneyRange(d.smeLow, d.smeHigh)]);
  }
  if (rows.length > 0) rows.push(["Total", monthly, annual]);

  const inner = `
    ${setup.length ? `<p style="margin:0 0 20px;font-size:14px;color:${MUTED};">Your setup: <span style="color:${INK};font-weight:600;">${escapeHtml(setup.join(" · "))}</span></p>` : ""}
    ${highlights([
      ["Estimated monthly cost", monthly],
      ["Estimated annual cost", annual],
      ["Equivalent US cost", usEquiv],
      ["Annual savings", `${savings}${savingsPct}`],
    ])}
    ${rows.length ? `<h2 style="margin:8px 0 4px;font-size:16px;font-weight:600;color:${INK};">Cost breakdown</h2>${breakdownTable(rows)}` : ""}
    ${has(d.roles) ? `<h2 style="margin:24px 0 4px;font-size:16px;font-weight:600;color:${INK};">Team</h2><p style="margin:0;font-size:14px;line-height:1.7;color:${BODY};">${escapeHtml(d.roles)}</p>` : ""}
    ${has(d.specializations) ? `<p style="margin:8px 0 0;font-size:13px;line-height:1.7;color:${MUTED};">Focus areas: ${escapeHtml(d.specializations)}</p>` : ""}
    ${note("Estimates are based on market data and NeoIntelli's experience building GCCs across India. Actual costs vary with your specific requirements, timing and market conditions.")}
  `;

  const text = textBlock([
    "Here is the India GCC cost estimate you generated on neointelli.com.",
    "",
    setup.length ? `Setup: ${setup.join(" | ")}` : undefined,
    has(d.roles) ? `Team: ${d.roles}` : undefined,
    has(d.specializations) ? `Focus areas: ${d.specializations}` : undefined,
    "",
    `Estimated monthly cost: ${monthly}`,
    `Estimated annual cost: ${annual}`,
    `Equivalent US cost: ${usEquiv}`,
    `Annual savings: ${savings}${savingsPct}`,
    rows.length ? "" : undefined,
    rows.length ? "Cost breakdown (monthly / annual):" : undefined,
    ...rows.map(([label, m, a]) => `  ${label}: ${m} / ${a}`),
    "",
    "Estimates are based on market data and NeoIntelli's experience building GCCs across India.",
  ]);

  return {
    subject: `Your India GCC cost estimate: ${monthly} per month`,
    html: shell(
      "Your India GCC cost estimate",
      "Here is the estimate you just generated, with the full breakdown so you can forward it straight to finance.",
      inner,
      name,
    ),
    text,
  };
}

/* ------------------------------------------------------------------ ROI model */

function buildRoi(d: ToolEmailRequest["data"], name?: string): BuiltEmail {
  const horizon = has(d.horizon) ? String(d.horizon) : "5";
  const breakEven =
    has(d.breakEvenMonth) && Number(d.breakEvenMonth) > 0 ? `Month ${d.breakEvenMonth}` : "Immediate";
  const rows: Array<[string, string]> = [
    ["Year 1 savings", money(d.year1Savings)],
    [`Total ${horizon}-year savings`, money(d.totalSavings)],
    ["Break-even", breakEven],
    ["ROI", has(d.roiPct) ? `${d.roiPct}%` : "-"],
  ];

  const setup = [
    has(d.teamSize) ? `Team of ${d.teamSize}` : null,
    has(d.location) ? String(d.location) : null,
    has(d.role) ? `${d.role} focus` : null,
    `${horizon}-year horizon`,
  ].filter(Boolean) as string[];

  const inner = `
    <p style="margin:0 0 20px;font-size:14px;color:${MUTED};">Your scenario: <span style="color:${INK};font-weight:600;">${escapeHtml(setup.join(" · "))}</span></p>
    ${highlights(rows)}
    ${note("Directional estimates based on market data. A 30-minute call gets you a tailored model with role-by-role costs, a ramp plan and governance design.")}
  `;

  return {
    subject: `Your India GCC ROI model: ${money(d.year1Savings)} in year 1`,
    html: shell(
      "Your India GCC ROI model",
      "Here is the ROI snapshot you just generated, plus the assumptions behind it.",
      inner,
      name,
    ),
    text: textBlock([
      "Here is the India GCC ROI model you generated on neointelli.com.",
      "",
      `Scenario: ${setup.join(" | ")}`,
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
    ]),
  };
}

/* ----------------------------------------------------------- readiness report */

const READINESS_TIERS: Record<string, { label: string; color: string; advice: string }> = {
  high: {
    label: "HIGH",
    color: "#16a34a",
    advice:
      "Your company is well positioned for a GCC. The next step is a discovery call to design your operating model and 90-day launch plan.",
  },
  medium: {
    label: "MODERATE",
    color: "#d97706",
    advice:
      "A GCC could work for you with a few considerations. A feasibility assessment will map the risks and the right entry model.",
  },
  low: {
    label: "EARLY STAGE",
    color: BRAND,
    advice:
      "A GCC may be premature today but is worth revisiting in 6-12 months. In the meantime our resources can help you build the foundation.",
  },
};

function buildReadiness(d: ToolEmailRequest["data"], name?: string): BuiltEmail {
  const tier = READINESS_TIERS[String(d.tier ?? "medium")] ?? READINESS_TIERS.medium;

  const inner = `
    <div style="text-align:center;margin:0 0 24px;padding:24px;background:${WASH};border-radius:12px;">
      <div style="font-size:11px;color:${MUTED};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Your readiness</div>
      <div style="font-size:28px;font-weight:700;color:${tier.color};">${tier.label}</div>
      ${has(d.score) ? `<div style="font-size:13px;color:${MUTED};margin-top:8px;">Score: ${escapeHtml(d.score)} / 40</div>` : ""}
    </div>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${BODY};">${escapeHtml(tier.advice)}</p>
    ${has(d.industry) ? `<p style="margin:0;font-size:14px;color:${MUTED};">Industry: <span style="color:${INK};font-weight:600;">${escapeHtml(d.industry)}</span></p>` : ""}
  `;

  return {
    subject: `Your GCC readiness: ${tier.label}`,
    html: shell(
      "Your GCC readiness report",
      "Here is the readiness result you just generated, and what we suggest doing next.",
      inner,
      name,
    ),
    text: textBlock([
      "Here is the GCC readiness report you generated on neointelli.com.",
      "",
      `Readiness: ${tier.label}`,
      has(d.score) ? `Score: ${d.score} / 40` : undefined,
      has(d.industry) ? `Industry: ${d.industry}` : undefined,
      "",
      tier.advice,
    ]),
  };
}

const BUILDERS: Record<ToolKind, (data: ToolEmailRequest["data"], name?: string) => BuiltEmail> = {
  cost: buildCost,
  roi: buildRoi,
  readiness: buildReadiness,
};

export const TOOL_KINDS = Object.keys(BUILDERS) as ToolKind[];

export function isToolKind(value: unknown): value is ToolKind {
  return typeof value === "string" && (TOOL_KINDS as string[]).includes(value);
}

export function isEmailAddress(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function buildToolEmail(request: ToolEmailRequest): BuiltEmail {
  const built = BUILDERS[request.tool]({ ...request.data }, request.name);
  // The HTML greeting lives in the shell; the plain-text part needs its own.
  const hello = greeting(request.name).replace(/<[^>]*>/g, "");
  return { ...built, text: `${hello}\n\n${built.text}` };
}
