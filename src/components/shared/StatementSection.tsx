"use client";

import { type ReactNode } from "react";

export interface StatementSectionProps {
  /** Small monospace uppercase label above the statement. */
  eyebrow?: string;
  /** Statement text. When omitted, a plain string `children` is used instead. */
  text?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Centred editorial statement block (eyebrow + large statement + amber rule).
 * Extracted from the /careers "OUR BELIEF" and /about "POINT OF VIEW" sections
 * so any page can reuse the same look.
 *
 * For plain-text statements the first sentence is emphasised in navy and the
 * remainder becomes the lighter supporting line. Non-string children are
 * rendered unchanged.
 */
export default function StatementSection({
  eyebrow,
  text,
  children,
  className = "",
}: StatementSectionProps) {
  const plain = text ?? (typeof children === "string" ? children : undefined);

  let statement: ReactNode = plain ?? children;
  let support: ReactNode = null;

  if (typeof plain === "string") {
    const trimmed = plain.trim();
    const splitAt = trimmed.indexOf(". ");
    statement = splitAt > -1 ? trimmed.slice(0, splitAt + 1) : trimmed;
    support = splitAt > -1 ? trimmed.slice(splitAt + 2) : null;
  }

  return (
    <section className={`py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent ${className}`}>
      <div className="max-w-6xl mx-auto text-center">
        {eyebrow && (
          <span className="block text-xs sm:text-[13px] font-bold font-mono uppercase tracking-[0.22em] text-[#169DC8] mb-2.5">
            {eyebrow}
          </span>
        )}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-extrabold font-manrope text-[#0D306C] tracking-[-0.02em] leading-[1.35] mb-4">
          {statement}
          {support && (
            <>
              {" "}
              <span className="text-[#505D74] font-normal block sm:inline mt-2 sm:mt-0">
                {support}
              </span>
            </>
          )}
        </h2>
        <div className="w-16 h-1 bg-amber-300 mx-auto rounded-full mt-6" />
      </div>
    </section>
  );
}
