import { categoryField } from "../fragments/category";
import { publishedOnly } from "../fragments/publish";

export const projectCategoriesQuery = `
  *[_type == "projectCategory"] | order(title asc) ${categoryField}
`;

export const projectsListQuery = `
  *[_type == "project" && ${publishedOnly}] | order(featured desc, featuredRank asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    role,
    status,
    duration,
    featured,
    technologies,
    category->${categoryField},
    featuredImage {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug && ($preview == true || publishStatus == "published")][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    overview,
    role,
    teamSize,
    duration,
    status,
    technologies,
    challenges,
    solutions,
    lessonsLearned,
    githubUrl,
    playableUrl,
    featured,
    featuredRank,
    publishStatus,
    publishedAt,
    category->${categoryField},
    featuredImage {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip
    },
    gallery[] {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip,
      caption
    },
    videos[] {
      _key,
      title,
      url,
      provider
    },
    relatedEngineeringLogs[]->{
      _id,
      title,
      "slug": slug.current,
      summary
    },
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

export const projectSlugsQuery = `
  *[_type == "project" && publishStatus == "published" && defined(slug.current)]{
    "slug": slug.current
  }.slug
`;
