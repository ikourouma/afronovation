import Image from "next/image";
import Link from "next/link";

import { articleCategoryLabels, formatArticleDate } from "@/content/articles";
import type { Article } from "@/content/types";
import { media } from "@/lib/media";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border bg-card">
      {article.coverImageKey ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={media(article.coverImageKey)}
            alt={article.coverImageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-1.5 bg-brand-gradient" aria-hidden />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-primary">
          {articleCategoryLabels[article.category]} · {formatArticleDate(article.publishedAt)}
        </p>
        <h3 className="mt-2 font-heading text-lg leading-snug font-bold">
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 font-serif leading-relaxed text-muted-foreground">{article.excerpt}</p>
      </div>
    </article>
  );
}
