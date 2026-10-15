import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { AppProviders } from "./components/page/AppProviders";
import NotFound from "./pages/NotFound";

type PageLoader = () => Promise<{ default: ComponentType }>;

const pageLoaders: Record<string, PageLoader> = {
  "/":                                              () => import("./pages/Index"),
  "/services/gcc":                                  () => import("./pages/services/GCCServices"),
  "/services/micro-gcc":                            () => import("./pages/services/MicroGCC"),
  "/services/gcc/setup-launch":                     () => import("./pages/services/gcc/SetupLaunch"),
  "/services/gcc/strategy-business-case":           () => import("./pages/services/gcc/StrategyBusinessCase"),
  "/services/gcc/location-strategy":                () => import("./pages/services/gcc/LocationStrategy"),
  "/services/gcc/modernization-transformation":     () => import("./pages/services/gcc/ModernizationTransformation"),
  "/services/gcc-operations":                                () => import("./pages/services/gcc-operations/GccOperations"),
  "/services/gcc-operations/people-hr-operations":           () => import("./pages/services/gcc-operations/PeopleHrOperations"),
  "/services/gcc-operations/workforce-strategy":             () => import("./pages/services/gcc-operations/WorkforceStrategy"),
  "/services/gcc-operations/workplace-it-security":          () => import("./pages/services/gcc-operations/WorkplaceItSecurity"),
  "/services/gcc-operations/service-management-performance": () => import("./pages/services/gcc-operations/ServiceManagementPerformance"),
  "/services/gcc-operations/governance-compliance":          () => import("./pages/services/gcc-operations/GovernanceCompliance"),
  "/services/gcc-operations/bot-transition":                 () => import("./pages/services/gcc-operations/BotTransition"),
  "/services/gcc-operations/scale-expansion":                () => import("./pages/services/gcc-operations/ScaleExpansion"),
  "/services/ai-engineering":                       () => import("./pages/services/AIEngineering"),
  "/services/ai-engineering/generative-agentic-ai": () => import("./pages/services/ai-engineering/GenerativeAgenticAI"),
  "/services/ai-engineering/applied-ai-ml":         () => import("./pages/services/ai-engineering/AppliedAIML"),
  "/services/ai-engineering/data-engineering":      () => import("./pages/services/ai-engineering/DataEngineering"),
  "/services/ai-engineering/ai-product-engineering": () => import("./pages/services/ai-engineering/AIProductEngineering"),
  "/services/ai-engineering/ai-agents-automation":  () => import("./pages/services/ai-engineering/AIAgentsAutomation"),
  "/services/ai-engineering/mlops-llmops-agentops": () => import("./pages/services/ai-engineering/MLOpsLLMOpsAgentOps"),
  "/services/ai-engineering/ai-evaluation-assurance": () => import("./pages/services/ai-engineering/AIEvaluationAssurance"),
  "/services/ai-gcc":                               () => import("./pages/services/AISolutions"),
  "/services/ai-delivery-teams":                    () => import("./pages/services/ai-delivery-teams/AiDeliveryTeams"),
  "/services/ai-delivery-teams/dedicated-ai-engineering-team": () => import("./pages/services/ai-delivery-teams/DedicatedAiEngineeringTeam"),
  "/services/ai-delivery-teams/ai-delivery-pod":    () => import("./pages/services/ai-delivery-teams/AiDeliveryPod"),
  "/services/ai-delivery-teams/forward-deployed-ai-engineers": () => import("./pages/services/ai-delivery-teams/ForwardDeployedAiEngineers"),
  "/services/ai-delivery-teams/ai-team-transfer":   () => import("./pages/services/ai-delivery-teams/AiTeamTransfer"),
  "/services/ai-talent-acquisition":                () => import("./pages/services/AITalentAcquisition"),
  "/services/ai-data-recruitment":                  () => import("./pages/services/AIDataRecruitment"),
  "/services/ai-gcc/ai-advisory-strategy":          () => import("./pages/services/ai-gcc/AIAdvisoryStrategy"),
  "/services/ai-gcc/setup-operations":              () => import("./pages/services/ai-gcc/SetupOperations"),
  "/services/ai-gcc/generative-ai":                 () => import("./pages/services/ai-gcc/GenerativeAI"),
  "/services/ai-gcc/data-engineering":              () => import("./pages/services/ai-gcc/DataEngineering"),
  "/services/ai-gcc/mlops":                         () => import("./pages/services/ai-gcc/MLOps"),
  "/services/ai-gcc/responsible-ai":                () => import("./pages/services/ai-gcc/ResponsibleAI"),
  "/services/ai-gcc/ai-infrastructure-gpu":         () => import("./pages/services/ai-gcc/AIInfrastructureGpu"),
  "/services/ai-talent":                            () => import("./pages/services/ai-talent/AITalentOverview"),
  "/services/ai-talent/ai-ml-recruitment":          () => import("./pages/services/ai-talent/AIMLRecruitment"),
  "/services/ai-talent/genai-agentic-ai-hiring":    () => import("./pages/services/ai-talent/GenAIAgenticHiring"),
  "/services/ai-talent/data-engineering-data-science-hiring": () => import("./pages/services/ai-talent/DataHiring"),
  "/services/ai-talent/mlops-ai-platform-hiring":   () => import("./pages/services/ai-talent/MLOpsPlatformHiring"),
  "/services/ai-talent/ai-leadership-executive-search": () => import("./pages/services/ai-talent/AILeadershipSearch"),
  "/services/ai-talent/recruitment-hub":            () => import("./pages/services/ai-talent/RecruitmentHub"),
  "/services/ai-talent/ai-reskilling-academy":      () => import("./pages/services/ai-talent/AIReskillingAcademy"),
  "/about":                                         () => import("./pages/About"),
  "/blog":                                          () => import("./pages/Blog"),
  "/contact":                                       () => import("./pages/Contact"),
  "/case-studies":                                  () => import("./pages/CaseStudies"),
  "/industries":                                    () => import("./pages/Industries"),
  "/industries/bfsi-gcc":                           () => import("./pages/industries/BfsiGcc"),
  "/industries/healthcare-gcc":                     () => import("./pages/industries/HealthcareGcc"),
  "/industries/technology-gcc":                     () => import("./pages/industries/TechnologyGcc"),
  "/gcc-vs-outsourcing":                            () => import("./pages/GccVsOutsourcing"),
  "/gcc-cost-calculator":                           () => import("./pages/GccCostCalculator"),
  "/gcc-as-a-service":                              () => import("./pages/GccAsAService"),
  "/recruitment":                                   () => import("./pages/recruitment/RecruitmentHub"),
  "/recruitment/permanent":                         () => import("./pages/recruitment/Permanent"),
  "/recruitment/contract-staffing":                 () => import("./pages/recruitment/ContractStaffing"),
  "/recruitment/executive-search":                  () => import("./pages/recruitment/ExecutiveSearch"),
  "/recruitment/rpo":                               () => import("./pages/recruitment/Rpo"),
  "/privacy-policy":                                () => import("./pages/PrivacyPolicy"),
  "/terms-of-service":                              () => import("./pages/TermsOfService"),
  "/cookie-policy":                                 () => import("./pages/CookiePolicy"),
  "/blueprint":                                     () => import("./pages/SEOBlueprint"),
  "/gcc-for-ai-startups":                           () => import("./pages/gcc-for-ai-startups"),
  "/gcc-readiness-assessment":                      () => import("./pages/gcc-readiness-assessment"),
  "/gcc-roi-estimator":                             () => import("./pages/gcc-roi-estimator"),
  "/gcc-faq":                                       () => import("./pages/gcc-faq"),
  "/faq":                                           () => import("./pages/gcc-faq"),
  "/careers":                                       () => import("./pages/careers"),
  "/industries/manufacturing-gcc":                  () => import("./pages/industries/manufacturing-gcc"),
  "/industries/private-equity-gcc":                 () => import("./pages/industries/private-equity-gcc"),
  "/industries/retail-gcc":                         () => import("./pages/industries/retail-gcc"),
  "/gcc-india-cost":                                () => import("./pages/GCCIndiaCost"),
  "/lp/ai-first-gcc":                               () => import("./pages/landing/AiFirstGcc"),
  "/lp/newhome":                                    () => import("./pages/landing/NewHome"),
  "/lp/hire-ai-engineers":                          () => import("./pages/landing/HireAiEngineers"),
  "/lp/hire-ai_ml-engineers":                       () => import("./pages/landing/HireAiMlEngineers"),
  "/lp/micro-gcc-india":                            () => import("./pages/landing/MicroGccIndia"),
  "/lp/india-engineering-squad":                    () => import("./pages/landing/IndiaEngineeringSquad"),
  "/lp/finance-procurement-shared-services-india":   () => import("./pages/landing/FinanceProcurementSharedServicesIndia"),
  "/lp/gcc-cost-calculator":                        () => import("./pages/landing/GccCostCalculatorLp"),
  "/lp/gcc-playbook":                               () => import("./pages/landing/GccPlaybook"),
  "/book-a-call":                                   () => import("./pages/BookACall"),
  "/thank-you-call":                                () => import("./pages/ThankYouCall"),
};

