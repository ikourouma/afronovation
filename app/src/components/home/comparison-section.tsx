import { CheckCircle2, XCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

const fragmented = [
  "Every initiative starts from zero - no reusable infrastructure",
  "Disconnected vendors for strategy, technology, and change",
  "Manual, paper-based processes that don't scale",
  "No visibility into whether transformation is actually working",
];

const withAfronovation = [
  "Mission-specific platforms composed from proven Enterprise Digital Services",
  "One partner for strategy, technology, and change management",
  "Secure, digital-first workflows built for institutional scale",
  "Program governance and metrics built into every engagement",
];

export function ComparisonSection() {
  return (
    <Section spacing="lg" className="bg-muted/10">
      <Container className="space-y-10">
        <SectionHeading
          title="Fragmented change vs. with Afronovation."
          description="Most transformation programs stall because every initiative reinvents the wheel. We built the wheel once."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
            <p className="mb-5 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Fragmented change
            </p>
            <ul className="space-y-4">
              {fragmented.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle
                    className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-radial-glow p-6 sm:p-8">
            <p className="mb-5 text-sm font-medium tracking-wide text-primary uppercase">
              With Afronovation
            </p>
            <ul className="space-y-4">
              {withAfronovation.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
