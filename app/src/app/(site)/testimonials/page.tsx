import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaSection } from "@/components/cta-section";
import { ClientLogos } from "@/components/home/client-logos";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { filterPublishedTestimonials } from "@/content";
import { getCollection } from "@/lib/cms/read";

export const metadata: Metadata = {
  title: "Client stories",
  description: "What governments, institutions and enterprises say about working with Afronovation.",
};

export default async function TestimonialsPage() {
  const [allTestimonials, clientLogos] = await Promise.all([
    getCollection("testimonials"),
    getCollection("clientLogos"),
  ]);
  // Placeholder testimonials stay hidden until published in the admin.
  const testimonials = filterPublishedTestimonials(allTestimonials);

  return (
    <>
      <InteriorHero
        eyebrow="Client stories"
        title="Results our clients can point to."
        description="Measurable outcomes and lasting adoption, in our clients' own words."
      />

      {testimonials.length > 0 ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : (
        <Section spacing="xl">
          <Container className="space-y-6">
            <SectionHeading
              title="Client stories are being prepared"
              description="In the meantime, see the platforms we have built and the national investment platform now running in Zimbabwe."
            />
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/platforms">
                Explore platforms
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Container>
        </Section>
      )}

      <ClientLogos logos={clientLogos} />
      <CtaSection />
    </>
  );
}
