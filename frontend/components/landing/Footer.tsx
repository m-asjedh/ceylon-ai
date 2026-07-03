import Link from "next/link";
import { Logo } from "@/components/Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white px-3 py-10 sm:px-5 sm:py-12 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo href="/" size="sm" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6b7280]">
              Sri Lanka&apos;s AI chat assistant — private, free to start, and
              built for everyday questions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Explore
              </p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6b7280] transition-colors hover:text-[#111827]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Account
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/signup"
                    className="text-sm text-[#6b7280] transition-colors hover:text-[#111827]"
                  >
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-[#6b7280] transition-colors hover:text-[#111827]"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/chat"
                    className="text-sm text-[#6b7280] transition-colors hover:text-[#111827]"
                  >
                    Chat
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Stack
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
                <li>Next.js · NestJS</li>
                <li>OpenRouter · Prisma</li>
                <li>Neon PostgreSQL</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-black/[0.06] pt-6 text-center text-sm text-[#9ca3af] sm:text-left">
          &copy; {new Date().getFullYear()} Ceylon AI. Built in Sri Lanka.
        </p>
      </div>
    </footer>
  );
}
