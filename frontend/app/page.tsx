import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { About } from "@/components/landing/About";

export default function Home() {
  return (
    <div className="landing-page min-h-screen bg-white">
      <main>
        <Hero />
        <LogoCloud />
        <About />
      </main>
      <footer className="border-t border-black/[0.06] py-8 text-center text-sm text-[#9ca3af]">
        <p>&copy; {new Date().getFullYear()} Ceylon AI. Built in Sri Lanka.</p>
      </footer>
    </div>
  );
}
