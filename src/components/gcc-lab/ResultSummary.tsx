/**
 * The result summary that stays on screen while the visitor edits.
 *
 * On desktop it sits beside the editor; on mobile it collapses into a compact
 * disclosure pinned under the inputs. Either way it is the same component and
 * the same snapshot, so the number never differs between the two.
 *
 * The rules it enforces visually:
 *   - The default city is labelled as an assumption until the visitor chooses one.
 *   - Exclusions sit next to the total, not in a footnote.
 *   - A figure that cannot be produced says so and says why.
 */

import { AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { formatMoney, formatMoneyCompact } from "@/lib/gcc-lab/currency";
import { cityLabel } from "@/lib/gcc-lab/cities";
import { Note, Stat } from "./primitives";
import type { CostResult, CurrencyCode, EconomicsResult, Profile, Scenario } from "@/lib/gcc-lab/types";

export interface ResultSummaryProps {
  profile: Profile;
  scenario: Scenario;
  cost: CostResult;
  economics: EconomicsResult;
  displayCurrency: CurrencyCode;
  /** Converts a figure from the compute currency into the display currency. */
  toDisplay: (value: number) => number | null;
  compact?: boolean;
}

export function ResultSummaryBody({ profile, scenario, cost, economics, displayCurrency, toDisplay }: ResultSummaryProps) {
  const money = (value: number | null | undefined) => {
    if (value == null) return null;
    const converted = toDisplay(value);
    return converted == null ? null : formatMoney(converted, displayCurrency);
  };

  const hasTeam = profile.team.length > 0;
  const blocking = cost.warnings.filter((warning) => warning.severity === "blocking");
  const cautions = cost.warnings.filter((warning) => warning.severity === "caution");
  const city = cityLabel(scenario.cityOverride ?? profile.city);

  if (!hasTeam) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-body leading-relaxed">
          Add a team - a starter template or your own rows - and the estimate appears here and stays visible while you change
          things.
        </p>
        <Note title="What you need first">
          A country, a team and a city. Nothing else. No email, no company name, and no questions about your cloud stack
          before you have a number.
        </Note>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2.5">
        <Stat
          label="First-year cash"
          value={money(cost.firstYearCash)}
          basis="derived"
          sub="Twelve real months including the ramp, not twelve times a full month."
        />
        <Stat
          label="Steady-state monthly"
          value={money(cost.steadyStateMonthly)}
          unavailable="The team never reaches full size inside the horizon."
          basis="derived"
          sub={
            cost.steadyStateBand
              ? `Planning band ${formatMoneyCompact(toDisplay(cost.steadyStateBand.low) ?? 0, displayCurrency)} to ${formatMoneyCompact(toDisplay(cost.steadyStateBand.high) ?? 0, displayCurrency)}`
              : "Your own compensation figures, so no planning band applies."
          }
        />
        <Stat
          label="Steady-state annual"
          value={money(cost.steadyStateAnnual)}
          basis="derived"
          sub={`At the target team size in ${city}.`}
        />
        {economics.cumulativeDifference != null ? (
          <Stat
            label="Cumulative difference, 36 months"
            value={money(economics.cumulativeDifference[35] ?? economics.cumulativeDifference.at(-1) ?? 0)}
            basis="derived"
            sub={economics.differenceLabel}
          />
        ) : (
          <Stat
            label="Cumulative difference"
            value={null}
            unavailable="No baseline entered - there is nothing to compare against yet."
            sub="Enter what the same scope costs you today in Compare, and this unlocks."
          />
        )}
      </div>

      <dl className="text-xs text-body-muted space-y-1.5">
        <div className="flex justify-between gap-3">
          <dt>City</dt>
          <dd className="text-heading text-right">
            {city}
            {profile.cityIsDefault && <span className="block text-2xs text-body-muted">Opening assumption, not your choice yet</span>}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Currency</dt>
          <dd className="text-heading text-right">
            {displayCurrency}
            <span className="block text-2xs text-body-muted">
              {scenario.fx.origin === "user-entered" ? "Your rate" : `Planning quote, ${scenario.fx.quoteDate}`}
            </span>
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Scenario</dt>
          <dd className="text-heading text-right">{scenario.label}</dd>
        </div>
      </dl>

      {blocking.length > 0 && (
        <Note tone="blocking" title="Blocking">
          <ul className="space-y-1.5">
            {blocking.map((warning) => (
              <li key={warning.id}>{warning.message}</li>
            ))}
          </ul>
        </Note>
      )}

      {cost.exclusions.length > 0 && (
        <Note tone="caution" title={`Excluded from these figures (${cost.exclusions.length})`}>
          <ul className="space-y-1 list-disc pl-4">
            {cost.exclusions.map((exclusion) => (
              <li key={exclusion}>{exclusion}</li>
            ))}
          </ul>
        </Note>
      )}

      {cautions.length > 0 && (
        <details className="text-xs">
          <summary className="cursor-pointer text-accent-strong hover:underline">
            {cautions.length} thing{cautions.length === 1 ? "" : "s"} worth knowing about this estimate
          </summary>
          <ul className="mt-2 space-y-1.5 text-body leading-relaxed">
            {cautions.map((warning) => (
              <li key={warning.id}>{warning.message}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

/** Desktop: a sticky panel. Mobile: a compact disclosure. */
export default function ResultSummary(props: ResultSummaryProps) {
  const [open, setOpen] = useState(false);
  const { cost, displayCurrency, toDisplay, profile } = props;
  const headline = profile.team.length === 0 ? null : toDisplay(cost.steadyStateMonthly);
  const blocking = cost.warnings.some((warning) => warning.severity === "blocking");

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block sticky top-24 self-start">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
          <h3 className="text-lg text-heading font-semibold mb-3">Your estimate</h3>
          <ResultSummaryBody {...props} />
        </div>
      </aside>

      {/* Mobile */}
      <div className="lg:hidden sticky bottom-0 z-20 -mx-6 sm:-mx-8 px-6 sm:px-8 pb-4 pt-2 bg-gradient-to-t from-white via-white to-white/0">
        <div className="rounded-2xl border border-black/[0.10] bg-white shadow-[0_-2px_16px_rgba(14,19,32,0.08)]">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 rounded-2xl"
          >
            <span className="min-w-0">
              <span className="block text-2xs uppercase tracking-[0.14em] text-body-muted">Steady-state monthly</span>
              <span className="block text-lg text-heading font-semibold tabular-nums truncate">
                {headline != null ? formatMoney(headline, displayCurrency) : "Add a team to see a number"}
              </span>
            </span>
            <span className="flex items-center gap-2 shrink-0">
              {blocking && <AlertTriangle aria-label="Needs attention" className="w-4 h-4 text-destructive" />}
              <ChevronDown aria-hidden className={`w-4 h-4 text-body-muted transition-transform ${open ? "rotate-180" : ""}`} />
            </span>
          </button>
          {open && (
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              <ResultSummaryBody {...props} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
