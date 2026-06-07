import { type SchemaTypeDefinition } from "sanity";

import { devlog, engineeringLog, experience } from "./schemas/documents/content";
import { project, projectCategory } from "./schemas/documents/project";
import {
  callout,
  codeBlock,
  missionItem,
  portableText,
  videoEmbed,
} from "./schemas/objects/portableText";
import { publishMeta, seo } from "./schemas/objects/seo";
import { currentMission, homepage } from "./schemas/singletons/homepage";
import { personProfile, siteSettings } from "./schemas/singletons/siteSettings";

const objects: SchemaTypeDefinition[] = [
  seo,
  publishMeta,
  portableText,
  codeBlock,
  callout,
  videoEmbed,
  missionItem,
];

const singletons: SchemaTypeDefinition[] = [
  siteSettings,
  personProfile,
  homepage,
  currentMission,
];

const documents: SchemaTypeDefinition[] = [
  projectCategory,
  project,
  engineeringLog,
  devlog,
  experience,
];

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objects,
  ...singletons,
  ...documents,
];

export const schema = {
  types: schemaTypes,
};
