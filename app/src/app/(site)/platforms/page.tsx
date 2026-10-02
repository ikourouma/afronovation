import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CtaSection } from "@/components/cta-section";
import { FeaturedEngagement } from "@/components/home/featured-engagement";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PortfolioCard } from "@/components/portfolio-card";
import { Button } from "@/components/ui/button";
import { portfolioIntro } from "@/content/portfolio";
import { getCollection, getSingleton } from "@/lib/cms/read";
import { futurePlatformsCallout } from "@/content/platforms";

export const metadata: Metadata = {
  title: "Platforms",
  description: portfolioIntro,
};

export default async function PlatformsPage() {
  const [portfolioItems, featuredEngagement] = await Promise.all([
    getCollection("portfolio"),
    getSingleton("featuredEngagement"),
  ]);
  return (
    <>
      <InteriorHero
        eyebrow="Mission-specific platforms"
        title="Nine platforms. One proven architecture."
        description={portfolioIntro}
      >
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <Link href="/contact?intent=briefing">
            Book a Briefing
            <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 border-white/30 bg-transparent px-6 text-base hover:bg-white/10"
        >
          <Link href="/enterprise-services">The services behind them</Link>
        </Button>
      </InteriorHero>

      <Section spacing="xl">
        <Container className="space-y-12">
          <SectionHeading title="What we have built" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <li
                key={item.slug}
                // The Zimbabwe anchor belongs to its full engagement band below.
                id={item.slug === "zimbabwe-investment-platform" ? undefined : item.slug}
                className="scroll-mt-28"
              >
                <PortfolioCard item={item} />
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-md border border-dashed p-6">
              <div>
                <h3 className="font-heading text-lg font-bold">{futurePlatformsCallout.name}</h3>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
                  {futurePlatformsCallout.tagline}
                </p>
              </div>
              <Link
                href="/contact?intent=briefing"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {futurePlatformsCallout.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          </ul>
        </Container>
      </Section>

      <FeaturedEngagement engagement={featuredEngagement} id="zimbabwe-investment-platform" />

      <Section spacing="xl">
        <Container className="space-y-10">
          <SectionHeading
            title="One proven architecture"
            description="Every platform is composed from the same enterprise digital services, so each new mission launches faster and with less risk."
          />
          <ArchitectureDiagram />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
