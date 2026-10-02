import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  enterpriseServiceCategories,
  getServicesByCategory,
} from "@/content/enterprise-services";
import { enterpriseServicesPageCopy, pageHeroes } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Enterprise Digital Services",
  description: enterpriseServicesPageCopy.summary,
};

export default function EnterpriseServicesPage() {
  return (
    <>
      <InteriorHero
        eyebrow={pageHeroes.enterpriseServices.eyebrow}
        title={pageHeroes.enterpriseServices.title}
        description={enterpriseServicesPageCopy.summary}
      />

      <Section spacing="lg">
        <Container className="space-y-16">
          {enterpriseServiceCategories.map((category, index) => {
            const services = getServicesByCategory(category.slug);
            const reversed = index % 2 === 1;

            return (
              <div
                key={category.slug}
                id={category.slug}
                className="scroll-mt-24 space-y-6"
              >
                <div
                  className={cn(
                    "flex flex-col gap-2 border-b pb-4",
                    reversed && "sm:text-right sm:items-end",
                  )}
                >
                  <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground">{category.tagline}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <Card key={service.slug} className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle>{service.name}</CardTitle>
                          {service.status === "roadmap" ? (
                            <span className="badge-roadmap shrink-0">
                              Roadmap
                            </span>
                          ) : null}
                        </div>
                        <CardDescription className="leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          {service.status === "roadmap" ? "Planned for" : "Used by"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.usedBy.map((usedBy) => (
                            <Badge key={usedBy} variant="secondary">
                              {usedBy}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      <Section spacing="md" className="border-t bg-muted/10">
        <Container>
          <div className="rounded-2xl border bg-radial-glow px-6 py-10 text-center sm:px-10">
            <p className="font-heading text-xl font-semibold text-balance sm:text-2xl">
              See these services composed into real platforms.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Every mission-specific platform we build draws from this same
              catalog of reusable enterprise capabilities.
            </p>
            <Link
              href="/platforms"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              View all platforms
            </Link>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
