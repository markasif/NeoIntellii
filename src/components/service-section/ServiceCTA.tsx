import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCTAProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  secondary?: { label: string; href: string };
}

/** The one contextual CTA per section page. */
export default function ServiceCTA({ title, description, ctaLabel, href, secondary }: ServiceCTAProps) {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-20 md:py-28 bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto rounded-[12px] bg-white border border-black/[0.06] shadow-[0_30px_70px_-30px_rgba(7,127,164,0.25)] px-8 md:px-14 py-14 md:py-20 text-center">
        <h2 className="text-display-sm md:text-display font-display text-heading mb-5">{title}</h2>
        <p className="text-lg text-body max-w-2xl mx-auto mb-10 leading-relaxed">{description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={href} className="btn-primary">{ctaLabel} <ArrowRight className="w-4 h-4" aria-hidden /></Link>
          {secondary && <Link to={secondary.href} className="btn-outline">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}
