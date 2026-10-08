import { useCallback, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import {
  validateCompanyName,
  validatePhone,
  validateRequiredChoice,
  validateWorkEmail,
} from "@/lib/formValidation";
import { trackEvent } from "@/lib/analytics";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { BODY, BTN_PRIMARY, FIELD, PANEL_RAISED } from "./theme";
import { FORM_NAME, PAGE_ID, trackCalendarOpen, trackFormStart } from "./tracking";

/**
 * Lead form for /lp/india-engineering-squad.
 *
 * Same submission path as the other paid landing pages: a Netlify form declared
 * in public/__forms.html and posted to the static /__forms.html endpoint (see
 * src/lib/netlifyForms.ts for why a rendered route cannot be the POST target).
 *
 * The form asks what the India team should own rather than what a squad should
 * cost: commercials on this page are discussed privately after a calibration
 * call, so nothing here promises or collects a price.
 *
 * Product type and the expected capability mix are asked because the page is
 * written for AI-first companies, where the useful qualifier is the shape of the
 * product and the engineering mix behind it rather than headcount alone.
 */

const HEADQUARTERS = ["United States", "United Kingdom", "European Union", "Other"];

const COMPANY_STAGES = ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B+", "Other"];

const PRODUCT_TYPES = [
  "AI-native SaaS",
  "Agentic AI",
  "GenAI / LLM product",
  "Machine Learning product",
  "Data / AI platform",
  "AI-enabled existing SaaS",
  "Other",
];

/**
 * Checkboxes rather than a multi-select, because the point of the question is
 * that an AI-first squad is usually several of these at once and a founder
 * should be able to see the whole mix while answering.
 */
const CAPABILITIES = [
  "AI / ML",
  "GenAI / LLM",
  "Data Engineering",
  "Backend Engineering",
  "Full Stack",
  "MLOps",
  "Cloud / Platform",
  "Engineering Leadership",
  "Not sure yet",
];

const TEAM_SIZES = ["3", "4", "5", "6–10", "Not sure"];

const START_WINDOWS = ["Immediately", "Within 30 days", "1–3 months", "3+ months", "Exploring"];

type FieldErrors = {
  name?: string;
  email?: string;
  company?: string;
  headquarters?: string;
  companyStage?: string;
  productType?: string;
  teamOwns?: string;
  teamSize?: string;
  startWhen?: string;
  phone?: string;
  submit?: string;
};

/** Document order, so focus lands on the first problem rather than the last. */
const FIELD_ORDER = [
  "name",
  "email",
  "company",
  "headquarters",
  "companyStage",
  "productType",
  "teamOwns",
  "teamSize",
  "startWhen",
  "phone",
] as const;

/**
 * The name field has no shared validator: it takes the same characters a
 * company name does, but its messages have to say "name".
 */
const validateFullName = (value: string): string | null => {
  const name = value.trim();
  if (!name) return "Your name is required.";
  if (name.length < 2) return "Please enter your full name.";
  if (name.length > 80) return "Please shorten your name.";
  return validateCompanyName(name) ? "Please remove any unsupported characters from your name." : null;
};

/** What the India team should own is the field the calibration call runs on. */
const validateTeamOwns = (value: string): string | null => {
  const answer = value.trim();
  if (!answer) return "Please tell us what the India team should own.";
  if (answer.length < 10) return "A sentence or two is enough. What should the team be responsible for?";
  if (answer.length > 1200) return "Please shorten this to the essentials.";
  return null;
};

const LABEL = "block text-xs text-[#101c4a] font-semibold mb-2";
const MICROCOPY = "text-2xs text-[#5d6a8a] mt-1.5";
const ERROR_TEXT = "text-2xs text-[#c0392b] mt-1.5";
const INVALID_FIELD = "border-[#c0392b]/50 ring-2 ring-[#c0392b]/15";

export default function SquadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const startedRef = useRef(false);

  const clearError = useCallback((field: keyof FieldErrors) => {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

  /** First keystroke or selection anywhere in the form, reported once. */
  const noteStart = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackFormStart();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "");

    // Company website and phone are the only optional fields.
    const nextErrors: FieldErrors = {
      name: validateFullName(read("name")) ?? undefined,
      email: validateWorkEmail(read("email")) ?? undefined,
      company: validateCompanyName(read("company")) ?? undefined,
      headquarters: validateRequiredChoice(read("headquarters"), "where you are headquartered") ?? undefined,
      companyStage: validateRequiredChoice(read("companyStage"), "your company stage") ?? undefined,
      productType: validateRequiredChoice(read("productType"), "what you are building") ?? undefined,
      teamOwns: validateTeamOwns(read("teamOwns")) ?? undefined,
      teamSize: validateRequiredChoice(read("teamSize"), "an initial team size") ?? undefined,
      startWhen: validateRequiredChoice(read("startWhen"), "when you want to start") ?? undefined,
      phone: validatePhone(read("phone")) ?? undefined,
    };

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setErrors(nextErrors);
      // Send focus to the first problem so the message is announced and the
      // field is on screen, rather than leaving people hunting for it.
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);
    appendAttributionToFormData(data);

    submitNetlifyForm(FORM_NAME, data)
      .then(() => {
        setSubmitted(true);
        trackEvent("contact_form_submit", {
          form: FORM_NAME,
          location: "lead_form_submit",
          page: PAGE_ID,
          headquarters: read("headquarters") || undefined,
          company_stage: read("companyStage") || undefined,
          product_type: read("productType") || undefined,
          team_size: read("teamSize") || undefined,
          start_when: read("startWhen") || undefined,
        });
        trackEvent("qualified_lead", { source: FORM_NAME, page: PAGE_ID });
      })
      .catch(() => setErrors({ submit: "Something went wrong. Please try again." }))
      .finally(() => setSubmitting(false));
  };

  if (submitted) {
    return (
      <div className={`${PANEL_RAISED} p-7 md:p-8 text-center`}>
        <div className="mb-5 flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f5fd0]/10 text-[#1f5fd0]">
            <Check className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <h2 className="mb-3 text-xl font-bold text-[#101c4a]">Thanks. We have your brief.</h2>
        <p className={`${BODY} mb-6`}>
          A NeoIntelli team member will review your requirements and contact you within one business day. If it is
          urgent, book a slot directly.
        </p>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCalendarOpen("form_confirmation")}
          className={`${BTN_PRIMARY} w-full`}
        >
          Book a 20-Minute Call <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className={`${PANEL_RAISED} p-6 md:p-8`}>
      <h2 className="mb-2 text-xl font-bold tracking-[-0.02em] text-[#101c4a] md:text-2xl">
        Tell us what you&apos;re building.
      </h2>
      <p className="mb-6 text-xs leading-relaxed text-[#5d6a8a]">
        We come back with a recommended squad structure, the AI and engineering roles behind it, and the hiring bar.
        Commercials are discussed privately after that.
      </p>

      <form
        name={FORM_NAME}
        method="POST"
        action={NETLIFY_FORMS_ENDPOINT}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onInput={noteStart}
        onChange={noteStart}
        className="space-y-3.5"
        noValidate
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        {/* Source tag, so a submission is attributable to this page in the CRM. */}
        <input type="hidden" name="source" value={FORM_NAME} />
        <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="bot-field">Don&apos;t fill this out if you are human: </label>
          <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
        </p>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              onChange={() => clearError("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${FIELD} ${errors.name ? INVALID_FIELD : ""}`}
            />
            {errors.name && <p id="name-error" className={ERROR_TEXT}>{errors.name}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor="email">Work email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              onChange={() => clearError("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby="email-help"
              className={`${FIELD} ${errors.email ? INVALID_FIELD : ""}`}
            />
            <p id="email-help" className={errors.email ? ERROR_TEXT : MICROCOPY}>
              {errors.email ?? "Please use your company email."}
            </p>
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="company">Company *</label>
            <input
              id="company"
              name="company"
              required
              autoComplete="organization"
              placeholder="Your company"
              onChange={() => clearError("company")}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "company-error" : undefined}
              className={`${FIELD} ${errors.company ? INVALID_FIELD : ""}`}
            />
            {errors.company && <p id="company-error" className={ERROR_TEXT}>{errors.company}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor="companyWebsite">
              Company website <span className="font-normal text-[#5d6a8a]">(optional)</span>
            </label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://"
              className={FIELD}
            />
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="headquarters">Headquarters *</label>
            <select
              id="headquarters"
              name="headquarters"
              required
              defaultValue=""
              onChange={() => clearError("headquarters")}
              aria-invalid={Boolean(errors.headquarters)}
              aria-describedby={errors.headquarters ? "headquarters-error" : undefined}
              className={`${FIELD} ${errors.headquarters ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select location</option>
              {HEADQUARTERS.map((place) => <option key={place} value={place}>{place}</option>)}
            </select>
            {errors.headquarters && <p id="headquarters-error" className={ERROR_TEXT}>{errors.headquarters}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor="companyStage">Company stage *</label>
            <select
              id="companyStage"
              name="companyStage"
              required
              defaultValue=""
              onChange={() => clearError("companyStage")}
              aria-invalid={Boolean(errors.companyStage)}
              aria-describedby={errors.companyStage ? "companyStage-error" : undefined}
              className={`${FIELD} ${errors.companyStage ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select your stage</option>
              {COMPANY_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
            </select>
            {errors.companyStage && <p id="companyStage-error" className={ERROR_TEXT}>{errors.companyStage}</p>}
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="productType">What best describes your product? *</label>
          <select
            id="productType"
            name="productType"
            required
            defaultValue=""
            onChange={() => clearError("productType")}
            aria-invalid={Boolean(errors.productType)}
            aria-describedby={errors.productType ? "productType-error" : undefined}
            className={`${FIELD} ${errors.productType ? INVALID_FIELD : ""}`}
          >
            <option value="" disabled>Select product type</option>
            {PRODUCT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.productType && <p id="productType-error" className={ERROR_TEXT}>{errors.productType}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor="teamOwns">What should the India team own? *</label>
          <textarea
            id="teamOwns"
            name="teamOwns"
            required
            rows={3}
            placeholder="e.g. Build our agent platform, backend APIs, RAG workflows and production data pipeline…"
            onChange={() => clearError("teamOwns")}
            aria-invalid={Boolean(errors.teamOwns)}
            aria-describedby={errors.teamOwns ? "teamOwns-error" : undefined}
            className={`${FIELD} resize-y ${errors.teamOwns ? INVALID_FIELD : ""}`}
          />
          {errors.teamOwns && <p id="teamOwns-error" className={ERROR_TEXT}>{errors.teamOwns}</p>}
        </div>

        <fieldset>
          <legend className={LABEL}>
            Which capabilities do you expect to hire? <span className="font-normal text-[#5d6a8a]">(optional)</span>
          </legend>
          <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
            {CAPABILITIES.map((capability) => (
              <label
                key={capability}
                className="flex cursor-pointer items-center gap-2.5 text-xs leading-snug text-[#2a3556]"
              >
                <input
                  type="checkbox"
                  name="capabilities"
                  value={capability}
                  className="h-4 w-4 shrink-0 rounded border-[#dde7f7] text-[#1f5fd0] accent-[#1f5fd0]"
                />
                {capability}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="teamSize">Initial team size *</label>
            <select
              id="teamSize"
              name="teamSize"
              required
              defaultValue=""
              onChange={() => clearError("teamSize")}
              aria-invalid={Boolean(errors.teamSize)}
              aria-describedby={errors.teamSize ? "teamSize-error" : undefined}
              className={`${FIELD} ${errors.teamSize ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select size</option>
              {TEAM_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
            {errors.teamSize && <p id="teamSize-error" className={ERROR_TEXT}>{errors.teamSize}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor="startWhen">When do you want to start? *</label>
            <select
              id="startWhen"
              name="startWhen"
              required
              defaultValue=""
              onChange={() => clearError("startWhen")}
              aria-invalid={Boolean(errors.startWhen)}
              aria-describedby={errors.startWhen ? "startWhen-error" : undefined}
              className={`${FIELD} ${errors.startWhen ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select timing</option>
              {START_WINDOWS.map((window) => <option key={window} value={window}>{window}</option>)}
            </select>
            {errors.startWhen && <p id="startWhen-error" className={ERROR_TEXT}>{errors.startWhen}</p>}
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="phone">
            Phone / WhatsApp <span className="font-normal text-[#5d6a8a]">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 000 000 0000"
            onChange={() => clearError("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-help"
            className={`${FIELD} ${errors.phone ? INVALID_FIELD : ""}`}
          />
          <p id="phone-help" className={errors.phone ? ERROR_TEXT : MICROCOPY}>
            {errors.phone ?? "Optional. Include your country code."}
          </p>
        </div>

        <button type="submit" disabled={submitting} className={`${BTN_PRIMARY} w-full py-4 disabled:opacity-60`}>
          {submitting ? "Sending…" : <>Discuss My AI Engineering Team <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
        </button>

        {errors.submit && <p className="text-center text-2xs text-[#c0392b]">{errors.submit}</p>}

        <p className="text-center text-2xs leading-relaxed text-[#5d6a8a]">
          A NeoIntelli team member will review your requirements and contact you within one business day.
        </p>
      </form>
    </div>
  );
}
