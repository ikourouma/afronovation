import Image from "next/image";

import { cn } from "@/lib/utils";
import { media } from "@/lib/media";
import type { PartnerLogo } from "@/content/types";

type PartnerLogoRowProps = {
  logos: PartnerLogo[];
  className?: string;
  grayscale?: boolean;
};

export function PartnerLogoRow({
  logos,
  className,
  grayscale = true,
}: PartnerLogoRowProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 items-center gap-6 sm:grid-cols-4 lg:grid-cols-8",
        className,
      )}
      aria-label="Partner and client logos"
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex items-center justify-center">
          <Image
            src={media(logo.imageKey)}
            alt={logo.alt}
            width={120}
            height={48}
            className={cn(
              "h-10 w-auto max-w-[120px] object-contain opacity-80 transition-opacity hover:opacity-100",
              grayscale && "grayscale",
            )}
          />
        </li>
      ))}
    </ul>
  );
}
