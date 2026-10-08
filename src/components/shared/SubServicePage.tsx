import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelatedLinks from "@/components/shared/RelatedLinks";
import { PricingFootnote } from "@/components/shared/PricingDisclaimer";
import HeroBackground from "@/components/shared/HeroBackground";
import { ScrollReveal, StaggerContainer, staggerItem, TextReveal } from "@/components/animations";

interface FAQ { q: string; a: string; }
interface Deliverable { title: string; desc: string; }
interface Metric { value: string; label: string; }
interface Pitfall { title: string; desc: string; }

interface SubServicePageProps {
 pageTitle: string;
 title: string;
 subtitle: string;
 description: string;
 breadcrumbs: { name: string; href?: string }[];
 /** Large statement */
 intro?: string;
 introMuted?: string;
 /** SEO meta description */
 metaDescription?: string;
 /** Long-form context block placed right after the intro */
 whyItMatters?: { title?: string; paragraphs: string[] };
 /** Stat band shown under the hero */
 metricsBand?: Metric[];
 /** Deliverables / scope items */
 deliverables?: Deliverable[];
 deliverablesLabel?: string;
 deliverablesTitle?: string;
 /** Approach steps */
 approach?: { step: string; title: string; desc: string }[];
 approachTitle?: string;
  /** @deprecated - no longer rendered */
  useCases?: string[];
  /** @deprecated - no longer rendered */
  useCasesTitle?: string;
 /** Common pitfalls cards */
 pitfalls?: { title?: string; intro?: string; items: Pitfall[] };
 /** Measurable outcomes / what success looks like */
 successMetrics?: { title?: string; items: string[] };
 /** Related industries chip row */
 industries?: { title?: string; items: { name: string; href: string }[] };
 /** Dark section content */
 darkTitle?: string;
 darkDescription?: string;
 darkPoints?: string[];
 /** FAQs */
 faqs?: FAQ[];
 /** Renders the shared starting-price footnote. Set on any page that quotes a fee. */
 pricingNote?: boolean;
 /** Related links */
 relatedLinks?: { name: string; href: string }[];
 /** CTA */
 ctaTitle?: string;
 ctaDescription?: string;
}

