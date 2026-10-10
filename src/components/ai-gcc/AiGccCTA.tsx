"use client";

import React from "react";
import { AI_GCC_PAGE_BY_KEY, type AiGccPageKey } from "@/data/aiGcc";
import { aiGccBookingUrl } from "@/lib/aiGccCta";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

interface AiGccCTAProps {
  pageKey: AiGccPageKey;
  title: string;
  description: string;
  secondary?: { label: string; mobileLabel?: string; href: string };
}

/**
 * The contextual CTA section for every AI GCC page:
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity.
 */
export default function AiGccCTA({ pageKey, title, description, secondary }: AiGccCTAProps) {
  const page = AI_GCC_PAGE_BY_KEY[pageKey] ?? AI_GCC_PAGE_BY_KEY.overview;
  const href = aiGccBookingUrl({
    sourcePage: page.path,
    serviceInterest: page.serviceInterest,
    ctaName: page.ctaLabel,
    placement: "footer_cta",
  });

  return (
    <ExecutiveCTA
      id="ai-gcc-cta"
      eyebrow={page.serviceInterest}
      title={title}
      description={description}
      primaryCta={{
        label: page.ctaLabel,
        mobileLabel: page.mobileCtaLabel,
        href,
      }}
      secondaryCta={secondary ? {
        label: secondary.label,
        mobileLabel: secondary.mobileLabel,
        href: secondary.href,
      } : undefined}
    />
  );
}
