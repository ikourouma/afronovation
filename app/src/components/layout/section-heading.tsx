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
} & VariantProps<typeof sectionHeadingVariants>;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(sectionHeadingVariants({ align }), className)}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { sectionHeadingVariants };
