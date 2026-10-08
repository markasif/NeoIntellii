import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { HOME_INDUSTRIES } from "@/data/homepage";

/**
 * Section 14. Industries sit below the AI GCC proposition, and each card names
 * the kind of mandate a center in that sector would own rather than making a
 * generic sector claim.
 */
export default function HomeIndustries() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="bg-white py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="max-w-2xl mb-12 md:mb-14">
          <p className="eyebrow mb-5">Industries</p>
          <h2
            id="industries-heading"
            className="text-display-sm md:text-display font-display text-heading tracking-tight"
          >
            AI GCCs built around the industry mandate.
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          stagger={0.06}
        >
          {HOME_INDUSTRIES.map((industry) => (
            <motion.div key={industry.title} variants={staggerItem} className="h-full">
              <Link
                to={industry.href}
                className="group flex flex-col h-full p-6 md:p-7 rounded-2xl bg-white border border-[#0e1320]/[0.07] transition-shadow duration-300 hover:shadow-[0_20px_50px_-28px_rgba(14,19,32,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
              >
                <h3 className="text-heading font-display text-lg leading-snug tracking-tight mb-2.5">
                  {industry.title}
                </h3>
                <p className="text-body text-sm leading-relaxed mb-6">{industry.mandate}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[#077fa4] text-sm">
                  Explore {industry.title} GCC
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.15} className="mt-12">
          <Link
            to="/industries"
            className="link-arrow rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2"
          >
            Explore every industry we serve <ChevronRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
