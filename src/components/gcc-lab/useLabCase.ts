/**
 * The workspace's state.
 *
 * One case (a profile), up to three scenarios over it, and the derived results.
 * Everything the four areas render comes from here, so switching between Team
 * & cost, Compare, Prepare and Decision pack never loses an input and never
 * shows two areas a different number.
 *
 * Three behaviours are deliberate:
 *
 *   - Editing an input invalidates the derived results by construction: they
 *     are memoized on the inputs, so there is no cache to go stale.
 *   - Applying a suggestion pushes the previous state onto an undo stack. A
 *     proposal never silently overwrites something the visitor typed.
 *   - Nothing is written to the device until the visitor asks. The default is
 *     memory for this tab and nothing else.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { computeCostBand, computeCostResult } from "@/lib/gcc-lab/costModel";
import { computeEconomics } from "@/lib/gcc-lab/economics";
import { buildSnapshot } from "@/lib/gcc-lab/snapshot";
import { buildRiskRegister } from "@/lib/gcc-lab/risk";
import { assessReadiness } from "@/lib/gcc-lab/readiness";
import { buildLaunchPlan } from "@/lib/gcc-lab/launchPlan";
import { surfacePolicies } from "@/lib/gcc-lab/policy";
import { createProfile, createScenario, newId } from "@/lib/gcc-lab/profile";
import { suggestedCurrency } from "@/lib/gcc-lab/countries";
import { clearCase, loadCase, saveCase, storageAvailability, type DeepLinkArea, type SaveResult } from "@/lib/gcc-lab/storage";
import { trackEvent } from "@/lib/analytics";
import type { PlanTask, Profile, Scenario, TeamRow } from "@/lib/gcc-lab/types";

export const MAX_SCENARIOS = 3;

interface Checkpoint {
  profile: Profile;
  scenarios: Scenario[];
  label: string;
}

export interface LabCase {
  profile: Profile;
  scenarios: Scenario[];
  activeScenario: Scenario;
  activeScenarioId: string;
  area: DeepLinkArea;
  setArea: (area: DeepLinkArea) => void;

  updateProfile: (patch: Partial<Profile>) => void;
  updateScenario: (patch: Partial<Scenario>) => void;
  updateCostAssumption: (patch: Partial<Scenario["costAssumptions"]>) => void;
  setActiveScenario: (id: string) => void;
  cloneScenario: (label: string) => void;
  removeScenario: (id: string) => void;

  setTeam: (team: TeamRow[], label: string) => void;
  updateTeamRow: (id: string, patch: Partial<TeamRow>) => void;
  removeTeamRow: (id: string) => void;
  addTeamRow: (row: TeamRow) => void;

  undo: (() => void) | null;
  undoLabel: string | null;

  planStatuses: Record<string, PlanTask["status"]>;
  setPlanStatus: (id: string, status: PlanTask["status"]) => void;

  /** True once the visitor has a team and has therefore seen a real number. */
  hasEstimate: boolean;

  save: () => SaveResult;
  restore: () => string | null;
  forget: () => void;
  storageState: ReturnType<typeof storageAvailability>;
  savedAt: string | null;
}

const initialProfile = (): Profile => createProfile({ country: "UNKNOWN", displayCurrency: "USD" });

