import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { NewsletterForm } from "@/components/newsletter-form";
import { SocialLinks } from "@/components/social-links";
import { megaMenu } from "@/content/navigation";
import { companyFacts, contact, footerLegalLinks, siteName } from "@/content/site";

const phoneHref = contact.phone.replace(/[^\d+]/g, "");

/* Footer columns reuse the main menu so the two never drift apart. */
const footerColumns = megaMenu
  .filter((section) => ["solutions", "platforms", "company"].includes(section.id))
  .map((section) => ({
    label: section.label,
    links: section.groups.flatMap((group) => group.links).slice(0, 7),
  }));

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-navy mt-auto">
      <div className="rule-gold h-1" aria-hidden />

      <section id="newsletter" aria-labelledby="newsletter-heading" className="scroll-mt-24 border-b border-white/10">
        <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <h2 id="newsletter-heading" className="font-heading text-2xl font-bold sm:text-3xl">
              Insights for leaders building the digital state
            </h2>
            <p className="mt-3 max-w-lg font-serif text-lg leading-relaxed text-muted-foreground">
              Occasional briefings on digital government, platforms and investment across the U.S. and Africa. No spam.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Afronovation home" className="inline-block">
            <Logo tone="light" className="h-10" />
          </Link>
          <p className="mt-5 max-w-xs font-serif text-sm leading-relaxed text-muted-foreground">
            Strategy, technology and digital transformation since {companyFacts.founded}.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{companyFacts.presence.join(" · ")}</p>
          <SocialLinks tone="navy" className="mt-6" />
        </div>

        {footerColumns.map((column) => (
          <nav key={column.label} aria-label={column.label}>
            <h2 className="text-sm font-bold">{column.label}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-bold">Contact</h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-muted-foreground">
            <p>{contact.address}</p>
            <p>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-foreground">
                {contact.email}
              </a>
            </p>
            <p>
              <a href={`tel:${phoneHref}`} className="transition-colors hover:text-foreground">
                {contact.phone}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteName} All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            {footerLegalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
