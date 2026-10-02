import { Quote } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/content/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full bg-card/80 backdrop-blur-sm">
      <CardContent className="flex h-full flex-col gap-6 pt-6">
        <Quote
          className="size-8 text-accent/60"
          aria-hidden
        />
        <blockquote className="flex-1 text-base leading-relaxed text-pretty">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <footer className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
          </Avatar>
          <div>
            <cite className="font-heading text-sm font-medium not-italic">
              {testimonial.author}
            </cite>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
