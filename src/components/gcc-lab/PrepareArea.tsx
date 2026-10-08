/**
 * Prepare: the entry arrangement, readiness, the risk register, the country
 * and policy considerations, and the launch plan.
 *
 * This is the area where the temptation to overclaim is strongest, so the
 * rules are visible in the markup: no green "eligible" badge anywhere, no
 * probability on a risk, no readiness verdict that an unanswered question can
 * reach, and every policy card carrying what it does not know.
 */

import { useMemo, useState } from "react";
import { COUNTRIES } from "@/lib/gcc-lab/countries";
import { ANSWER_LABELS, COVERAGE_NOTE, READINESS_DIMENSIONS, READINESS_QUESTIONS } from "@/lib/gcc-lab/readiness";
import { REGISTER_NOTE, SEVERITY_LABELS } from "@/lib/gcc-lab/risk";
import { POLICY_VALUE_NOTE, STATUS_EXPLANATIONS, STATUS_LABELS } from "@/lib/gcc-lab/policy";
import {
  PATHWAY_EXPLANATIONS,
  TRANSFER_MILESTONE_NOTE,
  TRANSFER_READINESS_CHECKS,
  recommendPathway,
  type ArrangementInputs,
} from "@/lib/gcc-lab/entryPathways";
import { WORKSTREAM_LABELS } from "@/lib/gcc-lab/launchPlan";
import { DEFAULT_HQ_SCHEDULE, DEFAULT_INDIA_SCHEDULE, workingOverlap, type WorkSchedule } from "@/lib/gcc-lab/overlap";
import { trackEvent } from "@/lib/analytics";
import {
  ChoiceGroup,
  CheckboxGroup,
  ConfidenceTag,
  Explain,
  Note,
  NumberInput,
  Panel,
  ScrollX,
  SelectInput,
  Stat,
  SubHeading,
  TextInput,
} from "./primitives";
import type { LabCase, useLabResults } from "./useLabCase";
import type { PlanTask, ReadinessAnswer, RiskItem } from "@/lib/gcc-lab/types";

export interface PrepareAreaProps {
  lab: LabCase;
  results: ReturnType<typeof useLabResults>;
}

export default function PrepareArea({ lab, results }: PrepareAreaProps) {
  return (
    <div className="space-y-5">
      <ArrangementBlock lab={lab} />
      <CountryBlock lab={lab} results={results} />
      <ReadinessBlock lab={lab} results={results} />
      <RiskBlock risks={results.risks} />
      <PlanBlock lab={lab} results={results} />
    </div>
  );
}

/* --------------------------------------------------------- entry arrangement */

