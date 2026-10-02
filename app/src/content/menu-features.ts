import type { MenuFeature } from "./types";

/** Promo cards shown on the right of each mega menu (admin-managed). */
export const menuFeatures: MenuFeature[] = [
  {
    menuId: "solutions",
    eyebrow: "Start here",
    title: "Executive briefing",
    body: "A 30-minute working session with your leadership on priorities and fit.",
    stats: [],
    cta: { label: "Book a Briefing", href: "/contact?intent=briefing" },
  },
  {
    menuId: "who-we-serve",
    eyebrow: "Success story · Zimbabwe",
    title: "A national investment platform, live in months.",
    body: null,
    stats: [
      { value: "26", label: "Published projects" },
      { value: "10", label: "Provinces covered" },
    ],
    cta: { label: "See the results", href: "/#featured-engagement" },
  },
  {
    menuId: "insights",
    eyebrow: "Newsletter",
    title: "Insights in your inbox",
    body: "Occasional briefings on digital government, platforms and investment. No spam.",
    stats: [],
    cta: { label: "Subscribe", href: "#newsletter" },
  },
  {
    menuId: "company",
    eyebrow: "Careers",
    title: "We're growing our consultant network",
    body: "Program, change, cybersecurity and platform specialists across the U.S. and Africa.",
    stats: [],
    cta: { label: "Join the network", href: "/contact?intent=consultant" },
  },
];
