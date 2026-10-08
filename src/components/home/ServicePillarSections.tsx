import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { trackEvent } from "@/lib/analytics";
import {
  SERVICE_PILLAR_SECTIONS,
  type PillarAside,
  type ServicePillarSection,
} from "@/data/homepage";

/**
 * Sections 4 to 9: the six pillars, in lifecycle order, sharing one design
 * system so they read as layers of a single offering rather than a grid of
 * unrelated service cards. AI GCC is first and rendered on the dark blue surface,
 * which is the only visual difference between it and the five that follow.
 *
 * Each section explains the category, shows a handful of capabilities and
 * carries exactly one primary CTA to the pillar page. Depth stays on the
 * child pages: the homepage does not restate them.
 */
export default function ServicePillarSections() {
  return (
    <>
      {SERVICE_PILLAR_SECTIONS.map((pillar, index) => (
        <PillarSection key={pillar.key} pillar={pillar} index={index} />
      ))}
    </>
  );
}

function PillarSection({ pillar, index }: { pillar: ServicePillarSection; index: number }) {
  const flagship = index === 0;
  // Alternate the surface below the flagship so consecutive sections stay distinct.
  const surface = flagship
    ? "bg-[#0f4f8f]"
    : index % 2 === 1
      ? "bg-white"
      : "bg-[#f5f5f7]";
  // Media order flips on alternating sections so the page does not read as one column.
  const asideFirst = !flagship && index % 2 === 0;

  return (
    <section
      id={pillar.id}
      aria-labelledby={`${pillar.id}-heading`}
      className={`relative overflow-hidden py-20 md:py-28 px-6 sm:px-8 lg:px-12 ${surface}`}
    >
      {flagship && (
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-grid-ink bg-grid-fade opacity-[0.12]" />
          <div className="absolute -top-40 left-1/3 w-[560px] h-[560px] rounded-full bg-[#0a93bd]/20 blur-3xl" />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <ScrollReveal className={asideFirst ? "lg:order-2" : undefined}>
          <p
            className={`text-2xs tracking-[0.16em] uppercase mb-5 ${
              flagship ? "text-[#5fc9ea]" : "text-[#077fa4]"
            }`}
          >
            {pillar.eyebrow}
          </p>

          <h2
            id={`${pillar.id}-heading`}
            className={`font-display tracking-tight mb-4 ${
              flagship
                ? "text-[2.4rem] sm:text-[3rem] leading-[1.06] text-white"
                : "text-display-sm md:text-display text-heading"
            }`}
          >
            {pillar.name}
          </h2>

          <p
            className={`font-display text-[1.3rem] md:text-[1.5rem] leading-snug tracking-tight mb-5 ${
              flagship ? "text-white/90" : "text-heading/85"
            }`}
          >
            {pillar.headline}
          </p>

          <p
            className={`text-sm md:text-base leading-relaxed mb-8 max-w-xl ${
              flagship ? "text-white/70" : "text-body"
            }`}
          >
            {pillar.body}
          </p>

          <ul className="space-y-2.5 mb-9">
            {pillar.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className={`shrink-0 mt-[3px] inline-flex items-center justify-center w-4 h-4 rounded-full ${
                    flagship ? "bg-[#0a93bd]/30 text-[#5fc9ea]" : "bg-[#0a93bd]/10 text-[#0a93bd]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                </span>
                <span
                  className={`text-sm leading-snug ${
                    flagship ? "text-white/80" : "text-body"
                  }`}
                >
                  {capability}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              to={pillar.href}
              onClick={() => trackEvent("cta_click", { location: pillar.event })}
              className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                flagship
                  ? "bg-white text-[#054f67] shadow-lg hover:bg-white/95 hover:shadow-xl focus-visible:ring-white focus-visible:ring-offset-[#0f4f8f]"
                  : "bg-[#0a93bd] text-white shadow-lg hover:bg-[#0988af] hover:shadow-xl focus-visible:ring-[#0a93bd]"
              }`}
            >
              {pillar.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {pillar.secondary && (
              <Link
                to={pillar.secondary.href}
                className={`inline-flex items-center gap-1.5 text-sm rounded-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  flagship
                    ? "text-cyan-100 hover:text-white focus-visible:ring-white focus-visible:ring-offset-[#0f4f8f]"
                    : "text-[#077fa4] hover:text-[#054f67] focus-visible:ring-[#0a93bd]"
                }`}
              >
                <span className="border-b border-current/40 pb-0.5">{pillar.secondary.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className={asideFirst ? "lg:order-1" : undefined}>
          <PillarAsideBlock aside={pillar.aside} flagship={flagship} />
        </ScrollReveal>
      </div>
    </section>
  );
}

function PillarAsideBlock({ aside, flagship }: { aside: PillarAside; flagship: boolean }) {
  const shell = flagship
    ? "rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-sm p-6 sm:p-8"
    : "rounded-2xl border border-[#0e1320]/[0.07] bg-white p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgba(14,19,32,0.28)]";
  const titleColor = flagship ? "text-white" : "text-heading";
  const bodyColor = flagship ? "text-white/70" : "text-body";

  return (
    <div className={shell}>
      <h3 className={`font-display text-[1.15rem] md:text-[1.3rem] leading-snug tracking-tight mb-4 ${titleColor}`}>
        {aside.title}
      </h3>

      {aside.kind === "definition" || aside.kind === "statement" ? (
        <div className="space-y-3.5">
          {aside.body?.map((paragraph) => (
            <p key={paragraph} className={`text-sm leading-relaxed ${bodyColor}`}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {aside.kind === "flow" && aside.steps ? (
        <>
          <ol className="space-y-0">
            {aside.steps.map((step, i) => (
              <li key={step}>
                <div
                  className={`flex items-center gap-3.5 rounded-xl px-4 py-3 ${
                    flagship
                      ? "border border-white/10 bg-white/[0.06]"
                      : "border border-[#0e1320]/[0.07] bg-[#f8fbfd]"
                  }`}
                >
                  <span
                    className={`shrink-0 font-mono text-2xs ${
                      flagship ? "text-[#5fc9ea]" : "text-[#0a93bd]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-sm leading-snug ${flagship ? "text-white/90" : "text-heading"}`}>
                    {step}
                  </span>
                </div>
                {i < aside.steps.length - 1 && (
                  <span aria-hidden className="flex justify-center py-1.5">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" role="presentation">
                      <path
                        d="M5 0V9M5 13L1 8M5 13L9 8"
                        stroke={flagship ? "rgba(255,255,255,0.35)" : "rgba(10,147,189,0.45)"}
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ol>
          {aside.body?.map((note) => (
            <p key={note} className={`text-xs leading-relaxed mt-5 ${bodyColor}`}>
              {note}
            </p>
          ))}
        </>
      ) : null}

      {aside.kind === "models" && aside.models ? (
        <StaggerContainer className="space-y-2.5" stagger={0.08}>
          {aside.models.map((model) => (
            <motion.div key={model.name} variants={staggerItem}>
              <Link
                to={model.href}
                className={`group flex flex-col rounded-xl px-4 py-3.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  flagship
                    ? "border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] focus-visible:ring-white focus-visible:ring-offset-[#0f4f8f]"
                    : "border border-[#0e1320]/[0.07] bg-[#f8fbfd] hover:border-[#0a93bd]/35 focus-visible:ring-[#0a93bd]"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1.5 text-sm leading-snug ${
                    flagship ? "text-white" : "text-heading"
                  }`}
                >
                  {model.name}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className={`text-xs leading-snug mt-0.5 ${bodyColor}`}>
                  {model.summary}
                </span>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      ) : null}
    </div>
  );
}
