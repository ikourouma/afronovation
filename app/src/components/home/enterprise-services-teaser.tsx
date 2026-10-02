import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { ctaLabels } from "@/content/site";
import { enterpriseServiceCategories, getServicesByCategory } from "@/content/enterprise-services";

export function EnterpriseServicesTeaser() {
  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The Foundation"
            title="One catalog of Enterprise Digital Services, every platform."
            description="Reusable capabilities - not one-off code - power each mission-specific platform."
          />
          <Button asChild variant="outline">
            <Link href="/enterprise-services">{ctaLabels.viewFullCatalog}</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {enterpriseServiceCategories.map((category) => {
            const count = getServicesByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/enterprise-services#${category.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="space-y-2">
                  <p className="font-heading font-semibold">{category.name}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {category.tagline}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {count} services
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
