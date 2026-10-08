import { describe, it, expect } from "vitest";
import { buildCalculatorUrl, TEAM_ROLES } from "@/components/landing/micro-gcc-india/TeamDesigner";
import { teamCountsFromQuery } from "@/pages/GccCostCalculator";
import { roles as roleConfigs } from "@/data/gccCostData";

/**
 * /lp/micro-gcc-india hands its designed team to /gcc-cost-calculator through
 * the query string. The two sides name roles differently on purpose - the
 * landing page uses singular human labels, the calculator plural ones - so
 * this locks the round trip rather than either spelling.
 */
const counts = {
  "Engineering Manager": 1,
  "AI / ML Engineer": 2,
  "Data Engineer": 1,
  "Full-Stack Engineer": 2,
  "Cloud / DevOps Engineer": 1,
  "QA / SDET": 1,
};

describe("buildCalculatorUrl", () => {
  it("targets the calculator and carries the team total", () => {
    const url = buildCalculatorUrl(counts, 8);
    expect(url.startsWith("/gcc-cost-calculator?team=8&")).toBe(true);
  });

  it("percent-encodes spaces and slashes rather than posting them raw", () => {
    const url = buildCalculatorUrl(counts, 8);
    expect(url).toContain("Engineering%20Manager=1");
    expect(url).toContain("AI%20%2F%20ML%20Engineer=2");
    expect(url).toContain("QA%20%2F%20SDET=1");
  });

  it("omits roles nobody picked", () => {
    expect(buildCalculatorUrl(counts, 8)).not.toContain("Mobile");
  });
});

describe("teamCountsFromQuery", () => {
  // The landing page still designs with an Engineering Manager and a
  // combined AI/ML Engineer; the calculator roster no longer has either, so
  // they land on Product Owner and AI Engineer respectively.
  it("reads back every role the landing page sent", () => {
    const search = buildCalculatorUrl(counts, 8).split("?")[1];
    expect(teamCountsFromQuery(search)).toEqual({
      po: 1,
      ai: 2,
      dataeng: 1,
      fullstack: 2,
      devops: 1,
      qa: 1,
    });
  });

  it("folds retired roles onto their nearest current seat", () => {
    expect(teamCountsFromQuery("Frontend%20Engineer=2&Full-Stack%20Engineer=1")).toEqual({ fullstack: 3 });
    expect(teamCountsFromQuery("Product%20Manager=1&Product%20Owner=1")).toEqual({ po: 2 });
  });

  it("resolves every landing-page role to a calculator role", () => {
    const keys = roleConfigs.map((role) => role.key);
    for (const role of TEAM_ROLES) {
      const parsed = teamCountsFromQuery(`${encodeURIComponent(role.param)}=1`);
      expect(Object.keys(parsed)).toHaveLength(1);
      expect(keys).toContain(Object.keys(parsed)[0]);
    }
  });

  it("accepts the plural label and the raw key too", () => {
    expect(teamCountsFromQuery("Data+Scientists=3")).toEqual({ datasci: 3 });
    expect(teamCountsFromQuery("ml=4")).toEqual({ ml: 4 });
    expect(teamCountsFromQuery("aiml=4")).toEqual({ ai: 4 });
  });

  it("ignores unknown names, non-numbers and non-positive counts", () => {
    expect(teamCountsFromQuery("team=8&utm_source=google&Chef=2&Backend%20Engineer=abc&QA%20%2F%20SDET=0"))
      .toEqual({});
  });
});
