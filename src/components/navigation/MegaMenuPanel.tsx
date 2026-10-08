import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { MegaItem } from "@/types/navigation";
import { filterNavColumns } from "@/lib/navAvailability";

interface Props {
  item: MegaItem;
  pathname: string;
  onNavigate: () => void;
}

/**
 * The bordered icon tile. Shared by the standard link rows and the card layout
 * so every panel treats icons identically: same border, same radius, same
 * gradient on hover.
 */
const iconChipClass = (active: boolean) =>
  `mt-0.5 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 group-hover:border-transparent group-hover:text-white group-hover:[background-image:linear-gradient(90deg,#0e92b8_0%,#0a6f8e_50%,#0e92b8_100%)] ${
    active
      ? "border-[#0a93bd]/30 bg-white text-[#0a93bd]"
      : "border-[#0e1320]/08 bg-white text-[#0e1320]"
  }`;

export default function MegaMenuPanel({ item: rawItem, pathname, onNavigate }: Props) {
  // Links whose page is not in this build are hidden rather than rendered as
  // 404s. See src/lib/navAvailability.ts.
  const item = { ...rawItem, columns: filterNavColumns(rawItem.columns) };
  const hasLogo = !!item.logo;
  // If the logo asset ever fails to load, fall back to a text wordmark
  // instead of showing a broken-image icon.
  const [logoFailed, setLogoFailed] = useState(false);
  const hasFeatured = !!item.featured;
  
  // Tailwind only emits classes it can see as literal strings, so the column
  // grid is chosen from this map rather than built by interpolation.
  const COLUMN_GRID: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-2 xl:grid-cols-4",
    5: "lg:grid-cols-3 xl:grid-cols-5",
    6: "lg:grid-cols-3 xl:grid-cols-6",
  };
  const columnsPerRow = Math.min(item.columnsPerRow ?? item.columns.length, 6);
  const columnGrid = COLUMN_GRID[columnsPerRow] ?? "lg:grid-cols-3";
  // Five or six columns need a tighter horizontal gutter to stay readable.
  const columnGap = columnsPerRow >= 5 ? "gap-x-5 gap-y-8" : "gap-8";

  // "What We Do" and "Solutions" both render as cards.
  const isCards = item.variant === "cards";
  const singleCardColumn = item.columns.length === 1;
  const cardOuterGrid = singleCardColumn
    ? "grid grid-cols-1 gap-8"
    : `grid grid-cols-1 md:grid-cols-2 ${columnGrid} gap-8`;
  const cardInnerGrid = singleCardColumn ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "grid grid-cols-1 gap-4";

  // Outer grid layout strategy
  let gridLayout = "grid-cols-1";
  let leftSpan = "lg:col-span-3";
  let rightSpan = "lg:col-span-1";

  if (isCards) {
    gridLayout = hasFeatured ? "lg:grid-cols-3" : "lg:grid-cols-1";
    leftSpan = hasFeatured ? "lg:col-span-2" : "lg:col-span-1";
    rightSpan = "lg:col-span-1";
  } else if (item.name === "Product") {
    gridLayout = "lg:grid-cols-4";
    leftSpan = "lg:col-span-1";
    rightSpan = "lg:col-span-3";
  } else if (hasFeatured) {
    gridLayout = "lg:grid-cols-3";
    leftSpan = "lg:col-span-2";
    rightSpan = "lg:col-span-1";
  } else {
    gridLayout = "lg:grid-cols-3";
    leftSpan = "lg:col-span-3";
  }

  return (
    <div
      className={`absolute left-1/2 top-full pt-3 z-50 ${
        item.wide
          ? "w-[min(1920px,calc(100vw-32px))]"
          : "w-[min(1240px,calc(100vw-32px))]"
      }`}
      style={{ transform: "translateX(-50%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-2xl border border-[#0e1320]/[0.08] bg-white shadow-[0_24px_60px_-24px_rgba(14,19,32,0.18),0_2px_6px_-2px_rgba(14,19,32,0.06)] overflow-hidden"
      >
        <div className={`grid grid-cols-1 ${gridLayout} gap-8 p-8`}>
          
          {/* PRODUCT LAYOUT: Render logo card on the left */}
          {hasLogo && item.logo && item.name === "Product" && (
            <div className={leftSpan}>
              <a
                href={item.logo.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="flex flex-col h-full justify-between rounded-2xl border border-black/[0.06] bg-gradient-to-br from-[#0a93bd]/[0.06] to-[#7c3aed]/[0.06] p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  {logoFailed ? (
                    <span className="flex h-9 items-center text-lg font-semibold tracking-tight text-[#0e1320]">
                      NeoHire<span className="text-[#0a93bd]">X</span>
                    </span>
                  ) : (
                    <img
                      src={item.logo.src}
                      alt={item.logo.alt}
                      className="h-9 w-auto object-contain"
                      loading="lazy"
                      decoding="async"
                      onError={() => setLogoFailed(true)}
                    />
                  )}
                  {item.logo.heading && (
                    <p className="mt-4 text-sm leading-snug text-[#0e1320]">
                      {item.logo.heading}
                    </p>
                  )}
                  {item.logo.subheading && (
                    <p className="mt-1.5 text-2xs leading-snug text-[#0e1320]">
                      {item.logo.subheading}
                    </p>
                  )}
                  {item.logo.description ? (
                    <p className="mt-2 text-2xs leading-snug text-[#5b6273]">
                      {item.logo.description}
                    </p>
                  ) : (
                    <p className="mt-4 text-xs leading-snug text-[#0e1320]">
                      {item.logo.tagline}
                    </p>
                  )}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-2xs text-[#0a93bd]">
                  Visit NeoHireX
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            </div>
          )}

          {/* LEFT SIDE: Menu Columns (for all items except Product) */}
          {item.name !== "Product" && (
            <div className={leftSpan}>
              {isCards ? (
                <div className={cardOuterGrid}>
                  {item.columns.map((col) => (
                    <div key={col.label} className="h-full">
                      <p className="text-2xs tracking-[0.16em] uppercase text-[#5b6273] mb-6">
                        {col.label}
                      </p>
                      <div className={cardInnerGrid}>
                        {col.links.map((l) => {
                          const active = pathname === l.href;
                          const match = l.label.match(/^(\d+)\.\s*(.*)/);
                          const stepNum = match ? match[1] : "";
                          const stepTitle = match ? match[2] : l.label;
                          const Icon = l.icon;

                          const cardContent = (
                            <div className="flex items-start gap-4">
                              {stepNum ? (
                                <div className="text-2xl font-sans text-[#0987ae] tracking-tight shrink-0 mt-0.5">
                                  {stepNum}
                                </div>
                              ) : Icon ? (
                                <span className={iconChipClass(active)}>
                                  <Icon className="h-3.5 w-3.5" />
                                </span>
                              ) : null}
                              <div className="min-w-0">
                                <span className={`text-xs block transition-colors duration-200 group-hover:text-[#0a93bd] ${active ? "text-[#0a93bd]" : "text-[#0e1320]"}`}>
                                  {stepTitle}
                                </span>
                                {l.desc && (
                                  <span className="mt-1 block text-2xs leading-snug text-[#5b6273]">
                                    {l.desc}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                          
                          const classes = `group flex flex-col justify-between rounded-xl p-4 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(14,19,32,0.05)] ${
                            active
                              ? "bg-[#0a93bd]/[0.05] border-[#0a93bd]/20"
                              : "bg-[#fbfaf7]/50 hover:bg-[#0a93bd]/[0.03] border-black/[0.04] hover:border-[#0a93bd]/15"
                          }`;

                          return (
                            <div key={l.href}>
                              {l.external ? (
                                <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={classes}>
                                  {cardContent}
                                </a>
                              ) : (
                                <Link to={l.href} onClick={onNavigate} className={classes}>
                                  {cardContent}
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* STANDARD LAYOUT */
                <div className={`grid grid-cols-1 md:grid-cols-2 ${columnGrid} ${columnGap}`}>
                  {item.columns.map((col) => (
                    <div key={col.label}>
                      <p className="text-2xs tracking-[0.16em] uppercase text-[#5b6273] mb-5">
                        {col.label}
                      </p>
                      <ul className="space-y-1">
                        {col.links.map((l) => {
                          const active = pathname === l.href;
                          const Icon = l.icon;
                          const rowClass = `group flex items-start gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:bg-[#0a93bd]/[0.03] ${
                            active ? "bg-[#0a93bd]/[0.06]" : ""
                          }`;
                          
                          const iconNode = Icon && (
                            <span className={iconChipClass(active)}>
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                          );
                          
                          const labelNode = (
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-1.5">
                                <span className={`text-xs transition-colors duration-200 group-hover:text-[#0a93bd] ${active ? "text-[#0a93bd]" : "text-[#0e1320]"}`}>
                                  {l.label}
                                </span>
                                {l.external && <ExternalLink className="h-3 w-3 text-[#5b6273]" />}
                              </span>
                              {l.desc && (
                                <span className="mt-0.5 block text-2xs leading-snug text-[#5b6273]">
                                  {l.desc}
                                </span>
                              )}
                            </span>
                          );

                          return (
                            <li key={l.href}>
                              {l.external ? (
                                <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={rowClass}>
                                  {iconNode}
                                  {labelNode}
                                </a>
                              ) : (
                                <Link to={l.href} onClick={onNavigate} className={rowClass}>
                                  {iconNode}
                                  {labelNode}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RIGHT SIDE: Columns for Product (rendered when logo card is on left) */}
          {item.name === "Product" && (
            <div className={rightSpan}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {item.columns.map((col) => (
                  <div key={col.label}>
                    <p className="text-2xs tracking-[0.16em] uppercase text-[#5b6273] mb-5">
                      {col.label}
                    </p>
                    <ul className="space-y-1">
                      {col.links.map((l) => {
                        const active = pathname === l.href;
                        const Icon = l.icon;
                        const rowClass = `group flex items-start gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200 hover:bg-[#0a93bd]/[0.03] ${
                          active ? "bg-[#0a93bd]/[0.06]" : ""
                        }`;
                        
                        const iconNode = Icon && (
                          <span className={iconChipClass(active)}>
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                        );
                        
                        const labelNode = (
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5">
                              <span className={`text-xs transition-colors duration-200 group-hover:text-[#0a93bd] ${active ? "text-[#0a93bd]" : "text-[#0e1320]"}`}>
                                {l.label}
                              </span>
                              {l.external && <ExternalLink className="h-3 w-3 text-[#5b6273]" />}
                            </span>
                            {l.desc && (
                              <span className="mt-0.5 block text-2xs leading-snug text-[#5b6273]">
                                {l.desc}
                              </span>
                            )}
                          </span>
                        );

                        return (
                          <li key={l.href}>
                            {l.external ? (
                              <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={rowClass}>
                                {iconNode}
                                {labelNode}
                              </a>
                            ) : (
                              <Link to={l.href} onClick={onNavigate} className={rowClass}>
                                {iconNode}
                                {labelNode}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEATURED PANEL: Render beautiful dark featured card on the right */}
          {hasFeatured && item.featured && (
            <div className={rightSpan}>
              {(() => {
                const hasLinks = !!item.featured.links && item.featured.links.length > 0;
                const cardClass = "group/card relative overflow-hidden rounded-2xl p-6 flex flex-col h-full bg-gradient-to-b from-[#0987ae] to-[#044a60] border border-white/10 shadow-[0_12px_36px_-12px_rgba(9,135,174,0.3)] hover:shadow-[0_20px_48px_-12px_rgba(9,135,174,0.5)] hover:border-white/20 transition-all duration-300";

                const cardContent = (
                  <>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-[40px] pointer-events-none group-hover/card:bg-white/15 transition-all duration-300" />
                    <div>
                      <span className="text-2xs tracking-[0.16em] uppercase text-white/80 block mb-2">
                        {item.featured.eyebrow}
                      </span>
                      <h4 className="text-sm text-white mb-2 leading-snug drop-shadow-sm">
                        {item.featured.title}
                      </h4>
                      <p className="text-2xs leading-relaxed text-slate-100/90 mb-5">
                        {item.featured.desc}
                      </p>
                      
                      {item.featured.bullets && !hasLinks && (
                        <ul className="space-y-2.5 mb-6">
                          {item.featured.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-2xs text-slate-100/95 leading-snug">
                              <span className="w-1.5 h-1.5 rounded-sm bg-white/90 shrink-0 mt-1.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {hasLinks && (
                        <ul className="space-y-1 mb-4 -mx-2">
                          {item.featured.links!.map((l) => (
                            <li key={l.href}>
                              <Link
                                to={l.href}
                                onClick={onNavigate}
                                className="group/row flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-xs text-white/95 hover:bg-white/10 transition-colors"
                              >
                                <span className="leading-snug">{l.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-white/70 shrink-0 transition-transform duration-200 group-hover/row:translate-x-0.5" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {hasLinks ? (
                      <Link
                        to={item.featured.href}
                        onClick={onNavigate}
                        className="group/cta mt-auto pt-4 border-t border-white/15 flex items-center justify-between text-2xs text-white hover:text-white/90 transition-colors"
                      >
                        <span>{item.featured.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                      </Link>
                    ) : (
                      <div className="group-hover/card:text-white/90 mt-auto pt-4 border-t border-white/15 flex items-center justify-between text-2xs text-white transition-colors">
                        <span>{item.featured.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/card:translate-x-1" />
                      </div>
                    )}
                  </>
                );

                return hasLinks ? (
                  <div className={cardClass}>{cardContent}</div>
                ) : (
                  <Link to={item.featured.href} onClick={onNavigate} className={cardClass}>
                    {cardContent}
                  </Link>
                );
              })()}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
