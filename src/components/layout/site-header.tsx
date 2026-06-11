"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function GamingNavLink({
  href,
  label,
  isActive,
  onClick,
  className,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono text-body-sm font-medium uppercase tracking-wider transition-colors-token",
        isActive ? "text-accent" : "text-muted hover:text-accent",
        className,
      )}
    >
      <span
        className={cn(
          "text-accent transition-opacity",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
        aria-hidden
      >
        ›
      </span>
      <span
        className={cn(
          isActive && "underline decoration-accent underline-offset-4",
        )}
      >
        {isActive ? `[ ${label} ]` : label}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
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
      <header className="sticky top-0 z-50 border-b border-border-accent/30 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none"
            aria-label={`${BRAND.name} — Home`}
            onClick={closeMobileMenu}
          >
            <span className="font-mono text-body-sm font-semibold text-foreground transition-colors-token group-hover:text-accent">
              {BRAND.name}
            </span>
            <span className="font-mono text-caption text-muted hidden sm:block">
              {BRAND.title}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center justify-end gap-3 lg:gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <GamingNavLink
                    href={item.href}
                    label={item.label}
                    isActive={isNavActive(pathname, item.href)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {mobileMenuOpen ? (
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-none border border-border-accent text-accent transition-colors-token hover:border-accent hover:bg-accent-subtle hover:shadow-glow-red focus-visible:outline-none md:hidden"
              aria-expanded="true"
              aria-controls="mobile-nav"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="size-5" />
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-none border border-border-accent text-accent transition-colors-token hover:border-accent hover:bg-accent-subtle hover:shadow-glow-red focus-visible:outline-none md:hidden"
              aria-expanded="false"
              aria-controls="mobile-nav"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          )}
        </Container>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        {...(mobileMenuOpen
          ? { "aria-hidden": "false" as const }
          : { "aria-hidden": "true" as const })}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          onClick={closeMobileMenu}
        />

        <nav
          aria-label="Mobile primary"
          className={cn(
            "gaming-menu-panel absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border-accent transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="relative flex h-16 items-center justify-between border-b border-border-accent/40 px-6">
            <div className="flex flex-col">
              <span className="font-mono text-caption uppercase tracking-[0.2em] text-accent">
                NAV_PANEL
              </span>
              <span className="font-mono text-[0.625rem] text-muted">
                HASAN_RAZA_OS v1.0
              </span>
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-none border border-border-accent text-accent transition-colors-token hover:bg-accent-subtle hover:shadow-glow-red focus-visible:outline-none"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <X className="size-5" />
            </button>
          </div>

          <ul className="relative flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item, index) => {
              const active = isNavActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-none border border-transparent px-4 py-3 font-mono text-body-lg font-medium uppercase tracking-wider transition-colors-token",
                      active
                        ? "border-border-accent bg-accent-subtle text-accent shadow-glow-red"
                        : "text-foreground hover:border-border-accent hover:bg-surface-secondary hover:text-accent",
                    )}
                  >
                    <span className="text-caption text-muted" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    >
                      ›
                    </span>
                    <span>{active ? `[ ${item.label} ]` : item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative border-t border-border-accent/40 px-6 py-4">
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
              SYS_STATUS: <span className="text-success">ONLINE</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
