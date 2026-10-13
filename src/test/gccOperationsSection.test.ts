import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { ROUTE_SEO, PRERENDER_ROUTES, SITE_URL, buildBreadcrumbItems, buildFaqSchema, buildServiceSchema, isIndexablePath } from "@/lib/seo";
import { pageMeta } from "@/lib/pageMeta";
import { megaMenu } from "@/components/layout/megaMenu";
import { FOOTER_SERVICE_COLUMNS } from "@/data/serviceNav";
import {
  GCC_OPERATIONS_BASE,
  GCC_OPERATIONS_PAGES,
  GCC_OPERATIONS_REDIRECTS,
  gccOperationsFaqs,
} from "@/data/gccOperationsContent";
import nextConfig from "../../next.config.mjs";

const root = path.resolve(__dirname, "..", "..");
const readText = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

/** Final title and H1 map for the section, as specified for the pillar. */
const EXPECTED: Record<string, { title: string; h1: string }> = {
  "/services/gcc-operations": { title: "GCC Operations & Managed Services India | NeoIntelli", h1: "Run and scale your GCC in India." },
  "/services/gcc-operations/people-hr-operations": { title: "GCC HR & People Operations India | NeoIntelli", h1: "Run the employee lifecycle without building every local HR function yourself." },
  "/services/gcc-operations/workforce-strategy": { title: "GCC Workforce Strategy & Talent Management | NeoIntelli", h1: "Build the workforce model your GCC needs to scale." },
  "/services/gcc-operations/workplace-it-security": { title: "GCC Workplace, IT & Security Services India | NeoIntelli", h1: "Give every GCC employee a secure, enterprise-ready workplace." },
  "/services/gcc-operations/service-management-performance": { title: "GCC Service Management & Performance India | NeoIntelli", h1: "Run the GCC on outcomes, not activity." },
  "/services/gcc-operations/governance-compliance": { title: "GCC Governance & Compliance Services India | NeoIntelli", h1: "Keep control, risk and decision rights visible as the GCC scales." },
  "/services/gcc-operations/bot-transition": { title: "GCC Build-Operate-Transfer India | BOT Services | NeoIntelli", h1: "Move from partner-operated to client-owned without rebuilding the center." },
  "/services/gcc-operations/scale-expansion": { title: "Scale & Expand Your GCC in India | NeoIntelli", h1: "Expand the GCC without losing operating discipline." },
};

const LEGACY = GCC_OPERATIONS_REDIRECTS.map((r) => r.from);

const walk = (dir: string, out: string[] = []): string[] => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|mjs|txt)$/.test(entry.name)) out.push(full);
  }
  return out;
};

