import { announcements } from "@/content/announcements";
import { articleCategoryLabels, articles } from "@/content/articles";
import { audienceSegments } from "@/content/audiences";
import { downloadResources } from "@/content/downloads";
import { enterpriseServiceCategories, enterpriseServices } from "@/content/enterprise-services";
import { headlineStats, heroSlides } from "@/content/hero-slides";
import { menuFeatures } from "@/content/menu-features";
import { megaMenu } from "@/content/navigation";
import { partnerLogos } from "@/content/partners";
import { platforms } from "@/content/platforms";
import { featuredEngagement, portfolioItems, startSteps } from "@/content/portfolio";
import { practiceAreas } from "@/content/practice-areas";
import { contact } from "@/content/site";
import { socialAccounts } from "@/content/social";
import { teamMembers } from "@/content/team";
import { testimonials } from "@/content/testimonials";
import type {
  Announcement,
  Article,
  AudienceSegment,
  ContactDetails,
  DownloadResource,
  EnterpriseService,
  FeaturedEngagement,
  HeroSlide,
  MenuFeature,
  PartnerLogo,
  Platform,
  PortfolioHeadlineStat,
  PortfolioItem,
  PracticeArea,
  SocialAccount,
  StartStep,
  TeamMember,
  Testimonial,
} from "@/content/types";

import type { Field } from "./fields";

/*
 * Every admin-managed section of the site. `defaults` is the content shipped
 * with the code: it is what the site shows until the section is first saved
 * in the admin, and what the seed script imports.
 */

export type CollectionGroup = "Homepage" | "Platforms & services" | "Company" | "Insights" | "Navigation & settings";

type CollectionDefinition<T> = {
  key: string;
  label: string;
  description: string;
  group: CollectionGroup;
  /** A singleton has exactly one entry (e.g. contact details). */
  singleton?: boolean;
  /** Most items that may be switched on at once (flash banner: 3). */
  maxActive?: number;
  fields: Field[];
  defaults: () => T[];
  itemLabel: (item: T) => string;
  /** Short status text shown in the admin list (e.g. "Hidden"). */
  itemStatus?: (item: T) => string | null;
};

// Builder keeps each definition's item type while storing them in one list.
function define<T>(definition: CollectionDefinition<T>) {
  return definition as unknown as CollectionDefinition<Record<string, unknown>>;
}

const yesNo = (value: unknown, off: string) => (value ? null : off);

const ctaHelp = "Button text and link (https://..., /page or #section).";

