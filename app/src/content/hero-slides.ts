import type { HeroSlide, PortfolioHeadlineStat } from "./types";

/** Seconds each hero slide stays on screen before rotating. */
export const HERO_ROTATION_SECONDS = 8;

export const heroSlides: HeroSlide[] = [
  {
    id: "governments-enterprises",
    tabLabel: "Governments & enterprises",
    eyebrow: "Strategy · Technology · Transformation",
    title:
      "We help governments and enterprises across the U.S. and Africa turn strategy into working digital systems.",
    body: "One accountable team, from first briefing to lasting adoption.",
    primaryCta: { label: "Book a Briefing", href: "/contact?intent=briefing" },
    secondaryCta: { label: "Our solutions", href: "/services" },
    ctaNote: "30-minute session · No obligation",
    imageKey: null,
    imageAlt: null,
    active: true,
    sortOrder: 1,
  },
  {
    id: "platforms",
    tabLabel: "Platforms",
    eyebrow: "What we have built",
    title: "Nine mission-specific platforms. One proven architecture.",
    body: "Proven services, so every new mission launches faster.",
    primaryCta: { label: "Explore platforms", href: "/platforms" },
    secondaryCta: { label: "Visit EmbassyOS", href: "https://embassyos.com" },
    ctaNote: null,
    imageKey: null,
    imageAlt: null,
    active: true,
    sortOrder: 2,
  },
  {
    id: "investors-partners",
    tabLabel: "Investors & development partners",
    eyebrow: "Featured engagement · Zimbabwe",
    title: "A national investment platform, live in months.",
    body: "Zimbabwe's pilot runs end to end, from approval to signed agreements.",
    primaryCta: { label: "See the results", href: "/#featured-engagement" },
    secondaryCta: { label: "Partner with us", href: "/contact?intent=partnership" },
    ctaNote: null,
    imageKey: null,
    imageAlt: null,
    active: true,
    sortOrder: 3,
  },
  {
    id: "consultants",
    tabLabel: "Consultants",
    eyebrow: "Join our network",
    title: "Build digital public infrastructure with us.",
    body: "Program, change, security and platform specialists wanted.",
    primaryCta: { label: "Join the network", href: "/contact?intent=consultant" },
    secondaryCta: { label: "Meet our leaders", href: "/about#team" },
    ctaNote: null,
    imageKey: null,
    imageAlt: null,
    active: true,
    sortOrder: 4,
  },
];

export function getActiveHeroSlides(): HeroSlide[] {
  return heroSlides
    .filter((slide) => slide.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** The cover numbers from the Capabilities Portfolio. */
export const headlineStats: PortfolioHeadlineStat[] = [
  { value: "9", label: "Mission-specific platforms" },
  { value: "17", label: "Enterprise digital services" },
  { value: "18", label: "e-Government service domains" },
  { value: "365", label: "Day national acceleration pathway" },
];
