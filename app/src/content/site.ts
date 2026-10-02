import type { ContactDetails, NavItem } from "./types";

export const siteName = "Afronovation, Inc.";

export const tagline =
  "We help governments and enterprises across the U.S. and Africa turn strategy into working digital systems.";

export const brandLine = "Inspiring possibilities.";

export const contact: ContactDetails = {
  address: "127 Long Shadow Ln., Cary, NC 27518",
  email: "hello@afronovation.com",
  phone: "1-844-664-4247",
};

export const mission =
  "A strategy, technology and digital transformation company. We pair senior advisory leadership with in-house platform engineering, and make sure people adopt what we build.";

export const companyFacts = {
  founded: 2018,
  headquarters: "Cary, North Carolina",
  presence: ["United States", "Côte d'Ivoire", "Guinea", "Sierra Leone"],
} as const;

export const aboutSummary =
  "We provide digital solutions that transform strategy into measurable impact and help businesses and governments drive growth through program management, digital transformation, and innovative technology solutions.";

export const companyNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description:
      "Our story, values, and commitment to measurable impact.",
  },
  {
    label: "Team",
    href: "/about#team",
    description:
      "Meet the leaders guiding strategy, technology, and change.",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    description:
      "What clients say about partnering with Afronovation.",
  },
  {
    label: "Contact",
    href: "/contact",
    description:
      "Reach our team to discuss your next initiative.",
  },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const aboutExtended =
  "At Afronovation, we believe technology and innovation are the catalysts for sustainable growth and transformation. Our mission is to empower organizations—across the private sector, public institutions, and communities—to harness digital solutions that solve today's challenges and unlock tomorrow's opportunities. We bring together expertise in program & change management, technology & platform development, and digital transformation to deliver measurable results. By blending strategy with execution, we ensure that every initiative not only launches successfully but also creates lasting value for people, businesses, and governments. More than a consulting firm, Afronovation is a strategic partner for innovation. With a focus on impact, adaptability, and excellence, we help organizations reimagine the future, accelerate growth, and lead confidently in the digital age.";

// TODO(stakeholder): Visionary Team supporting copy from audit Section 2.2
export const visionaryTeamCopy =
  "Our visionary team combines strategy, technology, and change expertise to deliver innovative solutions that drive growth, empower organizations, and create lasting impact.";

export const ctaSection = {
  headline: "Start with an executive briefing.",
  subcopy:
    "A working session with your leadership on priorities and fit. No obligation, and you leave with a clear view of where to begin.",
  buttonLabel: "Book a Briefing",
  closingLine: "Let's inspire possibilities together.",
} as const;

export const sectionHeadings = {
  capabilities: "Capabilities.",
  howWeHelp: "This Is How We Can Help You.",
  selectedEngagements: "Selected engagements",
  trustBar: "Trusted by forward-thinking partners",
  whyClientsLoveUs: "Why Our Clients Love Us.",
  forwardThinkingPartners: "Forward Thinking partners & Clients",
  innovativeWork: "Innovative Work",
  drivingChange: "Driving Change. Delivering Impact.",
  curiousAboutCulture: "Curious About Our Culture?",
  visionaryTeam: "Visionary Team.",
  ourServices: "our services.",
} as const;

export const pageHeroes = {
  about: {
    eyebrow: "Who We Are?",
    title:
      "We provide digital solutions that transform strategy into measurable impact.",
  },
  services: {
    eyebrow: "What We Do?",
    title: "We provide digital solutions that transform strategy into impact.",
  },
  platforms: {
    eyebrow: "Mission-Specific Platforms",
    title: "Real platforms, built on one proven architecture.",
  },
  enterpriseServices: {
    eyebrow: "Enterprise Digital Services",
    title: "Reusable enterprise capabilities, composed into any platform.",
  },
  testimonials: {
    eyebrow: "What They Say?",
    title: "We Build Valuable & Meaningful Experiences.",
  },
  contact: {
    eyebrow: "Where We Are?",
    title: "Don't Be Shy, Say Hello.",
  },
} as const;

export const contactPageCopy = {
  intro:
    "Want to get in touch? We'd love to hear from you. Here's how you can reach us.",
  contactUs: "Contact Us.",
  socialComingSoon:
    "Company social profiles are coming soon. Follow us for updates.",
  preferDirect: "Prefer email or phone?",
} as const;

export const servicesPageCopy = {
  summary:
    "We provide digital solutions that transform strategy into measurable impact.",
} as const;

export const ctaLabels = {
  primary: "Book a Briefing",
  primaryHref: "/contact?intent=briefing",
  partner: "Partner with us",
  partnerHref: "/contact?intent=partnership",
  heroPrimary: "Book a Briefing",
  heroSecondary: "Explore our services",
  exploreServices: "Explore our services",
  learnMore: "Learn more",
  viewAllPlatforms: "View all platforms",
  viewPlatforms: "View platforms",
  viewFullCatalog: "View full catalog",
  requestDemo: "Request a demo",
  visitLiveSite: "Visit embassyos.com",
  featuredCard: "Ready to transform?",
  featuredCardDescription:
    "Partner with us to deliver measurable transformation.",
  meetTeam: "Meet the team",
  allTestimonials: "Read all testimonials",
} as const;

export const navLabels = {
  services: "Services",
  platforms: "Platforms",
  enterpriseServices: "Enterprise Digital Services",
  company: "Company",
  contact: "Contact",
  featured: "Featured",
  flagshipPlatform: "Flagship Platform",
  viewAllPlatforms: "View all platforms",
  allPlatforms: "All platforms",
  mobileMenu: "Menu",
} as const;

export const platformsPageCopy = {
  eyebrow: "Innovative Work",
  title: "Platforms Built On One Proven Architecture.",
} as const;

export const enterpriseServicesPageCopy = {
  eyebrow: "The Foundation",
  title: "17 reusable services. Any mission-specific platform.",
  summary:
    "Every Afronovation platform is composed from the same catalog of Enterprise Digital Services - so proven capabilities, not one-off code, power each new mission.",
} as const;
