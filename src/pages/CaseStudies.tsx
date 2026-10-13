"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Compass,
  Rocket,
  Activity,
  TrendingUp,
  Clock,
  ShieldCheck,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import AdvisoryProcessFlow from "@/components/ai-gcc/AdvisoryProcessFlow";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Consultation from "@/features/home/components/Consultation";
import ContextAdvisoryCallout from "@/components/shared/ContextAdvisoryCallout";
import IndustryImageCard from "@/components/shared/IndustryImageCard";

const phases = [
  {
    icon: Compass,
    num: "01",
    title: "Design",
    desc: "Mandate, business case, operating model, location logic, governance, talent strategy, and technology baseline are locked before execution begins. Decision rights and success metrics are agreed at the top, not discovered later.",
  },
  {
    icon: Rocket,
    num: "02",
    title: "Launch",
    desc: "Entity, workspace, leadership spine, first delivery teams, security baseline, and compliance posture come online in parallel — not sequentially — so the center is operational on a disciplined timeline.",
  },
  {
    icon: Activity,
    num: "03",
    title: "Stabilise",
    desc: "Operating rhythm, KPIs, governance forums, escalation paths, and the talent engine are tuned through the first full delivery cycle. The center starts producing measurable output against the metrics set in Design.",
  },
  {
    icon: TrendingUp,
    num: "04",
    title: "Scale",
    desc: "Mandate expands, capability deepens, AI and automation get embedded, and governance matures into board-ready reporting. Growth is staged behind readiness gates, not calendar milestones.",
  },
];

const engagements = [
  {
    id: "01",
    title: "GCC setup and launch",
    desc: "End-to-end design and stand-up of a new captive center — strategy, entity, location, talent, technology, and governance delivered as one connected program.",
    image: "/images/services/gcc/gcc-setup.webp",
    ctaText: "Explore Setup & Launch",
    href: "/services/gcc/setup-launch",
  },
  {
    id: "02",
    title: "AI-first GCC design",
    desc: "Architecting the data, MLOps, model governance, and responsible-AI layer that lets a center deliver AI outcomes, not just hire AI engineers.",
    image: "/images/home/mosaic_ai_gcc.webp",
    ctaText: "Explore AI GCC Design",
    href: "/services/ai-gcc",
  },
  {
    id: "03",
    title: "Talent and leadership build",
    desc: "Hiring the leadership spine and specialist pods that define what the center actually delivers, with onboarding and retention designed in.",
    image: "/images/services/gcc/gcc-talent.webp",
    ctaText: "Explore Talent Build",
    href: "/services/ai-talent",
  },
  {
    id: "04",
    title: "Operations transformation",
    desc: "Repositioning an existing center from cost-arbitrage support into a higher-value strategic platform with new mandates, new capability, and a new operating rhythm.",
    image: "/images/services/gcc/gcc_modernization.webp",
    ctaText: "Explore Transformation",
    href: "/services/gcc/modernization-transformation",
  },
  {
    id: "05",
    title: "Governance and compliance",
    desc: "Designing the decision-rights, risk, control, and reporting model so the center is audit-ready every day and the board sees a clean view at every review.",
    image: "/images/services/ai-gcc/ai-governance.webp",
    ctaText: "Explore Governance",
    href: "/services/gcc-operations/governance-compliance",
  },
  {
    id: "06",
    title: "Technology and platform foundations",
    desc: "Cloud, identity, security, data, and developer-platform baseline that lets the center scale without re-architecting every 18 months.",
    image: "/images/services/gcc/gcc-technology.webp",
    ctaText: "Explore Technology Platforms",
    href: "/services/gcc-operations/workplace-it-security",
  },
];

const measures = [
  {
    metric: "Time to capability",
    desc: "Days from kickoff to first operational team, first delivery, and first board-ready output — tracked against the plan agreed in Design.",
    icon: Clock,
  },
  {
    metric: "Quality of build",
    desc: "Leadership hire quality, pod composition, attrition versus benchmark, and the depth of capability built versus rented.",
    icon: ShieldCheck,
  },
  {
    metric: "Operating maturity",
    desc: "How quickly the center moves through readiness gates: governance, delivery cadence, compliance posture, and mandate expansion.",
    icon: Activity,
  },
  {
    metric: "Outcome ownership",
    desc: "Share of work the center actually owns end-to-end versus work it merely executes — the strongest leading indicator of long-term value.",
    icon: Target,
  },
];

const faqs = [
  {
    q: "Why don't you publish named case studies?",
    a: "Our engagements involve sensitive design, talent, and compliance work for global enterprises. We don't publish client names or branded outcomes without explicit permission, and we don't manufacture proof. We share relevant examples privately during evaluation conversations.",
  },
  {
    q: "Can I see relevant work for my sector?",
    a: "Yes. During an exploratory conversation we walk through the patterns, decisions, and trade-offs from comparable engagements in your sector so you can judge the fit firsthand.",
  },
  {
    q: "Do you guarantee specific outcomes?",
    a: "We agree clear success metrics in the Design phase — time to launch, team quality, operating cost, capability maturity — and we structure the engagement so progress against them is visible every month.",
  },
  {
    q: "How is this different from a typical consulting engagement?",
    a: "We don't hand over a deck and leave. The team that designs the operating model is the team that launches it, hires into it, and stabilises it — so accountability stays in one place.",
  },
];

