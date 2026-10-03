import type { Article, ArticleCategory } from "./types";

export const articles: Article[] = [
  {
    slug: "think-big-start-small-one-visible-service",
    title: "Think Big, Start Small: Why Digital Government Begins with One Visible Service",
    category: "perspectives",
    excerpt:
      "Transforming every ministry at once stalls. Delivering one high-visibility service end to end builds the trust, platform and budget case for everything that follows.",
    body: [
      "> **In brief:** pick one high-demand service. Deliver it end to end on shared foundations. Measure, then scale.",
      "",
      "Public-sector leaders are under pressure to digitise everything at once. In practice, that spreads budgets thin, multiplies vendors and stalls in committee. The governments making visible progress do the opposite: they think big, but start with one service and deliver it end to end.",
      "",
      "## Five reasons it works",
      "",
      "1. **It earns public trust.** Citizens judge digital government by their first experience. One reliable service, such as business registration, a farm subsidy or a digital ID, proves the state can deliver and protect their data.",
      "2. **It breaks silos around a real journey.** One service gives a cross-agency team a shared goal. The identity, payment and data-exchange foundations it needs are reused by every service that follows.",
      "3. **It redesigns the process, not just the form.** Mapping one journey end to end removes duplicate steps and automates approvals, setting a standard other ministries can adopt.",
      "4. **It limits risk.** A focused pilot tests technology and processes under real conditions, at manageable cost, before any national rollout.",
      "5. **It funds what comes next.** Faster processing and lower cost per transaction show up within months: the evidence leadership and funders need to approve the next phase.",
      "",
      "## What this looks like in practice",
      "",
      "In Zimbabwe, a governed national investment platform went from concept note to working pilot within months, with projects published and investor engagements carried through to signed memoranda of understanding. Our 365-day [National Digital Acceleration Program](/solutions#ndap) follows the same rule: the first visible service goes live in the first 90 days.",
      "",
      "## Where to start",
      "",
      "1. Choose a service with high demand and a clear owner.",
      "2. Map today's process with the people who run it.",
      "3. Configure on shared foundations; don't rebuild.",
      "4. Pilot with one agency, measure, then scale.",
      "",
      "**Ready to choose your first service?** [Book a Briefing](/contact?intent=briefing): a 30-minute working session with your leadership team.",
    ].join("\n"),
    coverImageKey: null,
    coverImageAlt: null,
    author: "Team Afronovation",
    publishedAt: "2026-10-03",
    downloadSlug: "first-visible-service-roadmap",
    published: true,
  },
];

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  perspectives: "Perspectives",
  news: "News & press releases",
  reports: "Reports & downloads",
};

export function filterPublishedArticles(items: Article[]): Article[] {
  return items
    .filter((article) => article.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatArticleDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? isoDate
    : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
