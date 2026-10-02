import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ctaLabels, mission, siteName, tagline } from "@/content/site";
import { platforms } from "@/content/platforms";
import { enterpriseServices } from "@/content/enterprise-services";

export function HeroSection() {
  return (
    <Section
      spacing="xl"
      className="relative overflow-hidden border-b bg-gradient-mesh"
    >
      <Container className="relative grid gap-12 py-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium tracking-wide text-primary uppercase motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
            <Sparkles className="size-3.5" aria-hidden />
            {siteName}
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:delay-100 sm:text-5xl lg:text-6xl">
            {tagline}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:delay-150 sm:text-xl">
            {mission}
          </p>
          <div className="flex flex-col items-start gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-5 motion-safe:delay-200 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/contact">
                {ctaLabels.heroPrimary}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/platforms">{ctaLabels.viewPlatforms}</Link>
            </Button>
          </div>
        </div>

        <div className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:delay-300">
          <div className="card-glass relative overflow-hidden rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <p className="text-sm font-medium text-muted-foreground">
                Enterprise Digital Services
              </p>
              <span className="badge-roadmap">Live catalog</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { name: "BridgeAI", status: "Available" },
                { name: "BridgeVault", status: "Available" },
                { name: "BridgeAPI", status: "Available" },
                { name: "BridgePayments", status: "Roadmap" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2.5"
                >
                  <span className="text-sm font-medium">{row.name}</span>
                  <span
                    className={
                      row.status === "Available"
                        ? "text-xs font-medium text-accent"
                        : "text-xs font-medium text-primary"
                    }
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-5">
              <div>
                <p className="stat-number text-2xl!">{platforms.length}</p>
                <p className="text-xs text-muted-foreground">
                  Mission-specific platforms
                </p>
              </div>
              <div>
                <p className="stat-number text-2xl!">
                  {enterpriseServices.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  Enterprise Digital Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
