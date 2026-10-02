"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  demoRequestSchema,
  inquiryTypeLabels,
  inquiryTypeValues,
  organizationTypeLabels,
  organizationTypeValues,
  type DemoRequestValues,
} from "@/lib/contact-schema";

type DemoRequestFormProps = {
  platformSlug: string;
  platformName: string;
};

export function DemoRequestForm({
  platformSlug,
  platformName,
}: DemoRequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [utm, setUtm] = useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    });
  }, []);

  const form = useForm<DemoRequestValues>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      formType: "demo-request",
      fullName: "",
      email: "",
      phone: "",
      company: "",
      organizationType: undefined,
      inquiryType: "demo-request",
      message: "",
      consent: undefined,
      website: "",
      platformSlug,
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const consent = watch("consent");

  async function onSubmit(values: DemoRequestValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...utm }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      toast.success("Request received", {
        description: `We'll follow up about ${platformName} shortly.`,
      });
      reset({
        formType: "demo-request",
        fullName: "",
        email: "",
        phone: "",
        company: "",
        organizationType: undefined,
        inquiryType: "demo-request",
        message: "",
        consent: undefined,
        website: "",
        platformSlug,
      });
    } catch {
      toast.error("Unable to send request", {
        description: "Something went wrong. Please try again or contact us directly.",
      });
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border bg-card p-8 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
        role="status"
      >
        <CheckCircle2 className="mx-auto mb-4 size-12 text-primary" aria-hidden />
        <h3 className="font-heading text-xl font-semibold">Thank you.</h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ve received your request about {platformName} and will follow
          up using the contact details you provided.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border bg-card p-6 shadow-sm sm:p-8"
      noValidate
    >
      <input type="hidden" {...register("formType")} value="demo-request" />
      <input type="hidden" {...register("platformSlug")} value={platformSlug} />

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="demo-fullName">Full Name *</Label>
          <Input
            id="demo-fullName"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-email">Email Address *</Label>
          <Input
            id="demo-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-phone">Phone Number *</Label>
          <Input
            id="demo-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-company">Organization Name</Label>
          <Input
            id="demo-company"
            autoComplete="organization"
            {...register("company")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-organizationType">Organization Type *</Label>
          <Select
            value={watch("organizationType")}
            onValueChange={(value) =>
              setValue(
                "organizationType",
                value as DemoRequestValues["organizationType"],
                { shouldValidate: true },
              )
            }
          >
            <SelectTrigger
              id="demo-organizationType"
              className="w-full"
              aria-invalid={!!errors.organizationType}
            >
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent>
              {organizationTypeValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {organizationTypeLabels[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.organizationType ? (
            <p className="text-xs text-destructive">
              {errors.organizationType.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-inquiryType">Inquiry Type *</Label>
          <Select
            value={watch("inquiryType")}
            onValueChange={(value) =>
              setValue("inquiryType", value as DemoRequestValues["inquiryType"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger id="demo-inquiryType" className="w-full">
              <SelectValue placeholder="Select inquiry type" />
            </SelectTrigger>
            <SelectContent>
              {inquiryTypeValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {inquiryTypeLabels[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="demo-message">Message</Label>
        <Textarea
          id="demo-message"
          rows={3}
          placeholder={`Tell us about your ${platformName} use case...`}
          {...register("message")}
        />
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="demo-consent"
            checked={consent === true}
            onCheckedChange={(checked) =>
              setValue(
                "consent",
                checked === true ? true : (undefined as unknown as true),
                { shouldValidate: true },
              )
            }
            aria-invalid={!!errors.consent}
          />
          <div className="space-y-1">
            <Label htmlFor="demo-consent" className="font-normal leading-snug">
              I consent to be contacted about this request. *
            </Label>
            <p className="text-xs text-muted-foreground">
              See our{" "}
              <Link
                href="/privacy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        {errors.consent ? (
          <p className="text-xs text-destructive">{errors.consent.message}</p>
        ) : null}
      </div>

      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          `Request a ${platformName} demo`
        )}
      </Button>
    </form>
  );
}
