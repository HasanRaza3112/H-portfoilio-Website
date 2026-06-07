import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-[var(--container-padding)]", {
  variants: {
    size: {
      narrow: "max-w-container-narrow",
      content: "max-w-container-content",
      wide: "max-w-container-wide",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size, className }))} {...props} />
  );
}

export { Container, containerVariants };