export default function CaseStudies() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Our Approach | How We Design, Launch & Scale GCCs - NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar appearance="dark" />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION (GccCostCalculator Style - No buttons, Heading & Description) */}
        {/* ============================================================ */}
        <section
          id="approach-hero"
          className="relative w-full overflow-hidden bg-[#012048] select-none pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
          aria-label="Our Approach Hero"
        >
          {/* Executive Background Overlay with 3D Cyan Fluid Ribbon */}
          <div className="absolute inset-0 w-full h-full z-0">
            {/* Mobile artwork */}
            <div className="md:hidden absolute inset-0">
              <Image
                src="/images/hero/hero-half-viewport-mobile.webp"
                alt="Mobile hero artwork"
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-bottom"
              />
            </div>
            {/* Desktop artwork */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/images/hero/hero-half-viewport.webp"
              alt="How We Design, Launch & Scale GCCs"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-right"
            />
            </div>
            {/* Soft responsive gradient overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#012048]/95 via-[#012048]/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/"
                    className="text-[#38BDF8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-200">
                    Our Approach
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold font-manrope text-white tracking-[-0.035em] leading-[1.08] mb-4 sm:mb-5 max-w-2xl lg:max-w-3xl text-left"
            >
              How we design, launch, and scale a GCC.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-normal font-sans max-w-2xl text-left"
            >
              A disciplined, four-phase delivery framework built on three decades of operating GCCs — not a deck and a handover. We share named work privately during evaluation conversations.
            </motion.p>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. 4-PHASE DELIVERY FRAMEWORK (AdvisoryProcessFlow Design, bg-transparent) */}
        {/* ============================================================ */}
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="THE FRAMEWORK"
              title="Design — Launch — Stabilise — Scale"
              description="Every phase moves through disciplined readiness gates before transitioning to the next milestone."
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-14"
            />

            <AdvisoryProcessFlow
              steps={phases.map((p) => ({
                label: p.title,
                detail: p.desc,
                icon: p.icon,
              }))}
              detailClassName="text-xs xl:text-[13px] text-[#505D74] leading-relaxed max-w-[245px] mx-auto font-normal"
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. ENGAGEMENT TYPES WE RUN (WHAT WE DELIVER - Home Industries Card Design without buttons) */}
        {/* ============================================================ */}
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
          <AmbientGlow position="center" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="WHAT WE DELIVER"
              title="Engagement types we run"
              description="Whether establishing a brand-new center or modernizing an existing captive, our programs are structured for speed and compliance."
              variant="cyan"
              align="center"
              className="mb-8 sm:mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {engagements.map((e) => (
                <IndustryImageCard
                  key={e.title}
                  title={e.title}
                  description={e.desc}
                  image={e.image}
                  imageAlt={e.title}
                  align="center"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. HOW WE MEASURE SUCCESS (ACCOUNTABILITY & METRICS - SlottedStepNumber Design) */}
        {/* ============================================================ */}
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="ACCOUNTABILITY & METRICS"
              title="Success metrics, agreed up front."
              description="We tie our milestone deliverables to verifiable metrics rather than subjective activity logs."
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-14"
            />

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center max-w-6xl mx-auto">
              {measures.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.metric}
                    className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                  >
                    <div className="flex flex-col items-center w-full">
                      {/* Slotted Step Number Design matching reference */}
                      <SlottedStepNumber index={index} />

                      <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
                        {step.metric}
                      </h3>

                      <p className="text-[#505D74] text-xs sm:text-[13px] leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                      <StepIcon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. CONTEXT ADVISORY CALLOUT */}
        {/* ============================================================ */}
        <ContextAdvisoryCallout />

        {/* ============================================================ */}
        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        {/* ============================================================ */}
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="APPROACH FAQS"
              title="Frequently asked questions"
              description="Clear answers to the key operational, legal, and strategic questions enterprise leaders ask."
              variant="cyan"
              align="center"
              className="!mb-6 sm:!mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 sm:space-y-4"
            >
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#E2EDF5] bg-white transition-all overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base md:text-lg font-extrabold text-[#2B3D66] pr-3 sm:pr-4 font-manrope">
                        {faq.q}
                      </span>
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#E2EDF5] transition-transform duration-200 ${
                          isOpen ? "bg-[#169DC8] text-white rotate-180" : "bg-slate-50 text-[#536485]"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm md:text-[15px] text-[#536485] leading-relaxed border-t border-[#E2EDF5] pt-3 sm:pt-4 font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. LET'S BUILD TOGETHER (Home Consultation Section with Top Wave Divider) */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}