function ArrangementBlock({ lab }: { lab: LabCase }) {
  const [inputs, setInputs] = useState<ArrangementInputs>({
    scale: "micro-centre",
    employer: "undecided",
    accountability: "undecided",
    ownership: "undecided",
    operations: "undecided",
    entityReady: "unknown",
    ownershipRequired: "unknown",
    urgency: "3-6-months",
    accountableLeader: "unknown",
    budgetHorizon: "unknown",
    deliveryMaturity: "unknown",
    willingToRunOperations: "unknown",
  });

  const result = useMemo(() => recommendPathway(inputs), [inputs]);
  const set = (patch: Partial<ArrangementInputs>) => setInputs((current) => ({ ...current, ...patch }));

  return (
    <Panel
      title="How you would enter"
      description="Five independent questions rather than a menu of named arrangements. Scale, who employs the team, who is accountable for delivery, what ownership you intend and who runs the day-to-day are separate decisions, and the familiar names are just combinations of them."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChoiceGroup
          label="Is owning the entity a requirement?"
          value={inputs.ownershipRequired}
          columns={2}
          options={[
            { value: "required", label: "Required" },
            { value: "preferred", label: "Preferred" },
            { value: "not-required", label: "Not required" },
            { value: "unknown", label: "Not sure" },
          ]}
          onChange={(ownershipRequired) => set({ ownershipRequired })}
        />
        <ChoiceGroup
          label="Do you have an Indian entity?"
          value={inputs.entityReady}
          columns={2}
          options={[
            { value: "yes", label: "Yes" },
            { value: "in-progress", label: "In progress" },
            { value: "no", label: "No" },
            { value: "unknown", label: "Not sure" },
          ]}
          onChange={(entityReady) => set({ entityReady })}
        />
        <ChoiceGroup
          label="Is there a named HQ leader accountable for this?"
          value={inputs.accountableLeader}
          columns={3}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unknown", label: "Not sure" },
          ]}
          onChange={(accountableLeader) => set({ accountableLeader })}
        />
        <ChoiceGroup
          label="How long is the funding horizon?"
          value={inputs.budgetHorizon}
          columns={2}
          options={[
            { value: "under-12-months", label: "Under 12 months" },
            { value: "12-24-months", label: "12 to 24 months" },
            { value: "over-24-months", label: "Over 24 months" },
            { value: "unknown", label: "Not sure" },
          ]}
          onChange={(budgetHorizon) => set({ budgetHorizon })}
        />
        <ChoiceGroup
          label="When do you need people working?"
          value={inputs.urgency}
          columns={2}
          options={[
            { value: "under-3-months", label: "Under 3 months" },
            { value: "3-6-months", label: "3 to 6 months" },
            { value: "6-12-months", label: "6 to 12 months" },
            { value: "no-date", label: "No fixed date" },
          ]}
          onChange={(urgency) => set({ urgency })}
        />
        <ChoiceGroup
          label="Do you want to run the day-to-day yourself?"
          value={inputs.willingToRunOperations}
          columns={3}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unknown", label: "Not sure" },
          ]}
          onChange={(willingToRunOperations) => set({ willingToRunOperations })}
        />
        <ChoiceGroup
          label="How settled is your delivery practice?"
          value={inputs.deliveryMaturity}
          columns={2}
          options={[
            { value: "established", label: "Established" },
            { value: "developing", label: "Developing" },
            { value: "new", label: "New" },
            { value: "unknown", label: "Not sure" },
          ]}
          onChange={(deliveryMaturity) => set({ deliveryMaturity })}
        />
        <ChoiceGroup
          label="What scale are you planning?"
          value={inputs.scale}
          columns={3}
          options={[
            { value: "small-team", label: "A small team" },
            { value: "micro-centre", label: "A micro centre" },
            { value: "larger-centre", label: "A larger centre" },
          ]}
          onChange={(scale) => set({ scale })}
          hint="Scale is a description, not a legal structure. A micro GCC can be direct, managed, or built to transfer."
        />
      </div>

      <div className="mt-5 space-y-3">
        {[result.primary, result.alternative].filter(Boolean).map((recommendation, index) => (
          <div key={recommendation!.ruleId} className="rounded-xl border border-black/[0.08] p-4">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <p className="text-2xs uppercase tracking-[0.14em] text-body-muted">{index === 0 ? "On these answers" : "Or"}</p>
              <ConfidenceTag confidence={recommendation!.confidence} />
            </div>
            <h4 className="text-base font-semibold text-heading mb-1.5">{recommendation!.headline}</h4>
            <p className="text-sm text-body leading-relaxed">{recommendation!.explanation}</p>
            {recommendation!.alternatives.length > 0 && (
              <p className="text-xs text-body-muted mt-2">Also consider: {recommendation!.alternatives.join("; ")}</p>
            )}
            {recommendation!.missingEvidence.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-body-muted">Not established:</p>
                <ul className="text-xs text-body-muted list-disc pl-4 mt-1 space-y-0.5">
                  {recommendation!.missingEvidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-2xs text-body-muted mt-2">Rule {recommendation!.ruleId} ({recommendation!.ruleVersion})</p>
          </div>
        ))}

        {result.decidingQuestions.length > 0 && (
          <Note title="What would change this answer">
            <ul className="list-disc pl-4 space-y-1">
              {result.decidingQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </Note>
        )}
      </div>

      <Explain summary="What the familiar names actually mean, and what they leave open">
        <ul className="space-y-3">
          {PATHWAY_EXPLANATIONS.map((pathway) => (
            <li key={pathway.key}>
              <span className="block font-medium text-heading">{pathway.label}</span>
              <span className="block">{pathway.summary}</span>
              <span className="block text-body-muted mt-1">Does not settle: {pathway.doesNotSettle.join("; ")}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-medium text-heading">If a transfer is intended</p>
        <p>{TRANSFER_MILESTONE_NOTE}</p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          {TRANSFER_READINESS_CHECKS.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
      </Explain>
    </Panel>
  );
}

/* -------------------------------------------------------- country and policy */

function CountryBlock({ lab, results }: { lab: LabCase; results: ReturnType<typeof useLabResults> }) {
  const { profile, updateProfile } = lab;
  const [hqSchedule, setHqSchedule] = useState<WorkSchedule>(DEFAULT_HQ_SCHEDULE);
  const [indiaSchedule, setIndiaSchedule] = useState<WorkSchedule>(DEFAULT_INDIA_SCHEDULE);
  const [dateIso, setDateIso] = useState(() => new Date().toISOString().slice(0, 10));

  const timeZone = profile.hqTimeZone ?? COUNTRIES.find((country) => country.code === profile.country)?.defaultTimeZone;
  const overlap = useMemo(
    () => workingOverlap(timeZone, new Date(`${dateIso}T12:00:00Z`), hqSchedule, indiaSchedule),
    [timeZone, dateIso, hqSchedule, indiaSchedule],
  );

  const zoneOptions = useMemo(() => {
    const zones = new Set(COUNTRIES.map((country) => country.defaultTimeZone));
    ["America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/Lisbon"].forEach((zone) => zones.add(zone));
    return Array.from(zones).sort().map((zone) => ({ value: zone, label: zone }));
  }, []);

  return (
    <Panel
      title="Country, data and mobility"
      description="What is surfaced here depends on what the India team would actually do, not only on where your head office is."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-4">
          <SubHeading>Data</SubHeading>
          <CheckboxGroup
            label="Whose personal data would the India team work with?"
            values={profile.privacy.dataOriginMarkets}
            options={COUNTRIES.filter((country) => country.code !== "OTHER" && country.code !== "UNKNOWN").map((country) => ({
              value: country.code,
              label: country.name,
            }))}
            onChange={(dataOriginMarkets) => updateProfile({ privacy: { ...profile.privacy, dataOriginMarkets } })}
            columns={2}
            hint="Where the data comes from, not where your head office is. A US company processing EEA data is in scope."
          />
          <ChoiceGroup
            label="Would India-based staff remotely access personal data held elsewhere?"
            value={profile.privacy.indiaRemoteAccess}
            columns={3}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unknown", label: "Not sure" },
            ]}
            onChange={(indiaRemoteAccess) => updateProfile({ privacy: { ...profile.privacy, indiaRemoteAccess } })}
            hint="Remote access can itself be a transfer. Where the server sits does not settle it."
          />
          <ChoiceGroup
            label="Which legal entity in India would receive it?"
            value={profile.privacy.receivingEntity}
            columns={2}
            options={[
              { value: "client-entity", label: "Our own entity" },
              { value: "provider-entity", label: "A provider's entity" },
              { value: "not-decided", label: "Not decided" },
              { value: "unknown", label: "Not sure" },
            ]}
            onChange={(receivingEntity) => updateProfile({ privacy: { ...profile.privacy, receivingEntity } })}
          />
          <Note>
            Do not enter any real customer or employee records anywhere in this workspace. Nothing here needs them, and nothing
            here is built to hold them.
          </Note>
        </div>

        <div className="space-y-4">
          <SubHeading>Mobility</SubHeading>
          <ChoiceGroup
            label="Would anyone be posted between your country and India?"
            value={profile.mobility.postingWorkers}
            columns={3}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unknown", label: "Not sure" },
            ]}
            onChange={(postingWorkers) => updateProfile({ mobility: { ...profile.mobility, postingWorkers } })}
          />
          {profile.mobility.postingWorkers === "yes" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label="Direction"
                value={profile.mobility.direction ?? "hq-to-india"}
                onChange={(event) => updateProfile({ mobility: { ...profile.mobility, direction: event.target.value as "hq-to-india" | "india-to-hq" } })}
                options={[
                  { value: "hq-to-india", label: "Head office to India" },
                  { value: "india-to-hq", label: "India to head office" },
                ]}
              />
              <TextInput
                label="Assignment start date"
                type="date"
                value={profile.mobility.assignmentStart ?? ""}
                onChange={(event) => updateProfile({ mobility: { ...profile.mobility, assignmentStart: event.target.value } })}
              />
              <NumberInput
                label="Expected duration, months"
                value={profile.mobility.expectedDurationMonths}
                min={1}
                step={1}
                onValueChange={(expectedDurationMonths) => updateProfile({ mobility: { ...profile.mobility, expectedDurationMonths } })}
              />
              <ChoiceGroup
                label="Did the assignment start before 15 July 2026?"
                value={profile.mobility.preExisting ?? "unknown"}
                columns={3}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "unknown", label: "Not sure" },
                ]}
                onChange={(preExisting) => updateProfile({ mobility: { ...profile.mobility, preExisting } })}
                hint="Pre-existing assignments are treated separately."
              />
            </div>
          )}

          <SubHeading>Working overlap</SubHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectInput
              label="Your time zone"
              value={timeZone ?? "UTC"}
              onChange={(event) => updateProfile({ hqTimeZone: event.target.value })}
              options={zoneOptions}
              hint="A country is not a time zone. New York and Los Angeles get different answers."
            />
            <TextInput label="On this date" type="date" value={dateIso} onChange={(event) => setDateIso(event.target.value)} />
            <NumberInput label="Your day starts" value={hqSchedule.start} step={0.5} max={24} onValueChange={(start) => setHqSchedule((s) => ({ ...s, start: start ?? 9 }))} suffix="h" />
            <NumberInput label="Your day ends" value={hqSchedule.end} step={0.5} max={24} onValueChange={(end) => setHqSchedule((s) => ({ ...s, end: end ?? 17 }))} suffix="h" />
            <NumberInput label="India day starts" value={indiaSchedule.start} step={0.5} max={24} onValueChange={(start) => setIndiaSchedule((s) => ({ ...s, start: start ?? 10 }))} suffix="h" />
            <NumberInput label="India day ends" value={indiaSchedule.end} step={0.5} max={24} onValueChange={(end) => setIndiaSchedule((s) => ({ ...s, end: end ?? 19 }))} suffix="h" />
          </div>
          <Stat
            label="Overlapping hours"
            value={overlap.unavailableReason ? null : `${overlap.hours} h`}
            unavailable={overlap.unavailableReason}
            basis="derived"
            sub={
              overlap.hqWindow
                ? `${overlap.hqWindow} your time, ${overlap.indiaWindow} in India. India is ${overlap.indiaAheadHours} hours ahead on this date.`
                : undefined
            }
          />
          <p className="text-xs text-body-muted">
            Calculated from the two time zones on the date you chose, so daylight saving is included. India does not observe it,
            so the gap moves twice a year for most of Europe and North America.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <SubHeading>Considerations surfaced for this case</SubHeading>
        <div className="space-y-3">
          {results.policies.map((entry) => (
            <div key={entry.record.id} className="rounded-xl border border-black/[0.08] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                <h4 className="text-base font-semibold text-heading">{entry.record.title}</h4>
                <span className="inline-flex items-center rounded-md border border-black/[0.10] px-2 py-0.5 text-2xs text-body-muted whitespace-nowrap">
                  {STATUS_LABELS[entry.status]}
                </span>
              </div>
              <p className="text-xs text-body-muted mb-2">{STATUS_EXPLANATIONS[entry.status]}</p>
              <p className="text-sm text-body leading-relaxed">{entry.record.summary}</p>
              <p className="text-xs text-body-muted mt-2">Surfaced because: {entry.reason}</p>

              {entry.commencementAtStart && (
                <div className="mt-3 rounded-lg bg-black/[0.02] px-3 py-2.5">
                  <p className="text-xs font-medium text-heading">
                    Read against your start date, {profile.startDate}
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {entry.commencementAtStart.inForce.map((step) => (
                      <li key={step.date} className="text-xs text-body">
                        <span className="text-heading font-medium">In force</span> since {step.date}: {step.what}
                      </li>
                    ))}
                    {entry.commencementAtStart.notYet.map((step) => (
                      <li key={step.date} className="text-xs text-body-muted">
                        <span className="text-heading font-medium">Not yet</span> - {step.date}: {step.what}
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xs text-body-muted mt-1.5">
                    Publication is not commencement. Confirm these against the notified text before you rely on them.
                  </p>
                </div>
              )}

              {entry.record.missingFacts.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-heading">Facts that decide it</p>
                  <ul className="text-xs text-body-muted list-disc pl-4 mt-1 space-y-0.5">
                    {entry.record.missingFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
              {entry.record.excludedCriteria.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-heading">Explicitly not covered</p>
                  <ul className="text-xs text-body-muted list-disc pl-4 mt-1 space-y-0.5">
                    {entry.record.excludedCriteria.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-2xs text-body-muted">
                <div>
                  <dt className="font-medium text-heading">Jurisdiction</dt>
                  <dd>{entry.record.jurisdiction}</dd>
                </div>
                <div>
                  <dt className="font-medium text-heading">Provision</dt>
                  <dd>{entry.record.provision}</dd>
                </div>
                <div>
                  <dt className="font-medium text-heading">As of</dt>
                  <dd>{entry.record.sourceAsOf}</dd>
                </div>
                <div>
                  <dt className="font-medium text-heading">Modelled value</dt>
                  <dd>Zero</dd>
                </div>
              </dl>
              <p className="text-xs text-body mt-2">Next step: {entry.record.nextValidationStep}</p>
              <div className="flex flex-wrap gap-x-4 mt-1.5">
                {entry.record.officialUrl && (
                  <a
                    href={entry.record.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-accent-strong hover:underline"
                  >
                    Official source
                  </a>
                )}
                {entry.record.secondaryUrl && (
                  <a
                    href={entry.record.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-accent-strong hover:underline"
                  >
                    The process itself
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Note title="Every one of these is modelled at zero">{POLICY_VALUE_NOTE}</Note>
        </div>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------- readiness */

function ReadinessBlock({ lab, results }: { lab: LabCase; results: ReturnType<typeof useLabResults> }) {
  const { profile, updateProfile } = lab;
  const readiness = results.readiness;

  const answer = (id: string, value: ReadinessAnswer) => {
    const next = { ...profile.readiness, [id]: value };
    updateProfile({ readiness: next });
    if (Object.keys(next).length === READINESS_QUESTIONS.length) {
      trackEvent("readiness_completed", { verdict: readiness.verdict });
    }
  };

  return (
    <Panel
      title="Readiness"
      description="Six dimensions, two questions each. None of them asks about revenue: a funded pre-revenue company with a mandate and an owner is more ready than a profitable one with neither."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
        <Stat label="Answered" value={`${readiness.answeredCount} of ${readiness.totalCount}`} basis="user-input" sub={COVERAGE_NOTE} />
        <Stat
          label="Verdict"
          value={
            readiness.verdict === "ready" ? "Ready" : readiness.verdict === "conditional" ? "Conditional" : readiness.verdict === "not-ready" ? "Not ready" : "Incomplete"
          }
          basis="derived"
          sub={readiness.verdictExplanation}
        />
        <Stat
          label="Open gates"
          value={String(readiness.openGates.length)}
          basis="derived"
          sub="A gate blocks a launch on its own. No score elsewhere offsets one."
        />
      </div>

      {readiness.openGates.length > 0 && (
        <Note tone="blocking" title="Gates">
          <ul className="space-y-1.5">
            {readiness.openGates.map((gate) => (
              <li key={gate.questionId}>
                <span className="font-medium">{gate.question}</span> - answered &ldquo;{gate.answer === "unanswered" ? "not answered" : ANSWER_LABELS[gate.answer as ReadinessAnswer]}&rdquo;. {gate.note}
              </li>
            ))}
          </ul>
        </Note>
      )}

      <div className="mt-5 space-y-5">
        {READINESS_DIMENSIONS.map((dimension) => {
          const summary = readiness.dimensions.find((entry) => entry.dimension.key === dimension.key)!;
          return (
            <div key={dimension.key} className="rounded-xl border border-black/[0.08] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h4 className="text-base font-semibold text-heading">{dimension.label}</h4>
                <p className="text-xs text-body-muted">
                  {summary.answered} of {summary.total} answered
                  {summary.maturity != null && ` · ${Math.round(summary.maturity * 100)}% in place`}
                </p>
              </div>
              <p className="text-xs text-body-muted mb-3">{dimension.description}</p>

              <div className="space-y-3">
                {READINESS_QUESTIONS.filter((question) => question.dimension === dimension.key).map((question) => (
                  <div key={question.id}>
                    <p className="text-sm text-heading font-medium">
                      {question.question}
                      {question.gate && <span className="ml-2 text-2xs uppercase tracking-[0.14em] text-body-muted">Gate</span>}
                    </p>
                    <p className="text-xs text-body-muted mb-2">{question.why}</p>
                    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={question.question}>
                      {(["in-place", "partly", "not-in-place", "not-sure"] as ReadinessAnswer[]).map((value) => {
                        const selected = profile.readiness[question.id] === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => answer(question.id, value)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 ${
                              selected ? "bg-primary text-white" : "border border-black/[0.10] text-heading hover:bg-black/[0.03]"
                            }`}
                          >
                            {ANSWER_LABELS[value]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {summary.gaps.length > 0 && (
                <p className="text-xs text-body-muted mt-3">
                  Gaps here: {summary.gaps.join("; ")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Explain summary="About the 0-40 score the older assessment used">
        <p>{readiness.legacyScoreRubric}</p>
        <p className="mt-2">
          On these answers it is {readiness.legacyScore} out of 40, at {Math.round(readiness.coverage * 100)}% coverage.
        </p>
      </Explain>
    </Panel>
  );
}

/* ------------------------------------------------------------------- risks */

function RiskBlock({ risks }: { risks: RiskItem[] }) {
  return (
    <Panel
      title="Risks"
      description="Ordered by severity, with what triggered each one and what would change it. There are no probabilities here because nothing in this model measures one."
    >
      {risks.length === 0 ? (
        <p className="text-sm text-body-muted">No rules have fired yet. Add a team and answer the readiness questions.</p>
      ) : (
        <ol className="space-y-3">
          {risks.map((risk) => (
            <li key={risk.id} className="rounded-xl border border-black/[0.08] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                <h4 className="text-base font-semibold text-heading">{risk.title}</h4>
                <span className="inline-flex items-center rounded-md border border-black/[0.10] px-2 py-0.5 text-2xs text-body-muted whitespace-nowrap">
                  {SEVERITY_LABELS[risk.severity]}
                </span>
              </div>
              <dl className="text-xs space-y-1.5">
                <div>
                  <dt className="inline font-medium text-heading">Trigger: </dt>
                  <dd className="inline text-body">{risk.trigger}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-heading">Why this severity: </dt>
                  <dd className="inline text-body">{risk.severityRationale}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-heading">What to do: </dt>
                  <dd className="inline text-body">{risk.mitigation}</dd>
                </div>
                {risk.missingEvidence.length > 0 && (
                  <div>
                    <dt className="inline font-medium text-heading">Not established: </dt>
                    <dd className="inline text-body-muted">{risk.missingEvidence.join("; ")}</dd>
                  </div>
                )}
                <div>
                  <dt className="inline font-medium text-heading">Owner: </dt>
                  {/* The phase belongs inside the definition: a <dl> may hold a
                      wrapping <div>, but only <dt> and <dd> inside it. */}
                  <dd className="inline text-body">
                    {risk.suggestedOwner}
                    <span className="text-body-muted">
                      {" · "}
                      {risk.phase === "before-launch" ? "Before launch" : risk.phase === "first-90-days" ? "First 90 days" : "Ongoing"}
                    </span>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      )}
      <div className="mt-4">
        <Note>{REGISTER_NOTE}</Note>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------- plan */

function PlanBlock({ lab, results }: { lab: LabCase; results: ReturnType<typeof useLabResults> }) {
  const plan = results.plan;
  const workstreams = Array.from(new Set(plan.tasks.map((task) => task.workstream)));

  return (
    <Panel
      title="The first 90 days"
      description="Dates are computed from prerequisites, so changing an answer moves the tasks that depend on it. Workstreams overlap; they are not a queue."
    >
      <Note tone={plan.runsPastNinetyDays ? "caution" : "info"} title={plan.runsPastNinetyDays ? "This plan runs past day 90" : "About day 90"}>
        {plan.note}
      </Note>

      <div className="mt-4 space-y-5">
        {workstreams.map((workstream) => (
          <div key={workstream}>
            <SubHeading>{WORKSTREAM_LABELS[workstream]}</SubHeading>
            <ScrollX label={`${WORKSTREAM_LABELS[workstream]} tasks`}>
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="text-left border-b border-black/[0.08]">
                    <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Task</th>
                    <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Owner</th>
                    <th scope="col" className="py-2 pr-3 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Days</th>
                    <th scope="col" className="py-2 text-2xs uppercase tracking-[0.14em] text-body-muted font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.tasks
                    .filter((task) => task.workstream === workstream)
                    .map((task) => (
                      <tr key={task.id} className="border-b border-black/[0.04] align-top">
                        <th scope="row" className="py-2.5 pr-3 text-left font-medium text-heading max-w-sm">
                          {task.title}
                          {task.note && <span className="block text-xs font-normal text-body-muted mt-0.5">{task.note}</span>}
                          {task.prerequisites.length > 0 && (
                            <span className="block text-2xs font-normal text-body-muted mt-0.5">
                              After: {task.prerequisites.join(", ")}
                            </span>
                          )}
                        </th>
                        <td className="py-2.5 pr-3 text-xs text-body">{task.ownerRole}</td>
                        <td className="py-2.5 pr-3 text-xs text-body tabular-nums whitespace-nowrap">
                          {task.startDay} to {task.endDay}
                          <span className="block text-2xs text-body-muted">{task.durationDays.low}-{task.durationDays.high} working days</span>
                        </td>
                        <td className="py-2.5">
                          <select
                            aria-label={`Status of ${task.title}`}
                            value={task.status}
                            onChange={(event) => lab.setPlanStatus(task.id, event.target.value as PlanTask["status"])}
                            className="rounded-lg border border-black/[0.10] bg-white px-2 py-1 text-xs text-heading focus:outline-none focus:ring-2 focus:ring-secondary/40"
                          >
                            <option value="not-started">Not started</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                            <option value="not-applicable">Not applicable</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </ScrollX>
          </div>
        ))}
      </div>
    </Panel>
  );
}
