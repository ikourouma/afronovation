import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import {
  enterpriseServiceCategories,
  enterpriseServiceStatusLabels,
  getServicesByCategory,
} from "@/content/enterprise-services";
import { getCollection } from "@/lib/cms/read";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Enterprise Digital Services",
  description:
    "The shared catalogue of reusable enterprise digital services that every Afronovation platform is composed from.",
};

export default async function EnterpriseServicesPage() {
  const services = await getCollection("enterpriseServices");
  const liveCount = services.filter((service) => service.status !== "roadmap").length;

  return (
    <>
      <InteriorHero
        eyebrow="Enterprise digital services"
        title={`${liveCount} reusable services. Any mission.`}
        description="Every Afronovation platform is composed from the same catalogue, so proven capabilities, not one-off code, power each new mission."
      >
        <Button asChild size="lg" className="h-12 px-6 text-base">
          <Link href="/platforms">
            See the platforms
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </InteriorHero>

      <Section spacing="xl">
        <Container className="space-y-10">
          <SectionHeading
            title="One proven architecture"
            description="Platforms sit on shared services; program, change and adoption run alongside every deployment."
          />
          <ArchitectureDiagram />
        </Container>
      </Section>

      <Section spacing="xl" className="bg-surface">
        <Container className="space-y-16">
          {enterpriseServiceCategories.map((category) => (
            <div key={category.slug} id={category.slug} className="scroll-mt-28 space-y-6">
              <div className="flex flex-col gap-1 border-b pb-4">
                <h2 className="flex items-center gap-3 font-heading text-2xl font-bold sm:text-3xl">
                  <span className="heading-marker" aria-hidden />
                  {category.name}
                </h2>
                <p className="font-serif text-lg text-muted-foreground">{category.tagline}</p>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {getServicesByCategory(services, category.slug).map((service) => (
                  <li
                    key={service.slug}
                    className={cn(
                      "flex flex-col rounded-md border bg-card p-6",
                      service.status === "roadmap" && "border-dashed",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading text-lg font-bold">
                        {service.name}
                        {service.deliveredWithPartners ? (
                          <span className="ml-1.5 text-gold" title="Delivered with partners">◆</span>
                        ) : null}
                      </h3>
                      <span
                        className={cn(
                          "shrink-0 rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase",
                          service.status === "available" && "bg-[#e6f4ee] text-[#185c3d]",
                          service.status === "pilot" && "bg-secondary text-secondary-foreground",
                          service.status === "roadmap" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {enterpriseServiceStatusLabels[service.status]}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 font-serif leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <p className="mt-5 text-xs font-semibold text-muted-foreground">
                      {service.status === "roadmap" ? "Planned for" : "Used by"}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {service.usedBy.map((usedBy) => (
                        <li key={usedBy} className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium">
                          {usedBy}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {getServicesByCategory(services, category.slug).some((service) => service.deliveredWithPartners) ? (
                <p className="text-sm text-muted-foreground">
                  <span className="text-gold">◆</span> Delivered with partners.
                </p>
              ) : null}
            </div>
          ))}
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
