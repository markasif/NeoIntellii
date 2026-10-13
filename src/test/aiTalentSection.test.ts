import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { AI_TALENT_PAGES, AI_TALENT_PATHS, AI_TALENT_CONTEXT_LINKS, VALIDATION_FLOW } from "@/data/aiTalent";
import { ROUTE_SEO, PRERENDER_ROUTES, buildBreadcrumbItems, buildServiceSchema, buildFaqSchema, isIndexablePath, getRouteSeo } from "@/lib/seo";
import { pageMeta } from "@/lib/pageMeta";
import { isValidRoute } from "@/App";
import { megaMenu } from "@/components/layout/megaMenu";
import { FOOTER_SERVICE_COLUMNS } from "@/data/serviceNav";

const EXPECTED_TITLES: Record<string, string> = {
  "/services/ai-talent": "AI Recruitment & Talent Services India | NeoIntelli",
  "/services/ai-talent/ai-ml-recruitment": "AI & ML Recruitment Agency India | NeoIntelli",
  "/services/ai-talent/genai-agentic-ai-hiring": "GenAI & Agentic AI Recruitment India | NeoIntelli",
  "/services/ai-talent/data-engineering-data-science-hiring": "Data Engineering & Data Science Hiring India | NeoIntelli",
  "/services/ai-talent/mlops-ai-platform-hiring": "MLOps & AI Platform Recruitment India | NeoIntelli",
  "/services/ai-talent/ai-leadership-executive-search": "AI Leadership & Executive Search India | NeoIntelli",
  "/services/ai-talent/recruitment-hub": "AI Recruitment RPO & Hiring Hub India | NeoIntelli",
  "/services/ai-talent/ai-reskilling-academy": "AI Reskilling & Talent Academy for Engineers | NeoIntelli",
};

const EXPECTED_H1: Record<string, string> = {
  "/services/ai-talent": "AI, ML & Data Talent Services in India",
  "/services/ai-talent/ai-ml-recruitment": "AI & Machine Learning Recruitment in India",
  "/services/ai-talent/genai-agentic-ai-hiring": "Hire GenAI & Agentic AI Engineers in India",
  "/services/ai-talent/data-engineering-data-science-hiring": "Hire Data Engineering & Data Science Talent in India",
  "/services/ai-talent/mlops-ai-platform-hiring": "Hire MLOps & AI Platform Engineers in India",
  "/services/ai-talent/ai-leadership-executive-search": "AI Leadership & Executive Search in India",
  "/services/ai-talent/recruitment-hub": "Your AI Recruitment Hub in India",
  "/services/ai-talent/ai-reskilling-academy": "Build AI talent from the engineering team you already have.",
};

const PAGE_SOURCES: Record<string, string> = {
  "/services/ai-talent": "src/pages/services/ai-talent/AITalentOverview.tsx",
  "/services/ai-talent/ai-ml-recruitment": "src/pages/services/ai-talent/AIMLRecruitment.tsx",
  "/services/ai-talent/genai-agentic-ai-hiring": "src/pages/services/ai-talent/GenAIAgenticHiring.tsx",
  "/services/ai-talent/data-engineering-data-science-hiring": "src/pages/services/ai-talent/DataHiring.tsx",
  "/services/ai-talent/mlops-ai-platform-hiring": "src/pages/services/ai-talent/MLOpsPlatformHiring.tsx",
  "/services/ai-talent/ai-leadership-executive-search": "src/pages/services/ai-talent/AILeadershipSearch.tsx",
  "/services/ai-talent/recruitment-hub": "src/pages/services/ai-talent/RecruitmentHub.tsx",
  "/services/ai-talent/ai-reskilling-academy": "src/pages/services/ai-talent/AIReskillingAcademy.tsx",
};

const root = resolve(__dirname, "../..");
const read = (file: string) => readFileSync(resolve(root, file), "utf8");

