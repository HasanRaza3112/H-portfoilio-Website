import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { getSiteSettings } from "@/features/site/api";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "Contact",
    description: `Get in touch with ${settings.name}.`,
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s connect
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Open to game industry opportunities. For recruiters and hiring
            managers, resume and project case studies are available on this site.
          </p>

          <div className="mt-8 space-y-4">
            {settings.email ? (
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-2 block text-foreground hover:text-primary"
                >
                  {settings.email}
                </a>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {settings.linkedin ? (
                <Button asChild variant="secondary" size="sm">
                  <Link
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </Button>
              ) : null}
              {settings.github ? (
                <Button asChild variant="secondary" size="sm">
                  <Link
                    href={settings.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="ghost" size="sm">
                <Link href="/resume">View Resume</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <ContactForm recipientEmail={settings.email} />
        </div>
      </div>
    </Container>
  );
}
