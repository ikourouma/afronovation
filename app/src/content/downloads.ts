import type { DownloadResource } from "./types";

/*
 * Email-gated downloads. Each request is saved as a lead (with an optional
 * newsletter opt-in) before the file is released.
 *
 * The Capabilities Portfolio is added from the admin once a public edition
 * of the PDF is approved.
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
];
