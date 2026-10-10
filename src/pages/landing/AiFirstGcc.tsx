import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  TrendingUp,
  Gauge,
  Network,
  Database,
  Cpu,
  Users,
  ListChecks,
  ShieldCheck,
  Brain,
  Code2,
  RefreshCw,
  Layers,
} from "lucide-react";
import LandingNav from "@/components/landing/LandingNav";
import Footer from "@/components/layout/Footer";
import WavyHeroBackground from "@/components/landing/WavyHeroBackground";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { CAL_BOOKING_URL } from "@/lib/constants";
import CapabilityMarquee from "@/components/landing/ai-first-gcc/CapabilityMarquee";
import PodsCarousel from "@/components/landing/ai-first-gcc/PodsCarousel";

const NAV_LINKS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "Implementation", href: "#implementation" },
  { label: "Why NeoIntelli", href: "#why" },
  { label: "Planning tools", href: "#tools" },
  { label: "How we engage", href: "#engage" },
];

const TRUST = [
  "100+ Years Collective GCC Leadership",
  "9 Day Readiness Sprint",
  "500+ Specialist Consultants",
  "9+ Greenfield Launches",
  "India-Native Execution",
  "AI-First",
];

const CARDS = [
  {
    image: "/images/landing/ai-first-gcc/card-ai.jpg",
    chip: "AI-FIRST GCC",
    title: "AI built into the operating model",
    body:
      "Data, ML, and Generative AI as core components - not bolt-on experiments. A 12-week implementation across AI strategy, data engineering, MLOps, and responsible AI governance.",
    bullets: [
      "Operating model with decision rights",
      "Data foundation & AI platform",
      "Embedded responsible-AI governance",
    ],
    href: "/services/ai-gcc",
    linkLabel: "Explore AI-First GCC",
  },
  {
    image: "/images/landing/ai-first-gcc/card-setup.jpg",
    chip: "GCC SETUP",
    title: "Launch your entity in 12 weeks",
    body:
      "Board-ready business case, Pvt Ltd registration, location strategy, and transfer pricing - delivered through the engagement model that fits your control needs.",
    bullets: [
      "Captive (full ownership)",
      "BOT (Build-Operate-Transfer)",
      "EOR & Managed Services",
    ],
    href: "/services/gcc",
    linkLabel: "Explore GCC Setup",
  },
  {
    image: "/images/landing/ai-first-gcc/card-micro.jpg",
    chip: "MICRO GCC",
    title: "Start small, prove value fast",
    body:
      "A pilot-scale entry point to validate the India GCC model before committing to full scale - launched in 8-12 weeks with a focused senior team.",
    bullets: ["5-15 engineers", "Pilot-scale commitment, quoted per build", "8-12 weeks to launch"],
    href: "/services/micro-gcc",
    linkLabel: "Explore Micro GCC",
  },
];

const PHASES = [
  {
    n: 1,
    weeks: "WEEKS 0-2",
    title: "Assess & Align",
    body: "AI maturity assessment and use-case prioritization across business functions.",
  },
  {
    n: 2,
    weeks: "WEEKS 2-6",
    title: "Architect & Build",
    body: "Team topology, platform architecture, and governance structures stood up.",
  },
  {
    n: 3,
    weeks: "WEEKS 6-10",
    title: "Pilot & Industrialize",
    body: "Use-case delivery, prompt engineering, and production deployment design.",
  },
  {
    n: 4,
    weeks: "WEEKS 10-12+",
    title: "Scale & Govern",
    body: "MLOps / LLMOps implementation and responsible-AI policy design at scale.",
  },
];

const BUILDING_BLOCKS = [
  { icon: Network, label: "Operating model with defined decision rights" },
  { icon: Database, label: "Data foundation with quality controls" },
  { icon: Cpu, label: "AI engineering platform architecture" },
  { icon: Users, label: "Team design with mixed capability profiles" },
  { icon: ListChecks, label: "Use-case prioritization & delivery patterns" },
  { icon: ShieldCheck, label: "Embedded governance for responsible AI" },
];

const WHY = [
  {
    n: "01",
    title: "Advisory plus execution",
    body: "Strategy, setup, operations, talent, and technology designed as one system.",
  },
  {
    n: "02",
    title: "AI-first perspective",
    body: "GCCs ready for data-led and AI-enabled operating models from the start.",
  },
  {
    n: "03",
    title: "India-native execution",
    body: "Practical experience across talent, governance, and delivery structures in India.",
  },
  {
    n: "04",
    title: "Senior-led engagement",
    body: "Decisions around scope, control, and sequencing led with executive accountability.",
  },
];

