import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ctaLabels, navLabels } from "@/content/site";
import type { Platform } from "@/content/types";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type PlatformCardProps = {
  platform: Platform;
  className?: string;
};

export function PlatformCard({ platform, className }: PlatformCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-colors hover:border-primary/40 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform",
        className,
      )}
    >
      <Link href={`/platforms/${platform.slug}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={media(platform.imageKey)}
            alt={platform.imageAlt}
            fill
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{platform.sector}</Badge>
            {platform.status === "flagship" ? (
              <Badge className="bg-primary text-primary-foreground">
                {navLabels.flagshipPlatform}
              </Badge>
            ) : null}
          </div>
          <CardTitle className="text-lg">{platform.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {platform.summary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
            View case study
            {platform.externalUrl ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground no-underline">
                · {ctaLabels.visitLiveSite}
                <ExternalLink className="size-3" aria-hidden />
              </span>
            ) : null}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
