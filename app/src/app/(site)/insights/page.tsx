import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Constellation } from "@/components/brand/constellation";
import { ArticleCard } from "@/components/article-card";
import { GatedDownload } from "@/components/gated-download";
import { CtaSection } from "@/components/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { articleCategoryLabels, filterPublishedArticles } from "@/content/articles";
import type { ArticleCategory } from "@/content/types";
import { getCollection } from "@/lib/cms/read";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on digital government, platforms and transformation across the U.S. and Africa, plus Afronovation news.",
};


const categories: ArticleCategory[] = ["perspectives", "news", "reports"];

const categoryIntros: Record<ArticleCategory, string> = {
  perspectives: "Thought leadership on digital government, platforms and adoption from the team delivering the work.",
  news: "Announcements, launches, partnerships and milestones.",
  reports: "Briefs, reports and the Afronovation Capabilities Portfolio.",
};

export default async function InsightsPage() {
  const [allArticles, allDownloads] = await Promise.all([
    getCollection("articles"),
    getCollection("downloads"),
  ]);
  const published = filterPublishedArticles(allArticles);
  const downloads = allDownloads.filter((resource) => resource.active);
  return (
    <>
      <section className="theme-navy relative isolate overflow-hidden">
        <Constellation className="-z-10" />
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#f3a9cf] uppercase">
            Insights
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Perspectives for leaders building the digital state.
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
            Digital government, platforms, investment and adoption, from the team delivering them.
          </p>
        </Container>
        <div className="rule-gold h-1" aria-hidden />
      </section>

      <nav aria-label="Insights categories" className="sticky top-[72px] z-40 border-b bg-background/95 backdrop-blur">
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-3">
            {categories.map((category) => (
              <li key={category} className="shrink-0">
                <Link
                  href={`#${category}`}
                  className="block rounded-full px-4 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {articleCategoryLabels[category]}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {categories.map((category, index) => {
        const items = published.filter((article) => article.category === category);
        return (
          <Section
            key={category}
            id={category}
            spacing="lg"
            className={index % 2 === 1 ? "scroll-mt-36 bg-surface" : "scroll-mt-36"}
          >
            <Container className="space-y-8">
              <SectionHeading title={articleCategoryLabels[category]} description={categoryIntros[category]} />
              {category === "reports" && downloads.length > 0 ? (
                <div className="space-y-5">
                  {downloads.map((resource) => (
                    <GatedDownload
                      key={resource.slug}
                      resource={{
                        slug: resource.slug,
                        title: resource.title,
                        summary: resource.summary,
                        format: resource.format,
                      }}
                    />
                  ))}
                </div>
              ) : null}
              {items.length > 0 ? (
                <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((article) => (
                    <li key={article.slug}>
                      <ArticleCard article={article} />
                    </li>
                  ))}
                </ul>
              ) : category === "reports" && downloads.length > 0 ? null : (
                <p className="font-serif text-muted-foreground">
                  Coming soon.{" "}
                  <Link href="#newsletter" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Subscribe
                  </Link>{" "}
                  to hear when the first ones are published.
                </p>
              )}
            </Container>
          </Section>
        );
      })}

      <Section spacing="md">
        <Container className="flex flex-col gap-6 border-t pt-10 sm:flex-row sm:items-end sm:justify-between">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href="#newsletter">
              Subscribe to updates
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <SocialLinks heading="Follow us" />
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
