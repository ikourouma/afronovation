/*
 * Solutions page content, taken from the 2026 Capabilities Portfolio
 * (pages 3-6). Becomes admin-managed with the rest of the site content.
 */

export const digitalGovernment = {
  intro:
    "Afronovation digitises the services a government actually delivers. One governed platform carries two front doors: a government portal where officials do the work, and a citizen and business portal where the public applies, pays and receives decisions. Services are activated one at a time, on shared foundations, so each new service is a configuration, not a new procurement.",
  portals: [
    {
      title: "Government portal",
      audience: "For officials",
      items: [
        "Case and application workflows",
        "Review, approval and publishing gates",
        "Institutional dashboards and reporting",
        "Ministry-scoped workspaces",
      ],
    },
    {
      title: "Governed core",
      audience: "Shared foundation",
      items: [
        "Identity, roles and entitlements",
        "Payments and revenue collection",
        "Document vault and e-signature",
        "Audit trail and interoperability APIs",
      ],
    },
    {
      title: "Citizen & business portal",
      audience: "For the public",
      items: [
        "Apply, upload and pay online",
        "Track status and receive decisions",
        "One account across services",
        "Mobile-first, multilingual access",
      ],
    },
  ],
  catalogue: [
    { name: "e-Citizen & e-Business", detail: "Applications, permits, business registration" },
    { name: "e-ID & Civil Status", detail: "Birth, marriage, identity records" },
    { name: "e-Health", detail: "Patient records, facility reporting" },
    { name: "e-Tax", detail: "Filing, assessment, collection" },
    { name: "e-Justice", detail: "Case filing, tracking, records" },
    { name: "e-Procurement", detail: "Tenders, bids, contract award" },
    { name: "Land Registry", detail: "Title, parcels, transfers" },
    { name: "e-Education", detail: "Enrolment, results, institutions" },
    { name: "e-Agriculture", detail: "Farmer registries, inputs, subsidies" },
    { name: "e-Tourism", detail: "Destinations, operators, permits" },
    { name: "e-Visa & Consular", detail: "Visas, consular and diaspora services" },
    { name: "Public Financial Management", detail: "Budget planning, execution, oversight" },
    { name: "Statistics & e-Reporting", detail: "Enterprise data collection, national statistics" },
    { name: "Social Protection & Employment", detail: "Benefits, pensions, job services" },
    { name: "Customs & Trade Single Window", detail: "Import, export, clearance" },
    { name: "Local Government", detail: "Municipal services, rates, licences" },
    { name: "Public Safety & Security", detail: "Asset registries, accountability" },
    { name: "Citizen Service Hub", detail: "Web and mobile front door, with proactive alerts" },
  ],
  outcomes: [
    {
      title: "Services citizens can feel",
      body: "Priority services go live within the first 90 days, not after years of procurement, each with a status the applicant can see.",
    },
    {
      title: "Revenue and compliance",
      body: "Digitised filing, permits and fees widen the revenue base, shorten collection cycles and create the audit evidence oversight bodies expect.",
    },
    {
      title: "Skills and local ownership",
      body: "Every deployment carries a training and knowledge-transfer plan, so government operates and extends the platform itself.",
    },
  ],
  pathway: [
    { title: "Select", detail: "the service" },
    { title: "Map", detail: "the current process" },
    { title: "Configure", detail: "not rebuild" },
    { title: "Pilot", detail: "one agency" },
    { title: "Go live", detail: "with support" },
    { title: "Scale", detail: "across ministries" },
  ],
  conditions: [
    { title: "Mobile-first", body: "Citizens complete services on the device they already have, on modest bandwidth." },
    { title: "Multilingual", body: "English, French and more, configured per country and per service." },
    { title: "Sovereign hosting", body: "In-country or regional deployment, with national authority over official data." },
    { title: "Assisted channels", body: "Service centres, agents and SMS for citizens without a smartphone." },
  ],
};

export const digitalTrust = {
  intro:
    "Every digital service depends on institutions trusting each other's data. BridgeX connects ministries, registries, agencies and banks directly, peer to peer, with no central database to breach. Every exchange is encrypted, signed, time-stamped and logged, so it carries legal weight.",
  xroad:
    "BridgeX is built on X-Road®, the open-source exchange layer that has run Estonia's digital state since 2001 and is now used by governments on four continents. Where a government has standardised on the Unified eXchange Platform (UXP), we design services to connect to it.",
  properties: [
    { title: "Once-only", body: "Citizens never resubmit data the state already holds." },
    { title: "Legal evidence", body: "Every exchange is provable: who sent what, to whom, and when." },
    { title: "No central honeypot", body: "Data stays with its owner; there is no single database to breach." },
    { title: "Cross-border ready", body: "Federated exchange with other countries and regional bodies." },
  ],
  trademarkNote: "X-Road® is a registered trademark of the Estonian Information System Authority (RIA).",
};

/** National Digital Acceleration Program - a true sequence of phases. */
export const ndap = {
  intro:
    "A modular, 365-day pathway that moves public institutions from digital ambition to visible, governed, platform-enabled execution. Investment intelligence is the entry point; government modernisation is the pathway.",
  phases: [
    { days: "Days 1–30", title: "Assess & align", detail: "Priorities, mandate, governance, success measures" },
    { days: "Days 31–90", title: "Build the first visible layer", detail: "Platform MVP, core workflows, approval gates" },
    { days: "Days 91–180", title: "Expand enablement", detail: "Institutional workflows, document vault, analytics" },
    { days: "Days 181–270", title: "Activate priority services", detail: "Service portals, e-payment, interoperability" },
    { days: "Days 271–365", title: "Institutionalise & scale", detail: "Training, operating model, scale roadmap" },
  ],
  throughline: "Capacity transfer, change management and adoption support run throughout all five phases.",
};

export const advisory = {
  intro:
    "Afronovation leads every engagement and remains the single point of accountability. For specialised components we bring in partners with decades of national-scale delivery, so governments get proven technology without managing a supply chain.",
  services: [
    { title: "Digital leadership as a service", body: "Chief Digital Officer and CTO support for ministries: strategy, vendor oversight and technical decisions." },
    { title: "Digital policy, legal & regulatory", body: "Frameworks for e-transactions, e-signatures, data protection and cybersecurity." },
    { title: "Enterprise architecture & standards", body: "National architecture, data standards and GovStack-aligned building blocks." },
    { title: "Cybersecurity & compliance", body: "Risk assessments, security audits, data-protection compliance and CSIRT design." },
    { title: "Managed services & support", body: "SLA-backed operations, maintenance, hosting and team augmentation." },
    { title: "Financing & benefits realisation", body: "Funder-ready business cases, partnership readiness, monitoring and evaluation." },
  ],
  commitments: [
    { title: "Single point of accountability", body: "One contract, one programme lead, one team answerable for results." },
    { title: "National data sovereignty", body: "Government keeps authority over its data, content and decisions." },
    { title: "Knowledge transfer built in", body: "Every engagement leaves trained local teams behind." },
    { title: "Continuity by contract", body: "Transfer, OEM or continuity arrangements agreed at the outset." },
  ],
};
