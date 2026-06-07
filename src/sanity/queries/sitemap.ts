export const sitemapDataQuery = `{
  "projects": *[_type == "project" && publishStatus == "published" && defined(slug.current) && coalesce(seo.noIndex, false) != true]{
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  },
  "engineeringLogs": *[_type == "engineeringLog" && publishStatus == "published" && defined(slug.current) && coalesce(seo.noIndex, false) != true]{
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  },
  "devlogs": *[_type == "devlog" && publishStatus == "published" && defined(slug.current) && coalesce(seo.noIndex, false) != true]{
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
}`;
