import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";

interface FAQ {
 q: string;
 a: string;
}

interface FAQSectionProps {
 faqs: FAQ[];
 title?: string;
 bgClass?: string;
 itemBgClass?: string;
}

export default function FAQSection({
 faqs,
 title ="Frequently asked questions",
 bgClass ="bg-[#f5f5f7]",
 itemBgClass ="bg-white",
}: FAQSectionProps) {
 return (
 <section className={`${bgClass} py-20 md:py-28 px-6 sm:px-8 lg:px-12`}>
 <div className="max-w-3xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm font-display text-heading">{title}</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-3" stagger={0.06}>
 {faqs.map((faq) => (
 <motion.details
 key={faq.q}
 variants={staggerItem}
 className={`group ${itemBgClass} rounded-2xl transition-shadow duration-300`}
 >
 <summary className="flex items-center justify-between p-6 cursor-pointer text-sm text-heading">
 {faq.q}
 <ChevronRight className="w-4 h-4 text-body-muted shrink-0 ml-4 transition-transform duration-300 group-open:rotate-90"/>
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
