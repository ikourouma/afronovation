import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { processSteps } from "@/content/process-steps";

export function EngagementProcess() {
  return (
    <Section spacing="lg">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="How We Engage"
          title="A repeatable method, not a one-off project."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="relative space-y-3 rounded-2xl border bg-card p-6"
            >
              <span className="stat-number text-3xl!">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <span className="badge-roadmap">{step.methodologyTag}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
