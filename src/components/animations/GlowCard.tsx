import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
 children: ReactNode;
 className?: string;
 /** spotlight tint, defaults to brand cyan/violet blend */
 glowColor?: string;
 /** size of the cursor spotlight in px */
 glowSize?: number;
 /** when true, also tilts a few degrees on the cursor */
 tilt?: boolean;
}

/**
 * Premium card with a mouse-tracking radial spotlight, animated gradient
 * border, and subtle tilt. Use to wrap any inner content/Link.
 */
export default function GlowCard({
 children,
 className ="",
 glowColor ="rgba(10,147,189,0.35)",
 glowSize = 380,
 tilt = false,
}: GlowCardProps) {
 const ref = useRef<HTMLDivElement>(null);

 const handleMove = (e: MouseEvent<HTMLDivElement>) => {
 const el = ref.current;
 if (!el) return;
 const rect = el.getBoundingClientRect();
 const px = e.clientX - rect.left;
 const py = e.clientY - rect.top;
 el.style.setProperty("--mx", `${px}px`);
 el.style.setProperty("--my", `${py}px`);
 if (tilt) {
 const rx = ((py / rect.height) - 0.5) * -6;
 const ry = ((px / rect.width) - 0.5) * 6;
 el.style.setProperty("--rx", `${rx}deg`);
 el.style.setProperty("--ry", `${ry}deg`);
 }
 };

 const handleLeave = () => {
 const el = ref.current;
 if (!el) return;
 el.style.setProperty("--rx", `0deg`);
 el.style.setProperty("--ry", `0deg`);
 };

 return (
 <div
 ref={ref}
 onMouseMove={handleMove}
 onMouseLeave={handleLeave}
 className={cn("group/glow relative overflow-hidden transition-transform duration-300 will-change-transform", className)}
 style={{
 transform: tilt ?"perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))": undefined,
 }}
 >
 {/* spotlight */}
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500"
 style={{
 background: `radial-gradient(${glowSize}px circle at var(--mx,50%) var(--my,50%), ${glowColor}, transparent 60%)`,
 }}
 />
 {/* gradient border */}
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/glow:opacity-100 transition-opacity duration-500"
 style={{
 padding: 1,
 background:
"linear-gradient(135deg, rgba(10,147,189,0.55), rgba(124,58,237,0.45), rgba(10,147,189,0.05))",
 WebkitMask:
"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
 WebkitMaskComposite:"xor",
 maskComposite:"exclude",
 borderRadius:"inherit",
 }}
 />
 <div className="relative z-10 h-full">{children}</div>
 </div>
 );
}