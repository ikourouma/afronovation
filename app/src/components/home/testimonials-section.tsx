import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { Testimonial } from "@/content/types";

/** Renders only testimonials switched to "published" in the admin. */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section spacing="xl" className="bg-surface">
      <Container className="space-y-12">
        <SectionHeading title="What our clients say" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.author}>
              <figure className="flex h-full flex-col rounded-md border border-l-4 border-l-pink bg-card p-7">
                <blockquote className="flex-1 font-serif text-lg leading-relaxed">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-bold">{testimonial.author}</span>
                  <span className="block text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
