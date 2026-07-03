"use client";

import { motion } from "framer-motion";
import { fadeUp, LandingSection, SectionHeader } from "./ui";

const features = [
  {
    title: "Chat history",
    description:
      "Every conversation is saved to your account. Pick up where you left off — no lost threads.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Rich markdown",
    description:
      "Lists, bold text, code blocks, and links — AI replies render cleanly, not as raw text.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Private by default",
    description:
      "Your chats belong to you. Sign in, talk freely, and keep everything in your own workspace.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Free AI routing",
    description:
      "OpenRouter's free tier routes to capable models — no credit card required to get started.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Mobile ready",
    description:
      "A responsive dashboard that works on phone, tablet, and desktop — chat anywhere.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "Sri Lankan context",
    description:
      "Ask about Ella, kottu, visas, or local tips — answers tuned for life in Ceylon.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <LandingSection id="features">
      <SectionHeader
        eyebrow="Features"
        title="Everything in one dashboard"
        description="A focused chat experience — not a cluttered AI marketplace."
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {features.map((feature, i) => (
          <motion.article
            key={feature.title}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-[1.5rem] bg-[#fff5eb] p-5 sm:rounded-[1.75rem] sm:p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#fb923c] shadow-sm">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-[#111827]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                {feature.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </LandingSection>
  );
}
