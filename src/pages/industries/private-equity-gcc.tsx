"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Zap,
  TrendingDown,
  Rocket,
  Building2,
  Layers,
  Code2,
  Cloud,
  Database,
  Brain,
  TestTube2,
  GitMerge,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import AiDeliveryTeamsCTA from "@/components/ai-delivery-teams/AiDeliveryTeamsCTA";
import StatementSection from "@/components/shared/StatementSection";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import FiveCardHeroGrid from "@/components/shared/FiveCardHeroGrid";
import PillFeatureCardGrid from "@/components/shared/PillFeatureCardGrid";
import IndustriesSubnav from "@/components/industries/IndustriesSubnav";
import Consultation from "@/features/home/components/Consultation";
import { CAL_BOOKING_URL } from "@/lib/constants";

const valueCards = [
  {
    icon: Rocket,
    title: "Post-Acquisition Value Creation",
    desc: "Build technology capabilities fast to accelerate the value creation plan and unlock growth levers across newly acquired portfolio companies.",
  },
  {
    icon: TrendingDown,
    title: "Margin Improvement",
    desc: "Cost-efficient engineering directly improves EBITDA and portfolio returns, creating measurable impact within the first year of operation.",
  },
  {
    icon: Zap,
    title: "Accelerate Digital Transformation",
    desc: "Modernize portfolio companies with dedicated engineering teams that own migration, platform build, and product development end-to-end.",
  },
  {
    icon: Brain,
    title: "Build AI Capabilities Fast",
    desc: "Deploy AI/ML capabilities across portfolio companies for competitive advantage, from predictive analytics to generative AI applications.",
  },
];

const playbookPoints = [
  {
    n: "01",
    title: "Speed",
    subtitle: "100-Day Plan Alignment",
    body: "12-week GCC launch aligns with 100-day plans, so portfolio companies start delivering value within the first investment cycle.",
    keywords: "12-week launch, 100-day value creation",
  },
  {
    n: "02",
    title: "Standardized Playbook",
    subtitle: "Repeatable Portfolio Model",
    body: "Repeatable model across portfolio companies. One proven framework, deployed many times, with consistent outcomes.",
    keywords: "repeatable framework, multi-asset playbook",
  },
  {
    n: "03",
    title: "Cost Reduction",
    subtitle: "Direct Margin Expansion",
    body: "Engineering cost savings directly improve EBITDA. Track impact against the value creation plan from day one.",
    keywords: "EBITDA improvement, 60-70% cost reduction",
  },
  {
    n: "04",
    title: "Talent Arbitrage",
    subtitle: "Specialist Engineering Density",
    body: "Access world-class engineering, data, and AI talent at 60-70% lower cost than US/UK equivalents.",
    keywords: "specialist AI talent, engineering density",
  },
  {
    n: "05",
    title: "Scalability",
    subtitle: "Flexible Portfolio Evolution",
    body: "Scale up or down as portfolio company needs evolve. Flexible team sizing aligned to business milestones.",
    keywords: "flexible team sizing, exit agility",
  },
];

const engagementModels = [
  {
    tag: "Most Popular",
    title: "GCC-in-a-Box",
    desc: "Standardized playbook deployable across multiple portfolio companies. 12-week launch, proven processes, and a repeatable framework that reduces execution risk.",
    points: [
      "12-week launch timeline",
      "Pre-built operating model",
      "Proven hiring playbook",
      "Standardized governance",
    ],
  },
  {
    tag: "Cost-Efficient",
    title: "Shared Services GCC",
    desc: "Centralized capability center serving multiple smaller portfolio companies. Shared infrastructure and operational overhead, with individual team management.",
    points: [
      "Shared infrastructure costs",
      "Individual team governance",
      "Cross-portfolio synergies",
      "Lower per-company overhead",
    ],
  },
  {
    tag: "Enterprise-Grade",
    title: "Dedicated Portfolio Company GCC",
    desc: "Full GCC for larger portfolio companies with substantial engineering needs. Complete autonomy, dedicated leadership, and custom operating model.",
    points: [
      "Dedicated leadership team",
      "Custom operating model",
      "Full IP ownership",
      "Independent scale path",
    ],
  },
];

