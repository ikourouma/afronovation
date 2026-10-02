import type { PracticeArea } from "./types";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "program-change-management",
    name: "Program & Change Management",
    tagline: "Guiding change, driving success.",
    summary:
      "Complex programmes delivered on time and in scope, with adoption that lasts.",
    description:
      "Guiding Change, Driving Success. Our Program & Change Management practice ensures that complex initiatives are delivered on time, within scope, and with sustainable adoption. We combine proven methodologies—such as Agile, Lean, PROSCI, and PMI best practices—with deep stakeholder engagement to manage risk, align teams, and maximize ROI.",
    fullDescription:
      "Afronovation helps organizations deliver complex initiatives with confidence through program management and organizational change consulting. Our experts apply Agile, PROSCI, and PMI best practices to ensure projects stay on track, risks are managed, and people embrace change. We turn strategy into action by aligning stakeholders, streamlining processes, and achieving sustainable results.",
    keyServices: [
      "Enterprise PMO & portfolio delivery",
      "Organisational change & adoption",
      "Stakeholder engagement",
      "Agile coaching & delivery",
      "Performance tracking & benefits realisation",
    ],
  },
  {
    slug: "technology-platform-development",
    name: "Technology & Platform Development",
    tagline: "Building platforms for growth.",
    summary:
      "Secure, scalable platforms, portals and apps on a reusable service architecture.",
    description:
      "Building Platforms for Growth. From concept to execution, Afronovation develops modern, scalable, and secure technology solutions tailored to your business needs. Whether it's custom applications, SaaS platforms, websites, or mobile apps, we integrate cutting-edge design with seamless user experience.",
    fullDescription:
      "We design and build scalable, secure, and user-centric platforms that enable organizations to grow and innovate. From custom web and mobile apps to SaaS and enterprise solutions, Afronovation blends modern technology with intuitive design to deliver seamless digital experiences. Our team ensures that every solution is future-ready, integrated, and built for long-term success.",
    keyServices: [
      "SaaS, portal & enterprise platforms",
      "UI/UX design & prototyping",
      "Cloud, API & integration",
      "Web & mobile applications",
      "Enterprise system modernisation",
    ],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    tagline: "Reimagining the future, today.",
    summary:
      "Strategy, operating models and processes that turn ambition into measurable value.",
    description:
      "Reimagining the Future, Today. Digital transformation is more than technology—it's about reimagining processes, culture, and customer engagement. Afronovation partners with organizations to design and implement transformation strategies that deliver measurable value.",
    fullDescription:
      "Afronovation partners with businesses and governments to lead their digital transformation journey. We help modernize operations, optimize processes, and unlock value through cloud migration, data analytics, and IT modernization. By reimagining workflows and customer engagement, we empower organizations to thrive in the digital economy and achieve measurable growth.",
    keyServices: [
      "Digital strategy & national roadmaps",
      "e-Government & process redesign",
      "Data, analytics & AI enablement",
      "Cloud migration & modernisation",
      "Business process reengineering",
    ],
  },
  {
    slug: "cybersecurity-digital-trust",
    name: "Cybersecurity & Digital Trust",
    tagline: "Securing the digital state.",
    summary:
      "Protection, compliance and trust services for institutions that hold national data.",
    description:
      "Securing the digital state. Protection, compliance and trust services for institutions that hold national data - from risk assessments and security audits to data-protection compliance and national CERT/CSIRT readiness.",
    fullDescription:
      "Every digital service depends on institutions trusting each other's data. Afronovation helps governments and enterprises protect what they hold and prove it: risk assessments and security audits, data-protection compliance, PKI and digital-signature trust services delivered with partners, and the design of security operations, SOC and CSIRT capabilities with incident-response planning.",
    keyServices: [
      "Risk assessment & security audits",
      "Data protection & compliance",
      "National CERT/CSIRT readiness",
    ],
  },
];

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
