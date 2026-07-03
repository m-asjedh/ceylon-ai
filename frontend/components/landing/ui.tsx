"use client";

import { motion } from "framer-motion";

export function LandingPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#111827] shadow-sm">
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-8 px-1 sm:mb-10 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed text-[#6b7280] sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

export function LandingSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-3 py-8 sm:px-5 sm:py-12 lg:px-6 lg:py-16 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
