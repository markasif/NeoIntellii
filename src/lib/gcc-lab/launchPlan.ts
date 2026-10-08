/**
 * The launch planner.
 *
 * A configurable plan for the first ninety days - not a promise that a centre
 * is operational on day 90. Larger teams simply run past it, and the plan says
 * so rather than compressing to fit the number in the heading.
 *
 * Tasks carry prerequisites, and dates are computed from those prerequisites
 * rather than typed in. That is what makes one constraint propagate: the first
 * delivery task that touches personal data cannot start before the access
 * controls and the data protection review are done, so answering "yes, the
 * team needs personal data" moves the delivery date, visibly, rather than
 * adding a warning next to an unchanged plan.
 *
 * Workstreams overlap. A transfer, where one is intended, sits outside this
 * plan entirely unless the visitor builds a scenario for it.
 */

import type { PlanTask, Profile, Scenario } from "./types";

export const PLAN_RULES_VERSION = "plan-rules-1.0.0";

interface TaskSeed extends Omit<PlanTask, "startDay" | "endDay" | "status"> {
  /** Days after the scenario start before this can begin, regardless of prerequisites. */
  earliestDay?: number;
}

const WORKING_DAYS_PER_WEEK = 5;

/** Calendar days for a working-day estimate. Weekends are not working days. */
const calendarDays = (workingDays: number): number => Math.ceil((workingDays / WORKING_DAYS_PER_WEEK) * 7);

