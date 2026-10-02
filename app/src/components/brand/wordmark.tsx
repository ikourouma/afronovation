import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  markClassName?: string;
};

/**
 * Text-based brand wordmark (Azumo-style): lowercase, tight tracking, with the
 * leading "a" treated as a small distinct mark via the primary accent color.
 * Replaces the raster WordPress logo across the header and footer.
 */
export function Wordmark({ className, markClassName }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-heading text-xl font-semibold tracking-tight lowercase text-foreground select-none",
        className,
      )}
    >
      <span className={cn("text-primary", markClassName)}>a</span>
      fronovation
    </span>
  );
}
