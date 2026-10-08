import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBackground from "@/components/shared/HeroBackground";

export default function PrivacyPolicy() {
 return (
 <div className="min-h-screen bg-white">
 <Navbar />
 <section className="relative isolate pt-28 pb-4 md:pt-36 md:pb-6 px-6 sm:px-8 lg:px-12 text-center overflow-hidden">
 <HeroBackground />
 <div className="max-w-4xl mx-auto relative z-10">
 <h1 className="text-hero-sm md:text-hero lg:text-[3.5rem] font-display text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">Privacy Policy</h1>
 </div>
 </section>
 <main className="pb-20 px-6 sm:px-8 lg:px-12">
 <div className="max-w-4xl mx-auto pt-12">
 <p className="text-body leading-relaxed mb-6">
 NeoIntelli is committed to protecting your privacy. This policy explains what information we collect,
 how we use it, and the choices you have when you use our website.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">Information we collect</h2>
 <p className="text-body leading-relaxed mb-6">
 We may collect information you provide directly, such as your name, email, phone number, company
 details, and any message submitted through our contact forms.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">How we use information</h2>
 <p className="text-body leading-relaxed mb-6">
 We use your information to respond to inquiries, deliver requested services, improve our website,
 and communicate relevant updates about NeoIntelli.
 </p>
 <h2 className="text-display-sm font-display text-heading mt-10 mb-3">Data sharing and security</h2>
 <p className="text-body leading-relaxed mb-6">
 We do not sell personal information. Information is shared only with trusted partners required to
 operate our services or where legally required. We use reasonable safeguards to protect your data.
 </p>
 <p className="text-body leading-relaxed">
 For privacy-related requests, please contact us at{""}
 <a href="mailto:reachus@neointelli.com" className="text-primary">reachus@neointelli.com</a>.
 </p>
 </div>
 </main>
 <Footer />
 </div>
 );
}
