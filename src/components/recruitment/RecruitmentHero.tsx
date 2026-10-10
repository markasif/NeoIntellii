"use client";

import React from "react";
import Image from "next/image";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Database,
  Clock,
  Globe,
  ShieldCheck,
  Award,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { RECRUITMENT_HUB_PATH, RECRUITMENT_PAGE_BY_KEY, type RecruitmentPageKey } from "@/data/recruitment";

function getTrustIcon(text: string, idx: number) {
  const lower = text.toLowerCase();
  if (lower.includes("database") || lower.includes("candidate") || lower.includes("500k") || lower.includes("talent")) {
    return Database;
  }
  if (lower.includes("day") || lower.includes("tat") || lower.includes("time") || lower.includes("closure") || lower.includes("offer")) {
    return Clock;
  }
  if (lower.includes("city") || lower.includes("cities") || lower.includes("pan-india") || lower.includes("coverage") || lower.includes("payroll")) {
    return Globe;
  }
  if (lower.includes("guarantee") || lower.includes("compliance") || lower.includes("statutory") || lower.includes("confidential")) {
    return ShieldCheck;
  }
  if (lower.includes("cxo") || lower.includes("board") || lower.includes("leadership")) {
    return Award;
  }
  if (lower.includes("ratio") || lower.includes("%")) {
    return TrendingUp;
  }
  if (lower.includes("recruiter") || lower.includes("pod") || lower.includes("workflow") || lower.includes("c2h")) {
    return Users;
  }
  const fallback = [Database, Clock, Globe, ShieldCheck];
  return fallback[idx % fallback.length] || Sparkles;
}

export interface RecruitmentHeroCta {
  label: string;
  href: string;
}

export interface RecruitmentHeroProps {
  pageKey: RecruitmentPageKey;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: RecruitmentHeroCta;
  secondaryCta?: RecruitmentHeroCta;
  trustStrip?: string[];
}

/**
 * Signature page hero for every Recruitment & Staffing page. Matches the
 * light executive hero used across the site (canvas #F0F5FA, breadcrumbs,
 * headline, description and CTA row).
 */
export default function RecruitmentHero({
  pageKey,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  trustStrip,
}: RecruitmentHeroProps) {
  const isHub = pageKey === "hub";
  const page = RECRUITMENT_PAGE_BY_KEY[pageKey];

  return (
    <section
      id="recruitment-hero"
      className="relative w-full hero-viewport-fit flex flex-col justify-between overflow-hidden bg-[#F0F5FA] select-none"
      aria-label={`${title} hero`}
    >
      {/* Executive environment background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/gcc-operations/hero-bg.jpg"
          alt={`${title} - NeoIntelli India`}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:hidden pointer-events-none" />
      </div>

      {/* Top spacer for the fixed navbar */}
      <div className="h-12 sm:h-14 lg:h-16 shrink-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-2.5 sm:mb-3 shrink-0">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
            <li className="flex items-center gap-1.5">
              <Link to="/" className="hover:text-[#00A3E0] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
            </li>
            {isHub ? (
              <li className="flex items-center gap-1.5">
                <span aria-current="page" className="font-semibold text-[#0D306C]">Recruitment</span>
              </li>
            ) : (
              <>
                <li className="flex items-center gap-1.5">
                  <Link to={RECRUITMENT_HUB_PATH} className="hover:text-[#00A3E0] transition-colors">Recruitment</Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
                </li>
                <li className="flex items-center gap-1.5">
                  <span aria-current="page" className="font-semibold text-[#0D306C]">{page?.name ?? "Recruitment"}</span>
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Editorial content */}
        <div className="text-left shrink-0 w-full max-w-5xl">
          <div className="max-w-xl lg:max-w-2xl">
            {eyebrow && (
              <span className="block text-[11px] sm:text-xs font-bold font-mono uppercase tracking-[0.2em] text-[#008EC4] mb-2.5">
                {eyebrow}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold font-manrope text-[#0D1B2A] tracking-[-0.035em] leading-[1.12] sm:leading-[1.1] mb-2.5 sm:mb-3 text-left">
              {title}
            </h1>

            <p className="text-xs sm:text-sm md:text-[15px] lg:text-base text-[#415A77] font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-left">
              <Link
                to={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#0D244D] hover:bg-[#008EC4] text-white text-xs sm:text-[13px] font-bold font-manrope tracking-tight px-6 py-3 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
              </Link>

              {secondaryCta && (
                <Link
                  to={secondaryCta.href}
                  className="btn-white cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>{secondaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 shrink-0 text-[#169DC8]" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM DOCK: CIRCULAR BADGE DESIGN MATCHING GCC OPERATIONS ── */}
      {trustStrip && trustStrip.length > 0 && (
        <div className="relative z-20 w-full bg-transparent border-none pb-4 sm:pb-5 lg:pb-6 shrink-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-2 ${
                trustStrip.length === 4
                  ? "sm:grid-cols-4 sm:divide-x"
                  : "sm:grid-cols-3 lg:grid-cols-6 lg:divide-x"
              } sm:divide-[#0D306C]/15`}
            >
              {trustStrip.map((item, idx) => {
                const IconComponent = getTrustIcon(item, idx);
                return (
                  <div
                    key={item}
                    className="group flex flex-col items-center justify-start text-center px-2 sm:px-3 py-2 sm:py-1.5 transition-all duration-200"
                  >
                    {/* Circular White Icon Badge matching GCC Operations */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-xs mb-2 group-hover:scale-105 group-hover:shadow-sm transition-all duration-200">
                      <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D306C] group-hover:text-[#008EC4] transition-colors" />
                    </div>

                    {/* Text Label: Navy Blue, balanced & readable font size */}
                    <span className="text-[12px] sm:text-[12.5px] lg:text-[13px] font-bold text-[#0D306C] text-center leading-snug tracking-tight text-balance max-w-[170px] group-hover:text-[#008EC4] transition-colors">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
