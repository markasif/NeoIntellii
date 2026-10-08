import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
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
import { FORM_NAME, PAGE_ID } from "./tracking";

/**
 * Lead form for /lp/finance-procurement-shared-services-india.
 *
 * Same submission path as the other paid landing pages: a Netlify form declared
 * in public/__forms.html and posted to the static /__forms.html endpoint (see
 * src/lib/netlifyForms.ts for why a rendered route cannot be the POST target).
 */

const ROLES = [
  "CFO / Finance head",
  "COO / Operations",
  "Head of shared services or GBS",
  "Procurement head",
  "Other",
];

const HEADQUARTERS = ["India", "United States", "UK / EU", "Middle East", "Other"];

/** Process towers a group can consolidate. Multi-select: a group picks several. */
const PROCESSES = [
  "Accounts payable / P2P",
  "Record to report",
  "Order to cash / billing",
  "Claims",
  "FP&A and reporting",
  "Treasury",
  "Statutory compliance",
  "Procurement and vendor management",
];

const ENTITY_COUNTS = ["2 to 5", "6 to 15", "16 to 50", "50+"];

const TARGET_SIZES = ["Under 30", "30 to 50", "50 to 100", "100+"];

const TIMELINES = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Exploring"];

type FieldErrors = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  headquarters?: string;
  processes?: string;
  entities?: string;
  targetSize?: string;
  timeline?: string;
  phone?: string;
  submit?: string;
};

/** Document order, so focus lands on the first problem rather than the last. */
const FIELD_ORDER = [
  "name",
  "email",
  "company",
  "role",
  "headquarters",
  "processes",
  "entities",
  "targetSize",
  "timeline",
  "phone",
] as const;

/** The processes control is a button, not an input, so its id is the trigger's. */
const fieldElementId = (field: (typeof FIELD_ORDER)[number], variant: string) =>
  field === "processes" ? `processes-label-${variant}-trigger` : `${field}-${variant}`;

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

const validateSelectedProcesses = (processes: string[]): string | null =>
  processes.length > 0 ? null : "Please select at least one process.";

const LABEL = "block text-xs text-[#101c4a] font-semibold mb-2";
const MICROCOPY = "text-2xs text-[#5d6a8a] mt-1.5";
const ERROR_TEXT = "text-2xs text-[#c0392b] mt-1.5";
const INVALID_FIELD = "border-[#c0392b]/50 ring-2 ring-[#c0392b]/15";

