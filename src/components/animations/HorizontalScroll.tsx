import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface HorizontalScrollProps {
 children: ReactNode;
 className?: string;
 innerClassName?: string;
}

/**
 * Apple-style horizontal scroll section.
 * Converts vertical scroll into horizontal movement.
 */
export default function HorizontalScroll({
 children,
 className ="",
 innerClassName ="",
}: HorizontalScrollProps) {
 const ref = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: ref,
 offset: ["start start","end end"],
 });

 const x = useTransform(scrollYProgress, [0, 1], ["0%","-66%"]);

 return (
 <div ref={ref} className={`relative h-[300vh] ${className}`}>
 <div className="sticky top-0 h-screen flex items-center overflow-hidden">
 <motion.div
 style={{ x }}
 className={`flex gap-8 px-8 ${innerClassName}`}
 >
 {children}
 </motion.div>
 </div>
 </div>
 );
}
