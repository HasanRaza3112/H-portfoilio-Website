import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/constants";

// Inline SVGs for type safety and independence from lucide-react brand removals
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socials = [
  { href: "https://github.com/HasanRaza3112", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://twitter.com/", label: "Twitter", Icon: TwitterIcon },
  { href: "/contact", label: "Email", Icon: MailIcon },
] as const;

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/engineering", label: "Engineering" },
  { href: "/experience", label: "Experience" },
  { href: "/devlogs", label: "Devlogs" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-section-md border-t border-border-accent/30 py-section-sm glow-mesh">
      <Container className="grid gap-10 md:grid-cols-3 md:items-start">
        {/* Col 1: Brand + Tagline */}
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 font-mono text-body-sm font-semibold uppercase tracking-widest text-foreground">
            <span className="pulse-signal-square" aria-hidden />
            MAX
          </span>
          <p className="max-w-xs text-body-sm text-muted">
            {BRAND.tagline}
          </p>
        </div>

        {/* Col 2: Navigation links */}
        <div className="flex flex-col gap-3 md:items-center">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
            NAVIGATION
          </span>
          <ul className="flex flex-col gap-2 font-mono text-caption uppercase tracking-wider text-muted md:items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Socials as HUD chips */}
        <div className="flex flex-col gap-4 md:items-end">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
            COMMS.CHANNELS
          </span>
          <ul className="flex flex-wrap gap-2 md:justify-end">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hud-chip"
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon className="size-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Bottom strip */}
      <div className="border-t border-border-subtle mt-10 pt-6">
        <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-caption text-text-tertiary">
          <p>© {year} Hasan Raza</p>
          <nav aria-label="CMS Navigation">
            <ul className="flex gap-4">
              <li>
                <Link href="/studio" className="hover:text-accent transition-colors">
                  CMS STUDIO
                </Link>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
