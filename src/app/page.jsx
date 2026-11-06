import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import InteractiveShowcase from "@/components/landing/InteractiveShowcase";
import FunnelSection from "@/components/landing/FunnelSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import PricingSection from "@/components/landing/PricingSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCta from "@/components/landing/FinalCta";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col">
      <LandingHeader />
      <main className="w-full pt-16 flex-1">
        <HeroSection />
        <InteractiveShowcase />
        <FunnelSection />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  );
}
