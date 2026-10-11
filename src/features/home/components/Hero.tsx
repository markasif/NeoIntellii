"use client";

import React from "react";
import NeoIntelliHero from "@/components/shared/NeoIntelliHero";
import HeroLifecycleMarquee from "@/components/shared/HeroLifecycleMarquee";

/**
 * Home Page Hero Section:
 * Reuses the canonical NeoIntelliHero system with high-impact artwork:
 * - Desktop: /hero/home page.webp
 * - Mobile: /hero/home-mobile.webp
 * - Mobile: Centered text aligned to top, single white CTA, portrait skyline in lower portion.
 * - Desktop: Left-aligned content block, 2-button CTA group (primary white, secondary navy), widescreen city skyline on right.
 * - Bottom: Amber glassmorphism marquee pill featuring STRATEGY · TALENT · AI ENGINEERING · DELIVERY · OPERATIONS · BOT.
 */
export default function Hero() {
  return (
    <NeoIntelliHero
      id="hero"
      ariaLabel="NeoIntelli AI GCC Hero"
      titlePrefix="Build and scale your"
      titleHighlight="AI GCC"
      titleSuffix="in India."
      description="NeoIntelli helps global companies design, build, operate and scale AI-led Global Capability Centers in India. From AI strategy and specialist talent to production AI engineering, delivery teams and GCC operations, one partner connects the complete capability lifecycle."
      desktopImage="/hero/home page.webp"
      mobileImage="/hero/home-mobile.webp"
      imageAlt="NeoIntelli AI GCC Architecture Futuristic City Skyline"
      primaryCta={{
        label: "GCC Cost Calculator",
        href: "/gcc-cost-calculator",
      }}
      secondaryCta={{
        label: "Explore AI Micro GCC",
        href: "/services/micro-gcc",
      }}
      bottomContent={<HeroLifecycleMarquee />}
    />
  );
}
