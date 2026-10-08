import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { HERO_CAPABILITY_STRIP } from "@/data/homepage";

/**
 * Section 1. The first screen has to answer "what does NeoIntelli do?" in one
 * line: it builds and scales AI GCCs in India. Everything else on the page is
 * an elaboration of that sentence.
 *
 * The hero is a single centered column: headline, support copy, CTAs and the
 * capability strip, on a plain gradient. There is no canvas loop and no
 * autoplay media behind it, which keeps the largest contentful paint the
 * headline itself.
 */

const track = (location: string) => () => trackEvent("cta_click", { location });

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 px-6 sm:px-8 lg:px-12"
      style={{ background: "radial-gradient(circle at 50% 0%, #11abdb 0%, #0a93bd 55%, #07799c 100%)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <p className="text-2xs tracking-[0.16em] uppercase text-cyan-100 mb-5">
          AI GCC · India
        </p>

        <h1
          id="home-hero-heading"
          className="font-display text-[2.6rem] sm:text-[3.25rem] lg:text-[3.9rem] leading-[1.05] tracking-[-0.03em] text-white mb-6"
        >
          Build and scale your AI GCC in India.
        </h1>

        <p className="text-[1.05rem] md:text-[1.125rem] leading-[1.62] text-white/85 mb-9 max-w-2xl">
          NeoIntelli helps global companies design, build, operate and scale AI-led
          Global Capability Centers in India. From AI strategy and specialist talent to
          production AI engineering, delivery teams and GCC operations, one partner
          connects the complete capability lifecycle.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services/ai-gcc"
            onClick={track("hero_plan_ai_gcc")}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm bg-white text-[#054f67] shadow-lg transition-all duration-300 hover:bg-white/95 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07799c]"
          >
            Plan My AI GCC
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/services/micro-gcc"
            onClick={track("hero_micro_gcc")}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm border border-white/35 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/55 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07799c]"
          >
            Explore AI Micro GCC
          </Link>
        </div>

        <Link
          to="/gcc-cost-calculator"
          onClick={track("hero_cost_calculator")}
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-cyan-100 underline underline-offset-4 decoration-cyan-100/40 rounded-sm transition-colors duration-300 hover:text-white hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07799c]"
        >
          Estimate GCC Cost
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Capability strip. Six words, one line on desktop, wrapping on mobile. */}
      <div className="relative max-w-6xl mx-auto mt-14 md:mt-16 pt-7 border-t border-white/15">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-2xs sm:text-2xs tracking-[0.16em] uppercase text-white/70">
          {HERO_CAPABILITY_STRIP.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {item}
              {i < HERO_CAPABILITY_STRIP.length - 1 && (
                <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-white/35" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
