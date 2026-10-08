import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Boxes,
  Brain,
  Briefcase,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cpu,
  Database,
  FileSearch,
  Gauge,
  Layers,
  Repeat,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import {
  validateCompanyName,
  validatePhone,
  validateRequiredChoice,
  validateSelectedRoles,
  validateWorkEmail,
} from "@/lib/formValidation";
import { trackEvent } from "@/lib/analytics";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { activeLenis } from "@/components/animations/SmoothScroll";
import HeroBackdrop from "@/components/landing/hire-ai-engineers/HeroBackdrop";
import ResumeCompare from "@/components/landing/hire-ai-engineers/ResumeCompare";
import ProcessSteps from "@/components/landing/hire-ai-engineers/ProcessSteps";
import PipelineVisual from "@/components/landing/hire-ai-engineers/PipelineVisual";
import ScorecardMock from "@/components/landing/hire-ai-engineers/ScorecardMock";
import SectionPanel from "@/components/landing/hire-ai-engineers/SectionPanel";
import { HexBadge, HexPattern } from "@/components/landing/hire-ai-engineers/Hex";
import { BODY, BODY_LG, BTN_PRIMARY, FIELD, H2, PANEL, PANEL_RAISED } from "@/components/landing/hire-ai-engineers/theme";

const FORM_NAME = "ai-hiring-lp";
const FORM_ANCHOR = "shortlist-form";

const COMPANY_TYPES = [
  "Product / SaaS company",
  "AI startup",
  "IT services / consulting (SME)",
  "Enterprise / Large IT services",
  "Other",
];

const ROLES = [
  "GenAI Engineer",
  "Agentic AI Engineer",
  "LLM Engineer",
  "AI/ML Engineer",
  "Data Scientist",
  "Data Engineer",
  "MLOps Engineer",
  "AI Architect",
  "Other",
];

const HIRE_COUNTS = ["1", "2-3", "4-10", "Building a full team"];

const TRUST_ITEMS = [
  "Permanent",
  "Contract",
  "Contract-to-Hire",
  "Recruitment PODs",
  "Full AI Team Build",
];

const PAIN_POINTS = [
  {
    icon: FileSearch,
    title: "Resume ≠ ability.",
    body: "Keyword-matched shortlists force your team to run 5-8 interviews to find one real engineer.",
  },
  {
    icon: Gauge,
    title: "The market moves against you.",
    body: "For in-demand GenAI/LLM profiles, offer-drop rates run high and senior AI engineers field multiple offers at once.",
  },
  {
    icon: Clock3,
    title: "Every unfilled week is roadmap slippage.",
    body: "Your product waits while you screen.",
  },
];

const VALIDATION_STEPS = [
  {
    icon: Sparkles,
    step: "Step 1",
    title: "NeoHireX AI Screening & Ranking",
    body: "Our proprietary AI ATS screens and ranks every profile against your actual role requirements - not just resume keywords.",
  },
  {
    icon: UserCheck,
    step: "Step 2",
    title: "AI-Powered First-Round Interview",
    body: "Shortlisted candidates complete a structured AI first-round interview that probes what they built, what they owned, and how they made engineering trade-offs.",
  },
  {
    icon: FileSearch,
    step: "Step 3",
    title: "Technical Round by Senior AI Engineers",
    body: "Practicing senior AI engineers assess real implementation depth - RAG architecture, agent orchestration, MLOps, data pipelines - matched to the specific role.",
  },
  {
    icon: ShieldCheck,
    step: "Step 4",
    title: "Final Validation by a 20-Year AI Delivery Expert",
    body: "A final sign-off by an AI expert with two decades of delivery experience. Only then do 1-2 profiles reach you.",
  },
];

