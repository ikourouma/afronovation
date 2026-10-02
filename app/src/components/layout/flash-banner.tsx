"use client";

import Link from "next/link";
import { ArrowRight, Pause, Play, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Container } from "@/components/layout/container";
import type { Announcement } from "@/content/types";
import { cn } from "@/lib/utils";

const ROTATE_MS = 6000;
const DISMISS_KEY = "afn-flash-dismissed";

const noopSubscribe = () => () => {};

function readDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    // Storage unavailable (private mode): the banner simply stays visible.
    return false;
  }
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FlashBanner({ announcements }: { announcements: Announcement[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dismissedNow, setDismissedNow] = useState(false);
  const dismissedEarlier = useSyncExternalStore(noopSubscribe, readDismissed, () => false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);
  const dismissed = dismissedNow || dismissedEarlier;

  const count = announcements.length;
  // Reduced-motion users start paused; the play button still lets them rotate.
  const isPaused = reducedMotion ? !paused : paused;
  const rotating = count > 1 && !isPaused && !hovered;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [rotating, count]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissedNow(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore - dismissal just won't persist across pages.
    }
  };

  return (
    <section
      aria-label="Announcements"
      className="bg-brand-gradient-deep text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Container className="flex min-h-10 items-center gap-3 py-1.5 text-sm">
        <div className="relative min-w-0 flex-1" aria-live={rotating ? "off" : "polite"}>
          {announcements.map((item, i) => (
            <div
              key={item.id}
              aria-hidden={i !== index}
              className={cn(
                "flex min-w-0 items-center gap-3 transition-opacity duration-500 motion-reduce:transition-none",
                i === index ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
              )}
            >
              <span className="shrink-0 rounded-sm bg-white/15 px-2 py-0.5 text-xs font-semibold">
                {item.label}
              </span>
              <p className="min-w-0 truncate">{item.message}</p>
              {item.href && item.linkLabel ? (
                <Link
                  href={item.href}
                  tabIndex={i === index ? undefined : -1}
                  className="hidden shrink-0 items-center gap-1 font-semibold underline-offset-4 hover:underline sm:inline-flex"
                >
                  {item.linkLabel}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        {count > 1 ? (
          <div className="flex shrink-0 items-center gap-1">
            <span className="hidden text-xs tabular-nums text-white/80 sm:inline">
              {index + 1}/{count}
            </span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="grid size-7 place-items-center rounded-sm hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
              aria-label={isPaused ? "Resume announcements" : "Pause announcements"}
            >
              {isPaused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={dismiss}
          className="grid size-7 shrink-0 place-items-center rounded-sm hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Dismiss announcements"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </Container>
    </section>
  );
}
