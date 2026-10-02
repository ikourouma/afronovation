import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { PartnerLogo } from "@/content/types";
import { media } from "@/lib/media";
import { sectionHeadings } from "@/content/site";

type LogoMarqueeProps = {
  logos: PartnerLogo[];
};

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  const track = [...logos, ...logos];

  return (
    <Section spacing="sm" className="border-y bg-muted/10">
      <Container className="space-y-6">
        <p className="text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {sectionHeadings.trustBar}
        </p>
      </Container>
      <div
        className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        role="marquee"
        aria-label="Partner and client logos"
      >
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-12 py-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex shrink-0 items-center justify-center"
            >
              <Image
                src={media(logo.imageKey)}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-9 w-auto max-w-[120px] object-contain opacity-70 grayscale transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </Section>
  );
}
