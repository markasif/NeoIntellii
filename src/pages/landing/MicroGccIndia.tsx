import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  ClipboardList,
  Cloud,
  Cpu,
  Database,
  FileCheck2,
  Globe,
  Handshake,
  Laptop,
  Layers,
  LineChart,
  Lock,
  MapPin,
  Repeat,
  Rocket,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Timer,
  UserCheck,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { appendAttributionToFormData } from "@/lib/attribution";
import { submitNetlifyForm, NETLIFY_FORMS_ENDPOINT } from "@/lib/netlifyForms";
import { validateCompanyName, validatePhone, validateRequiredChoice, validateWorkEmail } from "@/lib/formValidation";
import { trackEvent } from "@/lib/analytics";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { activeLenis } from "@/components/animations/SmoothScroll";
import TeamDesigner from "@/components/landing/micro-gcc-india/TeamDesigner";
import {
  BODY,
  BODY_DARK,
  BODY_LG,
  BTN_GHOST_DARK,
  BTN_PRIMARY,
  EYEBROW,
  FIELD,
  H2,
  H2_DARK,
  MUTED,
  PANEL,
  PANEL_DARK,
  PANEL_RAISED,
} from "@/components/landing/micro-gcc-india/theme";

const FORM_NAME = "micro-gcc-lp";
const FORM_ANCHOR = "micro-gcc-form";
const TEAM_ANCHOR = "design-your-team";

const CAPABILITIES = [
  "AI / ML engineering",
  "Data engineering & platform",
  "Product engineering",
  "Cloud / DevOps & platform",
  "QA & test automation",
  "Digital transformation",
  "A mix of the above",
  "Not sure yet - help me scope it",
];

const TEAM_SIZES = ["8 to 10 (start here)", "11 to 20", "21 to 50", "More than 50", "Not sure yet"];

const TIMELINES = ["Within 3 months", "3 to 6 months", "6 to 12 months", "Exploring for now"];

const COMPANY_STAGES = ["Pre-seed / Seed", "Series A to C", "Growth / Late stage", "Public or enterprise"];

const HERO_PROOF = [
  "No entity required to start",
  "Workspace included",
  "You approve every hire",
  "Transfer to your entity later",
];

const HEADLINE_STATS = [
  { figure: "8 to 10", label: "people in your first India team" },
  { figure: "10", label: "engineering roles to design the team from" },
  { figure: "1 to 2", label: "validated profiles you interview per seat" },
  { figure: "1 partner", label: "strategy, hiring, workspace, operations, scale" },
];

const CAPABILITY_CHIPS = [
  { icon: Cpu, label: "AI / ML Engineering" },
  { icon: Database, label: "Data Engineering" },
  { icon: Boxes, label: "Product Engineering" },
  { icon: Layers, label: "Platform Engineering" },
  { icon: Cloud, label: "Cloud / DevOps" },
  { icon: TestTube2, label: "QA / SDET" },
  { icon: Sparkles, label: "AI Enablement" },
  { icon: Workflow, label: "Digital Transformation" },
];

const STEPS = [
  {
    step: "Step 1",
    title: "Tell us the capability",
    body: "One call. What the team has to be able to do for the business - not a stack of job descriptions.",
  },
  {
    step: "Step 2",
    title: "We design the 8 to 10",
    body: "Roles, seniority mix, reporting lines and a month-by-month ramp, costed before you commit to anything.",
  },
  {
    step: "Step 3",
    title: "We source and technically validate",
    body: "NeoHireX screens the market; practising senior engineers run the technical rounds against your real requirements.",
  },
  {
    step: "Step 4",
    title: "You approve every hire",
    body: "The final interview and the offer decision stay with you, on every single seat. Always.",
  },
  {
    step: "Step 5",
    title: "We hire, onboard and run",
    body: "Employment, payroll, statutory compliance, workspace, IT and day-to-day operations. Your team ships.",
  },
];

const WE_HANDLE = [
  "Capability roadmap",
  "Role design and salary benchmarking",
  "Sourcing and technical validation",
  "Offer, onboarding and induction",
  "Payroll and statutory compliance",
  "Workspace, IT and security",
  "Day-to-day team operations",
];

const YOU_KEEP = [
  "Final hiring decisions",
  "Technical direction",
  "Product roadmap and priorities",
  "All code, IP and data",
  "Team culture and rituals",
  "The option to take it all in-house",
];

const SEAT_INCLUSIONS = [
  "Managed workspace in Bengaluru, Pune, Hyderabad, Chennai and Mumbai",
  "Desks, meeting rooms and a secure network from week one",
  "Laptops, licences and on-site IT support",
  "No lease, no fit-out, no capex, no facilities hire",
  "Move onto your own floor when the team outgrows it",
];

