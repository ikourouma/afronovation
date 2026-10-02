import type { SocialAccount } from "./types";

/*
 * Company social accounts. All are switched off while the accounts are being
 * created: an account appears across the site (footer, Insights, Contact,
 * structured data) only once it has a real URL and `active` is true. This is
 * managed from the admin dashboard.
 */
export const socialAccounts: SocialAccount[] = [
  { platform: "linkedin", label: "LinkedIn", url: null, active: false, sortOrder: 1 },
  { platform: "x", label: "X", url: null, active: false, sortOrder: 2 },
  { platform: "youtube", label: "YouTube", url: null, active: false, sortOrder: 3 },
  { platform: "facebook", label: "Facebook", url: null, active: false, sortOrder: 4 },
  { platform: "instagram", label: "Instagram", url: null, active: false, sortOrder: 5 },
  { platform: "whatsapp", label: "WhatsApp Channel", url: null, active: false, sortOrder: 6 },
];

export type LiveSocialAccount = SocialAccount & { url: string };

export function getActiveSocialAccounts(): LiveSocialAccount[] {
  return socialAccounts
    .filter((account): account is LiveSocialAccount => account.active && Boolean(account.url))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