export function useLabCase(): LabCase {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [scenarios, setScenarios] = useState<Scenario[]>(() => [createScenario(initialProfile(), { label: "Base" })]);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(() => scenarios[0].id);
  const [area, setAreaState] = useState<DeepLinkArea>("team");
  const [planStatuses, setPlanStatuses] = useState<Record<string, PlanTask["status"]>>({});
  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const estimateTracked = useRef(false);

  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];

  const touch = useCallback((next: Profile): Profile => ({ ...next, updatedAt: new Date().toISOString() }), []);

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => {
      setProfile((current) => {
        const next = touch({ ...current, ...patch });
        // The display currency follows the country until the visitor changes
        // it themselves; after that it is their choice and stays put.
        if (patch.country && patch.displayCurrency === undefined) {
          next.displayCurrency = suggestedCurrency(patch.country);
        }
        return next;
      });
    },
    [touch],
  );

  const updateScenario = useCallback(
    (patch: Partial<Scenario>) => {
      setScenarios((current) =>
        current.map((scenario) => (scenario.id === activeScenarioId ? { ...scenario, ...patch } : scenario)),
      );
    },
    [activeScenarioId],
  );

  const updateCostAssumption = useCallback(
    (patch: Partial<Scenario["costAssumptions"]>) => {
      setScenarios((current) =>
        current.map((scenario) =>
          scenario.id === activeScenarioId
            ? { ...scenario, costAssumptions: { ...scenario.costAssumptions, ...patch } }
            : scenario,
        ),
      );
      trackEvent("assumption_changed", { field: Object.keys(patch)[0] ?? "unknown" });
    },
    [activeScenarioId],
  );

  const setTeam = useCallback(
    (team: TeamRow[], label: string) => {
      setCheckpoint({ profile, scenarios, label });
      setProfile((current) => touch({ ...current, team }));
    },
    [profile, scenarios, touch],
  );

  const updateTeamRow = useCallback(
    (id: string, patch: Partial<TeamRow>) => {
      setProfile((current) =>
        touch({ ...current, team: current.team.map((row) => (row.id === id ? { ...row, ...patch } : row)) }),
      );
    },
    [touch],
  );

  const removeTeamRow = useCallback(
    (id: string) => {
      setProfile((current) => touch({ ...current, team: current.team.filter((row) => row.id !== id) }));
    },
    [touch],
  );

  const addTeamRow = useCallback(
    (row: TeamRow) => {
      setProfile((current) => touch({ ...current, team: [...current.team, row] }));
    },
    [touch],
  );

  const undo = useMemo(() => {
    if (!checkpoint) return null;
    return () => {
      setProfile(checkpoint.profile);
      setScenarios(checkpoint.scenarios);
      setCheckpoint(null);
    };
  }, [checkpoint]);

  const cloneScenario = useCallback(
    (label: string) => {
      setScenarios((current) => {
        if (current.length >= MAX_SCENARIOS) return current;
        const source = current.find((scenario) => scenario.id === activeScenarioId) ?? current[0];
        const clone: Scenario = { ...source, id: newId("scenario"), label };
        setActiveScenarioId(clone.id);
        return [...current, clone];
      });
      trackEvent("scenario_compared", { action: "clone" });
    },
    [activeScenarioId],
  );

  const removeScenario = useCallback((id: string) => {
    setScenarios((current) => {
      if (current.length <= 1) return current;
      const next = current.filter((scenario) => scenario.id !== id);
      setActiveScenarioId((active) => (active === id ? next[0].id : active));
      return next;
    });
  }, []);

  const setArea = useCallback((next: DeepLinkArea) => {
    setAreaState(next);
    if (next === "compare") trackEvent("scenario_compared", { action: "open" });
  }, []);

  const setPlanStatus = useCallback((id: string, status: PlanTask["status"]) => {
    setPlanStatuses((current) => ({ ...current, [id]: status }));
  }, []);

  const save = useCallback((): SaveResult => {
    const result = saveCase(profile, scenarios, activeScenarioId);
    if (result.ok && result.savedAt) setSavedAt(result.savedAt);
    return result;
  }, [profile, scenarios, activeScenarioId]);

  const restore = useCallback((): string | null => {
    const result = loadCase();
    if (result.status === "loaded" && result.saved) {
      setProfile(result.saved.profile);
      setScenarios(result.saved.scenarios);
      setActiveScenarioId(result.saved.activeScenarioId);
      setSavedAt(result.saved.savedAt);
      return null;
    }
    return result.message ?? null;
  }, []);

  const forget = useCallback(() => {
    clearCase();
    setSavedAt(null);
  }, []);

  const hasEstimate = profile.team.length > 0;
  if (hasEstimate && !estimateTracked.current) {
    estimateTracked.current = true;
    trackEvent("first_estimate_viewed", { seats: profile.team.length > 10 ? "10+" : String(profile.team.length) });
  }

  return {
    profile,
    scenarios,
    activeScenario,
    activeScenarioId,
    area,
    setArea,
    updateProfile,
    updateScenario,
    updateCostAssumption,
    setActiveScenario: setActiveScenarioId,
    cloneScenario,
    removeScenario,
    setTeam,
    updateTeamRow,
    removeTeamRow,
    addTeamRow,
    undo,
    undoLabel: checkpoint?.label ?? null,
    planStatuses,
    setPlanStatus,
    hasEstimate,
    save,
    restore,
    forget,
    storageState: storageAvailability(),
    savedAt,
  };
}

/** The derived results for one scenario. Memoized on the inputs that produce them. */
export function useLabResults(profile: Profile, scenario: Scenario, planStatuses: Record<string, PlanTask["status"]>) {
  const cost = useMemo(() => computeCostResult(profile, scenario), [profile, scenario]);
  const band = useMemo(() => computeCostBand(profile, scenario), [profile, scenario]);
  const economics = useMemo(() => computeEconomics(profile, scenario, cost), [profile, scenario, cost]);
  const readiness = useMemo(() => assessReadiness(profile.readiness), [profile.readiness]);
  const risks = useMemo(() => buildRiskRegister(profile, scenario, cost, economics), [profile, scenario, cost, economics]);
  const policies = useMemo(() => surfacePolicies(profile), [profile]);
  const snapshot = useMemo(() => buildSnapshot(profile, scenario), [profile, scenario]);
  const plan = useMemo(
    () => buildLaunchPlan(profile, scenario, snapshot.openQuestions.slice(0, 4), planStatuses),
    [profile, scenario, snapshot.openQuestions, planStatuses],
  );

  return { cost: band ? { ...cost, steadyStateBand: band } : cost, economics, readiness, risks, policies, plan, snapshot };
}
