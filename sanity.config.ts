import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schema } from "./sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "hasan-portfolio",
  title: "Mohammed Hasan Raza — Portfolio CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema,
});
