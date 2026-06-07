import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-32 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-body-sm text-foreground shadow-xs transition-colors-token",
        "placeholder:text-muted",
        "hover:border-border",
        "focus-visible:border-border-accent focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-destructive focus-visible:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
