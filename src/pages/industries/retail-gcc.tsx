"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ShoppingCart,
  Sparkles,
  BarChart3,
  Truck,
  Layers,
  Eye,
  Brain,
  Code2,
  TrendingUp,
  Cloud,
  Palette,
  ShieldCheck,
  Database,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import StatementSection from "@/components/shared/StatementSection";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import IndustryChallengesGrid from "@/components/shared/IndustryChallengesGrid";
import IndustriesSubnav from "@/components/industries/IndustriesSubnav";
import Consultation from "@/features/home/components/Consultation";
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

/* ------------------------------------------------------------------ */
/* DATA (100% PRESERVED) */
/* ------------------------------------------------------------------ */

const capabilities = [
  {
    icon: Sparkles,
    title: "AI-Powered Personalization Engines",
    description:
      "Build real-time personalization systems that tailor product discovery, pricing, promotions, and content to every individual shopper.",
  },
  {
    icon: Brain,
    title: "Recommendation Systems",
    description:
      "Design and deploy collaborative filtering, content-based, and hybrid recommendation models that increase basket size and conversion.",
  },
  {
    icon: BarChart3,
    title: "Demand Forecasting & Inventory Optimization",
    description:
      "Predict demand at SKU level across channels and geographies to reduce stockouts, overstock, and markdowns.",
  },
  {
    icon: Truck,
    title: "Supply Chain AI & Optimization",
    description:
      "Apply optimization algorithms and ML to procurement, warehouse operations, routing, and supplier management.",
  },
  {
    icon: Layers,
    title: "Omnichannel Platform Engineering",
    description:
      "Build unified commerce platforms that deliver consistent experiences across web, mobile, in-store, and marketplace channels.",
  },
  {
    icon: Eye,
    title: "Computer Vision for Retail",
    description:
      "Deploy shelf analytics, checkout-free store technology, visual search, and in-store behavior analysis using computer vision.",
  },
];

const roles = [
  { icon: Brain, title: "ML Engineers", focus: "Recommendations & personalization" },
  { icon: TrendingUp, title: "Data Scientists", focus: "Demand forecasting & analytics" },
  { icon: Code2, title: "Full-Stack Engineers", focus: "E-commerce platforms" },
  { icon: Truck, title: "Supply Chain Analysts", focus: "Logistics & inventory optimization" },
  { icon: Cloud, title: "Cloud/DevOps Engineers", focus: "Scalable infrastructure" },
  { icon: Palette, title: "UX/UI Designers", focus: "Shopper experience design" },
  { icon: ShieldCheck, title: "QA Automation Engineers", focus: "Platform reliability" },
  { icon: Database, title: "Data Engineers", focus: "Pipelines & real-time data" },
];

const useCases = [
  {
    title: "Personalization at Scale",
    description:
      "Build recommendation engines and real-time personalization systems that drive 15-30% revenue lift through tailored product discovery, dynamic pricing, and individualized promotions.",
  },
  {
    title: "Demand Intelligence",
    description:
      "Predict demand at granular SKU, store, and channel levels. Optimize inventory allocation, reduce waste, minimize stockouts, and improve markdown effectiveness.",
  },
  {
    title: "Omnichannel Excellence",
    description:
      "Engineer a unified commerce platform across web, mobile, and store. Deliver seamless cart, loyalty, fulfillment, and customer service experiences everywhere.",
  },
  {
    title: "Supply Chain Optimization",
    description:
      "Apply AI-powered logistics optimization, warehouse automation, last-mile delivery intelligence, and supplier risk management to cut costs and improve speed.",
  },
];

const caseStudyMetrics = [
  { value: 25, suffix: "%", label: "Improvement in demand forecast accuracy" },
  { value: 20, suffix: "+", label: "Engineers hired in first 12 months" },
  { value: null, display: "$1.8M", label: "Annual cost savings achieved" },
];

const faqs: [string, string][] = [
  [
    "Why should a retailer build a GCC in India?",
    "India offers deep engineering talent across AI/ML, data science, full-stack development, and supply chain analytics at scale. A GCC gives retailers direct control over their technology roadmap, IP, and platform engineering instead of relying on external vendors.",
  ],
  [
    "What kind of retail technology can a GCC own?",
    "A retail GCC can own personalization engines, recommendation systems, demand forecasting models, supply chain optimization, omnichannel platform engineering, pricing intelligence, computer vision for stores, and customer analytics.",
  ],
  [
    "How long does it take to set up a retail GCC?",
    "A focused retail GCC can have its first engineering pod operational within 8-12 weeks. Full-scale teams with 20+ engineers across multiple capability areas typically take 6-9 months to build.",
  ],
  [
    "Can a GCC support both online and in-store technology?",
    "Yes. Retail GCCs routinely build technology for e-commerce platforms, mobile apps, point-of-sale systems, in-store analytics, inventory management, and unified commerce experiences across all channels.",
  ],
  [
    "How does NeoIntelli help with hiring for retail-specific roles?",
    "We source and vet candidates with domain experience in retail, e-commerce, and consumer technology. This includes ML engineers who have built recommendation systems, data scientists with demand forecasting experience, and platform engineers who understand commerce at scale.",
  ],
  [
    "What is the cost advantage of a retail GCC in India?",
    "Retailers typically see 40-60% cost savings compared to equivalent teams in the US or Europe, while accessing a talent pool that is often stronger in depth and scale for engineering and data science roles.",
  ],
  [
    "Can an existing retail technology team be transitioned into a GCC?",
    "Yes. NeoIntelli helps retailers transition vendor-managed teams, captive offshore teams, or outsourced development into a fully owned GCC model with better governance, retention, and capability depth.",
  ],
  [
    "How do you ensure quality and alignment with headquarters?",
    "We help establish operating models with clear delivery cadences, cross-timezone collaboration practices, shared tooling, embedded product ownership, and regular leadership alignment reviews.",
  ],
];

