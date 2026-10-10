"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Users,
  Rocket,
  Heart,
  BookOpen,
  Clock,
  Globe,
  ChevronRight,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import CapabilitiesSection from "@/components/ai-gcc/CapabilitiesSection";
import DeliverablesList from "@/components/ai-gcc/DeliverablesList";
import Consultation from "@/features/home/components/Consultation";
import IndustryImageCard from "@/components/shared/IndustryImageCard";

const whyReasons = [
  {
    icon: Rocket,
    title: "Work on What Matters",
    desc: "Help global companies build AI-first capability centers. Every project has real business impact — from startups extending their runway to enterprises transforming their operations.",
  },
  {
    icon: BookOpen,
    title: "Learn Constantly",
    desc: "Work across industries, technologies, and business models. Exposure to AI, cloud, data engineering, and enterprise transformation means you never stop growing.",
  },
  {
    icon: Users,
    title: "Own Your Growth",
    desc: "We're a growing company where impact is visible. Take ownership of projects, build new practices, and shape how NeoIntelli evolves.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    desc: "Work with teams across the US, UK, Europe, and Nordics. Build relationships and understanding that span geographies and cultures.",
  },
];

const openRoles = [
  {
    title: "Senior GCC Consultant",
    location: "Bengaluru",
    type: "Full-time",
    desc: "Lead GCC setup engagements from strategy through launch. Work directly with C-suite leaders at global companies.",
  },
  {
    title: "AI/ML Solutions Architect",
    location: "Bengaluru",
    type: "Full-time",
    desc: "Design AI architectures for GCC clients. Build reference implementations and guide AI-first GCC setups.",
  },
  {
    title: "Talent Acquisition Lead",
    location: "Bengaluru",
    type: "Full-time",
    desc: "Build and lead the hiring engine that powers our clients' GCCs. Source, screen, and place top engineering talent.",
  },
  {
    title: "Business Development Manager",
    location: "Bengaluru / Remote",
    type: "Full-time",
    desc: "Drive growth by connecting with enterprises, startups, and PE firms looking to build GCCs in India.",
  },
  {
    title: "Content & SEO Strategist",
    location: "Bengaluru / Remote",
    type: "Full-time",
    desc: "Create thought leadership content that positions NeoIntelli as the authority in AI-first GCCs.",
  },
  {
    title: "GCC Operations Manager",
    location: "Bengaluru",
    type: "Full-time",
    desc: "Manage day-to-day operations of client GCCs — HR, facilities, compliance, and team experience.",
  },
];

/** Decorative artwork for the open-role cards, in role order. */
const roleImages = [
  "/images/gcc-operations/gcc-ops-workforce.jpg",
  "/images/ai-engineering/genai-capability.jpg",
  "/images/gcc-operations/gcc-ops-people.jpg",
  "/images/mosaic_ai_gcc.jpg",
  "/images/gcc-operations/gcc-ops-performance.jpg",
  "/images/gcc-operations/gcc-ops-governance.jpg",
];

const cultureHighlights = [
  { icon: Clock, title: "Flexible Work", desc: "Hybrid work model with flexible hours" },
  { icon: BookOpen, title: "Learning Budget", desc: "Annual learning & development allowance" },
  { icon: Heart, title: "Health First", desc: "Comprehensive health insurance for you and family" },
  { icon: Users, title: "Team Events", desc: "Regular team outings, offsites, and celebrations" },
  { icon: MapPin, title: "Modern Workspace", desc: "HSR Layout, Bengaluru — one of India's top tech corridors" },
  { icon: Rocket, title: "No Red Tape", desc: "Flat structure, direct access to leadership, fast decisions" },
];

const benefits = [
  "Competitive salary + performance bonuses",
  "Health insurance (employee + family)",
  "Flexible working hours & hybrid model",
  "Annual learning & conference budget",
  "Paid time off + wellness days",
  "Modern office in HSR Layout, Bengaluru",
  "Team outings and company offsites",
  "Fast career growth in a scaling company",
];