export const collections = [
  define<Announcement>({
    key: "announcements",
    label: "Flash banner",
    description: "Short notices in the banner at the top of every page. Up to 3 rotate at once.",
    group: "Homepage",
    maxActive: 3,
    fields: [
      { name: "label", label: "Tag", type: "text", required: true, maxLength: 20, help: "e.g. New, Featured, Careers" },
      { name: "message", label: "Message", type: "textarea", required: true, maxLength: 160 },
      { name: "linkLabel", label: "Link text", type: "text", nullable: true, maxLength: 40 },
      { name: "href", label: "Link", type: "url", nullable: true },
      { name: "startsAt", label: "Show from (optional)", type: "date", nullable: true },
      { name: "endsAt", label: "Show until (optional)", type: "date", nullable: true },
      { name: "active", label: "Show on the site", type: "boolean" },
    ],
    defaults: () => announcements,
    itemLabel: (item) => item.message,
    itemStatus: (item) => yesNo(item.active, "Hidden"),
  }),
  define<HeroSlide>({
    key: "heroSlides",
    label: "Hero slides",
    description: "The rotating slides at the top of the homepage. Keep buttons to 2-3 words.",
    group: "Homepage",
    fields: [
      { name: "tabLabel", label: "Tab label", type: "text", required: true, maxLength: 40 },
      { name: "eyebrow", label: "Small heading", type: "text", required: true, maxLength: 60 },
      { name: "title", label: "Headline", type: "textarea", required: true, maxLength: 160 },
      { name: "body", label: "Subtitle (one line)", type: "textarea", required: true, maxLength: 140 },
      { name: "primaryCta", label: "Main button", type: "cta", help: ctaHelp },
      { name: "secondaryCta", label: "Second button (optional)", type: "cta", nullable: true, help: ctaHelp },
      { name: "ctaNote", label: "Note under the buttons (optional)", type: "text", nullable: true, maxLength: 60 },
      { name: "imageKey", label: "Background photo (optional)", type: "image", nullable: true },
      { name: "imageAlt", label: "Photo description", type: "text", nullable: true },
      { name: "active", label: "Show on the site", type: "boolean" },
    ],
    defaults: () => heroSlides,
    itemLabel: (item) => item.title,
    itemStatus: (item) => yesNo(item.active, "Hidden"),
  }),
  define<PortfolioHeadlineStat>({
    key: "headlineStats",
    label: "Headline numbers",
    description: "The four numbers under the hero (9 platforms, 17 services...).",
    group: "Homepage",
    fields: [
      { name: "value", label: "Number", type: "text", required: true, maxLength: 12 },
      { name: "label", label: "Label", type: "text", required: true, maxLength: 60 },
    ],
    defaults: () => headlineStats,
    itemLabel: (item) => `${item.value} ${item.label}`,
  }),
  define<PartnerLogo>({
    key: "clientLogos",
    label: "Client logos",
    description: "Logos in the 'Trusted by' strip. Only add logos you have permission to show.",
    group: "Homepage",
    fields: [
      { name: "name", label: "Organisation", type: "text", required: true },
      { name: "imageKey", label: "Logo", type: "image", required: true },
      { name: "alt", label: "Logo description", type: "text", required: true },
    ],
    defaults: () => partnerLogos,
    itemLabel: (item) => item.name,
  }),
  define<StartStep>({
    key: "startSteps",
    label: "How to start",
    description: "The numbered steps of 'How to start with Afronovation'.",
    group: "Homepage",
    fields: [
      { name: "title", label: "Step", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true, maxLength: 200 },
    ],
    defaults: () => startSteps,
    itemLabel: (item) => item.title,
  }),
  define<AudienceSegment>({
    key: "audiences",
    label: "Choose your path",
    description: "One clear next step for each audience.",
    group: "Homepage",
    fields: [
      { name: "slug", label: "Identifier", type: "text", required: true, help: "Lowercase, no spaces." },
      { name: "label", label: "Audience", type: "text", required: true },
      { name: "pitch", label: "Description", type: "textarea", required: true, maxLength: 260 },
      { name: "ctaLabel", label: "Link text", type: "text", required: true, maxLength: 40 },
      { name: "ctaHref", label: "Link", type: "url", required: true },
    ],
    defaults: () => audienceSegments,
    itemLabel: (item) => item.label,
  }),
  define<FeaturedEngagement>({
    key: "featuredEngagement",
    label: "Featured engagement",
    description: "The success-story band (currently Zimbabwe) on the homepage and Platforms page.",
    group: "Homepage",
    singleton: true,
    fields: [
      { name: "eyebrow", label: "Small heading", type: "text", required: true },
      { name: "title", label: "Headline", type: "textarea", required: true, maxLength: 160 },
      { name: "body", label: "Story", type: "textarea", required: true },
      { name: "stats", label: "Numbers", type: "rows", columns: [{ key: "value", label: "Number" }, { key: "label", label: "Label" }] },
      { name: "statsNote", label: "Note under the numbers", type: "text" },
      { name: "journey", label: "Journey steps", type: "rows", columns: [{ key: "title", label: "Step" }, { key: "detail", label: "Detail" }] },
      { name: "href", label: "Button link", type: "url", required: true },
    ],
    defaults: () => [featuredEngagement],
    itemLabel: (item) => item.title,
  }),
  define<Testimonial>({
    key: "testimonials",
    label: "Testimonials",
    description: "Client quotes. Only those switched to 'Published' appear on the site.",
    group: "Homepage",
    fields: [
      { name: "quote", label: "Quote", type: "textarea", required: true, maxLength: 600 },
      { name: "author", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "company", label: "Organisation", type: "text", required: true },
      { name: "confirmed", label: "Approved by the client", type: "boolean" },
      { name: "published", label: "Published", type: "boolean" },
    ],
    defaults: () => testimonials,
    itemLabel: (item) => `${item.author}, ${item.company}`,
    itemStatus: (item) => yesNo(item.published, "Hidden"),
  }),
  define<PortfolioItem>({
    key: "portfolio",
    label: "Platform cards",
    description: "The portfolio-style platform cards on the homepage and Platforms page.",
    group: "Platforms & services",
    fields: [
      { name: "slug", label: "Identifier", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "flagship", label: "Flagship" },
          { value: "operational", label: "Operational" },
          { value: "pilot", label: "Pilot" },
        ],
      },
      { name: "sector", label: "Sector", type: "text", required: true },
      { name: "summary", label: "Description", type: "textarea", required: true, maxLength: 260 },
      { name: "href", label: "Card link", type: "url", required: true },
      { name: "externalUrl", label: "Live website (optional)", type: "url", nullable: true },
      {
        name: "icon",
        label: "Icon",
        type: "select",
        options: ["landmark", "trending-up", "users", "plane", "line-chart", "globe", "vote", "link", "shield"].map(
          (value) => ({ value, label: value }),
        ),
      },
    ],
    defaults: () => portfolioItems,
    itemLabel: (item) => item.name,
  }),
  define<Platform>({
    key: "platformPages",
    label: "Platform pages",
    description: "The detailed page for each platform (challenge, approach, impact...).",
    group: "Platforms & services",
    fields: [
      { name: "slug", label: "Web address", type: "text", required: true, help: "Used in /platforms/<address>." },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea", required: true },
      { name: "sector", label: "Sector", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "flagship", label: "Flagship" },
          { value: "operational", label: "Operational" },
          { value: "pilot", label: "Pilot" },
          { value: "upcoming", label: "Upcoming" },
        ],
      },
      { name: "featured", label: "Featured", type: "boolean" },
      { name: "externalUrl", label: "Live website (optional)", type: "url", nullable: true },
      { name: "atAGlance.sector", label: "At a glance: sector", type: "text" },
      { name: "atAGlance.region", label: "At a glance: region", type: "text" },
      { name: "atAGlance.status", label: "At a glance: status", type: "text" },
      { name: "challenge", label: "The challenge", type: "textarea", required: true },
      { name: "opportunity", label: "The opportunity", type: "textarea", required: true },
      { name: "approach", label: "Our approach", type: "textarea", required: true },
      { name: "highlights", label: "Highlights", type: "list" },
      { name: "poweredBy", label: "Enterprise services used", type: "list", help: "Service identifiers, e.g. bridgevault." },
      { name: "expectedImpact", label: "Expected impact", type: "rows", columns: [{ key: "label", label: "Outcome" }, { key: "targetOutcome", label: "Target (not yet verified)", type: "boolean" }] },
      { name: "whoItServes.primary", label: "Who it serves: primary", type: "list" },
      { name: "whoItServes.secondary", label: "Who it serves: secondary", type: "list" },
      { name: "whoItServes.decisionMakers", label: "Who it serves: decision-makers", type: "list" },
      { name: "scalability", label: "Scalability", type: "textarea" },
    ],
    defaults: () => platforms,
    itemLabel: (item) => item.name,
  }),
  define<EnterpriseService>({
    key: "enterpriseServices",
    label: "Enterprise services",
    description: "The catalogue of reusable enterprise digital services.",
    group: "Platforms & services",
    fields: [
      { name: "slug", label: "Identifier", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: enterpriseServiceCategories.map((category) => ({ value: category.slug, label: category.name })),
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "usedBy", label: "Used by", type: "list" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "available", label: "Available" },
          { value: "pilot", label: "Pilot" },
          { value: "roadmap", label: "Roadmap" },
        ],
      },
      { name: "deliveredWithPartners", label: "Delivered with partners", type: "boolean" },
    ],
    defaults: () => enterpriseServices,
    itemLabel: (item) => item.name,
  }),
  define<PracticeArea>({
    key: "practices",
    label: "Practices",
    description: "The four practices shown on the homepage and Solutions page.",
    group: "Company",
    fields: [
      { name: "slug", label: "Identifier", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "summary", label: "Short description", type: "textarea", required: true, maxLength: 200 },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "fullDescription", label: "Full description (Solutions page)", type: "textarea", required: true },
      { name: "keyServices", label: "What we deliver", type: "list" },
    ],
    defaults: () => practiceAreas,
    itemLabel: (item) => item.name,
  }),
  define<TeamMember>({
    key: "team",
    label: "Leadership team",
    description: "Partners shown on the homepage and About page.",
    group: "Company",
    fields: [
      { name: "slug", label: "Identifier", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "bio", label: "Biography", type: "textarea", required: true },
      { name: "credentials", label: "Certifications", type: "list" },
      { name: "headshotKey", label: "Headshot", type: "image", required: true },
      { name: "headshotAlt", label: "Headshot description", type: "text", required: true },
      { name: "linkedinUrl", label: "LinkedIn profile (optional)", type: "url", nullable: true },
    ],
    defaults: () => teamMembers,
    itemLabel: (item) => item.name,
  }),
  define<Article>({
    key: "articles",
    label: "Insights articles",
    description: "Perspectives, news and reports. Unpublished articles stay private.",
    group: "Insights",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 160 },
      { name: "slug", label: "Web address", type: "text", required: true, help: "Used in /insights/<address>. Lowercase words separated by hyphens." },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: Object.entries(articleCategoryLabels).map(([value, label]) => ({ value, label })),
      },
      { name: "excerpt", label: "Summary", type: "textarea", required: true, maxLength: 300 },
      { name: "body", label: "Article", type: "markdown", required: true, help: "Markdown: ## Heading, **bold**, - list, [link](https://...)." },
      { name: "coverImageKey", label: "Cover image (optional)", type: "image", nullable: true },
      { name: "coverImageAlt", label: "Cover image description", type: "text", nullable: true },
      { name: "author", label: "Author", type: "text", required: true },
      { name: "publishedAt", label: "Publication date", type: "date", required: true },
      {
        name: "downloadSlug",
        label: "Gated download (optional)",
        type: "text",
        nullable: true,
        help: "Identifier of a resource from 'Downloads', e.g. first-visible-service-roadmap. Offered at the end of the article in exchange for contact details.",
      },
      { name: "published", label: "Published", type: "boolean" },
    ],
    defaults: () => articles,
    itemLabel: (item) => item.title,
    itemStatus: (item) => yesNo(item.published, "Draft"),
  }),
  define<DownloadResource>({
    key: "downloads",
    label: "Downloads",
    description: "Email-gated resources (roadmaps, portfolio). Every download request becomes a lead.",
    group: "Insights",
    fields: [
      { name: "slug", label: "Identifier", type: "text", required: true, help: "Lowercase words separated by hyphens. Articles refer to this." },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "summary", label: "Description", type: "textarea", required: true, maxLength: 300 },
      { name: "format", label: "Format", type: "text", required: true, help: "e.g. PDF · 2 pages" },
      { name: "fileKey", label: "File (PDF)", type: "image", required: true, help: "Upload the PDF." },
      { name: "active", label: "Available on the site", type: "boolean" },
    ],
    defaults: () => downloadResources,
    itemLabel: (item) => item.title,
    itemStatus: (item) => yesNo(item.active, "Hidden"),
  }),
  define<MenuFeature>({
    key: "menuFeatures",
    label: "Menu promo cards",
    description: "The highlighted card on the right of each top-menu panel.",
    group: "Navigation & settings",
    fields: [
      {
        name: "menuId",
        label: "Menu",
        type: "select",
        options: megaMenu.map((section) => ({ value: section.id, label: section.label })),
      },
      { name: "eyebrow", label: "Small heading", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "body", label: "Text (optional)", type: "textarea", nullable: true, maxLength: 160 },
      { name: "stats", label: "Numbers (optional)", type: "rows", columns: [{ key: "value", label: "Number" }, { key: "label", label: "Label" }] },
      { name: "cta", label: "Button", type: "cta", help: ctaHelp },
    ],
    defaults: () => menuFeatures,
    itemLabel: (item) => `${item.menuId}: ${item.title}`,
  }),
  define<SocialAccount>({
    key: "socialAccounts",
    label: "Social media",
    description: "Company accounts. An icon appears only when the link is set and it is switched on.",
    group: "Navigation & settings",
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "x", label: "X" },
          { value: "youtube", label: "YouTube" },
          { value: "facebook", label: "Facebook" },
          { value: "instagram", label: "Instagram" },
          { value: "whatsapp", label: "WhatsApp Channel" },
        ],
      },
      { name: "label", label: "Name", type: "text", required: true },
      { name: "url", label: "Account link", type: "url", nullable: true },
      { name: "active", label: "Show on the site", type: "boolean" },
    ],
    defaults: () => socialAccounts,
    itemLabel: (item) => item.label,
    itemStatus: (item) => (item.active && item.url ? null : "Hidden"),
  }),
  define<ContactDetails>({
    key: "contactDetails",
    label: "Contact details",
    description: "Address, email and phone used across the site.",
    group: "Navigation & settings",
    singleton: true,
    fields: [
      { name: "address", label: "Address", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone", type: "text", required: true },
    ],
    defaults: () => [contact],
    itemLabel: (item) => item.email,
  }),
];

