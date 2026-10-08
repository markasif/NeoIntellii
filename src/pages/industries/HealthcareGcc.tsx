import { Microscope, Database, FileCheck, Video } from "lucide-react";
import IndustryGccPage from "@/components/shared/IndustryGccPage";

export default function HealthcareGcc() {
 return (
 <IndustryGccPage
 pageTitle="Healthcare GCC India | Life Sciences & Pharma GCC - NeoIntelli"
 label="Healthcare & Life Sciences"
 breadcrumbLabel="Healthcare GCC"
 h1="Build Your Healthcare & Life Sciences GCC in India"
 subheadline="Pharma companies, healthtech startups, hospital networks, and medical device firms are building AI-powered GCCs in India for drug discovery, clinical analytics, EHR modernization, and regulatory technology."
 ctaText="Plan Your Healthcare GCC"
 accentColor="#059669"
 shortAnswer="A healthcare GCC in India is a captive capability centre that pharma companies, healthtech firms, hospital networks, and medical device companies set up to run drug discovery analytics, clinical data, EHR engineering, and regulatory tech. NeoIntelli helps healthcare enterprises outside India launch a HIPAA-aware, GxP-ready GCC in 8 to 12 weeks with the right compliance, data residency, and clinical engineering talent."
 whyTitle="Why Healthcare Companies Are Building GCCs in India"
 whyBlocks={[
 {
 icon: Microscope,
 title:"AI in Drug Discovery & Clinical Trials",
 desc:"India's bioinformatics and computational biology talent is world-class. GCCs accelerate molecule screening, trial optimization, and real-world evidence analytics.",
 },
 {
 icon: Database,
 title:"Health Data Engineering",
 desc:"EHR/EMR data pipelines, FHIR interoperability, health data lakes, and clinical NLP. India has deep expertise in health informatics platforms (Epic, Cerner, Meditech).",
 },
 {
 icon: FileCheck,
 title:"Regulatory & Compliance Tech",
 desc:"Automated FDA submission preparation, HIPAA compliance systems, GxP validation, and pharmacovigilance platforms.",
 },
 {
 icon: Video,
 title:"Telemedicine & Digital Health",
 desc:"India's telemedicine boom created a pool of engineers experienced in video platforms, remote monitoring, wearable integration, and health AI applications.",
 },
 ]}
 rolesTitle="Healthcare Talent We Place in Your GCC"
 roles={[
"Bioinformatics Engineers",
"Clinical Data Scientists",
"Health AI/ML Engineers (medical imaging, NLP for clinical notes)",
"FHIR / HL7 Integration Engineers",
"Regulatory Technology Engineers",
"Full-Stack Health Platform Engineers",
"QA Engineers (GxP-validated testing, 21 CFR Part 11)",
"Data Engineers (health data lakes, EHR data pipelines)",
 ]}
 darkSectionTitle="Navigating Healthcare Compliance in Your GCC"
 darkItems={[
"HIPAA awareness training and data handling protocols",
"GxP and FDA 21 CFR Part 11 compliance support",
"Data residency and cross-border data transfer agreements",
"BAA (Business Associate Agreement) frameworks",
"SOC 2 Type II audit readiness",
 ]}
 faqs={[
 {
 q:"How does NeoIntelli handle HIPAA compliance in a healthcare GCC?",
 a:"We implement HIPAA awareness training, data handling protocols, and technical safeguards from day one. Our GCC setup includes BAA frameworks, access controls, and audit-ready documentation.",
 },
 {
 q:"Can you support FDA-regulated software development?",
 a:"Yes. We staff QA engineers experienced in GxP-validated testing and 21 CFR Part 11 compliance, and build development processes that support regulatory submissions.",
 },
 {
 q:"What healthcare IT systems does your talent have experience with?",
 a:"Our talent pool includes engineers experienced with Epic, Cerner, Meditech, and other major EHR/EMR platforms, as well as FHIR and HL7 integration standards.",
 },
 {
 q:"How do you handle cross-border health data transfers?",
 a:"We work with legal and compliance teams to establish data residency requirements, cross-border transfer agreements, and technical controls that meet both Indian and international regulatory standards.",
 },
 ]}
 relatedLinks={[
 { name:"GCC Setup & Launch", href:"/services/gcc/setup-launch"},
 { name:"AI-first GCC", href:"/services/ai-gcc"},
 { name:"GCC vs Outsourcing", href:"/gcc-vs-outsourcing"},
 { name:"GCC Cost Calculator", href:"/gcc-cost-calculator"},
 ]}
 ctaBanner={{
 title:"Discuss Your Healthcare GCC",
 description:"Speak with our team about building a healthcare & life sciences capability center in India.",
 buttonText:"Plan Your Healthcare GCC",
 }}
 useConnectedEcosystem
 />
 );
}
