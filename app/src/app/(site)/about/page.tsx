import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CredentialsStrip } from "@/components/credentials-strip";
import { CtaSection } from "@/components/cta-section";
import { GatedDownload } from "@/components/gated-download";
import { ClientLogos } from "@/components/home/client-logos";
import { InteriorHero } from "@/components/interior-hero";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { TeamMemberCard } from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import {
  companyFacts,
  companyMission,
  methodologies,
  whoWeAre,
  whoWeServe,
  whyAfronovation,
} from "@/content";
import { getCollection } from "@/lib/cms/read";

export const metadata: Metadata = {
  title: "About",
  description:
    "A strategy, technology and digital transformation company founded in 2018, with a presence in the United States, Côte d'Ivoire, Guinea and Sierra Leone.",
};


export default async function AboutPage() {
  const [teamMembers, partnerLogos, portfolioItems, downloads] = await Promise.all([
    getCollection("team"),
    getCollection("clientLogos"),
    getCollection("portfolio"),
    getCollection("downloads"),
  ]);
  const portfolioDownload = downloads.find(
    (resource) => resource.slug === "capabilities-portfolio-2026" && resource.active,
  );
  const facts = [
    { value: String(companyFacts.founded), label: "Founded" },
    { value: String(companyFacts.presence.length), label: "Countries of presence" },
    { value: String(portfolioItems.length), label: "Mission-specific platforms" },
    { value: String(teamMembers.length), label: "Senior partners" },
  ];
  return (
    <>
      {teamMembers.map((member) => (
        <JsonLd
          key={member.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: member.name,
            jobTitle: member.role,
            description: member.bio,
            url: member.linkedinUrl ?? undefined,
          }}
        />
      ))}

      <InteriorHero
        eyebrow="About Afronovation"
        title="Senior advisory leadership. In-house platform engineering."
        description="One accountable team that takes institutions from digital ambition to governed, measurable execution."
      >
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <Link href="#team">
            Meet the leadership
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </InteriorHero>

      <Section spacing="xl">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading title="Who we are" />
            <p className="font-serif text-lg leading-relaxed">{whoWeAre}</p>
            <p className="font-serif text-lg leading-relaxed text-muted-foreground">{companyMission}</p>
          </div>
          <div>
          <dl className="grid grid-cols-2 gap-4">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className="flex flex-col-reverse rounded-md border border-t-4 bg-card p-5"
                style={{ borderTopColor: i % 2 === 0 ? "#e25c9e" : "#8b6cf0" }}
              >
                <dt className="mt-1 text-sm text-muted-foreground">{fact.label}</dt>
                <dd className="font-heading text-4xl font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-serif text-sm text-muted-foreground">
            {companyFacts.presence.join(" · ")}
          </p>
          </div>
        </Container>
      </Section>

      <section className="theme-navy">
        <Container className="space-y-10 py-20">
          <h2 className="flex items-center gap-3 font-heading text-3xl font-bold sm:text-4xl">
            <span className="heading-marker" aria-hidden />
            Why Afronovation
          </h2>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyAfronovation.map((reason, i) => (
              <li key={reason.title}>
                <p className="font-heading text-sm font-bold text-gold">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-heading text-xl font-bold">{reason.title}</p>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">{reason.body}</p>
              </li>
            ))}
          </ol>
        </Container>
        <div className="rule-gold h-1" aria-hidden />
      </section>

      <Section spacing="xl">
        <Container className="space-y-10">
          <SectionHeading title="Who we serve" />
          <ul className="grid gap-5 md:grid-cols-2">
            {whoWeServe.map((segment) => (
              <li key={segment.title} className="rounded-md border border-l-4 border-l-pink bg-card p-6">
                <p className="font-heading text-lg font-bold">{segment.title}</p>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">{segment.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="team" spacing="xl" className="scroll-mt-24 bg-surface">
        <Container className="space-y-10">
          <SectionHeading
            title="Leadership"
            description="Partners who have led transformation at the African Development Bank, Cisco Systems, state government and international development institutions."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.slug} member={member} variant="full" />
            ))}
          </div>
          <CredentialsStrip credentials={methodologies} />
        </Container>
      </Section>

      <ClientLogos logos={partnerLogos} />
      {portfolioDownload ? (
        <Section spacing="lg">
          <Container>
            <GatedDownload
              resource={{
                slug: portfolioDownload.slug,
                title: portfolioDownload.title,
                summary: portfolioDownload.summary,
                format: portfolioDownload.format,
              }}
            />
          </Container>
        </Section>
      ) : null}
      <CtaSection />
    </>
  );
}
