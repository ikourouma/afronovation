import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("", {
  variants: {
    spacing: {
      sm: "py-10 sm:py-12",
      md: "py-14 sm:py-16",
      lg: "py-16 sm:py-20",
      xl: "py-20 sm:py-24",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  id?: string;
} & VariantProps<typeof sectionVariants> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    "as" | "children" | "className" | "id"
  >;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  spacing,
  id,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      id={id}
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { sectionVariants };
