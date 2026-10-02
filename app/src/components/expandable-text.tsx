"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

/** Shows the first few lines of a long text with a "Read more" toggle. */
export function ExpandableText({ text, name }: { text: string; name: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="flex-1">
      <p
        id={id}
        className={cn("font-serif leading-relaxed text-muted-foreground", !open && "line-clamp-3")}
      >
        {text}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        {open ? "Show less" : "Read more"}
        <span className="sr-only"> about {name}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
    </div>
  );
}
