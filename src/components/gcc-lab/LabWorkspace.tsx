/**
 * The workspace shell: four areas, one case, one persistent result summary.
 *
 * The areas are tabs rather than a wizard on purpose. There is no obligatory
 * sequence, no completion percentage and no locked step - a visitor who only
 * wants a cost number gets one from the first area and never has to see the
 * other three.
 *
 * Layout: on desktop the editor sits beside a sticky result panel; on mobile
 * it is a single column with the result collapsed into a bar at the bottom.
 */

import { useEffect, useMemo, useRef } from "react";
import { Users, ChartNoAxesCombined, ListChecks, FileText } from "lucide-react";
import { convert } from "@/lib/gcc-lab/currency";
import { areaFromQuery, type DeepLinkArea } from "@/lib/gcc-lab/storage";
import { trackEvent } from "@/lib/analytics";
import TeamAndCostArea from "./TeamAndCostArea";
import CompareArea from "./CompareArea";
import PrepareArea from "./PrepareArea";
import DecisionPackArea from "./DecisionPackArea";
import ResultSummary from "./ResultSummary";
import { RecalculationAnnouncer } from "./primitives";
import { useLabCase, useLabResults } from "./useLabCase";

const AREA_ICONS = { team: Users, compare: ChartNoAxesCombined, prepare: ListChecks, pack: FileText };

const AREAS: { key: DeepLinkArea; label: string; description: string }[] = [
  { key: "team", label: "Team & cost", description: "Design the team and model the full cost" },
  { key: "compare", label: "Compare", description: "Baseline, economics, cities and stress tests" },
  { key: "prepare", label: "Prepare", description: "Arrangement, readiness, risks and the launch plan" },
  { key: "pack", label: "Decision pack", description: "The summary, the exports and a practitioner review" },
];

export default function LabWorkspace() {
  const lab = useLabCase();
  const results = useLabResults(lab.profile, lab.activeScenario, lab.planStatuses);
  const openedTracked = useRef(false);

  // A deep link may select an area. It carries nothing else - no profile data
  // has ever been in a URL here, and none can be read out of one.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const area = areaFromQuery(window.location.search);
    if (area) lab.setArea(area);
    if (!openedTracked.current) {
      openedTracked.current = true;
      trackEvent("workspace_opened", { entry: area ?? "default" });
    }
    // Intentionally runs once: this reads the entry URL, not every change to it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Figures are computed in the scenario's base currency and converted once,
   * here, for display. Converting at the edge rather than inside the engine is
   * what keeps a currency change from re-rounding a figure the visitor typed.
   */
  const toDisplay = useMemo(() => {
    const from = lab.activeScenario.baseCurrency;
    const to = lab.profile.displayCurrency;
    const fx = lab.activeScenario.fx;
    return (value: number): number | null => convert(value, from, to, fx);
  }, [lab.activeScenario.baseCurrency, lab.activeScenario.fx, lab.profile.displayCurrency]);

  const signature = `${results.snapshot.inputHash}:${lab.profile.displayCurrency}`;

  return (
    <div data-lab-shell className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
      <RecalculationAnnouncer signature={signature} />

      <nav aria-label="Workspace areas" className="no-print">
        <ul className="flex flex-wrap gap-2 mb-6">
          {AREAS.map((area) => {
            const active = lab.area === area.key;
            const Icon = AREA_ICONS[area.key];
            return (
              <li key={area.key}>
                <button
                  type="button"
                  onClick={() => lab.setArea(area.key)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 ${
                    active ? "bg-primary text-white" : "border border-black/[0.10] text-heading hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon aria-hidden className="w-4 h-4 shrink-0" />
                  {area.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p data-lab-description className="text-sm text-body-muted mb-6 max-w-prose">
        {AREAS.find((area) => area.key === lab.area)?.description}
      </p>

      <div data-lab-layout className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <div className="min-w-0">
          {lab.area === "team" && (
            <TeamAndCostArea
              lab={lab}
              cost={results.cost}
              snapshot={results.snapshot}
              toDisplay={toDisplay}
              onGoTo={(area) => lab.setArea(area)}
            />
          )}
          {lab.area === "compare" && (
            <CompareArea lab={lab} cost={results.cost} economics={results.economics} toDisplay={toDisplay} />
          )}
          {lab.area === "prepare" && <PrepareArea lab={lab} results={results} />}
          {lab.area === "pack" && <DecisionPackArea lab={lab} results={results} toDisplay={toDisplay} />}
        </div>

        {lab.area !== "pack" && (
          <ResultSummary
            profile={lab.profile}
            scenario={lab.activeScenario}
            cost={results.cost}
            economics={results.economics}
            displayCurrency={lab.profile.displayCurrency}
            toDisplay={toDisplay}
          />
        )}
      </div>
    </div>
  );
}
