# Deletion Candidates & Safety Audit

**Audit Rule**: DO NOT delete anything merely because it looks old. Only mark `YES` when verified with 100% confidence to cause zero runtime, route, or out-of-scope breakage.

---

## Detailed File Safety Inventory

| File Path | Description | References & Callers | Dynamic Imports / Routes | Used by Out-of-Scope Pages? | Proposed Replacement | Confidence | Safe to Delete? | Justification & Risk Mitigation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `src/pages/services/AITalentAcquisition.tsx` | Legacy AI Talent Acquisition page | Linked from `AIDataRecruitment.tsx`, `RecruitmentHub.tsx`, `seo.ts`, `pageMeta.ts`, `blogPosts.ts`, and test files. | Registered in `src/App.tsx` (`/services/ai-talent-acquisition`) | **YES** (Linked from `/recruitment/recruitment-hub`) | `/services/ai-talent` and `/services/ai-talent/recruitment-hub` | High that it is legacy; Zero safety to delete | **NO** | **Critical Route Violation**: Deleting this file will break route resolution in `src/App.tsx`, causing a 404 for incoming traffic, broken links from `/recruitment`, and failed test suites. Must remain active or be redirected via 301 before deletion. |
| `src/pages/services/AIDataRecruitment.tsx` | Legacy AI Data Recruitment page | Linked from `AITalentAcquisition.tsx`, `seo.ts`, `pageMeta.ts`, and test files. | Registered in `src/App.tsx` (`/services/ai-data-recruitment`) | **YES** (Registered in global SEO and sitemap registries) | `/services/ai-talent/data-engineering-data-science-hiring` | High that it is legacy; Zero safety to delete | **NO** | **Critical Route Violation**: Active route in `src/App.tsx`. Deletion would break SEO crawlability and direct URL visits. |
| `src/components/sections/Hero.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/Hero` | None | May be imported by legacy tests or external scripts | `@/features/home/components/Hero` | High | **NO** | Harmless 3-line shim. Deleting risks breaking untracked imports without offering any performance gain. Retain as alias. |
| `src/components/sections/Consultation.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/Consultation` | None | May be imported by legacy tests or external scripts | `@/features/home/components/Consultation` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/DecisionTools.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/DecisionTools` | None | May be imported by legacy tests or external scripts | `@/features/home/components/DecisionTools` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/EngagementModel.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/EngagementModel` | None | May be imported by legacy tests or external scripts | `@/features/home/components/EngagementModel` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/FAQSection.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/FAQSection` | None | May be imported by legacy tests or external scripts | `@/features/home/components/FAQSection` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/GCCCapabilitiesMosaic.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/GCCCapabilitiesMosaic` | None | May be imported by legacy tests or external scripts | `@/features/home/components/GCCCapabilitiesMosaic` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/GCCLifecycle.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/GCCLifecycle` | None | May be imported by legacy tests or external scripts | `@/features/home/components/GCCLifecycle` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/GCCStartingPoint.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/GCCStartingPoint` | None | May be imported by legacy tests or external scripts | `@/features/home/components/GCCStartingPoint` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/Industries.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/Industries` | None | May be imported by legacy tests or external scripts | `@/features/home/components/Industries` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/Insights.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/Insights` | None | May be imported by legacy tests or external scripts | `@/features/home/components/Insights` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/NeoHireXMatrix.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/NeoHireXMatrix` | None | May be imported by legacy tests or external scripts | `@/features/home/components/NeoHireXMatrix` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/UniversalLifecycle.tsx` | 3-line re-export shim | Re-exports from `src/components/shared/UniversalLifecycle` | None | May be imported by legacy tests or external scripts | `@/components/shared/UniversalLifecycle` | High | **NO** | Retain as alias barrel. |
| `src/components/sections/WhyNeoIntelliLifecycle.tsx` | 3-line re-export shim | Re-exports from `src/features/home/components/WhyNeoIntelliLifecycle` | None | May be imported by legacy tests or external scripts | `@/features/home/components/WhyNeoIntelliLifecycle` | High | **NO** | Retain as alias barrel. |
| `src/components/layout/Navbar.tsx` | 3-line re-export shim | Re-exports from `src/components/navigation/Navbar` | None | Used across `GccStrategyPageLayout`, `MicroGCC.tsx`, etc. | `@/components/navigation/Navbar` | High | **NO** | Active import path across multiple page layouts. Deleting would cause immediate import breakage. |
| `src/components/shared/SpecialistHiringMosaic.tsx` | 4-line re-export shim | Re-exports from `src/components/ai-talent/SpecialistHiringMosaic` | None | None | `@/components/ai-talent/SpecialistHiringMosaic` | High | **NO** | Retain as alias barrel. |
| `src/components/ai-engineering/Section.tsx` | 33-line wrapper shim | Forwards props to `src/components/ai-gcc/Section` | None | Used in 7 subpages in `ai-engineering/` | `@/components/ui/Section` | High | **NO** | Retain as wrapper until subpages are safely repointed. |

---

## Safety Verdict Summary

**Total Candidate Files Evaluated**: 18  
**Approved for Immediate Deletion**: **0 files (NONE)**  
**Retained as Safe Backwards-Compatible Forwarders**: **16 files**  
**Retained Active Routes Requiring Formal Redirect Strategy**: **2 files** (`AITalentAcquisition.tsx`, `AIDataRecruitment.tsx`)

### Protocol:
Under this refactoring plan, **no files will be deleted**. All architectural improvements are achieved via consolidation, component extraction, and non-breaking delegation wrappers.

