import { describe, it, expect } from "vitest";
import { surfacePolicies, POLICY_RECORDS } from "@/lib/gcc-lab/policy";
import { assessReadiness, READINESS_QUESTIONS } from "@/lib/gcc-lab/readiness";
import { proposeTeam, proposalToRows, diffTeam } from "@/lib/gcc-lab/teamTemplates";
import { compareCities, NUMERIC_FIT_SCORING_ENABLED, findCity } from "@/lib/gcc-lab/cities";
import { recommendPathway } from "@/lib/gcc-lab/entryPathways";
import { buildLaunchPlan } from "@/lib/gcc-lab/launchPlan";
import { workingOverlap } from "@/lib/gcc-lab/overlap";
import { createProfile, createTeamRow, createScenario } from "@/lib/gcc-lab/profile";
import { ATTRITION_ANCHORS, ESCALATION_ANCHORS, NOT_BUDGETED, OPERATING_BANDS } from "@/lib/gcc-lab/defaults";
import { findSource } from "@/lib/gcc-lab/sources";
import { seatAnnualCtcInr } from "@/lib/gcc-lab/costModel";
import { formatLakh } from "@/lib/gcc-lab/currency";
import { COUNTRIES, hasMembership } from "@/lib/gcc-lab/countries";
import type { ArrangementInputs } from "@/lib/gcc-lab/entryPathways";
import type { Profile, ReadinessAnswer } from "@/lib/gcc-lab/types";

const profileWith = (patch: Partial<Profile>): Profile => createProfile({ country: "US", ...patch });

describe("country memberships overlap rather than exclude", () => {
  it("gives Norway EEA privacy and EFTA facilitation at once", () => {
    expect(hasMembership("NO", "eea")).toBe(true);
    expect(hasMembership("NO", "efta")).toBe(true);
    expect(hasMembership("NO", "eu")).toBe(false);

    const surfaced = surfacePolicies(profileWith({ country: "NO" }));
    const ids = surfaced.map((entry) => entry.record.id);
    expect(ids).toContain("eea-transfers");
    expect(ids).toContain("efta-facilitation");
  });

  it("keeps Switzerland out of an EEA conclusion and gives it its own review", () => {
    expect(hasMembership("CH", "efta")).toBe(true);
    expect(hasMembership("CH", "eea")).toBe(false);
    const ids = surfacePolicies(profileWith({ country: "CH" })).map((entry) => entry.record.id);
    expect(ids).toContain("swiss-review");
    expect(ids).toContain("efta-facilitation");
    expect(ids).not.toContain("eea-transfers");
  });

  it("resolves Europe to actual countries rather than a region", () => {
    const european = COUNTRIES.filter((country) => country.region === "europe" || country.region === "nordics");
    expect(european.length).toBeGreaterThan(5);
    // Three different combinations, deliberately.
    expect(COUNTRIES.find((c) => c.code === "DE")!.memberships).toContain("eu");
    expect(COUNTRIES.find((c) => c.code === "NO")!.memberships).not.toContain("eu");
    expect(COUNTRIES.find((c) => c.code === "CH")!.memberships).not.toContain("eea");
  });
});

