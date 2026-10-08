/**
 * Synthetic fixtures for the Decision Lab tests.
 *
 * CONSPICUOUSLY SYNTHETIC. Every figure in here is a round number chosen so
 * the arithmetic can be checked by hand. None of it is a benchmark, none of it
 * is a NeoIntelli price, and nothing in here may be published.
 */

import { DEFAULT_FX } from "@/lib/gcc-lab/currency";
import { createProfile, createScenario, createTeamRow } from "@/lib/gcc-lab/profile";
import type { CostAssumptionOverrides, CurrencyCode, Profile, Scenario, TeamRow } from "@/lib/gcc-lab/types";

/** Every operating assumption zeroed, so a fixture only carries what it declares. */
export const ZERO_COSTS: CostAssumptionOverrides = {
  salaryEscalation: 0,
  complexityMultiplier: 0,
  benefitsRate: 0,
  workspacePerSeatMonthly: 0,
  itSecurityPerSeatMonthly: 0,
  partnerFeePerSeatMonthly: 0,
  fractionalLeadershipMonthly: 0,
  recruitmentPerHire: 0,
  equipmentPerHire: 0,
  entityLegalMonthly: 0,
  travelOversightMonthly: 0,
  initialSetup: 0,
  contingencyRate: 0,
  attritionRate: 0,
  backfillMonths: 0,
};

export function fixtureTeam(rows: Partial<TeamRow>[]): TeamRow[] {
  return rows.map((row, index) =>
    createTeamRow({
      id: `fx_${index}`,
      roleKey: row.roleKey ?? "ai",
      seniority: row.seniority ?? "senior",
      fte: row.fte ?? 1,
      startMonth: row.startMonth ?? 1,
      compensationBasis: row.compensationBasis ?? "total-employer-cost",
      skillTags: [],
      overrideAnnual: row.overrideAnnual,
      overrideCurrency: row.overrideCurrency,
      advisory: row.advisory,
    }),
  );
}

export function fixtureCase(
  rows: Partial<TeamRow>[],
  costAssumptions: CostAssumptionOverrides = {},
  currency: CurrencyCode = "INR",
  profilePatch: Partial<Profile> = {},
  scenarioPatch: Partial<Scenario> = {},
): { profile: Profile; scenario: Scenario } {
  const profile = createProfile({
    profileId: "fixture",
    country: "US",
    displayCurrency: currency,
    city: "bengaluru",
    cityIsDefault: false,
    workModel: "office",
    team: fixtureTeam(rows),
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...profilePatch,
  });
  const scenario = createScenario(profile, {
    id: "fixture",
    baseCurrency: currency,
    fx: DEFAULT_FX,
    costAssumptions: { ...ZERO_COSTS, ...costAssumptions },
    baseline: { objective: profile.objective, roles: [], currency },
    ...scenarioPatch,
  });
  return { profile, scenario };
}
