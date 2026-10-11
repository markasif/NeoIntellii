import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Hero,
  NeoHireXMatrix,
  GCCLifecycle,
  GCCCapabilitiesMosaic,
  GCCStartingPoint,
  WhyNeoIntelliLifecycle,
  Industries,
  DecisionTools,
  EngagementModel,
  Insights,
  FAQSection,
  Consultation,
} from "@/features/home";

export default function Index() {
  return (
    <main className="min-h-screen bg-[#E7EDF9] text-[#2B3D66] font-sans antialiased selection:bg-[#169DC8]/20 selection:text-[#2B3D66] overflow-x-clip">

      {/* 1. Sticky Header & Navigation */}
      <Navbar appearance="dark" />

      {/* 2. Hero Section (3-Pillar Presentation & GCC Architecture) */}
      <Hero />

      {/* 3. NeoIntelli Solutions (Editorial Pathways on Sky-Blue Wave Section) */}
      <NeoHireXMatrix />

      {/* 4. One Partner · Complete GCC Lifecycle (Continuous Editorial Lifecycle) */}
      <GCCLifecycle />

      {/* 5. The Capabilities Behind the Lifecycle (Editorial Capability Mosaic) */}
      <GCCCapabilitiesMosaic />

      {/* 6. GCC Starting Points (Where are you in the GCC journey?) */}
      <GCCStartingPoint />

      {/* 7. Why NeoIntelli · One Operating Partner across the AI GCC Lifecycle */}
      <WhyNeoIntelliLifecycle />

      {/* 8. India Advantage & Decision Tools (Cost Calculator, ROI, Readiness) */}
      <DecisionTools />

      {/* 9. How We Engage · Design, Build, Operate, then Scale or Transfer */}
      <EngagementModel />

      {/* 10. Industry Mandates (Editorial Two-Column Interactive Showcase) */}
      <Industries />

      {/* 11. Insights & Thought Leadership Articles */}
      <Insights />

      {/* 12. Frequently Asked Questions (FAQ Accordion) */}
      <FAQSection />

      {/* 13. Lead Capture & Consultation */}
      <Consultation />

      {/* 14. Comprehensive Footer */}
      <Footer />
    </main>
  );
}