export default function SubServicePage({
 pageTitle,
 title,
 subtitle,
 description,
 breadcrumbs,
 intro,
 introMuted,
 metaDescription,
 whyItMatters,
 metricsBand,
 deliverables = [],
 deliverablesLabel ="Deliverables",
 deliverablesTitle ="What we deliver",
 approach = [],
 approachTitle ="Our approach",
 pitfalls,
 successMetrics,
 industries,
 darkTitle,
 darkDescription,
 darkPoints = [],
 faqs = [],
 pricingNote = false,
 relatedLinks = [],
 ctaTitle ="Ready to get started?",
 ctaDescription ="Speak with our team about your specific needs.",
}: SubServicePageProps) {
 useEffect(() => {
  document.title = pageTitle;
  if (metaDescription) {
   let tag = document.querySelector('meta[name="description"]');
   if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
   }
   tag.setAttribute('content', metaDescription);
  }
 }, [pageTitle, metaDescription]);

 const faqSchema = faqs.length > 0 ? {
 "@context":"https://schema.org",
 "@type":"FAQPage",
  mainEntity: faqs.map((f) => ({
 "@type":"Question",
   name: f.q,
   acceptedAnswer: {"@type":"Answer", text: f.a },
  })),
 } : null;

 return (
 <div className="min-h-screen bg-white">
 <Navbar />

 {faqSchema && (
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 )}

 {/* Hero */}
 <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
 <HeroBackground />

 {/* Breadcrumbs inside hero */}
 <div className="absolute top-[68px] left-0 right-0 px-6 sm:px-8 lg:px-12">
 <div className="max-w-[1120px] mx-auto">
 <nav className="flex items-center gap-0.5 text-2xs text-white/40 flex-wrap">
 {breadcrumbs.map((c, i) => (
 <span key={i} className="flex items-center gap-0.5">
 {i > 0 && <ChevronRight className="w-2 h-2 text-white/25"/>}
 {c.href
 ? <Link to={c.href} className="hover:text-white/70 transition-colors">{c.name}</Link>
 : <span className="text-white/50">{c.name}</span>}
 </span>
 ))}
 </nav>
 </div>
 </div>

 <div className="max-w-4xl mx-auto relative z-10">
 <motion.p
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="text-cyan-200 text-sm tracking-[0.16em] uppercase mb-5"
 >
 {subtitle}
 </motion.p>
 <motion.h1
 initial={{ opacity: 0, y: 30, filter:"blur(10px)"}}
 animate={{ opacity: 1, y: 0, filter:"blur(0px)"}}
 transition={{ duration: 0.7, delay: 0.1 }}
 className="text-hero-sm md:text-hero inner-page-hero font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
 >
 {title}
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="text-slate-100/90 text-lg md:text-body-lg max-w-2xl mx-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
 >
 {description}
 </motion.p>
 </div>
 </section>

 {/* Metrics band */}
 {metricsBand && metricsBand.length > 0 && (
 <section className="px-6 sm:px-8 lg:px-12 pb-10">
 <div className="max-w-5xl mx-auto bg-[#f5f5f7] rounded-2xl p-6 md:p-7">
 <div className={`grid sm:grid-cols-2 lg:grid-cols-${Math.min(metricsBand.length, 4)} gap-4 text-center`}>
 {metricsBand.map((m) => (
 <div key={m.label}>
 <p className="text-2xl font-display text-heading">{m.value}</p>
 <p className="text-sm text-body">{m.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* Intro */}
 {intro && (
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <TextReveal className="max-w-4xl mx-auto text-display-sm md:text-[2.75rem] font-display text-heading leading-[1.12]">
 {intro}{""}
 {introMuted && <span className="text-body-muted"> {introMuted}</span>}
 </TextReveal>
 </section>
 )}

 {/* Why it matters */}
 {whyItMatters && whyItMatters.paragraphs.length > 0 && (
 <section className="pb-20 md:pb-28 px-6 sm:px-8 lg:px-12">
 <ScrollReveal className="max-w-4xl mx-auto">
 <h2 className="text-display-sm font-display text-heading mb-6">{whyItMatters.title ??"Why this matters now"}</h2>
 {whyItMatters.paragraphs.map((p, i) => (
 <p key={i} className="text-body text-base leading-relaxed mb-5 last:mb-0">{p}</p>
 ))}
 </ScrollReveal>
 </section>
 )}

 {/* Deliverables */}
 {deliverables.length > 0 && (
 <section className="pb-24 md:pb-36 px-6 sm:px-8 lg:px-12">
 <div className="max-w-6xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <p className="text-2xs tracking-[0.16em] uppercase text-section-label mb-4">{deliverablesLabel}</p>
 <h2 className="text-display-sm md:text-display font-display text-heading">{deliverablesTitle}</h2>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
 {deliverables.map((d, i) => (
 <motion.div
 key={i}
 variants={staggerItem}
 className="p-8 rounded-2xl bg-[#f5f5f7] h-full"
 >
 <p className="text-xs text-body-muted mb-5">0{i + 1}</p>
 <h3 className="text-heading font-display text-lg mb-3">{d.title}</h3>
 <p className="text-body text-sm leading-relaxed">{d.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>
 )}

 {/* Approach */}
 {approach.length > 0 && (
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-5xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-heading">{approachTitle}</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-0" stagger={0.1}>
 {approach.map((a, i) => (
 <motion.div
 key={i}
 variants={staggerItem}
 className="grid md:grid-cols-[80px_1fr] gap-6 py-10 border-b border-black/[0.04] last:border-0"
 >
 <p className="text-5xl font-display text-[#f0f0f0]">{a.step}</p>
 <div>
 <h3 className="text-heading font-display text-lg mb-2">{a.title}</h3>
 <p className="text-body text-sm leading-relaxed">{a.desc}</p>
 </div>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>
 )}

 {/* Pitfalls */}
 {pitfalls && pitfalls.items.length > 0 && (
 <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-5xl mx-auto">
 <ScrollReveal className="max-w-3xl mb-12">
 <h2 className="text-display-sm font-display text-heading mb-4">{pitfalls.title ??"Common pitfalls we help you avoid"}</h2>
 {pitfalls.intro && <p className="text-body text-base leading-relaxed">{pitfalls.intro}</p>}
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.06}>
 {pitfalls.items.map((p) => (
 <motion.div key={p.title} variants={staggerItem} className="p-6 rounded-2xl border border-black/[0.06] bg-white">
 <h3 className="text-heading font-display text-lg mb-2">{p.title}</h3>
 <p className="text-body text-sm leading-relaxed">{p.desc}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>
 )}

 {/* Success metrics */}
 {successMetrics && successMetrics.items.length > 0 && (
 <section className="bg-[#f5f5f7] py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto">
 <ScrollReveal className="text-center mb-12">
 <h2 className="text-display-sm font-display text-heading">{successMetrics.title ??"What success looks like"}</h2>
 </ScrollReveal>
 <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.06}>
 {successMetrics.items.map((s) => (
 <motion.div key={s} variants={staggerItem} className="flex items-start gap-4 p-6 rounded-2xl bg-white">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"/>
 <p className="text-heading text-sm">{s}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 </div>
 </section>
 )}

 {/* Dark section */}
 {darkTitle && (
 <section className="bg-footer-cta dark-section py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm md:text-display font-display text-white mb-5">{darkTitle}</h2>
 {darkDescription && <p className="text-white/50 text-lg max-w-2xl mx-auto">{darkDescription}</p>}
 </ScrollReveal>
 {darkPoints.length > 0 && (
 <StaggerContainer className="grid md:grid-cols-2 gap-4" stagger={0.06}>
 {darkPoints.map((p) => (
 <motion.div key={p} variants={staggerItem} className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.04]">
 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"/>
 <p className="text-white/70 text-sm">{p}</p>
 </motion.div>
 ))}
 </StaggerContainer>
 )}
 </div>
 </section>
 )}

 {/* Industries chip row */}
 {industries && industries.items.length > 0 && (
 <section className="py-20 px-6 sm:px-8 lg:px-12">
 <div className="max-w-5xl mx-auto">
 <h2 className="text-display-sm font-display text-heading mb-4">{industries.title ??"Industries we support"}</h2>
 <div className="flex flex-wrap gap-3">
 {industries.items.map((i) => (
 <Link key={i.name} to={i.href} className="text-sm px-4 py-2 rounded-full bg-white border border-black/[0.06] transition-colors hover:bg-[#f5f5f7]">{i.name}</Link>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* FAQs */}
 {faqs.length > 0 && (
 <section className="bg-[#f5f5f7] py-20 md:py-28 px-6 sm:px-8 lg:px-12">
 <div className="max-w-3xl mx-auto">
 <ScrollReveal className="text-center mb-16">
 <h2 className="text-display-sm font-display text-heading">Frequently asked questions</h2>
 </ScrollReveal>
 <StaggerContainer className="space-y-3" stagger={0.06}>
 {faqs.map((faq) => (
 <motion.details key={faq.q} variants={staggerItem} className="group bg-white rounded-2xl transition-shadow duration-300">
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
 )}

 {pricingNote && <PricingFootnote />}

 {relatedLinks.length > 0 && <RelatedLinks links={relatedLinks} />}

 <Footer />
 </div>
 );
}
