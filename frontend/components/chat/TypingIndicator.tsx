"use client";

import { motion } from "framer-motion";
import { AssistantAvatar } from "./AssistantAvatar";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex w-full justify-start gap-3"
    >
      <AssistantAvatar />
      <div className="flex items-center gap-1 rounded-xl border border-border bg-[var(--assistant-msg)] px-4 py-4 shadow-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-accent-warm"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
