import * as React from "react";

import {
  Card as ShadcnCard,
  CardContent as ShadcnCardContent,
  CardDescription as ShadcnCardDescription,
  CardFooter as ShadcnCardFooter,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type BitCardProps = React.ComponentProps<"div">;

function Card({ className, children, ...props }: BitCardProps) {
  return (
    <div
      className={cn(
        "relative border-y-6 border-foreground bg-card p-0! text-card-foreground dark:border-ring",
        className,
      )}
    >
      <ShadcnCard
        {...props}
        hudLabel=""
        variant="ghost"
        padding="none"
        className={cn(
          "h-full w-full! flex flex-col rounded-none border-0 bg-card text-card-foreground shadow-none [clip-path:none]",
        )}
      >
        {children}
      </ShadcnCard>

      <div
        className="pointer-events-none absolute inset-0 -mx-1.5 border-x-6 border-inherit"
        aria-hidden="true"
      />
    </div>
  );
}

function CardHeader({ className, ...props }: BitCardProps) {
  return <ShadcnCardHeader className={cn(className)} {...props} />;
}

function CardTitle({ className, ...props }: BitCardProps) {
  return <ShadcnCardTitle className={cn(className)} {...props} />;
}

function CardDescription({ className, ...props }: BitCardProps) {
  return <ShadcnCardDescription className={cn(className)} {...props} />;
}

function CardContent({ className, ...props }: BitCardProps) {
  return (
    <ShadcnCardContent
      className={cn("flex-1", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: BitCardProps) {
  return <ShadcnCardFooter className={cn(className)} {...props} />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
