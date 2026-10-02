import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Constellation } from "@/components/brand/constellation";
import { CtaSection } from "@/components/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on digital government, platforms and transformation across the U.S. and Africa, plus Afronovation news.",
};

// Articles and news become admin-managed in the content phase; until the
// first ones are published this page points readers to the newsletter.
export default function InsightsPage() {
  return (
    <>
      <section className="theme-navy relative isolate overflow-hidden">
        <Constellation className="-z-10" />
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
            Insights
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Perspectives for leaders building the digital state.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
            Digital government, platforms, investment and adoption, from the team delivering them.
          </p>
        </Container>
        <div className="rule-gold h-1" aria-hidden />
      </section>

      <Section id="news" spacing="xl" className="scroll-mt-24">
        <Container className="space-y-8">
          <SectionHeading
            title="First articles are on the way"
            description="Subscribe and we will send you new insights and company news as soon as they are published."
          />
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href="#newsletter">
              Subscribe to updates
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
