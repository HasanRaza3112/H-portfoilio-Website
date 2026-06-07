import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle py-section-sm">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-muted">
          © {year} {BRAND.name}. Technical Game Engineer.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link
                href="/contact"
                className="text-body-sm text-muted transition-colors-token hover:text-foreground"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/studio"
                className="text-body-sm text-muted transition-colors-token hover:text-foreground"
              >
                CMS
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
