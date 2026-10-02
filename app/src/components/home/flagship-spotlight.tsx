import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ctaLabels, navLabels } from "@/content/site";
import { getFeaturedPlatforms, getFlagshipPlatform } from "@/content/platforms";
import { media } from "@/lib/media";

export function FlagshipSpotlight() {
  const flagship = getFlagshipPlatform();
  const otherFeatured = getFeaturedPlatforms().filter(
    (platform) => platform.slug !== flagship.slug,
  );

  return (
    <Section spacing="lg" className="bg-muted/10">
      <Container className="space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Platforms"
            title="Real platforms, powered by one architecture."
            description="Every platform below is composed from Afronovation's shared catalog of Enterprise Digital Services."
          />
          <Button asChild variant="outline">
            <Link href="/platforms">{ctaLabels.viewAllPlatforms}</Link>
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-radial-glow">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-16/10 lg:aspect-auto">
              <Image
                src={media(flagship.imageKey)}
                alt={flagship.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
              <Badge className="w-fit bg-primary text-primary-foreground">
                {navLabels.flagshipPlatform}
              </Badge>
              <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
                {flagship.name}
              </h3>
              <p className="text-muted-foreground">{flagship.tagline}</p>
              <p className="leading-relaxed text-muted-foreground">
                {flagship.summary}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild>
                  <Link href={`/platforms/${flagship.slug}`}>
                    View case study
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
                {flagship.externalUrl ? (
                  <Button asChild variant="outline">
                    <Link
                      href={flagship.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ctaLabels.visitLiveSite}
                      <ExternalLink aria-hidden />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {otherFeatured.map((platform) => (
            <Link
              key={platform.slug}
              href={`/platforms/${platform.slug}`}
              className="group overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={media(platform.imageKey)}
                  alt={platform.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-1.5 p-5">
                <p className="text-xs font-medium tracking-wide text-primary uppercase">
                  {platform.sector}
                </p>
                <p className="font-heading font-semibold">{platform.name}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {platform.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
