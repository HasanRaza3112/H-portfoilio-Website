import { imageField } from "../fragments/image";

export const personProfileQuery = `
  *[_type == "personProfile" && _id == "personProfile"][0]{
    name,
    title,
    tagline,
    profileImage ${imageField},
    currentRole,
    currentCompany,
    expertiseAreas,
    professionalSummary
  }
`;
