import { portableTextProjection } from "../fragments/portableText";
import { publishedOnly } from "../fragments/publish";

export const devlogsListQuery = `
  *[_type == "devlog" && ${publishedOnly}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    tags,
    publishedAt
  }
`;

export const devlogBySlugQuery = `
  *[_type == "devlog" && slug.current == $slug && ($preview == true || publishStatus == "published")][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    tags,
    publishStatus,
    publishedAt,
    relatedProjects[]->{
      _id,
      title,
      "slug": slug.current,
      description,
      featuredImage {
        "url": asset->url,
        alt,
        "lqip": asset->metadata.lqip
      }
    },
    ${portableTextProjection},
    seo {
      metaTitle,
      metaDescription,
      canonicalPath,
      noIndex,
      ogImage {
        "url": asset->url,
        alt
      }
    }
  }
`;

export const devlogSlugsQuery = `
  *[_type == "devlog" && publishStatus == "published" && defined(slug.current)]{
    "slug": slug.current
  }.slug
`;
