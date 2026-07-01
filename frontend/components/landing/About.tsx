"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stackCards = [
  {
    label: "AI Models",
    description:
      "Routed through OpenRouter to free-tier models — Llama, Mistral, DeepSeek, and more. Responses in the same league as ChatGPT and Gemini, without a paid API bill.",
    tags: ["OpenRouter", "Llama", "DeepSeek", "Mistral"],
    variant: "light" as const,
  },
  {
    label: "Tech Stack",
    description:
      "A full-stack setup built for speed and reliability — modern React UI, typed APIs, and a Postgres database that keeps every conversation saved to your account.",
    tags: ["Next.js", "NestJS", "Prisma", "Neon"],
    variant: "light" as const,
  },
  {
    label: "Built for Ceylon",
    description:
      "Not a generic chat clone. Ceylon AI is shaped for Sri Lanka — local travel, food, culture, and everyday questions answered with context that actually matters here.",
    tags: ["Sri Lanka", "Private chats", "Free to use"],
    variant: "dark" as const,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm">
      {children}
    </span>
  );
}

function StackCard({
  label,
  description,
  tags,
  variant,
  index,
}: {
  label: string;
  description: string;
  tags: string[];
  variant: "light" | "dark";
  index: number;
}) {
  const isDark = variant === "dark";

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      className={`flex flex-col gap-4 rounded-[1.75rem] p-6 sm:p-7 ${
        isDark
          ? "bg-[#1a1a1a] text-white shadow-lg shadow-black/10"
          : "bg-[#fff5eb] text-[#111827]"
      }`}
    >
      <Pill>{label}</Pill>
      <p
        className={`text-sm leading-relaxed sm:text-[0.95rem] ${
          isDark ? "text-white/85" : "text-[#6b7280]"
        }`}
      >
        {description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              isDark
                ? "bg-white/10 text-white/80"
                : "bg-white/80 text-[#6b7280]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function About() {
  return (
    <section id="about" className="px-3 py-6 sm:px-5 sm:py-8 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 px-1 sm:mb-10"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            About Ceylon AI
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            What powers your conversations
          </h2>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="flex flex-col gap-4 lg:gap-5">
            {stackCards.map((card, i) => (
              <StackCard key={card.label} index={i} {...card} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            id="features"
            className="about-feature-panel relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:min-h-[480px] sm:p-10 lg:min-h-0"
          >
            <div className="about-feature-glow" aria-hidden />
            <div className="about-feature-grid" aria-hidden />

            <div className="relative z-10">
              <Pill>How it works</Pill>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="max-w-md text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                Open-source brains.
                <br />
                Private by default.
                <br />
                Free to start.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
                Sign up once, chat instantly. Your messages hit OpenRouter&apos;s
                model router, get an answer back in seconds, and stay saved in
                your own account — not a shared public bot.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#111827] transition-transform hover:scale-[1.02]"
              >
                Start chatting free
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