/** Multi-select dropdown that posts each checked tower as a repeated `processes` field. */
function ProcessMultiSelect({
  selected,
  onToggle,
  invalid,
  labelId,
}: {
  selected: string[];
  onToggle: (process: string) => void;
  invalid: boolean;
  labelId: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const summary = selected.length === 0
    ? "Select the processes"
    : selected.length <= 2
      ? selected.join(", ")
      : `${selected.length} processes selected`;

  return (
    <div className="relative" ref={wrapperRef}>
      {/* The panel unmounts when closed, so the selection is mirrored into
          always-mounted hidden inputs to survive form submission. */}
      {selected.map((process) => <input key={process} type="hidden" name="processes" value={process} />)}

      {/* Naming the trigger by both ids reads as "Processes to consolidate, <selection>". */}
      <button
        type="button"
        id={`${labelId}-trigger`}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${labelId}-trigger`}
        className={`${FIELD} flex items-center justify-between text-left ${
          invalid ? INVALID_FIELD : ""
        } ${selected.length === 0 ? "text-[#5d6a8a]" : ""}`}
      >
        <span className="truncate">{summary}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-3 text-[#5d6a8a] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="group"
          aria-labelledby={labelId}
          className="absolute z-30 mt-2 w-full max-h-64 overflow-y-auto rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-[0_18px_50px_-20px_rgba(10,21,51,0.35)]"
        >
          {PROCESSES.map((process) => {
            const checked = selected.includes(process);
            return (
              <label
                key={process}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-[#2a3556]"
              >
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded border shrink-0 ${
                    checked ? "bg-[#1f5fd0] border-[#1f5fd0]" : "border-[#c3d6ec] bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {checked && <Check className="w-3 h-3 text-white" />}
                </span>
                <input
                  type="checkbox"
                  value={process}
                  checked={checked}
                  onChange={() => onToggle(process)}
                  className="sr-only"
                />
                {process}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SharedServicesForm({ variant }: { variant: "hero" | "final" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = useCallback((field: keyof FieldErrors) => {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

  const toggleProcess = (process: string) => {
    setSelectedProcesses((current) =>
      current.includes(process) ? current.filter((item) => item !== process) : [...current, process]);
    clearError("processes");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "");

    // Every field is required except the phone number.
    const nextErrors: FieldErrors = {
      name: validateFullName(read("name")) ?? undefined,
      email: validateWorkEmail(read("email")) ?? undefined,
      company: validateCompanyName(read("company")) ?? undefined,
      role: validateRequiredChoice(read("role"), "your role") ?? undefined,
      headquarters: validateRequiredChoice(read("headquarters"), "where you are headquartered") ?? undefined,
      processes: validateSelectedProcesses(selectedProcesses) ?? undefined,
      entities: validateRequiredChoice(read("entities"), "how many entities or units you have") ?? undefined,
      targetSize: validateRequiredChoice(read("targetSize"), "a target centre size") ?? undefined,
      timeline: validateRequiredChoice(read("timeline"), "your timeline") ?? undefined,
      phone: validatePhone(read("phone")) ?? undefined,
    };

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setErrors(nextErrors);
      // Send focus to the first problem so the message is announced and the
      // field is on screen, rather than leaving people hunting for it.
      document.getElementById(fieldElementId(firstInvalid, variant))?.focus();
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
          page: PAGE_ID,
          placement: variant,
          role: read("role") || undefined,
          headquarters: read("headquarters") || undefined,
          processes: selectedProcesses.join(", ") || undefined,
          entities: read("entities") || undefined,
          target_size: read("targetSize") || undefined,
          timeline: read("timeline") || undefined,
        });
        trackEvent("qualified_lead", { source: FORM_NAME, page: PAGE_ID });
      })
      .catch(() => setErrors({ submit: "Something went wrong. Please try again." }))
      .finally(() => setSubmitting(false));
  };

  if (submitted) {
    return (
      <div className={`${PANEL_RAISED} p-7 md:p-8 text-center`}>
        <div className="flex justify-center mb-5">
          <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1f5fd0]/10 text-[#1f5fd0]">
            <Check className="w-6 h-6" aria-hidden="true" />
          </span>
        </div>
        <h2 className="text-[#101c4a] text-xl font-bold mb-3">Thanks. We have your brief.</h2>
        <p className={`${BODY} mb-6`}>
          We reply within 1 business day with a proposed process scope, team shape and open-book monthly cost. If it
          is urgent, book a slot directly.
        </p>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("booked_consultation", { source: `${FORM_NAME}_confirmation`, page: PAGE_ID })
          }
          className={`${BTN_PRIMARY} w-full`}
        >
          Book a 30-minute call <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className={`${PANEL_RAISED} p-6 md:p-7`}>
      <h2 className="text-[#101c4a] text-xl md:text-2xl font-bold mb-2 tracking-[-0.02em]">
        Get a consolidation assessment
      </h2>
      <p className="text-[#5d6a8a] text-xs leading-relaxed mb-5">
        Tell us which processes sit in the entities today. We come back with the scope, the team shape and the cost.
      </p>

      <form
        name={FORM_NAME}
        method="POST"
        action={NETLIFY_FORMS_ENDPOINT}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-3.5"
        noValidate
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        {/* Source tag, so a submission is attributable to this page in the CRM. */}
        <input type="hidden" name="source" value={FORM_NAME} />
        <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor={`bot-field-${variant}`}>Don&apos;t fill this out if you are human: </label>
          <input id={`bot-field-${variant}`} name="bot-field" tabIndex={-1} autoComplete="off" />
        </p>

        <div>
          <label className={LABEL} htmlFor={`name-${variant}`}>Full name *</label>
          <input
            id={`name-${variant}`}
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            onChange={() => clearError("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `name-error-${variant}` : undefined}
            className={`${FIELD} ${errors.name ? INVALID_FIELD : ""}`}
          />
          {errors.name && <p id={`name-error-${variant}`} className={ERROR_TEXT}>{errors.name}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor={`email-${variant}`}>Work email *</label>
          <input
            id={`email-${variant}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            onChange={() => clearError("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={`email-help-${variant}`}
            className={`${FIELD} ${errors.email ? INVALID_FIELD : ""}`}
          />
          <p id={`email-help-${variant}`} className={errors.email ? ERROR_TEXT : MICROCOPY}>
            {errors.email ?? "Please use your company email."}
          </p>
        </div>

        <div>
          <label className={LABEL} htmlFor={`company-${variant}`}>Company *</label>
          <input
            id={`company-${variant}`}
            name="company"
            required
            autoComplete="organization"
            placeholder="Your company"
            onChange={() => clearError("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `company-error-${variant}` : undefined}
            className={`${FIELD} ${errors.company ? INVALID_FIELD : ""}`}
          />
          {errors.company && <p id={`company-error-${variant}`} className={ERROR_TEXT}>{errors.company}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5">
          <div>
            <label className={LABEL} htmlFor={`role-${variant}`}>Your role *</label>
            <select
              id={`role-${variant}`}
              name="role"
              required
              defaultValue=""
              onChange={() => clearError("role")}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? `role-error-${variant}` : undefined}
              className={`${FIELD} ${errors.role ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select your role</option>
              {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
            {errors.role && <p id={`role-error-${variant}`} className={ERROR_TEXT}>{errors.role}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor={`headquarters-${variant}`}>Headquarters *</label>
            <select
              id={`headquarters-${variant}`}
              name="headquarters"
              required
              defaultValue=""
              onChange={() => clearError("headquarters")}
              aria-invalid={Boolean(errors.headquarters)}
              aria-describedby={errors.headquarters ? `headquarters-error-${variant}` : undefined}
              className={`${FIELD} ${errors.headquarters ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select location</option>
              {HEADQUARTERS.map((place) => <option key={place} value={place}>{place}</option>)}
            </select>
            {errors.headquarters && (
              <p id={`headquarters-error-${variant}`} className={ERROR_TEXT}>{errors.headquarters}</p>
            )}
          </div>
        </div>

        <div>
          <span id={`processes-label-${variant}`} className={LABEL}>Processes to consolidate *</span>
          <ProcessMultiSelect
            selected={selectedProcesses}
            onToggle={toggleProcess}
            invalid={Boolean(errors.processes)}
            labelId={`processes-label-${variant}`}
          />
          {errors.processes
            ? <p className={ERROR_TEXT}>{errors.processes}</p>
            : <p className={MICROCOPY}>Select every tower you want in scope.</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5">
          <div>
            <label className={LABEL} htmlFor={`entities-${variant}`}>Entities or units *</label>
            <select
              id={`entities-${variant}`}
              name="entities"
              required
              defaultValue=""
              onChange={() => clearError("entities")}
              aria-invalid={Boolean(errors.entities)}
              aria-describedby={errors.entities ? `entities-error-${variant}` : undefined}
              className={`${FIELD} ${errors.entities ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select a number</option>
              {ENTITY_COUNTS.map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
            {errors.entities && <p id={`entities-error-${variant}`} className={ERROR_TEXT}>{errors.entities}</p>}
          </div>

          <div>
            <label className={LABEL} htmlFor={`targetSize-${variant}`}>Target size *</label>
            <select
              id={`targetSize-${variant}`}
              name="targetSize"
              required
              defaultValue=""
              onChange={() => clearError("targetSize")}
              aria-invalid={Boolean(errors.targetSize)}
              aria-describedby={errors.targetSize ? `targetSize-error-${variant}` : undefined}
              className={`${FIELD} ${errors.targetSize ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select size</option>
              {TARGET_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
            {errors.targetSize && <p id={`targetSize-error-${variant}`} className={ERROR_TEXT}>{errors.targetSize}</p>}
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor={`timeline-${variant}`}>Timeline *</label>
          <select
            id={`timeline-${variant}`}
            name="timeline"
            required
            defaultValue=""
            onChange={() => clearError("timeline")}
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? `timeline-error-${variant}` : undefined}
            className={`${FIELD} ${errors.timeline ? INVALID_FIELD : ""}`}
          >
            <option value="" disabled>Select timeline</option>
            {TIMELINES.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
          </select>
          {errors.timeline && <p id={`timeline-error-${variant}`} className={ERROR_TEXT}>{errors.timeline}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor={`phone-${variant}`}>
            Phone / WhatsApp <span className="text-[#5d6a8a] font-normal">(optional)</span>
          </label>
          <input
            id={`phone-${variant}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            onChange={() => clearError("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={`phone-help-${variant}`}
            className={`${FIELD} ${errors.phone ? INVALID_FIELD : ""}`}
          />
          <p id={`phone-help-${variant}`} className={errors.phone ? ERROR_TEXT : MICROCOPY}>
            {errors.phone ?? "Optional. Include your country code."}
          </p>
        </div>

        <button type="submit" disabled={submitting} className={`${BTN_PRIMARY} w-full py-4 disabled:opacity-60`}>
          {submitting ? "Sending…" : <>Get my assessment <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
        </button>

        {errors.submit && <p className="text-2xs text-[#c0392b] text-center">{errors.submit}</p>}

        <p className="text-2xs text-[#5d6a8a] text-center leading-relaxed">
          We reply within 1 business day with a proposed process scope, team shape and open-book monthly cost.
        </p>
      </form>
    </div>
  );
}
