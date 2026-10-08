import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerContainerProps {
 children: ReactNode;
 stagger?: number;
 delay?: number;
 className?: string;
}

const container = (stagger: number, delay: number) => ({
 hidden: {},
 visible: {
 transition: {
 staggerChildren: stagger,
 delayChildren: delay,
 },
 },
});

export const staggerItem: Variants = {
 hidden: { opacity: 0, y: 40 },
 visible: {
 opacity: 1,
 y: 0,
 transition: {
 duration: 0.6,
 ease: [0.25, 0.1, 0.25, 1] as const,
 },
 },
};

export default function StaggerContainer({
 children,
 stagger = 0.1,
 delay = 0,
 className ="",
}: StaggerContainerProps) {
 return (
 <motion.div
 variants={container(stagger, delay)}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className={className}
 >
 {children}
 </motion.div>
 );
}
