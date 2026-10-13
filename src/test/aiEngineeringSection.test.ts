import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  AI_ENGINEERING_CHILD_PAGES,
  AI_ENGINEERING_HUB_PATH,
  AI_ENGINEERING_PAGES,
  AI_ENGINEERING_PATHS,
} from "@/data/aiEngineering";
import { AI_ENGINEERING_SOURCES } from "@/data/aiEngineeringSources";
import { aiEngineeringBookingUrl, aiEngineeringContactUrl, readAiEngineeringLeadParams } from "@/lib/aiEngineeringCta";
import { PRERENDER_ROUTES, ROUTE_SEO, buildBreadcrumbItems, buildServiceSchema, buildFaqSchema, getOgImage, isIndexablePath } from "@/lib/seo";
import { pageMeta } from "@/lib/pageMeta";
import { isValidRoute } from "@/App";
import { megaMenu } from "@/components/layout/megaMenu";
import { SERVICE_PILLARS, FOOTER_SERVICE_COLUMNS } from "@/data/serviceNav";

const root = resolve(__dirname, "../..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

const RETIRED_TECHNOLOGY_ROUTES: Record<string, string> = {
  "/services/technology": AI_ENGINEERING_HUB_PATH,
  "/services/technology/data-platform": `${AI_ENGINEERING_HUB_PATH}/data-engineering`,
  "/services/technology/process-automation": `${AI_ENGINEERING_HUB_PATH}/ai-agents-automation`,
  "/services/technology/product-engineering": `${AI_ENGINEERING_HUB_PATH}/ai-product-engineering`,
  "/services/technology/integration-programs": AI_ENGINEERING_HUB_PATH,
};

const SECTION_SOURCES = [
  "src/pages/services/AIEngineering.tsx",
  "src/pages/services/ai-engineering/GenerativeAgenticAI.tsx",
  "src/pages/services/ai-engineering/AppliedAIML.tsx",
  "src/pages/services/ai-engineering/DataEngineering.tsx",
  "src/pages/services/ai-engineering/AIProductEngineering.tsx",
  "src/pages/services/ai-engineering/AIAgentsAutomation.tsx",
  "src/pages/services/ai-engineering/MLOpsLLMOpsAgentOps.tsx",
  "src/pages/services/ai-engineering/AIEvaluationAssurance.tsx",
  "src/data/aiEngineering.ts",
  "src/data/aiEngineeringSources.ts",
];

const words = (text: string) => text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;

describe("AI Engineering section registry", () => {
  it("defines the hub and the seven agreed child routes", () => {
    expect(AI_ENGINEERING_PATHS).toEqual([
      "/services/ai-engineering",
      "/services/ai-engineering/generative-agentic-ai",
      "/services/ai-engineering/applied-ai-ml",
      "/services/ai-engineering/data-engineering",
      "/services/ai-engineering/ai-product-engineering",
      "/services/ai-engineering/ai-agents-automation",
      "/services/ai-engineering/mlops-llmops-agentops",
      "/services/ai-engineering/ai-evaluation-assurance",
    ]);
    expect(AI_ENGINEERING_CHILD_PAGES).toHaveLength(7);
  });

  it("gives every page a unique H1, title, description and CTA", () => {
    for (const field of ["h1", "seoTitle", "metaDescription", "ctaLabel", "serviceInterest", "path"] as const) {
      const values = AI_ENGINEERING_PAGES.map((page) => page[field]);
      expect(new Set(values).size, field).toBe(values.length);
    }
    for (const page of AI_ENGINEERING_PAGES) {
      expect(page.seoTitle).toMatch(/\| NeoIntelli$/);
      expect(page.metaDescription.length).toBeLessThanOrEqual(170);
      expect(["Contact Us", "Learn More", "Get Started"]).not.toContain(page.ctaLabel);
    }
  });

  it("uses the agreed H1 and title map", () => {
    const byPath = Object.fromEntries(AI_ENGINEERING_PAGES.map((page) => [page.path, page]));
    expect(byPath["/services/ai-engineering"].h1).toBe("Build AI that works in production.");
    expect(byPath["/services/ai-engineering"].seoTitle).toBe("AI Engineering Services India | GenAI, ML, Data | NeoIntelli");
    expect(byPath["/services/ai-engineering/generative-agentic-ai"].h1).toBe("Build Generative & Agentic AI for real enterprise workflows.");
    expect(byPath["/services/ai-engineering/applied-ai-ml"].h1).toBe("Applied AI & Machine Learning for business decisions.");
    expect(byPath["/services/ai-engineering/data-engineering"].h1).toBe("Build the data foundation your AI can trust.");
    expect(byPath["/services/ai-engineering/ai-product-engineering"].h1).toBe("Build AI into the product, not beside it.");
    expect(byPath["/services/ai-engineering/ai-agents-automation"].h1).toBe("Turn business workflows into agent-enabled systems.");
    expect(byPath["/services/ai-engineering/mlops-llmops-agentops"].h1).toBe("Operate models, LLM applications and agents in production.");
    expect(byPath["/services/ai-engineering/ai-evaluation-assurance"].h1).toBe("Know whether your AI actually works.");
  });
});

describe("AI Engineering SEO wiring", () => {
  it("is indexable, prerendered and in the sitemap source with the registry titles", () => {
    for (const page of AI_ENGINEERING_PAGES) {
      const route = ROUTE_SEO.find((entry) => entry.path === page.path);
      expect(route, page.path).toBeDefined();
      expect(route!.title).toBe(page.seoTitle);
      expect(route!.description).toBe(page.metaDescription);
      expect(route!.canonical).toBeUndefined();
      expect(isIndexablePath(page.path)).toBe(true);
      expect(PRERENDER_ROUTES).toContain(page.path);
    }
  });

  it("has removed the retired Technology routes from every canonical source", () => {
    for (const route of Object.keys(RETIRED_TECHNOLOGY_ROUTES)) {
      expect(ROUTE_SEO.find((entry) => entry.path === route), route).toBeUndefined();
      expect(PRERENDER_ROUTES).not.toContain(route);
      expect(isIndexablePath(route)).toBe(false);
      expect(isValidRoute(route)).toBe(false);
      expect(pageMeta[route]).toBeUndefined();
    }
  });

  it("routes every page through the app loader map", () => {
    for (const path of AI_ENGINEERING_PATHS) expect(isValidRoute(path), path).toBe(true);
  });

  it("has short breadcrumb names and a Home > Services > AI Engineering > Page trail", () => {
    for (const page of AI_ENGINEERING_PAGES) {
      const meta = pageMeta[page.path];
      expect(meta, page.path).toBeDefined();
      expect(meta.title.length).toBeLessThanOrEqual(32);
      expect(meta.title).not.toContain("|");
    }
    // "/services" redirects to a pillar, so it is not emitted as a crumb.
    const trail = buildBreadcrumbItems("/services/ai-engineering/ai-evaluation-assurance").map((item) => item.name);
    expect(trail).toEqual(["Home", "AI Engineering", "AI Evaluation & Assurance"]);
  });

  it("emits one Service entity per page that references the shared Organization", () => {
    const hub = buildServiceSchema(AI_ENGINEERING_HUB_PATH) as Record<string, unknown>;
    expect(hub["@type"]).toBe("Service");
    expect(hub.provider).toEqual({ "@id": "https://neointelli.com/#organization" });
    const catalog = hub.hasOfferCatalog as { itemListElement: unknown[] };
    expect(catalog.itemListElement).toHaveLength(7);
    for (const page of AI_ENGINEERING_CHILD_PAGES) {
      const schema = buildServiceSchema(page.path) as Record<string, unknown>;
      expect(schema["@type"], page.path).toBe("Service");
      expect(schema["@id"]).toBe(`https://neointelli.com${page.path}#service`);
    }
  });

  it("does not emit FAQPage markup for company-authored questions", () => {
    for (const path of AI_ENGINEERING_PATHS) expect(buildFaqSchema(path)).toBeNull();
  });

  it("uses the section social image", () => {
    for (const path of AI_ENGINEERING_PATHS) {
      expect(getOgImage(path).url).toBe("https://neointelli.com/images/og/og-ai-engineering.webp");
    }
    expect(() => read("public/images/og/og-ai-engineering.webp")).not.toThrow();
  });
});

describe("Technology to AI Engineering migration", () => {
  it("301-redirects every retired route directly to a final canonical URL", async () => {
    const config = (await import("../../next.config.mjs")).default as { redirects: () => Promise<Array<{ source: string; destination: string; statusCode?: number; permanent?: boolean }>> };
    const redirects = await config.redirects();
    const sources = new Set(redirects.map((rule) => rule.source));
    for (const [source, destination] of Object.entries(RETIRED_TECHNOLOGY_ROUTES)) {
      const rule = redirects.find((entry) => entry.source === source);
      expect(rule, source).toBeDefined();
      expect(rule!.destination).toBe(destination);
      expect(rule!.statusCode).toBe(301);
      expect(sources.has(destination), `${source} must not chain`).toBe(false);
      expect(isIndexablePath(destination)).toBe(true);
    }
    // The older /services/development alias used to chain through /services/technology.
    const legacy = redirects.find((entry) => entry.source === "/services/development");
    expect(legacy?.destination).toBe(AI_ENGINEERING_HUB_PATH);
    for (const rule of redirects) expect(sources.has(rule.destination), `${rule.source} chains`).toBe(false);
  });

  it("leaves no internal link pointing at a retired Technology URL", () => {
    const files = [
      "src/components/layout/megaMenu.ts",
      "src/components/layout/Footer.tsx",
      "src/components/home/ServicesGrid.tsx",
      "src/pages/Index.tsx",
      "public/llms.txt",
      "scripts/validate-seo.mjs",
    ];
    for (const file of files) expect(read(file), file).not.toMatch(/\/services\/technology(\/|"|'|\)|\s)/);
  });

  it("does not touch the AI GCC technical pages", () => {
    for (const path of ["/services/ai-gcc/generative-ai", "/services/ai-gcc/data-engineering", "/services/ai-gcc/mlops", "/services/ai-gcc/responsible-ai"]) {
      expect(isValidRoute(path)).toBe(true);
      expect(isIndexablePath(path)).toBe(true);
    }
  });
});

describe("AI Engineering navigation and llms.txt", () => {
  it("exposes the section in the Services navigation and the What We Do list", () => {
    // Navigation is generated from SERVICE_PILLARS, so assert against the
    // pillar rather than a hand-written column.
    const pillar = SERVICE_PILLARS.find((entry) => entry.name === "AI Engineering")!;
    expect(pillar.status).toBe("live");
    expect([pillar.href, ...pillar.links.map((link) => link.href)]).toEqual(AI_ENGINEERING_PATHS);
    for (const link of pillar.links) expect(link.status, link.href).toBe("live");

    // "Solutions" is a curated list of nine buyer entry points, so the full
    // sub-page list lives in the footer service columns and on the pillar
    // overview page. "What We Do" carries the pillar itself.
    const column = FOOTER_SERVICE_COLUMNS.find((col) => col.heading === "AI Engineering")!;
    expect(column.links.map((link) => link.href)).toEqual(AI_ENGINEERING_PATHS);
    expect(FOOTER_SERVICE_COLUMNS.map((col) => col.heading)).toEqual(expect.arrayContaining(["AI GCC", "AI Talent"]));
    const whatWeDo = megaMenu.find((item) => item.name === "What We Do")!;
    expect(whatWeDo.columns[0].links.some((link) => link.href === AI_ENGINEERING_HUB_PATH)).toBe(true);
  });

  it("lists every canonical page in llms.txt alongside the existing AI GCC and talent entries", () => {
    const llms = read("public/llms.txt");
    for (const path of AI_ENGINEERING_PATHS) expect(llms).toContain(`https://neointelli.com${path})`);
    expect(llms).toContain("https://neointelli.com/services/ai-gcc)");
    expect(llms).toContain("https://neointelli.com/services/ai-talent)");
  });
});

describe("AI Engineering content standards", () => {
  it("places a 50 to 100 word In brief on every child page", () => {
    for (const file of SECTION_SOURCES.filter((path) => path.includes("/ai-engineering/"))) {
      const match = read(file).match(/<InBrief>([\s\S]*?)<\/InBrief>/);
      expect(match, file).not.toBeNull();
      const count = words(match![1]);
      expect(count, `${file}: ${count} words`).toBeGreaterThanOrEqual(50);
      expect(count, `${file}: ${count} words`).toBeLessThanOrEqual(100);
    }
  });

  it("answers 'What is AI engineering?' in 50 to 80 words on the hub", () => {
    const hub = read("src/pages/services/AIEngineering.tsx");
    const section = hub.slice(hub.indexOf('title="What is AI engineering?"'));
    const paragraph = section.match(/<p className="text-primary text-lg md:text-xl leading-relaxed font-display mb-6">([\s\S]*?)<\/p>/);
    expect(paragraph).not.toBeNull();
    const count = words(paragraph![1]);
    expect(count).toBeGreaterThanOrEqual(50);
    expect(count).toBeLessThanOrEqual(80);
  });

  it("avoids em dashes, hype vocabulary and unsupported percentage claims", () => {
    const hype = /\b(revolutionary|world-class|game-changing|next-generation|best-in-class|cutting-edge|future-ready)\b/i;
    for (const file of SECTION_SOURCES) {
      const text = read(file);
      expect(text, `${file} contains an em dash`).not.toContain("—");
      expect(text, `${file} contains hype vocabulary`).not.toMatch(hype);
      expect(text, `${file} contains a percentage claim`).not.toMatch(/\d+\s?%/);
      expect(text, `${file} contains an Nx claim`).not.toMatch(/\b\d+x\b/i);
    }
  });

  it("cites every external reference with a publisher, title, year and URL", () => {
    for (const source of Object.values(AI_ENGINEERING_SOURCES)) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.publisher.length).toBeGreaterThan(0);
      expect(source.title.length).toBeGreaterThan(0);
      expect(source.year.length).toBeGreaterThan(0);
    }
  });
});

describe("AI Engineering lead context", () => {
  it("tags booking links with the AI conversation type and lead context", () => {
    const url = new URL(aiEngineeringBookingUrl({ sourcePage: "/services/ai-engineering", serviceInterest: "AI Engineering", ctaName: "Discuss My AI Use Case" }), "https://neointelli.com");
    expect(url.pathname).toBe("/book-a-call");
    expect(url.searchParams.get("type")).toBe("ai");
    expect(url.searchParams.get("placement")).toBe("hero");
    expect(url.searchParams.get("source_page")).toBe("/services/ai-engineering");
    expect(url.searchParams.get("service_interest")).toBe("AI Engineering");
    expect(url.searchParams.get("cta_name")).toBe("Discuss My AI Use Case");
  });

  it("pre-selects the contact topic and round-trips the lead parameters", () => {
    const url = new URL(aiEngineeringContactUrl({ sourcePage: "/x", serviceInterest: "AI Data Engineering", ctaName: "Send us the use case in writing" }), "https://neointelli.com");
    expect(url.pathname).toBe("/contact");
    expect(url.searchParams.get("topic")).toBe("Enterprise AI engineering");
    expect(readAiEngineeringLeadParams(url.search)).toEqual({
      source_page: "/x",
      service_interest: "AI Data Engineering",
      cta_name: "Send us the use case in writing",
    });
    expect(readAiEngineeringLeadParams("?source_page=" + "a".repeat(200))).toEqual({});
  });
});
