import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import {
  AI_GCC_LIFECYCLE,
  GCC_STARTING_POINTS,
  GCC_TOOLKIT,
  HOME_FAQS,
  HOME_INDUSTRIES,
  PROMOTED_OFFERS,
  SERVICE_PILLAR_SECTIONS,
  WHY_CAPABILITIES,
} from "@/data/homepage";
import { SERVICE_PILLARS } from "@/data/serviceNav";
import { getRouteSeo, buildFaqSchema, buildWebPageSchema, SITE_URL } from "@/lib/seo";
import { isValidRoute } from "@/App";

/**
 * The homepage is positioned around one category, AI GCC, and is the primary
 * distribution node into the six service pillars. These tests lock the parts
 * that are easy to regress: the section order, the destinations, the single
 * H1, and the claim governance that keeps unevidenced numbers off the page.
 */

const read = (path: string) => readFileSync(path, "utf8");

/**
 * Comments are stripped before any content assertion runs. The policy notes in
 * these files quote the very claims and taxonomy the assertions forbid, and a
 * note explaining why something was removed must not read as the thing itself.
 */
const stripComments = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/** Everything that renders on the homepage, including any stale file left behind. */
const HOME_FILES = [
  "src/pages/Index.tsx",
  "src/data/homepage.ts",
  ...readdirSync("src/components/home")
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => `src/components/home/${file}`),
];

const allHomeSource = () => HOME_FILES.map((file) => stripComments(read(file))).join("\n");

const allHrefs = () => [
  ...PROMOTED_OFFERS.map((o) => o.href),
  ...AI_GCC_LIFECYCLE.map((s) => s.href).filter(Boolean) as string[],
  ...SERVICE_PILLAR_SECTIONS.flatMap((p) => [
    p.href,
    p.secondary?.href,
    ...(p.aside.models?.map((m) => m.href) ?? []),
  ]).filter(Boolean) as string[],
  ...GCC_STARTING_POINTS.map((j) => j.href),
  ...WHY_CAPABILITIES.map((c) => c.href),
  ...GCC_TOOLKIT.map((t) => t.href),
  ...HOME_INDUSTRIES.map((i) => i.href),
];

