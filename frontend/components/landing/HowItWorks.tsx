"use client";

import { motion } from "framer-motion";
import { fadeUp, LandingSection, SectionHeader } from "./ui";

const steps = [
  {
    step: "01",
    title: "Create your account",
    description:
      "Sign up in seconds with email and password. No payment details needed.",
  },
  {
    step: "02",
    title: "Start a conversation",
    description:
      "Open the dashboard, hit New Chat, and type anything — travel plans, homework, code, or casual questions.",
  },
  {
    step: "03",
    title: "Get instant answers",
    description:
      "Your message routes through OpenRouter to a free model. Replies stream back with full markdown formatting.",
  },
];

export function HowItWorks() {
  return (
    <LandingSection id="how-it-works" className="bg-[#fffbf7]">
      <SectionHeader
        eyebrow="How it works"
        title="Up and running in three steps"
        description="From signup to your first answer in under a minute."
        align="center"
      />

      <div className="relative grid gap-4 sm:gap-5 lg:grid-cols-3">
        <div
          className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[#ffd6e8] to-transparent lg:block"
          aria-hidden
        />

        {steps.map((item, i) => (
          <motion.div
            key={item.step}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
            className="relative flex flex-col items-center rounded-[1.75rem] border border-black/[0.05] bg-white p-6 text-center shadow-sm sm:p-8"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-bold text-white">
              {item.step}
            </span>
            <h3 className="text-lg font-semibold text-[#111827]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </LandingSection>
  );
}
