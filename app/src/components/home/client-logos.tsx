import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { PartnerLogo } from "@/content/types";
import { media } from "@/lib/media";

export function ClientLogos({ logos }: { logos: PartnerLogo[] }) {
  return (
    <section aria-labelledby="clients-heading" className="border-b">
      <Container className="flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
        <h2
          id="clients-heading"
          className="shrink-0 font-serif text-base text-muted-foreground lg:max-w-44"
        >
          Trusted by teams at leading institutions
        </h2>
        <ul className="grid flex-1 grid-cols-2 items-center gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) => (
            <li key={logo.name} className="flex h-12 items-center justify-center">
              <Image
                src={media(logo.imageKey)}
                alt={logo.alt}
                width={140}
                height={48}
                className="max-h-10 w-auto max-w-[140px] object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