const roles = [
  { icon: Cloud, label: "Legacy to Cloud Migration" },
  { icon: Database, label: "Data Warehouse to Data Lake" },
  { icon: GitMerge, label: "Monolith to Microservices" },
  { icon: Code2, label: "Full-Stack Engineering" },
  { icon: Layers, label: "DevOps / Cloud Infrastructure" },
  { icon: Brain, label: "AI / ML Engineering" },
  { icon: Building2, label: "Data Engineering" },
  { icon: TestTube2, label: "QA Automation" },
];

const faqs = [
  {
    q: "How quickly can a GCC be launched for a portfolio company?",
    a: "With our GCC-in-a-Box model, we can go from kickoff to operational team in 12 weeks. This includes entity setup, workspace, hiring, onboarding, and governance structure. The timeline aligns with typical PE 100-day plans.",
  },
  {
    q: "Can one GCC serve multiple portfolio companies?",
    a: "Yes. Our Shared Services GCC model is designed for exactly this. Shared infrastructure and operational costs with individual team management for each portfolio company, maximizing cost efficiency across smaller holdings.",
  },
  {
    q: "How do you measure EBITDA impact?",
    a: "We track engineering cost savings, productivity gains, and operational efficiency improvements against the value creation plan. Typical metrics include cost per engineer vs. onshore equivalents, velocity improvements, and total annual savings.",
  },
  {
    q: "What happens at exit? Is the GCC an asset or a liability?",
    a: "A well-structured GCC is a value-add at exit. It demonstrates operational maturity, cost discipline, and scalable capability. We design GCCs with clean governance and documentation that supports due diligence and transition.",
  },
  {
    q: "Do you work with operating partners or directly with portfolio company leadership?",
    a: "Both. We can engage at the fund level with operating partners to design a portfolio-wide strategy, or work directly with portfolio company CTO/CIOs on individual GCC buildouts.",
  },
  {
    q: "How does this differ from traditional outsourcing or staff augmentation?",
    a: "Unlike outsourcing, a GCC gives the portfolio company direct ownership of the team, IP, and processes. There is no vendor margin, no contract renegotiation risk, and full alignment with the value creation thesis.",
  },
  {
    q: "What size portfolio company is a GCC suitable for?",
    a: "Dedicated GCCs work well for companies needing 25+ engineers. For smaller needs, our Shared Services model allows companies with as few as 8-10 engineers to benefit from the GCC model with shared overhead.",
  },
  {
    q: "Can you help modernize legacy tech stacks as part of the GCC buildout?",
    a: "Yes. Many PE-backed companies need legacy modernization. We build GCC teams specifically skilled in cloud migration, monolith-to-microservices, data platform modernization, and DevOps transformation.",
  },
];

