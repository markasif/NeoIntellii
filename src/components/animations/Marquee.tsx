import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Slow horizontal marquee on a paper surface. Use for trust strips or labels.
 */
export default function Marquee({
 children,
 speed = 40,
 className ="",
}: {
 children: ReactNode;
 speed?: number;
 className?: string;
}) {
 return (
 <div className={`relative overflow-hidden ${className}`}>
 <motion.div
 className="flex gap-16 whitespace-nowrap will-change-transform"
 animate={{ x: ["0%","-50%"] }}
 transition={{ duration: speed, repeat: Infinity, ease:"linear"}}
 >
 <div className="flex gap-16 shrink-0">{children}</div>
 <div className="flex gap-16 shrink-0"aria-hidden>{children}</div>
 </motion.div>
 <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#fbfaf7] to-transparent"/>
 <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#fbfaf7] to-transparent"/>
 </div>
 );
}