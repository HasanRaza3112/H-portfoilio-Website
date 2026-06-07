import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function SectionLink({ href, label, className }: SectionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-body-sm font-medium text-accent transition-colors-token hover:text-accent-hover focus-visible:outline-none",
        className,
      )}
    >
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}
