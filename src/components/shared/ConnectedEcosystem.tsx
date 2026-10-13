import { Link } from "react-router-dom";
import { ArrowRight, Zap, Bot, ShieldCheck, Calculator, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Consultation from "@/features/home/components/Consultation";

export interface ConnectedCardItem {
  path: string;
  name: string;
  summary: string;
  anchor: string;
  icon: LucideIcon;
}

export const defaultConnectedCards: ConnectedCardItem[] = [
  {
    path: "/services/gcc/setup-launch",
    name: "Setup & Launch",
    summary: "Entity, leadership, talent, workplace, IT and governance workstreams run in parallel to launch your center in weeks.",
    anchor: "Read about Setup & Launch",
    icon: Zap,
  },
  {
    path: "/services/ai-gcc",
    name: "AI GCC",
    summary: "Build and operate your AI GCC in India: strategy, hiring, HR, workspace, GPU infrastructure, and AI engineering pods.",
    anchor: "Read about AI GCC",
    icon: Bot,
  },
  {
    path: "/gcc-vs-outsourcing",
    name: "GCC vs Outsourcing",
    summary: "How a captive GCC compares to traditional outsourcing on cost, IP control, retention, and enterprise value.",
    anchor: "Read about GCC vs Outsourcing",
    icon: ShieldCheck,
  },
  {
    path: "/gcc-cost-calculator",
    name: "GCC Cost Calculator",
    summary: "Estimate the cost of building and operating a GCC in India across roles, seniority levels, and tech hubs.",
    anchor: "Read about GCC Cost Calculator",
    icon: Calculator,
  },
];

interface ConnectedEcosystemProps {
  title?: string;
  cards?: ConnectedCardItem[];
  hideConsultation?: boolean;
  /** Fill colour of the top organic wave divider (match the page canvas). */
  waveFill?: string;
}

export default function ConnectedEcosystem({
  title = "Continue exploring",
  cards = defaultConnectedCards,
  hideConsultation = false,
  waveFill = "#F0F5FA",
}: ConnectedEcosystemProps) {
  const renderCard = (card: ConnectedCardItem) => {
    const CardIcon = card.icon;
    return (
      <Link
        key={card.path + card.name}
        to={card.path}
        className="group relative flex flex-col justify-between w-full h-full min-h-[175px] sm:min-h-[190px] p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#061530] border border-[#16427D]/70 hover:border-[#38BDF8]/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_8px_24px_rgba(4,18,43,0.32)] hover:shadow-[0_14px_36px_rgba(22,157,200,0.28)]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
        }}
      >
        {/* Chamfer Corner Border Accent (Bottom-Left Cut) */}
        <svg
          className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none overflow-visible z-20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <line
            x1="0"
            y1="2"
            x2="22"
            y2="24"
            stroke="#16427D"
            strokeOpacity={0.75}
            strokeWidth="1.5"
            className="group-hover:stroke-[#38BDF8] transition-colors"
          />
        </svg>

        {/* Inner Specular Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full w-full">
          <div>
            {/* Top Row: Hexagon Icon Badge */}
            <div className="flex items-center justify-start mb-3">
              <div className="relative flex items-center justify-center w-8 h-9">
                <svg viewBox="0 0 54 60" className="w-full h-full drop-shadow-sm">
                  <polygon
                    points="27,3 50,16 50,44 27,57 4,44 4,16"
                    fill="#123B70"
                    stroke="#38BDF8"
                    strokeWidth="2.4"
                    strokeOpacity="0.85"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#67D5F7]">
                  <CardIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="block font-extrabold text-[15px] sm:text-base mb-1 leading-snug transition-colors text-white group-hover:text-[#38BDF8] font-manrope">
              {card.name}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-[12.5px] text-[#C5D7F0]/90 leading-relaxed line-clamp-2 sm:line-clamp-3 mt-1.5 font-normal">
              {card.summary}
            </p>
          </div>

          {/* Footer Action Tag / Anchor Link */}
          <div className="mt-4 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#38BDF8] group-hover:text-white transition-colors">
            <span>{card.anchor}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <section
        id="connected-ecosystem"
        aria-labelledby="connected-ecosystem-heading"
        className="relative scroll-mt-28 bg-gradient-to-b from-[#081B3E] via-[#0A224E] to-[#081B3E] text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-x-clip select-none"
      >
        {/* Top Organic Wave Section Divider */}
        <div className="absolute -top-[2px] sm:-top-[3px] inset-x-0 z-20 pointer-events-none leading-none w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 lg:h-16 xl:h-18 block pointer-events-none"
          >
            <path
              d="M0,-4 L1440,-4 L1440,30 C1300,32 1160,65 1000,82 C840,99 720,74 540,84 C360,94 200,136 0,136 Z"
              fill="#D2DCF0"
              opacity="0.6"
            />
            <path
              d="M0,-4 L1440,-4 L1440,22 C1300,24 1160,58 1000,74 C840,90 720,66 540,76 C360,86 200,126 0,126 Z"
              fill={waveFill}
            />
          </svg>
        </div>

        {/* Ambient background glow highlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#169DC8]/12 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[450px] bg-[#0066CC]/15 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Subtle technical grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12">
            <SectionHeader
              eyebrow="CONNECTED ECOSYSTEM"
              title={`${title.replace(/\.?$/, "")}.`}
              description="Explore related capabilities, delivery models and planning tools across the NeoIntelli platform."
              align="center"
              variant="white"
            />
          </div>

          {/* Dynamic Card Grid: Renders exactly the cards passed matching AI GCC */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto items-stretch">
            {cards.map(renderCard)}
          </div>
        </div>
      </section>

      {!hideConsultation && (
        <Consultation hideUpperCta={true} hideWaveDivider={true} />
      )}
    </>
  );
}
