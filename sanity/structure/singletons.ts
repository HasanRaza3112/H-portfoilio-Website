import type { StructureBuilder } from "sanity/structure";

interface SingletonConfig {
  type: string;
  title: string;
  id: string;
}

export function singletonListItem(
  S: StructureBuilder,
  { type, title, id }: SingletonConfig,
) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(
      S.document()
        .schemaType(type)
        .documentId(id)
        .title(title),
    );
}
