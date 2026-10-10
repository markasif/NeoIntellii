"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { AI_ENGINEERING_PAGE_BY_KEY, type AiEngineeringPageKey } from "@/data/aiEngineering";
import { aiEngineeringBookingUrl, aiEngineeringContactUrl } from "@/lib/aiEngineeringCta";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

interface AiEngineeringCTAProps {
  pageKey: AiEngineeringPageKey;
  title: string;
  description: string;
}

/**
 * The contextual CTA section for every Enterprise AI Engineering page:
 * Rebuilt on canonical ExecutiveCTA with 100% design fidelity & analytics tracking.
 */
export default function AiEngineeringCTA({ pageKey, title, description }: AiEngineeringCTAProps) {
  const page = AI_ENGINEERING_PAGE_BY_KEY[pageKey] ?? AI_ENGINEERING_PAGE_BY_KEY.overview;
  const lead = { sourcePage: page.path, serviceInterest: page.serviceInterest };
  const secondaryLabel = "Send us the use case in writing";

  const bookingHref = aiEngineeringBookingUrl({
    ...lead,
    ctaName: page.ctaLabel,
    placement: "footer_cta",
  });
  const contactHref = aiEngineeringContactUrl({
    ...lead,
    ctaName: secondaryLabel,
  });

  return (
    <ExecutiveCTA
      id="ai-engineering-cta"
      eyebrow={page.serviceInterest}
      title={title}
      description={description}
      primaryCta={{
        label: page.ctaLabel,
        href: bookingHref,
        icon: <Sparkles className="w-4 h-4 mr-2 text-white/90 transition-transform duration-200 group-hover:rotate-12" />,
      }}
      secondaryCta={{
        label: secondaryLabel,
        href: contactHref,
      }}
      footnote="A 30-minute working session with a senior AI engineer. Bring the workflow, the data it depends on and the constraint that has stopped it so far."
    />
  );
}
