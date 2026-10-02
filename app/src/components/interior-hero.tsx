import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { media } from "@/lib/media";

type InteriorHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  imageKey?: string;
  imageAlt?: string;
};

export function InteriorHero({
  eyebrow,
  title,
  description,
  imageKey = "heroes/interior-header.jpg",
  imageAlt = "Decorative header background for Afronovation",
}: InteriorHeroProps) {
  return (
    <Section spacing="md" className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10">
        <Image
          src={media(imageKey)}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl space-y-4 py-6 text-center text-foreground sm:py-10">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
