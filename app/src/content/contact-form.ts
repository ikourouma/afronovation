import type { ContactIntent } from "@/lib/contact-schema";

export const contactInterestOptions = [
  {
    value: "program-change-management" as const,
    label: "Program & Change Management",
  },
  {
    // Stored value kept for continuity with earlier submissions.
    value: "saas-platform-development" as const,
    label: "Technology & Platform Development",
  },
  {
    value: "digital-transformation" as const,
    label: "Digital Transformation",
  },
  {
    value: "cybersecurity-digital-trust" as const,
    label: "Cybersecurity & Digital Trust",
  },
  {
    value: "government-digitalization" as const,
    label: "Digital Government",
  },
] as const;

type ContactIntentCopy = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  submit: string;
};

/** Page heading and button wording for each call to action. */
export const contactIntents: Record<ContactIntent, ContactIntentCopy> = {
  briefing: {
    label: "Executive briefing",
    eyebrow: "Book a Briefing",
    title: "Book an executive briefing.",
    description: "A 30-minute working session with your leadership on priorities and fit. No obligation.",
    submit: "Request my briefing",
  },
  investor: {
    label: "Investor brief",
    eyebrow: "Investors & development partners",
    title: "Get the investor brief.",
    description: "Pipelines, governed data and funder-ready programmes. Tell us about your mandate and we will follow up.",
    submit: "Request the brief",
  },
  partnership: {
    label: "Partnership",
    eyebrow: "Partner with us",
    title: "Deliver with Afronovation.",
    description: "We lead as the single accountable partner and bring in specialists with national-scale delivery experience.",
    submit: "Start the conversation",
  },
  consultant: {
    label: "Consultant network",
    eyebrow: "Join the network",
    title: "Join our consultant network.",
    description: "Program, change, cybersecurity and platform specialists across the U.S. and Africa. Tell us about your expertise.",
    submit: "Send my details",
  },
  general: {
    label: "General enquiry",
    eyebrow: "Contact",
    title: "Let's talk.",
    description: "Tell us what you are working on. We reply within one business day.",
    submit: "Send message",
  },
};

export function parseContactIntent(value: string | string[] | undefined): ContactIntent {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && candidate in contactIntents ? (candidate as ContactIntent) : "general";
}

export const contactMethodOptions = [
  { value: "email" as const, label: "Email" },
  { value: "phone" as const, label: "Phone" },
  { value: "text-message" as const, label: "Text Message" },
] as const;

export const contactFormFields = {
  fullName: {
    label: "Full Name",
    helpText:
      "Please enter your full name as it appears on official documents.",
  },
  email: {
    label: "Email Address",
    helpText: "Enter a valid email address where we can reach you.",
  },
  phone: {
    label: "Phone Number",
    helpText: "Provide a contact number so we can reach you.",
  },
  company: {
    label: "Company Name",
    helpText: "Enter the name of your company or organization.",
  },
  interests: {
    label: "Interests",
    helpText: "Select your areas of interest.",
  },
  preferredContactMethod: {
    label: "Preferred Contact Method",
    helpText: "How would you like us to contact you?",
  },
  message: {
    label: "Message",
    helpText: "Let us know how we can assist you.",
  },
  consent: {
    label: "Consent for Contact",
    helpText:
      "Please confirm that you consent to receive communications from us.",
  },
} as const;

export const contactFormSteps = {
  step1: { title: "About you", description: "Tell us who you are" },
  step2: { title: "Your needs", description: "Share what you're looking for" },
} as const;

export const contactFormMessages = {
  successTitle: "Thank you for reaching out!",
  successDescription:
    "We've received your message and will be in touch soon using your preferred contact method.",
  errorDescription:
    "Something went wrong while sending your message. Please try again or contact us directly.",
  submitting: "Sending…",
  next: "Continue",
  back: "Back",
  submit: "Send message",
} as const;
