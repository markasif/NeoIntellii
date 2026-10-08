import { Link } from "react-router-dom";

export interface SubnavItem { key: string; path: string; label: string }

/**
 * Section subnavigation: real anchor links, horizontally scrollable on small
 * screens, wrapping on large ones, current page marked with aria-current.
 */
export default function ServiceSubnav({ ariaLabel, items, current }: { ariaLabel: string; items: SubnavItem[]; current: string }) {
  return (
    <nav aria-label={ariaLabel} className="border-b border-black/[0.06] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <ul className="flex gap-1 overflow-x-auto whitespace-nowrap py-2 -mx-1 px-1 [scrollbar-width:thin] snap-x lg:flex-wrap lg:overflow-visible">
          {items.map((item) => {
            const active = item.key === current;
            return (
              <li key={item.key} className="snap-start shrink-0">
                <Link
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center px-3.5 py-2 rounded-full text-xs md:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e92b8] ${active ? "bg-[#0e92b8] text-white" : "text-heading hover:bg-[#f5f5f7]"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
