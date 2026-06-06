import Link from "next/link";

import { Container } from "@/components/shared/Container";
import type { SiteSettings } from "@/types";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{settings.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{settings.title}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {settings.github ? (
            <Link
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </Link>
          ) : null}
          {settings.linkedin ? (
            <Link
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </Link>
          ) : null}
          <Link href="/resume" className="hover:text-foreground">
            Resume
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          © {year} {settings.name.split(" ").pop()}
        </p>
      </Container>
    </footer>
  );
}
