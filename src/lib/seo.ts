import type { Metadata } from "next";

import { BRAND, getSiteUrl } from "@/lib/constants";
import type { HomePageData, DevlogCard, DevlogDetail, EngineeringLogCard, EngineeringLogDetail, Experience, PersonProfile, ProjectCard, ProjectDetail, SiteSettings } from "@/sanity/schemas";

function resolveOgImageUrl(
  seoImage?: { url?: string | null } | null,
  fallback?: { url?: string | null } | null,
): string | undefined {
  return seoImage?.url ?? fallback?.url ?? undefined;
}

export function resolveSiteOgImage(siteSettings: SiteSettings | null) {
  return {
    url: siteSettings?.defaultOgImage?.url ?? undefined,
    alt: siteSettings?.defaultOgImage?.alt ?? undefined,
  };
}

function buildContentMetadata({
  title,
  description,
  canonicalPath,
  ogImage,
  ogImageAlt,
  noIndex,
  openGraphType = "website",
}: {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean | null;
  openGraphType?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: openGraphType,
      url: `${getSiteUrl()}${canonicalPath}`,
      title,
      description,
      siteName: BRAND.name,
      ...(ogImage ? { images: [{ url: ogImage, alt: ogImageAlt ?? title }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function buildNotFoundMetadata(): Metadata {
  return buildContentMetadata({
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    canonicalPath: "/404",
    noIndex: true,
  });
}

export function buildHomeMetadata(
  data: HomePageData | null,
  siteSettings: SiteSettings | null,
): Metadata {
  const profile = data?.personProfile;
  const homepage = data?.homepage;
  const seo = homepage?.seo;

  const title =
    seo?.metaTitle ??
    `${profile?.name ?? BRAND.name} — ${profile?.title ?? BRAND.title}`;

  const description =
    seo?.metaDescription ??
    profile?.tagline ??
    BRAND.tagline;

  const ogImage = resolveOgImageUrl(
    seo?.ogImage,
    siteSettings?.defaultOgImage,
  );

  const canonicalPath = seo?.canonicalPath ?? "/";

  return buildContentMetadata({
    title,
    description,
    canonicalPath,
    ogImage,
    ogImageAlt: seo?.ogImage?.alt ?? title,
    noIndex: seo?.noIndex,
  });
}

export function buildProjectsIndexMetadata(
  siteSettings: SiteSettings | null,
): Metadata {
  const og = resolveSiteOgImage(siteSettings);

  return buildContentMetadata({
    title: "Projects",
    description:
      "Game development case studies — gameplay systems, SDK work, integrations, and shipped titles.",
    canonicalPath: "/projects",
    ogImage: og.url,
    ogImageAlt: og.alt ?? "Projects",
  });
}

export function buildProjectDetailMetadata(
  project: ProjectDetail,
  siteSettings: SiteSettings | null,
): Metadata {
  const seo = project.seo;
  const title = seo?.metaTitle ?? project.title;
  const description =
    seo?.metaDescription ?? project.description ?? project.overview ?? BRAND.tagline;
  const canonicalPath = seo?.canonicalPath ?? `/projects/${project.slug}`;
  const ogImage = resolveOgImageUrl(
    seo?.ogImage,
    project.featuredImage ?? siteSettings?.defaultOgImage,
  );

  return buildContentMetadata({
    title,
    description,
    canonicalPath,
    ogImage,
    ogImageAlt: seo?.ogImage?.alt ?? project.featuredImage?.alt ?? title,
    noIndex: seo?.noIndex,
    openGraphType: "article",
  });
}

export function buildCreativeWorkJsonLd(
  project: ProjectDetail,
  siteSettings: SiteSettings | null,
) {
  const url = `${getSiteUrl()}/projects/${project.slug}`;
  const image =
    project.seo?.ogImage?.url ??
    project.featuredImage?.url ??
    siteSettings?.defaultOgImage?.url;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description ?? project.overview,
    url,
    ...(image ? { image } : {}),
    ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
    author: {
      "@type": "Person",
      name: BRAND.name,
      url: getSiteUrl(),
    },
    keywords: project.technologies?.join(", "),
    genre: project.category?.title,
    ...(() => {
      const sameAs = [project.playableUrl, project.githubUrl].filter(Boolean);
      return sameAs.length ? { sameAs } : {};
    })(),
  };
}

export function buildEngineeringIndexMetadata(
  siteSettings: SiteSettings | null,
): Metadata {
  const og = resolveSiteOgImage(siteSettings);

  return buildContentMetadata({
    title: "Engineering",
    description:
      "Technical thinking on SDK development, systems design, authentication, playables, validation, and debugging.",
    canonicalPath: "/engineering",
    ogImage: og.url,
    ogImageAlt: og.alt ?? "Engineering",
  });
}

export function buildEngineeringDetailMetadata(
  log: EngineeringLogDetail,
  siteSettings: SiteSettings | null,
): Metadata {
  const seo = log.seo;
  const title = seo?.metaTitle ?? log.title;
  const description =
    seo?.metaDescription ?? log.summary ?? log.problem ?? BRAND.tagline;
  const canonicalPath = seo?.canonicalPath ?? `/engineering/${log.slug}`;
  const ogImage = resolveOgImageUrl(seo?.ogImage, siteSettings?.defaultOgImage);

  return buildContentMetadata({
    title,
    description,
    canonicalPath,
    ogImage,
    ogImageAlt: seo?.ogImage?.alt ?? title,
    noIndex: seo?.noIndex,
    openGraphType: "article",
  });
}

export function buildExperiencePageMetadata(
  siteSettings: SiteSettings | null,
): Metadata {
  const og = resolveSiteOgImage(siteSettings);

  return buildContentMetadata({
    title: "Experience",
    description:
      "Career timeline — roles, accomplishments, technologies, and links to projects and engineering work.",
    canonicalPath: "/experience",
    ogImage: og.url,
    ogImageAlt: og.alt ?? "Experience",
  });
}

export function buildResumePageMetadata(
  profile: PersonProfile | null,
  siteSettings: SiteSettings | null,
): Metadata {
  const name = profile?.name ?? BRAND.name;
  const title = profile?.title ?? BRAND.title;
  const description =
    profile?.professionalSummary ??
    `${name} — ${title}. Online resume with downloadable PDF for recruiters and hiring managers.`;

  const ogImage = resolveOgImageUrl(
    profile?.profileImage ? { url: profile.profileImage.url } : null,
    siteSettings?.defaultOgImage,
  );

  return buildContentMetadata({
    title: "Resume",
    description,
    canonicalPath: "/resume",
    ogImage,
    ogImageAlt: profile?.profileImage?.alt ?? `${name} resume`,
  });
}

export function buildContactPageMetadata(
  profile: PersonProfile | null,
  siteSettings: SiteSettings | null,
): Metadata {
  const name = profile?.name ?? BRAND.name;
  const description =
    profile?.tagline ??
    `Contact ${name} about game development roles, collaborations, and technical opportunities.`;

  const ogImage = resolveOgImageUrl(null, siteSettings?.defaultOgImage);

  return buildContentMetadata({
    title: "Contact",
    description,
    canonicalPath: "/contact",
    ogImage,
    ogImageAlt: `Contact ${name}`,
  });
}

export function buildResumePageJsonLd(
  profile: PersonProfile | null,
  siteSettings: SiteSettings | null,
  experiences: Experience[],
) {
  const name = profile?.name ?? BRAND.name;
  const currentExperience = experiences[0];

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${name} — Resume`,
    url: `${getSiteUrl()}/resume`,
    mainEntity: {
      "@type": "Person",
      name,
      jobTitle: profile?.title ?? BRAND.title,
      description: profile?.professionalSummary ?? profile?.tagline ?? BRAND.tagline,
      url: `${getSiteUrl()}/resume`,
      email: siteSettings?.contactEmail,
      image: profile?.profileImage?.url ?? undefined,
      knowsAbout: profile?.expertiseAreas,
      sameAs: [siteSettings?.linkedinUrl, siteSettings?.githubUrl].filter(Boolean),
      worksFor: {
        "@type": "Organization",
        name: profile?.currentCompany ?? currentExperience?.company ?? BRAND.currentCompany,
      },
      ...(siteSettings?.resumeFile?.url
        ? {
            subjectOf: {
              "@type": "DigitalDocument",
              name: siteSettings.resumeFile.originalFilename ?? "Resume PDF",
              encodingFormat: "application/pdf",
              url: siteSettings.resumeFile.url,
            },
          }
        : {}),
    },
  };
}

export function buildExperienceTimelineJsonLd(experiences: Experience[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${BRAND.name} — Professional Experience`,
    itemListElement: experiences.map((experience, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "OrganizationRole",
        roleName: experience.role,
        description:
          experience.featuredAccomplishment ??
          experience.accomplishments?.[0] ??
          undefined,
        startDate: experience.startDate ?? undefined,
        endDate:
          experience.endDate && experience.endDate !== "Present"
            ? experience.endDate
            : undefined,
        memberOf: {
          "@type": "Organization",
          name: experience.company,
        },
        skills: experience.technologies?.join(", "),
      },
    })),
  };
}

export function buildDevlogsIndexMetadata(
  siteSettings: SiteSettings | null,
): Metadata {
  const og = resolveSiteOgImage(siteSettings);

  return buildContentMetadata({
    title: "Devlogs",
    description:
      "Growth journal — short-form updates on builds, experiments, learning, and in-progress game development work.",
    canonicalPath: "/devlogs",
    ogImage: og.url,
    ogImageAlt: og.alt ?? "Devlogs",
  });
}

export function buildDevlogDetailMetadata(
  devlog: DevlogDetail,
  siteSettings: SiteSettings | null,
): Metadata {
  const seo = devlog.seo;
  const title = seo?.metaTitle ?? devlog.title;
  const description = seo?.metaDescription ?? devlog.summary ?? BRAND.tagline;
  const canonicalPath = seo?.canonicalPath ?? `/devlogs/${devlog.slug}`;
  const ogImage = resolveOgImageUrl(seo?.ogImage, siteSettings?.defaultOgImage);

  return buildContentMetadata({
    title,
    description,
    canonicalPath,
    ogImage,
    ogImageAlt: seo?.ogImage?.alt ?? title,
    noIndex: seo?.noIndex,
    openGraphType: "article",
  });
}

export function buildDevlogArticleJsonLd(
  devlog: DevlogDetail,
  siteSettings: SiteSettings | null,
) {
  const url = `${getSiteUrl()}/devlogs/${devlog.slug}`;
  const image = devlog.seo?.ogImage?.url ?? siteSettings?.defaultOgImage?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: devlog.title,
    description: devlog.summary,
    url,
    mainEntityOfPage: url,
    ...(image ? { image } : {}),
    ...(devlog.publishedAt ? { datePublished: devlog.publishedAt } : {}),
    author: {
      "@type": "Person",
      name: BRAND.name,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Person",
      name: BRAND.name,
      url: getSiteUrl(),
    },
    keywords: devlog.tags?.join(", "),
    articleSection: "Devlog",
  };
}

