import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { AI_GCC_PAGES, AI_GCC_PATHS, AI_GCC_CONTEXT_LINKS, OPERATING_ENGINES } from "@/data/aiGcc";
import { ROUTE_SEO, PRERENDER_ROUTES, buildBreadcrumbItems, buildServiceSchema, buildFaqSchema, isIndexablePath, getRouteSeo } from "@/lib/seo";
import { pageMeta } from "@/lib/pageMeta";
import { isValidRoute } from "@/App";
import { aiGccBookingUrl, readAiGccLeadParams } from "@/lib/aiGccCta";

/**
 * Locks the AI GCC section contract: every page is routed, indexable, in the
 * sitemap source, carries the agreed title and H1 map, and every internal
 * link the section emits resolves to a real route.
 */

const EXPECTED_TITLES: Record<string, string> = {
  "/services/ai-gcc": "AI GCC in India | Build, Operate & Scale | NeoIntelli",
  "/services/ai-gcc/ai-advisory-strategy": "AI Advisory for GCCs | Strategy & Value | NeoIntelli",
  "/services/ai-gcc/setup-operations": "AI GCC Setup & Operations in India | NeoIntelli",
  "/services/ai-gcc/generative-ai": "Generative & Agentic AI for GCCs | NeoIntelli",
  "/services/ai-gcc/data-engineering": "Data Engineering for AI GCCs | NeoIntelli",
  "/services/ai-gcc/mlops": "MLOps, LLMOps & AgentOps for GCCs | NeoIntelli",
  "/services/ai-gcc/responsible-ai": "Responsible AI Governance for GCCs | NeoIntelli",
  "/services/ai-gcc/ai-infrastructure-gpu": "AI Infrastructure & GPU for GCCs | NeoIntelli",
};

const EXPECTED_H1: Record<string, string> = {
  "/services/ai-gcc": "Build and operate your AI GCC in India.",
  "/services/ai-gcc/ai-advisory-strategy": "Define the AI GCC mandate before you build the center.",
  "/services/ai-gcc/setup-operations": "AI GCC setup and operations in India.",
  "/services/ai-gcc/generative-ai": "Generative & Agentic AI for GCCs.",
  "/services/ai-gcc/data-engineering": "Build the data foundation your AI GCC can reuse.",
  "/services/ai-gcc/mlops": "MLOps, LLMOps & AgentOps for GCCs.",
  "/services/ai-gcc/responsible-ai": "Govern AI systems and agents without slowing delivery.",
  "/services/ai-gcc/ai-infrastructure-gpu": "Build the compute layer behind your AI GCC.",
};

const PAGE_SOURCES: Record<string, string> = {
  "/services/ai-gcc": "src/pages/services/AISolutions.tsx",
  "/services/ai-gcc/ai-advisory-strategy": "src/pages/services/ai-gcc/AIAdvisoryStrategy.tsx",
  "/services/ai-gcc/setup-operations": "src/pages/services/ai-gcc/SetupOperations.tsx",
  "/services/ai-gcc/generative-ai": "src/pages/services/ai-gcc/GenerativeAI.tsx",
  "/services/ai-gcc/data-engineering": "src/pages/services/ai-gcc/DataEngineering.tsx",
  "/services/ai-gcc/mlops": "src/pages/services/ai-gcc/MLOps.tsx",
  "/services/ai-gcc/responsible-ai": "src/pages/services/ai-gcc/ResponsibleAI.tsx",
  "/services/ai-gcc/ai-infrastructure-gpu": "src/pages/services/ai-gcc/AIInfrastructureGpu.tsx",
};

