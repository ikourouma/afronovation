import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionHeadingVariants = cva("space-y-3", {
  variants: {
    align: {
      left: "text-left",
      center: "mx-auto max-w-3xl text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Heading level; defaults to h2. */
  as?: "h1" | "h2" | "h3";
} & VariantProps<typeof sectionHeadingVariants>;

/** Portfolio-style heading: gradient dash marker, bold title, serif lead. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn(sectionHeadingVariants({ align }), className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      ) : null}
      <Tag
        className={cn(
          "flex items-center gap-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          align === "center" && "justify-center",
        )}
      >
        <span className="heading-marker" aria-hidden />
        <span>{title}</span>
      </Tag>
      {description ? (
        <p className="max-w-3xl font-serif text-lg leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { sectionHeadingVariants };