const TOOLS = [
  {
    icon: Calculator,
    chip: "COST",
    title: "GCC Cost Calculator",
    body:
      "Estimate your fully loaded India GCC cost by team size, city, seniority, and engagement model.",
    tags: ["Team", "Seniority", "City", "Model"],
    cta: "Calculate cost",
    href: "/gcc-cost-calculator",
  },
  {
    icon: TrendingUp,
    chip: "ROI",
    title: "GCC ROI Estimator",
    body:
      "Compare your current spend against an India GCC model. See break-even, 5-year savings, and ROI.",
    tags: ["Break-even", "5 yr savings", "ROI %"],
    cta: "Estimate ROI",
    href: "/gcc-roi-estimator",
  },
  {
    icon: Gauge,
    chip: "READINESS",
    title: "GCC Readiness Assessment",
    body:
      "Answer 8 quick questions to get a personalized readiness score and next-step recommendation.",
    tags: ["8 questions", "~3 min", "Score"],
    cta: "Take the assessment",
    href: "/gcc-readiness-assessment",
  },
];

const ENGAGE = [
  {
    n: 1,
    title: "Design",
    body:
      "GCC strategy, operating model blueprint, business case, location analysis, and board-ready recommendation - all within 9 days of engagement.",
  },
  {
    n: 2,
    title: "Launch",
    body:
      "Entity planning, Pvt Ltd setup, governance structure, leadership hiring, infrastructure, and full operational readiness. First hire within weeks.",
  },
  {
    n: 3,
    title: "Scale",
    body:
      "Maturity improvement, AI embedding, new value pools, performance systems, and talent programs - evolving your GCC into a strategic enterprise asset.",
  },
];

const PODS = [
  {
    icon: Brain,
    title: "AI Delivery Pod",
    body:
      "A cross-functional pod built around one defined AI outcome, from architecture and data through evaluation to production.",
    href: "/services/ai-delivery-teams/ai-delivery-pod",
  },
  {
    icon: Code2,
    title: "Dedicated AI Team",
    body:
      "A stable AI engineering team aligned to your ongoing roadmap, keeping technical context across releases.",
    href: "/services/ai-delivery-teams/dedicated-ai-engineering-team",
  },
  {
    icon: RefreshCw,
    title: "Forward-Deployed Engineers",
    body:
      "AI engineers embedded in your repositories, systems and workflows, for the last mile between a working pilot and production.",
    href: "/services/ai-delivery-teams/forward-deployed-ai-engineers",
  },
  {
    icon: Layers,
    title: "AI Team Transfer",
    body:
      "Deliver now with a NeoIntelli team, then transfer knowledge and ownership to your internal team, Micro GCC or AI GCC.",
    href: "/services/ai-delivery-teams/ai-team-transfer",
  },
];

