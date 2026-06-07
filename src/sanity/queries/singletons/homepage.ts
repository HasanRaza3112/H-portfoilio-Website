import {
  devlogCardField,
  engineeringLogCardField,
  experienceCardField,
  missionItemProjection,
  projectCardField,
} from "../fragments";
import { seoProjection } from "../fragments/seo";

/** Single round-trip homepage payload — no duplicate singleton fetches. */
export const homePageQuery = `
{
  "personProfile": *[_type == "personProfile" && _id == "personProfile"][0]{
    name,
    title,
    tagline,
    currentRole,
    currentCompany,
    expertiseAreas
  },
  "homepage": *[_type == "homepage" && _id == "homepage"][0]{
    heroEyebrow,
    showMissionSection,
    showExperienceSnapshot,
    showDevlogsSection,
    contactCtaHeadline,
    contactCtaDescription,
    ${seoProjection},
    featuredProjects[]->${projectCardField},
    featuredEngineeringLogs[]->${engineeringLogCardField},
    experienceSnapshot->${experienceCardField},
    featuredDevlogs[]->${devlogCardField}
  },
  "currentMission": *[_type == "currentMission" && _id == "currentMission"][0]{
    sectionTitle,
    sectionDescription,
    items[]{
      ${missionItemProjection}
    }
  }
}
`;
