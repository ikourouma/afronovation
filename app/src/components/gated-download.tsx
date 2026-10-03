"use client";

import Link from "next/link";
import { CheckCircle2, Download, FileText, Loader2 } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DownloadResource } from "@/content/types";
import { downloadRequestSchema } from "@/lib/download-schema";
import { cn } from "@/lib/utils";

type ResourceSummary = Pick<DownloadResource, "slug" | "title" | "summary" | "format">;

/** Email-gated download: name, email and organisation in exchange for the file. */
export function GatedDownload({
  resource,
  className,
}: {
  resource: ResourceSummary;
  className?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [emailed, setEmailed] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      slug: resource.slug,
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      organization: String(form.get("organization") ?? ""),
      newsletter: form.get("newsletter") === "on",
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    };
    const parsed = downloadRequestSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { url?: string; emailed?: boolean };
      if (!response.ok || !result.url) throw new Error("Request failed");
      setFileUrl(result.url);
      setEmailed(Boolean(result.emailed));
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("We couldn't prepare your download. Please try again.");
    }
  }

  return (
    <div className={cn("theme-navy relative overflow-hidden rounded-md p-7 sm:p-9", className)}>
      <span className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#f3a9cf] uppercase">
            <FileText className="size-4" aria-hidden /> Free download · {resource.format}
          </p>
          <h2 className="mt-3 font-heading text-2xl leading-snug font-bold">{resource.title}</h2>
          <p className="mt-3 font-serif leading-relaxed text-muted-foreground">{resource.summary}</p>
        </div>

        {status === "done" && fileUrl ? (
          <div role="status" className="rounded-md bg-white/[0.06] p-6">
            <p className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="size-5 text-[#7fd6a8]" aria-hidden /> Your download is ready
            </p>
            <p className="mt-2 font-serif text-sm text-muted-foreground">
              {emailed ? "We have also emailed you a copy. " : ""}When you are ready to choose your first service,
              our team is one click away.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" download>
                  <Download aria-hidden /> Download the PDF
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/30 bg-transparent hover:bg-white/10">
                <Link href="/contact?intent=briefing">Book a Briefing</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="sr-only">Full name</label>
                <Input id={`${id}-name`} name="fullName" autoComplete="name" placeholder="Full name" required className="h-11 bg-white text-ink" />
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="sr-only">Work email</label>
                <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="Work email" required className="h-11 bg-white text-ink" />
              </div>
            </div>
            <div>
              <label htmlFor={`${id}-org`} className="sr-only">Organisation (optional)</label>
              <Input id={`${id}-org`} name="organization" autoComplete="organization" placeholder="Organisation (optional)" className="h-11 bg-white text-ink" />
            </div>
            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" name="newsletter" className="mt-0.5 size-4 shrink-0 accent-[#6d52d8]" />
              Also send me occasional insights from Afronovation.
            </label>
            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-[#6d52d8]" />
              <span>
                I agree that Afronovation may contact me about this resource. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                  privacy policy
                </Link>
                .
              </span>
            </label>
            <div aria-hidden className="hidden">
              <input name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {error ? (
              <p role="alert" className="text-sm font-medium text-[#ffb3c8]">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" className="h-12 w-full px-6 text-base sm:w-auto" disabled={status === "submitting"}>
              {status === "submitting" ? <Loader2 className="animate-spin" aria-hidden /> : <Download aria-hidden />}
              Send me the PDF
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
