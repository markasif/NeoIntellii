import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations";
import { trackEvent } from "@/lib/analytics";

/** Section 18. One clear next step, with the two lighter alternatives beside it. */
export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-[#0e1320] py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-ink bg-grid-fade opacity-[0.12]" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[620px] h-[420px] rounded-full bg-[#0a93bd]/20 blur-3xl" />
      </div>

      <ScrollReveal className="relative max-w-3xl mx-auto text-center">
        <p className="text-2xs tracking-[0.16em] uppercase text-[#5fc9ea] mb-5">
          Build your India AI capability
        </p>
        <h2
          id="final-cta-heading"
          className="text-display-sm md:text-display font-display text-white tracking-tight mb-6"
        >
          Start with one team. Scale into an AI GCC.
        </h2>
        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
          Whether you are testing the India model with an initial AI squad or designing a
          full capability center, NeoIntelli can help define the right starting model and
          build the operating path around it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            onClick={() => trackEvent("cta_click", { location: "final_plan_ai_gcc" })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm bg-white text-[#054f67] shadow-lg transition-all duration-300 hover:bg-white/95 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1320]"
          >
            Plan My AI GCC
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/gcc-cost-calculator"
            onClick={() => trackEvent("cta_click", { location: "final_cost_calculator" })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm border border-white/30 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1320]"
          >
            Calculate GCC Cost
          </Link>
          <Link
            to="/services/micro-gcc"
            onClick={() => trackEvent("cta_click", { location: "final_micro_gcc" })}
            className="inline-flex items-center gap-1.5 text-sm text-cyan-100 underline underline-offset-4 decoration-cyan-100/40 rounded-sm transition-colors duration-300 hover:text-white hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1320]"
          >
            Explore AI Micro GCC
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
