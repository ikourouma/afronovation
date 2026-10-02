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
  filterActiveHeroSlides,
  filterPublishedTestimonials,
  portfolioIntro,
  tagline,
} from "@/content";
import { getCollection, getSingleton } from "@/lib/cms/read";

export const metadata: Metadata = {
  title: {
    absolute: "Afronovation | Strategy, technology and digital transformation",
  },
  description: tagline,
};

export default async function HomePage() {
  const [
    heroSlides,
    headlineStats,
    clientLogos,
    practices,
    portfolio,
    featuredEngagement,
    startSteps,
    audiences,
    allTestimonials,
    team,
  ] = await Promise.all([
    getCollection("heroSlides"),
    getCollection("headlineStats"),
    getCollection("clientLogos"),
    getCollection("practices"),
    getCollection("portfolio"),
    getSingleton("featuredEngagement"),
    getCollection("startSteps"),
    getCollection("audiences"),
    getCollection("testimonials"),
    getCollection("team"),
  ]);
  const testimonials = filterPublishedTestimonials(allTestimonials);

  return (
    <>
      <HeroCarousel
        slides={filterActiveHeroSlides(heroSlides)}
        stats={headlineStats}
        rotationSeconds={HERO_ROTATION_SECONDS}
      />
      <ClientLogos logos={clientLogos} />
      <PracticesSection practices={practices} />
      <PortfolioSection items={portfolio} intro={portfolioIntro} />
      <FeaturedEngagement engagement={featuredEngagement} />
      <StartSteps steps={startSteps} />
      <AudiencePaths segments={audiences} />
      {testimonials.length > 0 ? <TestimonialsSection testimonials={testimonials} /> : null}
      <LeadershipSection members={team} />
      <CtaSection />
    </>
  );
}
