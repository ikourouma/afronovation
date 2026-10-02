import type { MegaMenuSection, NavItem } from "./types";

/** Small links in the utility bar above the flash banner. */
export const utilityLinks: NavItem[] = [
  { label: "Insights", href: "/insights" },
  { label: "News", href: "/insights#news" },
  { label: "Careers", href: "/contact?intent=consultant" },
  { label: "Contact", href: "/contact" },
];

export const megaMenu: MegaMenuSection[] = [
  {
    id: "solutions",
    label: "Solutions",
    intro: {
      title: "Solutions",
      body: "Four integrated practices that take institutions from digital ambition to governed, measurable execution.",
      cta: { label: "All solutions", href: "/services" },
    },
    groups: [
      {
        heading: "Practices",
        links: [
          { label: "Program & Change Management", href: "/services#program-change-management", description: "Delivery on time and in scope, with adoption that lasts." },
          { label: "Technology & Platform Development", href: "/services#technology-platform-development", description: "Secure, scalable platforms on a reusable architecture." },
          { label: "Digital Transformation", href: "/services#digital-transformation", description: "Strategy, operating models and process redesign." },
          { label: "Cybersecurity & Digital Trust", href: "/services#cybersecurity-digital-trust", description: "Protection and compliance for institutions holding national data." },
        ],
      },
      {
        heading: "Programmes",
        links: [
          { label: "Digital Government", href: "/services#digital-government", description: "18 e-Government service domains on one governed platform." },
          { label: "National Digital Acceleration Program", href: "/services#ndap", description: "A modular, 365-day pathway to platform-enabled execution." },
          { label: "Advisory Services", href: "/services#advisory", description: "Digital leadership, policy, architecture and financing." },
        ],
      },
    ],
  },
  {
    id: "platforms",
    label: "Platforms",
    intro: {
      title: "Platforms",
      body: "Mission-specific platforms composed from one catalogue of enterprise digital services.",
      cta: { label: "View all platforms", href: "/platforms" },
    },
    groups: [
      {
        heading: "Government & diplomacy",
        links: [
          { label: "EmbassyOS", href: "/platforms/embassyos", badge: "Flagship" },
          { label: "Zimbabwe Investment Platform", href: "/platforms#zimbabwe-investment-platform", badge: "Pilot" },
          { label: "CivisOS", href: "/platforms/civis", badge: "Pilot" },
          { label: "ElectionOS", href: "/platforms/electionos", badge: "Pilot" },
          { label: "BridgeForces", href: "/platforms#bridgeforces", badge: "Pilot" },
        ],
      },
      {
        heading: "Markets, travel & data",
        links: [
          { label: "Bridge55", href: "/platforms/bridge55" },
          { label: "Souvera Intelligence Terminal", href: "/platforms/souvera-intelligence-terminal" },
          { label: "Souvera Markets", href: "/platforms/souvera-markets", badge: "Pilot" },
          { label: "BridgeX", href: "/platforms/bridgex" },
        ],
      },
      {
        heading: "Foundation",
        links: [
          { label: "Enterprise Digital Services", href: "/enterprise-services", description: "The shared catalogue that powers every platform." },
        ],
      },
    ],
  },
  {
    id: "who-we-serve",
    label: "Who We Serve",
    intro: {
      title: "Who we serve",
      body: "Institutions that need credible delivery, governed data and adoption that lasts.",
      cta: { label: "Book a Briefing", href: "/contact?intent=briefing" },
    },
    groups: [
      {
        heading: "Sectors",
        links: [
          { label: "Governments & public institutions", href: "/#who-we-serve", description: "Ministries, agencies and national programmes." },
          { label: "Diplomatic missions & diaspora", href: "/#who-we-serve", description: "Embassies, consulates and diaspora offices." },
          { label: "Development partners & investors", href: "/#who-we-serve", description: "Funder-ready programmes and credible pipelines." },
          { label: "Enterprises & scale-ups", href: "/#who-we-serve", description: "Proven identity, AI, communications and payments services." },
        ],
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    intro: {
      title: "Insights",
      body: "Perspectives on digital government, platforms and transformation, plus company news.",
      cta: { label: "Subscribe to updates", href: "#newsletter" },
    },
    groups: [
      {
        heading: "Read",
        links: [
          { label: "Articles & perspectives", href: "/insights" },
          { label: "News & announcements", href: "/insights#news" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    intro: {
      title: "Company",
      body: "Founded in 2018 in Cary, North Carolina, with a presence in Côte d'Ivoire, Guinea and Sierra Leone.",
      cta: { label: "About Afronovation", href: "/about" },
    },
    groups: [
      {
        heading: "Afronovation",
        links: [
          { label: "About us", href: "/about" },
          { label: "Leadership", href: "/about#team" },
          { label: "Partners", href: "/contact?intent=partnership" },
          { label: "Careers & consultant network", href: "/contact?intent=consultant" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];
