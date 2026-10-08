import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroBackground from "@/components/shared/HeroBackground";

export interface HeroCta { label: string; href: string }
export interface Crumb { name: string; href?: string }

export interface ServiceHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  tertiaryLink?: HeroCta;
}

const CtaLink = ({ cta, className }: { cta: HeroCta; className: string }) =>
  cta.href.startsWith("http") ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
      {cta.label} <ArrowRight className="w-4 h-4" aria-hidden />
    </a>
  ) : (
    <Link to={cta.href} className={className}>
      {cta.label} <ArrowRight className="w-4 h-4" aria-hidden />
    </Link>
  );

/**
 * Hero shared by the AI GCC and AI Talent sections. Breadcrumbs are real
 * links and mirror the BreadcrumbList emitted by SEOHead.
 */
export default function ServiceHero({ crumbs, eyebrow, title, description, primaryCta, secondaryCta, tertiaryLink }: ServiceHeroProps) {
  return (
    <header className="relative isolate pt-24 pb-14 md:pt-32 md:pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden">
      <HeroBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1 text-2xs text-white/70 flex-wrap">
            {crumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="w-3 h-3 text-white/40" aria-hidden />}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded">
                    {crumb.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="text-cyan-100 text-2xs md:text-sm tracking-[0.16em] uppercase mb-5">{eyebrow}</p>
        <h1 className="text-hero-sm md:text-hero inner-page-hero font-display text-white mb-6 max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">{title}</h1>
        <p className="text-slate-100/90 text-lg md:text-body-lg max-w-3xl mb-9 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]">{description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <CtaLink cta={primaryCta} className="btn-primary" />
          {secondaryCta && <CtaLink cta={secondaryCta} className="btn-ghost-white" />}
        </div>
        {tertiaryLink && (
          <p className="mt-6 text-sm">
            <Link to={tertiaryLink.href} className="text-white/85 underline underline-offset-4 decoration-white/40 hover:text-white">{tertiaryLink.label}</Link>
          </p>
        )}
      </div>
    </header>
  );
}
