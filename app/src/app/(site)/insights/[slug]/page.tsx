import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Constellation } from "@/components/brand/constellation";
import { CtaSection } from "@/components/cta-section";
import { GatedDownload } from "@/components/gated-download";
import { Container } from "@/components/layout/container";
import { ShareButtons } from "@/components/share-buttons";
import {
  articleCategoryLabels,
  filterPublishedArticles,
  formatArticleDate,
} from "@/content/articles";
import { getCollection } from "@/lib/cms/read";
import { media } from "@/lib/media";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

type ArticlePageProps = { params: Promise<{ slug: string }> };

async function findArticle(slug: string) {
  const articles = filterPublishedArticles(await getCollection("articles"));
  return articles.find((article) => article.slug === slug);
}

export async function generateStaticParams() {
  const articles = filterPublishedArticles(await getCollection("articles"));
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await findArticle((await params).slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", title: article.title, description: article.excerpt },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await findArticle((await params).slug);
  if (!article) notFound();

  const url = `${siteUrl}/insights/${article.slug}`;
  const download = article.downloadSlug
    ? (await getCollection("downloads")).find((item) => item.slug === article.downloadSlug && item.active)
    : undefined;

  return (
    <>
      <section className="theme-navy relative isolate overflow-hidden">
        <Constellation className="-z-10" />
        <Container className="py-14 sm:py-20">
          <Link
            href={`/insights#${article.category}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {articleCategoryLabels[article.category]}
          </Link>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">{article.excerpt}</p>
          <p className="mt-6 text-sm text-muted-foreground">
            {article.author} · <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          </p>
        </Container>
        <div className="rule-gold h-1" aria-hidden />
      </section>

      <section>
        <Container className="max-w-3xl py-14 sm:py-20">
          {article.coverImageKey ? (
            <Image
              src={media(article.coverImageKey)}
              alt={article.coverImageAlt ?? ""}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              className="mb-10 w-full rounded-md object-cover"
            />
          ) : null}

          <div className="space-y-5 font-serif text-lg leading-relaxed [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-l-pink [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_li]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_strong]:font-bold [&_table]:w-full [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2 [&_ul]:list-disc [&_ul]:space-y-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
          </div>


          <div className="mt-12 border-t pt-8">
            <ShareButtons url={url} title={article.title} />
          </div>
        </Container>
        {download ? (
          <Container className="pb-16">
            <GatedDownload
              resource={{
                slug: download.slug,
                title: download.title,
                summary: download.summary,
                format: download.format,
              }}
            />
          </Container>
        ) : null}
      </section>

      <CtaSection />
    </>
  );
}
