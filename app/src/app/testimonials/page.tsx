import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PartnerLogoRow } from "@/components/partner-logo-row";
import { TestimonialCard } from "@/components/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  pageHeroes,
  sectionHeadings,
} from "@/content/site";
import {
  getPublishedTestimonials,
  partnerLogos,
  testimonialsIntro,
} from "@/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description: testimonialsIntro,
};

export default function TestimonialsPage() {
  // Placeholder testimonials stay hidden until approved in the admin.
  const testimonials = getPublishedTestimonials();

  return (
    <>
      <InteriorHero
        eyebrow={pageHeroes.testimonials.eyebrow}
        title={pageHeroes.testimonials.title}
        description={testimonialsIntro}
        imageKey="heroes/testimonial-bg.jpg"
        imageAlt="Background imagery for Afronovation testimonials section"
      />

      <Section spacing="lg">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Testimonials."
            title={sectionHeadings.whyClientsLoveUs}
            align="center"
          />

          {testimonials.length === 0 ? (
            <p className="mx-auto max-w-xl text-center font-serif text-lg text-muted-foreground">
              Client stories are being prepared for publication. In the
              meantime, explore the platforms we have built.
            </p>
          ) : null}

          <div className="hidden md:block">
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.author}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.author}>
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="static mt-4 translate-x-0 translate-y-0" />
              <CarouselNext className="static mt-4 translate-x-0 translate-y-0" />
            </Carousel>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="border-t bg-muted/20">
        <Container className="space-y-8">
          <SectionHeading
            title={sectionHeadings.forwardThinkingPartners}
            align="center"
          />
          <PartnerLogoRow logos={partnerLogos} grayscale={false} />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
