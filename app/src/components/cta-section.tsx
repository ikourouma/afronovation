import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ctaSection } from "@/content/site";

export function CtaSection() {
  return (
    <Section
      spacing="xl"
      className="relative overflow-hidden border-t bg-gradient-mesh"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl space-y-6 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {ctaSection.headline}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            {ctaSection.subcopy}
          </p>
          <Button asChild size="lg" className="min-w-40">
            <Link href="/contact">{ctaSection.buttonLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
