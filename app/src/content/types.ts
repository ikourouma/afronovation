export type PracticeArea = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  fullDescription: string;
  keyServices: string[];
  heroImage?: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  headshotKey: string;
  headshotAlt: string;
  linkedinUrl: string | null;
  sortOrder: number;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  confirmed: boolean;
  /** Only published testimonials render on the site (admin switch). */
  published: boolean;
};

export type PartnerLogo = {
  name: string;
  imageKey: string;
  alt: string;
};

export type ContactDetails = {
  address: string;
  email: string;
  phone: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type EnterpriseServiceStatus = "available" | "pilot" | "roadmap";

export type EnterpriseServiceCategorySlug =
  | "travel-mobility"
  | "identity-trust-security"
  | "intelligence-data"
  | "platform-operations-integration"
  | "commerce-engagement";

export type EnterpriseService = {
  slug: string;
  name: string;
  category: EnterpriseServiceCategorySlug;
  description: string;
  usedBy: string[];
  status: EnterpriseServiceStatus;
  /** Delivered together with specialist partners (◆ in the portfolio). */
  deliveredWithPartners?: boolean;
};

export type EnterpriseServiceCategory = {
  slug: EnterpriseServiceCategorySlug;
  name: string;
  tagline: string;
};

export type PlatformStatus = "operational" | "flagship" | "pilot" | "upcoming";

export type PlatformImpactItem = {
  label: string;
  targetOutcome: boolean;
};

export type PlatformAtAGlance = {
  sector: string;
  region: string;
  status: string;
  servicesUsed: string[];
};

export type PlatformWhoItServes = {
  primary: string[];
  secondary: string[];
  decisionMakers: string[];
};

export type Platform = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  sector: string;
  status: PlatformStatus;
  featured: boolean;
  externalUrl: string | null;
  imageKey: string;
  imageAlt: string;
  atAGlance: PlatformAtAGlance;
  challenge: string;
  opportunity: string;
  approach: string;
  highlights: string[];
  poweredBy: string[];
  expectedImpact: PlatformImpactItem[];
  whoItServes: PlatformWhoItServes;
  scalability: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  methodologyTag: string;
};

export type Methodology = {
  code: string;
  name: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type AudienceSegment = {
  slug: string;
  label: string;
  pitch: string;
  ctaLabel: string;
  ctaHref: string;
};

/*
 * Admin-managed entities (redesign). Each shape mirrors the database row the
 * admin dashboard will edit, so swapping the static modules for DB reads is a
 * data-source change only.
 */

/** Flash banner message - up to 3 active at once, rotated in the top bar. */
export type Announcement = {
  id: string;
  label: string;
  message: string;
  linkLabel: string | null;
  href: string | null;
  active: boolean;
  /** ISO date strings; null means no limit. */
  startsAt: string | null;
  endsAt: string | null;
  sortOrder: number;
};

export type HeroCta = {
  label: string;
  href: string;
};

export type HeroSlide = {
  id: string;
  /** Short label for the slide selector, e.g. "Governments". */
  tabLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta | null;
  /** Short reassurance line under the buttons, e.g. "No obligation". */
  ctaNote: string | null;
  /** Optional background photo (media key). Falls back to the constellation. */
  imageKey: string | null;
  imageAlt: string | null;
  active: boolean;
  sortOrder: number;
};

export type MegaMenuLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type MegaMenuGroup = {
  heading: string;
  links: MegaMenuLink[];
};

/** Admin-managed promo card shown on the right of a mega menu panel. */
export type MegaMenuFeature = {
  eyebrow: string;
  title: string;
  body: string | null;
  stats: { value: string; label: string }[];
  cta: HeroCta;
};

export type MegaMenuSection = {
  id: string;
  label: string;
  intro: {
    title: string;
    body: string;
    cta: HeroCta;
  };
  groups: MegaMenuGroup[];
  featured: MegaMenuFeature | null;
};

export type PortfolioStatus = "flagship" | "operational" | "pilot";

export type PortfolioItem = {
  slug: string;
  name: string;
  status: PortfolioStatus;
  sector: string;
  summary: string;
  href: string;
  externalUrl: string | null;
  icon: string;
  sortOrder: number;
};

export type EngagementStat = {
  value: string;
  label: string;
};

export type FeaturedEngagement = {
  eyebrow: string;
  title: string;
  body: string;
  stats: EngagementStat[];
  statsNote: string;
  journey: { title: string; detail: string }[];
  href: string;
};

export type StartStep = {
  title: string;
  description: string;
};

export type PortfolioHeadlineStat = {
  value: string;
  label: string;
};

export type SocialPlatform =
  | "linkedin"
  | "x"
  | "youtube"
  | "facebook"
  | "instagram"
  | "whatsapp";

/** Company social account. Hidden on the site until a URL is set and it is switched on. */
export type SocialAccount = {
  platform: SocialPlatform;
  label: string;
  url: string | null;
  active: boolean;
  sortOrder: number;
};
