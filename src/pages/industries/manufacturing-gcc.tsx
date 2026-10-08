"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Factory,
  Cpu,
  BarChart3,
  Settings,
  Cog,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import AiDeliveryTeamsCTA from "@/components/ai-delivery-teams/AiDeliveryTeamsCTA";
import Consultation from "@/features/home/components/Consultation";
import StatementSection from "@/components/shared/StatementSection";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import IndustryChallengesGrid from "@/components/shared/IndustryChallengesGrid";
import IndustriesSubnav from "@/components/industries/IndustriesSubnav";
import { CAL_BOOKING_URL } from "@/lib/constants";

const roleImages = [
  "/images/ai-data-workloads.jpg",
  "/images/ai-governance.jpg",
  "/images/tech-process-automation.png",
  "/images/tech-data-platform.png",
  "/images/tech-product-engineering.png",
  "/images/tech-integration.png",
  "/images/gcc-operations/operating-reality/04-access.jpg",
  "/images/ai-mlops.jpg",
];

const roleIcons = [
  Factory,
  Cpu,
  BarChart3,
  Settings,
  Cog,
  Shield,
  Settings,
  Factory,
];

const whyCards = [
  {
    icon: Factory,
    title: "Industry 4.0 Digital Transformation",
    desc: "Build the engineering teams that connect OT and IT - integrating sensors, edge computing, and cloud analytics across your plants.",
  },
  {
    icon: Cpu,
    title: "Predictive Maintenance AI",
    desc: "Develop ML models that forecast equipment failures before they happen, reducing unplanned downtime and maintenance costs.",
  },
  {
    icon: BarChart3,
    title: "Supply Chain Optimization",
    desc: "Apply AI and operations research to demand forecasting, inventory management, logistics routing, and supplier risk analysis.",
  },
  {
    icon: Settings,
    title: "Digital Twin Development",
    desc: "Create virtual replicas of physical assets, production lines, and entire facilities for simulation, monitoring, and optimization.",
  },
  {
    icon: Cog,
    title: "Quality Inspection Automation",
    desc: "Deploy computer vision and deep learning for automated visual inspection, defect detection, and real-time quality control.",
  },
  {
    icon: Shield,
    title: "Smart Factory Engineering",
    desc: "Design and build the software layer for connected factories - SCADA integration, MES platforms, real-time dashboards, and edge analytics.",
  },
];

const roles = [
  "IoT Engineers",
  "Embedded Systems Engineers",
  "Computer Vision Engineers",
  "Supply Chain Data Scientists",
  "ERP Integration Engineers",
  "Digital Twin Developers",
  "Industrial Automation Engineers",
  "PLM/CAD Engineers",
];

const compliancePoints = [
  {
    title: "ITAR Awareness",
    desc: "For defense-adjacent manufacturing, teams are structured with ITAR-aware processes, access controls, and data handling protocols.",
  },
  {
    title: "Quality Management Systems",
    desc: "GCC teams are embedded into your QMS workflows - from CAPA processes to audit trails and continuous improvement cycles.",
  },
  {
    title: "ISO Standards Compliance",
    desc: "Built-in alignment with ISO 9001, ISO 27001, and industry-specific standards like AS9100 for aerospace or IATF 16949 for automotive.",
  },
  {
    title: "Manufacturing IP Security",
    desc: "Data security architecture designed to protect proprietary designs, process parameters, trade secrets, and competitive manufacturing IP.",
  },
];

const faqs = [
  {
    q: "What types of manufacturers benefit most from a GCC in India?",
    a: "Industrial equipment, automotive, aerospace, consumer electronics, and process manufacturing companies with complex engineering, supply chain, or digital transformation needs see the strongest ROI from India GCCs.",
  },
  {
    q: "Can a manufacturing GCC handle safety-critical software?",
    a: "Yes. We help you build teams experienced with safety-critical standards like IEC 61508, ISO 26262, and DO-178C. The GCC can develop, test, and validate software for safety-critical systems with appropriate governance.",
  },
  {
    q: "How do you handle the OT/IT convergence challenge?",
    a: "We recruit engineers with both operational technology and IT backgrounds, and structure teams around the integration layer - edge computing, protocol translation, data pipelines from shop floor to cloud.",
  },
  {
    q: "What about timezone overlap with factory operations?",
    a: "India's timezone provides significant overlap with European and Middle Eastern operations, and teams can be structured for extended-hour coverage to support North American plants as well.",
  },
  {
    q: "How quickly can a manufacturing GCC be operational?",
    a: "A focused GCC can be operational within 12 weeks - from entity setup and workspace to initial team deployment. Full-scale operations with 25+ engineers typically take 4-6 months.",
  },
  {
    q: "Can the GCC support legacy systems like older ERP and MES platforms?",
    a: "Absolutely. India has deep talent pools experienced with SAP, Oracle, Siemens, Rockwell, and legacy MES/SCADA systems. Your GCC can modernize these systems while maintaining continuity.",
  },
  {
    q: "How do you protect proprietary manufacturing processes and designs?",
    a: "We implement layered security - network segmentation, access controls, encrypted data at rest and in transit, NDA frameworks, and clean-desk policies - tailored to manufacturing IP sensitivity.",
  },
  {
    q: "Do you support GCCs for defense-adjacent manufacturers?",
    a: "Yes. We understand the compliance landscape for defense-adjacent manufacturing, including ITAR awareness, CUI handling, and NIST 800-171 alignment where required.",
  },
];

