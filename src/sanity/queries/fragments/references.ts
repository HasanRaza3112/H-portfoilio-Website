import { categoryField } from "./category";
import { imageField } from "./image";

export const projectCardProjection = `
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
  featuredImage ${imageField}
`;

export const projectCardField = `{ ${projectCardProjection} }`;

export const projectDetailProjection = `
  ${projectCardProjection},
  overview,
  teamSize,
  challenges,
  solutions,
  lessonsLearned,
  githubUrl,
  playableUrl,
  featuredRank,
  publishStatus,
  publishedAt,
  gallery[] {
    ${imageField.replace(/\n/g, "\n    ")},
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
  }
`;

export const engineeringLogCardProjection = `
  _id,
  title,
  "slug": slug.current,
  summary,
  readTime,
  technologies,
  publishedAt,
  category->${categoryField}
`;

export const engineeringLogCardField = `{ ${engineeringLogCardProjection} }`;

export const devlogCardProjection = `
  _id,
  title,
  "slug": slug.current,
  summary,
  tags,
  publishedAt
`;

export const devlogCardField = `{ ${devlogCardProjection} }`;

export const experienceCardProjection = `
  _id,
  company,
  role,
  location,
  startDate,
  endDate,
  duration,
  technologies,
  responsibilities,
  accomplishments,
  featuredAccomplishment,
  companyLogo ${imageField},
  order,
  relatedProjects[]->{
    _id,
    title,
    "slug": slug.current,
    description
  },
  relatedEngineeringLogs[]->{
    _id,
    title,
    "slug": slug.current,
    summary
  }
`;

export const experienceCardField = `{ ${experienceCardProjection} }`;

export const missionItemProjection = `
  _key,
  label,
  status,
  description,
  relatedProject->{
    _id,
    title,
    "slug": slug.current
  },
  relatedEngineeringLog->{
    _id,
    title,
    "slug": slug.current
  }
`;
