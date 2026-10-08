import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CAL_BOOKING_URL } from "@/lib/constants";
import { ScrollReveal } from "@/components/animations";

interface CTABannerProps {
 title?: string;
 description?: string;
 buttonText?: string;
 buttonLink?: string;
 secondaryText?: string;
 secondaryLink?: string;
 dark?: boolean;
}

export default function CTABanner({
 title ="Ready to build your next capability center?",
 description ="Speak with our team for a practical roadmap.",
 buttonText ="Speak to a GCC Advisor",
 buttonLink = CAL_BOOKING_URL,
 secondaryText,
 secondaryLink ="/case-studies",
 dark = false,
}: CTABannerProps) {
 void dark;
 const PrimaryBtn = buttonLink.startsWith("http") ? (
 <a
 href={buttonLink}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-primary"
 >
 {buttonText}
 <ArrowRight className="w-4 h-4 transition-transform"/>
 </a>
 ) : (
 <Link
 to={buttonLink}
 className="btn-primary"
 >
 {buttonText}
 <ArrowRight className="w-4 h-4 transition-transform"/>
 </Link>
 );

 return (
 <section
 className="relative overflow-hidden py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]"
 >
 <ScrollReveal className="relative max-w-5xl mx-auto">
 <div className="relative overflow-hidden rounded-[12px] bg-white border border-black/[0.06] shadow-[0_30px_70px_-30px_rgba(7,127,164,0.25)] px-8 md:px-14 py-14 md:py-20 text-center">
 <div
 className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-[80px]"
 style={{ background:"#0e92b8"}}
 />
 <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-[#f5f5f7] px-3 py-1 text-2xs uppercase tracking-[0.16em] text-body-muted mb-6">
 <span className="w-1.5 h-1.5 rounded-full bg-[#0e92b8]"/> Let's build together
 </span>
 <h2 className="text-display-sm md:text-display font-display mb-5 text-heading">
 {title}
 </h2>
 <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed text-body">
 {description}
 </p>
 <div className="relative flex flex-wrap justify-center gap-3">
 {PrimaryBtn}
 {secondaryText && (
 <Link to={secondaryLink} className="btn-outline">
 {secondaryText}
 </Link>
 )}
 </div>
 </div>
 </ScrollReveal>
 </section>
 );
}