const OWNERSHIP_MODELS = [
  {
    tag: "Own from day 1",
    title: "Your entity. Your compliance.",
    body: "You already have an Indian entity, or you want one now. The team is yours on paper from the first hire, and we run the hiring, workspace and operations underneath it.",
    fit: "Groups with an India entity, or the appetite to set one up today.",
    icon: Building2,
  },
  {
    tag: "No entity required",
    title: "Start without an entity.",
    body: "The team is employed through NeoIntelli. You direct the work; we carry the employment, payroll and statutory obligations. Nothing to incorporate before your first engineer starts.",
    fit: "A first India team, or a capability you want to prove before you commit.",
    icon: Rocket,
  },
  {
    tag: "Build, operate, transfer",
    title: "We build it. You take it over.",
    body: "We build and run the team to an agreed standard, then transfer the people, contracts and operations to your entity. Transfer is triggered by milestones agreed at the start, not by an arbitrary date: team hired, stable operating state reached, your India entity ready, handover confirmed by both sides. Standard operate period is 18 months. A one-time transfer fee applies, agreed with you upfront. No per-head charge, no surprise exit fee. Mechanics are written into the SOW on day one.",
    fit: "Boards that want a captive GCC without carrying the first-year risk.",
    icon: Handshake,
  },
];

const COST_LINES: { icon: LucideIcon; label: string; value?: string }[] = [
  { icon: Wallet, label: "Salary and benefits", value: "actual agreed cost, approved by you" },
  { icon: Users, label: "Recruiting, HR and GCC operations" },
  { icon: ScrollText, label: "Payroll, entity and statutory compliance" },
  { icon: MapPin, label: "Workspace, IT, connectivity and office support" },
  { icon: Laptop, label: "Laptops and specialised hardware", value: "at actual cost, or supplied by you" },
];

const SCALE_PHASES = [
  {
    phase: "Phase 1",
    range: "8 to 10",
    title: "Micro GCC",
    body: "Prove the capability. One managed workspace, one team, one delivery line you can actually measure.",
  },
  {
    phase: "Phase 2",
    range: "20 to 50",
    title: "Adjacent capability",
    body: "A second and third function join the same operating model. Still no lease of your own to sign.",
  },
  {
    phase: "Phase 3",
    range: "50 to 100",
    title: "Dedicated function",
    body: "A dedicated floor, your own leadership layer in India, and formal governance around the centre.",
  },
  {
    phase: "Phase 4",
    range: "100 to 400",
    title: "Full GCC",
    body: "An independent India operation with its own site, entity and charter - grown into, not gambled on.",
  },
];

const COMPARISON_ROWS = [
  {
    label: "Who the team works for",
    outsourcing: "The vendor's delivery structure",
    traditional: "You, after 12 to 18 months of setup",
    micro: "You, from the first week",
  },
  {
    label: "People",
    outsourcing: "Rotated, shared, replaced",
    traditional: "Yours, once the entity exists",
    micro: "Named, dedicated, interviewed by you",
  },
  {
    label: "Knowledge",
    outsourcing: "Leaves with the contract",
    traditional: "Stays, eventually",
    micro: "Compounds inside your own team",
  },
  {
    label: "Starting commitment",
    outsourcing: "A statement of work",
    traditional: "Entity, lease, capex, headcount plan",
    micro: "8 to 10 people",
  },
  {
    label: "Control",
    outsourcing: "You brief, they staff",
    traditional: "Full - once it finally exists",
    micro: "Full technical control on day one",
  },
  {
    label: "Growth",
    outsourcing: "Buy more billable hours",
    traditional: "Approved in annual budget cycles",
    micro: "Add seats when the work is real",
  },
];

const ONE_PARTNER = [
  { icon: ClipboardList, title: "GCC strategy", body: "Capability design, role architecture, cost model and the scale path." },
  { icon: Search, title: "Talent and hiring", body: "Market mapping and sourcing across every role your team needs." },
  { icon: UserCheck, title: "Interview and validation", body: "Technical rounds run by senior engineers before anything reaches you." },
  { icon: MapPin, title: "Workspace and operations", body: "Seats, IT, payroll, compliance and the daily running of the centre." },
  { icon: LineChart, title: "Scale support", body: "The next 10, the next 50, and the handover to your own entity." },
];

const HIRING_ENGINE = [
  { icon: Search, title: "Screens the whole market", body: "NeoHireX ranks candidates against what the role genuinely requires, not against resume keywords." },
  { icon: Cpu, title: "Technical rounds by senior engineers", body: "Practising engineers probe what someone built, owned and traded off - matched to the seat." },
  { icon: BadgeCheck, title: "You interview 1 to 2 per seat", body: "Only what survives validation reaches your calendar, so your leaders interview rather than screen." },
  { icon: UserCheck, title: "Technical leaders, not delivery managers", body: "For the manager seat we search for someone who has built and led the kind of team you need, for example ML platform, optimisation or backend platform, and who stays technically credible while managing engineers. You retain final approval on every hire." },
];

