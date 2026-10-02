import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PlatformCard } from "@/components/platform-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ctaLabels, navLabels, pageHeroes } from "@/content/site";
import {
  futurePlatformsCallout,
  getFlagshipPlatform,
  platforms,
  platformsIntro,
} from "@/content/platforms";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Platforms",
  description: platformsIntro,
};

export default function PlatformsPage() {
  const flagship = getFlagshipPlatform();
  const rest = platforms.filter((platform) => platform.slug !== flagship.slug);

  return (
    <>
      <InteriorHero
        eyebrow={pageHeroes.platforms.eyebrow}
        title={pageHeroes.platforms.title}
        description={platformsIntro}
      />

      <Section spacing="lg">
        <Container className="space-y-10">
          <Link
            href={`/platforms/${flagship.slug}`}
            className="group block overflow-hidden rounded-2xl border border-primary/30 bg-radial-glow"
          >
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative aspect-16/10 lg:aspect-auto">
                <Image
                  src={media(flagship.imageKey)}
                  alt={flagship.imageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
                <Badge className="w-fit bg-primary text-primary-foreground">
                  {navLabels.flagshipPlatform}
                </Badge>
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                  {flagship.name}
                </h2>
                <p className="text-muted-foreground">{flagship.tagline}</p>
                <p className="leading-relaxed text-muted-foreground">
                  {flagship.summary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View case study
                  <ArrowRight aria-hidden className="size-4" />
                  {flagship.externalUrl ? (
                    <>
                      <span className="mx-1 text-muted-foreground">·</span>
                      {ctaLabels.visitLiveSite}
                      <ExternalLink className="size-3.5" aria-hidden />
                    </>
                  ) : null}
                </span>
              </div>
            </div>
          </Link>

          <SectionHeading
            eyebrow="More Platforms"
            title="Every mission, one architecture."
            align="left"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((platform) => (
              <PlatformCard key={platform.slug} platform={platform} />
            ))}

            <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-border/70 bg-card/40 p-6">
              <div className="space-y-2">
                <p className="font-heading text-lg font-semibold">
                  {futurePlatformsCallout.name}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {futurePlatformsCallout.tagline}
                </p>
              </div>
              <Button asChild variant="outline" className="mt-6 w-fit">
                <Link href={futurePlatformsCallout.ctaHref}>
                  {futurePlatformsCallout.ctaLabel}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
