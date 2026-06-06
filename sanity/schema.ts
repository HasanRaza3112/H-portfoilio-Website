import { type SchemaTypeDefinition } from "sanity";

import { devlog } from "./schemas/devlog";
import { engineeringArticle } from "./schemas/engineeringArticle";
import { experience } from "./schemas/experience";
import { mission } from "./schemas/mission";
import { project } from "./schemas/project";
import { siteSettings } from "./schemas/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, mission, project, engineeringArticle, devlog, experience],
};
