"use client";

import { motion } from "framer-motion";
import { SUGGESTED_PROMPTS } from "@/lib/mock-data";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-12">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-[#fff5eb] to-[#ffd6e8] blur-3xl" />
          <div className="relative">
            <h2 className="font-serif text-2xl font-semibold text-text sm:text-3xl">
              Ayubowan — how can I help?
            </h2>
            <p className="mt-2 text-text-muted">
              Ask anything. Ceylon AI is ready to help.
            </p>
          </div>
        </motion.div>

        <div className="mt-10 flex w-full flex-wrap justify-center gap-2.5">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSelectPrompt(prompt)}
              className="prompt-chip inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-left text-sm text-text"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-warm" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
