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

export type EnterpriseServiceStatus = "available" | "roadmap";

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
};

export type EnterpriseServiceCategory = {
  slug: EnterpriseServiceCategorySlug;
  name: string;
  tagline: string;
};

export type PlatformStatus = "operational" | "flagship" | "upcoming";

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
