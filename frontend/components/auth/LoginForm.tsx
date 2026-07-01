"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { AuthFooterLink } from "./AuthLayout";

function AuthInput({
  label,
  id,
  type = "text",
  required = true,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-text outline-none transition-shadow placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

interface AuthResponse {
  accessToken: string;
  user: { id: string; name: string; email: string };
}

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const data = await api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      setToken(data.accessToken);
      router.push("/chat");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Unable to connect to server. Is the backend running?");
      }
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}
        <AuthInput
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-md disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <AuthFooterLink
        text="Don't have an account?"
        linkText="Sign up"
        href="/signup"
      />
    </>
  );
}
