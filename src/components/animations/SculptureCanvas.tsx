import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

/**
 *"Sculpture"- a slowly rotating wireframe form built from concentric SVG rings
 * and orbiting nodes. Scroll progress drives rotation; cursor parallax tilts it.
 * No WebGL, no images. Light-surface friendly.
 */
export default function SculptureCanvas({ className =""}: { className?: string }) {
 const wrapRef = useRef<HTMLDivElement>(null);
 const mx = useMotionValue(0);
 const my = useMotionValue(0);
 const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
 const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });

 const { scrollY } = useScroll();
 const rotZ = useTransform(scrollY, [0, 1200], [0, 90]);
 const tiltX = useTransform(sy, (v) => v * -12);
 const tiltY = useTransform(sx, (v) => v * 14);

 useEffect(() => {
 const onMove = (e: MouseEvent) => {
 const el = wrapRef.current;
 if (!el) return;
 const r = el.getBoundingClientRect();
 const cx = r.left + r.width / 2;
 const cy = r.top + r.height / 2;
 mx.set((e.clientX - cx) / (window.innerWidth / 2));
 my.set((e.clientY - cy) / (window.innerHeight / 2));
 };
 window.addEventListener("mousemove", onMove);
 return () => window.removeEventListener("mousemove", onMove);
 }, [mx, my]);

 const rings = [44, 70, 96, 122, 148, 174];

 return (
 <div
 ref={wrapRef}
 className={`relative aspect-square w-full max-w-[520px] mx-auto ${className}`}
 style={{ perspective: 1200 }}
 >
 {/* faint paper halo */}
 <div
 aria-hidden
 className="absolute inset-0 rounded-full opacity-60"
 style={{
 background:
"radial-gradient(closest-side, rgba(10,147,189,0.10), rgba(124,58,237,0.06) 55%, transparent 70%)",
 }}
 />

 <motion.div
 style={{ rotateX: tiltX, rotateY: tiltY, rotateZ: rotZ }}
 className="absolute inset-0 will-change-transform"
 >
 <svg viewBox="-200 -200 400 400" className="absolute inset-0 w-full h-full">
 <defs>
 <linearGradient id="ink" x1="0" y1="0" x2="1" y2="1">
 <stop offset="0%" stopColor="#0a93bd" stopOpacity="0.55"/>
 <stop offset="100%" stopColor="#36326a" stopOpacity="0.55"/>
 </linearGradient>
 <radialGradient id="core" cx="50%" cy="50%" r="50%">
 <stop offset="0%" stopColor="#36326a" stopOpacity="0.18"/>
 <stop offset="100%" stopColor="#0a93bd" stopOpacity="0"/>
 </radialGradient>
 </defs>

 {/* concentric hairline rings */}
 {rings.map((r, i) => (
 <g key={r} transform={`rotate(${i * 9})`}>
 <ellipse cx="0" cy="0" rx={r} ry={r * 0.42} fill="none" stroke="url(#ink)" strokeWidth="0.6" opacity={0.55 - i * 0.05} />
 </g>
 ))}

 {/* vertical meridian rings */}
 {[0, 30, 60, 90, 120, 150].map((a, i) => (
 <g key={a} transform={`rotate(${a})`}>
 <ellipse cx="0" cy="0" rx="170" ry="170" fill="none" stroke="#0e1320" strokeOpacity={0.06 + (i % 2) * 0.04} strokeWidth="0.5"/>
 </g>
 ))}

 {/* orbiting nodes */}
 <motion.g
 animate={{ rotate: 360 }}
 transition={{ duration: 38, repeat: Infinity, ease:"linear"}}
 style={{ transformOrigin:"0 0"}}
 >
 {Array.from({ length: 14 }).map((_, i) => {
 const ang = (i / 14) * Math.PI * 2;
 const rad = 152;
 const x = Math.cos(ang) * rad;
 const y = Math.sin(ang) * rad * 0.42;
 return <circle key={i} cx={x} cy={y} r="2" fill="#0a93bd" opacity="0.75"/>;
 })}
 </motion.g>
 <motion.g
 animate={{ rotate: -360 }}
 transition={{ duration: 60, repeat: Infinity, ease:"linear"}}
 style={{ transformOrigin:"0 0"}}
 >
 {Array.from({ length: 9 }).map((_, i) => {
 const ang = (i / 9) * Math.PI * 2;
 const rad = 108;
 const x = Math.cos(ang) * rad;
 const y = Math.sin(ang) * rad * 0.42;
 return <circle key={i} cx={x} cy={y} r="1.6" fill="#7c3aed" opacity="0.7"/>;
 })}
 </motion.g>

 {/* core */}
 <circle cx="0" cy="0" r="90" fill="url(#core)"/>
 <circle cx="0" cy="0" r="8" fill="#0e1320" opacity="0.85"/>
 <circle cx="0" cy="0" r="3" fill="#fbfaf7"/>
 </svg>
 </motion.div>
 </div>
 );
}