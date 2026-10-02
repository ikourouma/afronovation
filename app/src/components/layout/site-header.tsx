"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MenuIcon } from "lucide-react";
import { useState } from "react";

import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { companyNav, ctaLabels, navLabels } from "@/content/site";
import { practiceAreas } from "@/content/practice-areas";
import {
  enterpriseServiceCategories,
  getServicesByCategory,
} from "@/content/enterprise-services";
import { getFeaturedPlatforms, getFlagshipPlatform } from "@/content/platforms";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

const flagshipPlatform = getFlagshipPlatform();
const otherFeaturedPlatforms = getFeaturedPlatforms().filter(
  (platform) => platform.slug !== flagshipPlatform.slug,
);

function NavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <Container className="flex h-16 items-center gap-4">
        <Link
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="afronovation home"
        >
          <Wordmark />
        </Link>

        <NavigationMenu
          className="hidden max-w-none flex-1 justify-center lg:flex"
          viewport={false}
        >
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger>{navLabels.services}</NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-screen max-w-none -translate-x-1/2 p-0 md:w-screen">
                <div className="border-t bg-popover">
                  <Container className="grid gap-8 py-8 lg:grid-cols-[1fr_1fr_1fr_240px]">
                    {practiceAreas.map((area) => (
                      <div key={area.slug} className="space-y-3">
                        <div>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/services/#${area.slug}`}
                              className="block rounded-lg p-0 hover:bg-transparent focus:bg-transparent"
                            >
                              <p className="font-medium capitalize text-foreground">
                                {area.name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {area.tagline}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {area.keyServices.map((service) => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="flex flex-col justify-between rounded-xl bg-primary p-5 text-primary-foreground">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary-foreground/80">
                          {navLabels.featured}
                        </p>
                        <p className="text-lg font-semibold">
                          {ctaLabels.featuredCard}
                        </p>
                        <p className="text-sm text-primary-foreground/85">
                          {ctaLabels.featuredCardDescription}
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="secondary"
                        className="mt-4 w-full"
                      >
                        <Link href="/contact">{ctaLabels.primary}</Link>
                      </Button>
                    </div>
                  </Container>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>{navLabels.platforms}</NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-screen max-w-none -translate-x-1/2 p-0 md:w-screen">
                <div className="border-t bg-popover">
                  <Container className="space-y-6 py-8">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/platforms/${flagshipPlatform.slug}`}
                        className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-primary/30 bg-radial-glow p-5 hover:bg-transparent sm:flex-row sm:items-center"
                      >
                        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                          <Image
                            src={media(flagshipPlatform.imageKey)}
                            alt={flagshipPlatform.imageAlt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="192px"
                          />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <Badge className="bg-primary text-primary-foreground">
                            {navLabels.flagshipPlatform}
                          </Badge>
                          <p className="font-heading text-lg font-semibold">
                            {flagshipPlatform.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {flagshipPlatform.tagline}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                            {ctaLabels.visitLiveSite}
                            <ExternalLink className="size-3.5" aria-hidden />
                          </span>
                        </div>
                      </Link>
                    </NavigationMenuLink>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {otherFeaturedPlatforms.map((platform) => (
                        <NavigationMenuLink asChild key={platform.slug}>
                          <Link
                            href={`/platforms/${platform.slug}`}
                            className="group block overflow-hidden rounded-xl border border-border/60 p-0 hover:bg-muted/40"
                          >
                            <div className="relative aspect-4/3 overflow-hidden">
                              <Image
                                src={media(platform.imageKey)}
                                alt={platform.imageAlt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 1024px) 50vw, 240px"
                              />
                            </div>
                            <div className="space-y-1 p-3">
                              <p className="font-medium leading-snug">
                                {platform.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {platform.sector}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/platforms">{navLabels.viewAllPlatforms}</Link>
                      </Button>
                    </div>
                  </Container>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {navLabels.enterpriseServices}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-screen max-w-none -translate-x-1/2 p-0 md:w-screen">
                <div className="border-t bg-popover">
                  <Container className="space-y-6 py-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                      {enterpriseServiceCategories.map((category) => {
                        const services = getServicesByCategory(
                          category.slug,
                        ).slice(0, 3);
                        return (
                          <div key={category.slug} className="space-y-2">
                            <p className="text-sm font-medium text-foreground">
                              {category.name}
                            </p>
                            <ul className="space-y-1.5 text-sm text-muted-foreground">
                              {services.map((service) => (
                                <li key={service.slug}>{service.name}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/enterprise-services">
                          {ctaLabels.viewFullCatalog}
                        </Link>
                      </Button>
                    </div>
                  </Container>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>{navLabels.company}</NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-screen max-w-none -translate-x-1/2 p-0 md:w-screen">
                <div className="border-t bg-popover">
                  <Container className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
                    {companyNav.map((item) => (
                      <NavigationMenuLink asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-xl border border-transparent p-4 hover:border-border hover:bg-muted/40"
                        >
                          <p className="font-medium">{item.label}</p>
                          {item.description ? (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          ) : null}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </Container>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">{ctaLabels.primary}</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{navLabels.mobileMenu}</SheetTitle>
              </SheetHeader>

              <Accordion type="single" collapsible className="px-1">
                <AccordionItem value="services">
                  <AccordionTrigger>{navLabels.services}</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {practiceAreas.map((area) => (
                      <div key={area.slug} className="space-y-2">
                        <NavLink
                          href={`/services/#${area.slug}`}
                          className="block font-medium capitalize"
                          onClick={closeMobile}
                        >
                          {area.name}
                        </NavLink>
                        <p className="text-sm text-muted-foreground">
                          {area.tagline}
                        </p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {area.keyServices.map((service) => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="platforms">
                  <AccordionTrigger>{navLabels.platforms}</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div>
                      <NavLink
                        href={`/platforms/${flagshipPlatform.slug}`}
                        className="block"
                        onClick={closeMobile}
                      >
                        <Badge className="mb-1 bg-primary text-primary-foreground">
                          {navLabels.flagshipPlatform}
                        </Badge>
                        <span className="block font-medium">
                          {flagshipPlatform.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {flagshipPlatform.tagline}
                        </span>
                      </NavLink>
                    </div>
                    {otherFeaturedPlatforms.map((platform) => (
                      <NavLink
                        key={platform.slug}
                        href={`/platforms/${platform.slug}`}
                        className="block"
                        onClick={closeMobile}
                      >
                        <span className="font-medium">{platform.name}</span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {platform.sector}
                        </span>
                      </NavLink>
                    ))}
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <Link href="/platforms" onClick={closeMobile}>
                        {navLabels.viewAllPlatforms}
                      </Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="enterprise-services">
                  <AccordionTrigger>
                    {navLabels.enterpriseServices}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    {enterpriseServiceCategories.map((category) => (
                      <div key={category.slug} className="space-y-1.5">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {category.tagline}
                        </p>
                      </div>
                    ))}
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <Link href="/enterprise-services" onClick={closeMobile}>
                        {ctaLabels.viewFullCatalog}
                      </Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="company">
                  <AccordionTrigger>{navLabels.company}</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    {companyNav.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        className="block"
                        onClick={closeMobile}
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.description ? (
                          <span className="mt-0.5 block text-sm text-muted-foreground">
                            {item.description}
                          </span>
                        ) : null}
                      </NavLink>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 px-1">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={closeMobile}>
                    {ctaLabels.primary}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
