import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      sm: "py-section-sm",
      md: "py-section-md",
      lg: "py-section-lg",
      none: "py-0",
    },
    divider: {
      none: "",
      top: "border-t border-border-subtle",
      bottom: "border-b border-border-subtle",
    },
  },
  defaultVariants: {
    spacing: "md",
    divider: "none",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  eyebrow?: string;
  title?: string;
  description?: string;
  containerSize?: VariantProps<typeof Container>["size"];
  headerClassName?: string;
  titleId?: string;
}

function Section({
  className,
  spacing,
  divider,
  eyebrow,
  title,
  description,
  containerSize = "content",
  headerClassName,
  titleId,
  children,
  ...props
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section
      className={cn(sectionVariants({ spacing, divider, className }))}
      {...props}
    >
      <Container size={containerSize}>
        {hasHeader ? (
          <header
            className={cn(
              "mb-8 flex max-w-3xl flex-col gap-3 md:mb-10",
              headerClassName,
            )}
          >
            {eyebrow ? (
              <Heading variant="overline" tone="accent">
                {eyebrow}
              </Heading>
            ) : null}
            {title ? (
              <Heading variant="h2" id={titleId}>
                {title}
              </Heading>
            ) : null}
            {description ? (
              <p className="text-body-lg text-muted text-pretty">{description}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export { Section, sectionVariants };
