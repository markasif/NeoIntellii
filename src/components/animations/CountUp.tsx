import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
 target: number;
 suffix?: string;
 prefix?: string;
 duration?: number;
 className?: string;
}

export default function CountUp({
 target,
 suffix ="",
 prefix ="",
 duration = 2,
 className ="",
}: CountUpProps) {
 const ref = useRef<HTMLSpanElement>(null);
 const isInView = useInView(ref, { once: true, amount: 0.5 });
 const motionVal = useMotionValue(0);
 const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

 useEffect(() => {
 if (isInView) motionVal.set(target);
 }, [isInView, target, motionVal]);

 useEffect(() => {
 const unsub = spring.on("change", (v) => {
 if (ref.current) {
 ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
 }
 });
 return unsub;
 }, [spring, prefix, suffix]);

 return (
 <motion.span ref={ref} className={className}>
 {prefix}0{suffix}
 </motion.span>
 );
}
