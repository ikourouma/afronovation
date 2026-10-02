import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AudienceStrip } from "@/components/home/audience-strip";
import { ComparisonSection } from "@/components/home/comparison-section";
import { EngagementProcess } from "@/components/home/engagement-process";
import { EnterpriseServicesTeaser } from "@/components/home/enterprise-services-teaser";
import { FaqSection } from "@/components/home/faq-section";
import { FlagshipSpotlight } from "@/components/home/flagship-spotlight";
import { HeroSection } from "@/components/home/hero-section";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { MethodologyBadges } from "@/components/home/methodology-badges";
import { StatBar } from "@/components/home/stat-bar";
import { CtaSection } from "@/components/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { TeamMemberCard } from "@/components/team-member-card";
import { TestimonialCard } from "@/components/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ctaLabels, sectionHeadings, tagline } from "@/content/site";
import {
  homepageServices,
  partnerLogos,
  practiceAreas,
  teamMembers,
  testimonials,
} from "@/content";
import { getPracticeAreaIcon } from "@/lib/practice-area-icons";

export const metadata: Metadata = {
  title: "Home",
  description: tagline,
};

export default function HomePage() {
  const previewTeam = teamMembers.slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatBar />
      <AudienceStrip />

      <Section spacing="lg" className="bg-muted/10">
        <Container className="space-y-10">
          <SectionHeading
            title={sectionHeadings.capabilities}
            description="Three integrated practice areas that turn strategy into lasting impact."
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {practiceAreas.map((area) => {
              const Icon = getPracticeAreaIcon(area.slug);
              return (
                <Card
                  key={area.slug}
                  className="h-full transition-colors hover:border-primary/40"
                >
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
                        {ctaLabels.learnMore}
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

      <MethodologyBadges />
      <ComparisonSection />
      <EngagementProcess />
      <FlagshipSpotlight />
      <EnterpriseServicesTeaser />
      <LogoMarquee logos={partnerLogos} />

      <Section spacing="lg">
        <Container className="space-y-8">
          <SectionHeading title={sectionHeadings.howWeHelp} align="center" />
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

      <Section spacing="lg" className="bg-muted/10">
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title={sectionHeadings.whyClientsLoveUs} />
            <Button asChild variant="outline">
              <Link href="/testimonials">{ctaLabels.allTestimonials}</Link>
            </Button>
          </div>
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.author}
                  className="sm:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="static mt-6 mr-2 translate-x-0 translate-y-0" />
            <CarouselNext className="static mt-6 translate-x-0 translate-y-0" />
          </Carousel>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={sectionHeadings.curiousAboutCulture}
              title="About Us"
              description="Meet the leaders guiding strategy, technology, and change at Afronovation."
            />
            <Button asChild variant="outline">
              <Link href="/about">{ctaLabels.meetTeam}</Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {previewTeam.map((member) => (
              <TeamMemberCard
                key={member.slug}
                member={member}
                variant="compact"
              />
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection />
      <CtaSection />
    </>
  );
}
