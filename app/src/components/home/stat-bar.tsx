import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { platforms } from "@/content/platforms";
import { enterpriseServices } from "@/content/enterprise-services";
import { practiceAreas } from "@/content/practice-areas";
import { partnerLogos } from "@/content/partners";

const stats = [
  { value: platforms.length, label: "Mission-specific platforms" },
  { value: enterpriseServices.length, label: "Enterprise Digital Services" },
  { value: practiceAreas.length, label: "Advisory practice areas" },
  { value: partnerLogos.length, label: "Global partners & institutions" },
];

export function StatBar() {
  return (
    <Section spacing="sm" className="border-b bg-muted/10">
      <Container>
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="stat-number">{stat.value}</dd>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
