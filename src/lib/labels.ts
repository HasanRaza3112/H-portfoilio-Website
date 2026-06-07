export const projectStatusLabels = {
  shipped: "Shipped",
  "in-progress": "In Progress",
  confidential: "Confidential",
} as const;

export const missionStatusLabels = {
  active: "Active",
  completed: "Completed",
  upcoming: "Upcoming",
} as const;

export const missionStatusBadgeVariant = {
  active: "default",
  completed: "success",
  upcoming: "secondary",
} as const;

export const projectStatusBadgeVariant = {
  shipped: "success",
  "in-progress": "warning",
  confidential: "secondary",
} as const;
