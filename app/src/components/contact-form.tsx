"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  contactFormFields,
  contactFormMessages,
  contactFormSteps,
  contactInterestOptions,
  contactMethodOptions,
} from "@/content/contact-form";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const defaultValues: Partial<ContactFormValues> = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  interests: [],
  preferredContactMethod: undefined,
  message: "",
  consent: undefined,
  website: "",
};

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const interests = watch("interests") ?? [];
  const consent = watch("consent");

  async function goToStep2() {
    const valid = await trigger(["fullName", "email", "phone", "company"]);
    if (valid) {
      setStep(2);
    }
  }

  function toggleInterest(value: ContactFormValues["interests"][number]) {
    const current = interests;
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setValue("interests", next, { shouldValidate: true, shouldDirty: true });
  }

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      toast.success(contactFormMessages.successTitle, {
        description: contactFormMessages.successDescription,
      });
      reset(defaultValues);
      setStep(1);
    } catch {
      toast.error("Unable to send message", {
        description: contactFormMessages.errorDescription,
      });
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border bg-card p-8 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
        role="status"
      >
        <CheckCircle2
          className="mx-auto mb-4 size-12 text-accent"
          aria-hidden
        />
        <h3 className="font-heading text-xl font-semibold">
          {contactFormMessages.successTitle}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {contactFormMessages.successDescription}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
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
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          {[1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-1 flex-col gap-2">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  step >= stepNumber ? "bg-accent" : "bg-muted",
                )}
                aria-hidden
              />
              <div className="text-left">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step === stepNumber
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  Step {stepNumber}:{" "}
                  {stepNumber === 1
                    ? contactFormSteps.step1.title
                    : contactFormSteps.step2.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {step === 1
            ? contactFormSteps.step1.description
            : contactFormSteps.step2.description}
        </p>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      {step === 1 ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">{contactFormFields.fullName.label} *</Label>
            <Input
              id="fullName"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
            <p className="text-xs text-muted-foreground">
              {contactFormFields.fullName.helpText}
            </p>
            {errors.fullName ? (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{contactFormFields.email.label} *</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <p className="text-xs text-muted-foreground">
              {contactFormFields.email.helpText}
            </p>
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{contactFormFields.phone.label} *</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            <p className="text-xs text-muted-foreground">
              {contactFormFields.phone.helpText}
            </p>
            {errors.phone ? (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{contactFormFields.company.label}</Label>
            <Input
              id="company"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              {...register("company")}
            />
            <p className="text-xs text-muted-foreground">
              {contactFormFields.company.helpText}
            </p>
          </div>

          <Button type="button" className="w-full sm:w-auto" onClick={goToStep2}>
            {contactFormMessages.next}
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">
              {contactFormFields.interests.label} *
            </legend>
            <p className="text-xs text-muted-foreground">
              {contactFormFields.interests.helpText}
            </p>
            <div className="flex flex-wrap gap-2">
              {contactInterestOptions.map((option) => {
                const selected = interests.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleInterest(option.value)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      selected
                        ? "border-accent bg-accent/15 text-foreground"
                        : "border-border bg-background hover:bg-muted",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {errors.interests ? (
              <p className="text-xs text-destructive">
                {errors.interests.message}
              </p>
            ) : null}
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="preferredContactMethod">
              {contactFormFields.preferredContactMethod.label} *
            </Label>
            <Select
              value={watch("preferredContactMethod")}
              onValueChange={(value) =>
                setValue(
                  "preferredContactMethod",
                  value as ContactFormValues["preferredContactMethod"],
                  { shouldValidate: true },
                )
              }
            >
              <SelectTrigger
                id="preferredContactMethod"
                className="w-full"
                aria-invalid={!!errors.preferredContactMethod}
              >
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                {contactMethodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {contactFormFields.preferredContactMethod.helpText}
            </p>
            {errors.preferredContactMethod ? (
              <p className="text-xs text-destructive">
                {errors.preferredContactMethod.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{contactFormFields.message.label}</Label>
            <Textarea
              id="message"
              rows={4}
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            <p className="text-xs text-muted-foreground">
              {contactFormFields.message.helpText}
            </p>
            {errors.message ? (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
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
                <Label htmlFor="consent" className="font-normal leading-snug">
                  {contactFormFields.consent.label} *
                </Label>
                <p className="text-xs text-muted-foreground">
                  {contactFormFields.consent.helpText}{" "}
                  <Link
                    href="/privacy"
                    className="text-accent underline-offset-4 hover:underline"
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

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
            >
              {contactFormMessages.back}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden />
                  {contactFormMessages.submitting}
                </>
              ) : (
                contactFormMessages.submit
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
