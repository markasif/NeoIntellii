/**
 * "Review my GCC case" - the one place the workspace asks for contact details.
 *
 * Everything before this point works without them. This form is where a
 * visitor decides to send what they have built to a person, so it shows
 * exactly what would be sent before asking them to agree to send it.
 *
 * Rules this component exists to enforce:
 *   - Using the calculator is not consent to a sales conversation. Consent to
 *     send the case is a separate, explicit action, and marketing permission
 *     is a second, optional one.
 *   - Success is shown only after the submission is actually persisted. If the
 *     confirmation email fails afterwards, the wording changes; the submission
 *     is still saved and the reference is kept.
 *   - Retrying a failed send reuses the same submission id, so a second
 *     attempt cannot create a second lead.
 *   - No response-time promise is made anywhere, because none has been agreed.
 */

import { useMemo, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm } from "@/lib/netlifyForms";
import { validateWorkEmail } from "@/lib/formValidation";
import { trackEvent } from "@/lib/analytics";
import { formatMoney } from "@/lib/gcc-lab/currency";
import { cityLabel } from "@/lib/gcc-lab/cities";
import { newId } from "@/lib/gcc-lab/profile";
import { ActionButton, Note, Panel, SelectInput, SubHeading, TextInput } from "./primitives";
import type { CurrencyCode, ResultSnapshot } from "@/lib/gcc-lab/types";

export const REVIEW_FORM_NAME = "gcc-decision-lab";

export interface ReviewRequestProps {
  snapshot: ResultSnapshot;
  displayCurrency: CurrencyCode;
  toDisplay: (value: number) => number | null;
  /** Offered as the fallback when the submission cannot be saved. */
  onDownloadCsv: () => void;
}

type Status = "idle" | "sending" | "sent" | "failed";

const REVIEW_OBJECTIVES = [
  { value: "check-the-numbers", label: "Check whether these numbers are realistic" },
  { value: "team-shape", label: "Review the team shape and seniority mix" },
  { value: "entry-arrangement", label: "Talk through the entry arrangement" },
  { value: "launch-sequence", label: "Pressure-test the launch sequence" },
  { value: "something-else", label: "Something else" },
];

