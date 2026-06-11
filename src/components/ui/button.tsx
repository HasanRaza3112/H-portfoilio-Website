import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-hud inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-body-sm font-medium uppercase tracking-widest transition-colors-token disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "btn-hud-primary border border-accent bg-accent text-accent-foreground hover:border-accent-hover hover:bg-accent-hover hover:shadow-glow-crimson active:brightness-95",
        secondary:
          "btn-hud-secondary border border-border-accent bg-transparent text-foreground hover:text-accent-foreground",
        outline:
          "btn-hud-secondary border border-border bg-transparent text-foreground hover:border-border-accent hover:text-accent-foreground",
        ghost:
          "text-muted hover:bg-surface-secondary hover:text-accent border border-transparent hover:border-border-accent",
        destructive:
          "bg-destructive text-white shadow-xs hover:brightness-110 active:brightness-95 border border-destructive",
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto border-0 normal-case tracking-normal font-sans",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-caption",
        lg: "h-11 px-6 text-body-sm",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
