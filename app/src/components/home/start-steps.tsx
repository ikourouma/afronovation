import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { StartStep } from "@/content/types";

export function StartSteps({ steps }: { steps: StartStep[] }) {
  return (
    <Section spacing="xl">
      <Container className="space-y-12">
        <SectionHeading
          title="How to start with Afronovation"
          description="Every engagement begins small and visible, then scales through our 365-day National Digital Acceleration Program, with capacity transfer and adoption support throughout."
        />
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span
            className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-border lg:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="relative grid size-12 place-items-center rounded-full bg-brand-gradient font-heading text-lg font-bold text-white ring-8 ring-background">
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold">{step.title}</h3>
              <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
