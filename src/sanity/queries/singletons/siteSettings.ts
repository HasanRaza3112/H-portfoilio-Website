import { imageField } from "../fragments/image";
import { seoProjection } from "../fragments/seo";

export const siteSettingsQuery = `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    contactEmail,
    linkedinUrl,
    githubUrl,
    resumeFile {
      "url": asset->url,
      "originalFilename": asset->originalFilename
    },
    defaultOgImage ${imageField},
    ${seoProjection}
  }
`;
