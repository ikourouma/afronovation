import Link from "next/link";
import { ArrowRight, Building2, Landmark, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { audienceSegments } from "@/content/audiences";

const icons: Record<string, LucideIcon> = {
  governments: Landmark,
  enterprises: Building2,
  startups: Rocket,
};

export function AudienceStrip() {
  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Who We Serve"
          title="Built for institutions at every scale."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {audienceSegments.map((segment) => {
            const Icon = icons[segment.slug] ?? Building2;
            return (
              <Link
                key={segment.slug}
                href={segment.ctaHref}
                className="group flex h-full flex-col justify-between rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="space-y-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon aria-hidden className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {segment.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {segment.pitch}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {segment.ctaLabel}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
