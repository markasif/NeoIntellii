import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
 name: string;
 href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
 return (
 <div className="pt-[61px] px-6 sm:px-8 lg:px-12">
 <div className="max-w-[1120px] mx-auto">
 <nav className="flex items-center gap-0.5 text-2xs text-gray-300/40 flex-wrap">
 {items.map((c, i) => (
 <span key={i} className="flex items-center gap-0.5">
 {i > 0 && <ChevronRight className="w-2 h-2 text-gray-300/30"/>}
 {c.href ? (
 <Link to={c.href} className="transition-colors">{c.name}</Link>
 ) : (
 <span className="text-gray-300/40">{c.name}</span>
 )}
 </span>
 ))}
 </nav>
 </div>
 </div>
 );
}