const ROLE_GROUPS = [
  {
    icon: Brain,
    title: "Generative & Agentic AI",
    roles: ["GenAI Engineers", "Agentic AI Engineers", "LLM Engineers", "AI Agent Developers"],
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    roles: ["AI/ML Engineers", "Machine Learning Engineers", "Data Scientists"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    roles: ["Data Engineers", "Data Architects", "Analytics Engineers"],
  },
  {
    icon: Layers,
    title: "MLOps & Architecture",
    roles: ["MLOps Engineers", "AI Platform Engineers", "AI Architects"],
  },
];

const PROOF_POINTS = [
  {
    stat: "+25% YoY",
    title: "AI/ML hiring is growing while IT services hiring shrinks",
    body: "AI/ML roles grew 25% year-on-year in India even as IT/software services hiring fell 3% in the same month (JobSpeak Index 3,027 vs 2,854 a year earlier).",
    source: "Market data: India job-market index, published 3 July 2026",
  },
  {
    stat: "~15% CAGR",
    title: "Demand is outpacing supply",
    body: "India's AI talent pool is projected to grow from 600,000-650,000 to over 1,250,000 across 2022-27 (a ~15% CAGR), while the AI market grows at a 25-35% CAGR.",
    source: "Market data: India AI skills industry study, August 2024",
  },
  {
    stat: "1-2 profiles",
    title: "Only what survives four validation stages reaches you",
    body: "You review 1-2 profiles per role - because everything else was filtered out first.",
    source: null,
  },
  {
    stat: "ATS included",
    title: "NeoHireX ATS comes with the engagement",
    body: "No separate software to buy to run the engagement.",
    source: null,
  },
];

const ENGAGEMENT_MODELS = [
  { icon: Briefcase, title: "Permanent AI Hiring", body: "Recruit AI & Data professionals directly into your team." },
  { icon: Clock3, title: "Contract AI Talent", body: "Specialist capability for defined projects or periods." },
  { icon: Repeat, title: "Contract-to-Hire", body: "Try before you convert to permanent." },
  { icon: Users, title: "Dedicated Recruitment POD", body: "Ongoing hiring capacity for continuous AI/Data recruitment." },
  { icon: Boxes, title: "Full AI Team Building", body: "Complementary roles across Data, ML, GenAI, MLOps, Architecture." },
];

const FAQS = [
  {
    q: "How is this different from a normal recruitment agency?",
    a: "Normal agencies send resume-matched profiles and leave the technical filtering to you. We run four validation stages - NeoHireX AI screening, an AI first-round interview, a technical round with senior AI engineers, and final sign-off by a 20-year AI delivery expert - so only 1-2 ready-to-hire profiles per role reach you.",
  },
  {
    q: "Who is this for?",
    a: "Product and SaaS companies, AI startups, and small/mid-size IT services and consulting firms hiring AI & Data engineers for their own team. If you run in-house development and need validated AI talent fast, this is built for you.",
  },
  {
    q: "What does it cost?",
    a: "You pay only for the outcome (a successful hire), at industry-standard rates. NeoHireX, our AI-powered ATS, is included free as part of the engagement.",
  },
  {
    q: "What roles do you cover?",
    a: "GenAI, Agentic AI and LLM Engineers, AI Agent Developers, AI/ML Engineers, Data Scientists, Data Engineers, MLOps Engineers, and AI Architects - across permanent, contract, contract-to-hire, PODs and full-team builds.",
  },
  {
    q: "How fast will I see profiles?",
    a: "We calibrate the role, then run validation and return a small, pre-interviewed shortlist. Timelines depend on seniority and scarcity of the profile; we'll give you a realistic date at calibration.",
  },
  {
    q: "Do you work across India / remote?",
    a: "Yes - we support hiring across all India locations and remote/hybrid teams.",
  },
];

const scrollToForm = () => {
  if (typeof document === "undefined") return;
  const anchors = Array.from(document.querySelectorAll<HTMLElement>(`[data-${FORM_ANCHOR}]`));
  if (anchors.length === 0) return;
  const tops = anchors.map((anchor) => anchor.getBoundingClientRect().top + window.scrollY - 24);
  // The page carries the form twice (hero + final CTA); jump to the nearer one.
  const top = tops.reduce((closest, value) =>
    Math.abs(value - window.scrollY) < Math.abs(closest - window.scrollY) ? value : closest);
  if (activeLenis) activeLenis.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
};

type FieldErrors = {
  email?: string;
  company?: string;
  companyType?: string;
  roles?: string;
  hireCount?: string;
  phone?: string;
  submit?: string;
};

/** Document order, so focus lands on the first problem rather than the last. */
const FIELD_ORDER = ["email", "company", "companyType", "roles", "hireCount", "phone"] as const;

/** The roles control is a button, not an input, so its id is the trigger's. */
const fieldElementId = (field: (typeof FIELD_ORDER)[number], variant: string) => {
  const ids: Record<(typeof FIELD_ORDER)[number], string> = {
    email: `email-${variant}`,
    company: `company-${variant}`,
    companyType: `company-type-${variant}`,
    roles: `roles-label-${variant}-trigger`,
    hireCount: `hire-count-${variant}`,
    phone: `phone-${variant}`,
  };
  return ids[field];
};

const LABEL = "block text-xs text-[#14205c] font-semibold mb-2";
const MICROCOPY = "text-2xs text-[#5a6785] mt-1.5";
const ERROR_TEXT = "text-2xs text-[#c0392b] mt-1.5";
const INVALID_FIELD = "border-[#c0392b]/50 ring-2 ring-[#c0392b]/15";

/** Multi-select dropdown that posts each checked role as a repeated `roles` field. */
function RoleMultiSelect({
  selected,
  onToggle,
  invalid,
  labelId,
}: {
  selected: string[];
  onToggle: (role: string) => void;
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
    ? "Select role(s)"
    : selected.length <= 2
      ? selected.join(", ")
      : `${selected.length} roles selected`;

  return (
    <div className="relative" ref={wrapperRef}>
      {/* The panel unmounts when closed, so the selection is mirrored into
          always-mounted hidden inputs to survive form submission. */}
      {selected.map((role) => <input key={role} type="hidden" name="roles" value={role} />)}

      {/* Naming the trigger by both ids reads as "Role(s) you're hiring, <selection>". */}
      <button
        type="button"
        id={`${labelId}-trigger`}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${labelId}-trigger`}
        className={`${FIELD} flex items-center justify-between text-left ${
          invalid ? "border-[#c0392b]/40 ring-2 ring-[#c0392b]/15" : ""
        } ${selected.length === 0 ? "text-[#5a6785]" : ""}`}
      >
        <span className="truncate">{summary}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 ml-3 text-[#5a6785] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="group"
          aria-labelledby={labelId}
          className="absolute z-30 mt-2 w-full max-h-64 overflow-y-auto rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-[0_18px_50px_-20px_rgba(10,31,82,0.35)]"
        >
          {ROLES.map((role) => {
            const checked = selected.includes(role);
            return (
              <label
                key={role}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-[#2b3557]"
              >
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded border shrink-0 ${
                    checked ? "bg-[#0b57bd] border-[#0b57bd]" : "border-[#c3d6ec] bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {checked && <Check className="w-3 h-3 text-white" />}
                </span>
                <input
                  type="checkbox"
                  value={role}
                  checked={checked}
                  onChange={() => onToggle(role)}
                  className="sr-only"
                />
                {role}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ShortlistForm({ variant }: { variant: "hero" | "final" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = useCallback((field: keyof FieldErrors) => {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

  const toggleRole = useCallback((role: string) => {
    setSelectedRoles((current) =>
      current.includes(role) ? current.filter((value) => value !== role) : [...current, role],
    );
    clearError("roles");
  }, [clearError]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "");

    // Every field is required except the phone number.
    const nextErrors: FieldErrors = {
      email: validateWorkEmail(read("email")) ?? undefined,
      company: validateCompanyName(read("company")) ?? undefined,
      companyType: validateRequiredChoice(read("companyType"), "your company type") ?? undefined,
      roles: validateSelectedRoles(selectedRoles) ?? undefined,
      hireCount: validateRequiredChoice(read("hireCount"), "how many hires you need") ?? undefined,
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
          company_type: (data.get("companyType") as string) || undefined,
          hire_count: (data.get("hireCount") as string) || undefined,
          roles: selectedRoles.join(", "),
        });
        trackEvent("qualified_lead", { source: FORM_NAME });
      })
      .catch(() => setErrors({ submit: "Something went wrong. Please try again." }))
      .finally(() => setSubmitting(false));
  };

  if (submitted) {
    return (
      <div className={`${PANEL_RAISED} p-7 md:p-8 text-center`}>
        <div className="flex justify-center mb-5">
          <HexBadge icon={Check} tone="cyan" size="md" />
        </div>
        <h2 className="text-[#14205c] text-xl font-bold mb-3">Thanks - we've got your request.</h2>
        <p className={`${BODY} mb-6`}>
          A NeoIntelli AI hiring specialist will reach out within 1 business day. If it's urgent, book a slot directly.
        </p>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booked_consultation", { source: `${FORM_NAME}_confirmation` })}
          className={`${BTN_PRIMARY} w-full`}
        >
          Book a consultation <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className={`${PANEL_RAISED} p-6 md:p-7`}>
      <h2 className="text-[#14205c] text-xl md:text-2xl font-bold mb-2 tracking-[-0.02em]">
        Tell us the role. Get your shortlist.
      </h2>
      <p className="text-[#5a6785] text-xs leading-relaxed mb-5">
        For companies hiring AI &amp; Data engineers for their own team. 1-2 ready-to-hire profiles per role. No obligation.
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
        <p className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor={`bot-field-${variant}`}>Don't fill this out if you are human: </label>
          <input id={`bot-field-${variant}`} name="bot-field" tabIndex={-1} autoComplete="off" />
        </p>

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
          <label className={LABEL} htmlFor={`company-${variant}`}>Company name *</label>
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

        <div>
          <label className={LABEL} htmlFor={`company-type-${variant}`}>Company type *</label>
          <select
            id={`company-type-${variant}`}
            name="companyType"
            required
            defaultValue=""
            onChange={() => clearError("companyType")}
            aria-invalid={Boolean(errors.companyType)}
            aria-describedby={errors.companyType ? `company-type-error-${variant}` : undefined}
            className={`${FIELD} ${errors.companyType ? INVALID_FIELD : ""}`}
          >
            <option value="" disabled>Select company type</option>
            {COMPANY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.companyType && <p id={`company-type-error-${variant}`} className={ERROR_TEXT}>{errors.companyType}</p>}
        </div>

        <div>
          <span id={`roles-label-${variant}`} className={LABEL}>Role(s) you're hiring *</span>
          <RoleMultiSelect
            selected={selectedRoles}
            onToggle={toggleRole}
            invalid={Boolean(errors.roles)}
            labelId={`roles-label-${variant}`}
          />
          {errors.roles
            ? <p className={ERROR_TEXT}>{errors.roles}</p>
            : <p className={MICROCOPY}>Select all that apply.</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor={`hire-count-${variant}`}>How many hires? *</label>
          <select
            id={`hire-count-${variant}`}
            name="hireCount"
            required
            defaultValue=""
            onChange={() => clearError("hireCount")}
            aria-invalid={Boolean(errors.hireCount)}
            aria-describedby={errors.hireCount ? `hire-count-error-${variant}` : undefined}
            className={`${FIELD} ${errors.hireCount ? INVALID_FIELD : ""}`}
          >
            <option value="" disabled>Select number of hires</option>
            {HIRE_COUNTS.map((count) => <option key={count} value={count}>{count}</option>)}
          </select>
          {errors.hireCount && <p id={`hire-count-error-${variant}`} className={ERROR_TEXT}>{errors.hireCount}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor={`phone-${variant}`}>
            Phone / WhatsApp <span className="text-[#5a6785] font-normal">(optional)</span>
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
            {errors.phone ?? "Optional - for faster coordination. Include your country code."}
          </p>
        </div>

        <button type="submit" disabled={submitting} className={`${BTN_PRIMARY} w-full py-4 disabled:opacity-60`}>
          {submitting ? "Sending…" : <>Get My Shortlist <ArrowRight className="w-4 h-4" /></>}
        </button>

        {errors.submit && <p className="text-2xs text-[#c0392b] text-center">{errors.submit}</p>}

        <p className="text-2xs text-[#5a6785] text-center leading-relaxed">
          We reply within 1 business day with next steps. Your details stay confidential.
        </p>
      </form>
    </div>
  );
}

export default function HireAiEngineers() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Logo-only header - no site navigation on a paid landing page */}
      <header className="border-b border-[#dbe7f6] bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 md:h-[72px] flex items-center">
          <img
            src="/images/neointelli_logo.webp"
            alt="NeoIntelli"
            width={150}
            height={32}
            className="h-7 md:h-8 w-auto"
          />
        </div>
      </header>

      {/* SECTION 1+2 - Hero with embedded form */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef5fd] via-[#f7fafe] to-white px-6 sm:px-8 lg:px-12 pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="opacity-40 md:opacity-100"><HeroBackdrop /></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_440px] gap-10 lg:gap-14 items-start">
            <div>
              <p className="text-[#00708f] text-xs md:text-sm tracking-[0.16em] uppercase font-semibold mb-5">
                Specialist AI &amp; Data Recruitment &bull; India
              </p>
              <h1 className="text-5xl leading-[1.03] md:text-7xl font-bold tracking-[-0.03em] mb-6">
                <span className="block text-[#14205c]">Stop Interviewing.</span>
                <span className="block text-[#0b57bd]">Start Hiring.</span>
              </h1>
              <span aria-hidden="true" className="block w-16 h-1 rounded-full bg-[#0b57bd] mb-6" />
              <p className={`${BODY_LG} max-w-2xl mb-8`}>
                Get 1-2 pre-interviewed, technically validated AI &amp; Data engineers per role - screened by
                NeoHireX AI, tested by senior AI engineers, and signed off by a 20-year AI delivery expert before
                they ever reach your calendar. <span className="text-[#0b57bd] font-semibold">You pay only for the outcome, at standard rates.</span>
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={() => { trackEvent("cta_click", { location: "hero_primary" }); scrollToForm(); }}
                  className={BTN_PRIMARY}
                >
                  Request Your Shortlist <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => { trackEvent("cta_click", { location: "hero_secondary" }); scrollToForm(); }}
                  className="inline-flex items-center gap-1.5 text-[#0b57bd] text-sm font-semibold"
                >
                  See how it works <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-9 pt-7 border-t border-[#dbe7f6]">
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#5a6785]">
                  {TRUST_ITEMS.map((item, index) => (
                    <li key={item} className="flex items-center gap-3">
                      {index > 0 && <span aria-hidden="true" className="text-[#0084b4]/40">&bull;</span>}
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#00708f] font-semibold mt-2">NeoHireX ATS included free</p>
              </div>
            </div>

            <div id={FORM_ANCHOR} data-shortlist-form className="lg:sticky lg:top-8 scroll-mt-6">
              <ShortlistForm variant="hero" />
            </div>
          </div>

          {/* Hero graphic: the four validation gates over a receding data corridor */}
          <div className="mt-12 md:mt-16">
            <PipelineVisual />
          </div>
        </div>
      </section>

      {/* SECTION 3 - Problem */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className={`${H2} mb-6 max-w-3xl`}>
            Interviewing AI talent is eating your engineers' time - and you're still not sure they can build.
          </h2>
          <p className={`${BODY_LG} max-w-3xl mb-10`}>
            Two candidates both list &ldquo;LLMs, RAG, machine learning, Agentic AI&rdquo; on their resumes. One
            shipped a production agent that survived real traffic. The other followed a tutorial. Telling them
            apart takes hours of your senior engineers' time - time they should spend building your product.
          </p>

          <div className="mb-10">
            <ResumeCompare />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {PAIN_POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <HexBadge icon={Icon} tone="cyan" size="md" className="mb-4" />
                <h3 className="text-sm text-[#14205c] font-semibold mb-2">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>

          {/* The pivot line, given the dark-panel treatment from the artwork */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1f52] px-6 py-7 md:px-10 md:py-9">
            <HexPattern tone="dark" className="inset-0" />
            <p className="relative text-xl md:text-2xl font-bold tracking-[-0.02em] leading-snug">
              <span className="text-white">So we flipped the model: we do the interviewing. </span>
              <span className="text-[#90c0f0]">You do the hiring.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 - The four-step validation process */}
      <section className="relative overflow-hidden bg-[#f2f7fd] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="relative max-w-6xl mx-auto">
          <h2 className={`${H2} mb-12 max-w-3xl`}>
            Every candidate is technically validated before they reach you.
          </h2>

          <ProcessSteps steps={VALIDATION_STEPS} />

          <SectionPanel label="What you receive" className="mt-14">
            <p className={`${BODY_LG} text-center max-w-3xl mx-auto`}>
              You receive 1-2 pre-interviewed, ready-to-hire profiles per role. You pay only for the outcome, at
              industry-standard rates. <span className="text-[#0b57bd] font-semibold">NeoHireX (our AI-powered ATS) is included free</span> in your
              recruitment engagement.
            </p>
          </SectionPanel>
        </div>
      </section>

      {/* SECTION 5 - Roles grid */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${H2} mb-10`}>AI &amp; Data roles we validate and place</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROLE_GROUPS.map(({ icon: Icon, title, roles }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <HexBadge icon={Icon} tone="blue" size="md" className="mb-4" />
                <h3 className="text-sm text-[#14205c] font-semibold mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {roles.map((role) => (
                    <li key={role} className="flex items-start gap-2.5 text-[#2b3557] text-sm leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-[#0084b4] mt-1 shrink-0" aria-hidden="true" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3.5">
            <HexBadge icon={Target} tone="cyan" size="sm" />
            <p className={`${BODY_LG} pt-1.5`}>
              Hiring for your own product team? <span className="text-[#0b57bd] font-semibold">That's exactly who we build for.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 - Proof */}
      <section className="bg-[#f2f7fd] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${H2} mb-12`}>Built for companies that build.</h2>

          <div className="grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            <ScorecardMock />

            <SectionPanel label="The numbers behind it">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
                {PROOF_POINTS.map((point, index) => (
                  <div
                    key={point.title}
                    className={index % 2 === 1 ? "sm:pl-8 sm:border-l sm:border-[#dbe7f6]" : ""}
                  >
                    <p className="text-[#0084b4] text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-2.5">{point.stat}</p>
                    <h3 className="text-sm text-[#14205c] font-semibold mb-2">{point.title}</h3>
                    <p className={`${BODY} text-sm`}>{point.body}</p>
                    {point.source && <p className="text-2xs text-[#5a6785] mt-3">{point.source}</p>}
                  </div>
                ))}
              </div>
            </SectionPanel>
          </div>
        </div>
      </section>

      {/* SECTION 7 - Engagement models */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${H2} mb-10`}>Engage the way that fits your team</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENGAGEMENT_MODELS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <HexBadge icon={Icon} tone="blue" size="md" className="mb-4" />
                <h3 className="text-sm text-[#14205c] font-semibold mb-2">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <span className="inline-flex items-center rounded-full bg-[#00708f] px-5 py-2.5 text-sm text-white font-semibold">
              Pay only for the outcome, at industry-standard rates.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 8 - FAQ */}
      <section className="bg-[#f2f7fd] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className={`${H2} mb-10 text-center`}>Frequently asked questions</h2>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white border border-black/[0.06]">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer text-base md:text-lg text-[#14205c] font-semibold list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-[#0084b4] shrink-0 transition-transform duration-300 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <div className="px-6 pb-6 -mt-1">
                  <p className={BODY}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - Final CTA */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1f52] px-6 py-10 sm:px-10 md:px-14 md:py-14">
            <HexPattern tone="dark" className="inset-0" />

            <div className="relative grid lg:grid-cols-[minmax(0,1fr)_440px] gap-10 lg:gap-14 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <HexBadge icon={Rocket} tone="cyan" size="md" />
                  <p className="text-[#90c0f0] text-xs tracking-[0.16em] uppercase font-semibold">Hiring in this space?</p>
                </div>
                <h2 className="text-4xl md:text-5xl leading-[1.08] font-bold tracking-[-0.03em] mb-5">
                  <span className="block text-white">Stop interviewing 8 people</span>
                  <span className="block text-[#90c0f0]">to hire 1.</span>
                </h2>
                <p className="text-[#c8d8f0] text-base md:text-lg leading-relaxed mb-8">
                  Tell us the role. Get 1-2 validated, ready-to-hire AI &amp; Data engineers - and give your engineers
                  their time back.
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => { trackEvent("cta_click", { location: "final_primary" }); scrollToForm(); }}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm text-[#0b57bd] font-semibold transition-colors"
                  >
                    Request Your Shortlist <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("booked_consultation", { source: "final_cta" })}
                    className="inline-flex items-center gap-1.5 text-[#90c0f0] text-sm font-semibold"
                  >
                    Or book a 20-minute consultation <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div data-shortlist-form className="scroll-mt-6">
                <ShortlistForm variant="final" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer - only Privacy Policy and Terms */}
      <footer className="border-t border-[#dbe7f6] px-6 sm:px-8 lg:px-12 py-10 pb-28 md:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5a6785]">
          <p>&copy; {new Date().getFullYear()} NeoIntelli</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms</Link>
          </div>
        </div>
      </footer>

      {/* SECTION 10 - Sticky mobile CTA */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#0a1f52] px-4 py-3 transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <p className="text-xs text-white leading-snug flex-1">Get 1-2 validated AI hires per role</p>
          <button
            type="button"
            onClick={() => { trackEvent("cta_click", { location: "sticky_mobile" }); scrollToForm(); }}
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-[#0b57bd] px-5 py-3 text-sm text-white font-semibold whitespace-nowrap"
          >
            Request Shortlist <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
