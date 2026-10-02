import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteName } from "@/content/site";
import { getSingleton } from "@/lib/cms/read";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteName}`,
};

export default async function TermsPage() {
  const contact = await getSingleton("contactDetails");
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: July 2026
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                1. Acceptance of terms
              </h2>
              <p>
                By accessing or using afronovation.com (the &ldquo;Site&rdquo;),
                you agree to be bound by these Terms of Service. If you do not
                agree, please do not use the Site.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                2. Description of the site
              </h2>
              <p>
                The Site provides information about {siteName}, our advisory
                practice areas, our Enterprise Digital Services catalog, and
                our mission-specific platforms, and allows visitors to submit
                inquiries or request a platform demo. The Site is
                informational and does not itself provide the underlying
                platforms (such as EmbassyOS) - those are accessed through
                their own respective services and, where applicable, their
                own terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                3. Intellectual property
              </h2>
              <p>
                All content on the Site - including text, graphics, logos,
                the Afronovation wordmark, and the names of our Enterprise
                Digital Services and platforms - is owned by {siteName} or
                its licensors and is protected by applicable intellectual
                property laws. You may not reproduce, distribute, or create
                derivative works from Site content without our prior written
                consent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                4. Acceptable use
              </h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  You agree not to misuse the Site, including attempting to
                  gain unauthorized access to it or the systems behind it.
                </li>
                <li>
                  You agree to provide accurate information when submitting a
                  contact or demo-request form.
                </li>
                <li>
                  You agree not to use the Site to transmit unlawful,
                  harassing, or fraudulent content.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                5. Third-party links
              </h2>
              <p>
                The Site may link to third-party sites, including our
                flagship platform at{" "}
                <a
                  href="https://embassyos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  embassyos.com
                </a>
                . We are not responsible for the content, policies, or
                practices of third-party sites, and linking to them does not
                imply endorsement of everything on those sites.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                6. Disclaimers
              </h2>
              <p>
                The Site and its content are provided &ldquo;as is&rdquo;
                without warranties of any kind, express or implied. Platform
                descriptions, including any stated impact metrics explicitly
                labeled &ldquo;Target outcome,&rdquo; represent goals and
                projections rather than guaranteed or independently verified
                results unless stated otherwise.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                7. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, {siteName} shall not
                be liable for any indirect, incidental, or consequential
                damages arising out of your use of, or inability to use, the
                Site.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                8. Changes to these terms
              </h2>
              <p>
                We may update these Terms of Service from time to time. The
                &ldquo;Last updated&rdquo; date above reflects the most recent
                revision. Continued use of the Site after changes constitutes
                acceptance of the updated terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                9. Contact us
              </h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>{" "}
                or {contact.phone}.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
