import { Mail, MapPin, Phone } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SocialLinks } from "@/components/social-links";
import { contact, contactPageCopy } from "@/content/site";

export function ContactDetailsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{contactPageCopy.contactUs}</CardTitle>
        <CardDescription>{contactPageCopy.intro}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <address className="space-y-4 not-italic">
          <div className="flex gap-3">
            <MapPin
              className="mt-0.5 size-5 shrink-0 text-accent"
              aria-hidden
            />
            <span>{contact.address}</span>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <a
              href={`mailto:${contact.email}`}
              className="underline-offset-4 hover:text-accent hover:underline"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="underline-offset-4 hover:text-accent hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        </address>
        <SocialLinks heading="Follow us" />
      </CardContent>
    </Card>
  );
}

export function ContactDetailsStrip() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-muted/40 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="font-medium">{contactPageCopy.preferDirect}</p>
      <div className="flex flex-wrap gap-4">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 underline-offset-4 hover:text-accent hover:underline"
        >
          <Mail className="size-4" aria-hidden />
          {contact.email}
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center gap-2 underline-offset-4 hover:text-accent hover:underline"
        >
          <Phone className="size-4" aria-hidden />
          {contact.phone}
        </a>
      </div>
    </div>
  );
}
