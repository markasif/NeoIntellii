import type { ReactNode } from "react";

/**
 * Image slots for /lp/india-engineering-squad.
 *
 * The page is designed around real NeoIntelli photography that has not been
 * shot yet. Rather than fill the gaps with stock imagery, every slot reserves
 * its final dimensions now and draws a neutral placeholder until a file is
 * supplied. Because the placeholder and the image occupy the identical box,
 * adding the real asset later is a one-line data change and causes no layout
 * shift.
 */

type PhotoSlotProps = {
  /** Public path to the image, or null while the photograph is outstanding. */
  src: string | null;
  alt: string;
  /** Tailwind aspect-ratio utility. Portraits are 4:5 across the page. */
  aspect?: string;
  /** Intrinsic size, so the browser reserves the box before the file loads. */
  width?: number;
  height?: number;
  /** What the placeholder says it is waiting for. */
  label: string;
  caption?: string;
  className?: string;
  /** Above-the-fold slots opt out of lazy loading. */
  priority?: boolean;
  children?: ReactNode;
};

export default function PhotoSlot({
  src,
  alt,
  aspect = "aspect-[4/5]",
  width = 480,
  height = 600,
  label,
  caption,
  className = "",
  priority = false,
  children,
}: PhotoSlotProps) {
  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-2xl border border-[#dde7f7] bg-[#eef3fb] ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_top]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center">
          <span
            aria-hidden="true"
            className="absolute inset-3 rounded-xl border border-dashed border-[#c4d4ee]"
          />
          <p className="relative text-2xs font-semibold uppercase tracking-[0.16em] text-[#8494b5]">{label}</p>
          {caption ? <p className="relative text-2xs leading-relaxed text-[#8494b5]">{caption}</p> : null}
        </div>
      )}
      {children}
    </div>
  );
}
