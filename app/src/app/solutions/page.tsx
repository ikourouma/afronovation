import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { createElement } from "react";

import { Constellation } from "@/components/brand/constellation";
import { CredentialsStrip } from "@/components/credentials-strip";
import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import {
  advisory,
  digitalGovernment,
  digitalTrust,
  methodologies,
  ndap,
  practiceAreas,
} from "@/content";
import { getPracticeAreaIcon } from "@/lib/practice-area-icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Program and change management, technology and platform development, digital transformation, cybersecurity and digital government, delivered by one accountable team.",
};

const sectionLinks = [
  { label: "Practices", href: "#practices" },
  { label: "Digital Government", href: "#digital-government" },
  { label: "Digital Trust", href: "#digital-trust" },
  { label: "NDAP", href: "#ndap" },
  { label: "Advisory", href: "#advisory" },
];

/* Phase colours follow the portfolio's NDAP chevrons (navy to pink). */
const phaseColors = ["#071e36", "#1b2f63", "#3c3a8f", "#6a4fc4", "#b8609f"];

export default function SolutionsPage() {
  return (
    <>
      <InteriorHero
        eyebrow="Solutions"
        title="From digital ambition to governed, measurable execution."
        description="We help governments, institutions and enterprises turn strategy into working digital platforms, and make sure people adopt them."
      >
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <Link href="/contact?intent=briefing">
            Book a Briefing
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </InteriorHero>

      <nav aria-label="On this page" className="border-b bg-background">
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-3">
            {sectionLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  className="block rounded-full px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Practices */}
      <Section id="practices" spacing="xl" className="scroll-mt-24">
        <Container className="space-y-12">
          <SectionHeading
            title="Four integrated practices"
            description="Senior advisory leadership and in-house platform engineering, under one accountable team."
          />
          <div className="space-y-6">
            {practiceAreas.map((area) => (
              <article
                key={area.slug}
                id={area.slug}
                className="grid scroll-mt-28 gap-8 rounded-md border bg-card p-7 lg:grid-cols-[1.3fr_1fr] lg:p-10"
              >
                <div>
                  {createElement(getPracticeAreaIcon(area.slug), {
                    className: "size-7 text-primary",
                    "aria-hidden": true,
                  })}
                  <h3 className="mt-4 font-heading text-2xl font-bold">{area.name}</h3>
                  <p className="mt-1 font-serif text-lg italic text-primary">{area.tagline}</p>
                  <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">
                    {area.fullDescription}
                  </p>
                </div>
                <div className="rounded-md bg-muted p-6">
                  <p className="text-sm font-bold">What we deliver</p>
                  <ul className="mt-3 space-y-2.5">
                    {area.keyServices.map((service) => (
                      <li key={service} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pink" aria-hidden />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Digital government */}
      <Section id="digital-government" spacing="xl" className="scroll-mt-24 bg-surface">
        <Container className="space-y-14">
          <SectionHeading title="Digital government" description={digitalGovernment.intro} />

          <div>
            <h3 className="font-heading text-xl font-bold">Two portals, one governed platform</h3>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {digitalGovernment.portals.map((portal, i) => (
                <div
                  key={portal.title}
                  className={cn("rounded-md border p-6", i === 1 ? "theme-navy border-transparent" : "bg-card")}
                >
                  <p className="font-heading text-lg font-bold">{portal.title}</p>
                  <p className="font-serif text-sm italic text-muted-foreground">{portal.audience}</p>
                  <ul className="mt-4 space-y-2">
                    {portal.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold">
              Service catalogue: {digitalGovernment.catalogue.length} domains
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {digitalGovernment.catalogue.map((domain) => (
                <li key={domain.name} className="rounded-sm border border-l-4 border-l-violet bg-card px-4 py-3">
                  <p className="font-semibold">{domain.name}</p>
                  <p className="font-serif text-sm text-muted-foreground">{domain.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-6 md:grid-cols-3">
            {digitalGovernment.outcomes.map((outcome) => (
              <li key={outcome.title} className="border-t-2 border-pink pt-4">
                <p className="font-heading text-lg font-bold">{outcome.title}</p>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">{outcome.body}</p>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="font-heading text-xl font-bold">From selection to live service</h3>
            <ol className="mt-5 flex flex-wrap items-center gap-y-3">
              {digitalGovernment.pathway.map((step, i) => (
                <li key={step.title} className="flex items-center">
                  <span className="rounded-sm bg-navy px-4 py-2 text-center leading-tight text-white">
                    <span className="block text-sm font-bold">{step.title}</span>
                    <span className="block font-serif text-xs text-[#c9b8ff]">{step.detail}</span>
                  </span>
                  {i < digitalGovernment.pathway.length - 1 ? (
                    <ChevronRight className="mx-1 size-4 text-muted-foreground" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold">
              Designed for the conditions services are actually used in
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {digitalGovernment.conditions.map((condition) => (
                <li key={condition.title} className="rounded-md border bg-card p-5">
                  <p className="font-bold">{condition.title}</p>
                  <p className="mt-1.5 font-serif text-sm leading-relaxed text-muted-foreground">
                    {condition.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Digital trust */}
      <section id="digital-trust" className="theme-navy relative isolate scroll-mt-24 overflow-hidden">
        <Constellation className="-z-10 opacity-60" />
        <Container className="space-y-10 py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
              The foundation of digital government
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Digital trust &amp; interoperability
            </h2>
            <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground">{digitalTrust.intro}</p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground">{digitalTrust.xroad}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {digitalTrust.properties.map((property) => (
              <li key={property.title} className="rounded-md border border-white/12 bg-white/[0.04] p-5">
                <p className="font-bold">{property.title}</p>
                <p className="mt-1.5 font-serif text-sm leading-relaxed text-muted-foreground">{property.body}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href="/platforms/bridgex">
                Explore BridgeX
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Link href="/enterprise-services#identity-trust-security" className="text-sm font-semibold underline-offset-4 hover:underline">
              Trust building blocks
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">{digitalTrust.trademarkNote}</p>
        </Container>
        <div className="rule-gold h-1" aria-hidden />
      </section>

      {/* NDAP */}
      <Section id="ndap" spacing="xl" className="scroll-mt-24">
        <Container className="space-y-10">
          <SectionHeading title="National Digital Acceleration Program" description={ndap.intro} />
          <ol className="grid gap-2 md:grid-cols-5">
            {ndap.phases.map((phase, i) => (
              <li
                key={phase.title}
                className="rounded-sm p-5 text-white md:[clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)] md:pr-7"
                style={{ backgroundColor: phaseColors[i] }}
              >
                <p className="text-xs font-bold text-[#f6c86a]">{phase.days}</p>
                <p className="mt-1 font-heading text-lg leading-snug font-bold">{phase.title}</p>
                <p className="mt-1.5 font-serif text-sm text-white/80">{phase.detail}</p>
              </li>
            ))}
          </ol>
          <p className="rounded-md border border-dashed border-[#2f9e6b] bg-[#e6f4ee] px-5 py-3 text-center text-sm font-semibold text-[#185c3d]">
            {ndap.throughline}
          </p>
        </Container>
      </Section>

      {/* Advisory */}
      <Section id="advisory" spacing="xl" className="scroll-mt-24 bg-surface">
        <Container className="space-y-14">
          <SectionHeading title="Advisory & partner ecosystem" description={advisory.intro} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {advisory.services.map((service) => (
              <li key={service.title} className="rounded-md border border-t-4 border-t-violet bg-card p-6">
                <p className="font-heading text-lg font-bold">{service.title}</p>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">{service.body}</p>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="font-heading text-xl font-bold">How we deliver with partners</h3>
            <ol className="mx-auto mt-6 max-w-2xl space-y-3 text-center">
              <li className="rounded-md border bg-card px-6 py-4">
                <p className="font-bold">Your government</p>
                <p className="font-serif text-sm text-muted-foreground">One contract · one accountable partner</p>
              </li>
              <li className="theme-navy rounded-md px-6 py-4">
                <p className="font-bold">Afronovation, prime contractor</p>
                <p className="font-serif text-sm text-muted-foreground">
                  Programme leadership, platforms, change and adoption, quality and security assurance
                </p>
              </li>
              <li className="rounded-md border border-dashed bg-card px-6 py-4">
                <p className="font-bold">Specialist partners</p>
                <p className="font-serif text-sm text-muted-foreground">
                  X-Road® implementation, trust services and national-scale systems, with 15+ years of delivery
                </p>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold">Our commitments to every government client</h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {advisory.commitments.map((commitment) => (
                <li key={commitment.title} className="border-t-2 border-violet pt-4">
                  <p className="font-bold">{commitment.title}</p>
                  <p className="mt-1.5 font-serif leading-relaxed text-muted-foreground">{commitment.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <CredentialsStrip credentials={methodologies} />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
