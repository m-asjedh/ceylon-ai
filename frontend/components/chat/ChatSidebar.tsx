"use client";

import Link from "next/link";
import type { Chat } from "@/lib/mock-data";
import { Logo } from "@/components/Logo";

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
}

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function ChatSidebar({
  chats,
  activeChatId,
  isOpen,
  onClose,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onLogout,
  userName = "Guest",
  userEmail,
}: ChatSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border bg-white/90 backdrop-blur-md transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <Logo href="/" size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:bg-surface-elevated lg:hidden"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-2 p-3">
          <button
            type="button"
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-accent px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Chat
          </button>
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-accent-warm hover:text-accent-warm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
            Home
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-2">
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-text-muted">
            History
          </p>
          <ul className="space-y-0.5">
            {chats.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <li key={chat.id} className="group">
                  <div
                    className={`flex items-center gap-0.5 rounded-lg transition-colors ${
                      isActive
                        ? "border-l-2 border-accent-warm bg-[#fff5eb]"
                        : "border-l-2 border-transparent hover:bg-[#fff5eb]/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelectChat(chat.id);
                        onClose();
                      }}
                      className="flex min-w-0 flex-1 flex-col py-2.5 pl-3 pr-1 text-left"
                    >
                      <span className="truncate text-sm font-medium text-text">
                        {chat.title}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatRelativeTime(chat.updatedAt)}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="mr-1 shrink-0 rounded p-1.5 text-text-muted opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                      aria-label={`Delete ${chat.title}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-warm/20 text-xs font-semibold text-accent-warm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text">{userName}</p>
              {userEmail && (
                <p className="truncate text-xs text-text-muted">{userEmail}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:border-red-400 hover:text-red-500"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
