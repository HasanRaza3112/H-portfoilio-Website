import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ContactFormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function ContactFormField({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: ContactFormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </Label>
      {hint ? (
        <p id={hintId} className="text-body-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div aria-describedby={describedBy}>{children}</div>
      {error ? (
        <p id={errorId} role="alert" className="text-body-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
