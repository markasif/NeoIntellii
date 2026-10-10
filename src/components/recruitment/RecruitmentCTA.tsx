"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

interface RecruitmentCTAProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/**
 * Navy gradient page CTA card shared by every Recruitment & Staffing page.
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity.
 */
export default function RecruitmentCTA({ eyebrow, title, description, cta, secondary }: RecruitmentCTAProps) {
  return (
    <ExecutiveCTA
      id="recruitment-cta"
      eyebrow={eyebrow}
      title={title}
      description={description}
      primaryCta={{
        label: cta.label,
        href: cta.href,
        icon: <Sparkles className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={secondary ? {
        label: secondary.label,
        href: secondary.href,
        trailingIcon: <ArrowRight className="w-4 h-4 text-[#38BDF8]" />,
      } : undefined}
    />
  );
}
