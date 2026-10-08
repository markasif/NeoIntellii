import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Cpu,
  FileSearch,
  Gauge,
  Handshake,
  Laptop,
  LayoutDashboard,
  MapPin,
  Receipt,
  Rocket,
  ScrollText,
  Settings2,
  ShieldCheck,
  UserCheck,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { activeLenis } from "@/components/animations/SmoothScroll";
import SharedServicesForm from "@/components/landing/finance-procurement-ssc/SharedServicesForm";
import IndustryBlock from "@/components/landing/finance-procurement-ssc/IndustryBlock";
import { INDUSTRIES, type ReportingVariant } from "@/components/landing/finance-procurement-ssc/industries";
import { PAGE_ID } from "@/components/landing/finance-procurement-ssc/tracking";
import {
  BODY,
  BODY_DARK,
  BODY_LG,
  BTN_GHOST_DARK,
  BTN_ON_DARK,
  BTN_PRIMARY,
  EYEBROW,
  H2,
  H2_DARK,
  PANEL,
  PANEL_DARK,
} from "@/components/landing/finance-procurement-ssc/theme";

const FORM_ANCHOR = "ssc-form";

/**
 * Which industry block ships. Healthcare first; a second vertical is added in
 * industries.ts and named here.
 */
const INDUSTRY = INDUSTRIES.healthcare;

/**
 * Indian group or foreign parent. The two run on separate ad groups and see one
 * compliance line each, never both.
 *
 * VERIFY before launch: which variant this page serves.
 */
const REPORTING_VARIANT: ReportingVariant = "india-group";

const HERO_PROOF = [
  "Captive, outsourced or hybrid, recommended honestly",
  "Automation built in-house, IP is yours",
  "Pods, SLAs and service catalogue from week one",
  "Build, operate, transfer on agreed milestones",
];

const MYTH_CARDS = [
  {
    tag: "Old model",
    body:
      "Entity, lease, fit-out, a facilities team, an HR team and a five-year headcount plan before the first invoice is processed. That overhead is why advisers say outsource below 50.",
  },
  {
    tag: "What changed",
    // VERIFY before launch: transfer pricing safe harbour applicability and the
    // exact wording, with tax counsel.
    body:
      "Managed workspace. Employer of record to start. Transfer pricing safe harbour provisions that can apply to small captives, confirmed with your tax counsel. And automation that removes the repetitive volume the old model needed headcount for.",
  },
  {
    tag: "What that means",
    body:
      "A 30-person centre with the right automation can carry the transactional load of a much larger manual one. The knowledge stays inside your company instead of walking out with a vendor contract.",
  },
];

const PILLARS = [
  {
    icon: ClipboardList,
    title: "Shared services advisory",
    body:
      "Captive, outsourced or hybrid, decided per process tower, not as a slogan. We will tell you in writing if a transactional slice is better outsourced.",
  },
  {
    icon: Workflow,
    title: "Transition and implementation",
    body:
      "From entity-level processes to one standardised structure. Process mapping, cutover sequence, controls, change management with the units.",
  },
  {
    icon: UserCheck,
    title: "Talent and staffing",
    body:
      "Finance and procurement professionals, pod leads and the SSC head, technically and functionally validated, with you approving every hire.",
  },
  {
    icon: Cpu,
    title: "Technology and AI enablement",
    body:
      "Our in-house engineering team builds the automation for your processes and hands you the code. Not a reseller of someone else's RPA licence.",
  },
];

const STEPS = [
  {
    step: "Step 1",
    title: "Understand",
    // VERIFY before launch: the duration of the diagnostic. No number is stated
    // here until it is confirmed.
    body:
      "Diagnostic of the current entity-level processes, volumes, systems and controls. Output: a baseline of cycle time, cost per transaction and error rate.",
  },
  {
    step: "Step 2",
    title: "Design",
    body:
      "Target operating model, consolidation roadmap by process tower, captive or hybrid recommendation, team shape and open-book cost.",
  },
  {
    step: "Step 3",
    title: "Enable",
    body:
      "Hire the pods, stand up workspace and IT, build the automation layer, cut over unit by unit against a service catalogue and SLAs.",
  },
  {
    step: "Step 4",
    title: "Scale",
    body:
      "Measured performance, continuous improvement, second and third process towers, then transfer on milestones.",
  },
];

