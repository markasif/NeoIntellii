import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROUTE_SEO, PAID_ROUTE_SEO, BLOG_ROUTE_SEO, buildFaqSchema, buildServiceSchema, getRouteSeo, isIndexablePath } from "@/lib/seo";
import { GCC_PLAYBOOK_FAQS } from "@/data/gccPlaybook";
import { SERVICE_PILLARS } from "@/data/serviceNav";

/**
 * Sitewide metadata guards.
 *
 * Individual sections already assert their own copy, but each did so with its
 * own limits (or, for AI Talent, none at all), which let meta descriptions
 * drift as far as 212 characters - long enough that search engines and answer
 * engines both truncate mid-sentence and the last clause never reaches a
 * reader. These tests apply one budget to every indexable route so a new page
 * cannot reintroduce the drift.
 *
 * The budgets are display limits, not schema.org rules:
 *   title       <= 60 characters (Google truncates around 580px)
 *   description <= 160 characters
 */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;
const DESCRIPTION_MIN = 70;

const allRoutes = [...ROUTE_SEO, ...PAID_ROUTE_SEO, ...BLOG_ROUTE_SEO];

describe("sitewide SEO metadata", () => {
  it("keeps every title within the length search results render", () => {
    for (const route of allRoutes) {
      expect(route.title.length, `${route.path}: "${route.title}"`).toBeLessThanOrEqual(TITLE_MAX);
      expect(route.title.length, route.path).toBeGreaterThan(0);
    }
  });

  it("keeps every meta description long enough to answer and short enough to survive truncation", () => {
    for (const route of allRoutes) {
      expect(route.description.length, `${route.path}: "${route.description}"`).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(route.description.length, route.path).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
    }
  });

  it("gives every route a unique title and description", () => {
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();
    for (const route of ROUTE_SEO) {
      const titleOwner = titles.get(route.title);
      expect(titleOwner, `${route.path} duplicates the title of ${titleOwner}`).toBeUndefined();
      titles.set(route.title, route.path);

      const descOwner = descriptions.get(route.description);
      expect(descOwner, `${route.path} duplicates the description of ${descOwner}`).toBeUndefined();
      descriptions.set(route.description, route.path);
    }
  });

  /**
   * Every page in the service taxonomy is a thing a buyer can purchase, so each
   * needs its own Service entity rather than only a WebPage. Without one, an
   * answer engine resolving "dedicated AI engineering team" finds a page but no
   * entity carrying a provider, and the answer is attributed to nobody.
   */
  it("declares a Service entity on every page in the service navigation", () => {
    const paths = SERVICE_PILLARS.flatMap((pillar) => [pillar.href, ...pillar.links.map((link) => link.href)]);
    for (const path of paths) {
      const schema = buildServiceSchema(path) as { "@type"?: string; provider?: unknown } | null;
      expect(schema, `no Service schema for ${path}`).not.toBeNull();
      expect(schema?.["@type"], path).toBe("Service");
      expect(schema?.provider, `${path} Service has no provider`).toBeDefined();
    }
  });

  it("resolves navigation routes to their own metadata rather than the site default", () => {
    const paths = SERVICE_PILLARS.flatMap((pillar) => [pillar.href, ...pillar.links.map((link) => link.href)]);
    for (const path of paths) {
      expect(getRouteSeo(path).path, `${path} falls through to the default route SEO`).toBe(path);
    }
  });
});

/**
 * llms.txt is the machine-readable site summary answer engines fetch to learn
 * what this site covers. It had drifted twice: a duplicated "GCC operations"
 * heading listed a page already covered by another section, and the industry
 * pages plus the comparison/cost/FAQ pages - the ones that carry the direct
 * answers - were absent entirely, so an engine reading only llms.txt would not
 * know they exist.
 */
describe("llms.txt", () => {
  const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
  const listedUrls = [...llms.matchAll(/https:\/\/neointelli\.com(\/[^)\s]*)?/g)]
    .map((match) => (match[1] ?? "/").replace(/\/$/, "") || "/");

  it("uses each section heading once", () => {
    const headings = [...llms.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim().toLowerCase());
    const duplicates = headings.filter((heading, index) => headings.indexOf(heading) !== index);
    expect(duplicates, `duplicate llms.txt headings: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("links only to routes that are live and indexable", () => {
    for (const path of new Set(listedUrls)) {
      expect(isIndexablePath(path), `llms.txt links to ${path}, which is not an indexable route`).toBe(true);
    }
  });

  it("lists every page in the service navigation", () => {
    const paths = SERVICE_PILLARS.flatMap((pillar) => [pillar.href, ...pillar.links.map((link) => link.href)]);
    for (const path of paths) {
      expect(listedUrls, `llms.txt does not list ${path}`).toContain(path);
    }
  });

  /**
   * The pages an answer engine is most likely to be asked about directly:
   * definitions, comparisons, costs and the sector pages.
   */
  it("lists the industry and direct-answer pages", () => {
    const required = [
      "/industries",
      "/industries/bfsi-gcc",
      "/industries/healthcare-gcc",
      "/industries/technology-gcc",
      "/industries/manufacturing-gcc",
      "/industries/private-equity-gcc",
      "/industries/retail-gcc",
      "/gcc-faq",
      "/gcc-vs-outsourcing",
      "/gcc-india-cost",
      "/gcc-as-a-service",
      "/lp/gcc-playbook",
    ];
    for (const path of required) {
      expect(listedUrls, `llms.txt does not list ${path}`).toContain(path);
    }
  });
});


describe("the GCC Decision Lab route", () => {
  it("is indexable and carries its own canonical rather than the calculator's", () => {
    const seo = getRouteSeo("/lp/gcc-playbook");
    expect(seo).toBeTruthy();
    expect(isIndexablePath("/lp/gcc-playbook")).toBe(true);
    // Distinct search intents: what does a team cost, versus should we do this
    // at all. Canonicalizing one to the other would merge them.
    expect(seo?.canonical).toBeUndefined();
    expect(getRouteSeo("/gcc-cost-calculator")).toBeTruthy();
  });

  it("emits FAQ structured data that matches the visible page exactly", () => {
    const schema = buildFaqSchema("/lp/gcc-playbook") as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    } | null;
    expect(schema).not.toBeNull();
    expect(schema!.mainEntity).toHaveLength(GCC_PLAYBOOK_FAQS.length);
    schema!.mainEntity.forEach((entry, index) => {
      expect(entry.name).toBe(GCC_PLAYBOOK_FAQS[index].q);
      expect(entry.acceptedAnswer.text).toBe(GCC_PLAYBOOK_FAQS[index].a);
    });

    // The page renders the same array, so the two cannot drift.
    const page = readFileSync(join(process.cwd(), "src/pages/landing/GccPlaybook.tsx"), "utf8");
    expect(page).toContain("GCC_PLAYBOOK_FAQS.map");
  });

  it("makes no claim of a rating, a review count or a response time anywhere on the page", () => {
    const page = readFileSync(join(process.cwd(), "src/pages/landing/GccPlaybook.tsx"), "utf8");
    expect(page).not.toMatch(/aggregateRating|reviewCount|ratingValue/i);
    expect(page).not.toMatch(/within \d+ (hours|business days)|same.day response/i);
  });
});
