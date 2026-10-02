import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section spacing="xl" className="bg-gradient-mesh">
      <Container>
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <div className="flex justify-center">
            <Logo tone="light" className="h-10" />
          </div>
          <p className="stat-number text-6xl!">404</p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for may have moved. Explore our
            platforms and services, or head back home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild>
              <Link href="/">
                Back to home
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/platforms">View platforms</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