function seeds(profile: Profile, scenario: Scenario): TaskSeed[] {
  const list: TaskSeed[] = [];
  const providerEmployed = scenario.engagement === "neointelli-managed" || profile.ownership === "provider-employed";
  const needsPersonalData = profile.privacy.indiaRemoteAccess === "yes" || profile.privacy.dataOriginMarkets.length > 0;
  const dataAnswerUnknown = profile.privacy.indiaRemoteAccess === "unknown";
  const entityNeeded = !providerEmployed;

  /* --------------------------------------------------------- legal entity */

  if (entityNeeded) {
    list.push({
      id: "entity-structure",
      workstream: "legal-entity",
      title: "Decide the entity structure and appoint advisers",
      ownerRole: "Legal / Finance",
      prerequisites: [],
      durationDays: { low: 5, high: 15 },
      sourceRule: "entity-required",
    });
    list.push({
      id: "entity-incorporate",
      workstream: "legal-entity",
      title: "Incorporate and complete statutory registrations",
      ownerRole: "Legal",
      prerequisites: ["entity-structure"],
      durationDays: { low: 20, high: 60 },
      sourceRule: "entity-required",
      note: "The range is wide because it depends on your structure and on filings outside your control. Treat the high end as the planning figure.",
    });
    list.push({
      id: "payroll-setup",
      workstream: "legal-entity",
      title: "Set up payroll, statutory registrations and banking",
      ownerRole: "Finance",
      prerequisites: ["entity-incorporate"],
      durationDays: { low: 10, high: 25 },
      sourceRule: "entity-required",
    });
  } else {
    list.push({
      id: "employment-arrangement",
      workstream: "legal-entity",
      title: "Agree the employment arrangement and the contract terms",
      ownerRole: "Legal",
      prerequisites: [],
      durationDays: { low: 5, high: 20 },
      sourceRule: "provider-employed",
      note: "Settle IP assignment, security obligations and delivery accountability here. The employment arrangement itself decides none of them.",
    });
  }

  list.push({
    id: "ip-assignment",
    workstream: "governance",
    title: "Settle IP assignment for work created in India",
    ownerRole: "Legal",
    prerequisites: entityNeeded ? ["entity-structure"] : ["employment-arrangement"],
    durationDays: { low: 5, high: 15 },
    sourceRule: "always",
  });

  /* -------------------------------------------------------------- hiring */

  list.push({
    id: "role-definitions",
    workstream: "hiring",
    title: "Write the role definitions and the interview loop",
    ownerRole: "Hiring owner",
    prerequisites: [],
    durationDays: { low: 5, high: 10 },
    sourceRule: "always",
  });

  const leadFirst = profile.team.some((row) => row.seniority === "lead" || row.seniority === "senior");
  if (leadFirst) {
    list.push({
      id: "hire-lead",
      workstream: "hiring",
      title: "Hire the first senior or lead engineer",
      ownerRole: "Hiring owner",
      prerequisites: ["role-definitions"],
      durationDays: { low: 30, high: 75 },
      sourceRule: "senior-first",
      note: "No time-to-hire figure is published in this model. This range is a planning assumption; replace it with your own recruiter's data.",
    });
  }

  const waves = Array.from(new Set(profile.team.map((row) => row.startMonth))).sort((a, b) => a - b);
  waves.slice(0, 3).forEach((month, index) => {
    const count = profile.team.filter((row) => row.startMonth === month).length;
    list.push({
      id: `hire-wave-${index + 1}`,
      workstream: "hiring",
      title: `Hiring wave ${index + 1}: ${count} seat(s) starting month ${month}`,
      ownerRole: "Hiring owner",
      prerequisites: leadFirst && index === 0 ? ["hire-lead", "role-definitions"] : ["role-definitions"],
      durationDays: { low: 30, high: 60 },
      earliestDay: (month - 1) * 30 - 60,
      sourceRule: "hiring-waves",
    });
  });

  /* ------------------------------------------------------- workplace & IT */

  list.push({
    id: "workplace",
    workstream: "workplace-it",
    title: profile.workModel === "remote" ? "Set up remote working, equipment and allowances" : "Secure workspace",
    ownerRole: "Operations",
    prerequisites: [],
    durationDays: profile.workModel === "remote" ? { low: 5, high: 15 } : { low: 15, high: 40 },
    sourceRule: `work-model-${profile.workModel}`,
  });

  list.push({
    id: "it-baseline",
    workstream: "workplace-it",
    title: "Provision devices, identity and endpoint security",
    ownerRole: "IT",
    prerequisites: entityNeeded ? ["entity-incorporate"] : ["employment-arrangement"],
    durationDays: { low: 10, high: 20 },
    sourceRule: "always",
  });

  /* -------------------------------------------------------- data security */

  if (dataAnswerUnknown) {
    list.push({
      id: "data-scope-decision",
      workstream: "data-security",
      title: "Establish whether the India team needs access to personal data",
      ownerRole: "Data protection owner",
      prerequisites: [],
      durationDays: { low: 3, high: 10 },
      sourceRule: "data-scope-unknown",
      note: "Until this is answered the rest of the data workstream cannot be planned, and neither can the first delivery task.",
    });
  }

  if (needsPersonalData || dataAnswerUnknown) {
    list.push({
      id: "data-review",
      workstream: "data-security",
      title: "Data protection review: transfer basis, mechanism and receiving entity",
      ownerRole: "Data protection adviser",
      prerequisites: dataAnswerUnknown ? ["data-scope-decision"] : [],
      durationDays: { low: 10, high: 30 },
      sourceRule: "personal-data-in-scope",
      note: "This is a professional review. The workspace flags that it is needed; it does not make the determination.",
    });
    list.push({
      id: "access-controls",
      workstream: "data-security",
      title: "Implement access controls, logging and least-privilege roles",
      ownerRole: "IT / Security",
      prerequisites: ["data-review", "it-baseline"],
      durationDays: { low: 10, high: 25 },
      sourceRule: "personal-data-in-scope",
    });
  }

  /* ------------------------------------------------------------- delivery */

  list.push({
    id: "delivery-environment",
    workstream: "delivery",
    title: "Development environment access from India",
    ownerRole: "HQ engineering",
    prerequisites: ["it-baseline"],
    durationDays: { low: 5, high: 20 },
    sourceRule: "always",
  });

  const firstDeliveryPrereqs = ["delivery-environment"];
  if (leadFirst) firstDeliveryPrereqs.push("hire-lead");
  if (needsPersonalData || dataAnswerUnknown) firstDeliveryPrereqs.push("access-controls");

  list.push({
    id: "first-delivery",
    workstream: "delivery",
    title: needsPersonalData || dataAnswerUnknown
      ? "First delivery milestone (requires the access controls to be in place)"
      : "First delivery milestone",
    ownerRole: "Delivery lead",
    prerequisites: firstDeliveryPrereqs,
    durationDays: { low: 20, high: 40 },
    sourceRule: "delivery-sequencing",
    note: needsPersonalData || dataAnswerUnknown
      ? "Sequenced behind the access controls on purpose: a first delivery that touches personal data cannot precede the review and the controls that gate it."
      : undefined,
  });

  /* ----------------------------------------------------------- governance */

  list.push({
    id: "operating-rhythm",
    workstream: "governance",
    title: "Agree the operating rhythm and reporting line",
    ownerRole: "Sponsor",
    prerequisites: [],
    durationDays: { low: 3, high: 10 },
    sourceRule: "always",
  });

  return list;
}

