"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HIDDEN_CLASS = "reveal-hidden";

/**
 * Fades each page section in as it scrolls into view. Applied to every
 * top-level section of <main> automatically, so new pages get it for free.
 * Sections already on screen are never hidden (no flash), content stays in
 * the HTML for search engines, and users who prefer reduced motion see
 * everything immediately.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove(HIDDEN_CLASS);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    for (const section of sections) {
      if (section.getBoundingClientRect().top < window.innerHeight) continue;
      section.classList.add(HIDDEN_CLASS);
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove(HIDDEN_CLASS));
    };
  }, [pathname]);

  return null;
}
