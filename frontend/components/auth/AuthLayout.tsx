"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-full flex-1">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="absolute inset-0 warm-gradient-bg" />
        <div className="warm-grid absolute inset-0" aria-hidden />
        <div className="relative">
          <Logo href="/" size="lg" />
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-[#111827]">
            Intelligence rooted in Ceylon.
          </h2>
          <p className="mt-4 max-w-md text-[#6b7280]">
            Chat with AI powered by free open-source models through OpenRouter.
            Sign up, start a conversation, and get answers instantly.
          </p>
        </div>
        <p className="relative text-sm text-[#9ca3af]">
          &copy; {new Date().getFullYear()} Ceylon AI
        </p>
      </div>

      <div className="relative flex flex-1 flex-col bg-white">
        <div className="flex items-center p-4 lg:absolute lg:left-4 lg:top-4 lg:p-0">
          <div className="lg:hidden">
            <Logo href="/" size="sm" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:mb-10">
              <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-text-muted">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthFooterLink({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="mt-6 text-center text-sm text-text-muted">
      {text}{" "}
      <Link href={href} className="font-medium text-accent-warm hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
