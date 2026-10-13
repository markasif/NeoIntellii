"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import HiringPathCards from "@/components/ai-talent/HiringPathCards";
import IndustryCTA from "@/components/shared/IndustryCTA";
import Consultation from "@/features/home/components/Consultation";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";

const sectorPaths = [
  {
    title: "BFSI GCC",
    tagline: "Banking, Fintech & Insurance",
    desc: "Banks, fintechs, insurance, and asset managers building GCCs for risk analytics, fraud detection, regulatory tech, and fintech engineering.",
    items: [
      "Risk analytics & algorithmic trading",
      "Fraud detection & AML compliance pods",
      "Core banking & regulatory tech engineering",
      "Capital markets data pipelines",
    ],
    cta: { label: "Explore BFSI GCC", href: "/industries/bfsi-gcc" },
    image: "/images/industries/crisp_fin.webp",
    imageAlt: "BFSI Global Capability Center India operations",
    highlight: true,
  },
  {
    title: "Healthcare GCC",
    tagline: "Pharma, MedTech & Care Delivery",
    desc: "Pharma, medtech, and healthcare providers establishing GCCs for drug discovery, clinical analytics, EHR modernization, and telemedicine.",
    items: [
      "Clinical data engineering & analytics",
      "EHR/EMR modernization & interoperability",
      "FDA / HIPAA compliant software delivery",
      "Bioinformatics & drug discovery pipelines",
    ],
    cta: { label: "Explore Healthcare GCC", href: "/industries/healthcare-gcc" },
    image: "/images/industries/crisp_health.webp",
    imageAlt: "Healthcare & Life Sciences Global Capability Center",
    highlight: false,
  },
  {
    title: "Technology GCC",
    tagline: "Software, SaaS & Deep Tech Platforms",
    desc: "SaaS companies, platform businesses, and software product companies building GCCs for core R&D, product engineering, and AI systems.",
    items: [
      "Core product engineering & cloud microservices",
      "Applied AI/ML & AgentOps squads",
      "DevOps, SRE & 24/7 cloud infrastructure",
      "High-retention product development pods",
    ],
    cta: { label: "Explore Technology GCC", href: "/industries/technology-gcc" },
    image: "/images/industries/crisp_saas.webp",
    imageAlt: "Technology and SaaS Global Capability Center India",
    highlight: false,
  },
];

const operatingArchitecture = [
  {
    title: "GCC-as-a-Service",
    desc: "End-to-end managed GCC setup and operations. From entity creation to talent acquisition to steady-state management.",
    badge: "ARCHITECTURE 01",
    image: "/images/services/gcc-operations/gcc-ops-workforce.webp",
    alt: "GCC-as-a-Service operating architecture",
    aspect: "aspect-[4/3]",
    points: [
      "Entity creation & registration",
      "Hiring OS & squad onboarding",
      "Full workplace & HR management",
      "Predictable steady-state SLAs",
    ],
    action: "Explore Model",
    href: "/gcc-as-a-service",
  },
  {
    title: "GCC Operations",
    desc: "The operating layer around your GCC: people operations, workplace and IT, service management, and governance.",
    badge: "ARCHITECTURE 02",
    image: "/images/services/gcc-operations/gcc-hq-leadership.webp",
    alt: "GCC operations and managed services",
    aspect: "aspect-[4/3]",
    points: [
      "Enterprise facilities & IT stack",
      "Statutory, tax & labor compliance",
      "Continuous talent retention",
      "Turnkey BOT transition path",
    ],
    action: "View Operations",
    href: "/services/gcc-operations",
  },
  {
    title: "GCC vs Outsourcing",
    desc: "A structured comparison across cost, control, IP ownership, talent retention, and long-term strategic value.",
    badge: "ARCHITECTURE 03",
    image: "/images/services/gcc-operations/gcc-arch-leadership.webp",
    alt: "GCC versus outsourcing comparison framework",
    aspect: "aspect-[4/3]",
    points: [
      "100% intellectual property ownership",
      "Zero vendor markup margins",
      "Direct cultural integration",
      "Compounding institutional knowledge",
    ],
    action: "Compare Models",
    href: "/gcc-vs-outsourcing",
  },
  {
    title: "GCC Cost Calculator",
    desc: "Interactive tool to estimate your GCC investment across team size, seniority mix, city selection, and engagement model.",
    badge: "ARCHITECTURE 04",
    image: "/images/tools/hero_tools_bg.webp",
    alt: "Interactive GCC cost calculator tool",
    aspect: "aspect-[4/3]",
    points: [
      "Benchmarked compensation models",
      "City-by-city real estate inputs",
      "Full CAPEX & OPEX projections",
      "Instant scenario modeling",
    ],
    action: "Estimate Costs",
    href: "/gcc-cost-calculator",
  },
];

