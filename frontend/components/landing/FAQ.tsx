"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingSection, SectionHeader } from "./ui";

const faqs = [
  {
    question: "Is Ceylon AI free to use?",
    answer:
      "Yes. We route requests through OpenRouter's free model tier. You need an account, but there's no subscription fee to start chatting.",
  },
  {
    question: "Which AI models power the replies?",
    answer:
      "OpenRouter automatically routes to available free models — including families similar to Llama, Mistral, and DeepSeek. Quality is comparable to mainstream assistants for most everyday tasks.",
  },
  {
    question: "Are my chats private?",
    answer:
      "Your conversations are stored in your own account behind JWT authentication. They're not posted publicly or shared with other users.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. Ceylon AI runs in your browser. Sign up, open the dashboard, and start typing — on mobile or desktop.",
  },
  {
    question: "What makes it different from ChatGPT or Gemini?",
    answer:
      "Same kind of AI, different packaging — a clean dashboard, free routing via OpenRouter, and a focus on Sri Lankan context. No app store, no paywall to try it.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left sm:py-6"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-[#111827] sm:text-base">
          {question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff5eb] text-[#111827] transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#6b7280] sm:pb-6 sm:text-[0.95rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <LandingSection id="faq" className="bg-[#fffbf7]">
      <SectionHeader
        eyebrow="FAQ"
        title="Common questions"
        description="Quick answers before you sign up."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-[1.75rem] border border-black/[0.05] bg-white px-5 sm:px-8"
      >
        {faqs.map((faq, i) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </motion.div>
    </LandingSection>
  );
}
