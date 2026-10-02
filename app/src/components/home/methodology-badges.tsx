import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { methodologies } from "@/content/methodologies";

export function MethodologyBadges() {
  return (
    <Section spacing="sm" className="border-y bg-muted/10">
      <Container className="space-y-5">
        <p className="text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Delivered with proven methodology
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {methodologies.map((methodology) => (
            <li
              key={methodology.code}
              title={methodology.name}
              className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium tracking-wide text-foreground"
            >
              {methodology.code}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
