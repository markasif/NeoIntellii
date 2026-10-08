import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
 children: ReactNode;
 className?: string;
 rounded?: string;
 /** thickness in px */
 thickness?: number;
 /** when true the border slowly rotates */
 animated?: boolean;
}

/**
 * Wraps content with an animated conic-gradient border.
 * Inner background is transparent - the wrapped element supplies its own bg.
 */
export default function GradientBorder({
 children,
 className ="",
 rounded ="rounded-2xl",
 thickness = 1,
 animated = true,
}: Props) {
 return (
 <div className={cn("relative", rounded, className)}>
 <div
 aria-hidden
 className={cn("absolute inset-0", rounded, animated &&"animate-gradient-spin")}
 style={{
 padding: thickness,
 background:
"conic-gradient(from var(--angle,0deg), rgba(10,147,189,0.0), rgba(10,147,189,0.55), rgba(124,58,237,0.55), rgba(10,147,189,0.0))",
 WebkitMask:
"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
 WebkitMaskComposite:"xor",
 maskComposite:"exclude",
 }}
 />
 <div className={cn("relative", rounded)}>{children}</div>
 </div>
 );
}