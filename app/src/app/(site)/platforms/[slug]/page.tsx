import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Target } from "lucide-react";
import { notFound } from "next/navigation";

import { Constellation } from "@/components/brand/constellation";
import { CtaSection } from "@/components/cta-section";
import { DemoRequestForm } from "@/components/demo-request-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { getServicesBySlugs } from "@/content/enterprise-services";
import { getCollection } from "@/lib/cms/read";
import { cn } from "@/lib/utils";

type PlatformDetailPageProps = {
  params: Promise<{ slug: string }>;
};

async function findPlatform(slug: string) {
  const platforms = await getCollection("platformPages");
  return platforms.find((platform) => platform.slug === slug);
}

export async function generateStaticParams() {
  const platforms = await getCollection("platformPages");
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({
  params,
}: PlatformDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = await findPlatform(slug);

  if (!platform) {
    return { title: "Platform not found" };
  }

  return {
    title: platform.name,
    description: platform.summary,
  };
}

export default async function PlatformDetailPage({
  params,
}: PlatformDetailPageProps) {
  const { slug } = await params;
  const platform = await findPlatform(slug);

  if (!platform) {
    notFound();
  }

  const poweredByServices = getServicesBySlugs(
    await getCollection("enterpriseServices"),
    platform.poweredBy,
  );

  const statusLabel =
    platform.status === "flagship"
      ? "Flagship"
      : platform.status === "pilot"
        ? "Pilot"
        : platform.status === "upcoming"
          ? "Upcoming"
          : "Operational";

  return (
    <>
      <section className="theme-navy relative isolate overflow-hidden">
        <Constellation className="-z-10" />
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Link
              href="/platforms"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden />
              All platforms
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase",
                  platform.status === "flagship" ? "bg-brand-gradient-deep text-white" : "bg-white/12 text-white",
                )}
              >
                {statusLabel}
              </span>
              <span className="font-serif text-sm italic text-muted-foreground">{platform.sector}</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {platform.name}
            </h1>
            <p className="mt-3 font-heading text-xl font-semibold text-[#f3a9cf]">{platform.tagline}</p>
            <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
              {platform.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link href="#demo">
                  Request a demo
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              {platform.externalUrl ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/30 bg-transparent px-6 text-base hover:bg-white/10"
                >
                  <a href={platform.externalUrl} target="_blank" rel="noopener noreferrer">
                    Visit the live site
                    <ExternalLink aria-hidden />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="rounded-md border border-white/12 bg-navy-2/95 p-6 backdrop-blur">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
              At a glance
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6">
              {[
                { label: "Sector", value: platform.atAGlance.sector },
                { label: "Status", value: platform.atAGlance.status },
                { label: "Region", value: platform.atAGlance.region },
                { label: "Services used", value: `${poweredByServices.length} enterprise services` },
              ].map((item) => (
                <div key={item.label} className="border-t-2 border-pink/70 pt-3">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="mt-0.5 font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
        <div className="rule-gold h-1" aria-hidden />
      </section>

      <Section spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-md border border-t-4 border-t-pink bg-card p-7">
            <h2 className="font-heading text-xl font-bold">The challenge</h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">{platform.challenge}</p>
          </article>
          <article className="rounded-md border border-t-4 border-t-violet bg-card p-7">
            <h2 className="font-heading text-xl font-bold">The opportunity</h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">{platform.opportunity}</p>
          </article>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/10">
        <Container className="space-y-6">
          <SectionHeading title="Our approach" />
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-muted-foreground">
            {platform.approach}
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="space-y-6">
          <SectionHeading title="Platform highlights" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {platform.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-md border bg-card p-4"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pink" />
                <span className="font-serif leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/10">
        <Container className="space-y-6">
          <SectionHeading
            title="Built on enterprise services"
            description="The reusable services this platform is composed from."
          />
          <div className="flex flex-wrap gap-2">
            {poweredByServices.map((service) => (
              <Link
                key={service.slug}
                href={`/enterprise-services#${service.category}`}
              >
                <span className="inline-block rounded-sm border bg-background px-3 py-1.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="space-y-6">
          <SectionHeading title="Expected impact" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {platform.expectedImpact.map((impact) => (
              <li
                key={impact.label}
                className="flex items-start justify-between gap-3 rounded-md border bg-card p-4"
              >
                <span className="font-serif leading-relaxed">{impact.label}</span>
                {impact.targetOutcome ? (
                  <span
                    className="badge-roadmap shrink-0"
                    title="Not yet a verified figure - stated as a target outcome"
                  >
                    <Target className="size-3" aria-hidden />
                    Target outcome
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/10">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeading title="Who it serves" />
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-primary">Primary</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {platform.whoItServes.primary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Secondary</p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {platform.whoItServes.secondary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  Decision-makers
                </p>
                <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {platform.whoItServes.decisionMakers.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeading title="Scalability" />
            <p className="leading-relaxed text-muted-foreground">
              {platform.scalability}
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" id="demo" className="scroll-mt-24 bg-surface">
        <Container className="mx-auto max-w-2xl space-y-6">
          <SectionHeading
            title={`Request a demo of ${platform.name}`}
            description="Tell us about your organization and we will follow up within one business day."
          />
          <DemoRequestForm platformSlug={platform.slug} platformName={platform.name} />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
