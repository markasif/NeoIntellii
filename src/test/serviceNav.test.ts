import { describe, it, expect } from "vitest";
import { SERVICE_PILLARS, serviceNavEntries, TRANSITIONAL_LINKS, RESOURCE_LINKS, FOOTER_SERVICE_COLUMNS, SOLUTION_GROUPS, solutionEntries } from "@/data/serviceNav";
import { megaMenu } from "@/components/layout/megaMenu";
import { isValidRoute } from "@/App";
import { isNavLinkAvailable, filterNavColumns } from "@/lib/navAvailability";

/**
 * The service taxonomy drives the "What We Do" menu, the "Solutions" menu and
 * the footer. These tests lock the agreed structure and, critically, keep the
 * live/pending flags honest: three pillars ship on parallel branches, and when
 * one of them merges the corresponding assertion fails and names the entry to
 * flip.
 */

const EXPECTED: Record<string, { href: string; links: string[] }> = {
  "AI GCC": {
    href: "/services/ai-gcc",
    links: ["AI Advisory & Strategy", "AI GCC Setup & Operations", "Generative & Agentic AI for GCCs", "Data Engineering for AI GCCs", "MLOps, LLMOps & AgentOps for GCCs", "AI Governance & Responsible AI", "AI Infrastructure & GPU"],
  },
  "AI Talent": {
    href: "/services/ai-talent",
    links: ["AI & ML Recruitment", "GenAI & Agentic AI Hiring", "Data Engineering & Data Science Hiring", "MLOps & AI Platform Hiring", "AI Leadership & Executive Search", "AI Recruitment Hub + NeoHireX", "AI Talent Academy & Reskilling"],
  },
  "AI Engineering": {
    href: "/services/ai-engineering",
    links: ["Generative & Agentic AI", "Applied AI & Machine Learning", "AI Data Engineering", "AI Product Engineering", "AI Agents & Automation", "MLOps, LLMOps & AgentOps", "AI Evaluation & Assurance"],
  },
  "AI Delivery Teams": {
    href: "/services/ai-delivery-teams",
    links: ["Dedicated AI Engineering Team", "AI Delivery Pod", "Forward-Deployed AI Engineers", "AI Team Build & Transfer"],
  },
  "GCC Strategy & Setup": {
    href: "/services/gcc",
    links: ["GCC Strategy & Business Case", "GCC Location Strategy", "GCC Setup & Launch", "GCC Modernization & Transformation", "AI Micro GCC"],
  },
  "GCC Operations": {
    href: "/services/gcc-operations",
    links: ["People & HR Operations", "GCC Workforce Strategy", "Workplace, IT & Security", "Service Management & Performance", "Governance & Compliance", "BOT & Transition", "Scale & Expansion"],
  },
};

describe("service taxonomy", () => {
  it("carries the six pillars in order, each with its agreed sub-pages", () => {
    expect(SERVICE_PILLARS.map((pillar) => pillar.name)).toEqual(Object.keys(EXPECTED));
    for (const pillar of SERVICE_PILLARS) {
      const expected = EXPECTED[pillar.name];
      expect(pillar.href, pillar.name).toBe(expected.href);
      expect(pillar.links.map((link) => link.label), pillar.name).toEqual(expected.links);
    }
  });

  it("uses clean, unique paths", () => {
    const hrefs = serviceNavEntries().map((entry) => entry.href);
    expect(new Set(hrefs).size, "duplicate href in the taxonomy").toBe(hrefs.length);
    for (const href of hrefs) {
      expect(href.startsWith("/"), href).toBe(true);
      expect(href.includes("//"), href).toBe(false);
      expect(href.endsWith("/"), href).toBe(false);
    }
  });

  it("keeps every live entry pointing at a route that exists", () => {
    for (const entry of serviceNavEntries().filter((entry) => entry.status === "live")) {
      expect(isValidRoute(entry.href), `${entry.href} is marked live but has no route`).toBe(true);
    }
  });

  it("keeps every pending entry flagged until its branch merges", () => {
    for (const entry of serviceNavEntries().filter((entry) => entry.status === "pending")) {
      expect(entry.source, `${entry.href} is pending and must name the branch that delivers it`).toBeTruthy();
      expect(
        isValidRoute(entry.href),
        `${entry.href} now exists: change its status to "live" in src/data/serviceNav.ts (delivered by ${entry.source})`,
      ).toBe(false);
    }
  });

  it("points the transitional and resource links at live routes", () => {
    for (const link of [...TRANSITIONAL_LINKS, ...RESOURCE_LINKS]) {
      expect(isValidRoute(link.href), link.href).toBe(true);
    }
  });
});