const IP_AND_DATA = [
  {
    icon: FileCheck2,
    title: "Clean chain of title from day one",
    body: "Every employee and contractor signs confidentiality and IP assignment obligations before starting. The NeoIntelli agreement assigns all work product and IP to your designated entity (for example a US parent), not only when the team transfers. Final language is set by counsel for your parent entity and the Indian employment structure, not a generic US work-for-hire clause.",
  },
  {
    icon: ShieldCheck,
    title: "DPDP compliance",
    body: "The team operates under access, confidentiality, processing and security controls designed to support your obligations under India's Digital Personal Data Protection regime. Controller and processor responsibilities are documented in the DPA reviewed by both sides' counsel.",
  },
  {
    icon: Globe,
    title: "Data residency is your call",
    body: "We do not require your production data or source systems to be hosted in India. US-only or EU-only hosting, specific cloud regions, VPN or VPC access, managed devices, restricted repositories and no local data persistence can all be built into the operating model.",
  },
  {
    icon: ScrollText,
    title: "Investor diligence",
    body: "Executed employment, confidentiality, IP assignment, security and compliance documentation is available for investor or Series A diligence, subject to confidentiality.",
  },
];

const OPERATING_CONCERNS = [
  { icon: Workflow, title: "Reporting lines", body: "The India team reports into your engineering structure, not into an account manager." },
  { icon: Timer, title: "Working hour overlap", body: "Shifts and rituals are set to your timezone overlap and written into the team's contracts." },
  { icon: BadgeCheck, title: "Hiring quality", body: "Every candidate is technically validated before you interview, so the bar is set once and held." },
  { icon: Repeat, title: "Attrition", body: "Market-benchmarked compensation and career paths. If someone leaves while on our payroll, we start replacement sourcing immediately and aim to onboard the replacement before the notice period ends, with no additional recruitment fee. After transfer to your entity, a free replacement search applies if a hire leaves within the agreed 90-day period." },
  { icon: ScrollText, title: "Compliance and payroll", body: "PF, ESI, gratuity, TDS, POSH and state registrations handled as part of the operating fee." },
  { icon: Lock, title: "Data and IP security", body: "Your IP, your repositories, your access controls. IP assignment, DPDP compliance, data residency and diligence-ready paperwork are set out in full in the IP and data section above." },
];

const FAQS = [
  {
    q: "What exactly is a Micro GCC?",
    a: "An 8 to 10 person India team that carries a defined capability for your business - designed, hired, seated and operated by NeoIntelli, and directed entirely by you. It is the smallest version of a Global Capability Centre that still behaves like one.",
  },
  {
    q: "Can we really start with only 8 to 10 people?",
    a: "Yes. Eight to ten is enough to own a capability end to end: a manager, engineers across the stack, and the quality and infrastructure roles that make delivery repeatable. Below that you have contractors. Far above it, you are committing before you have learned anything.",
  },
  {
    q: "Do we need an Indian entity before we start?",
    a: "No. You can start on our employment structure and move to your own entity later, or start on your entity from day one. The team, the work and the reporting lines are identical either way.",
  },
  {
    q: "Who interviews and selects the team?",
    a: "You do. The final interview and the offer decision are yours on every hire. We handle sourcing, screening and the technical rounds so only one or two validated profiles per seat reach your calendar.",
  },
  {
    q: "What does it cost?",
    a: "Open book, and the full breakdown is in the \"What it costs\" section above. You approve every salary; our charges sit on top of it. Workspace for your first 8 to 10 seats is included. Use the team designer above to get an India cost estimate before you ever speak to us.",
  },
  {
    q: "After 12 months, what happens?",
    a: "Whatever you decide: keep running as you are, expand into adjacent capability, or transfer the people, contracts and operations to your own entity under the milestone-based transfer mechanics agreed in the SOW at the start.",
  },
  {
    q: "Do we have to commit to a headcount plan?",
    a: "No. You commit to the first 8 to 10 seats. Every seat after that is added when the work is real - not because a three-year plan said so.",
  },
  {
    q: "Is this only for AI companies?",
    a: "No. AI and data are where most of our work sits, but the same model builds product, platform, cloud and quality engineering teams just as well.",
  },
  {
    q: "Which cities do you cover?",
    a: "Bengaluru, Pune, Hyderabad, Chennai and Mumbai, with managed workspace in each. For AI, ML and optimisation teams we usually recommend Bengaluru for talent depth, Pune where cost efficiency matters most, and Mumbai when you need to be there for strategic reasons. We give you a role-by-role city recommendation before you commit.",
  },
  {
    q: "How quickly can we start?",
    a: "Role design inside the first two weeks, first validated profiles shortly after, and a seated, working team typically within 8 to 12 weeks - depending on seniority and how scarce the profiles are.",
  },
];

