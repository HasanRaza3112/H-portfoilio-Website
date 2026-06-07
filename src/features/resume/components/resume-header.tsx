import Link from "next/link";
import { Code2, ExternalLink, Mail } from "lucide-react";

import { SanityImage } from "@/components/shared/sanity-image";
import { Heading } from "@/components/ui/heading";
import { ResumeDownloadButton } from "@/features/resume/components/resume-download-button";
import { resolveResumeFilename } from "@/features/resume/lib/resume-utils";
import { BRAND } from "@/lib/constants";
import type { PersonProfile, SiteSettings } from "@/types";

interface ResumeHeaderProps {
  profile: PersonProfile | null;
  siteSettings: SiteSettings | null;
}

export function ResumeHeader({ profile, siteSettings }: ResumeHeaderProps) {
  const name = profile?.name ?? BRAND.name;
  const title = profile?.title ?? BRAND.title;
  const currentRole = profile?.currentRole ?? BRAND.currentRole;
  const currentCompany = profile?.currentCompany ?? BRAND.currentCompany;
  const resumeUrl = siteSettings?.resumeFile?.url;
  const resumeFilename = resolveResumeFilename(
    siteSettings?.resumeFile?.originalFilename,
    name,
  );

  return (
    <header className="border-b border-border-subtle py-section-md">
      <div className="mx-auto flex w-full max-w-container-narrow flex-col gap-8 px-[var(--container-padding)] lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5">
          <SanityImage
            image={profile?.profileImage}
            alt={profile?.profileImage?.alt ?? `${name} profile photo`}
            className="size-20 shrink-0 rounded-xl border border-border-subtle"
            sizes="80px"
            fill
            priority
          />
          <div>
            <Heading variant="overline" tone="accent">
              Resume
            </Heading>
            <Heading variant="h1" as="h1" className="mt-2">
              {name}
            </Heading>
            <p className="mt-2 text-body-lg text-foreground">{title}</p>
            <p className="mt-1 text-body-sm text-muted">
              {currentRole} · {currentCompany}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <ul className="flex flex-col gap-2 text-body-sm text-muted lg:items-end">
            {siteSettings?.contactEmail ? (
              <li className="inline-flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden />
                <span>{siteSettings.contactEmail}</span>
              </li>
            ) : null}
            {siteSettings?.linkedinUrl ? (
              <li>
                <Link
                  href={siteSettings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors-token hover:text-accent"
                >
                  <ExternalLink className="size-4 shrink-0" aria-hidden />
                  LinkedIn
                </Link>
              </li>
            ) : null}
            {siteSettings?.githubUrl ? (
              <li>
                <Link
                  href={siteSettings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors-token hover:text-accent"
                >
                  <Code2 className="size-4 shrink-0" aria-hidden />
                  GitHub
                </Link>
              </li>
            ) : null}
          </ul>

          {resumeUrl ? (
            <ResumeDownloadButton url={resumeUrl} filename={resumeFilename} />
          ) : (
            <p className="text-body-sm text-muted">
              PDF resume will appear here once uploaded in CMS.
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
