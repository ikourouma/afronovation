import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8");

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof containerVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={cn(containerVariants(), className)} {...props}>
      {children}
    </Component>
  );
}
