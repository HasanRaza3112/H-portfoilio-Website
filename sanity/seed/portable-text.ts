/** Minimal Portable Text blocks for Sanity seed scripts. */

export function textBlock(text: string, style: "normal" | "h2" | "h3" | "blockquote" = "normal") {
  return {
    _type: "block" as const,
    _key: crypto.randomUUID(),
    style,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: crypto.randomUUID(),
        text,
        marks: [],
      },
    ],
  };
}

export function bulletBlock(text: string) {
  return {
    _type: "block" as const,
    _key: crypto.randomUUID(),
    style: "normal" as const,
    listItem: "bullet" as const,
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: crypto.randomUUID(),
        text,
        marks: [],
      },
    ],
  };
}

export function portableText(blocks: ReturnType<typeof textBlock>[]) {
  return blocks;
}
