import type { Article, ArticleCategory } from "./types";

/** No articles yet - the first ones are published from the admin. */
export const articles: Article[] = [];

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
