import { Globe2, Mail, MapPin, Phone } from "lucide-react";

import { SocialLinks } from "@/components/social-links";
import { companyFacts, contact, contactPageCopy } from "@/content/site";

const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

export function ContactDetailsCard() {
  const rows = [
    { icon: MapPin, label: "Headquarters", value: contact.address, href: null },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: phoneHref },
    { icon: Globe2, label: "Presence", value: companyFacts.presence.join(" · "), href: null },
  ];

  return (
    <aside className="theme-navy h-full rounded-md p-8">
      <h2 className="font-heading text-2xl font-bold">{contactPageCopy.contactUs}</h2>
      <p className="mt-2 font-serif text-muted-foreground">{contactPageCopy.intro}</p>
      <address className="mt-8 space-y-6 not-italic">
        {rows.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
              <Icon className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              {href ? (
                <a href={href} className="font-semibold underline-offset-4 hover:underline">
                  {value}
                </a>
              ) : (
                <p className="font-semibold">{value}</p>
              )}
            </div>
          </div>
        ))}
      </address>
      <SocialLinks heading="Follow us" tone="navy" className="mt-8" />
    </aside>
  );
}
