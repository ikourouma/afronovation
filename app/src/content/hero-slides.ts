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
    body: "Senior advisory leadership and in-house platform engineering under one accountable team, from the first briefing to sustained adoption.",
    primaryCta: { label: "Book a Briefing", href: "/contact?intent=briefing" },
    secondaryCta: { label: "Explore our solutions", href: "/services" },
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
    body: "EmbassyOS, CivisOS, Bridge55 and more are composed from the same catalogue of enterprise digital services, so each new mission launches faster and with less risk.",
    primaryCta: { label: "Explore platforms", href: "/platforms" },
    secondaryCta: { label: "Visit embassyos.com", href: "https://embassyos.com" },
    imageKey: null,
    imageAlt: null,
    active: true,
    sortOrder: 2,
  },
  {
    id: "investors-partners",
    tabLabel: "Investors & development partners",
    eyebrow: "Featured engagement · Zimbabwe",
    title: "A national investment platform, delivered as a working pilot.",
    body: "Projects reviewed, approved and published; investors registered and accredited; engagements carried through to signed memoranda of understanding.",
    primaryCta: { label: "See the engagement", href: "/#featured-engagement" },
    secondaryCta: { label: "Partner with us", href: "/contact?intent=partnership" },
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
    body: "We work with program, change, cybersecurity and platform specialists across the U.S., Côte d'Ivoire, Guinea and Sierra Leone.",
    primaryCta: { label: "Join the consultant network", href: "/contact?intent=consultant" },
    secondaryCta: { label: "Meet the leadership", href: "/about#team" },
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