const OPERATING_LAYERS = [
  {
    layer: "Transactional hub",
    covers: "Invoice processing, claims, P2P, billing, reconciliations",
    neointelli: "Pods per tower, automation for capture, matching, routing and exceptions",
  },
  {
    layer: "Centre of excellence",
    covers: "Policy, controls, compliance, analytics",
    neointelli: "Governance framework, service catalogue, SLA reporting, audit readiness",
  },
  {
    layer: "Digital enablement",
    covers: "ERP integration, e-procurement, dashboards",
    // VERIFY before launch: which ERPs we have worked with, before naming any.
    neointelli: "Built by our engineers, integrated with your ERP, owned by you",
  },
  {
    layer: "Transformation partner",
    covers: "BOT or managed services",
    neointelli: "We design, operate and transfer the centre on agreed milestones",
  },
];

// VERIFY before launch: confirm we can deliver each of these six. Drop any we
// cannot.
const AUTOMATION = [
  {
    icon: Receipt,
    title: "Invoice capture and three-way matching",
    body: "Exception queues instead of email chains.",
  },
  {
    icon: FileSearch,
    title: "Claims intake, validation and status tracking",
    body: "One queue, one status, visible to the units.",
  },
  {
    icon: ShieldCheck,
    title: "Vendor onboarding",
    body: "Document checks and risk scoring before a vendor is live.",
  },
  {
    icon: CheckCircle2,
    title: "Requisition to PO approval workflows",
    body: "Approval routing by category, value and entity.",
  },
  {
    icon: Bot,
    title: "Month-end close checklists and reconciliation bots",
    body: "The close runs to a checklist, not to memory.",
  },
  {
    icon: LayoutDashboard,
    title: "CFO dashboard across all entities",
    body: "Cash, payables ageing, spend by category and SLA performance in one view.",
  },
];

const COST_LINES: { icon: LucideIcon; label: string; value?: string }[] = [
  { icon: Wallet, label: "Salary and benefits", value: "at actual, approved by you" },
  { icon: Users, label: "Recruiting, HR and operations" },
  { icon: ScrollText, label: "Payroll, entity and compliance" },
  { icon: MapPin, label: "Workspace, IT and support" },
  { icon: Laptop, label: "Laptops", value: "at cost, or supplied by you" },
  // VERIFY before launch: whether the automation build is included in the
  // operating fee, scoped separately, or a fixed build fee.
  { icon: Settings2, label: "Automation build", value: "scoped and priced separately from the monthly operating cost" },
];

const OWNERSHIP_MODELS = [
  {
    tag: "Own from day 1",
    title: "Your entity. Your compliance.",
    body:
      "You already have an Indian entity, or you want one now. The centre is yours on paper from the first hire, and we run the hiring, workspace and operations underneath it.",
    fit: "Groups with an India entity, or the appetite to set one up today.",
    icon: Building2,
  },
  {
    tag: "No entity required",
    title: "Start without an entity.",
    body:
      "The team is employed through NeoIntelli. You direct the work; we carry the employment, payroll and statutory obligations. Nothing to incorporate before your first pod starts.",
    fit: "A first India centre, or a tower you want to prove before you commit.",
    icon: Rocket,
  },
  {
    tag: "Build, operate, transfer",
    title: "We build it. You take it over.",
    body:
      "We build and run the centre to an agreed standard, then transfer the people, contracts and operations to your entity. Transfer is triggered by milestones agreed at the start, not by an arbitrary date: team hired, stable operating state reached, your India entity ready, handover confirmed by both sides. Standard operate period is 18 months. A one-time transfer fee applies, agreed with you upfront. No per-head charge, no surprise exit fee. Mechanics are written into the SOW on day one.",
    fit: "Boards that want a captive centre without carrying the first-year risk.",
    icon: Handshake,
  },
];

