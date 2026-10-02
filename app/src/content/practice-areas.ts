import type { PracticeArea } from "./types";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "program-change-management",
    name: "program & change management",
    tagline: "Guiding Change, Driving Success.",
    summary:
      "Our Program & Change Management practice ensures that complex initiatives are delivered on time, within scope, and with sustainable adoption.",
    description:
      "Guiding Change, Driving Success. Our Program & Change Management practice ensures that complex initiatives are delivered on time, within scope, and with sustainable adoption. We combine proven methodologies—such as Agile, Lean, PROSCI, and PMI best practices—with deep stakeholder engagement to manage risk, align teams, and maximize ROI.",
    fullDescription:
      "Afronovation helps organizations deliver complex initiatives with confidence through program management and organizational change consulting. Our experts apply Agile, PROSCI, and PMI best practices to ensure projects stay on track, risks are managed, and people embrace change. We turn strategy into action by aligning stakeholders, streamlining processes, and achieving sustainable results.",
    keyServices: [
      "program management consulting",
      "organizational change management",
      "Agile project delivery",
      "business transformation leadership",
    ],
  },
  {
    slug: "technology-platform-development",
    name: "Technology & platform development",
    tagline: "Building Platforms for Growth.",
    summary:
      "From concept to execution, Afronovation develops modern, scalable, and secure technology solutions tailored to your business needs.",
    description:
      "Building Platforms for Growth. From concept to execution, Afronovation develops modern, scalable, and secure technology solutions tailored to your business needs. Whether it's custom applications, SaaS platforms, websites, or mobile apps, we integrate cutting-edge design with seamless user experience.",
    fullDescription:
      "We design and build scalable, secure, and user-centric platforms that enable organizations to grow and innovate. From custom web and mobile apps to SaaS and enterprise solutions, Afronovation blends modern technology with intuitive design to deliver seamless digital experiences. Our team ensures that every solution is future-ready, integrated, and built for long-term success.",
    keyServices: [
      "technology consulting",
      "SaaS platform development",
      "custom app development",
      "enterprise software solutions",
      "UI/UX design services",
    ],
  },
  {
    slug: "digital-transformation",
    name: "digital transformation",
    tagline: "Reimagining the Future, Today.",
    summary:
      "Digital transformation is more than technology—it's about reimagining processes, culture, and customer engagement.",
    description:
      "Reimagining the Future, Today. Digital transformation is more than technology—it's about reimagining processes, culture, and customer engagement. Afronovation partners with organizations to design and implement transformation strategies that deliver measurable value.",
    fullDescription:
      "Afronovation partners with businesses and governments to lead their digital transformation journey. We help modernize operations, optimize processes, and unlock value through cloud migration, data analytics, and IT modernization. By reimagining workflows and customer engagement, we empower organizations to thrive in the digital economy and achieve measurable growth.",
    keyServices: [
      "digital transformation consulting",
      "cloud migration services",
      "IT modernization",
      "government digitalization",
      "business process reengineering",
    ],
  },
];

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