/** Validation tasks for the evidence the case is still missing. */
function validationSeeds(missingEvidence: string[]): TaskSeed[] {
  return missingEvidence.slice(0, 6).map((item, index) => ({
    id: `validate-${index}`,
    workstream: "governance" as const,
    title: `Validate: ${item}`,
    ownerRole: "Case owner",
    prerequisites: [],
    durationDays: { low: 2, high: 10 },
    sourceRule: "missing-evidence",
    note: "Raised because the case rests on something that has not been established.",
  }));
}

export interface LaunchPlan {
  tasks: PlanTask[];
  /** Day the last task ends. Often past 90, and reported rather than hidden. */
  lastDay: number;
  /** True when the plan does not fit inside ninety days. */
  runsPastNinetyDays: boolean;
  note: string;
}

/**
 * Schedules the tasks from their prerequisites.
 *
 * A task starts when its last prerequisite finishes; independent workstreams
 * therefore run in parallel rather than in a queue. The high end of each
 * duration range is used for scheduling, because a plan built on best cases is
 * not a plan.
 */
export function buildLaunchPlan(
  profile: Profile,
  scenario: Scenario,
  missingEvidence: string[] = [],
  statuses: Record<string, PlanTask["status"]> = {},
): LaunchPlan {
  const all = [...seeds(profile, scenario), ...validationSeeds(missingEvidence)];
  const byId = new Map(all.map((seed) => [seed.id, seed]));
  const scheduled = new Map<string, PlanTask>();

  const schedule = (id: string, seen: Set<string>): PlanTask | null => {
    const existing = scheduled.get(id);
    if (existing) return existing;
    const seed = byId.get(id);
    if (!seed) return null;
    // A prerequisite cycle would otherwise recurse forever. Treat it as no
    // prerequisite and carry on rather than failing the whole plan.
    if (seen.has(id)) return null;
    seen.add(id);

    const prerequisiteEnd = seed.prerequisites.reduce((latest, prerequisiteId) => {
      const prerequisite = schedule(prerequisiteId, seen);
      return prerequisite ? Math.max(latest, prerequisite.endDay) : latest;
    }, 0);

    const startDay = Math.max(prerequisiteEnd, seed.earliestDay ?? 0, 0);
    const task: PlanTask = {
      ...seed,
      startDay,
      endDay: startDay + calendarDays(seed.durationDays.high),
      status: statuses[seed.id] ?? "not-started",
    };
    scheduled.set(id, task);
    return task;
  };

  all.forEach((seed) => schedule(seed.id, new Set()));

  const tasks = Array.from(scheduled.values()).sort((a, b) => a.startDay - b.startDay || a.id.localeCompare(b.id));
  const lastDay = tasks.reduce((latest, task) => Math.max(latest, task.endDay), 0);

  return {
    tasks,
    lastDay,
    runsPastNinetyDays: lastDay > 90,
    note:
      lastDay > 90
        ? `On these inputs the plan runs to day ${lastDay}. That is a finding, not a scheduling failure - entity incorporation and specialist hiring routinely run past ninety days, and a plan that pretends otherwise is the one that slips.`
        : "On these inputs the plan fits inside ninety days. Day 90 is when this sequence completes, not when the centre is fully operational.",
  };
}

export const WORKSTREAM_LABELS: Record<PlanTask["workstream"], string> = {
  "legal-entity": "Legal and entity",
  hiring: "Hiring",
  "workplace-it": "Workplace and IT",
  "data-security": "Data and security",
  delivery: "Delivery",
  governance: "Governance",
};
