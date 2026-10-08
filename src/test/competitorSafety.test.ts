import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";

/**
 * Legal compliance guard for marketing copy.
 *
 * Naming a competitor while criticising their service is trademark dilution
 * under s.29(8) of the Indian Trade Marks Act and exposes NeoIntelli to an
 * ad-interim injunction that can take the whole domain offline. Comparative
 * performance claims ("40% faster than X") additionally require audited
 * third-party substantiation under Chapter IV of the ASCI code, which we do
 * not hold.
 *
 * The rule is therefore absolute and not a style preference: describe what
 * NeoIntelli does. Never name another company in copy, never characterise
 * how another firm performs, and never publish a claim benchmarked against
 * another firm.
 *
 * If a test here fails, rewrite the copy - do not add the new wording to an
 * allowlist. Government and regulatory publishers (HMRC, ICO, MeitY and the
 * like) are cited sources rather than companies and are deliberately not
 * covered. NeoIntelli's own LinkedIn profile links are likewise exempt and
 * live outside the directories scanned here.
 */

const SCAN_DIRS = [
  "src/pages",
  "src/data",
  "src/components",
  "src/lib",
  // Next.js route wrappers. They carry per-route titles and inline copy, so a
  // name can reach a <title> without ever touching src/.
  "pages",
].map((d) => resolve(__dirname, "../..", d));

/**
 * Shipped copy that is not a .ts/.tsx module. llms.txt in particular is a
 * plain-text summary of every service page and is served verbatim, so it is
 * exactly the kind of file a brand-monitoring crawler reads and a refactor
 * never touches.
 */
const EXTRA_FILES = [
  "index.html",
  "public/llms.txt",
  "public/robots.txt",
]
  .map((f) => resolve(__dirname, "../..", f))
  .filter(existsSync);

/**
 * Attribution URLs for cited third-party research.
 *
 * Linking a research publisher's own page is attribution, not comparative
 * advertising: s.29(8) bites on using a mark to take unfair advantage of or
 * to disparage another trader, and a verifiable source link does neither.
 * Stripping these before the name scan is what lets the scan run
 * case-insensitively and still catch a lowercase reference - a "quess.com"
 * or "randstad.in" buried in an href - anywhere in copy.
 *
 * Only exact citation URLs belong here. A company name in prose never does,
 * and neither does a staffing, RPO or search firm's URL.
 */
const CITATION_URLS = [
  "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
  "https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/",
];

const stripCitations = (text: string) =>
  CITATION_URLS.reduce((acc, url) => acc.split(url).join(""), text);

/** NeoIntelli's own social links are legitimate and live in these files. */
const EXEMPT_FILES = new Set([
  "leadership.ts", // NeoIntelli leader profile URLs
  "tracking.ts", // analytics event names for those profile links
  "analytics.ts", // Google Analytics / Ads integration
  "dataLayer.ts", // Google Ads measurement layer
  "calEmbed.ts", // Cal.com booking embed
  "competitorSafety.test.ts",
]);

/**
 * Staffing, RPO and executive-search firms, plus the research houses,
 * ATS vendors and job platforms previously named in copy.
 */
const COMPANY_NAMES = [
  "Quess", "First Meridian", "FirstMeridian", "Randstad", "TeamLease", "Team Lease",
  "ManpowerGroup", "Adecco", "Kelly Services", "Allegis", "Cielo", "Allsec",
  "Korn Ferry", "Heidrick", "Egon Zehnder", "Spencer Stuart", "EMA Partners",
  "ABC Consultants", "Xpheno", "Careernet", "Zyoin", "Teksands", "WSNE", "CIEL HR",
  "Greenhouse", "SmartRecruiters", "iCIMS", "Ashby", "Glassdoor", "Bullhorn",
  "Upwork", "Fiverr", "Toptal", "Andela", "Naukri", "Foundit", "Hirist",
  "Zinnov", "Nasscom", "NASSCOM", "Everest Group", "McKinsey", "QuantumBlack",
  "Gartner", "Forrester", "Deloitte", "HFS Research", "ANSR", "Aon Hewitt",
  "Forbes", "Fortune 500",
];

