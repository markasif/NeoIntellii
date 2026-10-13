import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { IllustrationKey } from "./ServiceIllustrations";

// Mapping from illustrationKey to image paths
const imageMap: Record<IllustrationKey, string> = {
"gcc-setup-launch":"/images/gcc-setup.webp",
"talent-leadership":"/images/gcc-talent.webp",
"talent-management":"/images/gcc-talent.webp",
"technology-foundation":"/images/gcc-technology.webp",
"technology-infrastructure":"/images/gcc-technology.webp",
"ai-first-gcc":"/images/home-ai-gcc.webp",
"operations-excellence":"/images/gcc-operations.webp",
"compliance-governance":"/images/ai-governance.webp",
"ai-advisory-strategy":"/images/ai-assessment.webp",
"ai-gcc-setup-operations":"/images/ai-coe.webp",
"enterprise-generative-ai":"/images/ai-genai.webp",
"data-engineering":"/images/ai-architecture.webp",
"mlops-llmops":"/images/ai-mlops.webp",
"responsible-ai":"/images/ai-governance.webp",
"product-engineering":"/images/tech-product-engineering.webp",
"data-platform":"/images/tech-data-platform.webp",
"process-automation":"/images/tech-process-automation.webp",
"integration-programs":"/images/tech-integration.webp",
"ai-data-pod":"/images/talent-ai-data-pod.webp",
"engineering-pod":"/images/talent-engineering-pod.webp",
"transformation-pod":"/images/talent-transformation-pod.webp",
"architecture-pod":"/images/talent-architecture-pod.webp",
};

interface IllustratedServiceCardProps {
 illustrationKey: IllustrationKey;
 title: string;
 description: string;
 href: string;
 ctaText?: string;
}

export default function IllustratedServiceCard({
 illustrationKey,
 title,
 description,
 href,
 ctaText,
}: IllustratedServiceCardProps) {
 const imagePath = imageMap[illustrationKey] ||"/images/gcc-setup.webp";

 return (
 <Link to={href} className="group flex h-full flex-col">
 {/* Illustration card */}
 <div className="rounded-2xl bg-[#f5f5f7] mb-5 overflow-hidden aspect-[4/3] transition-all duration-300">
 <img 
 src={imagePath} 
 alt={`${title} - NeoIntelli India GCC service illustration`}
 className="w-full h-full object-cover"
 width={800}
 height={600}
 loading="lazy"
 decoding="async"
 />
 </div>
 {/* Title + Description */}
 <h3 className="text-heading text-[1.5rem] leading-tight tracking-tight text-balance">
 {title}.
 </h3>
 <p className="text-sm leading-relaxed text-body mt-2">
 {description}
 </p>
 <span className="inline-flex items-center gap-1.5 text-primary text-sm mt-4 whitespace-nowrap">
  {ctaText ?? `Explore ${title}`} <ChevronRight className="w-3.5 h-3.5"/>
 </span>
 </Link>
 );
}
