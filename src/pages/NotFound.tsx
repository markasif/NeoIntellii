import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const suggestedLinks = [
 { name:"Homepage", href:"/"},
 { name:"GCC Services", href:"/services/gcc"},
 { name:"AI-first GCC", href:"/services/ai-gcc"},
 { name:"Contact", href:"/contact"},
 { name:"GCC Blueprint", href:"/blueprint"},
];

export default function NotFound() {
 const location = useLocation();

 useEffect(() => {
 document.title ="Page Not Found | NeoIntelli";
 console.error("404 Error:", location.pathname);
 }, [location.pathname]);

 return (
 <div className="min-h-screen bg-white flex flex-col">
 <Navbar />
 <main className="flex-1 flex items-center justify-center py-32 px-6">
 <div className="text-center max-w-lg">
 <motion.p
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5 }}
 className="text-8xl font-display text-[#f0f0f0] mb-4"
 >
 404
 </motion.p>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="text-display-sm font-display text-heading mb-4"
 >
 Page not found
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="text-body text-lg mb-10"
 >
 The page you're looking for doesn't exist or has been moved.
 </motion.p>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.3 }}
 className="flex flex-wrap justify-center gap-3"
 >
 {suggestedLinks.map((link) => (
 <Link
 key={link.href}
 to={link.href}
 className="px-5 py-2.5 rounded-full bg-[#f5f5f7] text-sm text-heading transition-colors"
 >
 {link.name}
 </Link>
 ))}
 </motion.div>
 </div>
 </main>
 <Footer />
 </div>
 );
}
