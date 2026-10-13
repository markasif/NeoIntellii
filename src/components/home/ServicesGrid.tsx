import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";

const services = [
 {
 title:"GCC Strategy & Setup",
 description:"Decide, design and launch the right GCC in India: business case, operating model, location and coordinated launch.",
 href:"/services/gcc",
 image:"/images/home/home-ai-gcc.webp",
 },
 {
 title:"AI GCC Services",
 description:"Design AI-first operating models, data foundations, MLOps, generative AI programs, and responsible AI controls.",
 href:"/services/ai-gcc",
 image:"/images/home/home-ai-gcc.webp",
 },
 {
 title:"AI Engineering",
 description:"Engineer production AI across Generative AI, Agentic AI, machine learning and data, from proof of value to permanent capability.",
 href:"/services/ai-engineering",
 image:"/images/industries/tech-data-platform.webp",
 },
 {
 title:"AI Delivery Teams",
 description:"Deploy dedicated AI engineering teams, delivery pods and forward-deployed engineers that own production outcomes.",
 href:"/services/ai-delivery-teams",
 image:"/images/industries/tech-product-engineering.webp",
 },
];

const ServicesGrid = () => {
 const scrollRef = useRef<HTMLDivElement>(null);
 const [canScrollLeft, setCanScrollLeft] = useState(false);
 const [canScrollRight, setCanScrollRight] = useState(true);

 const checkScroll = () => {
 const el = scrollRef.current;
 if (!el) return;
 setCanScrollLeft(el.scrollLeft > 10);
 setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
 };

 useEffect(() => {
 checkScroll();
 const el = scrollRef.current;
 el?.addEventListener("scroll", checkScroll);
 window.addEventListener("resize", checkScroll);
 return () => {
 el?.removeEventListener("scroll", checkScroll);
 window.removeEventListener("resize", checkScroll);
 };
 }, []);

 const scroll = (direction:"left"|"right") => {
 const el = scrollRef.current;
 if (!el) return;
 const cardWidth = el.clientWidth / 4;
 el.scrollBy({ left: direction ==="right"? cardWidth : -cardWidth, behavior:"smooth"});
 };

 return (
 <SectionWrapper>
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
 <div>
 <p className="text-sm uppercase tracking-[0.16em] text-section-label mb-3">Explore NeoIntelli's service lines</p>
 <h2 className="text-display-sm md:text-display">From GCC setup to AI-led transformation</h2>
 </div>
 <div className="flex gap-2">
 <button
 onClick={() => scroll("left")}
 disabled={!canScrollLeft}
 className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
 aria-label="Scroll left"
 >
 <ChevronLeft className="w-5 h-5 text-foreground"/>
 </button>
 <button
 onClick={() => scroll("right")}
 disabled={!canScrollRight}
 className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
 aria-label="Scroll right"
 >
 <ChevronRight className="w-5 h-5 text-foreground"/>
 </button>
 </div>
 </div>

 <div
 ref={scrollRef}
 className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
 style={{ scrollbarWidth:"none", msOverflowStyle:"none"}}
 >
 {services.map((service, i) => (
 <Link
 key={i}
 to={service.href}
 className="group flex-shrink-0 w-[280px] md:w-[calc(25%-15px)]"
 >
 {/* Image card */}
 <div className="h-[320px] rounded-xl overflow-hidden relative">
 <img
 src={service.image}
 alt={`${service.title} - NeoIntelli India GCC service`}
 className="w-full h-full object-cover transition-opacity duration-300"
 loading="lazy"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
 <h3 className="absolute bottom-4 left-4 right-4 text-lg text-white leading-tight">
 {service.title}
 </h3>
 </div>
 {/* Description row */}
 <div className="flex items-start justify-between gap-3 mt-3 px-1">
 <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
 {service.description}
 </p>
 <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-colors">
 <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-colors"/>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </SectionWrapper>
 );
};

export default ServicesGrid;
