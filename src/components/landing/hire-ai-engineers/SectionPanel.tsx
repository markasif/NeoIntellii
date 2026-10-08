import type { ReactNode } from "react";

// The infographic's signature container: a pale-bordered white panel with a
// solid pill label straddling its top edge.
export default function SectionPanel({
  label,
  tone = "cyan",
  children,
  className = "",
}: {
  label: string;
  tone?: "cyan" | "navy";
  children: ReactNode;
  className?: string;
}) {
  // #00708f rather than the lighter #0084b4: white pill text needs 4.5:1.
  const pill = tone === "navy" ? "bg-[#0a1f52]" : "bg-[#00708f]";
  return (
    <div className={`relative rounded-2xl bg-white border border-black/[0.06] pt-9 pb-6 px-5 sm:px-7 md:pt-11 md:pb-8 ${className}`}>
      <span
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full ${pill} px-5 py-2 text-2xs md:text-xs tracking-[0.16em] uppercase text-white font-semibold`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
