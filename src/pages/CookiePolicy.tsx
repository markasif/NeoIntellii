import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/shared/HeroBackground";

export default function CookiePolicy() {
 return (
 <div className="min-h-screen bg-white">
 <Navbar />
 <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
 <HeroBackground />
 <div className="max-w-4xl mx-auto relative z-10">
 <h1 className="text-hero-sm md:text-hero lg:text-[3.5rem] font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">Cookie Policy</h1>
 </div>
 </section>
 <main className="pb-20 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto pt-12">
 <p className="text-body leading-relaxed mb-6">
 This website uses cookies and similar technologies to improve your browsing experience, understand site
 usage, and support core functionality.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">What are cookies?</h2>
 <p className="text-body leading-relaxed mb-6">
 Cookies are small text files stored on your device when you visit a website. They help remember
 preferences and enable key website features.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">How we use cookies</h2>
 <p className="text-body leading-relaxed mb-6">
 NeoIntelli may use essential cookies for site operation and analytics cookies to understand traffic and
 improve performance.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">Managing cookies</h2>
 <p className="text-body leading-relaxed">
 You can control or disable cookies through your browser settings. Disabling certain cookies may impact
 how parts of the website function.
 </p>
 </div>
 </main>
 <Footer />
 </div>
 );
}