/** Jumps to whichever copy of the lead form is nearer the current scroll position. */
const scrollToAnchor = (attribute: string) => {
  if (typeof document === "undefined") return;
  const anchors = Array.from(document.querySelectorAll<HTMLElement>(`[data-${attribute}]`));
  if (anchors.length === 0) return;
  const tops = anchors.map((anchor) => anchor.getBoundingClientRect().top + window.scrollY - 24);
  const top = tops.reduce((closest, value) =>
    Math.abs(value - window.scrollY) < Math.abs(closest - window.scrollY) ? value : closest);
  if (activeLenis) activeLenis.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
};

const scrollToForm = () => scrollToAnchor(FORM_ANCHOR);
const scrollToTeamDesigner = () => scrollToAnchor(TEAM_ANCHOR);

type FieldErrors = {
  name?: string;
  email?: string;
  company?: string;
  companyStage?: string;
  capability?: string;
  teamSize?: string;
  timeline?: string;
  phone?: string;
  submit?: string;
};

/** Document order, so focus lands on the first problem rather than the last. */
const FIELD_ORDER = ["name", "email", "company", "companyStage", "capability", "teamSize", "timeline", "phone"] as const;

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

const LABEL = "block text-xs text-[#101c4a] font-semibold mb-2";
const MICROCOPY = "text-2xs text-[#5d6a8a] mt-1.5";
const ERROR_TEXT = "text-2xs text-[#c0392b] mt-1.5";
const INVALID_FIELD = "border-[#c0392b]/50 ring-2 ring-[#c0392b]/15";

function MicroGccForm({ variant }: { variant: "hero" | "final" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = useCallback((field: keyof FieldErrors) => {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

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
      companyStage: validateRequiredChoice(read("companyStage"), "your company stage") ?? undefined,
      capability: validateRequiredChoice(read("capability"), "the capability you need") ?? undefined,
      teamSize: validateRequiredChoice(read("teamSize"), "a team size") ?? undefined,
      timeline: validateRequiredChoice(read("timeline"), "your timeline") ?? undefined,
      phone: validatePhone(read("phone")) ?? undefined,
    };

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setErrors(nextErrors);
      // Send focus to the first problem so the message is announced and the
      // field is on screen, rather than leaving people hunting for it.
      document.getElementById(`${firstInvalid}-${variant}`)?.focus();
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
          company_stage: read("companyStage") || undefined,
          capability: read("capability") || undefined,
          team_size: read("teamSize") || undefined,
          timeline: read("timeline") || undefined,
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
          <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1f5fd0]/10 text-[#1f5fd0]">
            <Check className="w-6 h-6" aria-hidden="true" />
          </span>
        </div>
        <h2 className="text-[#101c4a] text-xl font-bold mb-3">Thanks - we have your brief.</h2>
        <p className={`${BODY} mb-6`}>
          A NeoIntelli GCC lead will come back within 1 business day with a first view of the roles, the ramp and the
          India cost. If it is urgent, book a slot directly.
        </p>
        <a
          href={CAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("booked_consultation", { source: `${FORM_NAME}_confirmation` })}
          className={`${BTN_PRIMARY} w-full`}
        >
          Book a consultation <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className={`${PANEL_RAISED} p-6 md:p-7`}>
      <h2 className="text-[#101c4a] text-xl md:text-2xl font-bold mb-2 tracking-[-0.02em]">
        Get your Micro GCC plan
      </h2>
      <p className="text-[#5d6a8a] text-xs leading-relaxed mb-5">
        Tell us the capability. We come back with the roles, the ramp and the India cost - no obligation.
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

        <div>
          <label className={LABEL} htmlFor={`companyStage-${variant}`}>Company stage *</label>
          <select
            id={`companyStage-${variant}`}
            name="companyStage"
            required
            defaultValue=""
            onChange={() => clearError("companyStage")}
            aria-invalid={Boolean(errors.companyStage)}
            aria-describedby={errors.companyStage ? `companyStage-error-${variant}` : undefined}
            className={`${FIELD} ${errors.companyStage ? INVALID_FIELD : ""}`}
          >
            <option value="" disabled>Select your stage</option>
            {COMPANY_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
          </select>
          {errors.companyStage && (
            <p id={`companyStage-error-${variant}`} className={ERROR_TEXT}>{errors.companyStage}</p>
          )}
        </div>

        <div>
          <label className={LABEL} htmlFor={`capability-${variant}`}>What capability do you need? *</label>
          <select
            id={`capability-${variant}`}
            name="capability"
            required
            defaultValue=""
            onChange={() => clearError("capability")}
            aria-invalid={Boolean(errors.capability)}
            aria-describedby={errors.capability ? `capability-error-${variant}` : undefined}
            className={`${FIELD} ${errors.capability ? INVALID_FIELD : ""}`}
          >
            <option value="" disabled>Select a capability</option>
            {CAPABILITIES.map((capability) => <option key={capability} value={capability}>{capability}</option>)}
          </select>
          {errors.capability && <p id={`capability-error-${variant}`} className={ERROR_TEXT}>{errors.capability}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5">
          <div>
            <label className={LABEL} htmlFor={`teamSize-${variant}`}>Team size in mind *</label>
            <select
              id={`teamSize-${variant}`}
              name="teamSize"
              required
              defaultValue=""
              onChange={() => clearError("teamSize")}
              aria-invalid={Boolean(errors.teamSize)}
              aria-describedby={errors.teamSize ? `teamSize-error-${variant}` : undefined}
              className={`${FIELD} ${errors.teamSize ? INVALID_FIELD : ""}`}
            >
              <option value="" disabled>Select size</option>
              {TEAM_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
            {errors.teamSize && <p id={`teamSize-error-${variant}`} className={ERROR_TEXT}>{errors.teamSize}</p>}
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
            {errors.phone ?? "Optional - for faster coordination. Include your country code."}
          </p>
        </div>

        <button type="submit" disabled={submitting} className={`${BTN_PRIMARY} w-full py-4 disabled:opacity-60`}>
          {submitting ? "Sending…" : <>Get My Micro GCC Plan <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
        </button>

        {errors.submit && <p className="text-2xs text-[#c0392b] text-center">{errors.submit}</p>}

        <p className="text-2xs text-[#5d6a8a] text-center leading-relaxed">
          We reply within 1 business day. Your details stay confidential.
        </p>
      </form>
    </div>
  );
}

/** The ramp under the hero: 10 filled seats, then the shape it grows into. */
function SeatRamp() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <p className="text-white text-sm font-semibold mb-1">Start with 10 seats. Grow into your GCC.</p>
          <p className="text-[#93a6cd] text-xs leading-relaxed">
            Every seat after the first ten is added when the work is real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="w-3.5 h-6 rounded-[3px] bg-[#f97316]" />
            ))}
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={`ghost-${index}`} className="w-3.5 h-6 rounded-[3px] border border-white/20" />
            ))}
          </div>
          <span className="text-[#93a6cd] text-xs whitespace-nowrap">10 → 400</span>
        </div>
      </div>
    </div>
  );
}

