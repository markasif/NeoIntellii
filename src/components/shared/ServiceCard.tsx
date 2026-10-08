import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
 icon: LucideIcon;
 title: string;
 description: string;
 href: string;
 badge?: string;
 gradient?:"primary"|"gold"|"ai"|"cyan";
}

const gradientMap = {
 primary:"gradient-primary",
 gold:"gradient-gold",
 ai:"gradient-ai",
 cyan:"gradient-cyan",
};

const ServiceCard = ({ icon: Icon, title, description, href, badge, gradient ="primary"}: ServiceCardProps) => {
 return (
 <Link
 to={href}
 className="group block rounded-2xl border border-border bg-white p-7 md:p-7 shadow-card transition-colors duration-300 relative overflow-hidden"
 >
 {/* Hover gradient overlay */}
 <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br from-primary/4 to-accent/4"/>

 {badge && (
 <div className="absolute top-5 right-5">
 <span className="badge-gold text-2xs">{badge}</span>
 </div>
 )}

 <div className="relative z-10">
 {/* Icon */}
 <div className={`w-14 h-14 rounded-2xl ${gradientMap[gradient]} flex items-center justify-center mb-5 shadow-premium transition-opacity duration-300 `}>
 <Icon className="w-7 h-7 text-white"/>
 </div>

 <h3 className="text-lg text-heading font-display mb-3 transition-colors">{title}</h3>
 <p className="text-sm text-body leading-relaxed mb-6">{description}</p>

 <span className="inline-flex items-center gap-1.5 text-sm text-primary transition-colors duration-200">
 Explore capability
 <ArrowRight className="w-4 h-4"/>
 </span>
 </div>
 </Link>
 );
};

export default ServiceCard;
