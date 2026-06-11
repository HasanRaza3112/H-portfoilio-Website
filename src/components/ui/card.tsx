import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "card-hud relative border bg-surface text-foreground transition-all duration-300 hud-clip",
  {
    variants: {
      variant: {
        default:
          "border-border-subtle shadow-panel hover:border-border-accent hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]",
        elevated:
          "border-border shadow-elevated bg-surface-secondary hover:border-border-accent hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]",
        interactive:
          "border-border-subtle shadow-panel hover:border-border-accent hover:shadow-[0_0_20px_rgba(255,70,85,0.15)] cursor-pointer",
        ghost: "border-transparent bg-transparent shadow-none [clip-path:none]",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hudLabel?: string;
}

function Card({
  className,
  variant,
  padding,
  hudLabel = "// PRJ.DAT",
  children,
  ...props
}: CardProps) {
  const showHudLabel = variant !== "ghost" && hudLabel;

  return (
    <div
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    >
      {showHudLabel ? (
        <span
          className="pointer-events-none absolute top-2 right-3 z-10 font-mono text-[0.625rem] font-medium uppercase tracking-widest text-accent/70"
          aria-hidden
        >
          {hudLabel.startsWith("//") ? hudLabel : `// ${hudLabel}`}
        </span>
      ) : null}
      {children}
    </div>
  );
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 pb-4", className)} {...props} />
  );
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-heading text-h4 font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-sm text-muted", className)} {...props} />;
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-3 pt-4", className)} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
