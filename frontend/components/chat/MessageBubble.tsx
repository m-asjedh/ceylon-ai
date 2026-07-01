"use client";

import { motion } from "framer-motion";
import type { Message } from "@/lib/mock-data";
import { AssistantAvatar } from "./AssistantAvatar";
import { MarkdownContent } from "./MarkdownContent";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex w-full justify-end"
      >
        <div className="max-w-[min(100%,42rem)] rounded-2xl rounded-br-sm bg-[var(--user-msg)] px-4 py-3 text-sm leading-relaxed text-text shadow-sm">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full justify-start gap-3"
    >
      <AssistantAvatar />
      <div className="min-w-0 max-w-[min(calc(100%-2.75rem),48rem)] flex-1 rounded-xl border border-border bg-[var(--assistant-msg)] px-4 py-3 text-sm text-text shadow-sm">
        <MarkdownContent content={message.content} />
      </div>
    </motion.div>
  );
}
