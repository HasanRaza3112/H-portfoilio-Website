import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-body-sm font-medium transition-colors-token disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-xs hover:bg-accent-hover active:brightness-95",
        secondary:
          "bg-surface-secondary text-foreground border border-border-subtle hover:border-border hover:bg-surface-elevated",
        outline:
          "border border-border bg-transparent text-foreground hover:border-border-strong hover:bg-surface-secondary",
        ghost: "text-muted hover:bg-surface-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-white shadow-xs hover:brightness-110 active:brightness-95",
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-caption",
        lg: "h-11 rounded-lg px-6 text-body-sm",
        icon: "size-10",
        "icon-sm": "size-8 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