export default function MicroGccIndia() {
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
      <header className="bg-white border-b border-[#dde7f7]">
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

      {/* SECTION 1 - Hero with the form on the right */}
      <section className="relative overflow-hidden bg-[#0a1533] px-6 sm:px-8 lg:px-12 pt-10 pb-14 md:pt-14 md:pb-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 w-[520px] h-[520px] rounded-full bg-[#1f5fd0]/25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-0 w-[420px] h-[420px] rounded-full bg-[#f97316]/15 blur-[130px]"
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-14 items-start">
            <div>
              <p className={`${EYEBROW} text-[#8fb6f2] mb-5`}>
                Micro GCC &middot; India &middot; For AI &amp; AI-native companies
              </p>
              <h1 className="text-5xl leading-[1.03] md:text-7xl font-bold tracking-[-0.035em] mb-6">
                <span className="block text-white">Build the capability you need in India.</span>
                <span className="block text-[#8fb6f2]">Start with 8 to 10. Scale when you&apos;re ready.</span>
              </h1>
              <span aria-hidden="true" className="block w-16 h-1 rounded-full bg-[#f97316] mb-6" />
              <p className="text-[#c2d2ee] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Tell us what your business needs to be able to do. We design the roles, source and technically
                validate the candidates, hire and onboard the team, and seat them in a managed workspace.{" "}
                <span className="text-white font-semibold">You pay for the developers. The seats are on us.</span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => { trackEvent("cta_click", { location: "hero_primary" }); scrollToForm(); }}
                  className={BTN_PRIMARY}
                >
                  Get my Micro GCC plan <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => { trackEvent("cta_click", { location: "hero_secondary" }); scrollToTeamDesigner(); }}
                  className={BTN_GHOST_DARK}
                >
                  Design my India team <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#93a6cd]">
                {HERO_PROOF.map((item, index) => (
                  <li key={item} className="flex items-center gap-3">
                    {index > 0 && <span aria-hidden="true" className="text-white/25">&bull;</span>}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id={FORM_ANCHOR} data-micro-gcc-form className="lg:sticky lg:top-8 scroll-mt-6">
              <MicroGccForm variant="hero" />
            </div>
          </div>

          <div className="mt-12 md:mt-14">
            <SeatRamp />
          </div>
        </div>
      </section>

      {/* SECTION 2 - Headline numbers */}
      <section className="border-b border-[#dde7f7] px-6 sm:px-8 lg:px-12 py-10 md:py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {HEADLINE_STATS.map(({ figure, label }) => (
            <div key={label}>
              <p className="text-[#101c4a] text-3xl md:text-4xl font-bold tracking-[-0.03em] mb-2">{figure}</p>
              <p className={MUTED}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - The problem */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>The problem</p>
          <h2 className={`${H2} mb-6 max-w-3xl`}>
            Don&apos;t start by building an office. Start by building a capability.
          </h2>
          <p className={`${BODY_LG} max-w-3xl mb-10`}>
            Traditional GCC thinking starts with real estate, entity setup and a headcount plan. Twelve to eighteen
            months and a signed lease later, the first engineer writes the first line of code. That is an enormous
            bet on a capability nobody has proven yet.
          </p>

          <p className="text-xs text-[#5d6a8a] font-semibold mb-4">
            A Micro GCC starts from the capability instead:
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {CAPABILITY_CHIPS.map(({ icon: Icon, label }) => (
              <li key={label} className={`${PANEL} flex items-center gap-3 px-4 py-3.5`}>
                <Icon className="w-4 h-4 text-[#1f5fd0] shrink-0" aria-hidden="true" />
                <span className="text-sm text-[#101c4a] font-medium leading-snug">{label}</span>
              </li>
            ))}
          </ul>

          <div className={`${PANEL} p-6 md:p-8 bg-[#f3f6fc]`}>
            <p className="text-[#101c4a] text-lg md:text-xl font-semibold leading-snug mb-4">
              &ldquo;We need AI-first capability in India.&rdquo;<br />
              &ldquo;We need an India team that is genuinely part of our global engineering org.&rdquo;
            </p>
            <p className={BODY}>
              You define the capability. We design the roles, run the hiring, and put the team to work - before you
              commit to a building, an entity or a five-year plan.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 - How it works */}
      <section className="relative overflow-hidden bg-[#0a1533] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="relative max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>How it works</p>
          <h2 className={`${H2_DARK} mb-4 max-w-3xl`}>From capability to a working Micro GCC</h2>
          <p className="text-[#93a6cd] text-base md:text-lg leading-relaxed max-w-2xl mb-12">
            One line. Five steps. You keep every decision that matters; we do the operational work in India.
          </p>

          <ol className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
            {STEPS.map(({ step, title, body }) => (
              <li key={step} className={`${PANEL_DARK} p-5`}>
                <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#f97316] mb-3">{step}</p>
                <h3 className="text-white text-sm font-semibold mb-2 leading-snug">{title}</h3>
                <p className="text-[#93a6cd] text-xs leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>

          <div className="grid md:grid-cols-2 gap-4">
            <div className={`${PANEL_DARK} p-6`}>
              <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#8fb6f2] mb-4">We handle</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {WE_HANDLE.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[#c2d2ee] text-sm leading-snug">
                    <Check className="w-3.5 h-3.5 text-[#f97316] mt-1 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#f97316]/30 bg-[#f97316]/[0.07] p-6">
              <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#f97316] mb-4">You keep</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {YOU_KEEP.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white text-sm leading-snug">
                    <Check className="w-3.5 h-3.5 text-[#f97316] mt-1 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - The seats */}
      <section className="bg-[#f97316] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] gap-10 lg:gap-14 items-start">
          <div>
            <p className={`${EYEBROW} text-white/70 mb-4`}>Where you start</p>
            <h2 className="text-3xl leading-[1.12] md:text-5xl text-white font-bold tracking-[-0.025em] mb-6">
              Your first 8 to 10 people need seats. Not an office project.
            </h2>
            <ul className="space-y-2.5 max-w-xl">
              {SEAT_INCLUSIONS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm leading-relaxed">
                  <Check className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-[#0a1533] p-6 md:p-7">
            <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#f97316] mb-4">
              The seats are on us
            </p>
            <p className="text-white text-4xl md:text-5xl font-bold leading-[1.1] tracking-[-0.03em] mb-4">
              You pay for the developers.
            </p>
            <p className="text-[#93a6cd] text-sm leading-relaxed">
              Workspace for your first 8 to 10 seats is included in the engagement. There is no lease to sign, no
              fit-out to fund, and no facilities manager to hire before your team can start work.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 - What it costs */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>What it costs</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>
            Open book. You approve every salary. Our charges sit on top.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COST_LINES.map(({ icon: Icon, label, value }) => (
              <div key={label} className={`${PANEL} p-5 flex flex-col`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm text-[#101c4a] font-semibold mb-2 leading-snug">{label}</h3>
                {value ? <p className={`${BODY} text-xs mt-auto`}>{value}</p> : null}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#0a1533] px-6 py-6 md:px-9 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-white text-lg md:text-xl font-bold tracking-[-0.02em]">
              Fully loaded monthly cost = salary and benefits plus our charges on top.
            </p>
            <p className="text-[#93a6cd] text-sm leading-relaxed md:text-right md:max-w-xs">
              Excludes laptops and unusual project-specific infrastructure.
            </p>
          </div>

          <div className={`${PANEL} mt-4 p-6 md:p-7`}>
            <p className="text-[#101c4a] text-sm md:text-base font-semibold leading-relaxed mb-3">
              You approve the salary for every role, and you see the fully loaded monthly cost for that role
              before anyone is hired.
            </p>
            <p className={`${BODY} text-sm`}>
              Senior leadership, hiring process setup, operating cadence and initial GCC setup are included. No
              separate management retainer. Billing is monthly in advance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 - Ownership models */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>Ownership</p>
          <h2 className={`${H2} mb-4`}>Choose how much you want to own, and when</h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            Three ways to run the same team. All three start with 8 to 10 seats, and all three can graduate into a
            full GCC.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {OWNERSHIP_MODELS.map(({ tag, title, body, fit, icon: Icon }) => (
              <div key={tag} className={`${PANEL} p-6 flex flex-col`}>
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#1f5fd0]/[0.08] px-3 py-1.5 text-2xs tracking-[0.16em] uppercase font-semibold text-[#1f5fd0] mb-5">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {tag}
                </span>
                <h3 className="text-[#101c4a] text-lg font-bold mb-3 leading-snug">{title}</h3>
                <p className={`${BODY} text-sm mb-5 flex-1`}>{body}</p>
                <div className="pt-4 border-t border-[#eef3fb]">
                  <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#5d6a8a] mb-1.5">Best for</p>
                  <p className="text-xs text-[#2a3556] leading-relaxed">{fit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - Team designer, which hands off to the cost calculator */}
      <section
        id={TEAM_ANCHOR}
        data-design-your-team
        className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20 scroll-mt-6"
      >
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>Design your team</p>
          <h2 className={`${H2} mb-4`}>What would your 8 to 10 person India team look like?</h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            Build the team you actually need, then take it straight into our India cost calculator - city by city,
            seniority by seniority, operating model by operating model.
          </p>

          <TeamDesigner />
        </div>
      </section>

      {/* SECTION 9 - The scale path */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>The scale path</p>
          <h2 className={`${H2} mb-4 max-w-3xl`}>
            Start with 8 to 10. Build only when the business proves the need.
          </h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            You do not have to predict today how large your India operation will be in three years. Add the first
            capability, measure it, and expand only where it earns the next seat.
          </p>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCALE_PHASES.map(({ phase, range, title, body }, index) => (
              <li
                key={phase}
                className={`${PANEL} p-6 ${index === 0 ? "border-[#f97316]/40 bg-[#f97316]/[0.04]" : ""}`}
              >
                <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#5d6a8a] mb-3">{phase}</p>
                <p className="text-[#101c4a] text-4xl font-bold tracking-[-0.03em] leading-none mb-2">{range}</p>
                <h3 className="text-[#1f5fd0] text-sm font-semibold mb-3">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl bg-[#0a1533] px-6 py-6 md:px-9 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-white text-lg md:text-xl font-bold tracking-[-0.02em]">
              Scale the capability. Not the complexity.
            </p>
            <p className="text-[#93a6cd] text-sm leading-relaxed md:text-right md:max-w-md">
              8 to 10 is not a discount version. It is the size that lets you start without a year of committee.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10 - How this is different */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>How this is different</p>
          <h2 className={`${H2} mb-10`}>A Micro GCC is not another outsourcing contract</h2>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <caption className="sr-only">
                Outsourcing, a traditional GCC and a NeoIntelli Micro GCC compared across six dimensions
              </caption>
              <thead>
                <tr className="border-b border-[#dde7f7]">
                  <th scope="col" className="p-5 text-2xs tracking-[0.16em] uppercase font-semibold text-[#5d6a8a]">
                    <span className="sr-only">Dimension</span>
                  </th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">Outsourcing</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">Traditional GCC</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#101c4a] bg-[#1f5fd0]/[0.05]">
                    NeoIntelli Micro GCC
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(({ label, outsourcing, traditional, micro }) => (
                  <tr key={label} className="border-b border-[#eef3fb] last:border-b-0">
                    <th scope="row" className="p-5 text-sm text-[#101c4a] font-semibold align-top">{label}</th>
                    <td className="p-5 text-sm text-[#5d6a8a] align-top">{outsourcing}</td>
                    <td className="p-5 text-sm text-[#5d6a8a] align-top">{traditional}</td>
                    <td className="p-5 text-sm text-[#101c4a] font-medium align-top bg-[#1f5fd0]/[0.05]">{micro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 11 - One partner */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>Why NeoIntelli</p>
          <h2 className={`${H2} mb-4 max-w-3xl`}>You shouldn&apos;t need five companies to build one India team</h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            GCC advisory, recruitment, technical validation, workspace, HR operations and scale support usually mean
            five separate vendors and five separate contracts. Here it is one team under one operating agreement.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {ONE_PARTNER.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-5`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm text-[#101c4a] font-semibold mb-2 leading-snug">{title}</h3>
                <p className={`${BODY} text-xs`}>{body}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-2xs md:text-xs tracking-[0.16em] uppercase font-semibold text-[#5d6a8a]">
            One partner &middot; One system &middot; One scale path
          </p>
        </div>
      </section>

      {/* SECTION 12 - The hiring engine */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>The hiring engine</p>
          <h2 className={`${H2} mb-4`}>NeoHireX, our in-house AI hiring OS</h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            The team is only as good as the hiring behind it. NeoHireX is how we keep the bar identical on the first
            eight seats and on the eightieth.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HIRING_ENGINE.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f97316]/10 text-[#f97316] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm text-[#101c4a] font-semibold mb-2">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2.5 rounded-full bg-[#0a1533] px-5 py-2.5 text-sm text-white font-semibold">
              <FileCheck2 className="w-4 h-4" aria-hidden="true" />
              Included in every Micro GCC engagement. No separate ATS to buy.
            </p>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.06] bg-white px-5 py-2.5 text-sm text-[#101c4a] font-semibold">
              <Wallet className="w-4 h-4 text-[#f97316]" aria-hidden="true" />
              No recruitment retainer. Hiring is part of building and operating the team, not billed per search.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 13 - IP, data protection and diligence */}
      <section className="relative overflow-hidden bg-[#0a1533] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="relative max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>IP and data</p>
          <h2 className={`${H2_DARK} mb-10 max-w-3xl`}>
            IP ownership, data protection and diligence-ready paperwork
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {IP_AND_DATA.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL_DARK} p-6`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f97316]/15 text-[#f97316] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-white text-sm font-semibold mb-2 leading-snug">{title}</h3>
                <p className="text-[#93a6cd] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14 - Operating concerns */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>For leadership teams new to India</p>
          <h2 className={`${H2} mb-4 max-w-3xl`}>
            Build in India without becoming an India operating expert first
          </h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            The six things that usually stall a first India team - and who carries each of them here.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPERATING_CONCERNS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm text-[#101c4a] font-semibold mb-2">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15 - FAQ */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>Questions before you book a call</p>
          <h2 className={`${H2} mb-10`}>Before you book the call</h2>

          <div className="grid md:grid-cols-2 gap-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white border border-black/[0.06] h-fit">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer text-sm md:text-base text-[#101c4a] font-semibold list-none">
                  {faq.q}
                  <ChevronRight
                    className="w-4 h-4 text-[#f97316] shrink-0 transition-transform duration-300 group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className={`${BODY} text-sm`}>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16 - Final CTA with the second form */}
      <section className="relative overflow-hidden bg-[#0a1533] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 w-[460px] h-[460px] rounded-full bg-[#1f5fd0]/25 blur-[120px]"
        />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-14 items-center">
          <div>
            <p className={`${EYEBROW} text-[#f97316] mb-5`}>Ready when you are</p>
            <h2 className="text-4xl md:text-5xl leading-[1.08] font-bold tracking-[-0.03em] mb-5">
              <span className="block text-white">You already know the capability you need.</span>
              <span className="block text-[#8fb6f2]">Let&apos;s build the India team around it.</span>
            </h2>
            <p className={`${BODY_DARK} text-base md:text-lg mb-8 max-w-xl`}>
              One call to scope the capability. A costed 8 to 10 person plan back within days. No entity, no lease and
              no headcount commitment to get there.
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 max-w-xl">
              {["Roles and seniority mix designed for you", "India cost, city by city", "A month-by-month hiring ramp", "The scale path to a full GCC"].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[#c2d2ee] text-sm leading-snug">
                  <Check className="w-3.5 h-3.5 text-[#f97316] mt-1 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => { trackEvent("cta_click", { location: "final_primary" }); scrollToForm(); }}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm text-[#0a1533] font-semibold transition-colors hover:bg-[#e8eefb]"
              >
                Get my Micro GCC plan <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("booked_consultation", { source: "final_cta" })}
                className="inline-flex items-center gap-1.5 text-[#8fb6f2] text-sm font-semibold"
              >
                Or book a 20-minute call <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div data-micro-gcc-form className="scroll-mt-6">
            <MicroGccForm variant="final" />
          </div>
        </div>
      </section>

      {/* Minimal footer - only Privacy Policy and Terms */}
      <footer className="border-t border-[#dde7f7] px-6 sm:px-8 lg:px-12 py-10 pb-28 md:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5d6a8a]">
          <p>&copy; {new Date().getFullYear()} NeoIntelli</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#0a1533] px-4 py-3 transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <p className="text-xs text-white leading-snug flex-1">Start your India team with 8 to 10</p>
          <button
            type="button"
            onClick={() => { trackEvent("cta_click", { location: "sticky_mobile" }); scrollToForm(); }}
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-[#1f5fd0] px-5 py-3 text-sm text-white font-semibold whitespace-nowrap"
          >
            Get my plan <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