const root = resolve(__dirname, "../..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

describe("AI GCC section routing and SEO contract", () => {
  it("registers every AI GCC page as a route, an indexable path and a prerender route", () => {
    for (const path of AI_GCC_PATHS) {
      expect(isValidRoute(path), path).toBe(true);
      expect(isIndexablePath(path), path).toBe(true);
      expect(PRERENDER_ROUTES as readonly string[]).toContain(path);
      expect(ROUTE_SEO.some((route) => route.path === path), path).toBe(true);
    }
  });

  it("has a Next.js page file for every AI GCC route", () => {
    for (const path of AI_GCC_PATHS) {
      const file = path === "/services/ai-gcc" ? "pages/services/ai-gcc.tsx" : `pages${path}.tsx`;
      expect(read(file)).toContain(`'${path}'`);
    }
  });

  it("uses the agreed SEO title and a unique description per page", () => {
    const seen = new Set<string>();
    for (const [path, title] of Object.entries(EXPECTED_TITLES)) {
      const seo = getRouteSeo(path);
      expect(seo.title, path).toBe(title);
      expect(seo.description.length, path).toBeGreaterThan(80);
      expect(seo.description.length, path).toBeLessThanOrEqual(170);
      expect(seen.has(seo.description), `duplicate description on ${path}`).toBe(false);
      seen.add(seo.description);
    }
  });

  it("renders exactly one H1 per page with the agreed wording", () => {
    for (const [path, h1] of Object.entries(EXPECTED_H1)) {
      const source = read(PAGE_SOURCES[path]);
      expect(source, path).toContain(`title: "${h1}"`);
      expect(source.includes("<h1"), `${path} must not add a second h1`).toBe(false);
    }
  });

  it("builds breadcrumbs as Home -> AI GCC -> Service", () => {
    const hub = buildBreadcrumbItems("/services/ai-gcc").map((item) => item.name);
    expect(hub).toEqual(["Home", "AI GCC"]);
    const gpu = buildBreadcrumbItems("/services/ai-gcc/ai-infrastructure-gpu").map((item) => item.name);
    expect(gpu).toEqual(["Home", "AI GCC", "AI Infrastructure & GPU"]);
    const mlops = buildBreadcrumbItems("/services/ai-gcc/mlops").map((item) => item.name);
    expect(mlops.at(-1)).toBe("MLOps, LLMOps & AgentOps");
  });

  it("keeps pageMeta names aligned with the section's visible service names", () => {
    for (const page of AI_GCC_PAGES) {
      expect(pageMeta[page.path]?.title, page.path).toBe(page.name);
    }
  });

  it("emits a Service schema for every page and no FAQPage on the hub", () => {
    for (const path of AI_GCC_PATHS) {
      const schema = buildServiceSchema(path) as { "@type": string; provider: { "@id": string } } | null;
      expect(schema, path).not.toBeNull();
      expect(schema!["@type"]).toBe("Service");
      expect(schema!.provider["@id"]).toBe("https://neointelli.com/#organization");
    }
    expect(buildFaqSchema("/services/ai-gcc")).toBeNull();
  });
});

describe("AI GCC internal links", () => {
  const allLinks = [
    ...AI_GCC_PAGES.map((page) => page.path),
    ...Object.values(AI_GCC_CONTEXT_LINKS).map((link) => link.path),
    ...OPERATING_ENGINES.flatMap((engine) => engine.links.map((link) => link.path)),
  ];

  it("only links to routes that exist, with no double slashes or trailing slashes", () => {
    for (const href of allLinks) {
      expect(href.includes("//"), href).toBe(false);
      expect(href.endsWith("/"), href).toBe(false);
      expect(isValidRoute(href), href).toBe(true);
    }
  });

  it("never uses generic anchor text", () => {
    const anchors = [
      ...AI_GCC_PAGES.map((page) => page.anchor),
      ...Object.values(AI_GCC_CONTEXT_LINKS).map((link) => link.anchor),
    ];
    for (const anchor of anchors) expect(anchor.toLowerCase()).not.toMatch(/^(learn|read) more$/);
  });

  it("links every child page back to the AI GCC hub and to 3-5 related pages", () => {
    for (const page of AI_GCC_PAGES.filter((entry) => entry.key !== "overview")) {
      const source = read(PAGE_SOURCES[page.path]);
      const related = source.match(/related=\{\[([\s\S]*?)\]\}/)?.[1] ?? "";
      const count = (related.match(/\{ (page|context): /g) ?? []).length;
      expect(count, `${page.path} related count`).toBeGreaterThanOrEqual(3);
      expect(count, `${page.path} related count`).toBeLessThanOrEqual(5);
      expect(related, `${page.path} must link back to the hub`).toContain('{ page: "overview" }');
      expect(source, `${page.path} needs an In brief block`).toContain("<InBrief>");
    }
  });

  it("references only live routes from llms.txt", () => {
    const llms = read("public/llms.txt");
    const paths = [...llms.matchAll(/https:\/\/neointelli\.com(\/[^)\s]*)/g)].map((m) => m[1]);
    expect(paths).toContain("/services/ai-gcc/ai-infrastructure-gpu");
    for (const path of paths) expect(isValidRoute(path), path).toBe(true);
  });

  it("does not reintroduce the contradictory 9-Day Blueprint wording or unsourced metrics", () => {
    for (const file of Object.values(PAGE_SOURCES)) {
      const source = read(file);
      expect(source).not.toMatch(/9[- ]day/i);
      expect(source).not.toMatch(/10x|99\.5%|<1%|30%\+|70% of/);
      expect(source).not.toMatch(/world-class|cutting-edge|game-changing|best-in-class|industry-leading/i);
    }
  });
});

describe("AI GCC CTA attribution", () => {
  it("builds a /book-a-call URL carrying source page, service interest and CTA name", () => {
    const url = aiGccBookingUrl({ sourcePage: "/services/ai-gcc/mlops", serviceInterest: "MLOps & AgentOps", ctaName: "Review My AI Production Stack" });
    expect(url.startsWith("/book-a-call?")).toBe(true);
    const params = readAiGccLeadParams(url.slice(url.indexOf("?")));
    expect(params).toEqual({
      source_page: "/services/ai-gcc/mlops",
      service_interest: "MLOps & AgentOps",
      cta_name: "Review My AI Production Stack",
    });
    expect(new URLSearchParams(url.slice(url.indexOf("?"))).get("type")).toBe("ai");
  });

  it("drops blank and oversized lead parameters", () => {
    expect(readAiGccLeadParams("?source_page=&cta_name=" + "x".repeat(200))).toEqual({});
  });
});
