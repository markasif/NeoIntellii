import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";
import { HOME_FAQS } from "@/data/homepage";

/**
 * Section 17. Answer-first questions, each opening with a direct answer before
 * the context. They are rendered as native <details> so the text is present in
 * the HTML whether or not the panel is open: the point is extractable answers
 * for readers and answer engines, not rich-result markup.
 */
export default function HomeFaq() {
  return (
    <section
      aria-labelledby="home-faq-heading"
      className="bg-[#f5f5f7] py-20 md:py-28 px-6 sm:px-8 lg:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="mb-12 md:mb-14">
          <p className="eyebrow mb-5">AI GCC questions</p>
          <h2
            id="home-faq-heading"
            className="text-display-sm md:text-display font-display text-heading tracking-tight"
          >
            AI GCC questions, answered.
          </h2>
        </ScrollReveal>

        <StaggerContainer className="space-y-3" stagger={0.05}>
          {HOME_FAQS.map((faq) => (
            <motion.details
              key={faq.q}
              variants={staggerItem}
              className="group bg-white rounded-2xl"
            >
              <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer text-sm md:text-base text-heading leading-snug rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a93bd] focus-visible:ring-offset-2">
                <h3 className="font-normal">{faq.q}</h3>
                <ChevronRight
                  aria-hidden
                  className="w-4 h-4 text-body-muted shrink-0 mt-1 transition-transform duration-300 group-open:rotate-90"
                />
              </summary>
              <div className="px-6 pb-6 -mt-1">
                <p className="text-body text-sm leading-relaxed">{faq.a}</p>
              </div>
            </motion.details>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
