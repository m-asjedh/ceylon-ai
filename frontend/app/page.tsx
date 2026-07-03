import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { UseCases } from "@/components/landing/UseCases";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="landing-page min-h-screen bg-white">
      <main>
        <Hero />
        <LogoCloud />
        <About />
        <Features />
        <HowItWorks />
        <UseCases />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
