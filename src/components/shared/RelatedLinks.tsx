import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getPageMeta } from "@/lib/pageMeta";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/animations";

interface RelatedLink {
 name: string;
 href: string;
}

export default function RelatedLinks({ links }: { links: RelatedLink[] }) {
 if (!links?.length) return null;
 return (
 <section className="py-14 md:py-20 px-6 sm:px-8 lg:px-12 border-t border-black/[0.04]">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="mb-8">
 <p className="text-2xs tracking-[0.16em] uppercase text-section-label mb-2">Related</p>
 <h2 className="text-2xl md:text-3xl font-display text-heading">
 Continue exploring
 </h2>
 </ScrollReveal>
 <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.06}>
 {links.map((l) => {
 const meta = getPageMeta(l.href, l.name);
 return (
 <motion.div key={l.href + l.name} variants={staggerItem}>
 <Link
 to={l.href}
 className="group flex flex-col h-full p-6 rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] duration-300"
 >
 <p className="text-2xs uppercase tracking-[0.16em] text-body-muted mb-3">
 Related page
 </p>
 <h3 className="text-heading font-display text-lg mb-2 leading-snug">
 {meta.title}
 </h3>
 {meta.description && (
 <p className="text-body text-sm leading-relaxed line-clamp-2 mb-5">
 {meta.description}
 </p>
 )}
 <span className="mt-auto inline-flex items-center gap-1.5 text-[#077fa4] text-sm">
 Read about {meta.title} <ChevronRight className="w-3.5 h-3.5"/>
 </span>
 </Link>
 </motion.div>
 );
 })}
 </StaggerContainer>
 </div>
 </section>
 );
}
