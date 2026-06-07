import { missionItemProjection } from "../fragments";

export const currentMissionQuery = `
  *[_type == "currentMission" && _id == "currentMission"][0]{
    sectionTitle,
    sectionDescription,
    items[]{
      ${missionItemProjection}
    }
  }
`;
