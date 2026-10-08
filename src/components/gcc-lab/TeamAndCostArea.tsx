/**
 * Team & cost: the shared profile, the team, the cost detail and the
 * assumption ledger.
 *
 * The first estimate needs three things - a country, a team and a city - and
 * asks for nothing else before showing a number. Everything after that is
 * optional refinement, and the ledger below the result makes every default it
 * used inspectable and editable.
 *
 * On a small screen the team is a stack of editable rows rather than a
 * shrunken spreadsheet: a role row is a card, not a table row squeezed to
 * 40 pixels a column.
 */

import { useMemo, useState } from "react";
import { Plus, Trash2, Undo2, Wand2 } from "lucide-react";
import { COUNTRIES, COUNTRY_GROUPS } from "@/lib/gcc-lab/countries";
import { CATEGORY_LABELS, CATEGORY_UNIT_LABELS, NOT_BUDGETED } from "@/lib/gcc-lab/defaults";
import { findSource } from "@/lib/gcc-lab/sources";
import { SUPPORTED_CURRENCIES, formatLakh, formatMoney } from "@/lib/gcc-lab/currency";
import { seatAnnualCtcInr } from "@/lib/gcc-lab/costModel";
import { ATTRITION_ANCHORS, ESCALATION_ANCHORS, OPERATING_BANDS } from "@/lib/gcc-lab/defaults";
import { CITY_RECORDS, cityLabel, findCity } from "@/lib/gcc-lab/cities";
import { LAB_ROLES, SENIORITY_ORDER, seniorityLongLabel } from "@/lib/gcc-lab/roles";
import { createTeamRow } from "@/lib/gcc-lab/profile";
import { TEAM_TEMPLATES, diffTeam, proposalToRows, proposeTeam, type PlannerAnswers, type WorkloadKey } from "@/lib/gcc-lab/teamTemplates";
import { trackEvent } from "@/lib/analytics";
import {
  ActionButton,
  BasisTag,
  ChoiceGroup,
  CheckboxGroup,
  ConfidenceTag,
  Explain,
  Note,
  NumberInput,
  Panel,
  ScrollX,
  SelectInput,
  SubHeading,
} from "./primitives";
import type { LabCase } from "./useLabCase";
import type { CostResult, CurrencyCode, IndiaCityKey, ObjectiveKey, ResultSnapshot, SeniorityKey, TeamRow, WorkModel } from "@/lib/gcc-lab/types";

type EntryMode = "template" | "build" | "planner";

export interface TeamAndCostAreaProps {
  lab: LabCase;
  cost: CostResult;
  snapshot: ResultSnapshot;
  toDisplay: (value: number) => number | null;
  onGoTo: (area: "compare" | "prepare" | "pack") => void;
}

const OBJECTIVES: { value: ObjectiveKey; label: string; description: string }[] = [
  { value: "add-capacity", label: "Add new capacity", description: "Hiring you would otherwise do at HQ" },
  { value: "transition-work", label: "Move existing work", description: "Work done today at HQ or by a vendor" },
  { value: "expand-india", label: "Expand an India centre", description: "You already have a team there" },
  { value: "explore", label: "Just exploring", description: "No decision made - India cost only" },
];

