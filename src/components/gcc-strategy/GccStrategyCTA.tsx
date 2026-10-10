"use client";

import React from "react";
import { trackEvent } from "@/lib/analytics";
import type { GccLeadContext } from "@/lib/gccStrategyRoutes";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

interface Cta {
  label: string;
  href: string;
}

interface GccStrategyCTAProps {
  title: string;
  description: string;
  primary: Cta;
  secondary?: Cta;
  leadContext: GccLeadContext;
  /** Small line under the buttons, e.g. who the call is with. */
  footnote?: string;
}

/**
 * Closing call to action for the GCC Strategy & Setup pillar.
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity & analytics tracking.
 */
export default function GccStrategyCTA({
  title,
  description,
  primary,
  secondary,
  leadContext,
  footnote,
}: GccStrategyCTAProps) {
  const track = (ctaName: string) => () =>
    trackEvent("cta_click", { location: "gcc_strategy_cta", ...leadContext, cta_name: ctaName });

  return (
    <ExecutiveCTA
      id="gcc-strategy-cta"
      eyebrow={leadContext.service_interest || "GCC Strategy & Setup"}
      title={title}
      description={description}
      primaryCta={{
        label: primary.label,
        href: primary.href,
        onClick: track(primary.label),
      }}
      secondaryCta={secondary ? {
        label: secondary.label,
        href: secondary.href,
        onClick: track(secondary.label),
      } : undefined}
      footnote={footnote}
    />
  );
}
