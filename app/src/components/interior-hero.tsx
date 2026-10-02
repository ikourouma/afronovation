import type { ReactNode } from "react";

import { Constellation } from "@/components/brand/constellation";
import { Container } from "@/components/layout/container";

type InteriorHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional buttons or links under the description. */
  children?: ReactNode;
};

/** Navy page header used by every interior page (matches the portfolio bands). */
export function InteriorHero({ eyebrow, title, description, children }: InteriorHeroProps) {
  return (
    <section className="theme-navy relative isolate overflow-hidden">
      <Constellation className="-z-10" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_60%_90%_at_100%_0%,rgb(109_82_216/0.28),transparent_60%)]" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Container>
      <div className="rule-gold h-1" aria-hidden />
    </section>
  );
}