/** Phrases that characterise how another firm performs. */
const DISPARAGEMENT = [
  "patchy",
  "slow onboarding cycles",
  "weak candidate quality",
  "resume noise",
  "call-centre handoff",
  "call centre handoff",
  "call-centre coordinator",
  "not a call centre",
  "challenger to",
  "some agencies",
  "other agencies",
  "volume staffing firms",
  "hidden in one line",
  "black-box reporting",
  "monthly slides",
  "under-deposit",
];

/** Claims benchmarked against another firm rather than our own baseline. */
const RIVAL = "(?:contingency agenc|staffing agenc|database-led|blended contingency|volume staffing|traditional (?:staffing|agenc|firm)|other (?:agencies|firms|providers|vendors))";
const COMPARATIVE_CLAIM = new RegExp(
  [
    // "14 days vs 30", "60% vs 20%"
    String.raw`\b\d+\s*(?:%|x|days?|months?)\s*(?:vs\.?|versus)\s*\d+`,
    // "40% faster than a staffing agency", "cheaper than contingency agencies"
    String.raw`(?:faster|cheaper|lower|better|higher|quicker|stronger|leaner)\s+than\s+${RIVAL}`,
    // "30% savings compared to staffing agency spend"
    String.raw`\d+\s*%[^.\n]{0,40}(?:vs\.?|versus|compared to)\s+${RIVAL}`,
  ].join("|"),
  "i",
);

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...sourceFiles(full));
    } else if ([".ts", ".tsx"].includes(extname(entry)) && !EXEMPT_FILES.has(entry)) {
      out.push(full);
    }
  }
  return out;
}

const FILES = [...SCAN_DIRS.flatMap(sourceFiles), ...EXTRA_FILES];

/** Repo-relative path, so a failure names a file that exists. */
const ROOT = resolve(__dirname, "../..");
const label = (file: string) => file.slice(ROOT.length + 1);

describe("marketing copy carries no legal exposure from competitor references", () => {
  it("scans a non-trivial number of source files", () => {
    expect(FILES.length).toBeGreaterThan(50);
  });

  it("names no other company anywhere in page copy", () => {
    const hits: string[] = [];
    for (const file of FILES) {
      const text = stripCitations(readFileSync(file, "utf8"));
      for (const name of COMPANY_NAMES) {
        // Case-insensitive: a name hidden in a lowercase URL, a slug or a
        // React key is still the name, and still ships to the browser.
        if (new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)) {
          hits.push(`${label(file)} -> "${name}"`);
        }
      }
    }
    expect(hits, `Remove these company names from copy:\n${hits.join("\n")}`).toEqual([]);
  });

  it("makes no claim about how another firm performs", () => {
    const hits: string[] = [];
    for (const file of FILES) {
      const text = readFileSync(file, "utf8").toLowerCase();
      for (const phrase of DISPARAGEMENT) {
        if (text.includes(phrase)) hits.push(`${label(file)} -> "${phrase}"`);
      }
    }
    expect(hits, `Rewrite as what NeoIntelli does, not what others do badly:\n${hits.join("\n")}`).toEqual([]);
  });

  it("publishes no performance claim benchmarked against another firm", () => {
    const hits: string[] = [];
    for (const file of FILES) {
      for (const line of readFileSync(file, "utf8").split("\n")) {
        const match = line.match(COMPARATIVE_CLAIM);
        if (match) hits.push(`${label(file)} -> "${match[0].trim()}"`);
      }
    }
    expect(hits, `These need audited third-party substantiation under ASCI Chapter IV:\n${hits.join("\n")}`).toEqual([]);
  });
});
