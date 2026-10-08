"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "What kinds of companies should consider a GCC in India?",
      answer:
        "Companies that need access to specialist talent, better control over critical capabilities, stronger resilience, and a scalable platform for digital, data, AI, or operations work should evaluate a GCC model.",
    },
    {
      question: "Does NeoIntelli only help with new GCC launches?",
      answer:
        "No. We support both greenfield launches and the transformation of existing centers that need stronger governance, better operating performance, or AI-enabled capabilities.",
    },
    {
      question: "How is NeoIntelli different from a staffing firm?",
      answer:
        "Staffing may be one element of execution, but NeoIntelli focuses on the larger system: operating model, leadership design, governance, technology, compliance, and long-term value creation.",
    },
    {
      question: "Do you support AI programs inside GCCs?",
      answer:
        "Yes. NeoIntelli helps companies design AI-first GCCs, including strategy, data engineering, MLOps, generative AI, and responsible AI governance.",
    },
    {
      question: "What should happen before a company launches a GCC?",
      answer:
        "The business case, mandate, governance structure, location logic, talent strategy, technology foundation, and launch sequence should be aligned before execution begins.",
    },
  ];

  return (
    <section id="faq" className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[#E7EDF9]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Common Inquiries & Answers"
          title="Frequently Asked Questions"
          description="Clear answers to the key operational, legal, and strategic questions enterprise leaders ask."
          className="!mb-6 sm:!mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E2EDF5] bg-white transition-all overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base md:text-lg font-extrabold text-[#2B3D66] pr-3 sm:pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-[#E2EDF5] transition-transform duration-200 ${
                      isOpen ? "bg-[#169DC8] text-white rotate-180" : "bg-slate-50 text-[#536485]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-[#536485] leading-relaxed border-t border-[#E2EDF5] pt-3 sm:pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
