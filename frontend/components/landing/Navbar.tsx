"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useCurrentUser } from "@/components/auth/useCurrentUser";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "/signup", label: "Get Started" },
];

export function Navbar() {
  const { loading, isLoggedIn, logout } = useCurrentUser();

  return (
    <header className="relative z-20 flex justify-center px-4 pt-6 sm:pt-8">
      <nav className="landing-nav-pill flex h-14 w-full max-w-3xl items-center justify-between rounded-full px-4 sm:px-6">
        <Logo size="sm" variant="light" />

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-full bg-white/10" />
          ) : isLoggedIn ? (
            <>
              <Link
                href="/chat"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition-opacity hover:opacity-90 sm:px-5"
              >
                Chat
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition-opacity hover:opacity-90 sm:px-5"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
