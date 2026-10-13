import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { IllustrationKey } from "./ServiceIllustrations";

// Mapping from illustrationKey to image paths
const imageMap: Record<IllustrationKey, string> = {
"gcc-setup-launch":"/images/services/gcc/gcc-setup.webp",
"talent-leadership":"/images/services/gcc/gcc-talent.webp",
"talent-management":"/images/services/gcc/gcc-talent.webp",
"technology-foundation":"/images/services/gcc/gcc-technology.webp",
"technology-infrastructure":"/images/services/gcc/gcc-technology.webp",
"ai-first-gcc":"/images/home/home-ai-gcc.webp",
"operations-excellence":"/images/services/gcc-operations/gcc-operations.webp",
"compliance-governance":"/images/services/ai-gcc/ai-governance.webp",
"ai-advisory-strategy":"/images/home/ai-assessment.webp",
"ai-gcc-setup-operations":"/images/home/ai-coe.webp",
"enterprise-generative-ai":"/images/services/ai-gcc/Futuristic AI Governance Command Center.webp",
"data-engineering":"/images/services/ai-gcc/ai-architecture.webp",
"mlops-llmops":"/images/services/ai-gcc/ai-mlops.webp",
"responsible-ai":"/images/services/ai-gcc/ai-governance.webp",
"product-engineering":"/images/industries/tech-product-engineering.webp",
"data-platform":"/images/industries/tech-data-platform.webp",
"process-automation":"/images/industries/tech-process-automation.webp",
"integration-programs":"/images/industries/tech-integration.webp",
"ai-data-pod":"/images/services/ai-talent/talent-ai-data-pod.webp",
"engineering-pod":"/images/services/ai-talent/talent-engineering-pod.webp",
"transformation-pod":"/images/services/ai-talent/talent-transformation-pod.webp",
"architecture-pod":"/images/services/ai-talent/talent-architecture-pod.webp",
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
 const imagePath = imageMap[illustrationKey] ||"/images/services/gcc/gcc-setup.webp";

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