describe("AI Talent section routing and SEO contract", () => {
  it("registers every AI Talent page as a route, an indexable path and a prerender route", () => {
    for (const path of AI_TALENT_PATHS) {
      expect(isValidRoute(path), path).toBe(true);
      expect(isIndexablePath(path), path).toBe(true);
      expect(PRERENDER_ROUTES as readonly string[]).toContain(path);
      expect(ROUTE_SEO.some((route) => route.path === path), path).toBe(true);
      const file = path === "/services/ai-talent" ? "pages/services/ai-talent.tsx" : `pages${path}.tsx`;
      expect(read(file)).toContain(`'${path}'`);
    }
  });

  it("uses the agreed SEO title and a unique description per page", () => {
    const seen = new Set<string>();
    for (const [path, title] of Object.entries(EXPECTED_TITLES)) {
      const seo = getRouteSeo(path);
      expect(seo.title, path).toBe(title);
      expect(seo.description.length, path).toBeGreaterThan(80);
      expect(seen.has(seo.description), `duplicate description on ${path}`).toBe(false);
      seen.add(seo.description);
    }
  });

  it("renders one H1 per page with the agreed wording", () => {
    for (const [path, h1] of Object.entries(EXPECTED_H1)) {
      const source = read(PAGE_SOURCES[path]);
      expect(source, path).toContain(`title: "${h1}"`);
      expect(source.includes("<h1"), `${path} must not add a second h1`).toBe(false);
    }
  });

  it("builds breadcrumbs as Home -> AI Talent -> Service and matches pageMeta names", () => {
    expect(buildBreadcrumbItems("/services/ai-talent").map((item) => item.name)).toEqual(["Home", "AI Talent"]);
    expect(buildBreadcrumbItems("/services/ai-talent/recruitment-hub").map((item) => item.name)).toEqual(["Home", "AI Talent", "AI Recruitment Hub + NeoHireX"]);
    for (const page of AI_TALENT_PAGES) expect(pageMeta[page.path]?.title, page.path).toBe(page.name);
  });

  it("emits a Service schema per page and no FAQPage", () => {
    for (const path of AI_TALENT_PATHS) {
      const schema = buildServiceSchema(path) as { "@type": string } | null;
      expect(schema?.["@type"], path).toBe("Service");
      expect(buildFaqSchema(path), path).toBeNull();
    }
  });
});

describe("AI Talent content and links", () => {
  it("links only to live routes, with no double or trailing slashes", () => {
    const hrefs = [
      ...AI_TALENT_PATHS,
      ...Object.values(AI_TALENT_CONTEXT_LINKS).map((link) => link.path).filter((path) => path.startsWith("/")),
    ];
    for (const href of hrefs) {
      const path = href.split("?")[0];
      expect(path.includes("//"), href).toBe(false);
      expect(path.endsWith("/"), href).toBe(false);
      expect(isValidRoute(path), href).toBe(true);
    }
  });

  it("puts the validation flow, an In brief block and 3-5 related links on every page", () => {
    expect(VALIDATION_FLOW).toHaveLength(8);
    expect(VALIDATION_FLOW.at(-1)?.label).toBe("You decide");
    for (const page of AI_TALENT_PAGES) {
      const source = read(PAGE_SOURCES[page.path]);
      expect(source, `${page.path} needs an In brief block`).toContain("<InBrief>");
      const related = source.match(/related=\{\[([\s\S]*?)\]\}/)?.[1] ?? "";
      const count = (related.match(/\{ (page|context): /g) ?? []).length;
      expect(count, `${page.path} related count`).toBeGreaterThanOrEqual(3);
      expect(count, `${page.path} related count`).toBeLessThanOrEqual(5);
      if (page.key !== "overview") expect(related, `${page.path} must link back to the hub`).toContain('{ page: "overview" }');
    }
  });

  it("keeps the section free of unsourced metrics, competitor names and generic anchors", () => {
    for (const file of Object.values(PAGE_SOURCES)) {
      const source = read(file);
      expect(source).not.toMatch(/\d+%|\d+x\b|\d+:1/);
      expect(source).not.toMatch(/Quess|Randstad|TeamLease|Zyoin|Teksands|WSNE/);
      expect(source).not.toMatch(/Learn more/i);
      expect(source).not.toMatch(/world-class|cutting-edge|best-in-class|industry-leading/i);
    }
  });

  it("promotes the AI Talent hub in navigation instead of the generic recruitment hub", () => {
    // Global navigation is the mega menus plus the footer service columns. The
    // "Solutions" menu is a curated list of nine entry points, so a sub-page
    // such as the recruitment hub is carried by the footer and the pillar page.
    const menuHrefs = megaMenu.flatMap((item) => item.columns.flatMap((column) => column.links.map((link) => link.href)));
    const globalHrefs = [...menuHrefs, ...FOOTER_SERVICE_COLUMNS.flatMap((column) => column.links.map((link) => link.href))];
    expect(menuHrefs).toContain("/services/ai-talent");
    expect(globalHrefs).toContain("/services/ai-talent/recruitment-hub");
    for (const retired of ["/services/ai-data-recruitment", "/services/ai-talent-acquisition"]) {
      expect(menuHrefs, retired).not.toContain(retired);
    }
  });

  it("references only live routes from llms.txt", () => {
    const llms = read("public/llms.txt");
    const paths = [...llms.matchAll(/https:\/\/neointelli\.com(\/[^)\s]*)/g)].map((m) => m[1]);
    for (const path of AI_TALENT_PATHS) expect(paths).toContain(path);
    for (const path of paths) expect(isValidRoute(path), path).toBe(true);
  });
});
