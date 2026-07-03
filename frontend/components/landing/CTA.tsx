"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/useCurrentUser";

export function CTA() {
  const { isLoggedIn } = useCurrentUser();

  return (
    <section className="px-3 py-8 sm:px-5 sm:py-12 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cta-frame relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:rounded-[2.5rem] sm:px-10 sm:py-16"
      >
        <div className="hero-frame-grid opacity-60" aria-hidden />
        <div className="relative z-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6b7280]">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl lg:text-4xl">
            Start your first conversation today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-[#6b7280] sm:text-base">
            Free to try. Private chats. Built for Sri Lanka — open the dashboard
            and ask anything.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={isLoggedIn ? "/chat" : "/signup"}
              className="landing-cta inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-sm font-semibold sm:w-auto sm:px-10"
            >
              {isLoggedIn ? "Open Chat" : "Get Started Free"}
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black/[0.08] bg-white/80 px-8 text-sm font-medium text-[#111827] backdrop-blur-sm transition-colors hover:border-[#fb923c]/40 sm:w-auto sm:px-10"
            >
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