const componentCache = new Map<string, ComponentType>();
const BLOG_SLUG_KEY = "/blog/:slug";

const normalizePath = (path: string) => path !== "/" ? path.replace(/\/$/, "") : "/";

export function isValidRoute(pathname: string): boolean {
  const normalized = normalizePath(pathname);
  if (normalized.startsWith("/blog/") && normalized.split("/").length === 3) return true;
  return normalized in pageLoaders;
}

export function resolveRouteComponent(pathname: string): ComponentType | null {
  const normalized = normalizePath(pathname);

  if (normalized.startsWith("/blog/") && normalized.split("/").length === 3) {
    if (!componentCache.has(BLOG_SLUG_KEY)) {
      componentCache.set(BLOG_SLUG_KEY, dynamic(() => import("./pages/BlogPost"), { ssr: true }));
    }
    return componentCache.get(BLOG_SLUG_KEY)!;
  }

  const loader = pageLoaders[normalized];
  if (!loader) return null;

  if (!componentCache.has(normalized)) {
    componentCache.set(normalized, dynamic(loader, { ssr: true }));
  }
  return componentCache.get(normalized)!;
}

const AppRoutes = ({ currentPath }: { currentPath: string }) => {
  const Component = resolveRouteComponent(currentPath) ?? NotFound;
  return <Component />;
};

const App = ({ currentPath = "/" }: { currentPath?: string }) => (
  <AppProviders pathname={currentPath}>
    <AppRoutes currentPath={currentPath} />
  </AppProviders>
);

export default App;
