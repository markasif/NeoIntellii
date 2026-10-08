import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
 end: number;
 suffix?: string;
 prefix?: string;
 label: string;
 duration?: number;
 variant?:"light"|"dark";
}

const AnimatedCounter = ({ end, suffix ="", prefix ="", label, duration = 2000, variant ="light"}: AnimatedCounterProps) => {
 const [count, setCount] = useState(0);
 const [started, setStarted] = useState(false);
 const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting && !started) {
 setStarted(true);
 }
 },
 { threshold: 0.5 }
 );

 if (ref.current) observer.observe(ref.current);
 return () => observer.disconnect();
 }, [started]);

 useEffect(() => {
 if (!started) return;
 let startTime: number;
 const step = (timestamp: number) => {
 if (!startTime) startTime = timestamp;
 const progress = Math.min((timestamp - startTime) / duration, 1);
 setCount(Math.floor(progress * end));
 if (progress < 1) requestAnimationFrame(step);
 };
 requestAnimationFrame(step);
 }, [started, end, duration]);

 const isDark = variant ==="dark";

 return (
 <div ref={ref} className="text-center">
 <div className={`text-3xl md:text-4xl ${isDark ?"text-white":"text-heading"}`}>
 <span className="gradient-text">{prefix}{count}{suffix}</span>
 </div>
 <div className={`text-sm mt-1 ${isDark ?"text-white/50":"text-body-muted"}`}>{label}</div>
 </div>
 );
};

export default AnimatedCounter;
