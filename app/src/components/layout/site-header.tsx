"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { megaMenu } from "@/content/navigation";
import { ctaLabels } from "@/content/site";
import type { MegaMenuSection } from "@/content/types";
import { cn } from "@/lib/utils";

const HOVER_CLOSE_DELAY_MS = 150;

function MegaPanel({
  section,
  onNavigate,
}: {
  section: MegaMenuSection;
  onNavigate: () => void;
}) {
  return (
    <div
      id={`mega-${section.id}`}
      className="absolute inset-x-0 top-full border-t bg-background shadow-[0_24px_48px_-24px_rgb(7_30_54/0.25)]"
    >
      <Container
        className={cn(
          "grid gap-10 py-8",
          section.featured ? "lg:grid-cols-[260px_1fr_300px]" : "lg:grid-cols-[260px_1fr]",
        )}
      >
        <div className="rounded-md bg-muted p-6">
          <p className="font-heading text-xl font-bold">{section.intro.title}</p>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            {section.intro.body}
          </p>
          <Link
            href={section.intro.cta.href}
            onClick={onNavigate}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            {section.intro.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div
          className={cn(
            "grid gap-8",
            section.groups.length > 1 && "sm:grid-cols-2",
            !section.featured && "xl:grid-cols-3",
          )}
        >
          {section.groups.map((group) => (
            <div key={group.heading}>
              <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <span className="heading-marker w-5" aria-hidden />
                {group.heading}
              </p>
              <ul
                className={cn(
                  "mt-3 space-y-1",
                  section.groups.length === 1 &&
                    group.links.length > 3 &&
                    "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0",
                )}
              >
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="group block rounded-md px-3 py-2 -mx-3 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    >
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold group-hover:text-primary">
                        {link.label}
                        {link.badge ? (
                          <span className="rounded-sm bg-secondary px-1.5 py-px text-[11px] font-semibold text-secondary-foreground">
                            {link.badge}
                          </span>
                        ) : null}
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 block font-serif text-sm text-muted-foreground">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {section.featured ? (
          <div className="theme-navy relative isolate flex flex-col overflow-hidden rounded-md p-6">
            <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden />
            <p className="text-xs font-semibold tracking-[0.16em] text-[#f3a9cf] uppercase">
              {section.featured.eyebrow}
            </p>
            <p className="mt-3 font-heading text-xl leading-snug font-bold">
              {section.featured.title}
            </p>
            {section.featured.body ? (
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                {section.featured.body}
              </p>
            ) : null}
            {section.featured.stats.length > 0 ? (
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {section.featured.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse border-t-2 border-pink pt-2">
                    <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                    <dd className="font-heading text-2xl font-bold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="mt-auto pt-5">
              <Button asChild size="sm">
                <Link href={section.featured.cta.href} onClick={onNavigate}>
                  {section.featured.cta.label}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export function SiteHeader() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const close = () => setOpenId(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(close, HOVER_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const trigger = document.getElementById(`mega-trigger-${openId}`);
        close();
        trigger?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openId]);

  const openSection = megaMenu.find((section) => section.id === openId);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b bg-background transition-shadow duration-200",
        scrolled && "shadow-[0_6px_24px_-12px_rgb(7_30_54/0.28)]",
      )}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <Container className="flex h-[72px] items-center gap-6">
        <Link
          href="/"
          aria-label="Afronovation home"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo priority className="h-8 sm:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 justify-center xl:flex">
          <ul className="flex items-center gap-1">
            {megaMenu.map((section) => {
              const isOpen = openId === section.id;
              return (
                <li key={section.id}>
                  <button
                    id={`mega-trigger-${section.id}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${section.id}`}
                    onClick={() => setOpenId(isOpen ? null : section.id)}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenId(section.id);
                    }}
                    className={cn(
                      "inline-flex h-10 items-center gap-1 rounded-md px-3 text-[15px] font-semibold transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring",
                      isOpen && "text-primary",
                    )}
                  >
                    {section.label}
                    <ChevronDown
                      className={cn("size-4 transition-transform", isOpen && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="outline" className="hidden h-10 px-4 lg:inline-flex">
            <Link href={ctaLabels.partnerHref}>{ctaLabels.partner}</Link>
          </Button>
          <Button asChild className="hidden h-10 px-4 sm:inline-flex">
            <Link href={ctaLabels.primaryHref}>{ctaLabels.primary}</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 xl:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <Accordion type="single" collapsible className="px-4">
                {megaMenu.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="text-base font-semibold">
                      {section.label}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-5">
                      {section.groups.map((group) => (
                        <div key={group.heading}>
                          <p className="text-xs font-semibold text-muted-foreground">
                            {group.heading}
                          </p>
                          <ul className="mt-2 space-y-2">
                            {group.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="font-medium hover:text-primary"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-6 grid gap-2 px-4 pb-6">
                <Button asChild>
                  <Link href={ctaLabels.primaryHref} onClick={() => setMobileOpen(false)}>
                    {ctaLabels.primary}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={ctaLabels.partnerHref} onClick={() => setMobileOpen(false)}>
                    {ctaLabels.partner}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>

      {openSection ? <MegaPanel section={openSection} onNavigate={close} /> : null}
    </header>
  );
}
