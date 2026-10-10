"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientGlow from "@/components/ui/AmbientGlow";
import IndustryImageCard from "@/components/shared/IndustryImageCard";

interface IndustryCard {
  id: string;
  name: string;
  description: string;
  href: string;
  ctaText: string;
  image: string;
}

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const industries: IndustryCard[] = [
    {
      id: "01",
      name: "Financial Services",
      description:
        "Risk, fraud and payments analytics, regulatory reporting and secure data platforms.",
      href: "/industries/bfsi-gcc",
      ctaText: "Financial Services GCC",
      image: "/images/industries/crisp_fin.png",
    },
    {
      id: "02",
      name: "Healthcare & Life Sciences",
      description:
        "Clinical, regulatory and R&D data work under stricter handling and audit requirements.",
      href: "/industries/healthcare-gcc",
      ctaText: "Healthcare & Life Sciences GCC",
      image: "/images/industries/crisp_health.png",
    },
    {
      id: "03",
      name: "Manufacturing",
      description:
        "Industry 4.0, supply chain and digital engineering close to the production system.",
      href: "/industries/manufacturing-gcc",
      ctaText: "Manufacturing GCC",
      image: "/images/industries/crisp_mfg.png",
    },
    {
      id: "04",
      name: "Retail & Consumer",
      description:
        "Demand forecasting, personalization and supply chain optimization at commerce scale.",
      href: "/industries/retail-gcc",
      ctaText: "Retail & Consumer GCC",
      image: "/images/industries/crisp_retail.png",
    },
    {
      id: "05",
      name: "Software & SaaS",
      description:
        "Product, platform and AI engineering owned end to end by the center.",
      href: "/industries/technology-gcc",
      ctaText: "Software & SaaS GCC",
      image: "/images/industries/crisp_saas.png",
    },
    {
      id: "06",
      name: "Private Equity",
      description:
        "Cross-portfolio capability platforms built once and reused across holdings.",
      href: "/industries/private-equity-gcc",
      ctaText: "Private Equity GCC",
      image: "/images/industries/crisp_pe.png",
    },
  ];

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative bg-[#E7EDF9] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      <AmbientGlow position="center" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Standardized Section Header */}
        <SectionHeader
          eyebrow="INDUSTRIES"
          title={
            <>
              AI GCCs built around the industry mandate<span className="text-[#169DC8]">.</span>
            </>
          }
          description="Specialized domain capability centers aligned with industry-specific governance, data platforms, and regulatory compliance."
          align="center"
          titleClassName="text-center"
          descriptionClassName="text-center mx-auto"
          className="mb-6 sm:mb-8 text-center mx-auto"
        />

        {/* 6-Card Grid: 2 rows with 3 columns (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {industries.map((ind, index) => {
            const isTopRow = index < 3;
            const animationState = hasAnimated
              ? "translate-x-0 opacity-100"
              : isTopRow
              ? "translate-x-20 opacity-0"
              : "-translate-x-20 opacity-0";

            const transitionDelay = isTopRow
              ? `${(index + 1) * 150}ms`
              : `${((index - 3) + 1) * 150}ms`;

            return (
              <IndustryImageCard
                key={ind.id}
                title={ind.name}
                description={ind.description}
                href={ind.href}
                linkLabel={ind.ctaText}
                linkVariant="button"
                image={ind.image}
                imageAlt={ind.name}
                style={{ transitionDelay }}
                className={animationState}
              />
            );
          })}
        </div>

        {/* Bottom CTA Button (Styled like Learn More button) */}
        <div className="mt-10 sm:mt-12 text-center flex justify-center">
          <Link
            href="/industries"
            title="Explore every industry we serve"
            className="btn-gradient"
          >
            <span>Explore every industry we serve</span>
            <ArrowRight className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}

