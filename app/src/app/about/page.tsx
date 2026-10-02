import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CredentialsStrip } from "@/components/credentials-strip";
import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { TeamMemberCard } from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  aboutExtended,
  aboutSummary,
  pageHeroes,
  sectionHeadings,
  visionaryTeamCopy,
} from "@/content/site";
import { methodologies, practiceAreas, teamMembers } from "@/content";
import { getPracticeAreaIcon } from "@/lib/practice-area-icons";

export const metadata: Metadata = {
  title: "About",
  description: aboutSummary,
};

export default function AboutPage() {
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
        eyebrow={pageHeroes.about.eyebrow}
        title={pageHeroes.about.title}
        description={aboutSummary}
      />

      <Section spacing="lg">
        <Container className="space-y-8">
          <SectionHeading title="About Us." align="center" />
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {aboutExtended}
          </p>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container className="space-y-10">
          <SectionHeading
            title={sectionHeadings.capabilities}
            description="Our integrated practice areas deliver end-to-end transformation."
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {practiceAreas.map((area) => {
              const Icon = getPracticeAreaIcon(area.slug);
              return (
                <Card key={area.slug} className="h-full">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <CardTitle className="capitalize">{area.name}</CardTitle>
                    <CardDescription className="font-medium text-foreground">
                      {area.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {area.summary}
                    </p>
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link href={`/services/#${area.slug}`}>
                        Learn more
                        <ArrowRight aria-hidden />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" id="team">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="This Is Our"
            title={sectionHeadings.visionaryTeam}
            description={visionaryTeamCopy}
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.slug} member={member} variant="full" />
            ))}
          </div>
          <CredentialsStrip credentials={methodologies} />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
