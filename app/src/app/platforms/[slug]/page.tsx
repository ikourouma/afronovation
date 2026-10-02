import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Target } from "lucide-react";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/cta-section";
import { DemoRequestForm } from "@/components/demo-request-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServicesBySlugs } from "@/content/enterprise-services";
import { getPlatformBySlug, platforms } from "@/content/platforms";
import { ctaLabels, navLabels } from "@/content/site";
import { media } from "@/lib/media";

type PlatformDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({
  params,
}: PlatformDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);

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
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const poweredByServices = getServicesBySlugs(platform.poweredBy);

  return (
    <>
      <Section spacing="md" className="border-b bg-gradient-mesh">
        <Container>
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
            <Link href="/platforms">
              <ArrowLeft aria-hidden />
              All platforms
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{platform.sector}</Badge>
                {platform.status === "flagship" ? (
                  <Badge className="bg-primary text-primary-foreground">
                    {navLabels.flagshipPlatform}
                  </Badge>
                ) : null}
              </div>
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {platform.name}
              </h1>
              <p className="text-lg text-primary">{platform.tagline}</p>
              <p className="leading-relaxed text-muted-foreground">
                {platform.summary}
              </p>
              {platform.externalUrl ? (
                <Button asChild variant="outline">
                  <Link
                    href={platform.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctaLabels.visitLiveSite}
                    <ExternalLink aria-hidden />
                  </Link>
                </Button>
              ) : null}
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src={media(platform.imageKey)}
                alt={platform.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" className="border-b bg-muted/10">
        <Container>
          <p className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
            At a glance
          </p>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <dt className="text-xs text-muted-foreground">Sector</dt>
              <dd className="mt-1 font-medium">{platform.atAGlance.sector}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Region</dt>
              <dd className="mt-1 font-medium">{platform.atAGlance.region}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>
              <dd className="mt-1 font-medium">{platform.atAGlance.status}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                Services used
              </dt>
              <dd className="mt-1 font-medium">
                {platform.atAGlance.servicesUsed.length} services
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-heading text-xl font-semibold">
                The Challenge
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {platform.challenge}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h2 className="font-heading text-xl font-semibold">
                The Opportunity
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {platform.opportunity}
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/10">
        <Container className="space-y-6">
          <SectionHeading title="Our Approach" />
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            {platform.approach}
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="space-y-6">
          <SectionHeading title="Platform Highlights" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {platform.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-xl border bg-card p-4"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-sm leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/10">
        <Container className="space-y-6">
          <SectionHeading
            eyebrow="Reinforcing the platform strategy"
            title="Enterprise Service Architecture"
            description="The reusable Enterprise Digital Services that compose this platform."
          />
          <div className="flex flex-wrap gap-2">
            {poweredByServices.map((service) => (
              <Link
                key={service.slug}
                href={`/enterprise-services#${service.category}`}
              >
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-sm hover:border-primary/50 hover:text-primary"
                >
                  {service.name}
                </Badge>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="space-y-6">
          <SectionHeading title="Expected Impact" />
          <ul className="grid gap-4 sm:grid-cols-2">
            {platform.expectedImpact.map((impact) => (
              <li
                key={impact.label}
                className="flex items-start justify-between gap-3 rounded-xl border bg-card p-4"
              >
                <span className="text-sm leading-relaxed">{impact.label}</span>
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
            <SectionHeading title="Who It Serves" />
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

      <Section spacing="lg" id="demo">
        <Container className="mx-auto max-w-2xl space-y-6">
          <SectionHeading
            eyebrow="Get Started"
            title={`Request a ${platform.name} Demo`}
            description="Tell us about your organization and we'll follow up with next steps."
            align="center"
          />
          <DemoRequestForm platformSlug={platform.slug} platformName={platform.name} />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