export default function ReviewRequest({ snapshot, displayCurrency, toDisplay, onDownloadCsv }: ReviewRequestProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string>();
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [failureMessage, setFailureMessage] = useState<string>();
  const startedTracked = useRef(false);

  // Stable for the life of this form, so a retry after a network failure
  // updates one submission instead of creating a second.
  const submissionId = useMemo(() => newId("review"), []);

  const money = (value: number): string => {
    const converted = toDisplay(value);
    return converted == null ? "Not available" : formatMoney(converted, displayCurrency);
  };

  const summaryRows: [string, string][] = [
    ["Case", snapshot.caseId],
    ["Team", `${snapshot.profile.team.length} seat(s) in ${cityLabel(snapshot.scenario.cityOverride ?? snapshot.profile.city)}`],
    ["First-year cash", money(snapshot.cost.firstYearCash)],
    ["Steady-state monthly", money(snapshot.cost.steadyStateMonthly)],
    ["What it is compared against", snapshot.economics.differenceLabel],
    ["Unresolved questions", String(snapshot.openQuestions.length)],
    ["Cost lines not budgeted", String(snapshot.cost.exclusions.length)],
  ];

  const dynamicIntro = useMemo(() => {
    if (snapshot.profile.team.length === 0) {
      return "You have not built a team yet. A practitioner can still talk it through, but there is nothing to review numerically - add a team first if you want feedback on the figures.";
    }
    if (snapshot.economics.baselineCashMonthly == null) {
      return "You have an India cost but no baseline, so there is no comparison in this case yet. Tell us below what the same scope costs you today and the review can cover both sides.";
    }
    if (snapshot.openQuestions.length > 4) {
      return `This case has ${snapshot.openQuestions.length} unresolved questions. They go with the case, so the review starts from what is actually missing rather than from the headline number.`;
    }
    return "A NeoIntelli practitioner will look at the team, the costs and the launch assumptions in this case and tell you what they would change.";
  }, [snapshot]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "");
    const emailProblem = validateWorkEmail(email);
    if (emailProblem) {
      setEmailError(emailProblem);
      form.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }
    setEmailError(undefined);

    if (!consent) return;

    setStatus("sending");
    setFailureMessage(undefined);

    // Coarse, consented case facts only. No salaries, no free text from the
    // profile, no privacy answers.
    data.set("submissionId", submissionId);
    data.set("caseId", snapshot.caseId);
    data.set("inputHash", snapshot.inputHash);
    data.set("modelVersion", snapshot.modelVersion);
    data.set("dataVersion", snapshot.dataVersion);
    data.set("currency", displayCurrency);
    data.set("city", cityLabel(snapshot.scenario.cityOverride ?? snapshot.profile.city));
    data.set("country", snapshot.profile.country);
    data.set("teamSize", String(snapshot.profile.team.length));
    data.set("objective", snapshot.profile.objective);
    data.set("firstYearCash", String(Math.round(toDisplay(snapshot.cost.firstYearCash) ?? 0)));
    data.set("steadyStateMonthly", String(Math.round(toDisplay(snapshot.cost.steadyStateMonthly) ?? 0)));
    data.set("paybackState", snapshot.economics.paybackState);
    data.set("openQuestions", String(snapshot.openQuestions.length));
    data.set("exclusions", String(snapshot.cost.exclusions.length));
    data.set("consent", "yes");
    data.set("marketingConsent", marketing ? "yes" : "no");
    appendAttributionToFormData(data);

    try {
      // Success is only claimed after this resolves. Nothing below can turn a
      // failed save into a confirmation.
      await submitNetlifyForm(REVIEW_FORM_NAME, data);
    } catch {
      setStatus("failed");
      setFailureMessage(
        "We could not save your request. Nothing has been sent. Try again - the reference stays the same, so a second attempt will not create a duplicate - or download the case and email it to reachus@neointelli.com.",
      );
      trackEvent("review_failed", { stage: "persistence" });
      return;
    }

    // Best effort, after the fact. Its failure changes the wording, never the
    // outcome: the request is already saved.
    let sent = false;
    try {
      const response = await fetch("/api/send-tool-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "cost",
          name: data.get("name") || undefined,
          email,
          company: data.get("company") || undefined,
          data: {
            city: cityLabel(snapshot.scenario.cityOverride ?? snapshot.profile.city),
            totalTeam: snapshot.profile.team.length,
            monthlyLow: Math.round(toDisplay(snapshot.cost.steadyStateBand?.low ?? snapshot.cost.steadyStateMonthly) ?? 0),
            monthlyHigh: Math.round(toDisplay(snapshot.cost.steadyStateBand?.high ?? snapshot.cost.steadyStateMonthly) ?? 0),
            annualLow: Math.round(toDisplay(snapshot.cost.steadyStateAnnual) ?? 0),
            annualHigh: Math.round(toDisplay(snapshot.cost.steadyStateAnnual) ?? 0),
          },
        }),
      });
      sent = response.ok;
    } catch {
      sent = false;
    }

    setEmailed(sent);
    setStatus("sent");
    trackEvent("review_submitted", { objective: String(data.get("reviewObjective") ?? "unspecified") });
  };

  if (status === "sent") {
    return (
      <Panel title="Request sent">
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden className="w-5 h-5 text-accent-strong shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-body leading-relaxed">
              Your case has been sent to a NeoIntelli practitioner with reference {snapshot.caseId}.
              {emailed
                ? " A copy of the figures is on its way to your inbox."
                : " The confirmation email did not go out, so check back here rather than waiting for it - your request itself is saved."}
            </p>
            <p className="text-xs text-body-muted mt-2">
              We have not promised a response time here because none has been agreed. If you need one, say so when we get in
              touch.
            </p>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="Review my GCC case"
      description="Have a NeoIntelli practitioner review your team, costs and launch assumptions."
    >
      <p className="text-sm text-body leading-relaxed mb-4">{dynamicIntro}</p>

      <div className="rounded-xl border border-black/[0.08] p-4 mb-5">
        <SubHeading>This is what would be sent</SubHeading>
        <dl className="text-sm space-y-1.5">
          {summaryRows.map(([label, value]) => (
            <div key={label} className="flex flex-wrap justify-between gap-3">
              <dt className="text-body-muted">{label}</dt>
              <dd className="text-heading text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-body-muted mt-3">
          Plus the full case - the team, the assumptions, the exclusions and the open questions - so the review starts from what
          you actually built rather than from a headline figure.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="form-name" value={REVIEW_FORM_NAME} />
        <p className="hidden">
          <label>
            Do not fill this in <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput label="Your name" name="name" required autoComplete="name" onFocus={() => {
            if (!startedTracked.current) {
              startedTracked.current = true;
              trackEvent("review_started", {});
            }
          }} />
          <TextInput
            label="Work email"
            name="email"
            type="email"
            required
            autoComplete="email"
            error={emailError}
            hint="A work address, so we can see who we would be talking to."
          />
          <TextInput label="Company" name="company" required autoComplete="organization" />
          <TextInput label="Your role" name="role" autoComplete="organization-title" hint="Optional." />
        </div>

        <div className="mt-4">
          <SelectInput
            label="What would you like reviewed?"
            name="reviewObjective"
            defaultValue="check-the-numbers"
            options={REVIEW_OBJECTIVES}
          />
        </div>

        <div className="mt-5 space-y-3">
          <label className="flex items-start gap-2.5 text-sm text-body cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-0.5 accent-[hsl(var(--secondary))] w-4 h-4 shrink-0"
              required
            />
            <span>
              Send this case and my contact details to NeoIntelli so a practitioner can review it and get in touch about it.
            </span>
          </label>
          <label className="flex items-start gap-2.5 text-sm text-body cursor-pointer">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
              className="mt-0.5 accent-[hsl(var(--secondary))] w-4 h-4 shrink-0"
            />
            <span>
              Separately, you may also send me occasional NeoIntelli updates. <span className="text-body-muted">Optional, and not needed for the review.</span>
            </span>
          </label>
        </div>

        {status === "failed" && failureMessage && (
          <div className="mt-4">
            <Note tone="blocking" title="Not sent">
              {failureMessage}
              <div className="mt-2">
                <ActionButton variant="ghost" onClick={onDownloadCsv}>
                  Download the case instead
                </ActionButton>
              </div>
            </Note>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!consent || status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send aria-hidden className="w-4 h-4" />
            {status === "sending" ? "Sending..." : status === "failed" ? "Try again" : "Review my GCC case"}
          </button>
          {!consent && <p className="text-xs text-body-muted">Tick the first box to enable this.</p>}
        </div>

        <p aria-live="polite" className="sr-only">
          {status === "sending" ? "Sending your request." : status === "failed" ? "Your request was not saved." : ""}
        </p>
      </form>
    </Panel>
  );
}
