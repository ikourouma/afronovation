import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { contact, ctaLabels, ctaSection } from "@/content/site";

/** Closing call to action used at the end of every page. */
export function CtaSection() {
  return (
    <Section spacing="xl">
      <Container>
        <div className="rounded-lg bg-brand-gradient p-px">
          <div className="flex flex-col gap-8 rounded-[calc(var(--radius)*1.4-1px)] bg-background p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-serif text-lg italic text-primary">{ctaSection.closingLine}</p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {ctaSection.headline}
              </h2>
              <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">
                {ctaSection.subcopy}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link href={ctaLabels.primaryHref}>
                  {ctaSection.buttonLabel}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
