/**
 * Compare: the baseline, the 60-month economics, the city comparison, the
 * stress tests and the saved scenarios.
 *
 * The whole area is downstream of one question - what is this being compared
 * against - so that question is asked first and answered explicitly. Without a
 * baseline there is no savings figure, no ROI and no payback, and the area
 * says so rather than filling the space with a number it cannot support.
 *
 * Sixty months are modelled; three years are shown by default, because the
 * uncertainty in year five is larger than the difference the fifth year makes
 * to a decision.
 */

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { computeCostResult } from "@/lib/gcc-lab/costModel";
import { ROI_DEFINITION } from "@/lib/gcc-lab/economics";
import { explainDelta, runStressCases } from "@/lib/gcc-lab/sensitivity";
import { formatMoney } from "@/lib/gcc-lab/currency";
import { ATTRITION_ANCHORS } from "@/lib/gcc-lab/defaults";
import { findSource } from "@/lib/gcc-lab/sources";
import { CITY_RECORDS, MAX_COMPARED_CITIES, PRIORITIES, compareCities, type PriorityKey } from "@/lib/gcc-lab/cities";
import { LAB_ROLES, SENIORITY_ORDER, seniorityLongLabel } from "@/lib/gcc-lab/roles";
import { DEFAULT_VISIBLE_MONTHS } from "@/lib/gcc-lab/versions";
import {
  ActionButton,
  CheckboxGroup,
  Explain,
  Note,
  NumberInput,
  Panel,
  ScrollX,
  SelectInput,
  Stat,
  SubHeading,
} from "./primitives";
import type { LabCase } from "./useLabCase";
import type { BaselineRoleCost, CostResult, CurrencyCode, EconomicsResult, IndiaCityKey, SeniorityKey } from "@/lib/gcc-lab/types";

// Loaded only when this area is on screen, so the chart library never sits in
// the path of the first estimate.
const CashflowChart = dynamic(() => import("./CashflowChart"), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-black/[0.02]" aria-hidden />,
});

export interface CompareAreaProps {
  lab: LabCase;
  cost: CostResult;
  economics: EconomicsResult;
  toDisplay: (value: number) => number | null;
}

export default function CompareArea({ lab, cost, economics, toDisplay }: CompareAreaProps) {
  const currency = lab.profile.displayCurrency;
  const money = (value: number | null | undefined): string => {
    if (value == null) return "Not available";
    const converted = toDisplay(value);
    return converted == null ? "Not available" : formatMoney(converted, currency);
  };

  return (
    <div className="space-y-5">
      <BaselineBlock lab={lab} />
      <EconomicsBlock lab={lab} economics={economics} money={money} currency={currency} />
      <CityBlock lab={lab} money={money} />
      <StressBlock lab={lab} cost={cost} money={money} />
      <ScenarioBlock lab={lab} cost={cost} money={money} />
    </div>
  );
}

/* ---------------------------------------------------------------- baseline */

