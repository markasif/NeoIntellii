import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Compass,
  Database,
  Network,
  Sparkles,
  Users,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import RealGccBuilding from "@/components/landing/RealGccBuilding";
import { CAL_BOOKING_URL } from "@/lib/constants";

const capabilities = [
  {
    number: "01",
    title: "AI-First GCC",
    description:
      "AI strategy, data engineering, MLOps, generative AI, and responsible AI governance built into your operating model.",
    href: "/services/ai-gcc",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "GCC Setup & Advisory",
    description:
      "Board-ready business case, Pvt Ltd registration, location strategy, transfer pricing, and launch playbook.",
    href: "/services/gcc/setup-launch",
    icon: Compass,
  },
  {
    number: "03",
    title: "AI Delivery Teams",
    description:
      "Dedicated AI engineering teams, delivery pods and forward-deployed engineers that work inside your roadmap and repositories.",
    href: "/services/ai-delivery-teams",
    icon: Users,
  },
  {
    number: "04",
    title: "Recruitment & Staffing",
    description:
      "Contingent lateral hiring, contract staffing compliance, retained executive search, and scale RPO.",
    href: "/recruitment",
    icon: Network,
  },
  {
    number: "05",
    title: "AI Engineering",
    description:
      "Production AI across Generative AI, Agentic AI, machine learning and data, engineered from proof of value into real workflows.",
    href: "/services/ai-engineering",
    icon: Database,
  },
];

const reasons = [
  {
    title: "Advisory plus execution",
    description: "Strategy, setup, operations, talent, and technology designed as one system.",
  },
  {
    title: "AI-first perspective",
    description: "GCCs ready for data-led and AI-enabled operating models from the start.",
  },
  {
    title: "India-native execution",
    description: "Practical experience across talent, governance, and delivery structures in India.",
  },
  {
    title: "Senior-led engagement",
    description: "Critical decisions around scope, control, and sequencing led with executive accountability.",
  },
];

const industries = [
  { title: "Financial Services", href: "/industries/bfsi-gcc" },
  { title: "Healthcare & Life Sciences", href: "/industries/healthcare-gcc" },
  { title: "Retail & Consumer", href: "/industries/retail-gcc" },
  { title: "Manufacturing", href: "/industries/manufacturing-gcc" },
  { title: "Software & SaaS", href: "/industries/technology-gcc" },
  { title: "Private Equity", href: "/industries/private-equity-gcc" },
];

const planningTools = [
  {
    label: "Cost",
    title: "GCC Cost Calculator",
    description: "Estimate your fully loaded India GCC cost by team size, city, seniority, and engagement model.",
    href: "/gcc-cost-calculator",
    cta: "Calculate cost",
  },
  {
    label: "ROI",
    title: "GCC ROI Estimator",
    description: "Compare your current spend against an India GCC model. See break-even, 5-year savings, and ROI.",
    href: "/gcc-roi-estimator",
    cta: "Estimate ROI",
  },
  {
    label: "Readiness",
    title: "GCC Readiness Assessment",
    description: "Answer 8 quick questions to get a personalized readiness score and next-step recommendation.",
    href: "/gcc-readiness-assessment",
    cta: "Take the assessment",
  },
];

const faqs = [
  {
    question: "What kinds of companies should consider a GCC in India?",
    answer:
      "Companies that need access to specialist talent, better control over critical capabilities, stronger resilience, and a scalable platform for digital, data, AI, or operations work should evaluate a GCC model.",
  },
  {
    question: "Does NeoIntelli only help with new GCC launches?",
    answer:
      "No. We support both greenfield launches and the transformation of existing centers that need stronger governance, better operating performance, or AI-enabled capabilities.",
  },
  {
    question: "How is NeoIntelli different from a staffing firm?",
    answer:
      "Staffing may be one element of execution, but NeoIntelli focuses on the larger system: operating model, leadership design, governance, technology, compliance, and long-term value creation.",
  },
  {
    question: "Do you support AI programs inside GCCs?",
    answer:
      "Yes. NeoIntelli helps companies design AI-first GCCs, including strategy, data engineering, MLOps, generative AI, and responsible AI governance.",
  },
];

const navItems = [
  { label: "What we do", href: "#capabilities" },
  { label: "Why NeoIntelli", href: "#why" },
  { label: "How we engage", href: "#engagement" },
  { label: "Planning tools", href: "#tools" },
];

