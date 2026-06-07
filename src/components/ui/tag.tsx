import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-caption font-medium transition-colors-token",
  {
    variants: {
      variant: {
        default:
          "border-border-subtle bg-surface-secondary text-muted-foreground hover:border-border hover:text-foreground",
        accent:
          "border-border-accent bg-accent-subtle text-accent hover:bg-accent/20",
        mono: "border-border-subtle bg-surface font-mono text-caption text-muted-foreground",
      },
      size: {
        default: "h-7",
        sm: "h-6 px-2 text-[0.6875rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props} />
  );
}

export { Tag, tagVariants };
