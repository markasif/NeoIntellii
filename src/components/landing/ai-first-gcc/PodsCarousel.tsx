import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

type Pod = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
};

export default function PodsCarousel({ pods }: { pods: Pod[] }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const total = pods.length;

  useEffect(() => {
    if (hover) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [hover, total]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (child) {
      el.scrollTo({ left: child.offsetLeft - 8, behavior: "smooth" });
    }
  }, [index]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6 md:mx-0 md:px-0"
      >
        {pods.map((p) => (
          <Link
            key={p.title}
            to={p.href}
            className="group snap-start shrink-0 w-[300px] md:w-[360px] bg-white rounded-[32px] p-8 border border-black/[0.06] card-shadow-soft hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(10,147,189,0.25)] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#0a93bd]/10 flex items-center justify-center mb-6">
              <p.icon className="w-5 h-5 text-[#0a93bd]" />
            </div>
            <h3 className="text-[#0D212C] text-lg font-medium mb-2.5">{p.title}</h3>
            <p className="text-[#273C46] text-sm leading-relaxed mb-8">{p.body}</p>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#051A24] text-xs btn-shadow-secondary">
              Explore pod
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-8 justify-end">
        <button
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          className="w-12 h-12 rounded-full border border-[#0D212C]/15 flex items-center justify-center text-[#0D212C] hover:bg-[#0D212C] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % total)}
          className="w-12 h-12 rounded-full border border-[#0D212C]/15 flex items-center justify-center text-[#0D212C] hover:bg-[#0D212C] hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}