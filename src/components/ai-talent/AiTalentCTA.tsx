"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { AI_TALENT_PAGE_BY_KEY, type AiTalentPageKey } from "@/data/aiTalent";
import { talentBookingUrl } from "./AiTalentPageLayout";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

interface AiTalentCTAProps {
  pageKey: AiTalentPageKey;
  title: string;
  description: string;
  secondary?: { label: string; href: string };
}

/**
 * The contextual CTA section for every AI Talent page:
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity.
 */
export default function AiTalentCTA({ pageKey, title, description, secondary }: AiTalentCTAProps) {
  const page = AI_TALENT_PAGE_BY_KEY[pageKey] ?? AI_TALENT_PAGE_BY_KEY.overview;
  const href = talentBookingUrl(pageKey, undefined, "footer_cta");

  return (
    <ExecutiveCTA
      id="ai-talent-cta"
      eyebrow={page.serviceInterest}
      title={title}
      description={description}
      primaryCta={{
        label: page.ctaLabel,
        href,
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
