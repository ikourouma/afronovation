import { z } from "zod";

export const interestValues = [
  "program-change-management",
  "saas-platform-development",
  "digital-transformation",
  "government-digitalization",
] as const;

export const contactMethodValues = ["email", "phone", "text-message"] as const;

export const organizationTypeValues = [
  "government",
  "enterprise",
  "startup",
  "nonprofit",
  "other",
] as const;

export const inquiryTypeValues = [
  "demo-request",
  "partnership",
  "pricing",
  "technical-specs",
] as const;

const utmFields = {
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
};

// Unchanged shape used by the generic 2-step contact form.
export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(32),
  company: z.string().trim().max(200).optional(),
  interests: z.array(z.enum(interestValues)).min(1),
  preferredContactMethod: z.enum(contactMethodValues),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
  ...utmFields,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Lighter, single-step shape used by the per-platform DemoRequestForm.
export const demoRequestSchema = z.object({
  formType: z.literal("demo-request"),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(32),
  company: z.string().trim().max(200).optional(),
  organizationType: z.enum(organizationTypeValues),
  inquiryType: z.enum(inquiryTypeValues),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
  platformSlug: z.string().trim().min(1).max(120),
  ...utmFields,
});

export type DemoRequestValues = z.infer<typeof demoRequestSchema>;

export const organizationTypeLabels: Record<
  (typeof organizationTypeValues)[number],
  string
> = {
  government: "Government / Public Sector",
  enterprise: "Enterprise",
  startup: "Startup / Scale-up",
  nonprofit: "Nonprofit / NGO",
  other: "Other",
};

export const inquiryTypeLabels: Record<
  (typeof inquiryTypeValues)[number],
  string
> = {
  "demo-request": "Demo Request",
  partnership: "Partnership",
  pricing: "Pricing",
  "technical-specs": "Technical Specs",
};
