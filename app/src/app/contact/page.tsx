import type { Metadata } from "next";

import { ContactDetailsCard } from "@/components/contact-details-card";
import { ContactForm } from "@/components/contact-form";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { contactIntents, parseContactIntent } from "@/content/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book an executive briefing, request the investor brief, partner with us or join our consultant network.",
};

type ContactPageProps = {
  searchParams: Promise<{ intent?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const intent = parseContactIntent((await searchParams).intent);
  const copy = contactIntents[intent];

  return (
    <>
      <InteriorHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
            <ContactDetailsCard />
            <ContactForm key={intent} intent={intent} submitLabel={copy.submit} />
          </div>
        </Container>
      </Section>
    </>
  );
}
