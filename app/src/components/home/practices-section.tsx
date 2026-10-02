import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { PracticeArea } from "@/content/types";
import { getPracticeAreaIcon } from "@/lib/practice-area-icons";

/* Top-border colours follow the portfolio's "What we do" cards. */
const accents = ["#e25c9e", "#6d52d8", "#8b6cf0", "#f1a13d"];

export function PracticesSection({ practices }: { practices: PracticeArea[] }) {
  return (
    <Section spacing="xl">
      <Container className="space-y-12">
        <SectionHeading
          title="What we do"
          description="Four integrated practices that take institutions from digital ambition to governed, measurable execution."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((practice, i) => {
            const Icon = getPracticeAreaIcon(practice.slug);
            return (
              <li
                key={practice.slug}
                className="flex flex-col rounded-md border border-t-4 bg-card p-6"
                style={{ borderTopColor: accents[i % accents.length] }}
              >
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-heading text-xl leading-snug font-bold">
                  {practice.name}
                </h3>
                <p className="mt-1 font-serif text-[15px] italic text-primary">
                  {practice.tagline}
                </p>
                <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
                  {practice.summary}
                </p>
                <ul className="mt-4 flex-1 space-y-1.5 border-t pt-4 text-sm">
                  {practice.keyServices.slice(0, 3).map((service) => (
                    <li key={service} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pink" aria-hidden />
                      <span className="first-letter:uppercase">{service}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/solutions#${practice.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Explore the practice
                  <span className="sr-only">: {practice.name}</span>
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
