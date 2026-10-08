import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/shared/HeroBackground";

export default function TermsOfService() {
 return (
 <div className="min-h-screen bg-white">
 <Navbar />
 <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
 <HeroBackground />
 <div className="max-w-4xl mx-auto relative z-10">
 <h1 className="text-hero-sm md:text-hero lg:text-[3.5rem] font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">Terms of Service</h1>
 </div>
 </section>
 <main className="pb-20 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto pt-12">
 <p className="text-body leading-relaxed mb-6">
 By using this website, you agree to these terms. If you do not agree, please do not use this site.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">Use of the website</h2>
 <p className="text-body leading-relaxed mb-6">
 Content on this site is provided for general information. You agree not to misuse the website,
 attempt unauthorized access, or interfere with site functionality.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">Intellectual property</h2>
 <p className="text-body leading-relaxed mb-6">
 All website content, branding, and materials are owned by NeoIntelli unless otherwise stated and may
 not be reproduced without prior written permission.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">Limitation of liability</h2>
 <p className="text-body leading-relaxed mb-6">
 NeoIntelli is not liable for any direct or indirect losses arising from use of this website.
 External links are provided for convenience and may be governed by third-party terms.
 </p>
 <p className="text-body leading-relaxed">
 We may update these terms periodically. Continued use of the site indicates acceptance of any changes.
 </p>
 </div>
 </main>
 <Footer />
 </div>
 );
}
