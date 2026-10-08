import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const GccStoryCanvas = dynamic(() => import("../animations/GccStoryCanvas"), { ssr: false });

interface Crumb {
  name: string;
  href?: string;
}

interface CtaProps {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  /** Optional substring of title to render in teal accent color */
  accent?: string;
  description: string;
  breadcrumbs?: Crumb[];
  /** Small teal eyebrow above the headline */
  eyebrow?: string;
  centered?: boolean;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  tertiaryLink?: CtaProps;
}

function renderTitle(title: string, accent?: string) {
  if (!accent) return title;
  const idx = title.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + accent.length);
  const after = title.slice(idx + accent.length);
  return (
    <>
      {before}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-200">
        {match}
      </span>
      {after}
    </>
  );
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function CtaLink({ cta, className }: { cta: CtaProps; className: string }) {
  const content = (
    <>
      {cta.label}
      <ArrowRight className="w-4 h-4" />
    </>
  );
  if (isExternal(cta.href)) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link to={cta.href} className={className}>
      {content}
    </Link>
  );
}

export default function PageHero({
  title,
  accent,
  description,
  breadcrumbs,
  eyebrow,
  centered = true,
  primaryCta,
  secondaryCta,
  tertiaryLink,
}: PageHeroProps) {
  return (
    <>
      <section className={`relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 overflow-hidden ${centered ? "text-center" : ""}`}>
        {/* GccStoryCanvas as background */}
        <GccStoryCanvas className="-z-10" />

        {/* Soft brand-tinted backdrop */}
        <div aria-hidden className="absolute inset-0 -z-20"
          style={{
            background: "radial-gradient(circle at center, #11abdb 0%, #0a93bd 55%, #07799c 100%)",
          }}
        >
          {/* Grid dots pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
              backgroundPosition: "center center"
            }}
          />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Breadcrumbs - placed relative in the hero section */}
        {breadcrumbs && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-10 z-20 hidden md:block">
            <nav className="flex items-center justify-center gap-1 text-2xs tracking-[0.16em] uppercase text-white/60">
              {breadcrumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-white/30" />}
                  {c.href ? (
                    <Link to={c.href} className="transition-colors hover:text-white">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-white/80">{c.name}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}

        <div className="max-w-4xl mx-auto relative z-10 pt-4">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="text-cyan-200 text-sm tracking-[0.16em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                {eyebrow}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-hero-sm md:text-hero inner-page-hero font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          >
            {renderTitle(title, accent)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`text-slate-100/90 text-lg md:text-body-lg max-w-2xl leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)] ${centered ? "mx-auto" : ""}`}
          >
            {description}
          </motion.p>

          {(primaryCta || secondaryCta || tertiaryLink) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className={`mt-8 flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}
            >
              {primaryCta && (
                <CtaLink
                  cta={primaryCta}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 bg-white hover:bg-white/95 text-[#054f67] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                />
              )}
              {secondaryCta && (
                <CtaLink
                  cta={secondaryCta}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm transition-all duration-300 border border-white/30 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm hover:-translate-y-0.5 transform"
                />
              )}
              {tertiaryLink && (
                <div className={`w-full ${centered ? "text-center" : ""} mt-3`}>
                  {isExternal(tertiaryLink.href) ? (
                    <a
                      href={tertiaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-200 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {tertiaryLink.label} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={tertiaryLink.href}
                      className="text-cyan-200 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {tertiaryLink.label} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
