import type {
  FeaturedEngagement,
  PortfolioItem,
  PortfolioStatus,
  StartStep,
} from "./types";

/**
 * The nine mission-specific platforms, with the names, statuses and one-line
 * descriptions used in the 2026 Capabilities Portfolio (page 2).
 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "embassyos",
    name: "EmbassyOS",
    status: "flagship",
    sector: "Diplomatic Services",
    summary:
      "Sovereign operating system for embassies and consulates: citizen services, diaspora engagement and diplomatic operations, independently branded per mission.",
    href: "/platforms/embassyos",
    externalUrl: "https://embassyos.com",
    icon: "landmark",
    sortOrder: 1,
  },
  {
    slug: "zimbabwe-investment-platform",
    name: "Zimbabwe Digital Investment & Economic Intelligence Platform",
    status: "pilot",
    sector: "Investment Promotion",
    summary:
      "Governed national project registry, tiered investor pathway, ministry workspaces and deal execution, running as a controlled pilot for Zimbabwe.",
    href: "/#featured-engagement",
    externalUrl: null,
    icon: "trending-up",
    sortOrder: 2,
  },
  {
    slug: "civis",
    name: "CivisOS",
    status: "pilot",
    sector: "Diaspora Intelligence",
    summary:
      "Multi-tenant diaspora registration, population intelligence and structured engagement for governments, with the Dia explainable-AI engine in development.",
    href: "/platforms/civis",
    externalUrl: null,
    icon: "users",
    sortOrder: 3,
  },
  {
    slug: "bridge55",
    name: "Bridge55",
    status: "operational",
    sector: "Travel & Tourism",
    summary:
      "Pan-African federated travel platform connecting visas, flights, stays, mobility and experiences, deployed country by country.",
    href: "/platforms/bridge55",
    externalUrl: null,
    icon: "plane",
    sortOrder: 4,
  },
  {
    slug: "souvera-intelligence-terminal",
    name: "Souvera Intelligence Terminal",
    status: "operational",
    sector: "Strategic Intelligence",
    summary:
      "Country intelligence, investment signals and decision support for governments, investors and diaspora economic actors.",
    href: "/platforms/souvera-intelligence-terminal",
    externalUrl: null,
    icon: "line-chart",
    sortOrder: 5,
  },
  {
    slug: "souvera-markets",
    name: "Souvera Markets",
    status: "pilot",
    sector: "Financial Markets",
    summary:
      "Market information, investment insight and economic intelligence across African and global markets.",
    href: "/platforms/souvera-markets",
    externalUrl: null,
    icon: "globe",
    sortOrder: 6,
  },
  {
    slug: "electionos",
    name: "ElectionOS",
    status: "pilot",
    sector: "Governance & Elections",
    summary:
      "Transparent, auditable and policy-driven elections for organisations and institutions, in English and French.",
    href: "/platforms/electionos",
    externalUrl: null,
    icon: "vote",
    sortOrder: 7,
  },
  {
    slug: "bridgex",
    name: "BridgeX",
    status: "operational",
    sector: "Secure Data Exchange",
    summary:
      "The foundation of interoperable digital services: signed, encrypted exchange between institutions, built on X-Road®.",
    href: "/platforms/bridgex",
    externalUrl: null,
    icon: "link",
    sortOrder: 8,
  },
  {
    slug: "bridgeforces",
    name: "BridgeForces",
    status: "pilot",
    sector: "Public Safety & Security",
    summary:
      "Asset registry and accountability for security services: armouries, equipment and chain of custody, governed and audited.",
    href: "/platforms#bridgeforces",
    externalUrl: null,
    icon: "shield",
    sortOrder: 9,
  },
];

export const portfolioStatusLabels: Record<PortfolioStatus, string> = {
  flagship: "Flagship",
  operational: "Operational",
  pilot: "Pilot",
};

export const portfolioIntro =
  "Afronovation is an enterprise platform company. A shared catalogue of enterprise digital services is composed into mission-specific platforms, so proven capabilities, not one-off code, power every new mission.";

export const featuredEngagement: FeaturedEngagement = {
  eyebrow: "Featured engagement · Zimbabwe",
  title: "A national investment platform, delivered as a working pilot.",
  body: "Concept Note v0.3 proposed a governed digital investment platform as the first visible layer of the National Digital Acceleration Program. Within months it was running end to end: projects created, reviewed, approved and published; investors registered, verified and accredited; engagements carried through to memoranda of understanding.",
  stats: [
    { value: "37", label: "Platform records" },
    { value: "26", label: "Published projects" },
    { value: "8", label: "Priority sectors" },
    { value: "10", label: "Provinces covered" },
    { value: "6", label: "User personas" },
    { value: "7", label: "Control gates" },
  ],
  statsNote: "Pilot position, September 2026.",
  journey: [
    { title: "Ministry", detail: "submits" },
    { title: "National", detail: "review" },
    { title: "Agency", detail: "approval" },
    { title: "Public", detail: "registry" },
    { title: "Investor", detail: "engagement" },
    { title: "MoU", detail: "executed" },
  ],
  href: "/contact?intent=briefing",
};

/** "How to start with Afronovation" - a true sequence, so it is numbered. */
export const startSteps: StartStep[] = [
  {
    title: "Executive briefing",
    description: "A working session with your leadership on priorities and fit.",
  },
  {
    title: "30-day discovery",
    description: "Scope, governance model, success measures and roadmap.",
  },
  {
    title: "60–90 day pilot",
    description: "The first visible service live, with real users.",
  },
  {
    title: "365-day programme",
    description: "Scale through the National Digital Acceleration Program, with local teams trained to run it.",
  },
];
