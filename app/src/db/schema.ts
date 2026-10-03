import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  // Optional: download requests do not ask for a phone number.
  phone: text("phone"),
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

/* ------------------------------------------------------------------------ */
/* Admin authentication (Better Auth core tables + Afronovation roles).      */
/* ------------------------------------------------------------------------ */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  // "platform_admin" (everything, approves changes, manages users) or
  // "editor" (edits need approval).
  role: text("role").notNull().default("editor"),
  // Deactivated users cannot sign in; history is kept for the change log.
  active: boolean("active").notNull().default(true),
  // Presence for the admin "who is online" view.
  lastSignInAt: timestamp("last_sign_in_at", { withTimezone: true }),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ------------------------------------------------------------------------ */
/* Admin-managed site content.                                               */
/* ------------------------------------------------------------------------ */

// Published content. One row per item of a collection (hero slide, team
// member, ...); singletons such as contact details have a single row.
// `data` is validated against the collection's schema before every write.
export const contentEntries = pgTable(
  "content_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    collection: text("collection").notNull(),
    data: jsonb("data").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedBy: text("updated_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("content_entries_collection_idx").on(table.collection, table.sortOrder)],
);

// Changes submitted by editors, waiting for a Platform Admin decision.
export const contentChanges = pgTable("content_changes", {
  id: uuid("id").defaultRandom().primaryKey(),
  collection: text("collection").notNull(),
  // null for a new item.
  entryId: uuid("entry_id"),
  action: text("action").notNull(), // "create" | "update" | "delete"
  data: jsonb("data"),
  status: text("status").notNull().default("pending"), // pending | approved | rejected
  submittedBy: text("submitted_by").notNull(),
  submittedByName: text("submitted_by_name").notNull(),
  reviewedBy: text("reviewed_by"),
  reviewNote: text("review_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
});

// Change log: who changed what, and when.
export const auditLog = pgTable("audit_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"),
  userName: text("user_name").notNull(),
  action: text("action").notNull(),
  target: text("target").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
