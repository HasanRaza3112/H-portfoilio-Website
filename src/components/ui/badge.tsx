import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-overline uppercase tracking-wider font-medium transition-colors-token",
  {
    variants: {
      variant: {
        default: "border-border-accent bg-accent-subtle text-accent",
        secondary:
          "border-border-subtle bg-surface-secondary text-muted-foreground",
        success: "border-success/30 bg-success-subtle text-success",
        warning: "border-warning/30 bg-warning-subtle text-warning",
        destructive: "border-destructive/30 bg-destructive-subtle text-destructive",
        outline: "border-border text-muted-foreground bg-transparent",
        muted: "border-transparent bg-surface-overlay text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
