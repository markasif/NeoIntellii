import { useEffect, useRef } from "react";

/**
 * A soft radial light that tracks the cursor inside its parent.
 * Parent must be `position: relative; overflow: hidden`.
 */
export default function MouseGlow({
 color ="rgba(10,147,189,0.25)",
 size = 520,
 className ="",
}: { color?: string; size?: number; className?: string }) {
 const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const el = ref.current;
 if (!el) return;
 const parent = el.parentElement;
 if (!parent) return;

 const move = (e: MouseEvent) => {
 const rect = parent.getBoundingClientRect();
 el.style.setProperty("--gx", `${e.clientX - rect.left}px`);
 el.style.setProperty("--gy", `${e.clientY - rect.top}px`);
 };
 parent.addEventListener("mousemove", move);
 return () => parent.removeEventListener("mousemove", move);
 }, []);

 return (
 <div
 ref={ref}
 aria-hidden
 className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${className}`}
 style={{
 background: `radial-gradient(${size}px circle at var(--gx, 50%) var(--gy, 30%), ${color}, transparent 65%)`,
 }}
 />
 );
}