describe("navigation surfaces built from the taxonomy", () => {
  const item = (name: string) => megaMenu.find((entry) => entry.name === name)!;

  it("lists only the six overviews in What We Do, numbered", () => {
    const links = item("What We Do").columns.flatMap((column) => column.links);
    expect(links.map((link) => link.href)).toEqual(SERVICE_PILLARS.map((pillar) => pillar.href));
    expect(links.map((link) => link.label)).toEqual(SERVICE_PILLARS.map((pillar, index) => `${String(index + 1).padStart(2, "0")}. ${pillar.name}`));
    for (const link of links) expect(link.desc, link.label).toBeTruthy();
  });

  it("renders Solutions as four groups of three, from the curated list", () => {
    const solutions = item("Solutions");
    expect(solutions.featured, "Solutions shows the twelve destinations and nothing else").toBeUndefined();
    expect(solutions.variant, "Solutions reuses the What We Do card layout").toBe("cards");
    expect(solutions.columnsPerRow, "three groups on one row").toBe(3);
    expect(solutions.wide, "three groups fit the standard 1240px panel").toBeUndefined();
    expect(solutions.href, "no /solutions hub page exists, so the trigger is a disclosure button").toBeUndefined();

    expect(solutions.columns.map((column) => column.label)).toEqual([
      "Build your AI capability",
      "Solve an AI challenge",
      "Plan Your Recruitment",
      "Plan your GCC",
    ]);
    expect(solutions.columns.map((column) => column.links.length)).toEqual([3, 3, 3, 3]);
    for (const column of solutions.columns) {
      for (const link of column.links) {
        expect(link.desc, link.label).toBeTruthy();
        expect(link.icon, link.label).toBeTruthy();
        expect(link.label, "Solutions carries no Overview rows").not.toBe("Overview");
      }
    }
  });

  it("keeps What We Do on the same card layout, so the two panels cannot drift apart", () => {
    expect(item("What We Do").variant).toBe("cards");
  });

  it("names the twelve solutions exactly as agreed and points each at a live route", () => {
    expect(solutionEntries().map((entry) => entry.label)).toEqual([
      "AI Micro GCC",
      "AI Delivery Pods",
      "AI Team Build & Transfer",
      "Expert-Validated AI Hiring",
      "AI Pilot to Production",
      "AI CoE for Existing GCCs",
      "Recruitment & Staffing",
      "Permanent Recruitment",
      "Executive Search",
      "GCC Cost Calculator",
      "GCC Readiness Assessment",
      "GCC Blueprint",
    ]);
    for (const entry of solutionEntries()) {
      expect(isValidRoute(entry.href), `${entry.href} is in the Solutions menu but has no route`).toBe(true);
    }
    const hrefs = solutionEntries().map((entry) => entry.href);
    expect(new Set(hrefs).size, "duplicate destination in Solutions").toBe(hrefs.length);
  });

  it("uses existing canonical URLs rather than inventing a /solutions taxonomy", () => {
    for (const entry of solutionEntries()) {
      expect(entry.href.startsWith("/solutions"), `${entry.href} must keep its canonical URL`).toBe(false);
    }
  });

  it("flags exactly the three solutions that are still standing on a capability page", () => {
    expect(solutionEntries().filter((entry) => entry.interim).map((entry) => entry.label)).toEqual([
      "Expert-Validated AI Hiring",
      "AI Pilot to Production",
      "AI CoE for Existing GCCs",
    ]);
  });

  it("keeps Solutions distinct from What We Do", () => {
    const pillarHrefs = new Set(SERVICE_PILLARS.map((pillar) => pillar.href));
    for (const entry of solutionEntries()) {
      expect(pillarHrefs.has(entry.href), `${entry.label} repeats a What We Do pillar overview`).toBe(false);
    }
    expect(SOLUTION_GROUPS).toHaveLength(4);
  });

  it("keeps every service sub-page reachable from the footer now that Solutions is curated", () => {
    const footerHrefs = new Set(FOOTER_SERVICE_COLUMNS.flatMap((column) => column.links.map((link) => link.href)));
    for (const entry of serviceNavEntries()) {
      expect(footerHrefs.has(entry.href), `${entry.href} lost its last global link`).toBe(true);
    }
  });

  it("keeps the mega menu free of the retired recruitment entry points", () => {
    const hrefs = megaMenu.flatMap((entry) => entry.columns.flatMap((column) => column.links.map((link) => link.href)));
    for (const retired of ["/services/ai-data-recruitment", "/services/ai-talent-acquisition", "/services/technology"]) {
      expect(hrefs, `${retired} should no longer be a mega menu entry point`).not.toContain(retired);
    }
  });

  it("carries every taxonomy entry in the footer", () => {
    const footerHrefs = FOOTER_SERVICE_COLUMNS.flatMap((column) => column.links.map((link) => link.href));
    for (const entry of serviceNavEntries()) expect(footerHrefs, entry.href).toContain(entry.href);
    expect(FOOTER_SERVICE_COLUMNS.map((column) => column.heading)).toEqual([...SERVICE_PILLARS.map((pillar) => pillar.name), "More Services", "Resources"]);
  });
});

