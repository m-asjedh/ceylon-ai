"use client";

import { motion } from "framer-motion";
import { fadeUp, LandingPill, LandingSection, SectionHeader } from "./ui";

const useCases = [
  {
    label: "Travel",
    title: "Plan your island trip",
    prompt: "Plan a 5-day trip to Ella and the south coast",
    tags: ["Ella", "Beaches", "Itineraries"],
  },
  {
    label: "Food",
    title: "Discover local flavours",
    prompt: "Best kottu spots in Colombo and what to order",
    tags: ["Kottu", "Hoppers", "Street food"],
  },
  {
    label: "Study",
    title: "Learn faster",
    prompt: "Explain photosynthesis simply for O/L science",
    tags: ["Exams", "Summaries", "Homework"],
  },
  {
    label: "Work",
    title: "Draft and refine",
    prompt: "Write a professional email to a client in Sri Lanka",
    tags: ["Emails", "Ideas", "Writing"],
  },
];

export function UseCases() {
  return (
    <LandingSection id="use-cases">
      <SectionHeader
        eyebrow="Use cases"
        title="Built for everyday life in Sri Lanka"
        description="Real prompts people ask — travel, food, school, work, and more."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {useCases.map((item, i) => (
          <motion.article
            key={item.label}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-[1.75rem] bg-[#fff5eb] p-5 sm:p-6"
          >
            <LandingPill>{item.label}</LandingPill>
            <h3 className="text-lg font-semibold text-[#111827]">{item.title}</h3>
            <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm italic text-[#6b7280]">
              &ldquo;{item.prompt}&rdquo;
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-[#6b7280]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </LandingSection>
  );
}
