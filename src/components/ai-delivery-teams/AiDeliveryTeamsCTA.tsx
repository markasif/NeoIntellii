"use client";
 
import React from "react";
import ExecutiveCTA from "@/components/shared/ExecutiveCTA";

interface AiDeliveryTeamsCTAProps {
  serviceInterest?: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bottomText?: React.ReactNode;
}

export default function AiDeliveryTeamsCTA({
  serviceInterest = "AI Delivery Teams",
  title,
  description,
  primaryCta,
  secondaryCta,
  bottomText,
}: AiDeliveryTeamsCTAProps) {
  return (
    <ExecutiveCTA
      id="ai-delivery-cta"
      eyebrow={serviceInterest}
      title={title}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      bottomText={bottomText}
    />
  );
}
