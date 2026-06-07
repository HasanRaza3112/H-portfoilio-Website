import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { previewUrlConfig } from "./sanity/lib/preview";
import { schema } from "./sanity/schema";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "hasan-portfolio",
  title: "Mohammed Hasan Raza OS — CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
  schema,
  ...previewUrlConfig,
});