const COMPARISON_ROWS = [
  {
    label: "Who owns the process knowledge",
    bpo: "Vendor",
    platform: "You",
    consulting: "You",
    neointelli: "You",
  },
  {
    label: "Who hires the team",
    bpo: "Vendor",
    platform: "Partner",
    consulting: "You or a recruiter",
    neointelli: "We source and validate, you approve",
  },
  {
    label: "Who builds the automation",
    bpo: "Vendor, on their platform",
    platform: "Third-party licence",
    consulting: "Recommends, does not build",
    neointelli: "Our engineers, your IP",
  },
  {
    label: "Governance and SLAs",
    bpo: "Vendor's",
    platform: "You set up",
    consulting: "Designed, not run",
    neointelli: "Set up and run with you",
  },
  {
    label: "Minimum viable size",
    bpo: "Hundreds of FTEs",
    platform: "Usually 50+",
    consulting: "Not applicable",
    neointelli: "30",
  },
  {
    label: "Transfer to you",
    bpo: "No",
    platform: "Yes",
    consulting: "Not applicable",
    neointelli: "Yes, on milestones",
  },
];

const FAQS = [
  {
    q: "Is 30 people really enough?",
    a: "Yes, for a defined scope of process towers with automation carrying the volume. We will tell you if your volumes need more, or fewer.",
  },
  {
    q: "Captive or outsourced?",
    a: "It depends per process. We recommend in writing, and we do not run a BPO, so there is no incentive to steer you.",
  },
  {
    q: "Do we need an Indian entity?",
    a: "No to start. Yes to transfer. Both paths are set out in the ownership section on this page.",
  },
  {
    q: "Which cities do you cover?",
    // VERIFY before launch: the city rationale for finance towers, before we
    // recommend a specific city on the page.
    a: "Bengaluru, Pune, Hyderabad, Chennai and Mumbai. We give you a tower-by-tower city recommendation before you commit.",
  },
  {
    q: "What about transfer pricing for a foreign parent?",
    // VERIFY before launch: this wording, with tax counsel.
    a: "Safe harbour provisions may apply. We work with your tax counsel on the arrangement. This is not tax advice.",
  },
  {
    q: "Who owns the automation?",
    a: "You do. Code and documentation are assigned to your entity.",
  },
  {
    q: "How long to a working centre?",
    // VERIFY before launch: the duration of each stage. The sequence is stated;
    // no timeline is claimed until it is confirmed.
    a: "The sequence is diagnostic, design, first pod live, then the first tower cut over. We commit to dates against your volumes and systems at the design stage, not before.",
  },
  {
    q: "What do you measure?",
    a: "Cycle time, accuracy, cost per transaction, SLA adherence and month-end close days.",
  },
  {
    q: "What happens to the team when we transfer?",
    a: "The same people. Contract continuity where permitted, releases and NOCs from us, and no per-head charge.",
  },
];

/** Jumps to whichever copy of the lead form is nearer the current scroll position. */
const scrollToForm = () => {
  if (typeof document === "undefined") return;
  const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-ssc-form]"));
  if (anchors.length === 0) return;
  const tops = anchors.map((anchor) => anchor.getBoundingClientRect().top + window.scrollY - 24);
  const top = tops.reduce((closest, value) =>
    Math.abs(value - window.scrollY) < Math.abs(closest - window.scrollY) ? value : closest);
  if (activeLenis) activeLenis.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
};

/** Every cal.com click is a conversion event, tagged with where it was clicked. */
const trackBooking = (location: string) =>
  trackEvent("booked_consultation", { source: location, page: PAGE_ID });

