import { motion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

type Direction ="up"|"down"|"left"|"right"|"none";

interface ScrollRevealProps {
 children: ReactNode;
 direction?: Direction;
 delay?: number;
 duration?: number;
 distance?: number;
 scale?: number;
 className?: string;
 once?: boolean;
 threshold?: number;
}

const getInitial = (direction: Direction, distance: number, scale: number): TargetAndTransition => {
 const base: Record<string, number> = { opacity: 0 };
 if (scale !== 1) base.scale = scale;
 switch (direction) {
 case"up": base.y = distance; break;
 case"down": base.y = -distance; break;
 case"left": base.x = distance; break;
 case"right": base.x = -distance; break;
 default: break;
 }
 return base;
};

export default function ScrollReveal({
 children,
 direction ="up",
 delay = 0,
 duration = 0.7,
 distance = 60,
 scale = 1,
 className ="",
 once = true,
 threshold = 0.15,
}: ScrollRevealProps) {
 return (
 <motion.div
 initial={getInitial(direction, distance, scale)}
 whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
 viewport={{ once, amount: threshold }}
 transition={{
 duration,
 delay,
 ease: [0.25, 0.1, 0.25, 1],
 }}
 className={className}
 >
 {children}
 </motion.div>
 );
}