describe("homepage information architecture", () => {
  it("renders the seventeen sections in the agreed order", () => {
    const index = read("src/pages/Index.tsx");
    const order = [
      "Hero",
      "NeoHireXMatrix",
      "GCCLifecycle",
      "GCCCapabilitiesMosaic",
      "GCCStartingPoint",
      "WhyNeoIntelliLifecycle",
      "DecisionTools",
      "EngagementModel",
      "Industries",
      "Insights",
      "FAQSection",
      "Consultation",
    ];
    const positions = order.map((name) => index.indexOf(`<${name} />`));
    expect(positions.every((p) => p > -1), "every section is rendered").toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("leads the pillar sections with AI GCC, then the five layers in lifecycle order", () => {
    expect(SERVICE_PILLAR_SECTIONS.map((p) => p.name)).toEqual([
      "AI GCC",
      "AI Talent",
      "AI Engineering",
      "AI Delivery Teams",
      "GCC Strategy & Setup",
      "GCC Operations",
    ]);
  });

  it("points each pillar section at the canonical pillar overview", () => {
    const canonical = SERVICE_PILLARS.map((pillar) => pillar.href);
    expect(SERVICE_PILLAR_SECTIONS.map((p) => p.href)).toEqual(canonical);
  });

  it("keeps the schema's pillar paths in step with the service taxonomy", () => {
    const schema = buildWebPageSchema("/") as { significantLink?: string[] };
    expect(schema.significantLink).toEqual(
      SERVICE_PILLARS.map((pillar) => `${SITE_URL}${pillar.href}`),
    );
  });

  it("promotes the three campaign destinations in a fixed order", () => {
    expect(PROMOTED_OFFERS.map((o) => o.href)).toEqual([
      "/services/micro-gcc",
      "/services/ai-talent",
      "/gcc-cost-calculator",
    ]);
  });

  it("offers exactly three starting points and three planning tools", () => {
    expect(GCC_STARTING_POINTS).toHaveLength(3);
    expect(GCC_TOOLKIT.map((t) => t.href)).toEqual([
      "/gcc-cost-calculator",
      "/gcc-roi-estimator",
      "/gcc-readiness-assessment",
    ]);
  });

  it("links only to routes that exist", () => {
    for (const href of allHrefs()) {
      expect(isValidRoute(href), href).toBe(true);
    }
  });

  it("declares one h1 across the whole page", () => {
    const h1s = allHomeSource().match(/<h1[\s>]/g) ?? [];
    expect(h1s).toHaveLength(1);
    expect(read("src/components/home/HomeHero.tsx")).toContain(
      "Build and scale your AI GCC in India.",
    );
  });
});

describe("homepage retired taxonomy", () => {
  // The old homepage sold "Specialist Talent Pods", "Recruitment & Staffing",
  // "GCC Setup & Advisory" and "Technology Foundation". Those categories were
  // replaced by the six pillars, not renamed, so none of them may come back.
  const RETIRED = [
    "Talent Pods",
    "Specialist Talent Pods",
    "Engineering Pod",
    "Architecture Pod",
    "Transformation Pod",
    "Recruitment & Staffing",
    "Technology Foundation",
    "Technology Solutions",
    "GCC Talent Management",
    "Operations Excellence",
    "GCC Setup & Advisory",
    "AI-First GCC",
    "Navigate Your Next",
  ];

  it("keeps retired category names off the homepage", () => {
    const source = allHomeSource().toLowerCase();
    for (const term of RETIRED) {
      expect(source, term).not.toContain(term.toLowerCase());
    }
  });

  it("keeps retired service URLs off the homepage", () => {
    const source = allHomeSource();
    for (const path of ["/services/technology", "/services/ai-data-recruitment", "/recruitment"]) {
      expect(source, path).not.toContain(`"${path}"`);
    }
  });
});

describe("homepage claim governance", () => {
  /**
   * Every figure and superlative the previous homepage carried was either
   * unevidenced or an operating target stated as fact. They are removed rather
   * than restated; add one back only with a source and a year, matching the
   * policy in src/data/gccMarketProof.ts.
   */
  const UNSUPPORTED = [
    "30+",
    "100% senior-led",
    "9-day",
    "9 days",
    "500+",
    "100+ years",
    "48h",
    "10 open",
    "market-leading",
    "world-class",
    "fastest",
    "the largest",
    "the best ",
  ];

  it("states no unevidenced number or superlative", () => {
    const source = allHomeSource();
    for (const claim of UNSUPPORTED) {
      expect(source.toLowerCase(), claim).not.toContain(claim.toLowerCase());
    }
  });
});

describe("homepage answer-first content", () => {
  it("publishes five to seven questions", () => {
    expect(HOME_FAQS.length).toBeGreaterThanOrEqual(5);
    expect(HOME_FAQS.length).toBeLessThanOrEqual(7);
  });

  it("answers each question in 50 to 90 words", () => {
    for (const faq of HOME_FAQS) {
      const words = faq.a.trim().split(/\s+/).length;
      expect(words, `${faq.q} (${words} words)`).toBeGreaterThanOrEqual(50);
      expect(words, `${faq.q} (${words} words)`).toBeLessThanOrEqual(90);
    }
  });

  it("defines the AI GCC entity the same way the AI GCC hub does", () => {
    const definition = SERVICE_PILLAR_SECTIONS[0].aside.body?.[0] ?? "";
    expect(definition).toContain(
      "a Global Capability Center designed around AI, data and engineering capability",
    );
    expect(HOME_FAQS[0].q).toBe("What is an AI GCC?");
    expect(HOME_FAQS[0].a).toContain(
      "a Global Capability Center designed around AI, data and engineering capability",
    );
  });

  it("mirrors the visible questions into the page's markup", () => {
    const schema = buildFaqSchema("/") as { mainEntity: { name: string }[] };
    expect(schema.mainEntity.map((entry) => entry.name)).toEqual(HOME_FAQS.map((f) => f.q));
  });
});

describe("homepage SEO contract", () => {
  // The homepage takes the "AI GCC Services India" title rather than "AI GCC in
  // India | Build, Operate & Scale", which is already the AI GCC hub's title.
  // Two pages sharing one title is worse than either wording.
  it("targets AI GCC in India", () => {
    const seo = getRouteSeo("/");
    expect(seo.title).toBe("AI GCC Services India | End-to-End GCC Partner | NeoIntelli");
    expect(seo.description).toBe(
      "Build and scale an AI GCC in India with NeoIntelli across GCC strategy, AI talent, AI engineering, delivery teams, setup and ongoing operations.",
    );
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description.length).toBeLessThanOrEqual(160);
    expect(seo.keywords?.[0]).toBe("AI GCC India");
  });

  it("uses descriptive anchors rather than a generic call to action", () => {
    const source = allHomeSource();
    for (const generic of [">Learn More<", ">Get Started<", ">Talk to Us<", ">Read More<"]) {
      expect(source, generic).not.toContain(generic);
    }
  });
});