/* ------------------------------------------------------------------ */
/* COMPONENT */
/* ------------------------------------------------------------------ */

export default function RetailGCC() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title =
      "Retail & E-commerce GCC India | AI-Powered Commerce — NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <section
          id="retail-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="Retail GCC Executive Hero"
        >
          {/* Executive Environment Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="Retail GCC Command Center"
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
                    Retail & E-commerce GCC
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
 

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left">
                  Build Your Retail & E-commerce GCC in India
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left">
                  Build a Retail GCC in India for AI-powered personalization, demand forecasting, supply chain optimization, and omnichannel platform engineering.
                </p>

                {/* Primary CTA */}
                <div className="flex flex-wrap items-center gap-3 text-left">
                  <a
                    href={CAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold font-manrope tracking-tight px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span>Book a Strategy Call</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </a>
                  <Link
                    to="/services/gcc"
                    className="btn-white cursor-pointer shrink-0"
                  >
                    <span>Explore GCC Services</span>
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
          Retail is becoming a technology business. The winners will be those who build engineering depth - not those who outsource it.
        </StatementSection>

        {/* ── 3. STRATEGIC RATIONALE (CapabilitiesSection design) ── */}
        <CapabilitiesSection
          id="capabilities"
          eyebrow="STRATEGIC RATIONALE"
          title="Why Leading Retailers Build GCCs in India"
          lead="The most competitive retailers are not just buying technology - they are building it. A Global Capability Center in India gives retail enterprises direct ownership of the AI, data, and platform engineering that powers modern commerce."
          columns={3}
          items={capabilities.map((cap) => ({
            title: cap.title,
            desc: cap.description,
            icon: cap.icon,
          }))}
        />

        {/* ── 4. TALENT ARCHITECTURE (OperatingRealityCard Template) ── */}
        <section id="roles" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="TALENT ARCHITECTURE"
              title="Roles We Help You Build"
              description="We source, vet, and help you hire retail-domain engineers and specialists who can ship production-grade technology from day one."
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
              {roles.map((role, index) => (
                <OperatingRealityCard
                  key={role.title}
                  item={{
                    number: String(index + 1).padStart(2, "0"),
                    title: role.title,
                    desc: role.focus,
                    image: roleImages[index % roleImages.length],
                    icon: role.icon,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. RETAIL USE CASES (Navy Blue with Wave Divider) ────── */}
        <Section
          id="use-cases"
          theme="navy"
          width="wide"
          waveFill="#F0F5FA"
        >
          <SectionHeader
            title="What Your Retail GCC Can Own"
            variant="white"
            align="center"
            className="mb-10 sm:mb-14"
          />

          <IndustryChallengesGrid items={useCases} />
        </Section>

        {/* ── 6. CASE STUDY & METRICS ─────────────────────────────────── */}
        <Section id="results" width="wide">
          <SectionHeader
            title="What a Retail GCC Delivers"
            description="A global retailer partnered with NeoIntelli to build a demand-intelligence and personalization engineering team in India. Here is what they achieved in the first year."
            eyebrow="Results"
            align="center"
          />
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              {caseStudyMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl bg-white/80 backdrop-blur-xs border border-[#CBD5E1]/60 p-8 text-center shadow-xs"
                >
                  <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope text-[#0D306C] tracking-tight mb-2">
                    {metric.value !== null ? (
                      <span>
                        {metric.value}
                        {metric.suffix ?? ""}
                      </span>
                    ) : (
                      <span>{metric.display}</span>
                    )}
                  </p>
                  <p className="text-sm text-[#505D74] font-medium leading-snug">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 7. FREQUENTLY ASKED QUESTIONS ───────────────────────────── */}
        <Section id="faqs" width="regular">
          <SectionHeader title="Frequently Asked Questions" eyebrow="Clarifications" align="center" />
          <div className="space-y-3">
            {faqs.map(([q, a], idx) => (
              <div
                key={q}
                className="rounded-2xl bg-white/90 border border-[#CBD5E1]/60 p-6 shadow-2xs transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left cursor-pointer gap-4"
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-base sm:text-[17px] font-bold font-manrope text-[#0D306C]">
                    {q}
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
                      {a}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 8. READY TO BUILD YOUR RETAIL GCC? (Callout CTA - Case Studies Style) ── */}
        <section className="relative py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-4 sm:mb-5">
              <ShoppingCart className="w-10 h-10 text-[#2B3D66] stroke-[1.8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0D306C] tracking-tight leading-[1.18] mb-4 sm:mb-5 font-manrope">
              Ready to Build Your Retail GCC?
            </h2>

            <p className="text-[#505D74] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal font-sans">
              Talk to our team about building a retail and e-commerce GCC that gives you direct ownership of the technology powering modern commerce.
            </p>

            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full bg-[#2A2B68] hover:bg-[#1E1F4B] text-white text-sm sm:text-base font-bold font-manrope tracking-tight transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Book a Strategy Call</span>
            </a>
          </motion.div>
        </section>

        {/* ── 9. LET'S BUILD TOGETHER (Home Consultation with Wave Divider) ── */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
