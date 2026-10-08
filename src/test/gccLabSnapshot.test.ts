import { describe, it, expect, beforeEach, vi } from "vitest";
import { buildSnapshot } from "@/lib/gcc-lab/snapshot";
import { snapshotToCsv, escapeCsvCell, csvFilename } from "@/lib/gcc-lab/csv";
import { computeCostResult } from "@/lib/gcc-lab/costModel";
import { saveCase, loadCase, clearCase, hasSavedCase, STORAGE_KEY, RETENTION_DAYS, areaFromQuery, NEVER_IN_URL } from "@/lib/gcc-lab/storage";
import { createProfile, createScenario, createTeamRow } from "@/lib/gcc-lab/profile";
import { fixtureCase } from "./helpers/gccLabFixtures";
import type { BaselineConfig } from "@/lib/gcc-lab/types";

const NOW = new Date("2026-09-05T10:00:00.000Z");

const richCase = () => {
  const baseline: BaselineConfig = {
    objective: "add-capacity",
    roles: [{ roleKey: "ai", seniority: "senior", fte: 1, annualCost: 2_400, currency: "INR" }],
    currency: "INR",
    transitionOneTime: 100,
  };
  return fixtureCase(
    [{ roleKey: "ai", seniority: "senior", fte: 1, startMonth: 1, overrideAnnual: 960 }],
    { initialSetup: 50 },
    "INR",
    { objective: "add-capacity" },
    { baseline },
  );
};

describe("result snapshot", () => {
  it("carries its own provenance", () => {
    const { profile, scenario } = richCase();
    const snapshot = buildSnapshot(profile, scenario, { now: NOW });
    expect(snapshot.caseId).toMatch(/^NI-[0-9A-F]{8}$/);
    expect(snapshot.computedAt).toBe(NOW.toISOString());
    expect(snapshot.modelVersion).toBeTruthy();
    expect(snapshot.dataVersion).toBeTruthy();
    expect(snapshot.fxQuoteDate).toBeTruthy();
    expect(snapshot.reviewState).toBe("planning-estimate");
  });

  it("is immutable against later edits to the live case", () => {
    const { profile, scenario } = richCase();
    const snapshot = buildSnapshot(profile, scenario, { now: NOW });
    const beforeTotal = snapshot.cost.firstYearCash;

    // The visitor keeps editing while the export is being rendered.
    profile.team.push(createTeamRow({ roleKey: "ml", overrideAnnual: 9_999_999 }));
    profile.city = "chennai";

    expect(snapshot.cost.firstYearCash).toBe(beforeTotal);
    expect(snapshot.profile.team).toHaveLength(1);
    expect(snapshot.profile.city).toBe("bengaluru");
  });

  it("gives the same numbers to the screen and to the CSV", () => {
    const { profile, scenario } = richCase();
    const snapshot = buildSnapshot(profile, scenario, { now: NOW });
    const csv = snapshotToCsv(snapshot);
    const onScreen = computeCostResult(profile, scenario);

    expect(snapshot.cost.firstYearCash).toBeCloseTo(onScreen.firstYearCash, 6);
    expect(csv).toContain(`First-year cash,${Math.round(snapshot.cost.firstYearCash * 100) / 100}`);
    expect(csv).toContain(`Steady-state monthly run rate,${Math.round(snapshot.cost.steadyStateMonthly * 100) / 100}`);
  });

  it("produces a useful incomplete summary for an empty profile rather than failing", () => {
    const profile = createProfile({ country: "UNKNOWN" });
    const snapshot = buildSnapshot(profile, createScenario(profile), { now: NOW });
    expect(snapshot.cost.firstYearCash).toBe(0);
    expect(snapshot.openQuestions.length).toBeGreaterThan(3);
    expect(snapshot.openQuestions.join(" ")).toContain("Readiness");
    expect(() => snapshotToCsv(snapshot)).not.toThrow();
  });

  it("lists open questions rather than burying them", () => {
    const profile = createProfile({
      country: "GB",
      team: [createTeamRow({ roleKey: "ai" })],
      privacy: { dataOriginMarkets: [], servingMarkets: [], receivingEntity: "unknown", indiaRemoteAccess: "unknown", regulatedActivities: [] },
    });
    const snapshot = buildSnapshot(profile, createScenario(profile), { now: NOW });
    expect(snapshot.openQuestions.some((question) => question.includes("access personal data"))).toBe(true);
    expect(snapshot.openQuestions.some((question) => question.startsWith("Cost not budgeted"))).toBe(true);
  });

  it("maps every assumption to a basis", () => {
    const { profile, scenario } = richCase();
    const snapshot = buildSnapshot(profile, scenario, { now: NOW });
    snapshot.assumptions.forEach((assumption) => {
      expect(["user-input", "published-benchmark", "planning-assumption", "derived"]).toContain(assumption.basis);
      expect(assumption.confidenceRationale.length).toBeGreaterThan(10);
    });
    expect(snapshot.assumptions.find((a) => a.id === "policy-value")!.value).toBe(0);
  });
});

