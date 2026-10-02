import type { ContactDetails, NavItem } from "./types";

export const siteName = "Afronovation, Inc.";

export const tagline =
  "We help governments and enterprises across the U.S. and Africa turn strategy into working digital systems.";

export const contact: ContactDetails = {
  address: "127 Long Shadow Ln., Cary, NC 27518",
  email: "hello@afronovation.com",
  phone: "1-844-664-4247",
};

export const mission =
  "A strategy, technology and digital transformation company. We pair senior advisory leadership with in-house platform engineering, and make sure people adopt what we build.";

export const companyFacts = {
  founded: 2018,
  headquarters: "Cary, North Carolina",
  presence: ["United States", "Côte d'Ivoire", "Guinea", "Sierra Leone"],
} as const;

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const ctaSection = {
  headline: "Start with an executive briefing.",
  subcopy:
    "A working session with your leadership on priorities and fit. No obligation, and you leave with a clear view of where to begin.",
  buttonLabel: "Book a Briefing",
  closingLine: "Let's inspire possibilities together.",
} as const;

export const contactPageCopy = {
  intro: "Our team replies within one business day.",
  contactUs: "Reach us directly",
  preferDirect: "Prefer email or phone?",
} as const;

export const ctaLabels = {
  primary: "Book a Briefing",
  primaryHref: "/contact?intent=briefing",
  partner: "Partner with us",
  partnerHref: "/contact?intent=partnership",
} as const;

