"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { isAuthenticated, logout as clearAuth, removeToken } from "@/lib/auth";
import type { UserProfile } from "@/types/user";

export function useCurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await api<UserProfile>("/auth/me");
      setUser(profile);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router]);

  return {
    user,
    loading,
    isLoggedIn: !!user,
    logout,
    refreshUser: fetchUser,
  };
}
