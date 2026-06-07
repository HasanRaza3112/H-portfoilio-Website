import { portableTextProjection } from "../fragments/portableText";
import { categoryField } from "../fragments/category";
import { publishedOnly } from "../fragments/publish";

export const engineeringLogsListQuery = `
  *[_type == "engineeringLog" && ${publishedOnly}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    readTime,
    technologies,
    publishedAt,
    category->${categoryField}
  }
`;

export const engineeringLogBySlugQuery = `
  *[_type == "engineeringLog" && slug.current == $slug && ($preview == true || publishStatus == "published")][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    problem,
    context,
    solution,
    tradeoffs,
    outcome,
    technologies,
    readTime,
    publishStatus,
    publishedAt,
    category->${categoryField},
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

export const engineeringLogSlugsQuery = `
  *[_type == "engineeringLog" && publishStatus == "published" && defined(slug.current)]{
    "slug": slug.current
  }.slug
`;
