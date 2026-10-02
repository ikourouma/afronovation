"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useState } from "react";

import { Constellation } from "@/components/brand/constellation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { HeroSlide, PortfolioHeadlineStat } from "@/content/types";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type HeroCarouselProps = {
  slides: HeroSlide[];
  stats: PortfolioHeadlineStat[];
  rotationSeconds: number;
};

function isExternal(href: string) {
  return href.startsWith("http");
}

/*
 * Admin-managed rotating hero. Timing is driven by the active tab's progress
 * bar (a CSS animation): when it finishes, the next slide shows. Pausing
 * pauses the animation, and users who prefer reduced motion get no autoplay
 * because the animation never runs.
 */
export function HeroCarousel({ slides, stats, rotationSeconds }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const count = slides.length;
  const halted = paused || hovered;
  const advance = () => setIndex((current) => (current + 1) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="theme-navy relative isolate overflow-hidden"
    >
      {slides.map((slide, i) =>
        slide.imageKey ? (
          <Image
            key={slide.id}
            src={media(slide.imageKey)}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "-z-20 object-cover transition-opacity duration-700 motion-reduce:transition-none",
              i === index ? "opacity-40" : "opacity-0",
            )}
          />
        ) : null,
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,rgb(109_82_216/0.30),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(226_92_158/0.14),transparent_60%)]" />
      <Constellation className="-z-10" />

      <Container
        className="relative pt-16 pb-10 sm:pt-24 lg:pt-28"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
      >
        <div className="grid">
          {slides.map((slide, i) => {
            const active = i === index;
            const TitleTag = i === 0 ? "h1" : "h2";
            return (
              <div
                key={slide.id}
                id={`hero-slide-${slide.id}`}
                role="tabpanel"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${slide.tabLabel}`}
                aria-hidden={!active}
                className={cn(
                  "col-start-1 row-start-1 max-w-4xl transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                  active ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0",
                )}
              >
                <p className="text-sm font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
                  {slide.eyebrow}
                </p>
                <TitleTag className="mt-5 font-heading text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
                  {slide.title}
                </TitleTag>
                <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {slide.body}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg" className="h-12 px-6 text-base" tabIndex={active ? undefined : -1}>
                    <Link href={slide.primaryCta.href}>
                      {slide.primaryCta.label}
                      <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                  {slide.secondaryCta ? (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 border-white/30 bg-transparent px-6 text-base hover:bg-white/10"
                      tabIndex={active ? undefined : -1}
                    >
                      {isExternal(slide.secondaryCta.href) ? (
                        <a href={slide.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                          {slide.secondaryCta.label}
                        </a>
                      ) : (
                        <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                      )}
                    </Button>
                  ) : null}
                </div>
                {slide.ctaNote ? (
                  <p className="mt-4 text-sm text-muted-foreground">{slide.ctaNote}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        {count > 1 ? (
          <div className="mt-14 flex items-end gap-4 sm:mt-20">
            <div role="tablist" aria-label="Choose a highlight" className="grid flex-1 grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
              {slides.map((slide, i) => {
                const active = i === index;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`hero-slide-${slide.id}`}
                    onClick={() => setIndex(i)}
                    className="group text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <span className="relative block h-0.5 overflow-hidden bg-white/20">
                      {active ? (
                        <span
                          key={`${slide.id}-${index}`}
                          onAnimationEnd={advance}
                          className="absolute inset-0 origin-left bg-brand-gradient motion-reduce:animate-none motion-reduce:scale-x-100"
                          style={{
                            animation: `hero-progress ${rotationSeconds}s linear forwards`,
                            animationPlayState: halted ? "paused" : "running",
                          }}
                        />
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "mt-3 flex gap-2 text-sm font-semibold transition-colors",
                        active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span>{slide.tabLabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={paused ? "Play highlights" : "Pause highlights"}
            >
              {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            </button>
          </div>
        ) : null}
      </Container>

      <div className="border-t border-white/10 bg-navy/60">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse border-t-2 pt-4"
                style={{ borderColor: i % 2 === 0 ? "#e25c9e" : "#8b6cf0" }}
              >
                <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
      <div className="rule-gold h-1" aria-hidden />
    </section>
  );
}
