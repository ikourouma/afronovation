import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  // Nullable: demo-request submissions (see platformSlug below) don't collect these.
  interests: text("interests").array(),
  preferredContactMethod: text("preferred_contact_method"),
  message: text("message"),
  consent: boolean("consent").notNull(),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("contact-form"),
  // Platform demo-request fields (nullable - the generic contact form omits these)
  platformSlug: text("platform_slug"),
  organizationType: text("organization_type"),
  inquiryType: text("inquiry_type"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  credentials: text("credentials").array().notNull().default([]),
  headshotKey: text("headshot_key").notNull(),
  headshotAlt: text("headshot_alt").notNull(),
  linkedinUrl: text("linkedin_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  confirmed: boolean("confirmed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Mirrors src/content/platforms.ts for future admin-managed content (Phase 5).
export const platforms = pgTable("platforms", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  sector: text("sector").notNull(),
  status: text("status").notNull().default("operational"),
  featured: boolean("featured").notNull().default(false),
  externalUrl: text("external_url"),
  imageKey: text("image_key").notNull(),
  imageAlt: text("image_alt").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Newsletter subscribers (double opt-in: "pending" until the emailed link is
// clicked, then "confirmed"). Managed and exported from the admin.
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  interests: text("interests").array().notNull().default([]),
  status: text("status").notNull().default("pending"),
  confirmToken: text("confirm_token").notNull().unique(),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
});
