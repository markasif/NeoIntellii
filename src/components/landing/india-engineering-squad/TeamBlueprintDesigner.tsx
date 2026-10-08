import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight, Bot, Boxes, Layers, Minus, Plus, RotateCcw, Rocket, Wrench } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  blueprintPods,
  roles as roleConfigs,
  type BlueprintPodKey,
} from "@/data/gccCostData";
import { PAGE_ID } from "./tracking";
import { CARD_LABEL, MUTED, PANEL, PANEL_RAISED } from "./theme";

/**
 * "Design your team" - the bridge from this landing page to
 * /gcc-cost-calculator.
 *
 * The blueprint pods, the role roster and the labels all come straight out of
 * @/data/gccCostData, the same module the calculator reads. Nothing here is a
 * second copy of that list, so a pod renamed or a role retired changes both
 * pages at once and the handoff cannot silently drift.
 *
 * The page's own rule still holds on this side of the link: no rates, no
 * salary bands, no ranges. This section designs a team shape and nothing more;
 * every number lives on the calculator, which the CTA opens in a new tab so
 * the visitor keeps their place here.
 */

/** Icons mirror the calculator's own pod cards, so the two screens read as one flow. */
const POD_ICONS: Record<BlueprintPodKey, typeof Layers> = {
  agentic: Bot,
  mlops: Layers,
  product: Boxes,
  poc: Rocket,
  custom: Wrench,
};

/** The pod the section opens on - the same "Recommended" default the calculator uses. */
const DEFAULT_POD: BlueprintPodKey = "agentic";

/** Guard rail: this page sells a squad, and the URL should stay sane. */
const MAX_PER_ROLE = 50;

const CALCULATOR_PATH = "/gcc-cost-calculator";

/** The full roster at zero, so every role has an entry rather than a hole. */
const emptyCounts = (): Record<string, number> =>
  Object.fromEntries(roleConfigs.map((role) => [role.key, 0]));

/** A pod's team shape, expanded across the whole roster. */
export function countsForPod(podKey: BlueprintPodKey): Record<string, number> {
  const pod = blueprintPods.find((p) => p.key === podKey);
  return Object.fromEntries(
    roleConfigs.map((role) => [role.key, pod?.roleCounts[role.key] ?? 0]),
  );
}

export const totalSeats = (counts: Record<string, number>) =>
  roleConfigs.reduce((sum, role) => sum + (counts[role.key] ?? 0), 0);

/**
 * Builds the calculator deep link.
 *
 * `pod` carries the blueprint itself - the focus areas, seniority preset and
 * complexity tier behind that card - and the per-role parameters carry the
 * team the visitor actually designed, which overrides the pod's default shape
 * on arrival. Roles travel as their human labels, and `encodeURIComponent`
 * rather than URLSearchParams keeps spaces as %20, so a pasted link still
 * reads like a sentence.
 */
export function buildSquadCalculatorUrl(
  podKey: BlueprintPodKey,
  counts: Record<string, number>,
): string {
  const parts = [`pod=${podKey}`, `team=${totalSeats(counts)}`];
  for (const role of roleConfigs) {
    const count = counts[role.key] ?? 0;
    if (count > 0) parts.push(`${encodeURIComponent(role.label)}=${count}`);
  }
  return `${CALCULATOR_PATH}?${parts.join("&")}`;
}

