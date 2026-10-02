import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteName } from "@/content/site";
import { getSingleton } from "@/lib/cms/read";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteName}`,
};

export default async function PrivacyPage() {
  const contact = await getSingleton("contactDetails");
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: July 2026
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                1. Overview
              </h2>
              <p>
                {siteName} (&ldquo;Afronovation,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us&rdquo;) operates afronovation.com and its
                mission-specific platforms. This policy explains what
                information we collect when you use our website, contact
                forms, or demo-request forms, how we use it, and the choices
                you have.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                2. Information we collect
              </h2>
              <p>
                When you submit our contact form or a platform demo-request
                form, we collect the information you provide directly: full
                name, email address, phone number, organization name,
                organization type, areas of interest or inquiry type, and any
                message you include. If you arrive via a marketing link, we
                may also record standard campaign parameters (UTM source,
                medium, and campaign) to understand which channels are
                effective.
              </p>
              <p>
                We do not use third-party advertising trackers or sell any
                information you provide to us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                3. How we use your information
              </h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>To respond to inquiries and demo requests you submit.</li>
                <li>
                  To route your request to the right team based on the
                  platform, service, or inquiry type you selected.
                </li>
                <li>
                  To understand which platforms, services, and marketing
                  channels generate interest, so we can improve our site and
                  offerings.
                </li>
                <li>
                  To comply with legal obligations where applicable.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                4. How we store and share your information
              </h2>
              <p>
                Form submissions are stored in our database (hosted on Neon
                Postgres) and trigger an email notification to our team
                (delivered via Resend). We do not sell, rent, or trade your
                personal information to third parties. We may share
                information with service providers who process it on our
                behalf (such as our database and email providers) solely to
                operate the services described above, under confidentiality
                obligations consistent with this policy.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                5. Cookies and analytics
              </h2>
              <p>
                Our website does not currently set advertising or
                cross-site tracking cookies. If we introduce analytics or
                additional tooling in the future, this policy will be
                updated accordingly before those tools go live.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                6. Data retention
              </h2>
              <p>
                We retain contact and demo-request submissions for as long
                as reasonably necessary to respond to your inquiry and
                maintain a record of our business communications, after
                which it may be archived or deleted.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                7. Your rights
              </h2>
              <p>
                You may request access to, correction of, or deletion of the
                personal information you have submitted to us at any time by
                contacting us using the details below.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                8. Changes to this policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. The
                &ldquo;Last updated&rdquo; date above reflects the most
                recent revision.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                9. Contact us
              </h2>
              <p>
                Questions about this policy or your information can be sent
                to{" "}
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
