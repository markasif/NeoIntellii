"use client";

import React, { type ReactNode } from "react";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export interface AiDeliveryTeamsPageLayoutProps {
  children: ReactNode;
}

/**
 * Shared page layout for every AI Delivery Teams page.
 * Delegates to canonical ServicePageLayout.
 */
export default function AiDeliveryTeamsPageLayout({ children }: AiDeliveryTeamsPageLayoutProps) {
  return (
    <ServicePageLayout
      contentTargetId="ai-delivery-content"
      sessionStorageKey="ai_delivery_subnav_nav"
    >
      {children}
    </ServicePageLayout>
  );
}
