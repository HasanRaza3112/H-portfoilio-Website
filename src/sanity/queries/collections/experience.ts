import { experienceCardField } from "../fragments";
import { publishedOnly } from "../fragments/publish";

export const experienceListQuery = `
  *[_type == "experience" && ${publishedOnly}] | order(order asc, startDate desc) ${experienceCardField}
`;

export const experienceByIdQuery = `
  *[_type == "experience" && _id == $id && ($preview == true || publishStatus == "published")][0]{
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
    companyLogo {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip
    },
    order,
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
    relatedEngineeringLogs[]->{
      _id,
      title,
      "slug": slug.current,
      summary
    }
  }
`;
