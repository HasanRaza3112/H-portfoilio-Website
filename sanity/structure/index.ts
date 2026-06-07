import type { StructureResolver } from "sanity/structure";

import { singletonListItem } from "./singletons";

const collectionTypes = [
  "project",
  "projectCategory",
  "engineeringLog",
  "devlog",
  "experience",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Mohammed Hasan Raza OS")
    .items([
      S.listItem()
        .title("Site Configuration")
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              singletonListItem(S, {
                type: "siteSettings",
                title: "Site Settings",
                id: "siteSettings",
              }),
              singletonListItem(S, {
                type: "personProfile",
                title: "Person Profile",
                id: "personProfile",
              }),
              singletonListItem(S, {
                type: "homepage",
                title: "Homepage",
                id: "homepage",
              }),
              singletonListItem(S, {
                type: "currentMission",
                title: "Current Mission",
                id: "currentMission",
              }),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Projects")
        .child(
          S.list()
            .title("Projects")
            .items([
              S.documentTypeListItem("project").title("All Projects"),
              S.documentTypeListItem("projectCategory")
                .title("Categories")
                .child(
                  S.documentList()
                    .title("Project Categories")
                    .filter('_type == "projectCategory"'),
                ),
            ]),
        ),
      S.documentTypeListItem("engineeringLog").title("Engineering Logs"),
      S.documentTypeListItem("devlog").title("Devlogs"),
      S.documentTypeListItem("experience").title("Experience"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !collectionTypes.includes(item.getId() ?? "") &&
          !["siteSettings", "personProfile", "homepage", "currentMission"].includes(
            item.getId() ?? "",
          ),
      ),
    ]);