export function buildDevlogFeedJsonLd(devlogs: DevlogCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BRAND.name} — Devlogs`,
    description: "Growth journal for game development progress and learning.",
    url: `${getSiteUrl()}/devlogs`,
    blogPost: devlogs.slice(0, 10).map((entry) => ({
      "@type": "BlogPosting",
      headline: entry.title,
      url: `${getSiteUrl()}/devlogs/${entry.slug}`,
      ...(entry.publishedAt ? { datePublished: entry.publishedAt } : {}),
    })),
  };
}

export function buildArticleJsonLd(
  log: EngineeringLogDetail,
  siteSettings: SiteSettings | null,
) {
  const url = `${getSiteUrl()}/engineering/${log.slug}`;
  const image = log.seo?.ogImage?.url ?? siteSettings?.defaultOgImage?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: log.title,
    description: log.summary ?? log.problem,
    url,
    mainEntityOfPage: url,
    ...(image ? { image } : {}),
    ...(log.publishedAt ? { datePublished: log.publishedAt } : {}),
    author: {
      "@type": "Person",
      name: BRAND.name,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Person",
      name: BRAND.name,
      url: getSiteUrl(),
    },
    keywords: log.technologies?.join(", "),
    articleSection: log.category?.title,
  };
}

export function buildPersonJsonLd(
  data: HomePageData | null,
  siteSettings: SiteSettings | null,
) {
  const profile = data?.personProfile;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name ?? BRAND.name,
    jobTitle: profile?.title ?? BRAND.title,
    description: profile?.tagline ?? BRAND.tagline,
    url: getSiteUrl(),
    email: siteSettings?.contactEmail,
    sameAs: [siteSettings?.linkedinUrl, siteSettings?.githubUrl].filter(Boolean),
  };
}

export function buildWebSiteJsonLd(siteSettings: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSettings?.siteName ?? `${BRAND.name} OS`,
    url: getSiteUrl(),
    description: BRAND.tagline,
  };
}

export function buildContactPageJsonLd(
  profile: PersonProfile | null,
  siteSettings: SiteSettings | null,
) {
  const name = profile?.name ?? BRAND.name;

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${name}`,
    url: `${getSiteUrl()}/contact`,
    description:
      profile?.tagline ??
      `Contact ${name} about game development roles and collaborations.`,
    mainEntity: {
      "@type": "Person",
      name,
      jobTitle: profile?.title ?? BRAND.title,
      url: getSiteUrl(),
      sameAs: [siteSettings?.linkedinUrl, siteSettings?.githubUrl].filter(Boolean),
    },
  };
}

export function buildProjectsCollectionJsonLd(projects: ProjectCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${BRAND.name} — Projects`,
    url: `${getSiteUrl()}/projects`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.slice(0, 20).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${getSiteUrl()}/projects/${project.slug}`,
        name: project.title,
      })),
    },
  };
}

export function buildEngineeringCollectionJsonLd(logs: EngineeringLogCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${BRAND.name} — Engineering`,
    url: `${getSiteUrl()}/engineering`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: logs.slice(0, 20).map((log, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${getSiteUrl()}/engineering/${log.slug}`,
        name: log.title,
      })),
    },
  };
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: `${BRAND.name} — ${BRAND.title}`,
      template: `%s | ${BRAND.name}`,
    },
    description: BRAND.tagline,
    applicationName: `${BRAND.name} OS`,
    creator: BRAND.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: getSiteUrl(),
      siteName: BRAND.name,
      title: `${BRAND.name} — ${BRAND.title}`,
      description: BRAND.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND.name} — ${BRAND.title}`,
      description: BRAND.tagline,
    },
  };
}
