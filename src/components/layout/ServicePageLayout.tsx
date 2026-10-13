"use client";

import React, { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Consultation from "@/features/home/components/Consultation";

export interface ServicePageLayoutProps {
  children: ReactNode;
  contentTargetId?: string;
  sessionStorageKey?: string;
  className?: string;
  hideConsultation?: boolean;
  consultationWaveFill?: string;
  consultationHideWaveDivider?: boolean;
}

/**
 * Canonical ServicePageLayout System:
 * - Unifies the page layout wrappers across all 6 service pillars and inner pages
 * - Provides global <Navbar /> and <Footer />
 * - Signature canvas background #E7EDF9 with selection highlight #00A3E0/20
 * - Handles hash and sessionStorage smooth scroll restoration for subnav jump links
 * - Embeds global Consultation section before footer with customizable toggle
 */
export default function ServicePageLayout({
  children,
  contentTargetId,
  sessionStorageKey,
  className = "",
  hideConsultation = false,
  consultationWaveFill,
  consultationHideWaveDivider = true,
}: ServicePageLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isSubnavNav = sessionStorageKey ? sessionStorage.getItem(sessionStorageKey) : null;
    const hashTarget = contentTargetId ? `#${contentTargetId}` : null;
    if (isSubnavNav || (hashTarget && location.hash === hashTarget)) {
      if (sessionStorageKey) sessionStorage.removeItem(sessionStorageKey);
      const timer = setTimeout(() => {
        if (!contentTargetId) return;
        const target = document.getElementById(contentTargetId);
        if (target) {
          const topOffset = 125;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - topOffset;
          window.scrollTo({ top: Math.max(0, targetPos), left: 0, behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash, contentTargetId, sessionStorageKey]);

  return (
    <div
      className={`min-h-screen w-full bg-[#E7EDF9] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C] ${className}`.trim()}
    >
      <Navbar appearance="dark" />
      {children}
      {!hideConsultation && (
        <Consultation
          hideUpperCta={true}
          hideWaveDivider={consultationHideWaveDivider}
          waveFill={consultationWaveFill}
        />
      )}
      <Footer />
    </div>
  );
}
