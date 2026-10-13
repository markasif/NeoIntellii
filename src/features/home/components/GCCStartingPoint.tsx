"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface OfferingBlock {
  id: string;
  step: string;
  eyebrow: string;
  title: string;
  copy: string;
  audience: string[];
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  theme: "blue" | "white";
  imagePosition: "right" | "left";
  /** object-position class for the image banner (defaults to object-center) */
  imageObjectClass?: string;
}

const offerings: OfferingBlock[] = [
  {
    id: "ai-micro-gcc",
    step: "01",
    eyebrow: "START SMALLER",
    title: "AI Micro GCC",
    copy: "One focused India team, built and validated first, with room to grow into a larger center.",
    audience: [
      "Startups and scale-ups",
      "Mid-market",
      "A first India capability",
    ],
    ctaText: "Start with AI Micro GCC",
    ctaHref: "/services/micro-gcc",
    image: "/images/Focused Collaboration in a Modern Office.webp",
    imageAlt: "AI Micro GCC team working on technical delivery",
    theme: "blue",
    imagePosition: "right",
  },
  {
    id: "ai-gcc",
    step: "02",
    eyebrow: "BUILD A NEW CENTER",
    title: "AI GCC",
    copy: "A capability center designed around AI, data and engineering from the first business case onward.",
    audience: [
      "Strategic AI, data and engineering capability",
      "A larger mandate",
      "Long-term enterprise ownership",
    ],
    ctaText: "Plan My AI GCC",
    ctaHref: "/services/ai-gcc",
    image: "/images/Confident Presentation Above the City.webp",
    imageAlt: "Executive woman leading AI GCC capability center",
    theme: "white",
    imagePosition: "left",
    imageObjectClass: "object-[50%_25%]",
  },
  {
    id: "gcc-modernization",
    step: "03",
    eyebrow: "TRANSFORM AN EXISTING CENTER",
    title: "GCC Modernization",
    copy: "Move an existing center to a higher-value mandate with AI, data and product ownership inside it.",
    audience: [
      "An existing GCC",
      "AI transformation",
      "Product and platform ownership",
    ],
    ctaText: "Modernize My GCC",
    ctaHref: "/services/gcc/modernization-transformation",
    image: "/images/High-Tech Global Operations Center.webp",
    imageAlt: "Collaborative executive and engineering team meeting in modern capability center",
    theme: "blue",
    imagePosition: "right",
  },
];

export default function GCCStartingPoint() {
  return (
    <section
      id="starting-point"
      className="relative bg-[#E7EDF9] py-8 sm:py-10 md:py-12 lg:py-14"
    >
      {/* Anchor alias for compatibility */}
      <div id="platform" className="absolute -top-20 pointer-events-none" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          eyebrow="CHOOSE YOUR GCC STARTING POINT"
          title={
            <>
              Where are you in the GCC journey<span className="text-[#169DC8]">?</span>
            </>
          }
          description="Select the engagement model tailored to your current maturity, scale requirements, and strategic roadmap."
          className="!mb-6 sm:!mb-8"
        />

        {/* Three offerings in a single row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {offerings.map((offering) => {
            const isBlue = offering.theme === "blue";

            return (
              <div
                key={offering.id}
                className={`group flex flex-col rounded-2xl overflow-hidden border shadow-sm transition-shadow hover:shadow-md ${
                  isBlue
                    ? "bg-[#0B2554] text-white border-white/15"
                    : "bg-white text-[#0B2554] border-[#CBD5E1]"
                }`}
              >
                {/* Photography */}
                <div className="relative h-52 sm:h-60 shrink-0 overflow-hidden bg-[#071836]">
                  <Image
                    src={offering.image}
                    alt={offering.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover ${offering.imageObjectClass ?? "object-center"} transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      isBlue
                        ? "bg-gradient-to-t from-[#0B2554]/70 via-transparent to-transparent"
                        : "bg-gradient-to-t from-white/40 via-transparent to-transparent"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  {/* Eyebrow */}
                  <span
                    className={`block text-[10.5px] sm:text-[11px] font-mono font-bold tracking-[0.18em] uppercase mb-2 ${
                      isBlue ? "text-[#38BDF8]" : "text-[#169DC8]"
                    }`}
                  >
                    {offering.eyebrow}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-lg sm:text-xl font-extrabold tracking-tight leading-tight mb-2 ${
                      isBlue ? "text-white" : "text-[#0B2554]"
                    }`}
                  >
                    {offering.title}
                  </h3>

                  {/* Amber accent underline */}
                  <div className="w-10 h-[3px] bg-[#DE8017] mb-3 rounded-full" />

                  {/* Copy */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed mb-4 font-normal ${
                      isBlue ? "text-[#CBD5E1]" : "text-[#475569]"
                    }`}
                  >
                    {offering.copy}
                  </p>

                  {/* Audience bullets */}
                  <div
                    className={`pt-3 pb-4 border-t flex-1 ${
                      isBlue ? "border-white/15" : "border-[#E2E8F0]"
                    }`}
                  >
                    <ul className="space-y-1.5">
                      {offering.audience.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span
                            className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                              isBlue ? "bg-[#38BDF8]" : "bg-[#169DC8]"
                            }`}
                          />
                          <span
                            className={`text-[11px] sm:text-xs font-medium leading-snug ${
                              isBlue ? "text-[#E2E8F0]" : "text-[#334155]"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href={offering.ctaHref}
                    className={`mt-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all duration-200 w-full ${
                      isBlue
                        ? "bg-white text-[#0D244D] hover:bg-slate-100"
                        : "bg-[#0D244D] hover:bg-[#008EC4] text-white"
                    }`}
                  >
                    <span>{offering.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
