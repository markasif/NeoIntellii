"use client";

import React, { type ReactNode } from "react";
import ServicePageLayout from "@/components/layout/ServicePageLayout";

export interface GccStrategyPageLayoutProps {
  children: ReactNode;
}

/**
 * Shared page layout for every GCC Strategy & Setup page.
 * Delegates to canonical ServicePageLayout.
 */
export default function GccStrategyPageLayout({ children }: GccStrategyPageLayoutProps) {
  return (
    <ServicePageLayout
      contentTargetId="gcc-strategy-content"
      sessionStorageKey="gcc_strategy_subnav_nav"
    >
      {children}
    </ServicePageLayout>
  );
}
