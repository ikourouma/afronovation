import Link from "next/link";
import { Phone } from "lucide-react";

import { FlashBanner } from "@/components/layout/flash-banner";
import { Container } from "@/components/layout/container";
import { filterActiveAnnouncements } from "@/content/announcements";
import { utilityLinks } from "@/content/navigation";
import { companyFacts } from "@/content/site";
import { getCollection, getSingleton } from "@/lib/cms/read";

/** Utility bar + admin-managed flash banner, above the sticky main nav. */
export async function SiteTopBars() {
  const [allAnnouncements, contact] = await Promise.all([
    getCollection("announcements"),
    getSingleton("contactDetails"),
  ]);
  const announcements = filterActiveAnnouncements(allAnnouncements);
  const phoneHref = contact.phone.replace(/[^\d+]/g, "");

  return (
    <div className="theme-navy">
      <Container className="hidden h-9 items-center justify-between gap-6 text-xs text-muted-foreground md:flex">
        <p>{companyFacts.presence.join(" · ")}</p>
        <nav aria-label="Utility" className="flex items-center gap-5">
          {utilityLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${phoneHref}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Phone className="size-3" aria-hidden />
            {contact.phone}
          </a>
        </nav>
      </Container>
      {announcements.length > 0 ? (
        <FlashBanner announcements={announcements} />
      ) : null}
    </div>
  );
}
