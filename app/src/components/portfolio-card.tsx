import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createElement } from "react";

import { portfolioStatusLabels } from "@/content/portfolio";
import type { PortfolioItem, PortfolioStatus } from "@/content/types";
import { getPortfolioIcon } from "@/lib/portfolio-icons";
import { cn } from "@/lib/utils";

const statusStyles: Record<PortfolioStatus, string> = {
  flagship: "bg-brand-gradient-deep text-white",
  operational: "bg-[#e6f4ee] text-[#185c3d]",
  pilot: "bg-secondary text-secondary-foreground",
};

/** Portfolio-style platform card (icon, name, status, sector, summary). */
export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group relative flex h-full flex-col rounded-md border bg-card p-6 transition-shadow hover:shadow-[0_12px_32px_-12px_rgb(7_30_54/0.18)]">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-navy text-white">
          {createElement(getPortfolioIcon(item.icon), {
            className: "size-5",
            "aria-hidden": true,
          })}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-lg leading-snug font-bold">
            <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {item.name}
            </Link>
          </h3>
          <span
            className={cn(
              "mt-1.5 inline-block rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase",
              statusStyles[item.status],
            )}
          >
            {portfolioStatusLabels[item.status]}
          </span>
        </div>
      </div>
      <p className="mt-4 font-serif text-sm italic text-muted-foreground">{item.sector}</p>
      <p className="mt-1.5 flex-1 font-serif leading-relaxed">{item.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        View platform
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-ring opacity-0 group-has-[a:focus-visible]:opacity-100" aria-hidden />
    </article>
  );
}
