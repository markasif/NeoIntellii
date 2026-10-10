"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  DollarSign,
  Shield,
  Lock,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Server,
  Terminal,
  LineChart,
  Award,
  Cpu,
  Database,
  UserCheck,
  Sparkles,
  Zap,
  Bot,
  Calculator,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatementSection from "@/components/shared/StatementSection";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import AnswerBlock from "@/components/ai-gcc/AnswerBlock";
import IndustryCTA from "@/components/shared/IndustryCTA";
import ConnectedEcosystem from "@/components/shared/ConnectedEcosystem";
import Consultation from "@/features/home/components/Consultation";
import IndustryChallengesGrid from "@/components/shared/IndustryChallengesGrid";
import IndustriesSubnav from "@/components/industries/IndustriesSubnav";

// ── Strategic Rationale Cards ──────────────────────────────────────────
const whyBlocks = [
  {
    icon: ShieldCheck,
    title: "AI in Risk & Compliance",
    desc: "Regulatory burden is growing globally. Indian AI engineers build automated compliance monitoring, AML/KYC systems, and real-time risk models at a fraction of US cost.",
  },
  {
    icon: TrendingUp,
    title: "Fintech Engineering at Scale",
    desc: "India produces more fintech engineers than any other country. Digital payments (UPI), neobanking, and lending tech have created a world-class talent pool.",
  },
  {
    icon: BarChart3,
    title: "Data Science for Financial Modeling",
    desc: "Quantitative analysts, data scientists, and ML engineers for portfolio optimization, credit scoring, fraud detection, and trading algorithms.",
  },
  {
    icon: DollarSign,
    title: "Cost Efficiency Without Compliance Risk",
    desc: "50-60% savings with NeoIntelli's compliance-first GCC model. We handle Indian labor law, tax, and regulatory requirements so your team focuses on building.",
  },
];

// ── Talent Architecture (OperatingRealityCard Template) ─────────────────
const talentRoles = [
  {
    number: "01",
    title: "Quantitative Analysts & Financial Engineers",
    desc: "Portfolio risk models, algorithmic pricing systems, derivative valuation engines, and backtesting pipelines.",
    image: "/images/ai-data-workloads.jpg",
    icon: LineChart,
  },
  {
    number: "02",
    title: "Risk & Regulatory Compliance Engineers",
    desc: "Automated compliance monitoring, regulatory reporting pipelines (Basel, Dodd-Frank, SOX), and audit log architecture.",
    image: "/images/ai-governance.jpg",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Fraud Detection & AML Specialists",
    desc: "Real-time transaction scoring, graph analytics for anti-money laundering, anomaly detection, and alert triage models.",
    image: "/images/tech-process-automation.png",
    icon: AlertTriangle,
  },
  {
    number: "04",
    title: "Credit Scoring & Pricing Data Scientists",
    desc: "Alternative data scoring, customer churn forecasting, risk-adjusted pricing algorithms, and lifetime value modeling.",
    image: "/images/tech-data-platform.png",
    icon: Database,
  },
  {
    number: "05",
    title: "Banking Platform & Payment Engineers",
    desc: "Core banking integration, real-time payment rails (ISO 20022, UPI, SEPA), and microservices transaction backends.",
    image: "/images/tech-product-engineering.png",
    icon: Terminal,
  },
  {
    number: "06",
    title: "Regulatory Cloud & Infrastructure Engineers",
    desc: "Data residency zoning, cross-border privacy boundaries, enterprise VPC segmentation, and zero-trust access controls.",
    image: "/images/tech-integration.png",
    icon: Server,
  },
  {
    number: "07",
    title: "QA & Security Clearance Specialists",
    desc: "Penetration testing, automated regression suites, PCI-DSS code validation, and continuous security vulnerability scans.",
    image: "/images/gcc-operations/operating-reality/04-access.jpg",
    icon: Lock,
  },
  {
    number: "08",
    title: "Applied AI / Document Intelligence Engineers",
    desc: "NLP for contract intelligence, LLM retrieval over regulatory filings, computer vision for KYC document triage, and AI agents.",
    image: "/images/ai-mlops.jpg",
    icon: Cpu,
  },
];

