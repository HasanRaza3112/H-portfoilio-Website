import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-body-sm font-medium font-heading uppercase tracking-wider transition-colors-token disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "btn-scanline border border-accent bg-accent-subtle text-accent shadow-xs hover:border-accent-hover hover:bg-accent/15 hover:text-accent-hover hover:shadow-glow-red active:brightness-95",
        secondary:
          "btn-scanline border border-border-subtle bg-surface-secondary text-foreground hover:border-accent hover:bg-surface-elevated hover:text-accent hover:shadow-glow-red",
        outline:
          "btn-scanline border border-border bg-transparent text-foreground hover:border-accent hover:bg-accent-subtle hover:text-accent hover:shadow-glow-red",
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
