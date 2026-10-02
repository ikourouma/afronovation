import Image from "next/image";

import { cn } from "@/lib/utils";
import { media } from "@/lib/media";

type LogoProps = {
  /** "light" = white wordmark for navy backgrounds; "dark" = navy wordmark for white. */
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

/**
 * The Afronovation lightbulb lockup ("afronovation." + "inspiring
 * possibilities"), served from the original brand artwork.
 */
export function Logo({ tone = "dark", className, priority }: LogoProps) {
  const src =
    tone === "light" ? media("brand/logo-full.png") : media("brand/logo-full-dark.png");

  return (
    <Image
      src={src}
      alt="Afronovation - inspiring possibilities"
      width={2000}
      height={391}
      priority={priority}
      sizes="220px"
      className={cn("h-9 w-auto", className)}
    />
  );
}
