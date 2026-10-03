import type { DownloadResource } from "./types";

/*
 * Email-gated downloads. Each request is saved as a lead (with an optional
 * newsletter opt-in) before the file is released. Pages offer one download
 * each; Insights > Reports & downloads lists them all.
 */
export const downloadResources: DownloadResource[] = [
  {
    slug: "first-visible-service-roadmap",
    title: "First Visible Service: a 90-day roadmap",
    summary:
      "How to select, fund and launch your government's first high-impact digital service, with a selection scorecard, a 90-day plan and the measures that win the next budget.",
    format: "PDF · 2 pages",
    fileKey: "downloads/first-visible-service-roadmap.pdf",
    active: true,
  },
  {
    slug: "capabilities-portfolio-2026",
    title: "Afronovation Capabilities Portfolio 2026",
    summary:
      "Our practices, the nine mission-specific platforms, digital government and trust services, the delivery model and the leadership team, in six pages.",
    format: "PDF · 6 pages",
    fileKey: "downloads/afronovation-capabilities-portfolio-2026.pdf",
    active: true,
  },
];
