"use client";

import React, { type ReactNode } from "react";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

export interface ContextAdvisoryCalloutProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  footnote?: ReactNode;
  className?: string;
}

/**
 * Editorial contextual callout section matching Case Studies and GCC FAQ.
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity.
 */
export default function ContextAdvisoryCallout({
  eyebrow = "START A CONVERSATION",
  title = "Want to see how this applies to your context?",
  description = "We'll walk through relevant patterns, trade-offs, and decisions from comparable engagements — and design an approach that fits your operating model.",
  buttonText = "Speak to a GCC Advisor",
  buttonHref = "/contact",
  secondaryButtonText = "Book a Consultation",
  secondaryButtonHref = "/book-a-call",
  footnote = "A 30-minute working conversation. No generic GCC pitch: we start with your operating model.",
  className = "",
}: ContextAdvisoryCalloutProps) {
  return (
    <ExecutiveCTA
      eyebrow={eyebrow}
      title={title}
      description={description}
      primaryCta={{
        label: buttonText,
        href: buttonHref,
      }}
      secondaryCta={
        secondaryButtonText && secondaryButtonHref
          ? {
              label: secondaryButtonText,
              mobileLabel: "Book Consultation",
              href: secondaryButtonHref,
            }
          : undefined
      }
      footnote={footnote}
      className={className}
    />
  );
}