export default function TeamAndCostArea({ lab, cost, snapshot, toDisplay, onGoTo }: TeamAndCostAreaProps) {
  const { profile, activeScenario } = lab;
  const [mode, setMode] = useState<EntryMode>("template");
  const currency = profile.displayCurrency;

  const money = (value: number): string => {
    const converted = toDisplay(value);
    return converted == null ? "Not available" : formatMoney(converted, currency);
  };

  return (
    <div className="space-y-5">
      <ProfileBlock lab={lab} />

      <Panel
        title="Your team"
        description="Start from a template, build your own, or answer a few questions and get a proposal you can accept or reject."
      >
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="How to start your team">
          {(
            [
              ["template", "Use a starter team"],
              ["build", "Build my own team"],
              ["planner", "Help me choose roles"],
            ] as [EntryMode, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={mode === key}
              onClick={() => setMode(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
                mode === key ? "bg-primary text-white" : "border border-black/[0.10] text-heading hover:bg-black/[0.03]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "template" && <TemplatePicker lab={lab} />}
        {mode === "planner" && <RolePlanner lab={lab} />}
        {mode === "build" && (
          <p className="text-sm text-body-muted mb-4">
            Add rows below. Every row is editable - role, seniority, how many, when they start, and your own compensation figure
            if you have one.
          </p>
        )}

        <TeamEditor lab={lab} />
      </Panel>

      {profile.team.length > 0 && (
        <>
          <CostDetail cost={cost} money={money} currency={currency} />
          <AssumptionLedger lab={lab} snapshot={snapshot} money={money} />
          <NextActions onGoTo={onGoTo} />
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- profile */

function ProfileBlock({ lab }: { lab: LabCase }) {
  const { profile, updateProfile, activeScenario, updateScenario } = lab;
  const city = findCity(profile.city);

  return (
    <Panel
      title="Your situation"
      description="Three answers produce a first estimate. Everything else is optional and can wait until you have a number in front of you."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput
          label="Head office country"
          value={profile.country}
          onChange={(event) => updateProfile({ country: event.target.value })}
          hint="Europe is not a country: Germany, Norway and Switzerland sit in three different privacy and trade positions, so this needs an actual one."
          groups={COUNTRY_GROUPS.map((group) => ({
            label: group.label,
            options: COUNTRIES.filter((country) => country.region === group.region).map((country) => ({
              value: country.code,
              label: country.name,
            })),
          }))}
        />

        <SelectInput
          label="Show figures in"
          value={profile.displayCurrency}
          onChange={(event) => updateProfile({ displayCurrency: event.target.value as CurrencyCode })}
          hint="Display currency only. It is separate from where the team is paid and from your reporting currency."
          options={SUPPORTED_CURRENCIES.map((code) => ({ value: code, label: code }))}
        />

        <SelectInput
          label="City in India"
          value={profile.city}
          onChange={(event) => updateProfile({ city: event.target.value as IndiaCityKey, cityIsDefault: false })}
          hint={
            profile.cityIsDefault
              ? `${cityLabel(profile.city)} is the workspace's opening assumption, not a recommendation. Change it, or compare cities later.`
              : city?.compensationCoverage === "modelled"
                ? "The compensation register covers this city."
                : "No compensation record covers this city. You will need to enter your own figures for every seat."
          }
          options={CITY_RECORDS.map((record) => ({
            value: record.key,
            label: record.compensationCoverage === "modelled" ? record.label : `${record.label} - your own costs only`,
          }))}
        />

        <SelectInput
          label="Work model"
          value={profile.workModel}
          onChange={(event) => updateProfile({ workModel: event.target.value as WorkModel })}
          hint="Changes the workspace cost line only."
          options={[
            { value: "office", label: "Full-time office" },
            { value: "hybrid", label: "Hybrid" },
            { value: "remote", label: "Remote-first" },
          ]}
        />
      </div>

      <div className="mt-5">
        <ChoiceGroup
          label="What are you comparing this against?"
          value={profile.objective}
          columns={2}
          options={OBJECTIVES}
          onChange={(objective) => {
            updateProfile({ objective });
            updateScenario({ baseline: { ...activeScenario.baseline, objective } });
          }}
          hint="This decides what a saving would even mean, and whether one can be produced at all. You can change it later."
        />
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------- templates */

function TemplatePicker({ lab }: { lab: LabCase }) {
  const [selected, setSelected] = useState<WorkloadKey | null>(null);
  const template = TEAM_TEMPLATES.find((entry) => entry.key === selected);

  const apply = () => {
    if (!template) return;
    const rows = template.core.map((seat) =>
      createTeamRow({
        roleKey: seat.roleKey,
        seniority: seat.seniority,
        fte: seat.fte,
        startMonth: 1,
        skillTags: seat.skillTags ?? [],
      }),
    );
    lab.setTeam(rows, `Applied the ${template.label.toLowerCase()}`);
    trackEvent("team_template_applied", { template: template.key });
  };

  return (
    <div className="mb-5">
      <div data-lab-templates className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-4">
        {TEAM_TEMPLATES.map((entry) => (
          <button
            key={entry.key}
            type="button"
            onClick={() => setSelected(entry.key)}
            aria-pressed={selected === entry.key}
            className={`text-left rounded-xl border px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
              selected === entry.key ? "border-secondary bg-secondary/[0.05]" : "border-black/[0.08] hover:border-black/[0.16]"
            }`}
          >
            <span className="block text-sm font-medium text-heading">{entry.label}</span>
            <span className="block text-xs text-body-muted mt-1 leading-relaxed">{entry.summary}</span>
          </button>
        ))}
      </div>

      {template && (
        <div className="rounded-xl border border-black/[0.08] p-4 space-y-4">
          <div>
            <SubHeading>What this shape owns</SubHeading>
            <ul className="text-sm text-body space-y-1 list-disc pl-4">
              {template.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SubHeading>Core seats</SubHeading>
              <ul className="text-sm text-body space-y-1.5">
                {template.core.map((seat) => (
                  <li key={`${seat.roleKey}-${seat.seniority}`}>
                    <span className="text-heading font-medium">
                      {seat.fte} x {LAB_ROLES.find((role) => role.key === seat.roleKey)?.label ?? seat.roleKey}, {seat.seniority}
                    </span>
                    {seat.shared && <span className="text-xs text-body-muted"> (usually shared, not a dedicated hire)</span>}
                    <span className="block text-xs text-body-muted">{seat.why}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SubHeading>Defer for now</SubHeading>
              <ul className="text-sm text-body space-y-1.5">
                {template.deferUntilLater.map((entry) => (
                  <li key={entry.roleKey}>
                    <span className="text-heading font-medium">{LAB_ROLES.find((role) => role.key === entry.roleKey)?.label ?? entry.roleKey}</span>
                    <span className="block text-xs text-body-muted">{entry.why}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Note title="What it assumes">
              <ul className="list-disc pl-4 space-y-1">
                {template.assumptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Note>
            <Note title="What has to exist outside the team">
              <ul className="list-disc pl-4 space-y-1">
                {template.deliveryDependencies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Note>
          </div>

          <p className="text-xs text-body-muted leading-relaxed">
            Roles HQ usually supplies:{" "}
            {template.usuallySuppliedByHq.map((key) => LAB_ROLES.find((role) => role.key === key)?.label ?? key).join(", ")}. These
            quantities are a proposal for a first delivery team pending NeoIntelli practitioner sign-off - not a validated
            staffing ratio, and not a guarantee that the team can deliver autonomously.
          </p>

          <ApplyControls lab={lab} proposedRows={template.core.map((seat) => createTeamRow({ roleKey: seat.roleKey, seniority: seat.seniority, fte: seat.fte }))} onApply={apply} />
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- planner */

function RolePlanner({ lab }: { lab: LabCase }) {
  const [answers, setAnswers] = useState<PlannerAnswers>({
    workload: null,
    stage: null,
    hqCapabilities: [],
    dataReadiness: "unknown",
    deliveryObjective: null,
    responsibilityOwner: "undecided",
    budgetCeilingMonthly: null,
  });

  const proposal = useMemo(() => proposeTeam(answers), [answers]);

  return (
    <div className="mb-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ChoiceGroup
          label="What is the work?"
          value={answers.workload}
          options={TEAM_TEMPLATES.map((template) => ({ value: template.key, label: template.label }))}
          onChange={(workload) => setAnswers((current) => ({ ...current, workload }))}
        />
        <div className="space-y-5">
          <ChoiceGroup
            label="Where is it today?"
            value={answers.stage}
            options={[
              { value: "idea", label: "An idea" },
              { value: "prototype", label: "A prototype" },
              { value: "in-production", label: "In production" },
            ]}
            onChange={(stage) => setAnswers((current) => ({ ...current, stage }))}
          />
          <ChoiceGroup
            label="Is the data this team needs ready?"
            value={answers.dataReadiness}
            options={[
              { value: "ready", label: "Yes" },
              { value: "partial", label: "Partly" },
              { value: "not-ready", label: "No" },
              { value: "unknown", label: "Not sure" },
            ]}
            onChange={(dataReadiness) => setAnswers((current) => ({ ...current, dataReadiness }))}
          />
        </div>
      </div>

      <CheckboxGroup
        label="Which of these does HQ already cover well?"
        values={answers.hqCapabilities}
        options={LAB_ROLES.map((role) => ({ value: role.key, label: role.label }))}
        onChange={(hqCapabilities) => setAnswers((current) => ({ ...current, hqCapabilities }))}
        columns={3}
        hint="Anything ticked here is left out of the proposal rather than duplicated."
      />

      <ChoiceGroup
        label="Who is accountable for what this team ships?"
        value={answers.responsibilityOwner}
        columns={2}
        options={[
          { value: "india-lead", label: "An India lead" },
          { value: "hq-lead", label: "An HQ leader" },
          { value: "shared", label: "Shared" },
          { value: "undecided", label: "Not decided yet" },
        ]}
        onChange={(responsibilityOwner) => setAnswers((current) => ({ ...current, responsibilityOwner }))}
      />

      {proposal && (
        <div className="rounded-xl border border-black/[0.08] p-4 space-y-4">
          <SubHeading>The proposal</SubHeading>
          <ul className="text-sm text-body space-y-1.5">
            {proposal.seats.map((seat, index) => (
              <li key={`${seat.roleKey}-${seat.seniority}-${index}`}>
                <span className="text-heading font-medium">
                  {seat.fte} x {LAB_ROLES.find((role) => role.key === seat.roleKey)?.label ?? seat.roleKey}, {seat.seniority}
                </span>
                <span className="block text-xs text-body-muted">{seat.why}</span>
              </li>
            ))}
          </ul>

          {proposal.removed.length > 0 && (
            <Note title="Left out on purpose">
              <ul className="list-disc pl-4 space-y-1">
                {proposal.removed.map((entry) => (
                  <li key={entry.seat.roleKey}>
                    {LAB_ROLES.find((role) => role.key === entry.seat.roleKey)?.label ?? entry.seat.roleKey}: {entry.why}
                  </li>
                ))}
              </ul>
            </Note>
          )}

          <div className="space-y-3">
            {proposal.recommendations.map((recommendation) => (
              <div key={recommendation.ruleId} className="rounded-xl border border-black/[0.06] px-3.5 py-3">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-heading">{recommendation.headline}</p>
                  <ConfidenceTag confidence={recommendation.confidence} />
                </div>
                <p className="text-xs text-body leading-relaxed">{recommendation.explanation}</p>
                {recommendation.alternatives.length > 0 && (
                  <p className="text-xs text-body-muted mt-1.5">Alternatives: {recommendation.alternatives.join("; ")}</p>
                )}
                {recommendation.missingEvidence.length > 0 && (
                  <p className="text-xs text-body-muted mt-1">Not established: {recommendation.missingEvidence.join("; ")}</p>
                )}
                <p className="text-2xs text-body-muted mt-1.5">
                  Rule {recommendation.ruleId} ({recommendation.ruleVersion}), fired by {recommendation.triggeringInputs.join(", ")}
                </p>
              </div>
            ))}
          </div>

          <ApplyControls
            lab={lab}
            proposedRows={proposalToRows(proposal)}
            onApply={() => {
              lab.setTeam(proposalToRows(proposal), `Applied the ${proposal.template.label.toLowerCase()} proposal`);
              trackEvent("team_template_applied", { template: proposal.template.key, source: "planner" });
            }}
          />
        </div>
      )}
    </div>
  );
}

/** Preview the diff, then apply. Undo restores the previous team exactly. */
function ApplyControls({ lab, proposedRows, onApply }: { lab: LabCase; proposedRows: TeamRow[]; onApply: () => void }) {
  const diff = useMemo(() => diffTeam(lab.profile.team, proposedRows), [lab.profile.team, proposedRows]);
  const roleName = (key: string) => LAB_ROLES.find((role) => role.key === key)?.label ?? key;

  return (
    <div className="rounded-xl bg-black/[0.02] px-3.5 py-3">
      <SubHeading>What applying this would change</SubHeading>
      {diff.added.length === 0 && diff.removed.length === 0 ? (
        <p className="text-xs text-body">Nothing - your team already matches this shape.</p>
      ) : (
        <ul className="text-xs text-body space-y-1">
          {diff.added.map((entry) => (
            <li key={`add-${entry.roleKey}-${entry.seniority}`}>
              Add {entry.fte} x {roleName(entry.roleKey)} ({entry.seniority})
            </li>
          ))}
          {diff.removed.map((entry) => (
            <li key={`remove-${entry.roleKey}-${entry.seniority}`}>
              Remove {entry.fte} x {roleName(entry.roleKey)} ({entry.seniority})
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <ActionButton variant="secondary" onClick={onApply}>
          <Wand2 aria-hidden className="w-4 h-4" /> Apply to my team
        </ActionButton>
        {lab.undo && (
          <ActionButton variant="ghost" onClick={lab.undo}>
            <Undo2 aria-hidden className="w-4 h-4" /> Undo: {lab.undoLabel}
          </ActionButton>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ team editor */

function TeamEditor({ lab }: { lab: LabCase }) {
  const { profile, updateTeamRow, removeTeamRow, addTeamRow, activeScenario } = lab;
  const benefitsRate = activeScenario.costAssumptions.benefitsRate ?? OPERATING_BANDS.benefitsRate.base;
  const complexity = activeScenario.costAssumptions.complexityMultiplier ?? 0;

  if (profile.team.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-black/[0.14] px-4 py-8 text-center">
        <p className="text-sm text-body-muted mb-3">No seats yet.</p>
        <ActionButton onClick={() => addTeamRow(createTeamRow({ roleKey: "ai", seniority: "senior" }))}>
          <Plus aria-hidden className="w-4 h-4" /> Add the first seat
        </ActionButton>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-2.5">
        {profile.team.map((row, index) => {
          const ctc = seatAnnualCtcInr(row, activeScenario.cityOverride ?? profile.city, activeScenario, benefitsRate, complexity);
          return (
          <li key={row.id} className="rounded-xl border border-black/[0.08] p-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <SelectInput
                label="Role"
                value={row.roleKey}
                onChange={(event) => updateTeamRow(row.id, { roleKey: event.target.value, skillTags: [] })}
                options={LAB_ROLES.map((role) => ({ value: role.key, label: role.label }))}
              />
              <SelectInput
                label="Seniority"
                value={row.seniority}
                onChange={(event) => updateTeamRow(row.id, { seniority: event.target.value as SeniorityKey })}
                options={SENIORITY_ORDER.map((key) => ({ value: key, label: seniorityLongLabel(key) }))}
              />
              <NumberInput
                label="FTE"
                value={row.fte}
                step={0.5}
                onValueChange={(value) => updateTeamRow(row.id, { fte: value ?? 0 })}
                hint={row.advisory ? "Advisory - costed, not counted as headcount" : undefined}
              />
              <NumberInput
                label="Start month"
                value={row.startMonth}
                min={1}
                step={1}
                onValueChange={(value) => updateTeamRow(row.id, { startMonth: Math.max(1, Math.round(value ?? 1)) })}
              />
              <div className="flex items-end">
                <ActionButton variant="ghost" onClick={() => removeTeamRow(row.id)} aria-label={`Remove seat ${index + 1}`}>
                  <Trash2 aria-hidden className="w-4 h-4" /> Remove
                </ActionButton>
              </div>
            </div>

            <p className="mt-2.5 text-xs text-body-muted">
              {ctc != null ? (
                <>
                  Costs about <span className="text-heading font-medium tabular-nums">{formatLakh(ctc)}</span> a year, cost to
                  company - the form this is quoted in locally.{" "}
                  {row.overrideAnnual != null ? "From your own figure." : "From the NeoIntelli planning band."}
                </>
              ) : (
                <>No benchmark covers this seat in {cityLabel(activeScenario.cityOverride ?? profile.city)}. Enter your own figure below or it is left out of the total.</>
              )}
            </p>

            <details className="mt-3">
              <summary className="text-xs text-accent-strong cursor-pointer hover:underline">
                Compensation, basis and focus areas
              </summary>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <NumberInput
                  label="Your own annual figure"
                  value={row.overrideAnnual}
                  onValueChange={(value) => updateTeamRow(row.id, { overrideAnnual: value })}
                  placeholder="Leave blank to use the benchmark"
                  suffix={row.overrideCurrency ?? profile.displayCurrency}
                  hint="Overrides the benchmark for this seat only."
                />
                <SelectInput
                  label="Currency of that figure"
                  value={row.overrideCurrency ?? profile.displayCurrency}
                  onChange={(event) => updateTeamRow(row.id, { overrideCurrency: event.target.value as CurrencyCode })}
                  options={SUPPORTED_CURRENCIES.map((code) => ({ value: code, label: code }))}
                />
                <SelectInput
                  label="What that figure includes"
                  value={row.compensationBasis}
                  onChange={(event) => updateTeamRow(row.id, { compensationBasis: event.target.value as TeamRow["compensationBasis"] })}
                  hint="India CTC already includes employer PF, gratuity and insurance, so nothing is added on top of it."
                  options={[
                    { value: "base-salary", label: "Base salary only" },
                    { value: "india-ctc", label: "India CTC (includes employer contributions)" },
                    { value: "total-employer-cost", label: "Total employer cost" },
                  ]}
                />
              </div>
              <div className="mt-3">
                <CheckboxGroup
                  label="Focus areas"
                  values={row.skillTags}
                  options={(LAB_ROLES.find((role) => role.key === row.roleKey)?.skillTags ?? []).map((tag) => ({
                    value: tag.key,
                    label: tag.label,
                  }))}
                  onChange={(skillTags) => updateTeamRow(row.id, { skillTags })}
                  columns={3}
                  hint="Recorded on the case. They do not change the price on their own."
                />
              </div>
              <label className="mt-3 flex items-center gap-2.5 text-sm text-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(row.advisory)}
                  onChange={(event) => updateTeamRow(row.id, { advisory: event.target.checked })}
                  className="accent-[hsl(var(--secondary))] w-4 h-4"
                />
                Part-time advisory - costed but not counted as headcount
              </label>
            </details>
          </li>
          );
        })}
      </ul>

      <div className="mt-3">
        <ActionButton variant="ghost" onClick={() => addTeamRow(createTeamRow({ roleKey: "ai", seniority: "senior" }))}>
          <Plus aria-hidden className="w-4 h-4" /> Add a seat
        </ActionButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ cost detail */

function CostDetail({ cost, money, currency }: { cost: CostResult; money: (value: number) => string; currency: CurrencyCode }) {
  return (
    <Panel
      title="Cost detail"
      description={`Every line, what it is charged on, and where the figure comes from. Figures shown in ${currency}.`}
    >
      <ScrollX label="Cost line items">
        <table className="w-full min-w-[640px] text-sm">
          <caption className="sr-only">Cost line items with their charging base, monthly and annual figures</caption>
          <thead>
            <tr className="text-left border-b border-black/[0.08]">
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Line</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Charged on</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">Steady month</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">First year</th>
              <th scope="col" className="py-2 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Basis</th>
            </tr>
          </thead>
          <tbody>
            {cost.lineItems.map((item) => {
              const notBudgeted = item.total === 0 && !item.coveredByBundle && NOT_BUDGETED.some((entry) => entry.category === item.category);
              return (
                <tr key={item.category} className="border-b border-black/[0.04]">
                  <th scope="row" className="py-2.5 pr-3 text-left font-medium text-heading">{CATEGORY_LABELS[item.category]}</th>
                  <td className="py-2.5 pr-3 text-xs text-body-muted">{CATEGORY_UNIT_LABELS[item.category]}</td>
                  <td className="py-2.5 pr-3 text-right tabular-nums text-body">
                    {item.coveredByBundle ? "In the fee" : notBudgeted ? "Not budgeted" : money(item.steadyStateMonthly)}
                  </td>
                  <td className="py-2.5 pr-3 text-right tabular-nums text-body">
                    {item.coveredByBundle ? "In the fee" : notBudgeted ? "Not budgeted" : money(item.firstYear)}
                  </td>
                  <td className="py-2.5"><BasisTag basis={item.basis} /></td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-black/[0.10]">
              <th scope="row" className="py-3 pr-3 text-left font-semibold text-heading">Total</th>
              <td className="py-3 pr-3 text-xs text-body-muted">Recurring lines at target size; first year is the real ramp</td>
              <td className="py-3 pr-3 text-right tabular-nums font-semibold text-heading">{money(cost.steadyStateMonthly)}</td>
              <td className="py-3 pr-3 text-right tabular-nums font-semibold text-heading">{money(cost.firstYearCash)}</td>
              <td className="py-3"><BasisTag basis="derived" /></td>
            </tr>
          </tbody>
        </table>
      </ScrollX>

      <Explain summary="Why the first-year figure is not twelve times the monthly one">
        <p>
          The monthly figure is the run rate once every seat is filled. The first-year figure is the sum of twelve actual months,
          most of which are not fully staffed, plus anything one-time. On a team that ramps, multiplying a full month by twelve
          overstates year one - often substantially.
        </p>
      </Explain>
    </Panel>
  );
}

/* -------------------------------------------------------- assumption ledger */

function AssumptionLedger({
  lab,
  snapshot,
  money,
}: {
  lab: LabCase;
  snapshot: ResultSnapshot;
  money: (value: number) => string;
}) {
  const { activeScenario, updateCostAssumption, updateScenario } = lab;
  const overrides = activeScenario.costAssumptions;

  return (
    <Panel
      title="Assumption ledger"
      description="Every default the estimate used, what it rests on, and a box to replace it. Nothing here is hidden inside the maths."
    >
      <ScrollX label="Assumptions used by this estimate">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left border-b border-black/[0.08]">
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Assumption</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold text-right">Value</th>
              <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Basis</th>
              <th scope="col" className="py-2 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Why</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.assumptions.map((assumption) => (
              <tr key={assumption.id} className="border-b border-black/[0.04] align-top">
                <th scope="row" className="py-2.5 pr-3 text-left font-medium text-heading">{assumption.label}</th>
                <td className="py-2.5 pr-3 text-right tabular-nums text-body whitespace-nowrap">
                  {assumption.descriptive ? "-" : assumption.id === "policy-value" ? "Zero" : assumption.value}
                  {assumption.low != null && assumption.high != null && (
                    <span className="block text-2xs text-body-muted">
                      {assumption.low} to {assumption.high}
                    </span>
                  )}
                  <span className="block text-2xs text-body-muted">{assumption.unit}</span>
                </td>
                <td className="py-2.5 pr-3"><BasisTag basis={assumption.basis} /></td>
                <td className="py-2.5 text-xs text-body-muted max-w-md">{assumption.confidenceRationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollX>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NumberInput
          label="Recruitment cost per hire"
          value={overrides.recruitmentPerHire}
          onValueChange={(value) => updateCostAssumption({ recruitmentPerHire: value })}
          placeholder="Not budgeted"
          hint="NeoIntelli has no approved default. Excluded until you enter one."
        />
        <NumberInput
          label="Laptop and equipment per hire"
          value={overrides.equipmentPerHire}
          onValueChange={(value) => updateCostAssumption({ equipmentPerHire: value })}
          placeholder="Not budgeted"
        />
        <NumberInput
          label="Entity, legal and payroll per month"
          value={overrides.entityLegalMonthly}
          onValueChange={(value) => updateCostAssumption({ entityLegalMonthly: value })}
          placeholder="Not budgeted"
        />
        <NumberInput
          label="Travel and HQ oversight per month"
          value={overrides.travelOversightMonthly}
          onValueChange={(value) => updateCostAssumption({ travelOversightMonthly: value })}
          placeholder="Not budgeted"
        />
        <NumberInput
          label="One-time setup"
          value={overrides.initialSetup}
          onValueChange={(value) => updateCostAssumption({ initialSetup: value })}
          placeholder="Not budgeted"
          hint="Charged in month 1. Also the ROI denominator."
        />
        <NumberInput
          label="Contingency"
          value={overrides.contingencyRate != null ? overrides.contingencyRate * 100 : undefined}
          onValueChange={(value) => updateCostAssumption({ contingencyRate: value == null ? undefined : value / 100 })}
          placeholder="0"
          suffix="%"
          hint="A declared percentage of the running cost, never folded into another line."
        />
        <div>
          <NumberInput
            label="Annual salary step-up"
            value={overrides.salaryEscalation != null ? overrides.salaryEscalation * 100 : undefined}
            onValueChange={(value) => updateCostAssumption({ salaryEscalation: value == null ? undefined : value / 100 })}
            placeholder="8"
            suffix="%"
            hint="Applied on each scenario anniversary. Stress-tested in Compare."
          />
          <AnchorButtons
            anchors={ESCALATION_ANCHORS}
            onPick={(value) => updateCostAssumption({ salaryEscalation: value })}
          />
        </div>
        <NumberInput
          label="Fractional AI leadership per month"
          value={overrides.fractionalLeadershipMonthly}
          onValueChange={(value) => updateCostAssumption({ fractionalLeadershipMonthly: value })}
          placeholder="0"
          hint="A flat retainer, not per seat."
        />
        <NumberInput
          label={`FX: INR per one ${lab.profile.displayCurrency}`}
          value={activeScenario.fx.quotes[lab.profile.displayCurrency]}
          step={0.01}
          onValueChange={(value) =>
            updateScenario({
              fx: {
                ...activeScenario.fx,
                quotes: { ...activeScenario.fx.quotes, [lab.profile.displayCurrency]: value ?? 0 },
                origin: "user-entered",
                quoteDate: new Date().toISOString().slice(0, 10),
              },
            })
          }
          hint={
            activeScenario.fx.origin === "user-entered"
              ? "Your rate. It travels with every export."
              : `NeoIntelli planning quote dated ${activeScenario.fx.quoteDate}. There is no live rate feed connected.`
          }
        />
      </div>

      <div className="mt-5">
        <ComputeConfig lab={lab} />
      </div>

      <div className="mt-5">
        <HowToGetTheFigure />
      </div>
    </Panel>
  );
}

/**
 * A blank field with no approved default is a dead end. Filling it with a
 * vendor's blended number would be worse - this model does not inherit anyone
 * else's figures. What is left is the thing a practitioner would actually say:
 * who to ask, and what to ask them for.
 */
function HowToGetTheFigure() {
  return (
    <details className="rounded-xl border border-black/[0.08] p-4">
      <summary className="text-sm font-medium text-heading cursor-pointer">
        How to get the figures this model will not invent for you
      </summary>
      <p className="text-xs text-body-muted mt-2 leading-relaxed">
        NeoIntelli has no approved planning figure for these lines, so they are excluded rather than guessed. None of them is
        hard to obtain; each needs one phone call or one look at a bill you already have.
      </p>
      <dl className="mt-3 space-y-3">
        {NOT_BUDGETED.map((item) => (
          <div key={item.category}>
            <dt className="text-sm font-medium text-heading">{item.label}</dt>
            <dd className="text-xs text-body leading-relaxed mt-0.5">{item.howToGetIt}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

/**
 * One-click published figures for an assumption NeoIntelli has no data of its
 * own for.
 *
 * Each carries its source and, more importantly, its scope - an all-industry
 * India increase is not a GCC increase, and saying so next to the button is
 * the difference between citing a source and hiding behind one.
 */
function AnchorButtons({
  anchors,
  onPick,
}: {
  anchors: typeof ESCALATION_ANCHORS;
  onPick: (value: number) => void;
}) {
  return (
    <div className="mt-2">
      <p className="text-2xs uppercase tracking-[0.14em] text-body-muted mb-1.5">Published figures you can adopt</p>
      <div className="flex flex-wrap gap-1.5">
        {anchors.map((anchor) => (
          <button
            key={anchor.id}
            type="button"
            onClick={() => onPick(anchor.value)}
            title={anchor.scope}
            className="rounded-full border border-black/[0.10] px-2.5 py-1 text-2xs text-heading transition-colors hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
          >
            {anchor.label}
          </button>
        ))}
      </div>
      <ul className="mt-1.5 space-y-1">
        {anchors.map((anchor) => (
          <li key={anchor.id} className="text-2xs text-body-muted leading-relaxed">
            <span className="text-heading">{anchor.label}</span> - {anchor.scope}{" "}
            {findSource(anchor.sourceId)?.url && (
              <a
                href={findSource(anchor.sourceId)!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-strong underline underline-offset-2"
              >
                {findSource(anchor.sourceId)!.publisher}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComputeConfig({ lab }: { lab: LabCase }) {
  const { activeScenario, updateScenario } = lab;
  const compute = activeScenario.aiCompute;
  const set = (patch: Partial<typeof compute>) => updateScenario({ aiCompute: { ...compute, ...patch } });

  return (
    <div className="rounded-xl border border-black/[0.08] p-4">
      <SubHeading>AI and cloud consumption</SubHeading>
      <ChoiceGroup
        label="How do you want to model it?"
        value={compute.mode}
        columns={3}
        options={[
          { value: "not-budgeted", label: "Not yet budgeted", description: "Excluded, and the estimate says so" },
          { value: "monthly-budget", label: "A monthly budget", description: "One figure a month" },
          { value: "structured", label: "GPU hours and API usage", description: "Quantities times rates" },
        ]}
        onChange={(mode) => set({ mode })}
        hint="There is no universal percentage of payroll for this, so the model does not apply one."
      />

      {compute.mode === "monthly-budget" && (
        <div className="mt-4 max-w-xs">
          <NumberInput
            label="Monthly budget"
            value={compute.monthlyBudget}
            onValueChange={(monthlyBudget) => set({ monthlyBudget })}
            suffix={lab.profile.displayCurrency}
          />
        </div>
      )}

      {compute.mode === "structured" && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput label="GPU hours a month" value={compute.gpuHoursPerMonth} onValueChange={(gpuHoursPerMonth) => set({ gpuHoursPerMonth })} />
          <NumberInput label="Rate per GPU hour" value={compute.gpuHourlyRate} onValueChange={(gpuHourlyRate) => set({ gpuHourlyRate })} />
          <NumberInput label="API units a month" value={compute.apiUnitsPerMonth} onValueChange={(apiUnitsPerMonth) => set({ apiUnitsPerMonth })} />
          <NumberInput label="Rate per API unit" value={compute.apiUnitRate} onValueChange={(apiUnitRate) => set({ apiUnitRate })} />
          <NumberInput label="Storage a month" value={compute.storageMonthly} onValueChange={(storageMonthly) => set({ storageMonthly })} />
          <NumberInput label="Platform a month" value={compute.platformMonthly} onValueChange={(platformMonthly) => set({ platformMonthly })} />
          <NumberInput
            label="One-time training"
            value={compute.oneTimeTraining}
            onValueChange={(oneTimeTraining) => set({ oneTimeTraining })}
            hint="Charged once, separately from recurring inference."
          />
          <NumberInput label="Month it is charged" value={compute.trainingMonth} min={1} step={1} onValueChange={(trainingMonth) => set({ trainingMonth })} />
          <NumberInput
            label="Hardware purchase"
            value={compute.hardwarePurchase}
            onValueChange={(hardwarePurchase) => set({ hardwarePurchase })}
            hint="Only if you are buying rather than renting. Both together will be flagged."
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ next actions */

function NextActions({ onGoTo }: { onGoTo: (area: "compare" | "prepare" | "pack") => void }) {
  return (
    <Panel title="What next">
      <div className="flex flex-wrap gap-2">
        <ActionButton variant="secondary" onClick={() => onGoTo("compare")}>Compare locations and test the economics</ActionButton>
        <ActionButton variant="ghost" onClick={() => onGoTo("prepare")}>Check what needs to be in place</ActionButton>
        <ActionButton variant="ghost" onClick={() => onGoTo("pack")}>Download the summary</ActionButton>
      </div>
      <p className="text-xs text-body-muted mt-3">Your inputs are kept as you move between these. Nothing is lost and nothing is sent anywhere.</p>
    </Panel>
  );
}
