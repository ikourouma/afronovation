import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import {
  companyNav,
  contact,
  footerLegalLinks,
  mission,
  navLabels,
  siteName,
} from "@/content/site";
import { practiceAreas } from "@/content/practice-areas";

const phoneHref = contact.phone.replace(/[^\d+]/g, "");

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" aria-label="afronovation home">
              <Wordmark />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {mission}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">{navLabels.services}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/services/#${area.slug}`}
                    className="capitalize transition-colors hover:text-foreground"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">{navLabels.platforms}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/platforms"
                  className="transition-colors hover:text-foreground"
                >
                  {navLabels.allPlatforms}
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise-services"
                  className="transition-colors hover:text-foreground"
                >
                  {navLabels.enterpriseServices}
                </Link>
              </li>
            </ul>

            <h2 className="mt-8 text-sm font-semibold">{navLabels.company}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {companyNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">{navLabels.contact}</h2>
            <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
              <p>{contact.address}</p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${phoneHref}`}
                  className="transition-colors hover:text-foreground"
                >
                  {contact.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {siteName}</p>
          <div className="flex flex-wrap gap-4">
            {footerLegalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
