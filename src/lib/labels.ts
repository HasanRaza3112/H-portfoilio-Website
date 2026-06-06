import type {
  EngineeringCategory,
  ProjectCategory,
} from "@/sanity/schemas/content";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  gameplay: "Gameplay",
  sdk: "SDK",
  tools: "Tools",
  "playable-ads": "Playable Ads",
  integration: "Integration",
};

export const engineeringCategoryLabels: Record<EngineeringCategory, string> = {
  "sdk-development": "SDK Development",
  "playable-ads": "Playable Ads",
  "wallet-systems": "Wallet Systems",
  authentication: "Authentication",
  "clan-systems": "Clan Systems",
  "validation-tools": "Validation Tools",
  "architecture-notes": "Architecture Notes",
  "debugging-stories": "Debugging Stories",
};

export const missionStatusLabels = {
  active: "Active",
  completed: "Completed",
  upcoming: "Upcoming",
} as const;
