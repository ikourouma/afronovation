import { z } from "zod";

export const newsletterInterestOptions = [
  { value: "digital-government", label: "Digital government" },
  { value: "platforms", label: "Platforms & products" },
  { value: "investment", label: "Investment & partnerships" },
  { value: "careers", label: "Careers & consultant network" },
] as const;

export const newsletterInterestValues = [
  "digital-government",
  "platforms",
  "investment",
  "careers",
] as const;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  fullName: z.string().trim().max(120).optional(),
  interests: z.array(z.enum(newsletterInterestValues)).default([]),
  consent: z.literal(true, { message: "Please confirm you agree to receive updates." }),
  // Honeypot: real people never fill this in.
  website: z.string().max(0).optional(),
});

export type NewsletterValues = z.input<typeof newsletterSchema>;
