import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ctaLabels,
  pageHeroes,
  sectionHeadings,
  servicesPageCopy,
} from "@/content/site";
import { homepageServices, practiceAreas, servicesPageServices } from "@/content";
import { getPracticeAreaIcon } from "@/lib/practice-area-icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: pageHeroes.services.title,
};

export default function ServicesPage() {
  return (
    <>
      <InteriorHero
        eyebrow={pageHeroes.services.eyebrow}
        title={pageHeroes.services.title}
      />

      <Section spacing="lg">
        <Container className="space-y-16">
          <SectionHeading
            title={sectionHeadings.capabilities}
            align="center"
          />

          {practiceAreas.map((area, index) => {
            const Icon = getPracticeAreaIcon(area.slug);
            const reversed = index % 2 === 1;

            return (
              <article
                key={area.slug}
                id={area.slug}
                className={cn(
                  "scroll-mt-24 grid items-center gap-8 rounded-2xl border bg-card p-6 shadow-sm lg:grid-cols-2 lg:gap-12 lg:p-10",
                  reversed && "lg:[&>*:first-child]:order-2",
                )}
              >
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon aria-hidden className="size-6" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold capitalize">
                    {area.name}
                  </h3>
                  <p className="font-medium text-primary">{area.tagline}</p>
                  <p className="leading-relaxed text-muted-foreground">
                    {area.fullDescription}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/40 p-6">
                  <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Key services
                  </p>
                  <ul className="space-y-3">
                    {area.keyServices.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span className="capitalize">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </Container>
      </Section>

      <Section spacing="lg" className="border-y bg-muted/20">
        <Container className="space-y-8">
          <SectionHeading
            title={sectionHeadings.howWeHelp}
            align="center"
          />
          <ul className="flex flex-wrap justify-center gap-2">
            {homepageServices.map((service) => (
              <li key={service}>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  {service}
                </Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="space-y-8">
          <SectionHeading
            title={sectionHeadings.ourServices}
            description={servicesPageCopy.summary}
            align="center"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicesPageServices.map((service) => (
              <div
                key={service}
                className="rounded-lg border bg-card px-4 py-3 text-sm capitalize"
              >
                {service}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="rounded-2xl border bg-linear-to-r from-primary/5 to-accent/10 px-6 py-10 text-center sm:px-10">
            <p className="font-heading text-xl font-semibold text-balance sm:text-2xl">
              Ready to start your transformation?
            </p>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {servicesPageCopy.summary}
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/contact">{ctaLabels.primary}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
