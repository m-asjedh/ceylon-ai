"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { Navbar } from "./Navbar";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  const { isLoggedIn } = useCurrentUser();

  return (
    <section className="px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="hero-frame flex min-h-[min(92vh,920px)] flex-col overflow-hidden sm:min-h-[min(88vh,960px)]">
        <div className="hero-frame-grid" aria-hidden />

        <Navbar />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-6 text-center sm:px-6 sm:py-8"
        >
          <motion.span
            variants={item}
            className="landing-badge mb-6 inline-flex rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b7280] sm:mb-8"
          >
            Unlock conversational power
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.25rem]"
          >
            Empower Your Conversations with Next-Gen AI Dashboard
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#6b7280] sm:mt-6 sm:text-lg"
          >
            Unlock seamless communication and streamline your messaging
            experience with our innovative dashboard solution.
          </motion.p>

          <motion.div variants={item} className="mt-8 sm:mt-10">
            <Link
              href={isLoggedIn ? "/chat" : "/signup"}
              className="landing-cta inline-flex h-12 items-center justify-center rounded-full px-10 text-sm font-semibold"
            >
              {isLoggedIn ? "Open Chat" : "Get Started"}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="relative z-10 flex shrink-0 justify-center px-4 sm:px-10"
        >
          <div className="landing-dashboard-peek w-full max-w-5xl overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
            <Image
              src="/chat_dashboard.png"
              alt="Ceylon AI chat dashboard preview"
              width={1440}
              height={900}
              priority
              unoptimized
              className="h-auto w-full"
              sizes="(max-width: 1024px) 92vw, 1024px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
