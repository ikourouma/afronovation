import type { Platform } from "./types";

export const platformsIntro =
  "Afronovation builds mission-specific platforms on a shared foundation of reusable Enterprise Digital Services. Each platform solves a distinct institutional challenge; together they demonstrate a single, proven architecture that scales across governments, enterprises, and industries.";

export const platforms: Platform[] = [
  {
    slug: "bridge55",
    name: "Bridge55",
    tagline: "One trusted layer for the entire African travel journey.",
    summary:
      "An integrated travel and destination platform that simplifies travel planning through connected services for visas, transportation, accommodations, experiences, and traveler support.",
    sector: "Travel & Tourism",
    status: "operational",
    featured: true,
    externalUrl: null,
    imageKey: "projects/placeholder-05.jpg",
    imageAlt: "Representative imagery for the Bridge55 integrated travel platform",
    atAGlance: {
      sector: "Travel & Tourism",
      region: "Africa-focused, globally accessible",
      status: "Operational",
      servicesUsed: [
        "BridgeAir",
        "BridgeStay",
        "BridgeMobility",
        "BridgeExperience",
        "BridgePackages",
        "BridgeVisa",
      ],
    },
    challenge:
      "Travelers to and within Africa face a fragmented booking experience: visas, flights, lodging, ground transport, and local experiences are scattered across disconnected providers, most without regional trust signals or unified support. Every extra step is a chance for a traveler to abandon the trip - or the booking.",
    opportunity:
      "Owning the full journey, from identity and documentation through booking and on-the-ground experience, creates a single trusted layer that African destinations, airlines, and hospitality partners can plug into, capturing demand previously lost to fragmented, foreign-operated booking sites.",
    approach:
      "Bridge55 unifies the traveler journey into one experience layer, orchestrating visa authorization, flights, lodging, ground transport, and curated experiences behind a single account, with continuous support from booking through return - powered by Afronovation's travel, identity, and platform-operations services.",
    highlights: [
      "Unified booking across air, stay, mobility, and experiences",
      "Integrated visa and travel-documentation workflow",
      "Single traveler wallet for confirmations, documents, and payments",
      "Concierge-level support across the full journey",
      "Packaged multi-service itineraries for individual and group travel",
    ],
    poweredBy: [
      "bridgeair",
      "bridgestay",
      "bridgemobility",
      "bridgeexperience",
      "bridgepackages",
      "bridgevisa",
      "bridgevault",
      "bridgewallet",
      "bridgeprotect",
      "bridgeai",
      "bridgeinsight",
      "bridgeapi",
      "bridgecomm",
      "bridgeadmin",
      "bridgemarketing",
    ],
    expectedImpact: [
      { label: "Reduced time-to-book across the full travel journey", targetOutcome: true },
      { label: "Fewer abandoned bookings caused by fragmented steps", targetOutcome: true },
      { label: "Higher repeat travel and traveler loyalty", targetOutcome: true },
      { label: "Stronger distribution reach for airline and hospitality partners", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Leisure and business travelers to and within Africa"],
      secondary: ["Airlines, hotels, tour operators, destination management companies"],
      decisionMakers: ["Tourism boards", "Hospitality group executives", "Travel partner leadership"],
    },
    scalability:
      "The same orchestration layer extends to any region or vertical requiring bundled travel logistics - diaspora travel programs, conference and event travel, or government-sponsored delegations - without re-architecting the underlying services.",
  },
  {
    slug: "embassyos",
    name: "EmbassyOS",
    tagline: "The sovereign operating system for modern diplomacy.",
    summary:
      "A sovereign digital platform that enables embassies and consulates to modernize citizen services, diaspora engagement, and diplomatic operations through secure digital services.",
    sector: "Government / Diplomatic Services",
    status: "flagship",
    featured: true,
    externalUrl: "https://embassyos.com",
    imageKey: "projects/placeholder-06.jpg",
    imageAlt: "Representative imagery for the EmbassyOS sovereign diplomatic platform",
    atAGlance: {
      sector: "Government / Diplomatic Services",
      region: "Global embassy and consular network",
      status: "Live - flagship platform",
      servicesUsed: [
        "BridgeVisa",
        "BridgeVault",
        "BridgeWallet",
        "BridgeAI",
        "BridgeInsight",
        "BridgeAPI",
        "BridgeComm",
        "BridgeAdmin",
      ],
    },
    challenge:
      "Embassies and consulates still rely heavily on manual, in-person, paper-based processes for passport renewals, visa applications, notarizations, and diaspora engagement, creating long wait times, inconsistent service quality, and limited operational visibility for missions serving citizens abroad.",
    opportunity:
      "Digitizing consular operations gives foreign ministries a modern, secure channel to serve citizens and diaspora communities at scale, while giving diplomatic missions real-time operational visibility they have never had.",
    approach:
      "EmbassyOS gives embassies and consulates a secure, sovereign digital operations layer: citizen self-service portals, secure document workflows, and diaspora engagement tools, built on Afronovation's identity, security, and integration services so each mission can modernize without standing up its own infrastructure.",
    highlights: [
      "Self-service citizen portal for passport, visa, and notarial requests",
      "Secure document vault for sensitive diplomatic records",
      "Diaspora engagement and communication tools",
      "Real-time operational dashboards for mission staff",
      "Sovereign data handling aligned to diplomatic requirements",
    ],
    poweredBy: [
      "bridgevisa",
      "bridgevault",
      "bridgewallet",
      "bridgeprotect",
      "bridgeai",
      "bridgeinsight",
      "bridgeapi",
      "bridgecomm",
      "bridgeadmin",
      "bridgemarketing",
    ],
    expectedImpact: [
      { label: "Reduced average processing time for routine consular requests", targetOutcome: true },
      { label: "Higher citizen satisfaction with consular services", targetOutcome: true },
      { label: "Expanded diaspora engagement reach", targetOutcome: true },
      { label: "Stronger operational visibility for mission leadership", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Citizens and diaspora communities abroad"],
      secondary: ["Consular staff and mission administrators"],
      decisionMakers: ["Ambassadors", "Foreign ministry digital transformation leads"],
    },
    scalability:
      "The same sovereign services layer scales from a single consulate to a full ministry's global mission network, and the underlying identity, document, and communication services extend naturally to broader government digital-services programs - see CivisOS.",
  },
  {
    slug: "civis",
    name: "CivisOS",
    tagline: "Turning scattered diaspora data into strategic advantage.",
    summary:
      "A sovereign intelligence platform that enables governments to securely manage diaspora registration, population intelligence, and strategic engagement through a multi-tenant architecture.",
    sector: "Government / Public Sector Intelligence",
    status: "pilot",
    featured: true,
    externalUrl: null,
    imageKey: "projects/placeholder-07.jpg",
    imageAlt: "Representative imagery for the CivisOS sovereign intelligence platform",
    atAGlance: {
      sector: "Government / Public Sector Intelligence",
      region: "Multi-country, multi-tenant government deployments",
      status: "Pilot",
      servicesUsed: ["BridgeVault", "BridgeAI", "BridgeInsight", "BridgeAPI", "BridgeComm", "BridgeAdmin"],
    },
    challenge:
      "Governments managing large diaspora populations often lack a unified, secure system to register citizens abroad, understand where their diaspora is concentrated, or engage them strategically for remittances, investment, or civic participation.",
    opportunity:
      "A secure, multi-tenant registration and intelligence platform lets any government stand up its own diaspora program on shared, proven infrastructure, turning scattered diaspora data into a strategic asset for economic and civic engagement.",
    approach:
      "CivisOS provides governments with a secure, multi-tenant platform for diaspora registration, population intelligence, and structured engagement campaigns, isolating each government's data while sharing a common, continuously improving intelligence and security foundation.",
    highlights: [
      "Self-service diaspora registration",
      "Population intelligence dashboards by geography and sector",
      "Multi-tenant architecture with strict per-government data isolation",
      "Structured engagement and campaign tools",
      "Secure document handling for registrants",
    ],
    poweredBy: [
      "bridgevault",
      "bridgeprotect",
      "bridgeai",
      "bridgeinsight",
      "bridgeapi",
      "bridgecomm",
      "bridgeadmin",
      "bridgemarketing",
    ],
    expectedImpact: [
      { label: "Increased diaspora registration coverage", targetOutcome: true },
      { label: "Improved visibility into diaspora population distribution", targetOutcome: true },
      { label: "Stronger remittance and investment engagement outcomes", targetOutcome: true },
      { label: "Faster time-to-launch for each new government tenant", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Diaspora citizens registering with their home government"],
      secondary: ["Government diaspora affairs offices"],
      decisionMakers: ["Ministries of foreign affairs / diaspora affairs", "National statistics offices"],
    },
    scalability:
      "The multi-tenant architecture lets any government onboard onto CivisOS independently, with data isolation guaranteed by design, making it straightforward to expand from a single pilot country to a multi-country diaspora intelligence network.",
  },
  {
    slug: "electionos",
    name: "ElectionOS",
    tagline: "Elections that are provably transparent, by design.",
    summary:
      "A secure digital governance platform designed to administer transparent, auditable, and policy-driven elections for organizations and institutions.",
    sector: "Governance / Elections",
    status: "pilot",
    featured: false,
    externalUrl: null,
    imageKey: "projects/placeholder-08.jpg",
    imageAlt: "Representative imagery for the ElectionOS digital governance platform",
    atAGlance: {
      sector: "Governance / Elections",
      region: "Institutional and governmental elections",
      status: "Pilot",
      servicesUsed: ["BridgeVault", "BridgeAI", "BridgeAPI", "BridgeComm", "BridgeAdmin"],
    },
    challenge:
      "Many institutions and governments still run elections on manual or fragmented systems that struggle to guarantee transparency, auditability, and consistent policy enforcement, undermining trust in the outcome.",
    opportunity:
      "A purpose-built, policy-driven election platform gives institutions a way to run elections that are provably transparent and auditable, strengthening legitimacy and reducing the operational burden of running an election.",
    approach:
      "ElectionOS administers elections end-to-end - voter or member eligibility, ballot configuration, secure voting, and independently auditable results - with every rule encoded as configurable policy rather than manual process, backed by Afronovation's security and identity services.",
    highlights: [
      "Configurable, policy-driven ballot and eligibility rules",
      "Secure, auditable voting workflows",
      "Independent results-verification trail",
      "Role-based access for election administrators",
      "Support for institutional and governmental election formats",
    ],
    poweredBy: ["bridgevault", "bridgeprotect", "bridgeai", "bridgeapi", "bridgecomm", "bridgeadmin", "bridgemarketing"],
    expectedImpact: [
      { label: "Higher confidence in election integrity through auditability", targetOutcome: true },
      { label: "Reduced administrative overhead for election bodies", targetOutcome: true },
      { label: "Faster certified results turnaround", targetOutcome: true },
      { label: "Broader participation through accessible digital voting", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Eligible voters and members"],
      secondary: ["Election administrators and oversight bodies"],
      decisionMakers: ["Electoral commissions", "Institutional governance boards"],
    },
    scalability:
      "The same policy-driven engine adapts to elections of very different scale and rules, from a single organization's board election to a national institutional election, by reconfiguring policy rather than rebuilding the platform.",
  },
  {
    slug: "bridgex",
    name: "BridgeX",
    tagline: "The trusted layer for cross-organization interoperability.",
    summary:
      "An enterprise interoperability platform that securely connects systems, data, and digital services to enable seamless information exchange across organizations.",
    sector: "Enterprise & Government Interoperability",
    status: "operational",
    featured: false,
    externalUrl: null,
    imageKey: "projects/placeholder-09.jpg",
    imageAlt: "Representative imagery for the BridgeX interoperability platform",
    atAGlance: {
      sector: "Enterprise & Government Interoperability",
      region: "Cross-organizational, cross-government",
      status: "Operational",
      servicesUsed: ["BridgeVault", "BridgeAI", "BridgeAPI", "BridgeComm", "BridgeAdmin"],
    },
    challenge:
      "Governments and large enterprises run critical systems that cannot easily talk to each other. Data stays siloed across ministries, agencies, and partner organizations, slowing down every process that depends on cross-system information exchange.",
    opportunity:
      "A secure, standards-based interoperability layer lets organizations exchange the data and services they need without each side rebuilding integration from scratch, unlocking coordinated, cross-agency digital services.",
    approach:
      "BridgeX securely connects disparate systems, data sources, and digital services across organizational boundaries, using Afronovation's integration and security services as the trusted layer that governs what is exchanged, with whom, and under what policy.",
    highlights: [
      "Secure cross-organization data and service exchange",
      "Policy-based access controls per integration",
      "Standards-based connectors for government and enterprise systems",
      "Centralized visibility into cross-system data flows",
      "Foundation for coordinated, interoperable digital services",
    ],
    poweredBy: ["bridgevault", "bridgeprotect", "bridgeai", "bridgeapi", "bridgecomm", "bridgeadmin", "bridgemarketing"],
    expectedImpact: [
      { label: "Reduced integration time for new cross-agency data exchanges", targetOutcome: true },
      { label: "Improved data consistency across connected systems", targetOutcome: true },
      { label: "Faster delivery of coordinated digital services", targetOutcome: true },
      { label: "Stronger governance over sensitive data exchange", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Government agencies and enterprise IT teams needing to exchange data"],
      secondary: ["Partner organizations and third-party system operators"],
      decisionMakers: ["Chief information officers", "Digital government leads", "Enterprise architecture teams"],
    },
    scalability:
      "Because BridgeX governs integration through policy rather than point-to-point custom code, each new organization or system it connects becomes progressively easier to onboard, letting the interoperability network grow without linear increases in integration cost.",
  },
  {
    slug: "souvera-intelligence-terminal",
    name: "Souvera Intelligence Terminal",
    tagline: "Turning economic signals into strategic decisions.",
    summary:
      "A strategic intelligence platform that transforms trade, investment, and economic data into actionable intelligence to support informed public and private sector decision-making.",
    sector: "Economic & Strategic Intelligence",
    status: "operational",
    featured: true,
    externalUrl: null,
    imageKey: "projects/placeholder-10.jpg",
    imageAlt: "Representative imagery for the Souvera Intelligence Terminal platform",
    atAGlance: {
      sector: "Economic & Strategic Intelligence",
      region: "Africa-focused, globally relevant",
      status: "Operational",
      servicesUsed: ["BridgeVault", "BridgeAI", "BridgeInsight", "BridgeAPI", "BridgeComm", "BridgeAdmin"],
    },
    challenge:
      "Trade, investment, and economic data relevant to African markets is scattered across disconnected sources, making it difficult for public institutions and private investors to make timely, well-informed strategic decisions.",
    opportunity:
      "Consolidating trade, investment, and economic signals into a single intelligence terminal gives governments and investors a decisive information advantage in a region where that data has historically been hardest to access.",
    approach:
      "Souvera Intelligence Terminal aggregates and analyzes trade, investment, and macroeconomic data into a strategic intelligence terminal, using Afronovation's AI and insight services to surface the signals that matter for public and private sector decision-making. It builds on the Africa Intelligence Map initiative.",
    highlights: [
      "Consolidated trade and investment data terminal",
      "AI-assisted economic signal analysis",
      "Strategic decision-support dashboards",
      "Secure data handling for sensitive economic intelligence",
      "Built on the Africa Intelligence Map initiative",
    ],
    poweredBy: ["bridgevault", "bridgeprotect", "bridgeai", "bridgeinsight", "bridgeapi", "bridgecomm", "bridgeadmin", "bridgemarketing"],
    expectedImpact: [
      { label: "Faster access to decision-relevant economic intelligence", targetOutcome: true },
      { label: "Improved quality of public sector policy decisions", targetOutcome: true },
      { label: "Increased investor confidence through better information access", targetOutcome: true },
      { label: "Stronger coordination between public and private economic actors", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Government economic planning bodies"],
      secondary: ["Private investors and financial institutions"],
      decisionMakers: ["Ministries of finance, trade, and planning", "Development finance institutions"],
    },
    scalability:
      "The terminal's data model is built to absorb new sources and geographies incrementally, so coverage can expand from an initial set of markets to a continent-wide economic intelligence network without redesigning the platform.",
  },
  {
    slug: "souvera-markets",
    name: "Souvera Markets",
    tagline: "Closing Africa's market-information gap.",
    summary:
      "A financial market intelligence platform that provides access to market information, investment insights, and economic intelligence across Africa and global markets.",
    sector: "Financial Markets Intelligence",
    status: "pilot",
    featured: false,
    externalUrl: null,
    imageKey: "projects/placeholder-11.jpg",
    imageAlt: "Representative imagery for the Souvera Markets financial intelligence platform",
    atAGlance: {
      sector: "Financial Markets Intelligence",
      region: "Africa and global markets",
      status: "Pilot",
      servicesUsed: ["BridgeVault", "BridgeAI", "BridgeInsight", "BridgeAPI", "BridgeComm", "BridgeAdmin"],
    },
    challenge:
      "Investors and institutions tracking African markets often lack a single, reliable source for market information and investment insight comparable to what is readily available for developed markets, creating an information gap that discourages capital flow.",
    opportunity:
      "A dedicated market intelligence platform for Africa closes that information gap, giving both African and international investors the confidence to act on Africa-focused opportunities.",
    approach:
      "Souvera Markets delivers market information, investment insights, and economic intelligence across Africa and global markets, sharing its underlying intelligence and security foundation with Souvera Intelligence Terminal while focusing specifically on market and investment use cases.",
    highlights: [
      "Cross-market financial data coverage across Africa and global markets",
      "Investment insight and analysis tools",
      "Economic intelligence tailored to market decision-making",
      "Secure access for institutional users",
      "Shared intelligence foundation with Souvera Intelligence Terminal",
    ],
    poweredBy: ["bridgevault", "bridgeprotect", "bridgeai", "bridgeinsight", "bridgeapi", "bridgecomm", "bridgeadmin", "bridgemarketing"],
    expectedImpact: [
      { label: "Improved access to African market data for global investors", targetOutcome: true },
      { label: "Increased cross-border investment activity", targetOutcome: true },
      { label: "Better-informed institutional trading and allocation decisions", targetOutcome: true },
      { label: "Stronger visibility into Africa-specific market risk and opportunity", targetOutcome: true },
    ],
    whoItServes: {
      primary: ["Institutional and individual investors"],
      secondary: ["Financial analysts and asset managers"],
      decisionMakers: ["Fund managers", "Investment committees", "Financial institution leadership"],
    },
    scalability:
      "Built on the same intelligence foundation as Souvera Intelligence Terminal, Souvera Markets can extend coverage to new asset classes or markets by adding data sources rather than new infrastructure, keeping pace with investor demand as African capital markets mature.",
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((platform) => platform.slug === slug);
}


export const futurePlatformsCallout = {
  name: "Future Platforms",
  tagline:
    "Mission-specific digital platforms built on Afronovation's enterprise service layer to accelerate digital transformation across industries and institutions.",
  ctaLabel: "Discuss your platform",
  ctaHref: "/contact",
};