export default function ManufacturingGCC() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Manufacturing GCC India | Industrial & IoT Engineering — NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <section
          id="manufacturing-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="Manufacturing GCC Executive Hero"
        >
          {/* Executive Environment Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="Manufacturing Command Center"
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
                    Manufacturing GCC
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left">
                  Build Your Manufacturing & Industrial GCC in India
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left">
                  Build a Manufacturing GCC in India for Industry 4.0, predictive maintenance, supply chain AI, digital twins, and smart factory technology.
                </p>

                {/* Primary CTA */}
                <div className="flex flex-wrap items-center gap-3 text-left">
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold font-manrope tracking-tight px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span>Book a consultation</span>
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
          Manufacturing is being redefined by data, automation, and AI. A GCC in India gives you the engineering depth to lead Industry 4.0 - not follow it.
        </StatementSection>

        {/* ── 3. CAPABILITIES (CapabilitiesSection design) ── */}
        <CapabilitiesSection
          id="capabilities"
          eyebrow="CAPABILITIES"
          title="Why Leading Manufacturers Build GCCs in India"
          columns={3}
          items={whyCards.map((card) => ({
            title: card.title,
            desc: card.desc,
            icon: card.icon,
          }))}
        />

        {/* ── 4. TALENT ARCHITECTURE (OperatingRealityCard Template) ── */}
        <section id="talent" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="TALENT ARCHITECTURE"
              title="Roles We Help You Build"
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
              {roles.map((role, index) => (
                <OperatingRealityCard
                  key={role}
                  item={{
                    number: String(index + 1).padStart(2, "0"),
                    title: role,
                    image: roleImages[index % roleImages.length],
                    icon: roleIcons[index % roleIcons.length],
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. COMPLIANCE & STANDARDS (Navy Blue with Wave Divider) ── */}
        <Section
          id="compliance"
          theme="navy"
          width="wide"
          waveFill="#F0F5FA"
        >
          <SectionHeader
            title="Compliance & Standards Built In"
            variant="white"
            align="center"
            className="mb-10 sm:mb-14"
          />

          <IndustryChallengesGrid items={compliancePoints} />
        </Section>

        {/* ── 6. REAL RESULTS / CASE STUDY (GCC Starting Point card design) ── */}
        <Section id="results" width="wide">
          <SectionHeader
            title="Real Results for Manufacturers"
            eyebrow="Results"
            align="center"
          />
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0B2554] text-white border border-white/15 shadow-[0_-8px_30px_rgba(0,0,0,0.18),0_20px_50px_rgba(11,37,84,0.22)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px] lg:min-h-[380px] items-stretch">
                {/* CONTENT COLUMN */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-2xs font-mono font-bold uppercase tracking-[0.16em] text-[#93C5FD] block mb-2">
                      Case Study
                    </span>
                    <div className="w-8 h-[3px] bg-[#DE8017] rounded-full mb-3" />
                    <h3 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold tracking-tight leading-[1.2] mb-3 text-white">
                      Global industrial manufacturer launches India GCC for digital transformation
                    </h3>
                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#E2E8F0] mb-4 sm:mb-5">
                      A large global industrial manufacturer partnered with NeoIntelli to establish a GCC in India focused on IoT platform development, predictive maintenance, and supply chain analytics.
                    </p>

                    {/* Key metrics as typographic bullets */}
                    <div className="pt-4 sm:pt-5 pb-5 sm:pb-6 border-t border-white/15">
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {[
                          { label: "Cost Reduction", value: "40% vs. onshore engineering" },
                          { label: "Time To Operate", value: "12 weeks from mandate to first team" },
                          { label: "Team Scale", value: "25+ engineers within six months" },
                        ].map((metric) => (
                          <li key={metric.label} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DE8017] shrink-0" />
                              <span className="text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#93C5FD]">
                                {metric.label}
                              </span>
                            </div>
                            <p className="text-xs sm:text-[13px] font-semibold pl-3.5 leading-snug text-white">
                              {metric.value}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2.5 rounded-lg px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-medium shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto bg-white text-[#0A1222] hover:bg-slate-100"
                    >
                      <span>Discuss a similar engagement</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* PHOTOGRAPHY COLUMN */}
                <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-[#071836]">
                  <Image
                    src="/images/tech-process-automation.png"
                    alt="Manufacturing GCC digital transformation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-[#0B2554] via-transparent to-transparent hidden lg:block opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 7. FREQUENTLY ASKED QUESTIONS ───────────────────────────── */}
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

        {/* ── 8. CALL TO ACTION (BFSI Redesign Style) ─────────────────── */}
        <AiDeliveryTeamsCTA
          serviceInterest="• TAKE THE NEXT STEP"
          title="Ready to Build Your Manufacturing GCC?"
          description="Speak with our team about your Industry 4.0 ambitions, engineering needs, and how a GCC in India can accelerate your transformation."
          primaryCta={{
            label: "Book a consultation",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Explore all industries",
            href: "/industries",
          }}
        />

        {/* ── 9. LET'S BUILD TOGETHER (Consultation with wave divider) ── */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
