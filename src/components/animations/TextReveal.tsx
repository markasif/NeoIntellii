import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TextRevealProps {
 children: ReactNode;
 delay?: number;
 duration?: number;
 className?: string;
 as?:"h1"|"h2"|"h3"|"p"|"span"|"div";
}

export default function TextReveal({
 children,
 delay = 0,
 duration = 0.8,
 className ="",
 as ="div",
}: TextRevealProps) {
 const Tag = motion[as] as typeof motion.div;
 return (
 <Tag
 initial={{ opacity: 0, y: 40, filter:"blur(10px)"}}
 whileInView={{ opacity: 1, y: 0, filter:"blur(0px)"}}
 viewport={{ once: true, amount: 0.3 }}
 transition={{
 duration,
 delay,
 ease: [0.25, 0.1, 0.25, 1],
 }}
 className={className}
 >
 {children}
 </Tag>
 );
}
