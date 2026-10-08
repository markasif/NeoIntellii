import { Layers, Clock, Cpu, Rocket } from "lucide-react";
import IndustryGccPage from "@/components/shared/IndustryGccPage";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

import GccPerformanceFramework, { type OutcomeGroup } from "@/components/gcc-operations/GccPerformanceFramework";

const specializedSquads: OutcomeGroup[] = [
  {
    title: "Dedicated AI Team",
    badge: "SQUAD 01",
    image: "/images/delivery-teams/squad-dedicated-ai.jpg",
    alt: "Dedicated AI engineering team collaborating in high-tech Bangalore GCC office",
    aspect: "aspect-[4/5]",
    summary: "A stable AI engineering team working your ongoing product roadmap.",
    metrics: [
      "Dedicated roadmap ownership",
      "Full sprint & PR ceremony integration",
      "Core AI/ML model architecture",
      "Retained institutional IP",
    ],
    link: "/services/ai-delivery-teams/dedicated-ai-engineering-team",
    actionText: "Explore",
  },
  {
    title: "AI Delivery Pod",
    badge: "SQUAD 02",
    image: "/images/delivery-teams/squad-delivery-pod.jpg",
    alt: "AI Delivery Pod team reviewing production deployment metrics on dashboard",
    aspect: "aspect-[4/3]",
    summary: "A cross-functional squad built around one defined production outcome.",
    metrics: [
      "Time-boxed production deployment",
      "Full-stack ML & UI engineering",
      "Clear milestone-based SLAs",
      "Zero management friction",
    ],
    link: "/services/ai-delivery-teams/ai-delivery-pod",
    actionText: "Explore",
  },
  {
    title: "Forward-Deployed AI Engineers",
    badge: "SQUAD 03",
    image: "/images/delivery-teams/squad-forward-deployed.jpg",
    alt: "Forward-Deployed AI Engineers deeply embedded in codebase and repositories",
    aspect: "aspect-[4/5]",
    summary: "Engineers embedded in your repositories, systems and workflows.",
    metrics: [
      "Embedded in client git repositories",
      "Direct engineer-to-engineer pairing",
      "Continuous CI/CD pipeline tuning",
      "Immediate day-one velocity",
    ],
    link: "/services/ai-delivery-teams/forward-deployed-ai-engineers",
    actionText: "Explore",
  },
  {
    title: "AI Team Transfer",
    badge: "SQUAD 04",
    image: "/images/delivery-teams/squad-team-transfer.jpg",
    alt: "Engineering leaders conducting structured handover transition meeting",
    aspect: "aspect-[4/3]",
    summary: "Deliver now, then transfer ownership to your own engineers.",
    metrics: [
      "Turnkey pod build and stabilization",
      "Complete knowledge & code documentation",
      "Smooth entity or contract transition",
      "Zero disruption to product roadmap",
    ],
    link: "/services/ai-delivery-teams/ai-team-transfer",
    actionText: "Explore",
  },
];

const gccModelPoints = [
  {
    title: "Your team, your IP, your culture",
    desc: "Embedded engineers, not contractors. They use your tools, follow your processes, and build your product.",
  },
  {
    title: "Sprint-integrated",
    desc: "Same tools (Jira, GitHub, Slack), same ceremonies, same codebase. Your India team is part of your engineering org.",
  },
  {
    title: "Engineering management included",
    desc: "Optional India-based engineering managers who handle day-to-day coordination, 1:1s, and career development.",
  },
  {
    title: "Scale up/down",
    desc: "Flexible team sizing based on roadmap needs. Add a pod for a launch, scale down after stabilization.",
  },
];

