"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ctaLabels } from "@/content/site";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 560;

/**
 * Phone-only "Book a Briefing" bar. The header hides its buttons on small
 * screens, so this keeps the main action one tap away once visitors scroll.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none sm:hidden",
          visible ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
        aria-hidden={!visible}
      >
        <Link
          href={ctaLabels.primaryHref}
          tabIndex={visible ? undefined : -1}
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground"
        >
          {ctaLabels.primary}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      {/* Keeps the end of the footer readable above the bar. */}
      <div className="h-[72px] bg-navy sm:hidden" aria-hidden />
    </>
  );
}
