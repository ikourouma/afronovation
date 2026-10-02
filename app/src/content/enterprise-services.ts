import type { EnterpriseService, EnterpriseServiceCategory } from "./types";

export const enterpriseServiceCategories: EnterpriseServiceCategory[] = [
  {
    slug: "travel-mobility",
    name: "Travel & Mobility",
    tagline: "Air, stay, ground transport, experiences, and travel documentation.",
  },
  {
    slug: "identity-trust-security",
    name: "Identity, Trust & Security",
    tagline: "Secure documents, digital wallets, and platform-wide risk protection.",
  },
  {
    slug: "intelligence-data",
    name: "Intelligence & Data",
    tagline: "AI, operational insight, and predictive analytics across the ecosystem.",
  },
  {
    slug: "platform-operations-integration",
    name: "Platform Operations & Integration",
    tagline: "The connective backbone: integration, communications, and administration.",
  },
  {
    slug: "commerce-engagement",
    name: "Commerce & Engagement",
    tagline: "Growth marketing and payment orchestration for customer-facing platforms.",
  },
];

export const enterpriseServices: EnterpriseService[] = [
  // Travel & Mobility
  {
    slug: "bridgeair",
    name: "BridgeAir",
    category: "travel-mobility",
    description:
      "Enterprise air travel and itinerary management service that streamlines flight discovery, booking, and travel coordination across integrated platforms.",
    usedBy: ["Bridge55", "Future Travel Platforms"],
    status: "available",
  },
  {
    slug: "bridgestay",
    name: "BridgeStay",
    category: "travel-mobility",
    description:
      "Enterprise accommodation management service that enables lodging discovery, reservations, and stay management within digital travel experiences.",
    usedBy: ["Bridge55", "Future Travel Platforms"],
    status: "available",
  },
  {
    slug: "bridgemobility",
    name: "BridgeMobility",
    category: "travel-mobility",
    description:
      "Enterprise ground mobility service that supports transportation options, transfers, and local travel coordination throughout the user journey.",
    usedBy: ["Bridge55", "Future Mobility Platforms"],
    status: "available",
  },
  {
    slug: "bridgeexperience",
    name: "BridgeExperience",
    category: "travel-mobility",
    description:
      "Enterprise experience management service that connects users with curated activities, events, and destination experiences through a unified digital platform.",
    usedBy: ["Bridge55", "Future Tourism Platforms"],
    status: "available",
  },
  {
    slug: "bridgepackages",
    name: "BridgePackages",
    category: "travel-mobility",
    description:
      "Enterprise packaging service that combines multiple travel and destination services into integrated booking experiences.",
    usedBy: ["Bridge55"],
    status: "available",
  },
  {
    slug: "bridgevisa",
    name: "BridgeVisa",
    category: "travel-mobility",
    description:
      "Enterprise visa and digital travel authorization service that simplifies visa application workflows and traveler documentation management.",
    usedBy: ["Bridge55", "EmbassyOS"],
    status: "available",
  },
  // Identity, Trust & Security
  {
    slug: "bridgevault",
    name: "BridgeVault",
    category: "identity-trust-security",
    description:
      "Enterprise secure document and digital asset management service that protects, stores, and manages sensitive information across the platform ecosystem.",
    usedBy: [
      "Bridge55",
      "EmbassyOS",
      "CivisOS",
      "ElectionOS",
      "BridgeX",
      "Souvera Intelligence Terminal",
      "Souvera Markets",
    ],
    status: "pilot",
  },
  {
    slug: "bridgewallet",
    name: "BridgeWallet",
    category: "identity-trust-security",
    description:
      "Enterprise digital wallet service that securely manages user credentials, travel assets, and authorized digital records within connected platforms.",
    usedBy: ["Bridge55", "EmbassyOS", "Future Platforms"],
    status: "available",
  },
  {
    slug: "bridgeprotect",
    name: "BridgeProtect",
    category: "identity-trust-security",
    description:
      "Enterprise security and risk management service that strengthens platform resilience through secure access, monitoring, and protection of digital assets.",
    usedBy: ["All Afronovation Platforms"],
    status: "available",
  },
  {
    slug: "bridgetrust",
    name: "BridgeTrust",
    category: "identity-trust-security",
    description:
      "Trust services - PKI certificates, digital signatures, e-seals and timestamps - that give digital documents legal validity across institutions.",
    usedBy: ["BridgeX", "EmbassyOS", "Digital Government services"],
    status: "available",
    deliveredWithPartners: true,
  },
  {
    slug: "bridgeconsent",
    name: "BridgeConsent",
    category: "identity-trust-security",
    description:
      "Consent and data-access tracking that lets citizens grant consent and see which institution accessed their data, and why.",
    usedBy: ["BridgeX", "Digital Government services"],
    status: "roadmap",
  },
  {
    slug: "bridgeidentity",
    name: "BridgeIdentity",
    category: "identity-trust-security",
    description:
      "Enterprise digital identity service designed to manage trusted identity verification, authentication, and identity lifecycle management across the Afronovation ecosystem.",
    usedBy: ["Future Platform Integration"],
    status: "roadmap",
  },
  // Intelligence & Data
  {
    slug: "bridgeai",
    name: "BridgeAI",
    category: "intelligence-data",
    description:
      "Enterprise artificial intelligence service that delivers intelligent automation, recommendations, and decision support across Afronovation platforms.",
    usedBy: [
      "Bridge55",
      "EmbassyOS",
      "CivisOS",
      "ElectionOS",
      "BridgeX",
      "Souvera Intelligence Terminal",
      "Souvera Markets",
    ],
    status: "available",
  },
  {
    slug: "bridgeinsight",
    name: "BridgeInsight",
    category: "intelligence-data",
    description:
      "Enterprise operational intelligence service that transforms platform data into actionable insights through reporting, monitoring, and decision support.",
    usedBy: ["Bridge55", "CivisOS", "EmbassyOS", "Souvera Intelligence Terminal", "Souvera Markets"],
    status: "available",
  },
  {
    slug: "bridgeanalytics",
    name: "BridgeAnalytics",
    category: "intelligence-data",
    description:
      "Enterprise analytics service designed to deliver advanced dashboards, predictive analytics, and performance intelligence for organizations and decision makers.",
    usedBy: ["Future Platform Integration"],
    status: "roadmap",
  },
  // Platform Operations & Integration
  {
    slug: "bridgeapi",
    name: "BridgeAPI",
    category: "platform-operations-integration",
    description:
      "Enterprise integration service that enables secure connectivity between Afronovation platforms and external government, enterprise, and third-party systems.",
    usedBy: ["All Afronovation Platforms"],
    status: "available",
  },
  {
    slug: "bridgecomm",
    name: "BridgeComm",
    category: "platform-operations-integration",
    description:
      "Enterprise communications service that manages notifications, messaging, and user communications across web, mobile, and integrated channels.",
    usedBy: ["All Afronovation Platforms"],
    status: "available",
  },
  {
    slug: "bridgeadmin",
    name: "BridgeAdmin",
    category: "platform-operations-integration",
    description:
      "Enterprise administration service that provides centralized platform management, configuration, user administration, and operational oversight.",
    usedBy: ["All Afronovation Platforms"],
    status: "available",
  },
  {
    slug: "bridgeregistry",
    name: "BridgeRegistry",
    category: "platform-operations-integration",
    description:
      "Base registries - population, business, land and address - maintained as single sources of truth that every digital service can rely on.",
    usedBy: ["BridgeX", "Digital Government services"],
    status: "available",
    deliveredWithPartners: true,
  },
  // Commerce & Engagement
  {
    slug: "bridgemarketing",
    name: "BridgeMarketing",
    category: "commerce-engagement",
    description:
      "Enterprise marketing automation service that supports digital campaigns, audience engagement, and growth initiatives across connected platforms.",
    usedBy: ["All Customer-Facing Platforms"],
    status: "available",
  },
  {
    slug: "bridgepayments",
    name: "BridgePayments",
    category: "commerce-engagement",
    description:
      "Enterprise payment orchestration service designed to securely process and manage digital payment transactions across integrated products and services.",
    usedBy: ["Future Platform Integration"],
    status: "roadmap",
  },
];

export function getServicesByCategory(
  services: EnterpriseService[],
  category: EnterpriseService["category"],
): EnterpriseService[] {
  return services.filter((service) => service.category === category);
}

export function getServicesBySlugs(
  services: EnterpriseService[],
  slugs: string[],
): EnterpriseService[] {
  return slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is EnterpriseService => Boolean(service));
}

export const enterpriseServiceStatusLabels = {
  available: "Available",
  pilot: "Pilot",
  roadmap: "Roadmap",
} as const;