export default function TechnologyGcc() {
  return (
    <IndustryGccPage
      pageTitle="Technology & SaaS GCC India | Scale Your Engineering - NeoIntelli"
      label="Technology & SaaS"
      breadcrumbLabel="Technology GCC"
      h1="Scale Your Engineering Team with a Tech GCC in India"
      subheadline="SaaS companies, platform businesses, and software product companies use India GCCs to build R&D centers, ship features faster, and extend engineering capacity - without sacrificing quality."
      ctaText="Scale Your Engineering - Let's Talk"
      accentColor="#0a93bd"
      shortAnswer="A technology GCC in India is a captive engineering centre that SaaS, platform, and software product companies use to extend R&D, own end-to-end features, and ship AI capabilities. NeoIntelli helps global tech companies outside India launch a product-ready GCC in 8 to 12 weeks with dedicated engineering, AI, platform, and SRE talent that owns code, not tickets."
      whyTitle="Why SaaS Companies Build GCCs in India"
      whyBlocks={[
        {
          icon: Layers,
          title: "R&D at Scale",
          desc: "Extend your product engineering capacity with a dedicated India team that owns features end-to-end. Not staff aug - real ownership.",
        },
        {
          icon: Clock,
          title: "24-Hour Development Cycle",
          desc: "With teams in India and the US/EU, you get near round-the-clock development. Ship faster without burning out your HQ team.",
        },
        {
          icon: Cpu,
          title: "AI Feature Teams",
          desc: "Every SaaS product needs AI now. Build dedicated AI pods in India for recommendations, search, automation, and analytics features.",
        },
        {
          icon: Rocket,
          title: "Cost Runway Extension",
          desc: "A 25-person engineering team in India costs what 8 engineers cost in SF. For funded startups, that's 2-3x more runway per dollar.",
        },
      ]}
      rolesTitle="Tech Talent We Place in Your GCC"
      roles={[
        "Full-Stack Engineers (React, Node, Python, Go)",
        "Backend / Platform Engineers",
        "AI/ML Engineers (product AI features)",
        "Data Engineers & Analytics Engineers",
        "Cloud Architects (AWS, GCP, Azure)",
        "DevOps / SRE Engineers",
        "Mobile Engineers (iOS, Android, React Native, Flutter)",
        "QA / SDET Engineers",
        "Engineering Managers",
      ]}
      darkSectionTitle="How a Tech GCC Differs from Staff Augmentation"
      darkItems={gccModelPoints.map((p) => `${p.title} - ${p.desc}`)}
      faqs={[
        {
          q: "How is a tech GCC different from hiring a dev shop?",
          a: "A GCC gives you a dedicated, permanent team that's part of your company. They build institutional knowledge, own your codebase, and are invested in your product - unlike contractors who rotate across clients.",
        },
        {
          q: "What's the minimum team size to start a tech GCC?",
          a: "We recommend starting with 5-10 engineers focused on a specific product area. This gives you enough critical mass for a functioning team while keeping initial investment manageable.",
        },
        {
          q: "Can my India team work in our timezone?",
          a: "Yes. Many tech GCCs operate with 4-5 hours of overlap with US timezones. Teams can flex their hours for morning standups and cross-team collaboration, while using the non-overlap time for deep work.",
        },
        {
          q: "How fast can we ramp up?",
          a: "First hires are typically onboarded within 4-6 weeks. A 15-person team can be fully ramped within 12 weeks. We maintain active talent pipelines for common tech roles.",
        },
      ]}
      relatedLinks={[
        { name: "Setup & Launch", href: "/services/gcc/setup-launch" },
        { name: "AI GCC", href: "/services/ai-gcc" },
        { name: "GCC for AI Startups", href: "/gcc-for-ai-startups" },
        { name: "GCC vs Outsourcing", href: "/gcc-vs-outsourcing" },
        { name: "AI Delivery Pod", href: "/services/ai-delivery-teams/ai-delivery-pod" },
      ]}
      ctaBanner={{
        title: "Ready to Scale Your Engineering?",
        description: "Speak with our team about building a technology GCC for your product company.",
        buttonText: "Scale Your Engineering",
      }}
      useConnectedEcosystem
    >
      {/* AI Delivery Teams - Technology-specific section */}
      <Section id="ai-delivery-teams" width="wide">
        <SectionHeader
          title="AI Delivery Teams for Tech Companies"
          eyebrow="Specialized Squads"
          align="center"
          className="mb-10 sm:mb-14"
        />
        <GccPerformanceFramework
          items={specializedSquads}
          showSourceNote={false}
          ctaButtonVariant="cyan"
          ctaAfterContent
        />
      </Section>
    </IndustryGccPage>
  );
}
