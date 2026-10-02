import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Constellation } from "@/components/brand/constellation";
import { CtaSection } from "@/components/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on digital government, platforms and transformation across the U.S. and Africa, plus Afronovation news.",
};

const streams = [
  {
    id: "perspectives",
    title: "Perspectives",
    body: "Thought leadership on digital government, platforms and adoption from the team delivering the work.",
    accent: "#e25c9e",
  },
  {
    id: "news",
    title: "News & press releases",
    body: "Announcements, launches, partnerships and milestones.",
    accent: "#6d52d8",
  },
  {
    id: "reports",
    title: "Reports & downloads",
    body: "Briefs, reports and the Afronovation Capabilities Portfolio.",
    accent: "#f1a13d",
  },
];

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

      <Section spacing="xl">
        <Container className="space-y-12">
          <SectionHeading
            title="First articles are on the way"
            description="Subscribe and we will send you new insights and company news as soon as they are published."
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {streams.map((stream) => (
              <li
                key={stream.id}
                id={stream.id}
                className="scroll-mt-28 rounded-md border border-t-4 bg-card p-7"
                style={{ borderTopColor: stream.accent }}
              >
                <h2 className="font-heading text-xl font-bold">{stream.title}</h2>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
                  {stream.body}
                </p>
                <p className="mt-5 text-sm font-semibold text-muted-foreground">Coming soon</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="#newsletter">
                Subscribe
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <SocialLinks heading="Follow us" />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
