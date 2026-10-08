"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  Terminal,
  Server,
  Lock,
  LineChart,
  ShieldCheck,
  AlertTriangle,
  Rocket,
  Layers,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ConnectedEcosystem from "@/components/shared/ConnectedEcosystem";
import RelatedLinks from "@/components/shared/RelatedLinks";
import Consultation from "@/features/home/components/Consultation";
import StatementSection from "@/components/shared/StatementSection";
import SlottedStepNumber from "@/components/gcc-operations/SlottedStepNumber";
import { OperatingRealityCard } from "@/components/gcc-operations/OperatingRealitySection";
import IndustryChallengesGrid from "@/components/shared/IndustryChallengesGrid";
import IndustriesSubnav from "@/components/industries/IndustriesSubnav";
import AiDeliveryTeamsCTA from "@/components/ai-delivery-teams/AiDeliveryTeamsCTA";
import { getPageMeta } from "@/lib/pageMeta";

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

const defaultRoleIcons = [
  Cpu,
  Database,
  Terminal,
  Server,
  Lock,
  LineChart,
  ShieldCheck,
  AlertTriangle,
];

/** Resolves a connected-ecosystem card icon from the related link name. */
function resolveRelatedIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("outsourc")) return RefreshCw;
  if (lower.includes("pod") || lower.includes("delivery") || lower.includes("team")) return Layers;
  if (lower.includes("setup") || lower.includes("launch") || lower.includes("startup")) return Rocket;
  if (lower.includes("ai gcc")) return Cpu;
  return LineChart;
}

interface WhyBlock {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface CaseStudy {
  title: string;
  description: string;
  gradient: string;
  orbColor: string;
}

interface IndustryGccPageProps {
  pageTitle: string;
  label: string;
  breadcrumbLabel: string;
  h1: string;
  subheadline: string;
  ctaText: string;
  shortAnswer?: string;
  accentColor: string;
  whyTitle: string;
  whyBlocks: WhyBlock[];
  rolesTitle: string;
  roles: string[];
  darkSectionTitle: string;
  darkItems: string[];
  caseStudy?: CaseStudy;
  faqs: { q: string; a: string }[];
  relatedLinks: { name: string; href: string }[];
  ctaBanner: { title: string; description: string; buttonText: string };
  children?: ReactNode;
  useConnectedEcosystem?: boolean;
}

export default function IndustryGccPage({
  pageTitle,
  label,
  breadcrumbLabel,
  h1,
  subheadline,
  ctaText,
  shortAnswer,
  accentColor,
  whyTitle,
  whyBlocks,
  rolesTitle,
  roles,
  darkSectionTitle,
  darkItems,
  caseStudy,
  faqs,
  relatedLinks,
  ctaBanner,
  children,
  useConnectedEcosystem,
}: IndustryGccPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative">
        {/* ── 1. SIGNATURE EXECUTIVE HERO SECTION ────────────────────────── */}
        <section
          id="industry-hero"
          className="relative w-full hero-viewport-fit flex flex-col justify-center overflow-hidden bg-[#F0F5FA] select-none"
          aria-label={`${h1} Executive Hero`}
        >
          {/* Executive Environment Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/images/gcc-operations/hero-bg.jpg"
              alt={`${h1} Executive View`}
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
                    {breadcrumbLabel}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Editorial Content Area */}
            <div className="text-left shrink-0 w-full max-w-5xl">
              <div className="max-w-xl lg:max-w-2xl">

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left">
                  {h1}
                </h1>

                <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left">
                  {subheadline}
                </p>

                {/* CTA Row */}
                <div className="flex flex-wrap items-center gap-3 text-left">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold font-manrope tracking-tight px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
                  >
                    <span>{ctaText}</span>
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
        {shortAnswer && (
          <StatementSection eyebrow="SHORT ANSWER" text={shortAnswer} />
        )}

        {/* ── 3. STRATEGIC RATIONALE (SlottedStepNumber Component Design) ── */}
        <section id="why-gcc" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="STRATEGIC RATIONALE"
              title={whyTitle}
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

        {/* ── 4. TALENT ARCHITECTURE (OperatingRealityCard Template from BFSI) ── */}
        <section id="talent-roles" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="TALENT ARCHITECTURE"
              title={rolesTitle}
              variant="cyan"
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-7xl mx-auto">
              {roles.map((role, index) => {
                const parts = role.match(/^(.*?)\s*\((.*?)\)$/);
                const title = parts ? parts[1] : role;
                const desc = parts ? parts[2] : undefined;
                return (
                  <OperatingRealityCard
                    key={role}
                    item={{
                      number: String(index + 1).padStart(2, "0"),
                      title,
                      desc,
                      image: roleImages[index % roleImages.length],
                      icon: defaultRoleIcons[index % defaultRoleIcons.length],
                    }}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. OPTIONAL CHILDREN (E.G. TECHNOLOGY GCC PODS) ─────────── */}
        {children}

        {/* ── 6. CHALLENGES / COMPLIANCE SECTION (Navy Blue with Wave Divider) ── */}
        <Section
          id="industry-challenges"
          theme="navy"
          width="wide"
          waveFill="#F0F5FA"
        >
          <SectionHeader
            title={darkSectionTitle}
            variant="white"
            align="center"
            className="mb-10 sm:mb-14"
          />

          <IndustryChallengesGrid items={darkItems} />
        </Section>

        {/* ── 7. OPTIONAL CASE STUDY ──────────────────────────────────── */}
        {caseStudy && (
          <Section id="case-study" width="regular">
            <div className="relative rounded-2xl p-8 sm:p-10 bg-white/80 backdrop-blur-xs border border-[#CBD5E1]/60 shadow-xs overflow-hidden">
              <span className="text-2xs font-mono font-bold uppercase tracking-[0.16em] text-[#008EC4] block mb-3">
                Case Study
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-manrope text-[#0D306C] tracking-tight mb-3">
                {caseStudy.title}
              </h3>
              <p className="text-sm sm:text-base text-[#505D74] leading-relaxed mb-6">
                {caseStudy.description}
              </p>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-bold font-manrope text-[#008EC4] hover:text-[#0D306C] transition-colors"
              >
                <span>Our approach</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Section>
        )}

        {/* ── 8. FAQS SECTION ─────────────────────────────────────────── */}
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

        {/* ── 8b. LET'S BUILD TOGETHER (CTA banner, manufacturing-gcc design) ── */}
        {ctaBanner && (
          <AiDeliveryTeamsCTA
            serviceInterest="• TAKE THE NEXT STEP"
            title={ctaBanner.title}
            description={ctaBanner.description}
            primaryCta={{ label: ctaBanner.buttonText, href: "/contact" }}
            secondaryCta={{ label: "Explore all industries", href: "/industries" }}
          />
        )}

        {/* ── 9. CONTINUE EXPLORING (Connected Ecosystem) ────────────────── */}
        {useConnectedEcosystem ? (
          <ConnectedEcosystem
            cards={
              relatedLinks && relatedLinks.length > 0
                ? relatedLinks.map((link) => {
                    const meta = getPageMeta(link.href, link.name);
                    return {
                      path: link.href,
                      name: link.name,
                      summary: meta.description,
                      anchor: `Read about ${meta.title}`,
                      icon: resolveRelatedIcon(link.name),
                    };
                  })
                : undefined
            }
          />
        ) : (
          <>
            {relatedLinks && relatedLinks.length > 0 && (
              <RelatedLinks links={relatedLinks} />
            )}
            <Consultation hideUpperCta={true} hideWaveDivider={true} />
          </>
        )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
