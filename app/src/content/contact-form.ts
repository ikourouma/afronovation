export const contactInterestOptions = [
  {
    value: "program-change-management" as const,
    label: "Program & Change Management",
  },
  {
    value: "saas-platform-development" as const,
    label: "SaaS & Platform Development",
  },
  {
    value: "digital-transformation" as const,
    label: "Digital Transformation",
  },
  {
    // TODO(stakeholder-Q4): corrected spelling from audit typo "Government Digitaization"
    value: "government-digitalization" as const,
    label: "Government Digitalization",
  },
] as const;

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
