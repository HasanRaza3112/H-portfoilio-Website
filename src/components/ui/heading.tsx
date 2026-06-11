import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-heading font-semibold tracking-tight text-foreground text-balance",
  {
    variants: {
      variant: {
        display: "text-display",
        h1: "text-h1",
        h2: "text-h2",
        h3: "text-h3",
        h4: "text-h4",
        overline:
          "text-overline uppercase text-muted font-medium tracking-widest",
      },
      tone: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent",
      },
    },
    defaultVariants: {
      variant: "h2",
      tone: "default",
    },
  },
);

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "p" | "span";

const defaultElement: Record<
  NonNullable<VariantProps<typeof headingVariants>["variant"]>,
  HeadingLevel
> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  overline: "p",
};

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

function Heading({
  className,
  variant = "h2",
  tone,
  as,
  ...props
}: HeadingProps) {
  const resolvedVariant = variant ?? "h2";
  const Component = as ?? defaultElement[resolvedVariant];

  return (
    <Component
      className={cn(
        headingVariants({ variant: resolvedVariant, tone, className }),
      )}
      {...props}
    />
  );
}

export { Heading, headingVariants };
