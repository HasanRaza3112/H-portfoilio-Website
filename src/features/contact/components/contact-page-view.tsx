import Link from "next/link";
import { Code2, ExternalLink } from "lucide-react";

import { ContactForm } from "@/features/contact/components/contact-form";
import { Heading } from "@/components/ui/heading";
import { BRAND } from "@/lib/constants";
import type { PersonProfile, SiteSettings } from "@/types";

interface ContactPageViewProps {
  profile: PersonProfile | null;
  siteSettings: SiteSettings | null;
}

export function ContactPageView({ profile, siteSettings }: ContactPageViewProps) {
  const name = profile?.name ?? BRAND.name;
  const title = profile?.title ?? BRAND.title;

  return (
    <>
      <section
        aria-labelledby="contact-page-heading"
        className="border-b border-border-subtle py-section-md"
      >
        <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
          <Heading variant="overline" tone="accent">
            Contact
          </Heading>
          <Heading variant="h1" as="h1" id="contact-page-heading" className="mt-3">
            Start a conversation
          </Heading>
          <p className="mt-4 max-w-2xl text-body-lg text-muted text-pretty">
            {profile?.tagline ??
              `Open to game industry opportunities with ${name}. Use the form below for recruitment, collaboration, or technical discussions.`}
          </p>
        </div>
      </section>

      <section className="py-section-md">
        <div className="mx-auto grid w-full max-w-container-content gap-section-md px-[var(--container-padding)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <aside aria-labelledby="contact-details-heading" className="space-y-6">
            <div>
              <Heading variant="h3" as="h2" id="contact-details-heading">
                {name}
              </Heading>
              <p className="mt-2 text-body text-muted">{title}</p>
              {profile?.currentRole && profile?.currentCompany ? (
                <p className="mt-1 text-body-sm text-muted">
                  {profile.currentRole} · {profile.currentCompany}
                </p>
              ) : null}
            </div>

            {profile?.professionalSummary ? (
              <p className="text-body-sm text-muted text-pretty">
                {profile.professionalSummary}
              </p>
            ) : null}

            <nav aria-label="Professional profiles">
              <ul className="space-y-3 text-body-sm">
                {siteSettings?.linkedinUrl ? (
                  <li>
                    <Link
                      href={siteSettings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted transition-colors-token hover:text-accent"
                    >
                      <ExternalLink className="size-4 shrink-0" aria-hidden />
                      LinkedIn profile
                    </Link>
                  </li>
                ) : null}
                {siteSettings?.githubUrl ? (
                  <li>
                    <Link
                      href={siteSettings.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted transition-colors-token hover:text-accent"
                    >
                      <Code2 className="size-4 shrink-0" aria-hidden />
                      GitHub profile
                    </Link>
                  </li>
                ) : null}
                <li>
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-2 text-muted transition-colors-token hover:text-accent"
                  >
                    View online resume
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