const trackCta = (location: string) => trackEvent("cta_click", { location, page: PAGE_ID });

export default function FinanceProcurementSharedServicesIndia() {
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
                Finance and Procurement Shared Services &middot; India &middot; 30 to 100 people
              </p>
              <h1 className="text-5xl leading-[1.03] md:text-7xl font-bold tracking-[-0.035em] mb-6">
                <span className="block text-white">A captive finance and procurement hub in India</span>
                <span className="block text-[#8fb6f2]">that pays back at 30 people, not 500.</span>
              </h1>
              <span aria-hidden="true" className="block w-16 h-1 rounded-full bg-[#f97316] mb-6" />
              <p className="text-[#c2d2ee] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                We design the consolidation, hire the team, run the centre and build the automation for your
                processes, then transfer it to you. Open book on every salary.{" "}
                <span className="text-white font-semibold">
                  You own the people, the processes and the code.
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => { trackCta("hero_primary"); scrollToForm(); }}
                  className={BTN_PRIMARY}
                >
                  Get a consolidation assessment <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackBooking("hero_secondary")}
                  className={BTN_GHOST_DARK}
                >
                  Book a 30-minute call <CalendarCheck className="w-4 h-4" aria-hidden="true" />
                </a>
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

            <div id={FORM_ANCHOR} data-ssc-form className="lg:sticky lg:top-8 scroll-mt-6">
              <SharedServicesForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - The myth we are attacking */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>The myth</p>
          <h2 className={`${H2} mb-10 max-w-4xl`}>
            You have been told a captive does not make sense below a few hundred people. That was true when you had
            to build everything yourself.
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {MYTH_CARDS.map(({ tag, body }) => (
              <div key={tag} className={`${PANEL} p-6 flex flex-col`}>
                <span className="inline-flex self-start rounded-full bg-[#1f5fd0]/[0.08] px-3 py-1.5 text-2xs tracking-[0.16em] uppercase font-semibold text-[#1f5fd0] mb-5">
                  {tag}
                </span>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - What we do */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>What we do</p>
          <h2 className={`${H2} mb-10`}>One partner across the whole journey</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL} p-6`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1f5fd0]/[0.08] text-[#1f5fd0] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm text-[#101c4a] font-semibold mb-2 leading-snug">{title}</h3>
                <p className={`${BODY} text-sm`}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - How we work */}
      <section className="relative overflow-hidden bg-[#0a1533] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="relative max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>How we work</p>
          <h2 className={`${H2_DARK} mb-4 max-w-3xl`}>Understand, Design, Enable, Scale</h2>
          <p className="text-[#93a6cd] text-base md:text-lg leading-relaxed max-w-2xl mb-12">
            Four stages. Each one ends in something you can read, price and challenge before the next one starts.
          </p>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map(({ step, title, body }) => (
              <li key={step} className={`${PANEL_DARK} p-6`}>
                <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#f97316] mb-3">{step}</p>
                <h3 className="text-white text-base font-semibold mb-2 leading-snug">{title}</h3>
                <p className="text-[#93a6cd] text-xs leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 5 - The operating model */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>The operating model</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>Four layers, and who carries each one</h2>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <caption className="sr-only">
                The four layers of the shared services operating model, what each covers, and what NeoIntelli does
              </caption>
              <thead>
                <tr className="border-b border-[#dde7f7]">
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">Layer</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">What it covers</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#101c4a] bg-[#1f5fd0]/[0.05]">
                    What NeoIntelli does
                  </th>
                </tr>
              </thead>
              <tbody>
                {OPERATING_LAYERS.map(({ layer, covers, neointelli }) => (
                  <tr key={layer} className="border-b border-[#eef3fb] last:border-b-0">
                    <th scope="row" className="p-5 text-sm text-[#101c4a] font-semibold align-top">{layer}</th>
                    <td className="p-5 text-sm text-[#5d6a8a] align-top">{covers}</td>
                    <td className="p-5 text-sm text-[#101c4a] font-medium align-top bg-[#1f5fd0]/[0.05]">
                      {neointelli}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6 - What we build. The differentiator, so it gets the full band. */}
      <section className="relative overflow-hidden bg-[#0a1533] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 right-0 w-[460px] h-[460px] rounded-full bg-[#1f5fd0]/20 blur-[130px]"
        />
        <div className="relative max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>What we build</p>
          <h2 className={`${H2_DARK} mb-5 max-w-4xl`}>
            The automation is built for your processes, inside your centre, and you own it.
          </h2>
          <p className={`${BODY_DARK} text-base md:text-lg max-w-2xl mb-12`}>
            This is the part that makes 30 people enough. Every item below is built for the way your entities
            actually work, not configured on a platform you rent.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {AUTOMATION.map(({ icon: Icon, title, body }) => (
              <div key={title} className={`${PANEL_DARK} p-6`}>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f97316]/15 text-[#f97316] mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-white text-sm font-semibold mb-2 leading-snug">{title}</h3>
                <p className="text-[#93a6cd] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#f97316]/30 bg-[#f97316]/[0.07] p-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f97316]/20 text-[#f97316] mb-4">
                <Gauge className="w-5 h-5" aria-hidden="true" />
              </span>
              <p className="text-white text-sm leading-relaxed">
                {/* VERIFY before launch: replace with our own delivered figure once we
                    have one. Never publish a reduction we have not achieved. */}
                Automating capture and matching is where accounts payable cycle time moves. We set the target with
                you at the design stage and report against it every month. We do not quote a reduction we have not
                delivered for you.
              </p>
            </div>
            <div className={`${PANEL_DARK} p-6`}>
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-[#8fb6f2] mb-4">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </span>
              <p className="text-white text-sm leading-relaxed">
                Built by NeoIntelli engineers, deployed in your environment, code and documentation assigned to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - Industry block. Swappable; healthcare ships first. */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <IndustryBlock industry={INDUSTRY} reportingVariant={REPORTING_VARIANT} />
      </section>

      {/* SECTION 8 - What it costs */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>What it costs</p>
          <h2 className={`${H2} mb-10 max-w-3xl`}>Open book. You approve every salary. Our charges sit on top.</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <p className="text-white text-lg md:text-xl font-bold tracking-[-0.02em] md:max-w-lg">
              Fully loaded operating cost is salary and benefits plus our charges on top.
            </p>
            <p className="text-[#93a6cd] text-sm leading-relaxed md:text-right md:max-w-xs">
              Excluding laptops and the automation build if scoped separately.
            </p>
          </div>

          <div className={`${PANEL} mt-4 p-6 md:p-7`}>
            <p className="text-[#101c4a] text-sm md:text-base font-semibold leading-relaxed mb-3">
              No hidden management fee. No recruitment retainer. Billed monthly in advance.
            </p>
            <p className={`${BODY} text-sm`}>
              Cost per transaction is the number we report against, not headcount.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9 - Ownership and transfer */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>Ownership and transfer</p>
          <h2 className={`${H2} mb-4`}>Choose how much you want to own, and when</h2>
          <p className={`${BODY_LG} max-w-2xl mb-10`}>
            Three ways to run the same centre. All three start at 30 people, and all three end with the centre in
            your hands if you want it there.
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
                  <p className="text-2xs tracking-[0.16em] uppercase font-semibold text-[#5d6a8a] mb-1.5">
                    Best for
                  </p>
                  <p className="text-xs text-[#2a3556] leading-relaxed">{fit}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#f97316]/30 bg-[#f97316]/[0.06] p-6 md:p-7">
            <p className="text-[#101c4a] text-sm md:text-base font-semibold leading-relaxed">
              If we recommend outsourcing a slice, we say so, and we are not the outsourcer, so the advice is not a
              sales pitch.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10 - Who runs it until your SSC head is hired */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>Leadership cover</p>
          <h2 className={`${H2} mb-6`}>Who runs it until your SSC head is hired</h2>
          {/* VERIFY before launch: the leader's name, and whether to show a photo. */}
          <p className={`${BODY_LG} mb-4`}>
            A senior NeoIntelli leader with twenty years of customer-facing delivery and five years in AI and ML
            works with you and the pods on a needs basis until your SSC head is in place.
          </p>
          <p className={`${BODY_LG} font-semibold text-[#101c4a]`}>No separate fee.</p>
        </div>
      </section>

      {/* SECTION 11 - How this is different */}
      <section className="bg-[#f3f6fc] px-6 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <p className={`${EYEBROW} text-[#f97316] mb-4`}>How this is different</p>
          <h2 className={`${H2} mb-10`}>Four ways to get this done. Only one leaves you owning it.</h2>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
            <table className="w-full min-w-[820px] text-left border-collapse">
              <caption className="sr-only">
                Outsourcing, a GCC setup platform, a consulting firm and NeoIntelli compared across six dimensions
              </caption>
              <thead>
                <tr className="border-b border-[#dde7f7]">
                  <th scope="col" className="p-5 text-2xs tracking-[0.16em] uppercase font-semibold text-[#5d6a8a]">
                    <span className="sr-only">Dimension</span>
                  </th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">Outsourcing (BPO)</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">GCC setup platform</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#5d6a8a]">Consulting firm</th>
                  <th scope="col" className="p-5 text-xs font-semibold text-[#101c4a] bg-[#1f5fd0]/[0.05]">
                    NeoIntelli
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(({ label, bpo, platform, consulting, neointelli }) => (
                  <tr key={label} className="border-b border-[#eef3fb] last:border-b-0">
                    <th scope="row" className="p-5 text-sm text-[#101c4a] font-semibold align-top">{label}</th>
                    <td className="p-5 text-sm text-[#5d6a8a] align-top">{bpo}</td>
                    <td className="p-5 text-sm text-[#5d6a8a] align-top">{platform}</td>
                    <td className="p-5 text-sm text-[#5d6a8a] align-top">{consulting}</td>
                    <td className="p-5 text-sm text-[#101c4a] font-medium align-top bg-[#1f5fd0]/[0.05]">
                      {neointelli}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 12 - FAQ */}
      <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20">
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

      {/* SECTION 13 - Final CTA with the second form */}
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
              <span className="block text-white">Tell us which processes you want out of the entities</span>
              <span className="block text-[#8fb6f2]">and into one centre.</span>
            </h2>
            <p className={`${BODY_DARK} text-base md:text-lg mb-8 max-w-xl`}>
              One call to scope the towers. A proposed process scope, team shape and open-book monthly cost back
              within a business day.
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 max-w-xl">
              {[
                "Process scope by tower",
                "Team shape and pod design",
                "Open-book monthly cost",
                "Captive, outsourced or hybrid, in writing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[#c2d2ee] text-sm leading-snug">
                  <Check className="w-3.5 h-3.5 text-[#f97316] mt-1 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => { trackCta("final_primary"); scrollToForm(); }}
                className={BTN_ON_DARK}
              >
                Get a consolidation assessment <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBooking("final_cta")}
                className="inline-flex items-center gap-1.5 text-[#8fb6f2] text-sm font-semibold"
              >
                Or book a 30-minute call <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div data-ssc-form className="scroll-mt-6">
            <SharedServicesForm variant="final" />
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
          <p className="text-xs text-white leading-snug flex-1">One finance and procurement hub in India</p>
          <button
            type="button"
            onClick={() => { trackCta("sticky_mobile"); scrollToForm(); }}
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-[#1f5fd0] px-5 py-3 text-sm text-white font-semibold whitespace-nowrap"
          >
            Get assessment <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
