import type { AudienceSegment } from "./types";

/** "Choose your path" - one clear next step for each audience we serve. */
export const audienceSegments: AudienceSegment[] = [
  {
    slug: "clients",
    label: "Governments & enterprises",
    pitch:
      "Ministries, agencies, diplomatic missions and enterprises modernising services, operations and data on platforms they keep authority over.",
    ctaLabel: "Book a Briefing",
    ctaHref: "/contact?intent=briefing",
  },
  {
    slug: "investors",
    label: "Investors & development partners",
    pitch:
      "Credible pipelines, governed data and funder-ready digital programmes, with monitoring and benefits realisation built in.",
    ctaLabel: "Request an investor briefing",
    ctaHref: "/contact?intent=investor",
  },
  {
    slug: "partners",
    label: "Technology & delivery partners",
    pitch:
      "We lead every engagement as the single accountable partner and bring in specialists with decades of national-scale delivery.",
    ctaLabel: "Partner with us",
    ctaHref: "/contact?intent=partnership",
  },
  {
    slug: "consultants",
    label: "Consultants & specialists",
    pitch:
      "Program, change, cybersecurity and platform professionals who want to build digital public infrastructure across the U.S. and Africa.",
    ctaLabel: "Join the consultant network",
    ctaHref: "/contact?intent=consultant",
  },
];
