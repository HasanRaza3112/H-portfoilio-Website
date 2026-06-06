const slugField = `"slug": slug.current`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  name,
  title,
  tagline,
  currentRole,
  currentCompany,
  email,
  linkedin,
  github,
  "resumeUrl": resume.asset->url,
  expertiseAreas
}`;

export const missionsQuery = `*[_type == "mission"] | order(order asc){
  label,
  status,
  description
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(_createdAt desc)[0...3]{
  ${slugField},
  title,
  summary,
  category,
  featured,
  techStack
}`;

export const allProjectsQuery = `*[_type == "project"] | order(_createdAt desc){
  ${slugField},
  title,
  summary,
  category,
  featured,
  techStack
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  ${slugField},
  title,
  summary,
  category,
  featured,
  techStack,
  overview,
  responsibilities,
  challenges,
  solutions,
  lessonsLearned,
  externalLinks,
  gallery[]{
    "url": asset->url,
    alt
  }
}`;

export const projectSlugsQuery = `*[_type == "project"]{ "slug": slug.current }`;

export const allEngineeringQuery = `*[_type == "engineeringArticle"] | order(publishedAt desc){
  ${slugField},
  title,
  summary,
  category,
  publishedAt,
  readTime
}`;

export const engineeringBySlugQuery = `*[_type == "engineeringArticle" && slug.current == $slug][0]{
  ${slugField},
  title,
  summary,
  category,
  publishedAt,
  readTime,
  "body": pt::text(content)
}`;

export const engineeringSlugsQuery = `*[_type == "engineeringArticle"]{ "slug": slug.current }`;

export const allDevlogsQuery = `*[_type == "devlog"] | order(publishedAt desc){
  ${slugField},
  title,
  summary,
  publishedAt,
  tags
}`;

export const devlogBySlugQuery = `*[_type == "devlog" && slug.current == $slug][0]{
  ${slugField},
  title,
  summary,
  publishedAt,
  tags,
  "body": pt::text(content)
}`;

export const devlogSlugsQuery = `*[_type == "devlog"]{ "slug": slug.current }`;

export const latestDevlogsQuery = `*[_type == "devlog"] | order(publishedAt desc)[0...3]{
  ${slugField},
  title,
  summary,
  publishedAt,
  tags
}`;

export const experienceQuery = `*[_type == "experience"] | order(order asc){
  "id": _id,
  role,
  company,
  period,
  location,
  accomplishments
}`;