describe("GCC Operations section: pages", () => {
  it("defines exactly the eight canonical pages under /services/gcc-operations", () => {
    const paths = GCC_OPERATIONS_PAGES.map((p) => p.path);
    expect(paths).toEqual(Object.keys(EXPECTED));
    expect(paths.every((p) => p === GCC_OPERATIONS_BASE || p.startsWith(`${GCC_OPERATIONS_BASE}/`))).toBe(true);
  });

  it("carries the final title and H1 map and a non-empty meta description", () => {
    for (const page of GCC_OPERATIONS_PAGES) {
      expect(page.title).toBe(EXPECTED[page.path].title);
      expect(page.h1).toBe(EXPECTED[page.path].h1);
      expect(page.description.length).toBeGreaterThan(80);
      expect(page.description.length).toBeLessThanOrEqual(175);
    }
  });

  it("is registered in ROUTE_SEO, PRERENDER_ROUTES, pageMeta, the route table and the pages directory", () => {
    const app = readText("src/App.tsx");
    for (const page of GCC_OPERATIONS_PAGES) {
      const seo = ROUTE_SEO.find((r) => r.path === page.path);
      expect(seo?.title).toBe(page.title);
      expect(seo?.description).toBe(page.description);
      expect(PRERENDER_ROUTES).toContain(page.path);
      expect(isIndexablePath(page.path)).toBe(true);
      expect(pageMeta[page.path]?.title).toBe(page.shortName);
      expect(page.shortName.length).toBeLessThanOrEqual(32);
      expect(page.shortName).not.toContain("|");
      expect(app).toContain(`"${page.path}":`);
      const wrapper = page.path === GCC_OPERATIONS_BASE ? "pages/services/gcc-operations.tsx" : `pages${page.path}.tsx`;
      expect(fs.existsSync(path.join(root, wrapper))).toBe(true);
    }
  });

  it("has unique titles and H1s across the section and the rest of the site", () => {
    const titles = ROUTE_SEO.map((r) => r.title);
    expect(new Set(titles).size).toBe(titles.length);
    const h1s = GCC_OPERATIONS_PAGES.map((p) => p.h1);
    expect(new Set(h1s).size).toBe(h1s.length);
  });

  it("builds visible breadcrumbs that match the specified hierarchy", () => {
    // /services has no page of its own, so it is not a crumb: buildBreadcrumbItems
    // omits non-indexable intermediate segments sitewide.
    expect(buildBreadcrumbItems(GCC_OPERATIONS_BASE).map((c) => c.name)).toEqual(["Home", "GCC Operations"]);
    expect(buildBreadcrumbItems(`${GCC_OPERATIONS_BASE}/people-hr-operations`).map((c) => c.name)).toEqual(["Home", "GCC Operations", "People & HR Operations"]);
    expect(buildBreadcrumbItems(`${GCC_OPERATIONS_BASE}/bot-transition`).map((c) => c.name)).toEqual(["Home", "GCC Operations", "BOT & Transition"]);
  });

  it("emits a Service entity for every page that references the single Organization entity", () => {
    for (const page of GCC_OPERATIONS_PAGES) {
      const schema = buildServiceSchema(page.path) as Record<string, unknown> | null;
      expect(schema).not.toBeNull();
      expect(schema?.["@type"]).toBe("Service");
      expect(schema?.provider).toEqual({ "@id": `${SITE_URL}/#organization` });
      expect(schema?.url).toBe(`${SITE_URL}${page.path}`);
    }
    const parent = buildServiceSchema(GCC_OPERATIONS_BASE) as { hasOfferCatalog: { itemListElement: unknown[] } };
    expect(parent.hasOfferCatalog.itemListElement).toHaveLength(7);
  });

  it("emits FAQPage schema only from the question-and-answer content rendered on each page", () => {
    for (const page of GCC_OPERATIONS_PAGES) {
      const faqs = gccOperationsFaqs[page.path];
      expect(faqs.length).toBeGreaterThanOrEqual(8);
      const schema = buildFaqSchema(page.path) as { mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }> };
      expect(schema.mainEntity.map((q) => q.name)).toEqual(faqs.map((f) => f.q));
      expect(schema.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(faqs.map((f) => f.a));
      for (const faq of faqs) {
        // Answer-first: every answer is a substantive statement (a short "Yes." or "No." opener is fine) rather than a label.
        expect(faq.a.length).toBeGreaterThan(120);
        expect(/^[A-Z]/.test(faq.a)).toBe(true);
      }
    }
  });

  it("uses standard punctuation in all section copy (no em dashes) and no banned adjectives", () => {
    const files = [
      "src/data/gccOperationsContent.ts",
      ...walk(path.join(root, "src/pages/services/gcc-operations")).map((f) => path.relative(root, f)),
      ...walk(path.join(root, "src/components/gcc-operations")).map((f) => path.relative(root, f)),
    ];
    const banned = /\b(world-class|cutting-edge|revolutionary|best-in-class|future-ready|industry-leading)\b/i;
    for (const file of files) {
      const text = readText(file);
      expect(text, `${file} contains an em dash`).not.toContain("—");
      expect(banned.test(text), `${file} contains a banned adjective`).toBe(false);
    }
  });

  it("appears in the global navigation and the section sub-navigation source", () => {
    // The pillar itself is in "What We Do"; every sub-page is in the footer
    // service columns. "Solutions" carries nine curated entry points instead of
    // the service taxonomy, so it is not the surface to assert against here.
    const whatWeDo = megaMenu.find((item) => item.name === "What We Do");
    const overviews = whatWeDo?.columns.flatMap((c) => c.links.map((l) => l.href)) ?? [];
    expect(overviews).toContain(GCC_OPERATIONS_BASE);

    const column = FOOTER_SERVICE_COLUMNS.find((c) => c.heading === "GCC Operations");
    expect(column?.links.map((l) => l.href)).toEqual(GCC_OPERATIONS_PAGES.map((p) => p.path));
  });
});