describe("policy surfacing", () => {
  it("triggers an EEA review for a US company processing EEA data", () => {
    const profile = profileWith({
      country: "US",
      privacy: { dataOriginMarkets: ["DE"], servingMarkets: [], receivingEntity: "not-decided", indiaRemoteAccess: "yes", regulatedActivities: [] },
    });
    const eea = surfacePolicies(profile).find((entry) => entry.record.id === "eea-transfers");
    expect(eea).toBeTruthy();
    expect(eea!.reason).toContain("originating in the EEA");
  });

  it("keeps unknown answers as unknown rather than resolving them either way", () => {
    const profile = profileWith({ country: "GB" });
    const dcc = surfacePolicies(profile).find((entry) => entry.record.id === "uk-dcc")!;
    expect(dcc.status).toBe("more-information-needed");
    expect(dcc.status).not.toBe("criteria-not-met");
  });

  it("assumes no DCC benefit for a UK company that posts nobody", () => {
    const profile = profileWith({ country: "GB", mobility: { postingWorkers: "no" } });
    const dcc = surfacePolicies(profile).find((entry) => entry.record.id === "uk-dcc")!;
    expect(dcc.status).toBe("criteria-not-met");
    expect(dcc.record.modeledValue).toBe(0);
  });

  it("never models a value for any policy record and never reports an eligible state", () => {
    POLICY_RECORDS.forEach((record) => expect(record.modeledValue).toBe(0));
    const profile = profileWith({ country: "GB", city: "bengaluru", mobility: { postingWorkers: "yes", assignmentStart: "2026-09-01", expectedDurationMonths: 24, preExisting: "no" } });
    surfacePolicies(profile).forEach((entry) => {
      expect(["potentially-relevant", "more-information-needed", "criteria-not-met", "expired-or-awaiting-review"]).toContain(entry.status);
      expect(entry.record.modeledValue).toBe(0);
    });
  });

  it("tells a Bengaluru team the Beyond Bengaluru track does not apply to them", () => {
    const surfaced = surfacePolicies(profileWith({ country: "US", city: "bengaluru" }));
    const beyond = surfaced.find((entry) => entry.record.id === "karnataka-beyond-bengaluru")!;
    const statewide = surfaced.find((entry) => entry.record.id === "karnataka-statewide")!;

    // Not "we don't know" - a location-defined track and a Bengaluru location
    // is a conclusion the model can actually reach.
    expect(beyond.status).toBe("criteria-not-met");
    expect(beyond.reason).toContain("does not receive it");
    expect(beyond.record.qualifyingGeography).not.toContain("Bengaluru");
    expect(beyond.record.qualifyingGeography).toContain("Mysuru");

    expect(statewide.status).toBe("more-information-needed");
    expect(beyond.record.modeledValue).toBe(0);
    expect(statewide.record.modeledValue).toBe(0);
  });

  it("keeps Gurugram and Noida in separate policy jurisdictions", () => {
    expect(findCity("gurugram")!.policyJurisdiction).toBe("Haryana");
    expect(findCity("noida")!.policyJurisdiction).toBe("Uttar Pradesh");
  });

  it("reads a phased provision against the case's own start date", () => {
    const soon = surfacePolicies(profileWith({ country: "US", startDate: "2026-10-01" }))
      .find((entry) => entry.record.id === "india-dpdp")!;
    const later = surfacePolicies(profileWith({ country: "US", startDate: "2027-09-01" }))
      .find((entry) => entry.record.id === "india-dpdp")!;

    // Institutional provisions are live in both; the substantive obligations
    // are not yet live for the earlier start and are for the later one.
    expect(soon.commencementAtStart!.inForce).toHaveLength(1);
    expect(soon.commencementAtStart!.notYet.length).toBeGreaterThan(0);
    expect(later.commencementAtStart!.inForce.length).toBeGreaterThan(soon.commencementAtStart!.inForce.length);
    expect(later.commencementAtStart!.notYet).toHaveLength(0);
  });

  it("surfaces the adverse side of the UK convention for a pre-existing India-to-UK assignment", () => {
    const surfaced = surfacePolicies(
      profileWith({
        country: "GB",
        mobility: { postingWorkers: "yes", direction: "india-to-hq", preExisting: "yes", expectedDurationMonths: 12 },
      }),
    );
    const dcc = surfaced.find((entry) => entry.record.id === "uk-dcc")!;
    expect(dcc.reason).toContain("not to be a detached worker");
    expect(dcc.reason).toContain("cost to check, not a saving to claim");
  });

  it("says an assignment longer than the detached-worker period is not covered for its whole length", () => {
    const dcc = surfacePolicies(
      profileWith({
        country: "GB",
        mobility: {
          postingWorkers: "yes",
          direction: "hq-to-india",
          preExisting: "no",
          assignmentStart: "2026-10-01",
          expectedDurationMonths: 72,
        },
      }),
    ).find((entry) => entry.record.id === "uk-dcc")!;
    expect(dcc.status).toBe("criteria-not-met");
    expect(dcc.reason).toContain("60 months");
  });

  it("names the certificate process and the entity distinction that decide these two", () => {
    const surfaced = surfacePolicies(profileWith({ country: "GB", mobility: { postingWorkers: "yes", direction: "hq-to-india", preExisting: "no", assignmentStart: "2026-10-01", expectedDurationMonths: 24 } }));
    const dcc = surfaced.find((entry) => entry.record.id === "uk-dcc")!;
    const gst = surfaced.find((entry) => entry.record.id === "gst-export-services")!;

    expect(dcc.record.summary).toContain("CA9107");
    expect(dcc.record.secondaryUrl).toContain("ca9107");
    expect(dcc.record.excludedCriteria.join(" ")).toContain("Locally hired Indian employees");
    expect(gst.record.summary).toContain("separate persons");
    expect(gst.record.qualifyingEntity).toContain("branch or liaison office");
  });
});

