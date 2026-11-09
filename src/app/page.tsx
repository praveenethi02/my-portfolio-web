import { AboutSection } from "@/components/home/about-section";
import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { HighlightsSection } from "@/components/home/highlights-section";

// The home page is just a stack of sections; each section lives in its own file
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HighlightsSection />
      <CtaSection />
    </>
  );
}