function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      to={href}
      className={`group inline-flex items-center gap-2 text-sm ${dark ? "text-white" : "text-[#0a6f8e]"}`}
    >
      <span className="border-b border-current/35 pb-0.5">{children}</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function NewHome() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#202641]">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link to="/" className="shrink-0" aria-label="NeoIntelli Home">
            <img
              src="/images/neointelli_logo.webp"
              alt="NeoIntelli"
              width={150}
              height={38}
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Landing page navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-xs text-[#536078] transition-colors hover:text-[#1096bf]">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0d89ae] via-[#1096bf] to-[#28b9dd] px-4 py-2.5 text-xs text-white shadow-[0_14px_26px_-14px_rgba(16,150,191,0.9)] transition-transform hover:-translate-y-0.5"
          >
            Book a consultation <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-white pt-32 sm:pt-40 lg:pt-44">
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-32 top-[-24%] h-[52rem] w-[52rem] rounded-full bg-[#1096bf]/12 blur-[120px]" />
            <div className="absolute right-[8%] top-[15%] h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-[#1096bf]/12 via-[#54d3ef]/10 to-transparent blur-3xl" />
            <div className="absolute right-[8%] top-[16%] h-[28rem] w-[28rem] opacity-[0.3] [background-image:radial-gradient(rgba(16,150,191,0.32)_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12 lg:px-10 lg:pb-24">
            <div className="max-w-3xl">
              <p className="mb-7 flex items-center gap-2 text-2xs font-medium uppercase tracking-[0.16em] text-[#1096bf]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1096bf] shadow-[0_0_16px_rgba(16,150,191,0.45)]" />
                AI-first global capability centers in India
              </p>
              <h1 className="max-w-3xl text-6xl font-semibold leading-[0.94] tracking-[-0.064em] text-[#17233c] sm:text-9xl lg:text-9xl">
                Build your next capability center <span className="bg-gradient-to-r from-[#0d87ad] via-[#1096bf] to-[#36c8eb] bg-clip-text text-transparent">for what comes next.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5c687d] sm:text-lg">
                NeoIntelli helps global companies design, launch, and scale Global Capability Centers in India with the right operating model, talent strategy, specialist staffing, and AI-enabled foundations.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/blueprint"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0d89ae] via-[#1096bf] to-[#2bc2e7] px-6 py-3.5 text-sm text-white shadow-[0_18px_34px_-18px_rgba(16,150,191,0.95)] transition-transform hover:-translate-y-0.5"
                >
                  Get the GCC Blueprint <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-[#1096bf]/20 bg-white px-6 py-3.5 text-sm text-[#2b3851] shadow-[0_12px_28px_-22px_rgba(23,35,60,0.3)] transition-colors hover:border-[#1096bf]/40 hover:text-[#1096bf]"
                >
                  Speak to a GCC Advisor <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[680px] py-3 lg:mx-0 lg:justify-self-end">
              <RealGccBuilding />
            </div>
          </div>
          <div className="border-y border-[#17233c]/[0.07] bg-[#fbfdfe]">
            <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-7 gap-y-2 px-6 py-4 text-center text-2xs uppercase tracking-[0.16em] text-[#607089] lg:px-10">
              {["100+ years collective GCC leadership", "9-day readiness sprint", "500+ specialist consultants", "India-native execution", "AI-first operating model"].map((item) => (
                <span key={item} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#1096bf]" />{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#0a7fa4]">What NeoIntelli helps you do</p>
                <h2 className="mt-5 max-w-lg text-5xl leading-[1.04] tracking-[-0.045em] text-[#36326a] sm:text-6xl">
                  From setup to AI-led transformation.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-[#536078]">
                Five core solutions, delivered as an integrated operating system for your India GCC.
              </p>
            </div>
            <div className="mt-14 grid border-t border-[#0e1320]/10 sm:grid-cols-2 lg:grid-cols-5">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                const dark = index === 0;
                return (
                  <Link
                    key={capability.title}
                    to={capability.href}
                    className={`group relative flex min-h-[270px] flex-col border-b border-r border-[#0e1320]/10 p-6 last:border-r-0 lg:min-h-[330px] lg:p-7 ${dark ? "bg-[#36326a] text-white" : "bg-white text-[#202641]"}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${dark ? "bg-white/10 text-[#8be9ff]" : "bg-[#e9f7fb] text-[#0a7fa4]"}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className={`mt-7 text-2xs uppercase tracking-[0.16em] ${dark ? "text-white/45" : "text-[#8a96aa]"}`}>{capability.number}</p>
                    <h3 className="mt-2 text-xl leading-tight tracking-[-0.03em]">{capability.title}</h3>
                    <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/65" : "text-[#5c687d]"}`}>{capability.description}</p>
                    <span className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm ${dark ? "text-white" : "text-[#0a6f8e]"}`}>
                      Explore <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="engagement" className="bg-[#f5f8fb] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#0a7fa4]">How we engage</p>
              <h2 className="mt-5 text-5xl leading-[1.04] tracking-[-0.045em] text-[#36326a] sm:text-6xl">One partner across design, launch, and scale.</h2>
              <p className="mt-6 text-base leading-relaxed text-[#536078]">A defined engagement model so you always know where you are in the journey and what comes next.</p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                ["01", "Design", "GCC strategy, operating model blueprint, business case, location analysis, and board-ready recommendation. All within 9 days of engagement."],
                ["02", "Launch", "Entity planning, Pvt Ltd setup, governance structure, leadership hiring, infrastructure, and full operational readiness. First hire within weeks."],
                ["03", "Scale", "Maturity improvement, AI embedding, new value pools, performance systems, and talent programs. Evolving your GCC into a strategic enterprise asset."],
              ].map(([number, title, description]) => (
                <article key={title} className="rounded-2xl border border-[#0e1320]/[0.08] bg-white p-7 sm:p-8">
                  <p className="text-5xl leading-none tracking-[-0.05em] text-[#0a93bd]/25">{number}</p>
                  <h3 className="mt-10 text-2xl tracking-[-0.03em] text-[#36326a]">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#5c687d]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="bg-[#36326a] px-6 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#8be9ff]">Why NeoIntelli</p>
              <h2 className="mt-5 text-5xl leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl">Built for enterprise buyers who need more than a staffing vendor.</h2>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70">
                NeoIntelli is positioned for leadership teams that want an India partner capable of connecting strategy with execution. We treat GCC creation as the design of a durable operating model, not a real-estate or headcount exercise.
              </p>
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm text-white"><span className="border-b border-white/35 pb-0.5">Learn about NeoIntelli</span><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <div key={reason.title} className="min-h-[195px] bg-[#36326a] p-7 sm:p-8">
                  <p className="text-sm text-[#8be9ff]">0{index + 1}</p>
                  <h3 className="mt-9 text-xl tracking-[-0.03em] text-white">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#0a7fa4]">Industries</p>
                <h2 className="mt-5 text-5xl leading-[1.04] tracking-[-0.045em] text-[#36326a] sm:text-6xl">Built for enterprises with complex operating realities.</h2>
              </div>
              <ArrowLink href="/industries">Explore industries we serve</ArrowLink>
            </div>
            <div className="mt-12 grid border-y border-[#0e1320]/10 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <Link key={industry.title} to={industry.href} className="group flex items-center justify-between gap-4 border-b border-r border-[#0e1320]/10 px-5 py-6 text-[#36326a] lg:px-7">
                  <span className="text-lg tracking-[-0.03em]">{industry.title}</span>
                  <ChevronRight className="h-4 w-4 text-[#0a93bd]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className="bg-[#e9f7fb] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#0a7fa4]">Plan your GCC</p>
              <h2 className="mt-5 text-5xl leading-[1.04] tracking-[-0.045em] text-[#36326a] sm:text-6xl">Three ways to make the next decision clearer.</h2>
              <p className="mt-6 text-base leading-relaxed text-[#536078]">Three quick tools to size, justify, and validate your India GCC before you commit.</p>
            </div>
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {planningTools.map((tool, index) => (
                <Link key={tool.title} to={tool.href} className={`group rounded-2xl p-7 sm:p-8 ${index === 1 ? "bg-[#0a6f8e] text-white" : "bg-white text-[#36326a]"}`}>
                  <p className={`text-2xs uppercase tracking-[0.16em] ${index === 1 ? "text-[#8be9ff]" : "text-[#0a7fa4]"}`}>{tool.label}</p>
                  <h3 className="mt-7 text-2xl tracking-[-0.04em]">{tool.title}</h3>
                  <p className={`mt-4 min-h-[72px] text-sm leading-relaxed ${index === 1 ? "text-white/70" : "text-[#5c687d]"}`}>{tool.description}</p>
                  <span className={`mt-9 inline-flex items-center gap-2 text-sm ${index === 1 ? "text-white" : "text-[#0a6f8e]"}`}>{tool.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#0a7fa4]">Frequently asked questions</p>
              <h2 className="mt-5 text-5xl leading-[1.04] tracking-[-0.045em] text-[#36326a] sm:text-6xl">The questions that matter before you build.</h2>
            </div>
            <div className="border-t border-[#0e1320]/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-[#0e1320]/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base leading-snug text-[#36326a]">
                    {faq.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0e1320]/10 text-[#0a7fa4] group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-relaxed text-[#5c687d]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0a6f8e] px-7 py-14 text-center text-white sm:px-12 sm:py-20">
            <p className="text-2xs font-medium uppercase tracking-[0.16em] text-[#8be9ff]">Let’s build together</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-5xl leading-[1.04] tracking-[-0.045em] text-white sm:text-7xl">Design your next AI-first Global Capability Center.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">Whether you are setting up a new GCC, scaling engineering capability, or building an AI-enabled operating model, NeoIntelli helps you move with clarity, speed, and enterprise-grade execution.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={CAL_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm text-[#0a6f8e]">Speak with a GCC Expert<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              <Link to="/contact" className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-6 py-3.5 text-sm text-white">Schedule a Strategy Meeting<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