describe("readiness", () => {
  const answerAll = (answer: ReadinessAnswer): Record<string, ReadinessAnswer> =>
    Object.fromEntries(READINESS_QUESTIONS.map((question) => [question.id, answer]));

  it("cannot reach ready through unanswered questions", () => {
    const partial = { "mandate-scope": "in-place" as ReadinessAnswer };
    const result = assessReadiness(partial);
    expect(result.verdict).toBe("incomplete");
    expect(result.coverage).toBeLessThan(1);
    expect(result.verdictExplanation).toContain("not a pass");
  });

  it("cannot reach ready while a gate is open, however high the average", () => {
    const answers = answerAll("in-place");
    answers["funding-owner"] = "not-in-place";
    const result = assessReadiness(answers);
    expect(result.coverage).toBe(1);
    expect(result.legacyScore).toBeGreaterThan(30);
    expect(result.verdict).toBe("not-ready");
    expect(result.openGates.map((gate) => gate.questionId)).toContain("funding-owner");
  });

  it("reaches ready only when everything is answered and no gate is open", () => {
    const result = assessReadiness(answerAll("in-place"));
    expect(result.verdict).toBe("ready");
    expect(result.openGates).toHaveLength(0);
    expect(result.verdictExplanation).toContain("not a prediction");
  });

  it("publishes the legacy score with its rubric and never calls it validated", () => {
    const result = assessReadiness(answerAll("partly"));
    expect(result.legacyScoreRubric).toContain("not valid at all unless coverage is 100%");
    expect(result.legacyScoreRubric).not.toContain("validated");
  });

  it("asks nothing about revenue, so a funded pre-revenue company can answer it", () => {
    const text = READINESS_QUESTIONS.map((question) => `${question.question} ${question.why}`).join(" ").toLowerCase();
    expect(text).not.toContain("revenue");
    expect(text).not.toContain("turnover");
  });
});