describe("GCC Operations section: legacy route migration", () => {
  it("removes the legacy routes from the SEO registry, prerender list, page meta and route table", () => {
    const app = readText("src/App.tsx");
    for (const legacy of LEGACY) {
      expect(ROUTE_SEO.find((r) => r.path === legacy)).toBeUndefined();
      expect(PRERENDER_ROUTES as readonly string[]).not.toContain(legacy);
      expect(pageMeta[legacy]).toBeUndefined();
      expect(app).not.toContain(`"${legacy}":`);
      expect(fs.existsSync(path.join(root, `pages${legacy}.tsx`))).toBe(false);
    }
  });

  it("redirects every legacy route permanently, directly and in a single hop", async () => {
    const redirects: Array<{ source: string; destination: string; permanent?: boolean; statusCode?: number }> = await nextConfig.redirects();
    const sources = new Set(redirects.map((r) => r.source));
    for (const { from, to } of GCC_OPERATIONS_REDIRECTS) {
      for (const source of [from, `${from}/`]) {
        const rule = redirects.find((r) => r.source === source);
        expect(rule, `missing redirect for ${source}`).toBeDefined();
        expect(rule?.destination).toBe(to);
        // The brief asks for 301 specifically; Next emits 308 for permanent:true.
        expect(rule?.statusCode).toBe(301);
        expect(rule?.permanent).toBeUndefined();
      }
      expect(ROUTE_SEO.find((r) => r.path === to), `${to} must be a canonical page`).toBeDefined();
    }
    // No chains anywhere in the config: a destination must never itself be a redirect source.
    for (const rule of redirects) {
      const dest = rule.destination.split("?")[0];
      expect(sources.has(dest), `${rule.source} -> ${dest} would chain`).toBe(false);
      expect(sources.has(`${dest}/`), `${rule.source} -> ${dest}/ would chain`).toBe(false);
    }
  });

  it("leaves no internal links to the legacy routes in app code, blog content, llms.txt or the footer", () => {
    const files = [
      ...walk(path.join(root, "src")),
      ...walk(path.join(root, "pages")),
      path.join(root, "public/llms.txt"),
    ].filter((f) => !f.endsWith("gccOperationsContent.ts") && !f.endsWith("gccOperationsSection.test.ts"));
    for (const file of files) {
      const text = fs.readFileSync(file, "utf8");
      for (const legacy of LEGACY) {
        expect(text.includes(`${legacy}"`) || text.includes(`${legacy}'`) || text.includes(`${legacy})`), `${path.relative(root, file)} still links to ${legacy}`).toBe(false);
      }
    }
  });

  it("keeps the GCC setup, AI GCC, Micro GCC and tool pages in place", () => {
    for (const keep of ["/services/gcc", "/services/gcc/setup-launch", "/services/ai-gcc", "/services/micro-gcc", "/gcc-cost-calculator", "/gcc-roi-estimator", "/gcc-readiness-assessment", "/gcc-faq", "/gcc-india-cost", "/gcc-as-a-service"]) {
      expect(ROUTE_SEO.find((r) => r.path === keep), `${keep} must remain canonical`).toBeDefined();
    }
  });

  it("styles Center Archetypes cards with AI acceleration icon colors and navy blue hover states", () => {
    const text = readText("src/pages/services/gcc-operations/GccOperations.tsx");
    // Default icon style matching AI acceleration
    expect(text).toContain("bg-[#EDF3FB] border border-[#C5D7EE] text-[#008EC4]");
    // Navy blue hover overlay
    expect(text).toContain("bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E]");
    // Guaranteed white text on hover
    expect(text).toContain("isHovered ? \"!text-white\" : \"text-[#0D306C] group-hover:!text-white\"");
  });

  it("renders slotted 'half-dug' step numbers styled after Operational Reality in How the engagement runs and related sections", () => {
    const peopleText = readText("src/pages/services/gcc-operations/PeopleHrOperations.tsx");
    expect(peopleText).toContain("<SlottedStepNumber index={index} />");

    const componentText = readText("src/components/gcc-operations/SlottedStepNumber.tsx");
    // Matches Operational Reality cyan outlined number style
    expect(componentText).toContain("#008EC4");
    expect(componentText).toContain("WebkitTextStroke");
    expect(componentText).toContain("font-mono");
    // Clean slit line without radial shadow
    expect(componentText).not.toContain("radial-gradient");
  });

  it("styles How AI changes the workforce plan with centered header and center archetypes card layout (1 & 3 big, 2 small)", () => {
    const text = readText("src/pages/services/gcc-operations/WorkforceStrategy.tsx");
    // Centered section header
    expect(text).toContain('id="ai-and-the-workforce"');
    expect(text).toContain('align="center"');
    // Staggered layout: 1 and 3 big, 2 small, bottom aligned
    expect(text).toContain("grid-cols-1 md:grid-cols-3 items-end");
    // Center archetypes hover gradient and white text styling
    expect(text).toContain("bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E]");
    expect(text).toContain('isHovered ? "!text-white" : "text-[#0D306C] group-hover:!text-white"');
  });

  it("styles Workplace and IT Scope section with left heading, arrow bullet points, and right matching artwork", () => {
    const text = readText("src/pages/services/gcc-operations/WorkplaceItSecurity.tsx");
    // Scope section with capabilities id
    expect(text).toContain('id="capabilities"');
    expect(text).toContain('eyebrow="SCOPE"');
    // 3-column responsive grid
    expect(text).toContain("grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
    // Right artwork generated images
    expect(text).toContain("/images/gcc-operations/scope-workspace.webp");
    expect(text).toContain("/images/gcc-operations/scope-devices.webp");
    expect(text).toContain("/images/gcc-operations/scope-identity.webp");
    // Arrow bullet points
    expect(text).toContain("group.items.map");
    // Out of scope card
    expect(text).toContain("Deliberately not on this page");
    expect(text).toContain("PILLAR_LINKS.aiEngineering");
    expect(text).toContain("PILLAR_LINKS.aiGcc");
  });
});

