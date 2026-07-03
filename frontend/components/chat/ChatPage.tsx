"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { getToken, isAuthenticated, logout } from "@/lib/auth";
import type { Chat, Message } from "@/lib/mock-data";
import { MOCK_CHATS, MOCK_MESSAGES } from "@/lib/mock-data";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { Logo } from "@/components/Logo";

interface ChatWithMessages extends Chat {
  messages?: Message[];
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export function ChatPage() {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messagesByChat, setMessagesByChat] = useState<
    Record<string, Message[]>
  >({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [useMock, setUseMock] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    async function init() {
      try {
        const [profile, chatList] = await Promise.all([
          api<UserProfile>("/auth/me"),
          api<Chat[]>("/chat"),
        ]);
        setUser(profile);
        setChats(chatList);
        if (chatList.length > 0) {
          setActiveChatId(chatList[0].id);
          const full = await api<ChatWithMessages>(`/chat/${chatList[0].id}`);
          setMessagesByChat((prev) => ({
            ...prev,
            [full.id]: full.messages ?? [],
          }));
        }
      } catch {
        setUseMock(true);
        setChats(MOCK_CHATS);
        setMessagesByChat(MOCK_MESSAGES);
        setActiveChatId("1");
        setUser({ id: "guest", name: "Guest", email: "guest@local" });
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [router]);

  const activeMessages = activeChatId
    ? messagesByChat[activeChatId] ?? []
    : [];

  const loadChat = useCallback(async (id: string) => {
    if (useMock) return;
    try {
      const full = await api<ChatWithMessages>(`/chat/${id}`);
      setMessagesByChat((prev) => ({
        ...prev,
        [full.id]: full.messages ?? [],
      }));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    }
  }, [useMock]);

  const handleSelectChat = useCallback(
    (id: string) => {
      setActiveChatId(id);
      setError("");
      if (!useMock && !messagesByChat[id]) {
        loadChat(id);
      }
    },
    [useMock, messagesByChat, loadChat],
  );

  const handleNewChat = useCallback(async () => {
    setError("");
    if (useMock) {
      const id = `mock-${Date.now()}`;
      const newChat: Chat = {
        id,
        title: "New Chat",
        updatedAt: new Date().toISOString(),
      };
      setChats((prev) => [newChat, ...prev]);
      setMessagesByChat((prev) => ({ ...prev, [id]: [] }));
      setActiveChatId(id);
      setSidebarOpen(false);
      return;
    }

    try {
      const newChat = await api<Chat>("/chat", { method: "POST" });
      setChats((prev) => [newChat, ...prev]);
      setMessagesByChat((prev) => ({ ...prev, [newChat.id]: [] }));
      setActiveChatId(newChat.id);
      setSidebarOpen(false);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    }
  }, [useMock]);

  const handleDeleteChat = useCallback(
    async (id: string) => {
      setError("");
      if (useMock) {
        setChats((prev) => prev.filter((c) => c.id !== id));
        setMessagesByChat((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        if (activeChatId === id) {
          const remaining = chats.filter((c) => c.id !== id);
          setActiveChatId(remaining[0]?.id ?? null);
        }
        return;
      }

      try {
        await api(`/chat/${id}`, { method: "DELETE" });
        setChats((prev) => prev.filter((c) => c.id !== id));
        setMessagesByChat((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        if (activeChatId === id) {
          const remaining = chats.filter((c) => c.id !== id);
          setActiveChatId(remaining[0]?.id ?? null);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    },
    [useMock, activeChatId, chats],
  );

  const handleSend = useCallback(
    async (content: string) => {
      setError("");
      let chatId = activeChatId;

      if (!chatId) {
        if (useMock) {
          chatId = `mock-${Date.now()}`;
          const newChat: Chat = {
            id: chatId,
            title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
            updatedAt: new Date().toISOString(),
          };
          setChats((prev) => [newChat, ...prev]);
          setMessagesByChat((prev) => ({ ...prev, [chatId!]: [] }));
          setActiveChatId(chatId);
        } else {
          const newChat = await api<Chat>("/chat", { method: "POST" });
          chatId = newChat.id;
          setChats((prev) => [newChat, ...prev]);
          setMessagesByChat((prev) => ({ ...prev, [chatId!]: [] }));
          setActiveChatId(chatId);
        }
      }

      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content,
      };

      setMessagesByChat((prev) => ({
        ...prev,
        [chatId!]: [...(prev[chatId!] ?? []), userMessage],
      }));
      setInputValue("");
      setIsTyping(true);

      if (useMock) {
        setTimeout(() => {
          const assistantMessage: Message = {
            id: `temp-a-${Date.now()}`,
            role: "assistant",
            content:
              "This is a placeholder response. Connect the backend API for real replies.",
          };
          setMessagesByChat((prev) => ({
            ...prev,
            [chatId!]: [...(prev[chatId!] ?? []), assistantMessage],
          }));
          setChats((prev) =>
            prev.map((c) =>
              c.id === chatId
                ? {
                    ...c,
                    title:
                      c.title === "New Chat"
                        ? content.slice(0, 50) +
                          (content.length > 50 ? "..." : "")
                        : c.title,
                    updatedAt: new Date().toISOString(),
                  }
                : c,
            ),
          );
          setIsTyping(false);
        }, 1000);
        return;
      }

      try {
        const result = await api<{
          userMessage: Message;
          assistantMessage: Message;
          chat: Chat;
        }>(`/chat/${chatId}/message`, {
          method: "POST",
          body: JSON.stringify({ content }),
        });

        setMessagesByChat((prev) => {
          const existing = prev[chatId!] ?? [];
          const withoutTemp = existing.filter((m) => m.id !== userMessage.id);
          return {
            ...prev,
            [chatId!]: [
              ...withoutTemp,
              result.userMessage,
              result.assistantMessage,
            ],
          };
        });

        if (result.chat) {
          setChats((prev) =>
            prev.map((c) => (c.id === chatId ? { ...c, ...result.chat } : c)),
          );
        }
      } catch (err) {
        setMessagesByChat((prev) => ({
          ...prev,
          [chatId!]: (prev[chatId!] ?? []).filter(
            (m) => m.id !== userMessage.id,
          ),
        }));
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Failed to send message. Please try again.");
        }
      } finally {
        setIsTyping(false);
      }
    },
    [activeChatId, useMock],
  );

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="flex h-dvh items-center justify-center app-shell text-text-muted">
        Loading...
      </div>
    );
  }

  if (!getToken()) {
    return null;
  }

  return (
    <div className="app-shell flex h-dvh overflow-hidden">
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onLogout={handleLogout}
        userName={user?.name}
        userEmail={user?.email}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-text-muted hover:bg-surface"
            aria-label="Open sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Logo href="/" size="sm" />
        </header>

        {error && (
          <div className="mx-4 mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 sm:mx-6">
            {error}
          </div>
        )}

        {useMock && (
          <div className="mx-4 mt-2 rounded-xl border border-accent-warm/30 bg-accent-warm/10 px-4 py-2 text-xs text-text-muted sm:mx-6">
            Demo mode — backend unavailable. Showing mock data.
          </div>
        )}

        <ChatMessages
          messages={activeMessages}
          isTyping={isTyping}
          onSelectPrompt={setInputValue}
        />

        <ChatInput
          onSend={handleSend}
          disabled={isTyping}
          value={inputValue}
          onChange={setInputValue}
        />
      </div>
    </div>
  );
}
