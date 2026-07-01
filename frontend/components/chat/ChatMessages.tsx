"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/mock-data";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { EmptyState } from "./EmptyState";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export function ChatMessages({
  messages,
  isTyping,
  onSelectPrompt,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <EmptyState onSelectPrompt={onSelectPrompt} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <div className="w-full space-y-5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
