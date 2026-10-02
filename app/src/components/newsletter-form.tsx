"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  newsletterInterestOptions,
  newsletterSchema,
} from "@/lib/newsletter-schema";

type Status = "idle" | "submitting" | "done" | "error";

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (value: string) =>
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { email, interests, consent, website };
    const parsed = newsletterSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    setError(null);
    setStatus("submitting");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
      setError("We couldn't subscribe you just now. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="flex items-start gap-3 rounded-md bg-white/[0.06] p-4 font-serif">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#7fd6a8]" aria-hidden />
        Thank you. Check your inbox and confirm your subscription to start receiving updates.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your work email"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 min-w-0 flex-1 rounded-md border border-input bg-white px-4 text-base text-ink placeholder:text-[#5d6b80] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <Button type="submit" className="h-12 px-6 text-base" disabled={status === "submitting"}>
          {status === "submitting" ? <Loader2 className="animate-spin" aria-hidden /> : null}
          Subscribe
        </Button>
      </div>

      <fieldset>
        <legend className="text-sm text-muted-foreground">I&apos;m interested in (optional)</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {newsletterInterestOptions.map((option) => {
            const checked = interests.includes(option.value);
            return (
              <label
                key={option.value}
                className="cursor-pointer rounded-full border border-white/20 px-3 py-1 text-sm transition-colors has-checked:border-transparent has-checked:bg-primary has-focus-visible:outline-2 has-focus-visible:outline-ring"
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleInterest(option.value)}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[#6d52d8]"
        />
        <span>
          I agree to receive occasional insights and news from Afronovation. Unsubscribe any time.
          See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            privacy policy
          </Link>
          .
        </span>
      </label>

      <div aria-hidden className="hidden">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-[#ffb3c8]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