function DotPattern() {
  return (
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export default function AiFirstGcc() {
  useEffect(() => {
    document.title = "AI-First GCC in India | Design, Launch, Scale - NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav links={NAV_LINKS} alwaysGlass />

      {/* HERO */}
      <section className="relative isolate min-h-screen h-screen flex items-end overflow-hidden">
        {/* Wavy animated background */}
        <WavyHeroBackground />
        {/* Soft bottom gradient for content readability */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,8,18,0) 0%, rgba(2,8,18,0.65) 100%)",
          }}
        />

        {/* Bottom-left content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-28 md:pb-32">
          <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-hero-sm md:text-hero font-display text-white mb-6 leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            Navigate Your Next with an{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-200">
              AI-First GCC
            </span>{" "}
            in India.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/blueprint"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Get the GCC Blueprint
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              Speak to a GCC Advisor
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 inset-x-0 z-10 bg-white/95 backdrop-blur border-t border-black/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-2xs tracking-[0.16em] uppercase text-slate-600">
            {TRUST.map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                <span className="text-[#0a93bd]">{i === 0 ? "" : "•"}</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section id="what-we-do" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-16 max-w-2xl">
            <p className="flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-[#273C46] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
              What NeoIntelli helps you do
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#0D212C]">
              From setup to AI-led{" "}
              <span className="font-serif-display italic">transformation.</span>
            </h2>
            <p className="text-[#273C46] text-lg leading-relaxed mt-6 max-w-xl">
              Three integrated capabilities that take your India GCC from concept to a scaled,
              AI-enabled enterprise asset.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {CARDS.map((c, i) => {
              const dark = i === 1;
              return (
                <motion.div key={c.title} variants={staggerItem}>
                  <Link
                    to={c.href}
                    className={`group flex flex-col h-full rounded-[32px] overflow-hidden card-shadow-soft hover:-translate-y-1 transition-all duration-300 ${
                      dark
                        ? "bg-[#051A24]"
                        : "bg-white border border-black/[0.05]"
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-8 md:p-9">
                      <span
                        className={`self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs tracking-[0.16em] uppercase mb-5 ${
                          dark
                            ? "bg-white/10 text-[#E0EBF0]"
                            : "bg-[#0a93bd]/10 text-[#0a93bd]"
                        }`}
                      >
                        {c.chip}
                      </span>
                      <h3
                        className={`text-xl leading-snug mb-3 ${
                          dark ? "text-[#F6FCFF]" : "text-[#0D212C]"
                        }`}
                      >
                        {c.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-6 ${
                          dark ? "text-[#E0EBF0]/80" : "text-[#273C46]"
                        }`}
                      >
                        {c.body}
                      </p>
                      <ul className="space-y-2.5 mb-7">
                        {c.bullets.map((b) => (
                          <li
                            key={b}
                            className={`flex items-start gap-2.5 text-sm ${
                              dark ? "text-[#E0EBF0]/85" : "text-[#273C46]"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 mt-0.5 shrink-0 ${
                                dark ? "text-cyan-300" : "text-[#0a93bd]"
                              }`}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <span
                        className={`mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs transition-colors ${
                          dark
                            ? "bg-white text-[#051A24] btn-shadow-secondary"
                            : "bg-[#051A24] text-white btn-shadow-primary"
                        }`}
                      >
                        {c.linkLabel}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ CAPABILITY MARQUEE ============ */}
      <CapabilityMarquee />

      {/* ============ IMPLEMENTATION ============ */}
      <section id="implementation" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-20 max-w-2xl mx-auto">
            <p className="inline-flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-[#273C46] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
              AI-First GCC - Implementation
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#0D212C]">
              A proven{" "}
              <span className="font-serif-display italic">12-week path</span> to production AI.
            </h2>
            <p className="text-[#273C46] text-lg leading-relaxed mt-6">
              From maturity assessment to scaled, governed AI operations - sequenced so value
              compounds at every phase.
            </p>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative mb-20">
            <div
              aria-hidden
              className="hidden md:block absolute top-5 left-[6%] right-[6%] border-t border-dashed border-[#0D212C]/15"
            />
            <StaggerContainer
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative"
              stagger={0.08}
            >
              {PHASES.map((p) => (
                <motion.div key={p.n} variants={staggerItem} className="text-center md:text-left">
                  <div className="relative w-10 h-10 rounded-full bg-[#051A24] text-white flex items-center justify-center text-sm mb-5 mx-auto md:mx-0 btn-shadow-primary">
                    {p.n}
                  </div>
                  <p className="text-2xs tracking-[0.16em] uppercase text-[#0a93bd] mb-2.5">
                    {p.weeks}
                  </p>
                  <h3 className="text-[#0D212C] text-lg mb-2 font-medium">{p.title}</h3>
                  <p className="text-[#273C46] text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>

          <ScrollReveal>
            <div className="rounded-[40px] bg-white border border-black/[0.06] card-shadow-soft p-8 md:p-12">
              <p className="text-2xs tracking-[0.16em] uppercase text-[#0a93bd] mb-3">
                Foundation
              </p>
              <h3 className="text-[#0D212C] text-2xl md:text-3xl mb-8 tracking-tight">
                Six core <span className="font-serif-display italic">building blocks</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {BUILDING_BLOCKS.map((b, i) => (
                  <div
                    key={b.label}
                    className={`flex items-start gap-4 py-5 px-1 ${
                      i % 3 !== 2 ? "lg:border-r" : ""
                    } ${i < BUILDING_BLOCKS.length - 3 ? "border-b lg:border-b" : ""} border-black/[0.06]`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#0a93bd]/10 flex items-center justify-center shrink-0">
                      <b.icon className="w-4 h-4 text-[#0a93bd]" />
                    </div>
                    <p className="text-[#0D212C] text-sm leading-relaxed mt-1.5">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section id="why" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal className="md:col-span-5">
            <p className="inline-flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-[#273C46] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
              Why NeoIntelli
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#0D212C]">
              Built for enterprise buyers who need{" "}
              <span className="font-serif-display italic">more than a staffing vendor.</span>
            </h2>
            <p className="text-[#273C46] text-base leading-relaxed mt-6">
              We treat GCC creation as the design of a durable operating model - not a real-estate
              or headcount exercise - connecting strategy with execution.
            </p>
          </ScrollReveal>

          <div className="md:col-span-7">
            {WHY.map((w, i) => (
              <ScrollReveal key={w.n}>
                <div
                  className={`grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 ${
                    i !== 0 ? "border-t border-black/[0.08]" : ""
                  }`}
                >
                  <p className="font-serif-display italic text-[#0a93bd] text-7xl md:text-8xl leading-none">
                    {w.n}
                  </p>
                  <div className="pt-2">
                    <h3 className="text-[#0D212C] text-lg md:text-xl mb-2 font-medium">
                      {w.title}
                    </h3>
                    <p className="text-[#273C46] text-sm leading-relaxed">{w.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PLANNING TOOLS ============ */}
      <section id="tools" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[40px] bg-[#051A24] p-8 md:p-14 lg:p-16 relative overflow-hidden">
            <DotPattern />
            <ScrollReveal className="relative mb-12 max-w-2xl">
              <p className="inline-flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-cyan-200/90 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                Planning tools
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#F6FCFF]">
                Plan your GCC,{" "}
                <span className="font-serif-display italic">end to end.</span>
              </h2>
              <p className="text-[#E0EBF0]/80 text-lg leading-relaxed mt-6">
                Three quick tools to size, justify, and validate your India GCC before you commit.
              </p>
            </ScrollReveal>

            <StaggerContainer className="relative grid md:grid-cols-3 gap-5" stagger={0.1}>
              {TOOLS.map((t) => (
                <motion.div key={t.title} variants={staggerItem}>
                  <Link
                    to={t.href}
                    className="group flex flex-col h-full bg-white rounded-[28px] p-8 card-shadow-soft hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-11 h-11 rounded-2xl bg-[#0a93bd]/10 flex items-center justify-center">
                        <t.icon className="w-5 h-5 text-[#0a93bd]" />
                      </div>
                      <span className="text-2xs tracking-[0.16em] uppercase text-[#0a93bd]">
                        {t.chip}
                      </span>
                    </div>
                    <h3 className="text-[#0D212C] text-xl mb-3 leading-snug font-medium">
                      {t.title}
                    </h3>
                    <p className="text-[#273C46] text-sm leading-relaxed mb-5">{t.body}</p>
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#051A24] text-white text-xs btn-shadow-primary">
                      {t.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ============ HOW WE ENGAGE ============ */}
      <section id="engage" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-16 max-w-2xl">
            <p className="inline-flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-[#273C46] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
              How we engage
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#0D212C]">
              One partner across{" "}
              <span className="font-serif-display italic">design, launch, and scale.</span>
            </h2>
            <p className="text-[#273C46] text-lg leading-relaxed mt-6">
              A defined engagement model so you always know where you are in the journey and what
              comes next.
            </p>
          </ScrollReveal>

          <div>
            {ENGAGE.map((s, i) => (
              <ScrollReveal key={s.n}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 ${
                    i !== 0 ? "border-t border-black/[0.08]" : ""
                  }`}
                >
                  <div className="md:col-span-3">
                    <p className="font-serif-display italic text-[#0a93bd] text-8xl md:text-9xl leading-none">
                      0{s.n}
                    </p>
                  </div>
                  <div className="md:col-span-9 md:pl-8">
                    <h3 className="text-[#0D212C] text-2xl md:text-3xl tracking-tight mb-4 font-medium">
                      {s.title}
                    </h3>
                    <p className="text-[#273C46] text-base md:text-lg leading-relaxed max-w-2xl">
                      {s.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AI DELIVERY TEAMS ============ */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-[#273C46] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
                AI delivery teams
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[#0D212C]">
                Talent built for{" "}
                <span className="font-serif-display italic">how you operate.</span>
              </h2>
              <p className="text-[#273C46] text-lg leading-relaxed mt-6">
                Four delivery models that scale with your GCC - from one production outcome to
                a team you own.
              </p>
            </div>
            <span className="inline-flex self-start md:self-end items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.06] text-2xs text-[#273C46] btn-shadow-secondary">
              4 pods
            </span>
          </ScrollReveal>

          <PodsCarousel pods={PODS} />
        </div>
      </section>

      {/* ============ FINAL PARTNER CTA ============ */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="inline-flex items-center gap-2 text-2xs tracking-[0.16em] uppercase text-[#273C46] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a93bd]" />
              Let's build together
            </p>
            <h2 className="text-5xl md:text-8xl lg:text-9xl leading-[1.02] tracking-tight text-[#0D212C]">
              Partner with us on your{" "}
              <span className="font-serif-display italic">AI-first GCC.</span>
            </h2>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#051A24] text-white text-sm btn-shadow-primary hover:-translate-y-0.5 transition-transform"
              >
                Speak to a GCC advisor
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/blueprint"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#051A24] text-sm btn-shadow-secondary hover:-translate-y-0.5 transition-transform"
              >
                Get the GCC Blueprint
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}