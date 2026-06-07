import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/engineering", label: "Engineering" },
  { href: "/experience", label: "Experience" },
  { href: "/devlogs", label: "Devlogs" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline-none"
          aria-label={`${BRAND.name} — Home`}
        >
          <span className="text-body-sm font-semibold text-foreground transition-colors-token group-hover:text-accent">
            {BRAND.name}
          </span>
          <span className="text-caption text-muted hidden sm:block">
            {BRAND.title}
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-sm px-2.5 py-2 text-caption font-medium text-muted transition-colors-token sm:text-body-sm",
                    "hover:bg-surface-secondary hover:text-foreground",
                    "focus-visible:outline-none",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