describe("CSV export", () => {
  it("neutralises a formula in a cell that came from a visitor", () => {
    expect(escapeCsvCell("=cmd|'/c calc'!A1")).toBe("'=cmd|'/c calc'!A1");
    expect(escapeCsvCell("+1+1")).toBe("'+1+1");
    expect(escapeCsvCell("-2")).toBe("'-2");
    expect(escapeCsvCell("@SUM(A1)")).toBe("'@SUM(A1)");
    expect(escapeCsvCell("  =evil()")).toBe("'  =evil()");
    expect(escapeCsvCell("Bengaluru")).toBe("Bengaluru");
  });

  it("quotes cells containing commas, quotes or newlines", () => {
    expect(escapeCsvCell('a,b')).toBe('"a,b"');
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""');
  });

  it("declares the currency and the unit of every figure column", () => {
    const { profile, scenario } = richCase();
    const csv = snapshotToCsv(buildSnapshot(profile, scenario, { now: NOW }));
    expect(csv).toContain("Currency,INR");
    expect(csv).toContain("India cash (INR)");
    expect(csv).toContain("Charged on");
    expect(csv).toContain("Per month at target team size");
  });

  it("includes the monthly cash flow and the assumptions, not just a summary", () => {
    const { profile, scenario } = richCase();
    const csv = snapshotToCsv(buildSnapshot(profile, scenario, { now: NOW }));
    const monthRows = csv.split("\r\n").filter((line) => /^\d+,/.test(line));
    expect(monthRows.length).toBe(60);
    expect(csv).toContain("Assumption,Value,Unit");
    expect(csv).toContain("Open questions");
  });

  it("says no baseline rather than writing zeros when there is none", () => {
    const { profile, scenario } = fixtureCase([{ roleKey: "ai", overrideAnnual: 960 }]);
    const csv = snapshotToCsv(buildSnapshot(profile, scenario, { now: NOW }));
    expect(csv).toContain("No baseline");
    expect(csv).toContain("No baseline was entered");
  });

  it("names the file after the case", () => {
    const { profile, scenario } = richCase();
    const snapshot = buildSnapshot(profile, scenario, { now: NOW });
    expect(csvFilename(snapshot)).toBe(`neointelli-gcc-case-${snapshot.caseId}.csv`);
  });
});

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("saves, reloads and clears a case", () => {
    const { profile, scenario } = richCase();
    const saved = saveCase(profile, [scenario], scenario.id, NOW);
    expect(saved.ok).toBe(true);
    expect(saved.expiresAt).toBe(new Date(NOW.getTime() + RETENTION_DAYS * 86_400_000).toISOString());
    expect(hasSavedCase()).toBe(true);

    const loaded = loadCase(NOW);
    expect(loaded.status).toBe("loaded");
    expect(loaded.saved!.profile.team).toHaveLength(1);

    expect(clearCase()).toBe(true);
    expect(loadCase(NOW).status).toBe("empty");
  });

  it("reports an expired case instead of loading it silently", () => {
    const { profile, scenario } = richCase();
    saveCase(profile, [scenario], scenario.id, NOW);
    const later = new Date(NOW.getTime() + (RETENTION_DAYS + 1) * 86_400_000);
    const loaded = loadCase(later);
    expect(loaded.status).toBe("expired");
    expect(loaded.message).toContain("retention");
  });

  it("survives a browser that refuses storage", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const { profile, scenario } = richCase();
    const saved = saveCase(profile, [scenario], scenario.id, NOW);
    expect(saved.ok).toBe(false);
    expect(saved.reason).toContain("Download the CSV");
    expect(loadCase(NOW).status).toBe("unavailable");
  });

  it("reports unreadable stored data rather than throwing", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadCase(NOW).status).toBe("unreadable");
  });

  it("never stores contact details with the case", () => {
    const { profile, scenario } = richCase();
    saveCase(profile, [scenario], scenario.id, NOW);
    const raw = window.localStorage.getItem(STORAGE_KEY)!;
    expect(raw).not.toMatch(/"email"/i);
    expect(raw).not.toMatch(/"name"\s*:/i);
  });

  it("lets a deep link select an area and carry nothing else", () => {
    expect(areaFromQuery("?area=compare")).toBe("compare");
    expect(areaFromQuery("?area=salaries")).toBeNull();
    expect(areaFromQuery("")).toBeNull();
    NEVER_IN_URL.forEach((field) => {
      expect(areaFromQuery(`?area=team&${field}=leak`)).toBe("team");
    });
  });
});

describe("CSV in the display currency", () => {
  it("writes the figures the visitor was looking at, and still records what the model computed in", () => {
    const { profile, scenario } = richCase();
    const snapshot = buildSnapshot(profile, scenario, { now: NOW });
    // The case computes in rupees; the visitor was reading dollars at 85.
    const csv = snapshotToCsv(snapshot, { currency: "USD", convert: (value) => value / 85 });

    expect(csv).toContain("Currency,USD");
    expect(csv).toContain("Model computed in,INR");
    expect(csv).toContain(`First-year cash,${Math.round((snapshot.cost.firstYearCash / 85) * 100) / 100}`);
    expect(csv).toContain("India cash (USD)");
  });

  it("defaults to the compute currency when no display conversion is given", () => {
    const { profile, scenario } = richCase();
    const csv = snapshotToCsv(buildSnapshot(profile, scenario, { now: NOW }));
    expect(csv).toContain("Currency,INR");
    expect(csv).toContain("Model computed in,INR");
  });
});
