import type { TeamMember } from "./types";

export const teamMembers: TeamMember[] = [
  {
    slug: "ibrahima-kourouma",
    name: "Ibrahima Kourouma",
    role: "Partner / from Strategy to adoption",
    bio: "Ibrahima kourouma is a proven leader in digital transformation and change management, with experience at the African Development Bank (AfDB), Cisco Systems, and government agencies. known for leading change from strategy to adoption, he specializes in driving innovation, leading large-scale programs, and turning strategy into impact.",
    credentials: ["PMP", "PROSCI", "CSM", "Agile Coach", "SAFe", "CISM"],
    headshotKey: "team/ibrahima-kourouma.jpg",
    headshotAlt: "Portrait of Ibrahima Kourouma, Managing Partner",
    linkedinUrl: "https://www.linkedin.com/in/ikourouma/",
    sortOrder: 1,
  },
  {
    slug: "adrienne-boykin",
    name: "Adrienne Boykin",
    role: "Partner / marketing officer",
    bio: "Adrienne Boykin is a seasoned Marketing and Communications Officer with 20+ years of expertise in digital media, brand storytelling, and strategic content creation. She specializes in social media campaigns, video production, and live event management, helping organizations engage audiences, strengthen brand visibility, and drive measurable impact.",
    credentials: [],
    headshotKey: "team/adrienne-boykin.png",
    headshotAlt: "Portrait of Adrienne Boykin, Marketing Officer",
    // TODO(stakeholder-Q2): LinkedIn URL pending confirmation
    linkedinUrl: null,
    sortOrder: 2,
  },
  {
    slug: "justin-fawson",
    name: "Justin Fawson",
    // TODO(stakeholder-Q1): spelling confirmed pending
    role: "Partner / operations officer",
    bio: "Justin Fawson is a versatile executive and entrepreneur who builds and grows businesses by focusing on people, innovative solutions, and strong relationships. A servant leader, military veteran, and former House Representative, he has a proven record of success in operations, strategy, and business development across diverse sectors.",
    credentials: [],
    headshotKey: "team/justin-fawson.png",
    headshotAlt: "Portrait of Justin Fawson, Operations Officer",
    linkedinUrl: "https://www.linkedin.com/in/justinfawson/",
    sortOrder: 3,
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}
