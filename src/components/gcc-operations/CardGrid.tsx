import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface CardItem {
  title: string;
  desc?: ReactNode;
  href?: string;
  linkLabel?: string;
  eyebrow?: string;
}

interface CardGridProps {
  items: CardItem[];
  columns?: 2 | 3 | 4;
  tone?: "white" | "muted";
  compact?: boolean;
  as?: "div" | "ul";
}

const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** Responsive card grid. Cards stack on mobile. Link cards are real anchors. */
export default function CardGrid({ items, columns = 3, tone = "muted", compact = false, as = "div" }: CardGridProps) {
  const cardClass = `flex flex-col h-full rounded-2xl bg-white/95 backdrop-blur-sm border border-[#0D306C]/10 shadow-[0_4px_24px_rgba(13,48,108,0.05)] hover:shadow-[0_12px_32px_rgba(13,48,108,0.09)] hover:border-[#169DC8]/30 transition-all duration-300 ${
    compact ? "p-5 sm:p-6" : "p-6 sm:p-7"
  }`;
  const Wrapper = as;
  const Item = as === "ul" ? "li" : "div";
  return (
    <Wrapper className={`grid gap-4 sm:gap-6 ${COLS[columns]}`}>
      {items.map((item) => {
        const body = (
          <>
            {item.eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#008EC4] mb-2.5">{item.eyebrow}</p>}
            <h3 className={`text-[#0D306C] font-extrabold ${compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"} mb-2`}>
              {item.title}
            </h3>
            {item.desc && <div className="text-[#505D74] text-xs sm:text-sm leading-relaxed">{item.desc}</div>}
          </>
        );
        return (
          <Item key={item.title} className="h-full">
            {item.href ? (
              <Link
                to={item.href}
                className={`${cardClass} group hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2`}
              >
                {body}
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[#008EC4] font-semibold text-sm group-hover:text-[#0D306C] transition-colors">
                  <span>{item.linkLabel ?? `Explore ${item.title}`}</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ) : (
              <div className={cardClass}>{body}</div>
            )}
          </Item>
        );
      })}
    </Wrapper>
  );
}