describe("navigation availability filter", () => {
  it("keeps links whose page exists and hides the ones without a route", () => {
    expect(isNavLinkAvailable("/services/ai-talent")).toBe(true);
    expect(isNavLinkAvailable("/services/ai-engineering")).toBe(true);
    expect(isNavLinkAvailable("/services/ai-gcc/ai-infrastructure-gpu")).toBe(true);
    expect(isNavLinkAvailable("/services/gcc-operations/bot-transition")).toBe(true);
    expect(isNavLinkAvailable("/services/ai-delivery-teams")).toBe(true);
    expect(isNavLinkAvailable("/services/ai-delivery-teams/ai-delivery-pod")).toBe(true);
    // A path with no route registered in src/App.tsx is filtered out of the menus.
    expect(isNavLinkAvailable("/services/not-a-real-pillar")).toBe(false);
    expect(isNavLinkAvailable("/services/not-a-real-pillar/child")).toBe(false);
  });

  it("leaves external links, the home page and links carrying a query alone", () => {
    expect(isNavLinkAvailable("https://neohirex.ai/", true)).toBe(true);
    expect(isNavLinkAvailable("/")).toBe(true);
    expect(isNavLinkAvailable("/book-a-call?type=neohirex")).toBe(true);
  });

  it("drops unavailable links and any column left empty", () => {
    const filtered = filterNavColumns([
      { label: "Mixed", links: [{ href: "/services/ai-talent" }, { href: "/services/not-a-real-pillar" }] },
      { label: "All unavailable", links: [{ href: "/services/not-a-real-pillar/child" }] },
    ]);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].label).toBe("Mixed");
    expect(filtered[0].links.map((link) => link.href)).toEqual(["/services/ai-talent"]);
  });

  it("renders every pillar the moment its routes exist", () => {
    const columns = SERVICE_PILLARS.map((pillar) => ({
      label: pillar.name,
      links: [{ href: pillar.href }, ...pillar.links.map((link) => ({ href: link.href }))],
    }));
    const visible = filterNavColumns(columns).map((column) => column.label);
    const expected = SERVICE_PILLARS.filter((pillar) => [pillar, ...pillar.links].some((entry) => isValidRoute(entry.href))).map((pillar) => pillar.name);
    expect(visible).toEqual(expected);
  });
});
