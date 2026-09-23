import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { MigrationPromo } from "@/components/sections/MigrationPromo";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ServicesPreviewGrid } from "@/components/sections/ServicesPreviewGrid";
import { IndustryRail } from "@/components/sections/IndustryRail";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FaqSection } from "@/components/sections/FaqSection";
import { HomeCtaBand } from "@/components/sections/HomeCtaBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <MigrationPromo />
      <WhyUsSection />
      <ServicesPreviewGrid />
      <IndustryRail />
      <FeaturedProjects />
      <FaqSection />
      <HomeCtaBand />
    </>
  );
}
