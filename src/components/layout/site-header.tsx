"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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

const navLinkClassName = cn(
  "rounded-sm px-2.5 py-2 text-body-sm font-medium text-muted transition-colors-token",
  "hover:bg-surface-secondary hover:text-foreground",
  "focus-visible:outline-none",
);

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none"
            aria-label={`${BRAND.name} — Home`}
            onClick={closeMobileMenu}
          >
            <span className="text-body-sm font-semibold text-foreground transition-colors-token group-hover:text-accent">
              {BRAND.name}
            </span>
            <span className="text-caption text-muted hidden sm:block">
              {BRAND.title}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center justify-end gap-1 lg:gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={navLinkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors-token hover:bg-surface-secondary focus-visible:outline-none md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          onClick={closeMobileMenu}
        />

        <nav
          aria-label="Mobile primary"
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border-subtle bg-surface shadow-elevated transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border-subtle px-6">
            <span className="text-body-sm font-semibold text-foreground">Menu</span>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors-token hover:bg-surface-secondary hover:text-foreground focus-visible:outline-none"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <X className="size-5" />
            </button>
          </div>

          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-4 py-3 text-body-lg font-medium text-foreground transition-colors-token",
                    "hover:bg-surface-secondary hover:text-accent",
                    "focus-visible:outline-none",
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
