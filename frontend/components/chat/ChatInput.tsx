"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function ChatInput({
  onSend,
  disabled = false,
  value: controlledValue,
  onChange,
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  return (
    <div className="border-t border-border bg-white/80 px-5 py-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="chat-input-shadow flex w-full items-end gap-3 rounded-2xl border border-border bg-surface-elevated p-2 sm:p-3"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Message Ceylon AI..."
          rows={1}
          disabled={disabled}
          className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-text outline-none placeholder:text-text-muted disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-text-muted">
        Ceylon AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
