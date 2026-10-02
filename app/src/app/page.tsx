import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { AudiencePaths } from "@/components/home/audience-paths";
import { ClientLogos } from "@/components/home/client-logos";
import { FeaturedEngagement } from "@/components/home/featured-engagement";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { LeadershipSection } from "@/components/home/leadership-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { PracticesSection } from "@/components/home/practices-section";
import { StartSteps } from "@/components/home/start-steps";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import {
  HERO_ROTATION_SECONDS,
  audienceSegments,
  featuredEngagement,
  getActiveHeroSlides,
  getPublishedTestimonials,
  headlineStats,
  partnerLogos,
  portfolioIntro,
  portfolioItems,
  practiceAreas,
  startSteps,
  tagline,
  teamMembers,
} from "@/content";

export const metadata: Metadata = {
  title: {
    absolute: "Afronovation | Strategy, technology and digital transformation",
  },
  description: tagline,
};

export default function HomePage() {
  const testimonials = getPublishedTestimonials();

  return (
    <>
      <HeroCarousel
        slides={getActiveHeroSlides()}
        stats={headlineStats}
        rotationSeconds={HERO_ROTATION_SECONDS}
      />
      <ClientLogos logos={partnerLogos} />
      <PracticesSection practices={practiceAreas} />
      <PortfolioSection items={portfolioItems} intro={portfolioIntro} />
      <FeaturedEngagement engagement={featuredEngagement} />
      <StartSteps steps={startSteps} />
      <AudiencePaths segments={audienceSegments} />
      {testimonials.length > 0 ? <TestimonialsSection testimonials={testimonials} /> : null}
      <LeadershipSection members={teamMembers} />
      <CtaSection />
    </>
  );
}