describe("team proposals", () => {
  const answers = {
    workload: "genai-application" as const,
    stage: "prototype" as const,
    hqCapabilities: [],
    dataReadiness: "ready" as const,
    deliveryObjective: "own-a-product" as const,
    responsibilityOwner: "hq-lead" as const,
    budgetCeilingMonthly: null,
  };

  it("names the rule behind every recommendation and qualifies the quantities", () => {
    const proposal = proposeTeam(answers)!;
    expect(proposal.recommendations.length).toBeGreaterThan(0);
    proposal.recommendations.forEach((recommendation) => {
      expect(recommendation.ruleId).toBeTruthy();
      expect(recommendation.ruleVersion).toBeTruthy();
      expect(recommendation.triggeringInputs.length).toBeGreaterThan(0);
    });
    expect(proposal.recommendations[0].explanation).toContain("pending NeoIntelli practitioner sign-off");
  });

  it("does not propose a role HQ already covers", () => {
    const proposal = proposeTeam({ ...answers, hqCapabilities: ["qa"] })!;
    expect(proposal.seats.some((seat) => seat.roleKey === "qa")).toBe(false);
    expect(proposal.removed.some((entry) => entry.seat.roleKey === "qa")).toBe(true);
  });

  it("adds a data seat when the data is not ready", () => {
    const proposal = proposeTeam({ ...answers, dataReadiness: "not-ready" })!;
    expect(proposal.seats.some((seat) => seat.roleKey === "dataeng")).toBe(true);
    expect(proposal.recommendations.some((recommendation) => recommendation.ruleId === "data-readiness-gap")).toBe(true);
  });

  it("covers evaluation, security and data ownership in every template", () => {
    const proposal = proposeTeam(answers)!;
    const responsibilities = proposal.template.responsibilities.join(" ");
    expect(responsibilities).toContain("Evaluation");
    expect(responsibilities).toContain("Secure handling");
    expect(responsibilities).toContain("ownership of the datasets");
  });

  it("produces a diff that can be previewed and undone rather than an overwrite", () => {
    const current = [createTeamRow({ id: "a", roleKey: "ai", seniority: "senior", fte: 1 })];
    const proposed = proposalToRows(proposeTeam(answers)!);
    const diff = diffTeam(current, proposed);
    expect(diff.unchanged.some((entry) => entry.roleKey === "ai" && entry.seniority === "senior")).toBe(true);
    expect(diff.added.length).toBeGreaterThan(0);
    // The current team is untouched by computing a diff.
    expect(current).toHaveLength(1);
  });
});

describe("city comparison", () => {
  it("does not produce a numeric fit score in this release", () => {
    expect(NUMERIC_FIT_SCORING_ENABLED).toBe(false);
    const comparison = compareCities(["bengaluru", "chennai"], ["cost"], () => 1000);
    expect(comparison.scoringNote).toContain("no overall fit score");
    expect(JSON.stringify(comparison.rows)).not.toMatch(/"score"/);
  });

  it("marks an unmodelled city as insufficient evidence rather than ranking it", () => {
    const comparison = compareCities(["bengaluru", "mumbai"], ["cost"], (city) => (city === "bengaluru" ? 1000 : 500));
    const mumbai = comparison.rows.find((row) => row.record.key === "mumbai")!;
    expect(mumbai.insufficientEvidence).toBe(true);
    expect(mumbai.modelledMonthly).toBeNull();
    expect(comparison.unpriceable).toContain("mumbai");
  });

  it("discloses where NeoIntelli actually is and does not imply an office elsewhere", () => {
    const comparison = compareCities(["hyderabad", "chennai"], ["cost"], () => 1000);
    expect(comparison.presenceDisclosure).toContain("Bengaluru");
    comparison.rows.forEach((row) => expect(row.record.neoIntelliPresence).toBe(false));
  });
});

describe("entry arrangements", () => {
  const base: ArrangementInputs = {
    scale: "micro-centre",
    employer: "undecided",
    accountability: "undecided",
    ownership: "undecided",
    operations: "undecided",
    entityReady: "no",
    ownershipRequired: "preferred",
    urgency: "3-6-months",
    accountableLeader: "yes",
    budgetHorizon: "12-24-months",
    deliveryMaturity: "developing",
    willingToRunOperations: "yes",
  };

  it("can return insufficient information", () => {
    const result = recommendPathway({
      ...base,
      entityReady: "unknown",
      ownershipRequired: "unknown",
      accountableLeader: "unknown",
      budgetHorizon: "unknown",
    });
    expect(result.insufficientInformation).toBe(true);
    expect(result.primary!.confidence).toBe("insufficient-evidence");
  });

  it("can recommend deferring the centre", () => {
    const result = recommendPathway({ ...base, accountableLeader: "no" });
    expect(result.primary!.ruleId).toBe("defer-no-owner");
    expect(result.primary!.headline).toContain("Defer");
  });

  it("can recommend a limited pod", () => {
    const result = recommendPathway({ ...base, budgetHorizon: "under-12-months" });
    expect(result.primary!.headline).toContain("limited pod");
  });

  it("does not always recommend a NeoIntelli-managed option", () => {
    const direct = recommendPathway({ ...base, ownershipRequired: "required", entityReady: "yes" });
    expect(direct.primary!.ruleId).toBe("direct-gcc");
  });

  it("always returns questions that would change the answer", () => {
    [base, { ...base, accountableLeader: "no" as const }, { ...base, ownershipRequired: "required" as const, entityReady: "yes" as const }].forEach((inputs) => {
      expect(recommendPathway(inputs).decidingQuestions.length).toBeGreaterThan(0);
    });
  });
});

