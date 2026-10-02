import type { Announcement } from "./types";

/** Hard limit on how many flash-banner messages rotate at once. */
export const MAX_ACTIVE_ANNOUNCEMENTS = 3;

export const announcements: Announcement[] = [
  {
    id: "capabilities-portfolio-2026",
    label: "New",
    message: "Our 2026 Capabilities Portfolio is out: 9 platforms, 17 enterprise services, one proven architecture.",
    linkLabel: "Explore platforms",
    href: "/platforms",
    active: true,
    startsAt: null,
    endsAt: null,
    sortOrder: 1,
  },
  {
    id: "zimbabwe-pilot",
    label: "Featured",
    message: "Zimbabwe's national investment platform is running end to end as a working pilot.",
    linkLabel: "See the engagement",
    href: "/#featured-engagement",
    active: true,
    startsAt: null,
    endsAt: null,
    sortOrder: 2,
  },
  {
    id: "consultant-network",
    label: "Careers",
    message: "We are growing our network of program, change and platform consultants.",
    linkLabel: "Join the network",
    href: "/contact?intent=consultant",
    active: true,
    startsAt: null,
    endsAt: null,
    sortOrder: 3,
  },
];

/** Active, in-date messages in display order, capped at three. */
export function getActiveAnnouncements(now: Date = new Date()): Announcement[] {
  return announcements
    .filter((item) => {
      if (!item.active) return false;
      if (item.startsAt && new Date(item.startsAt) > now) return false;
      if (item.endsAt && new Date(item.endsAt) < now) return false;
      return true;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, MAX_ACTIVE_ANNOUNCEMENTS);
}
