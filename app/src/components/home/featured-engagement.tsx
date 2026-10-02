import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Constellation } from "@/components/brand/constellation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { FeaturedEngagement as FeaturedEngagementData } from "@/content/types";

const statAccents = ["#e25c9e", "#8b6cf0", "#8b6cf0"];

export function FeaturedEngagement({
  engagement,
  id = "featured-engagement",
}: {
  engagement: FeaturedEngagementData;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="theme-navy relative isolate scroll-mt-24 overflow-hidden"
    >
      <Constellation className="-z-10 opacity-60" />
      <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
            {engagement.eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-4 font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl"
          >
            {engagement.title}
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground">
            {engagement.body}
          </p>
          <ol className="mt-8 flex flex-wrap items-center gap-y-3" aria-label="Investment journey">
            {engagement.journey.map((step, i) => (
              <li key={step.title} className="flex items-center">
                <span className="rounded-sm border border-white/15 bg-navy-2 px-3 py-1.5 text-center leading-tight">
                  <span className="block text-sm font-bold">{step.title}</span>
                  <span className="block font-serif text-xs text-[#c9b8ff]">{step.detail}</span>
                </span>
                {i < engagement.journey.length - 1 ? (
                  <ChevronRight className="mx-1 size-4 text-muted-foreground" aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
          <Button asChild size="lg" className="mt-10 h-12 px-6 text-base">
            <Link href={engagement.href}>
              Start a programme
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {engagement.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse rounded-sm border-t-4 bg-white/[0.04] px-4 py-5 text-center"
                style={{ borderTopColor: statAccents[i % statAccents.length] }}
              >
                <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="font-heading text-4xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-right font-serif text-sm italic text-muted-foreground">
            {engagement.statsNote}
          </p>
        </div>
      </Container>
      <div className="rule-gold h-1" aria-hidden />
    </section>
  );
}
