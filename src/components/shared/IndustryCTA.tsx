"use client";

import React from "react";
import ExecutiveCTA, { type ExecutiveCtaButton } from "@/components/shared/ExecutiveCTA";

export interface IndustryCTAProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta: ExecutiveCtaButton;
  secondaryCta?: ExecutiveCtaButton;
  footnote?: React.ReactNode;
  bottomText?: React.ReactNode;
  className?: string;
  cardClassName?: string;
  id?: string;
}

/**
 * Canonical Industry CTA Component.
 * Standardizes the dark navy call-to-action banner across all Industry GCC routes
 * with full responsive mobileLabel support and design system parity.
 */
export default function IndustryCTA({
  eyebrow = "Industry GCC Advisory",
  title,
  description,
  primaryCta,
  secondaryCta,
  footnote,
  bottomText,
  className = "",
  cardClassName = "",
  id = "industry-cta",
}: IndustryCTAProps) {
  return (
    <ExecutiveCTA
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      footnote={footnote}
      bottomText={bottomText}
      className={className}
      cardClassName={cardClassName}
    />
  );
}