describe("launch plan", () => {
  const teamProfile = (patch: Partial<Profile>) =>
    createProfile({
      country: "US",
      team: [createTeamRow({ roleKey: "ai", seniority: "senior", fte: 1, startMonth: 1 })],
      ...patch,
    });

  it("puts the first delivery milestone behind the access controls when personal data is in scope", () => {
    const profile = teamProfile({
      privacy: { dataOriginMarkets: ["DE"], servingMarkets: [], receivingEntity: "client-entity", indiaRemoteAccess: "yes", regulatedActivities: [] },
    });
    const plan = buildLaunchPlan(profile, createScenario(profile));
    const controls = plan.tasks.find((task) => task.id === "access-controls")!;
    const delivery = plan.tasks.find((task) => task.id === "first-delivery")!;
    expect(delivery.prerequisites).toContain("access-controls");
    expect(delivery.startDay).toBeGreaterThanOrEqual(controls.endDay);
  });

  it("recomputes dependent dates when the data answer changes", () => {
    const withData = teamProfile({
      privacy: { dataOriginMarkets: ["DE"], servingMarkets: [], receivingEntity: "client-entity", indiaRemoteAccess: "yes", regulatedActivities: [] },
    });
    const withoutData = teamProfile({
      privacy: { dataOriginMarkets: [], servingMarkets: [], receivingEntity: "client-entity", indiaRemoteAccess: "no", regulatedActivities: [] },
    });
    const a = buildLaunchPlan(withData, createScenario(withData));
    const b = buildLaunchPlan(withoutData, createScenario(withoutData));
    expect(a.tasks.find((task) => task.id === "first-delivery")!.startDay).toBeGreaterThan(
      b.tasks.find((task) => task.id === "first-delivery")!.startDay,
    );
  });

  it("says when the plan runs past ninety days instead of compressing it", () => {
    const profile = teamProfile({ ownership: "own-from-day-one", workModel: "office" });
    const plan = buildLaunchPlan(profile, createScenario(profile));
    if (plan.runsPastNinetyDays) {
      expect(plan.note).toContain(`day ${plan.lastDay}`);
    } else {
      expect(plan.note).toContain("not when the centre is fully operational");
    }
  });

  it("turns missing evidence into validation tasks", () => {
    const profile = teamProfile({});
    const plan = buildLaunchPlan(profile, createScenario(profile), ["Recruitment cost per hire"]);
    expect(plan.tasks.some((task) => task.title === "Validate: Recruitment cost per hire")).toBe(true);
  });

  it("runs independent workstreams in parallel rather than in a queue", () => {
    const profile = teamProfile({});
    const plan = buildLaunchPlan(profile, createScenario(profile));
    const roleDefs = plan.tasks.find((task) => task.id === "role-definitions")!;
    const rhythm = plan.tasks.find((task) => task.id === "operating-rhythm")!;
    expect(roleDefs.startDay).toBe(0);
    expect(rhythm.startDay).toBe(0);
  });
});

