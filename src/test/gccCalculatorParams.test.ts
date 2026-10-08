import { describe, it, expect } from "vitest";
import {
  parseCalculatorParams,
  distributeTeam,
  normalizeToken,
} from "@/lib/gccCalculatorParams";

/** The shape of link the campaigns actually send us. */
const CAMPAIGN_LINK =
  "?team=10&Engineering%20Manager=1&AI%20%2F%20ML%20Engineer=1&Data%20Engineer=1" +
  "&Full-Stack%20Engineer=1&Backend%20Engineer=1&Frontend%20Engineer=1" +
  "&Cloud%20%2F%20DevOps%20Engineer=1&QA%20%2F%20SDET=1&Data%20Scientist=1&Mobile%20Engineer=1";

describe("normalizeToken", () => {
  it("collapses spelling variants of the same role onto one token", () => {
    expect(normalizeToken("AI / ML Engineer")).toBe(normalizeToken("AI/ML Engineers"));
    expect(normalizeToken("Cloud / DevOps Engineer")).toBe(normalizeToken("Cloud/DevOps Engineers"));
    expect(normalizeToken("QA / SDET")).toBe(normalizeToken("QA/SDET"));
    expect(normalizeToken("Full-Stack Engineer")).toBe(normalizeToken("full stack engineers"));
  });

  it("leaves short tokens alone rather than mangling them", () => {
    expect(normalizeToken("QA")).toBe("qa");
    expect(normalizeToken("EM")).toBe("em");
  });
});

describe("parseCalculatorParams", () => {
  it("fills every role from a campaign link", () => {
    const prefill = parseCalculatorParams(CAMPAIGN_LINK);

    expect(prefill.applied).toBe(true);
    expect(prefill.teamSource).toBe("roles");
    // Engineering Manager -> Product Owner, AI/ML -> AI, Frontend folds into
    // Full-Stack: the campaign links predate the trimmed roster.
    expect(prefill.teamCounts).toEqual({
      po: 1, ai: 1, dataeng: 1, fullstack: 2, backend: 1,
      devops: 1, qa: 1, datasci: 1, mobile: 1,
    });
  });

  it("keeps AI and ML engineers apart", () => {
    expect(parseCalculatorParams("?AI%20Engineer=2&ML%20Engineer=1&NLP%20Engineer=1").teamCounts).toEqual({
      ai: 2, ml: 2,
    });
  });

  it("takes role counts over a total that disagrees with them", () => {
    const prefill = parseCalculatorParams("?team=99&Backend%20Engineer=3");
    expect(prefill.teamCounts).toEqual({ backend: 3 });
    expect(prefill.teamSource).toBe("roles");
  });

  it("splits a bare total across a default pod that adds up", () => {
    const prefill = parseCalculatorParams("?team=20");
    expect(prefill.teamSource).toBe("total");
    const totals = Object.values(prefill.teamCounts!).reduce((a, b) => a + b, 0);
    expect(totals).toBe(20);
  });

  it("accepts role keys and informal aliases", () => {
    expect(parseCalculatorParams("?aiml=2&sdet=1&devops=3&pm=1").teamCounts).toEqual({
      ai: 2, qa: 1, devops: 3, po: 1,
    });
  });

  it("reads seniority, city and engagement model", () => {
    const prefill = parseCalculatorParams("?seniority=senior&city=Hyderabad&model=hybrid");
    expect(prefill.seniority).toBe(2);
    expect(prefill.city).toBe("hyderabad");
    expect(prefill.engagement).toBe("hybrid");
  });

  it("accepts a numeric seniority and a city alias", () => {
    const prefill = parseCalculatorParams("?seniority=3&location=bangalore");
    expect(prefill.seniority).toBe(3);
    expect(prefill.city).toBe("bengaluru");
  });

  it("maps 'not sure' about the city to the recommend option", () => {
    expect(parseCalculatorParams("?city=not%20sure").city).toBe("recommend");
  });

  it("ignores tracking parameters and anything it does not recognise", () => {
    const prefill = parseCalculatorParams(
      "?utm_source=linkedin&utm_campaign=gcc&gclid=abc&fruit=banana",
    );
    expect(prefill.applied).toBe(false);
    expect(prefill.teamCounts).toBeNull();
  });

  it("ignores junk values instead of guessing", () => {
    const prefill = parseCalculatorParams("?Backend%20Engineer=-4&QA%20%2F%20SDET=abc&seniority=wizard");
    expect(prefill.teamCounts).toBeNull();
    expect(prefill.seniority).toBeNull();
  });

  it("treats a bare role flag as one hire", () => {
    expect(parseCalculatorParams("?Backend%20Engineer").teamCounts).toEqual({ backend: 1 });
  });

  it("caps absurd counts", () => {
    expect(parseCalculatorParams("?Backend%20Engineer=100000").teamCounts).toEqual({ backend: 500 });
  });

  it("returns nothing for an empty query string", () => {
    expect(parseCalculatorParams("")).toMatchObject({ applied: false, teamCounts: null });
  });
});

describe("distributeTeam", () => {
  it.each([1, 3, 7, 12, 25, 100])("always adds up to the requested %i", (size) => {
    const counts = distributeTeam(size);
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(size);
  });

  it("returns an empty split for zero", () => {
    expect(distributeTeam(0)).toEqual({});
  });
});
