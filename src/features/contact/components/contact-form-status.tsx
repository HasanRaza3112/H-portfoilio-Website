import { CheckCircle2, CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

interface ContactFormStatusProps {
  variant: "success" | "error";
  title: string;
  message: string;
  className?: string;
}

export function ContactFormStatus({
  variant,
  title,
  message,
  className,
}: ContactFormStatusProps) {
  const Icon = variant === "success" ? CheckCircle2 : CircleAlert;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      tabIndex={-1}
      className={cn(
        "rounded-lg border p-4 outline-none focus-visible:ring-0",
        variant === "success"
          ? "border-border-accent bg-accent-subtle text-foreground"
          : "border-destructive/40 bg-destructive/10 text-foreground",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={cn(
            "mt-0.5 size-5 shrink-0",
            variant === "success" ? "text-accent" : "text-destructive",
          )}
          aria-hidden
        />
        <div>
          <p className="text-body font-medium">{title}</p>
          <p className="mt-1 text-body-sm text-muted">{message}</p>
        </div>
      </div>
    </div>
  );
}
