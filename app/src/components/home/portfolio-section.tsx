import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PortfolioCard } from "@/components/portfolio-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import type { PortfolioItem } from "@/content/types";

export function PortfolioSection({
  items,
  intro,
}: {
  items: PortfolioItem[];
  intro: string;
}) {
  return (
    <Section spacing="xl" className="bg-surface">
      <Container className="space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading title="What we have built" description={intro} />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/platforms">
              View all platforms
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <PortfolioCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