export default function Careers() {
  useEffect(() => {
    document.title = "Careers at NeoIntelli | Join India's AI-First GCC Company";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ============================================================ */}
        {/* 1. SIGNATURE EXECUTIVE HERO SECTION */}
        {/* ============================================================ */}
        <section
          id="careers-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
          aria-label="Careers at NeoIntelli Hero"
        >
          {/* Executive Background Overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt="Careers at NeoIntelli"
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

          {/* Hero Content Area */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
                <li className="flex items-center gap-1.5">
                  <Link
                    to="/"
                    className="hover:text-[#00A3E0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
                  >
                    Home
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-current="page" className="font-semibold text-[#0D306C]">
                    Careers
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left font-sans">
                  Build the Future of Global Capability Centers.
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left font-sans">
                  Join NeoIntelli &mdash; India&apos;s AI-first GCC company. We&apos;re building the next generation of Global Capability Centers, powered by production AI and led by exceptional operators.
                </p>

                {/* CTAs Row */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-left">
                  <a
                    href="#open-roles"
                    className="btn-navy shrink-0"
                  >
                    <span>View Open Positions</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                  </a>

                  <a
                    href="#culture"
                    className="btn-white cursor-pointer shrink-0"
                  >
                    <span>Life at NeoIntelli</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0 text-[#169DC8]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dock: Metrics Strip */}
          <div className="relative z-20 w-full bg-transparent border-none pb-4 sm:pb-6 lg:pb-8 shrink-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-[#0D306C]/10 sm:divide-y-0 sm:divide-x sm:divide-[#0D306C]/15 bg-transparent p-0">
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    Bengaluru
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    HSR Layout tech corridor campus & hub
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    6+
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    High-impact open specialist roles
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    Hybrid
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Workplace flexibility & autonomous pods
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-3 sm:py-2">
                  <span className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-extrabold text-[#0D306C] font-mono tracking-tight leading-none mb-1.5 sm:mb-2">
                    100%
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#505D74] text-center leading-snug font-medium max-w-[220px] sm:max-w-xs">
                    Comprehensive health & wellness coverage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. MISSION MANIFESTO STATEMENT (Blueprint Strategic Foundation Design) */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
              OUR BELIEF
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.2] mb-4">
              We believe the future of work is global, intelligent, and owned.{" "}
              <span className="text-[#505D74] font-normal block sm:inline mt-2 sm:mt-0">
                At NeoIntelli, we help companies build that future — and we need exceptional engineers, consultants, and operators to do it.
              </span>
            </h2>
            <div className="w-16 h-1 bg-amber-300 mx-auto rounded-full mt-6" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. WHY BUILD YOUR CAREER AT NEOINTELLI */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="WHY JOIN US"
              title="Why Build Your Career at NeoIntelli?"
              description="A modern platform where seniority meets agility, and where every project delivers real enterprise transformation."
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center max-w-6xl mx-auto">
              {whyReasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="flex flex-col items-center justify-between text-center bg-transparent border-0 shadow-none p-3 sm:p-4 group"
                  >
                    <div className="flex flex-col items-center w-full">
                      {/* Slotted Step Number */}
                      <SlottedStepNumber index={index} />

                      <h3 className="text-[#0D306C] font-extrabold text-sm sm:text-base uppercase tracking-wider mb-2.5 group-hover:text-[#008EC4] transition-colors font-manrope">
                        {reason.title}
                      </h3>

                      <p className="text-[#505D74] text-xs sm:text-[13px] leading-relaxed mb-6 flex-1 max-w-xs font-normal">
                        {reason.desc}
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

        {/* ============================================================ */}
        {/* 4. OPEN ROLES */}
        {/* ============================================================ */}
        <section id="open-roles" className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="CAREER OPPORTUNITIES"
              title="Open Roles"
              description="Explore our current openings across consulting, architecture, operations, and talent leadership."
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {openRoles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <IndustryImageCard
                    title={role.title}
                    description={role.desc}
                    image={roleImages[index]}
                    imageAlt={role.title}
                    eyebrow={
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#008EC4]">
                          <MapPin className="w-3 h-3" /> {role.location}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#00A3E0]/10 text-[10.5px] font-mono font-bold text-[#008EC4]">
                          {role.type}
                        </span>
                      </div>
                    }
                    href={`mailto:careers@neointelli.com?subject=Application: ${encodeURIComponent(role.title)}`}
                    linkLabel="Apply Now"
                    linkVariant="button"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. LIFE AT NEOINTELLI */}
        {/* ============================================================ */}
        <section id="culture" className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="TEAM CULTURE"
              title="Life at NeoIntelli"
              description="We combine the rigor of enterprise advisory with the speed and creative freedom of an AI product startup."
              variant="cyan"
              align="center"
              className="mb-12 sm:mb-16"
            />

            <CapabilitiesSection
              columns={3}
              items={cultureHighlights.map((item) => ({
                title: item.title,
                desc: item.desc,
                icon: item.icon,
              }))}
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. BENEFITS & PERKS */}
        {/* ============================================================ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="COMPREHENSIVE CARE"
              title="Benefits & Perks"
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-14"
            />

            <DeliverablesList items={benefits} iconBadge="hexagon" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. LET'S BUILD TOGETHER */}
        {/* ============================================================ */}
        <Consultation hideUpperCta={true} waveFill="#F0F5FA" />
      </main>

      <Footer />
    </div>
  );
}
