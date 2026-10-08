import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface RelatedItem { path: string; name: string; anchor: string; summary?: string }

/** Three to five contextual links with descriptive anchor text. */
export default function RelatedServices({ title, items, headingId }: { title: string; items: RelatedItem[]; headingId: string }) {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-14 md:py-20 bg-white border-t border-black/[0.04]" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto">
        <h2 id={headingId} className="text-2xl md:text-3xl font-display text-heading mb-8">{title}</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          {items.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="group flex flex-col h-full p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-[#0e92b8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e92b8]">
                <span className="text-heading font-display text-lg mb-2">{item.name}</span>
                {item.summary && <span className="text-body text-sm leading-relaxed mb-4">{item.summary}</span>}
                <span className="mt-auto inline-flex items-center gap-1.5 text-[#077fa4] text-sm">{item.anchor} <ChevronRight className="w-3.5 h-3.5" aria-hidden /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