export default function TeamBlueprintDesigner() {
  const [podKey, setPodKey] = useState<BlueprintPodKey>(DEFAULT_POD);
  const [counts, setCounts] = useState<Record<string, number>>(() => countsForPod(DEFAULT_POD));

  const pod = blueprintPods.find((p) => p.key === podKey)!;
  const total = useMemo(() => totalSeats(counts), [counts]);
  const selected = roleConfigs.filter((role) => (counts[role.key] ?? 0) > 0);

  /** True once the visitor has moved a counter away from the pod's own shape. */
  const edited = useMemo(() => {
    const base = countsForPod(podKey);
    return roleConfigs.some((role) => (counts[role.key] ?? 0) !== base[role.key]);
  }, [counts, podKey]);

  const choosePod = useCallback((key: BlueprintPodKey) => {
    setPodKey(key);
    setCounts(key === "custom" ? emptyCounts() : countsForPod(key));
    trackEvent("cta_click", { location: "squad_designer_blueprint", pod: key, page: PAGE_ID });
  }, []);

  const update = useCallback((key: string, delta: number) => {
    setCounts((current) => ({
      ...current,
      [key]: Math.min(MAX_PER_ROLE, Math.max(0, (current[key] ?? 0) + delta)),
    }));
  }, []);

  // 8 to 10 is the shape this section asks about. Every pod starts smaller than
  // that on purpose - they are the calculator's own blueprints, seat for seat -
  // so under 8 reads as the next step to take, not as a shortfall. Nothing here
  // blocks: the calculator prices whatever the visitor actually needs.
  const sizeHint =
    total === 0
      ? "Add the roles your product needs to size the squad."
      : total < 8
        ? `${total} ${total === 1 ? "seat" : "seats"} - add ${8 - total} more to reach the 8 to 10 shape this page is built around.`
        : total <= 10
          ? `${total} seats - the 8 to 10 person shape this page is built around.`
          : `${total} seats - larger than a starting squad, and still buildable.`;

  const calculatorUrl = buildSquadCalculatorUrl(podKey, counts);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-8">
      <div>
        {/* 1-click blueprint selection - the same four starting points as the calculator */}
        <p className={`${CARD_LABEL} mb-3`}>1-click blueprint selection</p>
        <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {blueprintPods.map((option) => {
            const Icon = POD_ICONS[option.key];
            const active = podKey === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => choosePod(option.key)}
                aria-pressed={active}
                className={`h-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                  active
                    ? "border-[#1f5fd0] bg-[#1f5fd0] text-white shadow-[0_10px_30px_-12px_rgba(31,95,208,0.6)]"
                    : "border-[#dde7f7] bg-white text-[#101c4a] hover:-translate-y-0.5 hover:border-[#1f5fd0]/40"
                }`}
              >
                <Icon
                  className={`mb-2 h-4 w-4 ${active ? "text-white" : "text-[#1f5fd0]"}`}
                  aria-hidden="true"
                />
                <span
                  className={`block min-h-[14px] text-2xs font-semibold uppercase tracking-[0.16em] ${
                    active ? "text-white/80" : "text-[#f97316]"
                  }`}
                >
                  {option.badge ?? ""}
                </span>
                <p className="mt-1 text-xs font-semibold leading-snug">{option.label}</p>
                <p className={`mt-1 text-2xs leading-snug ${active ? "text-white/75" : "text-[#5d6a8a]"}`}>
                  {option.tagline}
                </p>
              </button>
            );
          })}
        </div>

        <div className={`${PANEL_RAISED} p-5 md:p-7`}>
          <ul className="divide-y divide-[#eef3fb]">
            {roleConfigs.map((role) => {
              const count = counts[role.key] ?? 0;
              return (
                <li key={role.key} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold ${count > 0 ? "text-[#101c4a]" : "text-[#5d6a8a]"}`}
                    >
                      {role.label}
                    </p>
                    <p className="mt-0.5 text-2xs leading-snug text-[#5d6a8a]">{role.note}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => update(role.key, -1)}
                      disabled={count === 0}
                      aria-label={`Remove one ${role.label}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#101c4a] transition-colors hover:bg-[#f3f6fc] disabled:opacity-30 disabled:hover:bg-white"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span
                      aria-live="polite"
                      className="w-7 text-center text-sm font-semibold tabular-nums text-[#101c4a]"
                    >
                      {count}
                    </span>
                    <button
                      type="button"
                      onClick={() => update(role.key, 1)}
                      disabled={count >= MAX_PER_ROLE}
                      aria-label={`Add one ${role.label}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f5fd0]/25 bg-[#1f5fd0]/[0.07] text-[#1f5fd0] transition-colors hover:bg-[#1f5fd0]/[0.14] disabled:opacity-30"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => choosePod(podKey)}
            disabled={!edited}
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#5d6a8a] transition-colors hover:text-[#1f5fd0] disabled:opacity-40 disabled:hover:text-[#5d6a8a]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset to {pod.label}
          </button>
        </div>
      </div>

      <div className={`${PANEL_RAISED} p-6 lg:sticky lg:top-8`}>
        <p className="mb-4 text-2xs font-semibold uppercase tracking-[0.16em] text-[#f97316]">
          Your India squad
        </p>

        <div className="mb-1 flex items-baseline gap-2.5">
          <span className="text-6xl font-bold leading-none tracking-[-0.03em] tabular-nums text-[#101c4a]">
            {total}
          </span>
          <span className="text-sm font-semibold text-[#5d6a8a]">{total === 1 ? "seat" : "seats"}</span>
        </div>
        <p className={`${MUTED} mb-4`}>{sizeHint}</p>

        <p className={`${PANEL} mb-5 px-3.5 py-2.5 text-2xs leading-snug text-[#2a3556]`}>
          Blueprint:{" "}
          <span className="font-semibold text-[#101c4a]">{pod.label}</span>
          {edited && <span className="text-[#5d6a8a]"> - adjusted</span>}
        </p>

        {selected.length > 0 && (
          <ul className="mb-6 max-h-56 space-y-2 overflow-y-auto pr-1">
            {selected.map((role) => (
              <li key={role.key} className="flex items-center justify-between gap-3 text-xs">
                <span className="truncate text-[#2a3556]">{role.label}</span>
                <span className="shrink-0 font-semibold tabular-nums text-[#101c4a]">
                  {counts[role.key]}
                </span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={calculatorUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("cta_click", {
              location: "squad_designer_cost_calculator",
              pod: podKey,
              pod_edited: edited,
              total_team: total,
              roles: selected.map((role) => `${role.label} x${counts[role.key]}`).join(", "),
              page: PAGE_ID,
            })
          }
          aria-disabled={total === 0}
          className={`inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1f5fd0] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a51b4] ${
            total === 0 ? "pointer-events-none opacity-40" : ""
          }`}
        >
          View India cost calculator <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <p className="mt-3.5 text-2xs leading-relaxed text-[#5d6a8a]">
          Opens in a new tab with this blueprint and every seat already filled in. Choose city, seniority and
          operating model there to see the full range - this page stays where you left it.
        </p>
      </div>
    </div>
  );
}