describe("working-hour overlap", () => {
  const summer = new Date("2026-07-15T12:00:00Z");
  const winter = new Date("2026-01-15T12:00:00Z");

  it("gives different US cities different overlaps", () => {
    const ny = workingOverlap("America/New_York", summer);
    const la = workingOverlap("America/Los_Angeles", summer);
    expect(ny.indiaAheadHours).not.toBe(la.indiaAheadHours);
  });

  it("accounts for daylight saving, which India does not observe", () => {
    const summerOffset = workingOverlap("Europe/London", summer).indiaAheadHours;
    const winterOffset = workingOverlap("Europe/London", winter).indiaAheadHours;
    expect(summerOffset).toBe(4.5);
    expect(winterOffset).toBe(5.5);
  });

  it("reports an unavailable reason rather than a zero when a zone is missing", () => {
    const result = workingOverlap(undefined, summer);
    expect(result.unavailableReason).toBeTruthy();
  });

  it("responds to a changed India schedule", () => {
    const standard = workingOverlap("America/Los_Angeles", summer, { start: 9, end: 17 }, { start: 10, end: 19 });
    const shifted = workingOverlap("America/Los_Angeles", summer, { start: 9, end: 17 }, { start: 14, end: 23 });
    expect(shifted.hours).toBeGreaterThan(standard.hours);
  });
});

describe("published anchors and local legibility", () => {
  it("offers published figures with their scope and a real source, and adopts none of them by default", () => {
    [...ESCALATION_ANCHORS, ...ATTRITION_ANCHORS].forEach((anchor) => {
      const source = findSource(anchor.sourceId);
      expect(source, `${anchor.id} names a source that exists`).toBeTruthy();
      expect(source!.url).toBeTruthy();
      // The scope caveat is the point: an all-industry figure is not a GCC figure.
      expect(anchor.scope.length).toBeGreaterThan(40);
      expect(anchor.value).toBeGreaterThan(0);
      expect(anchor.value).toBeLessThan(1);
    });

    // None of them is the model's default. Attrition stays unmodelled until
    // somebody chooses, and escalation keeps its own stated assumption.
    const profile = createProfile({ country: "US" });
    const scenario = createScenario(profile);
    expect(scenario.costAssumptions.attritionRate).toBeUndefined();
    expect(scenario.costAssumptions.salaryEscalation).toBeUndefined();
    expect(ESCALATION_ANCHORS.map((a) => a.value)).not.toContain(OPERATING_BANDS.salaryEscalation.base);
  });

  it("says how to obtain every figure it refuses to invent", () => {
    expect(NOT_BUDGETED.length).toBeGreaterThan(5);
    NOT_BUDGETED.forEach((item) => {
      expect(item.howToGetIt.length, `${item.category} explains how to get the figure`).toBeGreaterThan(60);
      // Guidance, not a number: this must never become a smuggled default.
      expect(item.howToGetIt).not.toMatch(/\$\s?\d|₹\s?\d|\d+\s?(LPA|lakh)/i);
    });
  });

  it("quotes a seat in lakh per annum on a CTC basis, the way the market does", () => {
    const profile = createProfile({
      country: "US",
      city: "bengaluru",
      team: [createTeamRow({ roleKey: "ai", seniority: "senior", compensationBasis: "base-salary" })],
    });
    const scenario = createScenario(profile);
    const ctc = seatAnnualCtcInr(profile.team[0], profile.city, scenario, 0.3);

    expect(ctc).not.toBeNull();
    // Base salary plus the top-up, in rupees - not the base figure.
    expect(ctc!).toBeGreaterThan(1_000_000);
    expect(formatLakh(ctc!)).toMatch(/^₹\d+(\.\d)?L$/);
    expect(formatLakh(15_000_000)).toBe("₹1.50 Cr");
    expect(formatLakh(null)).toBe("Not available");
  });

  it("returns no CTC figure at all for a seat it cannot price", () => {
    const profile = createProfile({
      country: "US",
      city: "mumbai",
      team: [createTeamRow({ roleKey: "ai", seniority: "senior", compensationBasis: "base-salary" })],
    });
    expect(seatAnnualCtcInr(profile.team[0], profile.city, createScenario(profile), 0.3)).toBeNull();
  });
});