// ── BFSI-Specific Challenges NeoIntelli Addresses ─────────────────────────
const bfsiChallenges = [
  "Data residency and sovereignty requirements",
  "Regulatory compliance (RBI, SEBI, IRDAI for India operations; support for US/EU regulatory awareness)",
  "Security clearance and background verification processes",
  "PCI-DSS, SOC 2, ISO 27001 compliance readiness",
  "Vendor risk management frameworks",
];

// ── FAQs ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Can NeoIntelli help with regulatory compliance for financial services GCCs?",
    a: "Yes. We build GCCs with compliance-first design, covering Indian regulatory requirements (RBI, SEBI, IRDAI) and supporting awareness for US/EU regulations like SOX, GDPR, Dodd-Frank, and PCI-DSS.",
  },
  {
    q: "How do you handle data residency requirements for BFSI?",
    a: "We work with enterprise cloud providers and secure data center partners to ensure data residency, sovereignty, and cross-border data transfer requirements are architected into the infrastructure from day one.",
  },
  {
    q: "What's the typical team size for a BFSI GCC?",
    a: "Most BFSI GCCs start with 10 to 25 specialists focused on a high-leverage function (such as risk analytics, fraud detection, or algorithmic engineering) and scale to 50 to 200+ as core capabilities transition in-house.",
  },
  {
    q: "How long does it take to launch a BFSI GCC?",
    a: "With NeoIntelli's managed approach, a BFSI GCC can be fully operational in 8 to 12 weeks, including compliance structuring, security-cleared hiring, and secure infrastructure readiness.",
  },
];

// ── Connected Ecosystem (Matching Uploaded Image: 4 Cards) ───────────────
const connectedCards = [
  {
    path: "/services/gcc/setup-launch",
    name: "Setup & Launch",
    summary: "Entity, leadership, talent, workplace, IT and governance workstreams run in parallel to launch your center in weeks.",
    anchor: "Read about Setup & Launch",
    icon: Zap,
  },
  {
    path: "/services/ai-gcc",
    name: "AI GCC",
    summary: "Build and operate your AI GCC in India: strategy, hiring, HR, workspace, GPU infrastructure, and AI engineering pods.",
    anchor: "Read about AI GCC",
    icon: Bot,
  },
  {
    path: "/gcc-vs-outsourcing",
    name: "GCC vs Outsourcing",
    summary: "How a captive GCC compares to traditional outsourcing on cost, IP control, retention, and enterprise value.",
    anchor: "Read about GCC vs Outsourcing",
    icon: ShieldCheck,
  },
  {
    path: "/gcc-cost-calculator",
    name: "GCC Cost Calculator",
    summary: "Estimate the cost of building and operating a GCC in India across roles, seniority levels, and tech hubs.",
    anchor: "Read about GCC Cost Calculator",
    icon: Calculator,
  },
];