const otherIndustries = [
  {
    title: "Retail & Consumer",
    desc: "Retailers, CPG brands, and e-commerce companies building GCCs for supply chain, analytics, digital commerce, and customer platforms.",
    image: "/images/industries/crisp_retail.webp",
    link: "/industries/retail-gcc",
  },
  {
    title: "Manufacturing",
    desc: "Industrial, automotive, and aerospace companies establishing GCCs for engineering, IoT, supply chain, and digital operations.",
    image: "/images/industries/crisp_mfg.webp",
    link: "/industries/manufacturing-gcc",
  },
  {
    title: "Private Equity",
    desc: "PE firms and portfolio companies establishing shared capability centers for operating leverage, digital transformation, and value creation.",
    image: "/images/industries/crisp_pe.webp",
    link: "/industries/private-equity-gcc",
  },
];

const faqs = [
  {
    q: "Does NeoIntelli specialise in a single industry?",
    a: "No. We work across multiple industries, but bring domain-specific knowledge to each engagement especially in regulated sectors like financial services and healthcare.",
  },
  {
    q: "How do you adapt GCC design to different industries?",
    a: "Every GCC engagement starts with understanding the industry's regulatory context, talent landscape, technology maturity, and business model. The operating model is shaped accordingly.",
  },
  {
    q: "Can you support GCCs in highly regulated industries?",
    a: "Yes. Compliance, governance, and regulatory alignment are core to our approach especially for financial services, healthcare, and data-sensitive sectors.",
  },
  {
    q: "Do you work with private equity portfolio companies?",
    a: "Yes. We help PE firms and their portfolio companies build shared capability centers for operating leverage and value creation.",
  },
  {
    q: "What about industries not listed here?",
    a: "We evaluate every engagement on its merits. If your industry has complex operating requirements and would benefit from a GCC in India, we're happy to explore.",
  },
];