export default function PrivateEquityGCC() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "PE Portfolio GCC India | Private Equity GCC Solutions — NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <section
          id="pe-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="Private Equity GCC Executive Hero"
        >
          {/* Executive Environment Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="Private Equity Command Center"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
            />
            {/* Soft responsive overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Top spacer for fixed navbar */}
          <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
                <li className="flex items-center gap-1.5">
                  <Link to="/" className="hover:text-[#00A3E0] transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <Link to="/industries" className="hover:text-[#00A3E0] transition-colors">
                    Industries
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-current="page" className="font-semibold text-[#0D306C]">
                    Private Equity GCC
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
         

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left">
                  GCC Solutions for Private Equity Portfolio Companies
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left">
                  Private equity firms: accelerate portfolio company growth with India GCCs. Rapid engineering team build-outs, value creation through cost optimization, and AI-powered digital transformation.
                </p>

                {/* Primary CTA */}
                <div className="flex flex-wrap items-center gap-3 text-left">
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold font-manrope tracking-tight px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span>Talk to Our PE Team</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IndustriesSubnav />

        <div id="industries-content" className="scroll-mt-32">
        {/* ── 2. SHORT ANSWER (Blueprint Strategic Foundation statement design) ── */}
        <StatementSection eyebrow="SHORT ANSWER">
          Private equity value creation meets India's engineering talent. Build GCCs that directly improve EBITDA across your portfolio.
        </StatementSection>

        {/* ── 3. STRATEGIC RATIONALE (SlottedStepNumber Component Design) ── */}
        <section id="why-pe" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="STRATEGIC RATIONALE"
              title="Why Private Equity Firms Are Adopting the GCC Model"
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-14"
            />

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center max-w-6xl mx-auto">
              {valueCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.title}
                    className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                  >
                    <div className="flex flex-col items-center w-full">
                      {/* Slotted Step Number Component */}
                      <SlottedStepNumber index={index} />

                      <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
                        {card.title}
                      </h3>

                      <p className="text-[#505D74] text-xs sm:text-[13px] leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                        {card.desc}
                      </p>
                    </div>

                    <div className="mt-auto text-[#0D306C] group-hover:text-[#008EC4] group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. TALENT & PLAYBOOK ARCHITECTURE (FiveCardHeroGrid Component Design) ── */}
        <section
          id="playbook"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
        >
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TALENT & PLAYBOOK ARCHITECTURE"
              title="Built for the PE Playbook"
              description="A standardized, repeatable capability model designed to align with private equity investment horizons and 100-day value creation plans."
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <FiveCardHeroGrid items={playbookPoints} />
          </div>
        </section>

        {/* ── 5. ENGAGEMENT MODELS FOR PE ──────────────────────────────── */}
        <Section id="models" width="wide">
          <SectionHeader
            title="Engagement Models for PE"
            description="Choose the model that fits your portfolio strategy. Each can be deployed independently or combined across holdings."
            eyebrow="Portfolio Architecture"
            align="center"
          />
          <div className="max-w-6xl mx-auto">
            <PillFeatureCardGrid
              columns={3}
              items={engagementModels.map((model) => ({
                title: model.title,
                verb: model.tag,
                body: model.desc,
                items: model.points,
              }))}
            />
          </div>
        </Section>

        {/* ── 6. SPECIALIZATION (CapabilitiesSection design) ───────────── */}
        <CapabilitiesSection
          id="roles"
          eyebrow="Specialization"
          title="Roles We Build For"
          lead="From legacy modernization to cutting-edge AI, we recruit and build teams across the full engineering spectrum."
          columns={4}
          items={roles.map((role) => ({
            title: role.label,
            icon: role.icon,
          }))}
        />

        {/* ── 7. CASE STUDY (NAVY SECTION WITH WAVE DIVIDERS) ─────────── */}
        <Section
          id="case-study"
          title="EBITDA Impact: A PE Success Story"
          lead="A mid-market PE firm used our GCC-in-a-Box model to build an engineering center for a portfolio company undergoing digital transformation."
          eyebrow="Case Study"
          theme="navy"
          width="wide"
          waveFill="#F0F5FA"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* 3 Metrics */}
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-10 pt-4">
              <div className="p-6 rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] text-center">
                <p className="text-3xl sm:text-4xl font-extrabold font-manrope text-white mb-1 tracking-tight">
                  $2.4M
                </p>
                <p className="text-sm text-slate-300 font-sans">Annual savings</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] text-center">
                <p className="text-3xl sm:text-4xl font-extrabold font-manrope text-white mb-1 tracking-tight">
                  35 engineers
                </p>
                <p className="text-sm text-slate-300 font-sans">Hired in 16 weeks</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#06224A]/80 border border-[#1E3A8A] text-center">
                <p className="text-3xl sm:text-4xl font-extrabold font-manrope text-white mb-1 tracking-tight">
                  18%
                </p>
                <p className="text-sm text-slate-300 font-sans">EBITDA improvement</p>
              </div>
            </div>

            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold font-manrope bg-[#06224A] hover:bg-[#0A2E63] text-white border border-[#1E3A8A] transition-colors"
            >
              <span>View Full Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>

        {/* ── 8. FREQUENTLY ASKED QUESTIONS ───────────────────────────── */}
        <Section id="faqs" width="regular">
          <SectionHeader title="Frequently asked questions" eyebrow="Clarifications" align="center" />
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-2xl bg-white/90 border border-[#CBD5E1]/60 p-6 shadow-2xs transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left cursor-pointer gap-4"
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-base sm:text-[17px] font-bold font-manrope text-[#0D306C]">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-[#7B8B9E] shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === idx ? "auto" : 0,
                    opacity: openFaq === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-[#CBD5E1]/40 mt-4">
                    <p className="text-sm sm:text-base text-[#505D74] leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 9. CALL TO ACTION (BFSI Redesign Style) ─────────────────── */}
        <AiDeliveryTeamsCTA
          serviceInterest="• TAKE THE NEXT STEP"
          title="Ready to Build Your Private Equity GCC?"
          description="Speak with our team about your portfolio strategy, EBITDA expansion goals, and how cross-portfolio GCCs can accelerate value creation."
          primaryCta={{
            label: "Book a consultation",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Explore all industries",
            href: "/industries",
          }}
        />

        {/* ── 10. LET'S BUILD TOGETHER (Home Consultation with Wave Divider) ── */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