export default function BfsiGcc() {
  useEffect(() => {
    document.title = "BFSI GCC India | Banking & Financial Services — NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <section
          id="bfsi-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="BFSI GCC Executive Hero"
        >
          {/* Executive Environment Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="BFSI GCC Strategic Engineering Center in India"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
            />
            {/* Soft responsive overlay for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
          </div>

          {/* Top spacer for navbar */}
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
                    BFSI GCC
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
      

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left">
                  Build Your BFSI Global Capability Center in India
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left">
                  Banks, fintechs, insurance companies, and asset managers are building AI-powered GCCs in India for risk analytics, fraud detection, regulatory technology, and digital transformation. NeoIntelli makes it happen in 12 weeks.
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap items-center gap-3 text-left">
                  <Link
                    to="/contact"
                    className="btn-navy shrink-0"
                  >
                    <span>Plan Your BFSI GCC</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IndustriesSubnav />

        <div id="industries-content" className="scroll-mt-32">
        {/* ── 2. SHORT ANSWER (Blueprint Strategic Foundation statement design) ── */}
        <StatementSection eyebrow="SHORT ANSWER">
          A BFSI GCC in India is a captive, wholly owned capability centre that global banks, insurers, asset managers, and fintechs set up to run risk analytics, fraud detection, regulatory tech, and digital engineering. NeoIntelli helps financial institutions outside India design, launch, and scale their BFSI GCC in 8 to 12 weeks with compliance-first design and 50 to 60 percent cost savings versus onshore teams.
        </StatementSection>

        {/* ── 3. STRATEGIC RATIONALE (SlottedStepNumber Component Design) ── */}
        <section id="strategic-rationale" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="STRATEGIC RATIONALE"
              title="Why Financial Services Companies Are Moving to India"
              description="India provides the ideal convergence of institutional financial engineering talent, advanced AI capabilities, and substantial operational economics."
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-14"
            />

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center max-w-6xl mx-auto">
              {whyBlocks.map((block, index) => {
                const IconComponent = block.icon;
                return (
                  <div
                    key={block.title}
                    className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                  >
                    <div className="flex flex-col items-center w-full">
                      {/* Slotted Step Number Component */}
                      <SlottedStepNumber index={index} />

                      <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
                        {block.title}
                      </h3>

                      <p className="text-[#505D74] text-xs sm:text-[13px] leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                        {block.desc}
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

        {/* ── 4. TALENT ARCHITECTURE (OperatingRealityCard Template from AI Delivery Pod) ── */}
        <section id="talent-architecture" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="TALENT ARCHITECTURE"
              title="BFSI Talent We Place in Your GCC"
              description="Specialized quantitative, engineering, risk, and compliance capability teams embedded inside your captive entity."
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
              {talentRoles.map((role) => (
                <OperatingRealityCard
                  key={role.number}
                  item={{
                    number: role.number,
                    title: role.title,
                    desc: role.desc,
                    image: role.image,
                    icon: role.icon,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. BFSI-SPECIFIC CHALLENGES NEOINTELLI ADDRESSES (Navy Blue with Wave Divider) ── */}
        <Section
          id="bfsi-challenges"
          theme="navy"
          width="wide"
          waveFill="#F0F5FA"
          wavesOnMobile
        >
          <SectionHeader
            title="BFSI-Specific Challenges NeoIntelli Addresses"
            variant="white"
            align="center"
            className="mb-10 sm:mb-14"
          />

          <IndustryChallengesGrid items={bfsiChallenges} />
        </Section>

        {/* ── 6. FREQUENTLY ASKED QUESTIONS (Standard AnswerBlock Redesign) ── */}
        <section id="faqs" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="CLARIFICATIONS"
              title="Frequently Asked Questions"
              description="Key questions leadership teams ask when establishing a captive BFSI center in India."
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-12"
            />
            <AnswerBlock
              items={faqs.map((f) => ({
                question: f.q,
                answer: f.a,
              }))}
              level={3}
            />
          </div>
        </section>

        {/* ── 7. INDUSTRY CTA BANNER (ExecutiveCTA with mobile labels) ── */}
        <IndustryCTA
          eyebrow="• TAKE THE NEXT STEP"
          title="Discuss Your BFSI GCC"
          description="Speak with our team about building a financial services capability center in India."
          primaryCta={{
            label: "Plan Your BFSI GCC",
            mobileLabel: "Plan BFSI GCC",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Explore Cost Calculator",
            mobileLabel: "Cost calculator",
            href: "/gcc-cost-calculator",
          }}
        />

        {/* ── 8. CONNECTED ECOSYSTEM & LET'S BUILD TOGETHER ────────────── */}
        <ConnectedEcosystem cards={connectedCards} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
