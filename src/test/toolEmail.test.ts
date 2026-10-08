import { describe, it, expect } from "vitest";
import {
  buildToolEmail,
  escapeHtml,
  isEmailAddress,
  isToolKind,
  money,
  moneyRange,
} from "@/lib/toolEmail";

/** What the cost calculator actually posts from its result page. */
const COST_DATA = {
  totalTeam: 10,
  roles: "1x AI/ML Engineers, 1x Data Engineers, 1x Backend Engineers",
  city: "Bengaluru",
  seniority: "Balanced",
  engagement: "Managed GCC",
  monthlyLow: 37683,
  monthlyHigh: 42950,
  annualLow: 452200,
  annualHigh: 515400,
  salaryLow: 395200,
  salaryHigh: 410400,
  infraLow: 24000,
  infraHigh: 42000,
  opsLow: 9000,
  opsHigh: 15000,
  partnerLow: 24000,
  partnerHigh: 48000,
  usEquivLow: 1356600,
  usEquivHigh: 1546200,
  savingsLow: 841200,
  savingsHigh: 1094000,
  savingsPctLow: 62,
  savingsPctHigh: 71,
};

describe("money formatting", () => {
  it("renders whole dollars with separators", () => {
    expect(money(37683.4)).toBe("$37,683");
  });

  it("falls back to a dash rather than printing NaN at a customer", () => {
    expect(money(undefined)).toBe("-");
    expect(money("not a number")).toBe("-");
    expect(moneyRange(undefined, undefined)).toBe("-");
  });

  it("collapses a flat range to one figure", () => {
    expect(moneyRange(1000, 1000)).toBe("$1,000");
    expect(moneyRange(1000, 2000)).toBe("$1,000 - $2,000");
  });
});

describe("cost estimate email", () => {
  const built = buildToolEmail({ tool: "cost", email: "cfo@acme.com", name: "Priya Rao", data: COST_DATA });

  it("puts the monthly figure in the subject", () => {
    expect(built.subject).toBe("Your India GCC cost estimate: $37,683 - $42,950 per month");
  });

  it("greets the recipient by first name in both parts", () => {
    expect(built.html).toContain("Hi Priya,");
    expect(built.text).toContain("Hi Priya,");
  });

  it("puts the white logo in the header", () => {
    expect(built.html).toContain("https://www.neointelli.com/images/neointelli-logo-white.png");
    expect(built.html).toContain('alt="NeoIntelli"');
  });

  it("carries every headline number", () => {
    for (const figure of ["$37,683", "$42,950", "$452,200", "$515,400", "$1,356,600", "$841,200"]) {
      expect(built.html).toContain(figure);
    }
    expect(built.html).toContain("62-71%");
  });

  it("includes the full cost breakdown, not just the total", () => {
    for (const row of ["Salaries &amp; benefits", "Office &amp; infrastructure", "Operations &amp; compliance", "GCC partner fee", "Total"]) {
      expect(built.html).toContain(row);
    }
    // Monthly column is derived from the annual figures.
    expect(built.html).toContain("$32,933");
  });

  it("lists the team and the setup", () => {
    expect(built.html).toContain("1x AI/ML Engineers");
    expect(built.html).toContain("10 people · Bengaluru · Balanced mix · Managed GCC");
  });

  it("ships a plain-text alternative carrying the same numbers", () => {
    expect(built.text).toContain("Estimated monthly cost: $37,683 - $42,950");
    expect(built.text).toContain("Salaries & benefits: $32,933 - $34,200 / $395,200 - $410,400");
    expect(built.text).not.toContain("<");
  });

  it("marks the message as automated and does not invite a reply", () => {
    expect(built.html).toContain("This is an automated email. Please do not reply.");
    expect(built.html).toContain("reachus@neointelli.com");
    expect(built.html).not.toContain("Reply to this email");
    expect(built.text).toContain("This is an automated email. Please do not reply.");
    expect(built.text).toContain("Questions: reachus@neointelli.com");
  });

  it("hides the partner fee row for a captive model that pays none", () => {
    const captive = buildToolEmail({
      tool: "cost",
      email: "cfo@acme.com",
      data: { ...COST_DATA, partnerLow: 0, partnerHigh: 0 },
    });
    expect(captive.html).not.toContain("GCC partner fee");
    expect(captive.html).toContain("Salaries &amp; benefits");
  });

  it("degrades to dashes rather than breaking on a partial payload", () => {
    const sparse = buildToolEmail({ tool: "cost", email: "cfo@acme.com", data: { totalTeam: 4 } });
    expect(sparse.html).toContain("4 people");
    expect(sparse.subject).toContain("-");
  });
});

describe("roi and readiness emails", () => {
  it("summarises the ROI model", () => {
    const built = buildToolEmail({
      tool: "roi",
      email: "cto@acme.com",
      data: { teamSize: 20, location: "Bengaluru", role: "Backend", horizon: 5, year1Savings: 1200000, totalSavings: 7000000, roiPct: 240, breakEvenMonth: 7 },
    });
    expect(built.subject).toContain("$1,200,000");
    expect(built.html).toContain("Total 5-year savings");
    expect(built.html).toContain("Month 7");
  });

  it("reports an immediate break-even instead of 'Month 0'", () => {
    const built = buildToolEmail({ tool: "roi", email: "a@b.com", data: { breakEvenMonth: 0 } });
    expect(built.html).toContain("Immediate");
  });

  it("renders the readiness tier and falls back to moderate on junk", () => {
    expect(buildToolEmail({ tool: "readiness", email: "a@b.com", data: { tier: "high", score: 32 } }).subject)
      .toBe("Your GCC readiness: HIGH");
    expect(buildToolEmail({ tool: "readiness", email: "a@b.com", data: { tier: "banana" } }).html)
      .toContain("MODERATE");
  });
});

describe("input handling", () => {
  it("escapes anything a visitor typed", () => {
    const built = buildToolEmail({
      tool: "readiness",
      email: "a@b.com",
      name: "<script>alert(1)</script>",
      data: { tier: "high", industry: "<img src=x onerror=alert(1)>" },
    });
    expect(built.html).not.toContain("<script>");
    expect(built.html).not.toContain("<img src=x");
    expect(escapeHtml("<b>&</b>")).toBe("&lt;b&gt;&amp;&lt;/b&gt;");
  });

  it("recognises the tools it can send for", () => {
    expect(isToolKind("cost")).toBe(true);
    expect(isToolKind("newsletter")).toBe(false);
  });

  it("validates recipient addresses", () => {
    expect(isEmailAddress("someone@company.com")).toBe(true);
    expect(isEmailAddress("someone@company")).toBe(false);
    expect(isEmailAddress("")).toBe(false);
    expect(isEmailAddress(undefined)).toBe(false);
  });
});
