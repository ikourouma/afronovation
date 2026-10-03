import { z } from "zod";

export const downloadRequestSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  fullName: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  organization: z.string().trim().max(200).optional(),
  newsletter: z.boolean().default(false),
  consent: z.literal(true, { message: "Please agree so we can send you the file." }),
  // Honeypot: real people never fill this in.
  website: z.string().max(0).optional(),
});

export type DownloadRequestValues = z.input<typeof downloadRequestSchema>;
