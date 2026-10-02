import type { AudienceSegment } from "./types";

export const audienceSegments: AudienceSegment[] = [
  {
    slug: "governments",
    label: "Governments & Public Sector",
    pitch:
      "Modernize citizen services, diaspora engagement, and cross-agency operations on sovereign, secure infrastructure - from a single ministry pilot to a national program.",
    ctaLabel: "Explore public-sector platforms",
    ctaHref: "/platforms",
  },
  {
    slug: "enterprises",
    label: "Enterprises",
    pitch:
      "Modernize legacy systems, run large-scale change programs, and integrate enterprise-grade digital services without building them in-house.",
    ctaLabel: "Explore Enterprise Digital Services",
    ctaHref: "/enterprise-services",
  },
  {
    slug: "startups",
    label: "Startups & Scale-ups",
    pitch:
      "Skip years of infrastructure build-out: compose proven identity, AI, communications, and payments services into your product from day one.",
    ctaLabel: "Talk to our team",
    ctaHref: "/contact",
  },
];
