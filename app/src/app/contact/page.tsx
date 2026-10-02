import type { Metadata } from "next";

import {
  ContactDetailsCard,
  ContactDetailsStrip,
} from "@/components/contact-details-card";
import { ContactForm } from "@/components/contact-form";
import { InteriorHero } from "@/components/interior-hero";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { contactPageCopy, pageHeroes } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPageCopy.intro,
};

export default function ContactPage() {
  return (
    <>
      <InteriorHero
        eyebrow={pageHeroes.contact.eyebrow}
        title={pageHeroes.contact.title}
        description={contactPageCopy.intro}
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ContactDetailsCard />
            <div className="space-y-6">
              <ContactForm />
              <ContactDetailsStrip />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
