import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Minus, Plus, RotateCcw, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BODY, MUTED, PANEL_RAISED } from "./theme";

/**
 * The ten roles a Micro GCC is designed from. `param` is the name each role
 * travels under in the /gcc-cost-calculator query string, and is deliberately
 * the human label rather than an opaque key so a pasted link stays readable:
 *
 *   /gcc-cost-calculator?team=8&Engineering%20Manager=1&AI%20%2F%20ML%20Engineer=2
 *
 * The calculator resolves these back to its own role keys (see
 * roleKeyFromParam in src/pages/GccCostCalculator.tsx), matching on the
 * letters and digits alone so spacing and slashes never break the handoff.
 */
export const TEAM_ROLES = [
  { param: "Engineering Manager", note: "Owns delivery and the local team" },
  { param: "AI / ML Engineer", note: "Models, RAG, agents, evaluation" },
  { param: "Data Engineer", note: "Pipelines, warehouse, data quality" },
  { param: "Full-Stack Engineer", note: "End-to-end product delivery" },
  { param: "Backend Engineer", note: "Services, APIs, core platform" },
  { param: "Frontend Engineer", note: "Product UI and design systems" },
  { param: "Cloud / DevOps Engineer", note: "Infra, CI/CD, cost and uptime" },
  { param: "QA / SDET", note: "Automation and release confidence" },
  { param: "Data Scientist", note: "Analysis, experimentation, insight" },
  { param: "Mobile Engineer", note: "iOS and Android delivery" },
] as const;

/** A sensible 8-seat starting point, so the panel is never empty on arrival. */
const STARTING_TEAM: Record<string, number> = {
  "Engineering Manager": 1,
  "AI / ML Engineer": 2,
  "Data Engineer": 1,
  "Full-Stack Engineer": 2,
  "Cloud / DevOps Engineer": 1,
  "QA / SDET": 1,
};

/** Guard rail: a Micro GCC is a small team, and the URL should stay sane. */
const MAX_PER_ROLE = 50;

const CALCULATOR_PATH = "/gcc-cost-calculator";

/**
 * Builds the calculator deep link. `encodeURIComponent` rather than
 * URLSearchParams so spaces arrive as %20 and the link reads the way it is
 * shared; the calculator parses either form.
 */
export function buildCalculatorUrl(counts: Record<string, number>, total: number): string {
  const parts = [`team=${total}`];
  for (const role of TEAM_ROLES) {
    const count = counts[role.param] ?? 0;
    if (count > 0) parts.push(`${encodeURIComponent(role.param)}=${count}`);
  }
  return `${CALCULATOR_PATH}?${parts.join("&")}`;
}

export default function TeamDesigner() {
  const [counts, setCounts] = useState<Record<string, number>>(STARTING_TEAM);

  const total = useMemo(
    () => TEAM_ROLES.reduce((sum, role) => sum + (counts[role.param] ?? 0), 0),
    [counts],
  );

  const update = useCallback((param: string, delta: number) => {
    setCounts((current) => ({
      ...current,
      [param]: Math.min(MAX_PER_ROLE, Math.max(0, (current[param] ?? 0) + delta)),
    }));
  }, []);

  const selected = TEAM_ROLES.filter((role) => (counts[role.param] ?? 0) > 0);
  const calculatorUrl = buildCalculatorUrl(counts, total);

  // 8 to 10 is the shape this page sells; anything else gets a nudge, not a block.
  const sizeHint = total === 0
    ? "Add at least one role to size the team."
    : total < 8
      ? `${total} seats - a little under the 8 to 10 a Micro GCC starts with.`
      : total <= 10
        ? `${total} seats - exactly the Micro GCC starting shape.`
        : `${total} seats - larger than a starting Micro GCC, and still buildable.`;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-6 lg:gap-8 items-start">
      <div className={`${PANEL_RAISED} p-5 md:p-7`}>
        <ul className="divide-y divide-[#eef3fb]">
          {TEAM_ROLES.map((role) => {
            const count = counts[role.param] ?? 0;
            return (
              <li key={role.param} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${count > 0 ? "text-[#101c4a]" : "text-[#5d6a8a]"}`}>
                    {role.param}
                  </p>
                  <p className="text-2xs text-[#5d6a8a] leading-snug mt-0.5">{role.note}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => update(role.param, -1)}
                    disabled={count === 0}
                    aria-label={`Remove one ${role.param}`}
                    className="w-8 h-8 rounded-full border border-black/[0.06] bg-white flex items-center justify-center text-[#101c4a] transition-colors hover:bg-[#f3f6fc] disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span aria-live="polite" className="w-7 text-center text-sm text-[#101c4a] font-semibold tabular-nums">
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => update(role.param, 1)}
                    disabled={count >= MAX_PER_ROLE}
                    aria-label={`Add one ${role.param}`}
                    className="w-8 h-8 rounded-full border border-[#1f5fd0]/25 bg-[#1f5fd0]/[0.07] flex items-center justify-center text-[#1f5fd0] transition-colors hover:bg-[#1f5fd0]/[0.14] disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setCounts(STARTING_TEAM)}
          className="mt-4 inline-flex items-center gap-2 text-xs text-[#5d6a8a] font-semibold transition-colors hover:text-[#1f5fd0]"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Reset to the starting team
        </button>
      </div>

      <div className={`${PANEL_RAISED} p-6 lg:sticky lg:top-8`}>
        <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#f97316] mb-4">
          Your India team
        </p>

        <div className="flex items-baseline gap-2.5 mb-1">
          <span className="text-6xl leading-none font-bold tracking-[-0.03em] text-[#101c4a] tabular-nums">
            {total}
          </span>
          <span className="text-sm text-[#5d6a8a] font-semibold">{total === 1 ? "seat" : "seats"}</span>
        </div>
        <p className={`${MUTED} mb-5`}>{sizeHint}</p>

        {selected.length > 0 && (
          <ul className="space-y-2 mb-6 max-h-56 overflow-y-auto pr-1">
            {selected.map((role) => (
              <li key={role.param} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-[#2a3556] truncate">{role.param}</span>
                <span className="text-[#101c4a] font-semibold tabular-nums shrink-0">{counts[role.param]}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={calculatorUrl}
          onClick={() =>
            trackEvent("cta_click", {
              location: "team_designer_cost_estimate",
              total_team: total,
              roles: selected.map((role) => `${role.param} x${counts[role.param]}`).join(", "),
            })
          }
          aria-disabled={total === 0}
          className={`inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1f5fd0] px-6 py-3.5 text-sm text-white font-semibold transition-colors hover:bg-[#1a51b4] ${
            total === 0 ? "pointer-events-none opacity-40" : ""
          }`}
        >
          See India cost estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>

        <p className="flex items-start gap-2 text-2xs text-[#5d6a8a] leading-relaxed mt-3.5">
          <Users className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#1f5fd0]" aria-hidden="true" />
          Opens our cost calculator with this exact team already filled in. Pick city, seniority and operating model
          there to see the full range.
        </p>
      </div>
    </div>
  );
}
