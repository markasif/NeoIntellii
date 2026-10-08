import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

interface MagneticButtonProps {
 children: ReactNode;
 className?: string;
 strength?: number;
}

export default function MagneticButton({
 children,
 className ="",
 strength = 0.3,
}: MagneticButtonProps) {
 const ref = useRef<HTMLDivElement>(null);
 const x = useMotionValue(0);
 const y = useMotionValue(0);
 const springX = useSpring(x, { stiffness: 300, damping: 20 });
 const springY = useSpring(y, { stiffness: 300, damping: 20 });

 const handleMouse = (e: MouseEvent) => {
 const el = ref.current;
 if (!el) return;
 const rect = el.getBoundingClientRect();
 const cx = rect.left + rect.width / 2;
 const cy = rect.top + rect.height / 2;
 x.set((e.clientX - cx) * strength);
 y.set((e.clientY - cy) * strength);
 };

 const reset = () => { x.set(0); y.set(0); };

 return (
 <motion.div
 ref={ref}
 style={{ x: springX, y: springY }}
 onMouseMove={handleMouse}
 onMouseLeave={reset}
 className={`inline-block ${className}`}
 >
 {children}
 </motion.div>
 );
}
