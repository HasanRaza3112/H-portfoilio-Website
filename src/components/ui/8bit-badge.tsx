import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import {
  Badge as ShadcnBadge,
  type BadgeProps as ShadcnBadgeProps,
} from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const badgeVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
    variant: {
      default: "border-primary bg-primary",
      destructive: "border-destructive bg-destructive",
      outline: "border-background bg-background",
      secondary: "border-secondary bg-secondary",
      success: "border-success bg-success",
      warning: "border-warning bg-warning",
      muted: "border-border bg-surface-overlay",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BitBadgeProps
  extends
    Omit<ShadcnBadgeProps, "variant">,
    VariantProps<typeof badgeVariants> {
  variant?: ShadcnBadgeProps["variant"];
}

function Badge({
  children,
  className = "",
  font,
  variant,
  ...props
}: BitBadgeProps) {
  const color = badgeVariants({ variant, font });
  const classes = className.split(" ").filter(Boolean);

  const visualClasses = classes.filter(
    (c) =>
      c.startsWith("bg-") ||
      c.startsWith("border-") ||
      c.startsWith("text-") ||
      c.startsWith("rounded-"),
  );

  const containerClasses = classes.filter(
    (c) =>
      !(
        c.startsWith("bg-") ||
        c.startsWith("border-") ||
        c.startsWith("text-") ||
        c.startsWith("rounded-")
      ),
  );

  return (
    <div className={cn("relative inline-flex items-stretch", containerClasses)}>
      <ShadcnBadge
        {...props}
        className={cn(
          "h-full w-full rounded-none",
          font !== "normal" && "retro",
          visualClasses,
        )}
        variant={variant}
      >
        {children}
      </ShadcnBadge>

      <div
        className={cn(
          "-left-1.5 absolute inset-y-[4px] w-1.5",
          color,
          visualClasses,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "-right-1.5 absolute inset-y-[4px] w-1.5",
          color,
          visualClasses,
        )}
        aria-hidden
      />
    </div>
  );
}

export { Badge };