function BaselineBlock({ lab }: { lab: LabCase }) {
  const { profile, activeScenario, updateScenario } = lab;
  const baseline = activeScenario.baseline;

  const setBaseline = (patch: Partial<typeof baseline>) => updateScenario({ baseline: { ...baseline, ...patch } });

  const addRole = () => {
    const seed = profile.team[0];
    const role: BaselineRoleCost = {
      roleKey: seed?.roleKey ?? "ai",
      seniority: seed?.seniority ?? "senior",
      fte: seed?.fte ?? 1,
      annualCost: 0,
      currency: baseline.currency,
    };
    setBaseline({ roles: [...baseline.roles, role] });
  };

  const updateRole = (index: number, patch: Partial<BaselineRoleCost>) => {
    setBaseline({ roles: baseline.roles.map((role, i) => (i === index ? { ...role, ...patch } : role)) });
  };

  return (
    <Panel
      title="What are you comparing against?"
      description="Your own figures, not a benchmark. The model will not guess what a role costs you at head office, and without these it produces no savings, no ROI and no payback."
    >
      {profile.objective === "expand-india" && (
        <Note title="Expanding an existing centre">
          The model reports the incremental cost of the new team on top of your current run rate. It does not invent a US or HQ
          alternative to compare that against. If there is a vendor cost you would be replacing, enter it below and it becomes the
          baseline.
        </Note>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput
          label="Currency of your baseline figures"
          value={baseline.currency}
          onChange={(event) => setBaseline({ currency: event.target.value as CurrencyCode })}
          options={["USD", "EUR", "GBP", "INR", "CHF", "NOK", "SEK", "DKK", "CAD", "AUD", "SGD"].map((code) => ({ value: code, label: code }))}
        />
        {profile.objective === "transition-work" && (
          <>
            <NumberInput
              label="Overlap, in months"
              value={baseline.overlapMonths}
              min={0}
              step={1}
              onValueChange={(overlapMonths) => setBaseline({ overlapMonths })}
              hint="How long both teams run. Cost you have not yet avoided is not a saving."
            />
            <NumberInput
              label="One-time separation cost"
              value={baseline.separationOneTime}
              onValueChange={(separationOneTime) => setBaseline({ separationOneTime })}
            />
            <NumberInput
              label="One-time transition cost"
              value={baseline.transitionOneTime}
              onValueChange={(transitionOneTime) => setBaseline({ transitionOneTime })}
              hint="Knowledge transfer and handover. Counted once, inside the cash costs."
            />
          </>
        )}
        {profile.objective === "expand-india" && (
          <NumberInput
            label="Current India run rate, per month"
            value={baseline.existingIndiaMonthly}
            onValueChange={(existingIndiaMonthly) => setBaseline({ existingIndiaMonthly })}
            hint="Context for the combined figure. It is not used as a counterfactual."
          />
        )}
      </div>

      <div className="mt-5">
        <SubHeading>Comparable roles and what they cost you today</SubHeading>
        {baseline.roles.length === 0 ? (
          <p className="text-sm text-body-muted mb-3">
            Nothing entered. Add the roles you would otherwise hire, or the ones you are moving, with their fully loaded annual
            cost.
          </p>
        ) : (
          <ul className="space-y-2.5 mb-3">
            {baseline.roles.map((role, index) => (
              <li key={index} className="rounded-xl border border-black/[0.08] p-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <SelectInput
                  label="Role"
                  value={role.roleKey}
                  onChange={(event) => updateRole(index, { roleKey: event.target.value })}
                  options={LAB_ROLES.map((entry) => ({ value: entry.key, label: entry.label }))}
                />
                <SelectInput
                  label="Seniority"
                  value={role.seniority}
                  onChange={(event) => updateRole(index, { seniority: event.target.value as SeniorityKey })}
                  options={SENIORITY_ORDER.map((key) => ({ value: key, label: seniorityLongLabel(key) }))}
                />
                <NumberInput label="FTE" value={role.fte} step={0.5} onValueChange={(fte) => updateRole(index, { fte: fte ?? 0 })} />
                <NumberInput
                  label="Fully loaded annual cost"
                  value={role.annualCost}
                  onValueChange={(annualCost) => updateRole(index, { annualCost: annualCost ?? 0 })}
                  suffix={baseline.currency}
                />
                <div className="flex items-end">
                  <ActionButton
                    variant="ghost"
                    onClick={() => setBaseline({ roles: baseline.roles.filter((_, i) => i !== index) })}
                    aria-label={`Remove baseline role ${index + 1}`}
                  >
                    <X aria-hidden className="w-4 h-4" /> Remove
                  </ActionButton>
                </div>
              </li>
            ))}
          </ul>
        )}
        <ActionButton variant="ghost" onClick={addRole}>
          <Plus aria-hidden className="w-4 h-4" /> Add a baseline role
        </ActionButton>
      </div>

      <Explain summary="What counts as comparable">
        <p>
          The same roles, the same seniority, the same headcount and the same delivery responsibilities on both sides. If the
          India team is doing something the HQ team was not, the difference is not a saving - it is a different scope. The model
          checks headcount and tells you when the two sides do not match; it cannot check responsibilities, so that one is yours.
        </p>
        <p className="mt-2">
          It also does not benchmark countries against each other. Germany, Poland and Denmark are not one Western European cost,
          so the model asks for your actual figures rather than modelling a country you did not tell it about.
        </p>
      </Explain>
    </Panel>
  );
}

/* --------------------------------------------------------------- economics */

function EconomicsBlock({
  lab,
  economics,
  money,
  currency,
}: {
  lab: LabCase;
  economics: EconomicsResult;
  money: (value: number | null | undefined) => string;
  currency: CurrencyCode;
}) {
  const [months, setMonths] = useState(DEFAULT_VISIBLE_MONTHS);

  const cumulative = economics.cumulativeDifference;
  const points = useMemo(
    () => (cumulative ?? []).slice(0, months).map((value, index) => ({ month: index + 1, cumulative: value })),
    [cumulative, months],
  );

  if (!cumulative) {
    return (
      <Panel title="The economics">
        <Note title="Not available yet">
          {economics.warnings.find((warning) => warning.id === "no-baseline" || warning.id === "expansion-no-counterfactual")?.message ??
            "No baseline has been given, so savings, ROI and payback cannot be produced."}
        </Note>
        <p className="text-sm text-body mt-3">
          The India cost above stands on its own and is complete as far as it goes. What is missing is the other side of the
          comparison, and only you have that.
        </p>
      </Panel>
    );
  }

  const paybackText =
    economics.paybackState === "recovered"
      ? `Month ${economics.paybackMonth}`
      : economics.paybackState === "no-initial-deficit"
        ? "No initial deficit in this model"
        : economics.paybackState === "not-recovered-in-horizon"
          ? "Not recovered inside 60 months"
          : "Not available";

  const description = `Cumulative cash difference over ${months} months, from ${money(points[0]?.cumulative)} in month 1 to ${money(points[points.length - 1]?.cumulative)} in month ${points.length}. ${
    economics.paybackState === "recovered" ? `The line crosses zero in month ${economics.paybackMonth}.` : paybackText + "."
  }`;

  return (
    <Panel
      title="The economics"
      description={economics.differenceLabel}
      actions={
        <div className="flex gap-1.5">
          {[36, 60].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMonths(value)}
              aria-pressed={months === value}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                months === value ? "bg-primary text-white" : "border border-black/[0.10] text-heading hover:bg-black/[0.03]"
              }`}
            >
              {value / 12} years
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 mb-5">
        <Stat label="Payback" value={paybackText} basis="derived" sub={paybackNote(economics.paybackState)} />
        <Stat
          label={`Cumulative difference, ${months / 12} years`}
          value={money(cumulative[months - 1] ?? cumulative.at(-1))}
          basis="derived"
        />
        <Stat
          label="Sustained payback"
          value={economics.sustainedPaybackMonth != null ? `Month ${economics.sustainedPaybackMonth}` : null}
          unavailable="The cumulative difference does not stay non-negative."
          basis="derived"
          sub="The month after which it never goes negative again."
        />
        <Stat
          label="ROI"
          value={economics.roiPercent != null ? `${Math.round(economics.roiPercent)}%` : null}
          unavailable={economics.roiUnavailableReason}
          basis="derived"
          sub={economics.roiPercent != null ? "Defined below - not project profitability." : undefined}
        />
      </div>

      {months === 60 && (
        <Note title="Years four and five">
          The model runs to sixty months, but the uncertainty in year five is much larger than the difference year five makes to
          this decision. Treat the back half as a direction, not a forecast.
        </Note>
      )}

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-2 gap-5">
        <CashflowChart data={points} currency={currency} paybackMonth={economics.paybackMonth} description={description} />

        <div>
          <SubHeading>The same data, as a table</SubHeading>
          <ScrollX label="Cumulative cash difference by month">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="text-left border-b border-black/[0.08]">
                  <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Month</th>
                  <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">Baseline</th>
                  <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">India</th>
                  <th scope="col" className="py-2 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {[1, 3, 6, 12, 18, 24, 36, 48, 60]
                  .filter((month) => month <= months)
                  .map((month) => (
                    <tr key={month} className="border-b border-black/[0.04]">
                      <th scope="row" className="py-2 pr-3 text-left font-medium text-heading">{month}</th>
                      <td className="py-2 pr-3 text-right tabular-nums text-body">{money(economics.baselineCashMonthly?.[month - 1])}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-body">
                        {money((economics.baselineCashMonthly?.[month - 1] ?? 0) - (economics.netDifferenceMonthly?.[month - 1] ?? 0))}
                      </td>
                      <td className="py-2 text-right tabular-nums text-heading font-medium">{money(cumulative[month - 1])}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </ScrollX>
        </div>
      </div>

      {economics.roiPercent != null && (
        <Explain summary="How this ROI figure is defined">
          <p>{ROI_DEFINITION}</p>
          <p className="mt-2">
            The transition investment used as the denominator here is {money(economics.transitionInvestment)}.
          </p>
        </Explain>
      )}

      {economics.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {economics.warnings.map((warning) => (
            <Note key={warning.id} tone={warning.severity}>
              {warning.message}
            </Note>
          ))}
        </div>
      )}
    </Panel>
  );
}

function paybackNote(state: EconomicsResult["paybackState"]): string {
  switch (state) {
    case "no-initial-deficit": return "The cumulative balance was never negative, so there was nothing to pay back.";
    case "not-recovered-in-horizon": return "The deficit is still open at month 60.";
    case "recovered": return "First month the cumulative difference turned non-negative.";
    default: return "";
  }
}

/* ------------------------------------------------------------------ cities */

function CityBlock({ lab, money }: { lab: LabCase; money: (value: number | null | undefined) => string }) {
  const { profile, activeScenario } = lab;
  const [selected, setSelected] = useState<IndiaCityKey[]>([profile.city]);
  const [priorities, setPriorities] = useState<PriorityKey[]>(["cost", "ai-depth"]);

  const comparison = useMemo(
    () =>
      compareCities(selected, priorities, (city) => {
        const result = computeCostResult(profile, { ...activeScenario, cityOverride: city });
        const unpriced = result.warnings.some((warning) => warning.id === "unpriced-seats");
        return unpriced ? null : result.steadyStateMonthly;
      }),
    [selected, priorities, profile, activeScenario],
  );

  const toggle = (city: IndiaCityKey) => {
    setSelected((current) => {
      if (current.includes(city)) return current.filter((entry) => entry !== city);
      if (current.length >= MAX_COMPARED_CITIES) return current;
      return [...current, city];
    });
  };

  return (
    <Panel
      title="Cities"
      description={`Up to ${MAX_COMPARED_CITIES} at a time. Changing a city here does not change your team or your baseline - it prices the same team somewhere else.`}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {CITY_RECORDS.filter((record) => record.key !== "other").map((record) => {
          const active = selected.includes(record.key);
          const disabled = !active && selected.length >= MAX_COMPARED_CITIES;
          return (
            <button
              key={record.key}
              type="button"
              onClick={() => toggle(record.key)}
              disabled={disabled}
              aria-pressed={active}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
                active ? "bg-primary text-white" : "border border-black/[0.10] text-heading hover:bg-black/[0.03]"
              }`}
            >
              {record.label}
              {record.compensationCoverage !== "modelled" && <span className="text-2xs opacity-70"> · not modelled</span>}
            </button>
          );
        })}
      </div>

      <CheckboxGroup
        label="What matters most to you?"
        values={priorities}
        options={PRIORITIES.map((priority) => ({ value: priority.key, label: priority.label }))}
        onChange={(values) => setPriorities(values as PriorityKey[])}
        columns={3}
        hint="This changes which observations are shown. It does not produce a weighted score, because there is no score."
      />

      <div className="mt-5 space-y-3">
        {comparison.rows.map((row) => (
          <div key={row.record.key} className="rounded-xl border border-black/[0.08] p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h4 className="text-base font-semibold text-heading">
                {row.record.label} <span className="text-xs font-normal text-body-muted">({row.record.state})</span>
              </h4>
              <p className="text-sm tabular-nums text-heading">
                {row.insufficientEvidence ? (
                  <span className="text-body-muted">Insufficient evidence to model</span>
                ) : (
                  <>
                    {money(row.modelledMonthly)} a month
                    {row.differenceFromCheapest != null && row.differenceFromCheapest > 0.5 && (
                      <span className="text-xs text-body-muted"> · {row.differenceFromCheapest.toFixed(0)}% above the cheapest here</span>
                    )}
                  </>
                )}
              </p>
            </div>
            <ul className="text-sm text-body space-y-1 list-disc pl-4">
              {row.observations.map((observation) => (
                <li key={observation}>{observation}</li>
              ))}
            </ul>
            <p className="text-xs text-body-muted mt-2">{row.record.presenceNote}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        <Note title="Why there is no score">{comparison.scoringNote}</Note>
        <Note title="Where NeoIntelli actually is">{comparison.presenceDisclosure}</Note>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ stress */

function StressBlock({ lab, cost, money }: { lab: LabCase; cost: CostResult; money: (value: number | null | undefined) => string }) {
  const currency = lab.profile.displayCurrency;
  // Already in the display currency, each side converted at its own scenario's
  // quote - so an FX stress shows a real difference rather than a zero.
  const outcomes = useMemo(
    () => runStressCases(lab.profile, lab.activeScenario, cost, currency),
    [lab.profile, lab.activeScenario, cost, currency],
  );
  const shown = (value: number): string => `${value >= 0 ? "+" : ""}${formatMoney(value, currency)}`;

  return (
    <Panel
      title="Stress tests"
      description="Each one changes exactly one input and re-runs the same model. Percentage points and relative percentages are labelled separately, because they are not the same thing. A salary step-up does nothing to a month-one run rate and a great deal to a three-year one, so both columns are here."
    >
      <ScrollX label="Stress test outcomes">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-left border-b border-black/[0.08]">
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Test</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">What changed</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">Steady month</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">First year</th>
              <th scope="col" className="py-2 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">Three years</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.map((outcome) => (
              <tr key={outcome.id} className="border-b border-black/[0.04] align-top">
                <th scope="row" className="py-2.5 pr-3 text-left font-medium text-heading">{outcome.label}</th>
                <td className="py-2.5 pr-3 text-xs text-body-muted max-w-sm">
                  {outcome.change}
                  {outcome.notes.map((note) => (
                    <span key={note} className="block mt-1 text-body">{note}</span>
                  ))}
                </td>
                <td className="py-2.5 pr-3 text-right tabular-nums text-body whitespace-nowrap">
                  {shown(outcome.steadyStateDelta)}
                  {outcome.steadyStateDeltaPercent != null && (
                    <span className="block text-2xs text-body-muted">
                      {outcome.steadyStateDeltaPercent >= 0 ? "+" : ""}
                      {outcome.steadyStateDeltaPercent.toFixed(1)}%
                    </span>
                  )}
                </td>
                <td className="py-2.5 pr-3 text-right tabular-nums text-body whitespace-nowrap">{shown(outcome.firstYearDelta)}</td>
                <td className="py-2.5 text-right tabular-nums text-body whitespace-nowrap">{shown(outcome.threeYearDelta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollX>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <NumberInput
            label="Annual attrition"
            value={lab.activeScenario.costAssumptions.attritionRate != null ? lab.activeScenario.costAssumptions.attritionRate * 100 : undefined}
            onValueChange={(value) => lab.updateCostAssumption({ attritionRate: value == null ? undefined : value / 100 })}
            placeholder="Not modelled"
            suffix="%"
            hint="Creates vacancy and replacement cost. It assumes no revenue loss."
          />
          {ATTRITION_ANCHORS.map((anchor) => (
            <div key={anchor.id} className="mt-2">
              <button
                type="button"
                onClick={() => lab.updateCostAssumption({ attritionRate: anchor.value, backfillMonths: lab.activeScenario.costAssumptions.backfillMonths ?? 2 })}
                className="rounded-full border border-black/[0.10] px-2.5 py-1 text-2xs text-heading transition-colors hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
              >
                Use {anchor.label}
              </button>
              <p className="text-2xs text-body-muted mt-1 leading-relaxed">
                {anchor.scope}{" "}
                {findSource(anchor.sourceId)?.url && (
                  <a href={findSource(anchor.sourceId)!.url} target="_blank" rel="noopener noreferrer" className="text-accent-strong underline underline-offset-2">
                    {findSource(anchor.sourceId)!.publisher}
                  </a>
                )}
              </p>
            </div>
          ))}
        </div>
        <NumberInput
          label="Months to backfill"
          value={lab.activeScenario.costAssumptions.backfillMonths}
          min={0}
          step={1}
          onValueChange={(backfillMonths) => lab.updateCostAssumption({ backfillMonths })}
          placeholder="0"
        />
        <SelectInput
          label="Hiring delay"
          value={String(lab.activeScenario.hiringDelayMonths)}
          onChange={(event) => lab.updateScenario({ hiringDelayMonths: Number(event.target.value) })}
          options={[
            { value: "0", label: "On plan" },
            { value: "3", label: "3 months late" },
            { value: "6", label: "6 months late" },
          ]}
          hint="Also changes delivered capacity, shown below."
        />
        <Stat
          label="Unfilled FTE-months"
          value={cost.unfilledFteMonths.toFixed(1)}
          basis="derived"
          sub="Planned capacity that is not delivered. Lower spend from an empty seat is not a saving."
        />
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------- scenarios */

function ScenarioBlock({ lab, cost, money }: { lab: LabCase; cost: CostResult; money: (value: number | null | undefined) => string }) {
  const base = lab.scenarios[0];
  const baseCost = useMemo(() => computeCostResult(lab.profile, base), [lab.profile, base]);

  return (
    <Panel
      title="Scenarios"
      description={`Up to three, saved in this browser tab. Clone the base, change one thing, and the difference reconciles against the lines that actually moved.`}
      actions={
        lab.scenarios.length < 3 ? (
          <ActionButton variant="ghost" onClick={() => lab.cloneScenario(`Variant ${lab.scenarios.length}`)}>
            <Plus aria-hidden className="w-4 h-4" /> Clone this scenario
          </ActionButton>
        ) : undefined
      }
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {lab.scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => lab.setActiveScenario(scenario.id)}
            aria-pressed={scenario.id === lab.activeScenarioId}
            className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
              scenario.id === lab.activeScenarioId ? "bg-primary text-white" : "border border-black/[0.10] text-heading hover:bg-black/[0.03]"
            }`}
          >
            {scenario.label}
          </button>
        ))}
        {lab.scenarios.length > 1 && lab.activeScenarioId !== base.id && (
          <ActionButton variant="ghost" onClick={() => lab.removeScenario(lab.activeScenarioId)}>
            <X aria-hidden className="w-4 h-4" /> Delete this scenario
          </ActionButton>
        )}
      </div>

      {lab.activeScenarioId !== base.id && (
        <DeltaExplanation baseCost={baseCost} variantCost={cost} money={money} baseLabel={base.label} variantLabel={lab.activeScenario.label} />
      )}
    </Panel>
  );
}

function DeltaExplanation({
  baseCost,
  variantCost,
  money,
  baseLabel,
  variantLabel,
}: {
  baseCost: CostResult;
  variantCost: CostResult;
  money: (value: number | null | undefined) => string;
  baseLabel: string;
  variantLabel: string;
}) {
  const delta = useMemo(
    () => explainDelta(baseCost, variantCost, (value) => money(value)),
    [baseCost, variantCost, money],
  );

  return (
    <div className="rounded-xl border border-black/[0.08] p-4">
      <SubHeading>Why did this change?</SubHeading>
      <p className="text-sm text-body mb-3">
        {variantLabel} against {baseLabel}: {delta.steadyStateDelta >= 0 ? "+" : ""}
        {money(delta.steadyStateDelta)} a month
        {delta.steadyStateDeltaPercent != null && ` (${delta.steadyStateDeltaPercent >= 0 ? "+" : ""}${delta.steadyStateDeltaPercent.toFixed(1)}%)`}
        , {delta.firstYearDelta >= 0 ? "+" : ""}
        {money(delta.firstYearDelta)} across the first year.
        {Math.abs(delta.headcountDelta) > 0.01 && ` Headcount differs by ${delta.headcountDelta.toFixed(1)} FTE.`}
      </p>
      <ul className="text-sm text-body space-y-1 list-disc pl-4">
        {delta.explanation.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="text-xs text-body-muted mt-3">
        This reconciles against the cost lines themselves and sums to the headline difference. It will not attribute a change to
        anything the model does not contain.
      </p>
    </div>
  );
}
