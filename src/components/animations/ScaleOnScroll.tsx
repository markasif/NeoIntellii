import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScaleOnScrollProps {
 children: ReactNode;
 className?: string;
 startScale?: number;
 endScale?: number;
}

export default function ScaleOnScroll({
 children,
 className ="",
 startScale = 0.85,
 endScale = 1,
}: ScaleOnScrollProps) {
 const ref = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: ref,
 offset: ["start end","center center"],
 });
 const scale = useTransform(scrollYProgress, [0, 1], [startScale, endScale]);
 const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

 return (
 <motion.div ref={ref} style={{ scale, opacity }} className={className}>
 {children}
 </motion.div>
 );
}