export default function Industries() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Industries | Enterprise GCC Solutions by Sector — NeoIntelli";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C] flex flex-col">
      <Navbar appearance="dark" />

      <main className="relative flex-grow">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <NeoIntelliHero
          id="industries-hero"
          ariaLabel="Industries Executive Hero"
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Industries" },
          ]}
          title="Built for enterprises with complex operating realities."
          description="NeoIntelli supports companies across regulated, technology-intensive, and transformation-heavy sectors."
          desktopImage="/images/hero/industry.webp"
          mobileImage="/images/hero/industry-mobile.webp"
          imageAlt="Industries Command Center"
          primaryCta={{ label: "Discuss Your Industry Context", href: "/contact" }}
        />

        {/* ── 2. EDITORIAL STATEMENT ──────────────────────────────────── */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold font-manrope text-[#0D306C] tracking-tight leading-snug">
              Each engagement is shaped around business criticality, compliance needs, talent depth,{" "}
              <span className="text-[#505D74] font-semibold">
                and the maturity of the target operating model.
              </span>
            </p>
          </div>
        </section>

        {/* ── 3. INDUSTRY-SPECIFIC GCCS (Sector Depth with HiringPathCards) ── */}
        <section id="industry-gccs" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Industry-specific GCCs"
              description="Deep-dive into how GCCs are structured for specific industries with unique regulatory, talent, and technology requirements."
              eyebrow="Sector Depth"
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />
            <HiringPathCards columns={3} paths={sectorPaths} />
          </div>
        </section>

        {/* ── 4. GCC SERVICES & RESOURCES (Operating Architecture 4 divs in one line) ── */}
        <section id="gcc-services" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="GCC services & resources"
              description="Tools, frameworks, and services to help you plan, compare, and launch your Global Capability Center."
              eyebrow="Operating Architecture"
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch max-w-7xl mx-auto">
              {operatingArchitecture.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col group bg-white/70 backdrop-blur-xs border border-[#D2DCF0] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#169DC8]/50 hover:shadow-md transition-all duration-300 text-left"
                >
                  {/* Sharp Rectangle Image Container with Badge */}
                  <div className={`relative w-full ${item.aspect} rounded-xl overflow-hidden shadow-xs group-hover:shadow-md transition-all duration-300 bg-[#0A1D42] mb-4`}>
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#0D244D]/90 backdrop-blur-xs text-white text-[9.5px] font-mono font-bold tracking-wider px-2 py-0.5 uppercase rounded-sm">
                      {item.badge}
                    </div>
                  </div>

                  {/* Editorial Content directly on card */}
                  <div className="flex flex-col flex-1 text-left">
                    <h3 className="text-[#0D306C] font-extrabold text-lg tracking-tight mb-2 leading-snug group-hover:text-[#008EC4] transition-colors font-manrope">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#505D74] leading-relaxed mb-4 font-normal font-sans">
                      {item.desc}
                    </p>

                    {/* Bullet highlights */}
                    <ul className="space-y-2 mb-5 mt-auto">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-xs text-[#2B3D66]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] shrink-0" aria-hidden="true" />
                          <span className="font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        to={item.href}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#169DC8] hover:bg-[#0D306C] text-white text-xs font-bold font-manrope tracking-wide transition-all duration-200 shadow-xs"
                      >
                        <span>{item.action}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. OTHER INDUSTRIES WE SERVE ────────────────────────────── */}
        <section id="other-industries" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Other industries we serve"
              description="Specialized capability models tailored for global supply chains, industrial engineering, and portfolio value creation."
              eyebrow="Broad Domain Alignment"
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherIndustries.map((ind) => (
                <div
                  key={ind.title}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-[#D2DCF0] shadow-xs hover:shadow-md hover:border-[#169DC8]/50 transition-all duration-300 flex flex-col justify-between h-full text-left"
                >
                  <div>
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-[#0A1D42]">
                      <img
                        src={ind.image}
                        alt={ind.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-manrope text-[#0D306C] tracking-tight mb-2.5">
                      {ind.title}
                    </h3>
                    <p className="text-sm text-[#505D74] leading-relaxed mb-6 font-normal font-sans">
                      {ind.desc}
                    </p>
                  </div>
                  {ind.link && (
                    <Link
                      to={ind.link}
                      className="inline-flex items-center gap-1.5 text-sm font-bold font-manrope text-[#008EC4] group-hover:text-[#0D306C] transition-colors"
                    >
                      <span>Explore {ind.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FREQUENTLY ASKED QUESTIONS ───────────────────────────── */}
        <section id="faqs" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Frequently asked questions"
              description="Common questions about sector-specific capability center setup, domain compliance, and governance."
              eyebrow="Clarifications"
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-14"
            />
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-[#D2DCF0] bg-white transition-all overflow-hidden shadow-xs hover:border-[#169DC8]/50 hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer transition-colors hover:bg-slate-50/60"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base md:text-lg font-bold sm:font-extrabold text-[#0D306C] pr-3 sm:pr-4 font-manrope">
                        {faq.q}
                      </span>
                      <div
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#D2DCF0] transition-all duration-200 ${
                          isOpen
                            ? "bg-[#169DC8] text-white rotate-180 border-[#169DC8]"
                            : "bg-[#F0F5FA] text-[#505D74]"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm md:text-[15px] text-[#505D74] leading-relaxed border-t border-[#D2DCF0]/80 pt-3 sm:pt-4 font-sans font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. INDUSTRY CTA (ExecutiveCTA with mobile labels) ── */}
        <IndustryCTA
          eyebrow="• TAKE THE NEXT STEP"
          title="Want to see how this applies to your industry?"
          description="We'll walk through relevant patterns, trade-offs, and decisions from comparable engagements — and design an approach that fits your sector's regulatory and operational reality."
          primaryCta={{
            label: "Speak to an Industry GCC Advisor",
            mobileLabel: "Speak to an Advisor",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Explore Cost Calculator",
            mobileLabel: "Cost calculator",
            href: "/gcc-cost-calculator",
          }}
        />

        {/* ── 8. LET'S BUILD TOGETHER (Home Consultation with Wave Divider) ── */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}