export type CollectionKey =
  | "announcements"
  | "heroSlides"
  | "headlineStats"
  | "clientLogos"
  | "startSteps"
  | "audiences"
  | "featuredEngagement"
  | "testimonials"
  | "portfolio"
  | "platformPages"
  | "enterpriseServices"
  | "practices"
  | "team"
  | "articles"
  | "downloads"
  | "menuFeatures"
  | "socialAccounts"
  | "contactDetails";

export type CollectionItemMap = {
  announcements: Announcement;
  heroSlides: HeroSlide;
  headlineStats: PortfolioHeadlineStat;
  clientLogos: PartnerLogo;
  startSteps: StartStep;
  audiences: AudienceSegment;
  featuredEngagement: FeaturedEngagement;
  testimonials: Testimonial;
  portfolio: PortfolioItem;
  platformPages: Platform;
  enterpriseServices: EnterpriseService;
  practices: PracticeArea;
  team: TeamMember;
  articles: Article;
  downloads: DownloadResource;
  menuFeatures: MenuFeature;
  socialAccounts: SocialAccount;
  contactDetails: ContactDetails;
};

export type AnyCollection = (typeof collections)[number];

export function getCollectionDefinition(key: string): AnyCollection | undefined {
  return collections.find((collection) => collection.key === key);
}
