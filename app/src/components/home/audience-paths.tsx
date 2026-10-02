import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { AudienceSegment } from "@/content/types";

export function AudiencePaths({ segments }: { segments: AudienceSegment[] }) {
  return (
    <Section id="who-we-serve" spacing="xl" className="scroll-mt-24 bg-surface">
      <Container className="space-y-12">
        <SectionHeading
          title="Choose your path"
          description="Whether you are modernising a ministry, funding a programme, delivering alongside us or looking for your next engagement, there is one clear next step."
        />
        <ul className="grid gap-5 md:grid-cols-2">
          {segments.map((segment) => (
            <li
              key={segment.slug}
              className="flex flex-col justify-between gap-6 rounded-md border bg-card p-7 sm:flex-row sm:items-end"
            >
              <div className="max-w-md">
                <h3 className="font-heading text-xl font-bold">{segment.label}</h3>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
                  {segment.pitch}
                </p>
              </div>
              <Link
                href={segment.ctaHref}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {segment.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
