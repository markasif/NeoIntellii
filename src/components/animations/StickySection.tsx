import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface StickySectionProps {
 children: ReactNode;
 className?: string;
 height?: string; // scroll height e.g."200vh"
}

/**
 * Creates an Apple-style sticky section where content stays fixed
 * while the user scrolls through the allocated height.
 * The `scrollYProgress` (0→1) is available via the render prop pattern
 * or by wrapping children that use useScroll themselves.
 */
export default function StickySection({
 children,
 className ="",
 height ="200vh",
}: StickySectionProps) {
 const ref = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: ref,
 offset: ["start start","end end"],
 });

 const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);

 return (
 <div ref={ref} className="relative" style={{ height }}>
 <motion.div
 className={`sticky top-0 h-screen flex items-center justify-center overflow-hidden ${className}`}
 style={{ opacity }}
 >
 {children}
 </motion.div>
 </div>
 );
}
