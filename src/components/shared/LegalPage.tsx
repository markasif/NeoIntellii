"use client";

import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Consultation from "@/features/home/components/Consultation";

export interface LegalBlock {
  /** Optional section heading. */
  heading?: string;
  body: ReactNode;
}

interface LegalPageProps {
  /** document.title */
  pageTitle: string;
  /** Breadcrumb label. */
  title: string;
  blocks: LegalBlock[];
}

/**
 * Shared layout for the legal pages (Terms, Privacy, Cookies).
 * The opening sentence is the page statement (large, transparent), the rest of
 * the copy follows on the site canvas, and the site's "Let's build together"
 * Consultation section closes the page.
 */
export default function LegalPage({ pageTitle, title, blocks }: LegalPageProps) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const [intro, ...rest] = blocks;

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-[#2B3D66] font-sans antialiased selection:bg-[#00A3E0]/20 selection:text-[#0D306C]">
      <Navbar />

      <main className="relative px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-10">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 sm:mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#505D74]">
              <li className="flex items-center gap-1.5">
                <Link to="/" className="hover:text-[#00A3E0] transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#7B8B9E]" aria-hidden="true" />
              </li>
              <li className="flex items-center gap-1.5">
                <span aria-current="page" className="font-semibold text-[#0D306C]">{title}</span>
              </li>
            </ol>
          </nav>

          {/* Opening statement */}
          {intro && (
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-manrope text-[#0D306C] tracking-[-0.03em] leading-[1.15] max-w-4xl">
              {intro.body}
            </h1>
          )}

          {/* Remaining copy */}
          <div className="mt-10 sm:mt-12 space-y-8 max-w-3xl">
            {rest.map((block, index) => (
              <div key={index}>
                {block.heading && (
                  <h2 className="text-[17px] sm:text-lg font-extrabold font-manrope text-[#0D306C] tracking-tight mb-2.5">
                    {block.heading}
                  </h2>
                )}
                <div className="text-sm sm:text-base text-[#505D74] leading-relaxed">{block.body}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Consultation hideUpperCta={true} hideWaveDivider={true} />

      <Footer />
    </div>
  );
}
