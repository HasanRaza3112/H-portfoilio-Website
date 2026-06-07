import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { PortableTextBlock } from "@/types";

type PortableTextValue = PortableTextBlock[] | null | undefined;

interface SpanNode {
  _type: "span";
  _key?: string;
  text?: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
  openInNewTab?: boolean;
  reference?: {
    _type?: string;
    slug?: string;
    title?: string;
  };
}

interface BlockNode extends PortableTextBlock {
  _type: "block";
  style?: string;
  children?: SpanNode[];
  markDefs?: MarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
}

interface CodeBlockNode extends PortableTextBlock {
  _type: "codeBlock";
  language?: string;
  filename?: string;
  code?: string;
}

interface CalloutNode extends PortableTextBlock {
  _type: "callout";
  tone?: "info" | "warning" | "success";
  body?: string;
}

function isBlockNode(node: PortableTextBlock): node is BlockNode {
  return node._type === "block";
}

function isCodeBlockNode(node: PortableTextBlock): node is CodeBlockNode {
  return node._type === "codeBlock";
}

function isCalloutNode(node: PortableTextBlock): node is CalloutNode {
  return node._type === "callout";
}

function resolveInternalHref(reference?: MarkDef["reference"]): string | null {
  if (!reference?._type || !reference.slug) {
    return null;
  }

  switch (reference._type) {
    case "project":
      return `/projects/${reference.slug}`;
    case "engineeringLog":
      return `/engineering/${reference.slug}`;
    case "devlog":
      return `/devlogs/${reference.slug}`;
    default:
      return null;
  }
}

function renderSpan(
  span: SpanNode,
  markDefs: MarkDef[] = [],
  key: string,
): React.ReactNode {
  const text = span.text ?? "";
  if (!text) {
    return null;
  }

  let element: React.ReactNode = text;

  for (const mark of span.marks ?? []) {
    if (mark === "strong") {
      element = <strong key={`${key}-strong`}>{element}</strong>;
      continue;
    }

    if (mark === "em") {
      element = <em key={`${key}-em`}>{element}</em>;
      continue;
    }

    if (mark === "code") {
      element = (
        <code
          key={`${key}-code`}
          className="rounded-sm bg-surface-secondary px-1.5 py-0.5 font-mono text-body-sm text-accent"
        >
          {element}
        </code>
      );
      continue;
    }

    const markDef = markDefs.find((def) => def._key === mark);
    if (!markDef) {
      continue;
    }

    if (markDef._type === "link" && markDef.href) {
      element = (
        <a
          key={`${key}-link`}
          href={markDef.href}
          className="text-accent underline-offset-4 hover:underline"
          target={markDef.openInNewTab ? "_blank" : undefined}
          rel={markDef.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {element}
        </a>
      );
      continue;
    }

    if (markDef._type === "internalLink") {
      const href = resolveInternalHref(markDef.reference);
      element = href ? (
        <Link
          key={`${key}-internal`}
          href={href}
          className="text-accent underline-offset-4 hover:underline"
        >
          {element}
        </Link>
      ) : (
        element
      );
    }
  }

  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function renderBlockChildren(block: BlockNode): React.ReactNode {
  return block.children?.map((child, index) =>
    renderSpan(child, block.markDefs, `${block._key ?? "block"}-${index}`),
  );
}

const calloutToneStyles = {
  info: "border-border-accent bg-accent-subtle text-foreground",
  warning: "border-warning/30 bg-warning-subtle text-foreground",
  success: "border-success/30 bg-success-subtle text-foreground",
} as const;

function renderBlock(block: BlockNode): React.ReactNode {
  const style = block.style ?? "normal";

  switch (style) {
    case "h2":
      return (
        <h2 key={block._key} className="text-h2 mt-10 mb-4 text-balance">
          {renderBlockChildren(block)}
        </h2>
      );
    case "h3":
      return (
        <h3 key={block._key} className="text-h3 mt-8 mb-3 text-balance">
          {renderBlockChildren(block)}
        </h3>
      );
    case "blockquote":
      return (
        <blockquote
          key={block._key}
          className="my-6 border-l-2 border-border-accent pl-4 text-body-lg text-muted italic"
        >
          {renderBlockChildren(block)}
        </blockquote>
      );
    default:
      return (
        <p key={block._key} className="text-body text-muted mb-4 text-pretty last:mb-0">
          {renderBlockChildren(block)}
        </p>
      );
  }
}

function renderListItem(block: BlockNode, index: number): React.ReactNode {
  const key = block._key ?? `list-${index}`;
  const content = renderBlockChildren(block);

  if (block.listItem === "number") {
    return (
      <li key={key} className="text-body text-muted pl-1">
        {content}
      </li>
    );
  }

  return (
    <li key={key} className="text-body text-muted pl-1 marker:text-accent">
      {content}
    </li>
  );
}

function groupListBlocks(blocks: PortableTextBlock[]): React.ReactNode[] {
  const output: React.ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const node = blocks[index];
    if (!node) {
      break;
    }

    if (isBlockNode(node) && node.listItem) {
      const listType = node.listItem;
      const items: BlockNode[] = [];

      while (index < blocks.length) {
        const current = blocks[index];
        if (!current || !isBlockNode(current) || current.listItem !== listType) {
          break;
        }
        items.push(current);
        index += 1;
      }

      const ListTag = listType === "number" ? "ol" : "ul";
      output.push(
        <ListTag
          key={`list-${items[0]?._key ?? index}`}
          className={cn(
            "my-4 space-y-2 pl-5",
            listType === "number" ? "list-decimal" : "list-disc",
          )}
        >
          {items.map((item, itemIndex) => renderListItem(item, itemIndex))}
        </ListTag>,
      );
      continue;
    }

    output.push(renderNode(node, index));
    index += 1;
  }

  return output;
}

function renderCodeBlock(node: CodeBlockNode, index: number): React.ReactNode {
  return (
    <figure key={node._key ?? `code-${index}`} className="my-6 overflow-hidden rounded-lg border border-border-subtle bg-surface-secondary shadow-panel">
      {node.filename ? (
        <figcaption className="border-b border-border-subtle px-4 py-2 font-mono text-caption text-muted-foreground">
          {node.filename}
          {node.language ? (
            <span className="ml-2 text-text-tertiary">· {node.language}</span>
          ) : null}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-body-sm leading-relaxed text-foreground">
        <code>{node.code}</code>
      </pre>
    </figure>
  );
}

function renderCallout(node: CalloutNode, index: number): React.ReactNode {
  const tone = node.tone ?? "info";

  return (
    <aside
      key={node._key ?? `callout-${index}`}
      className={cn(
        "my-6 rounded-lg border px-4 py-3 text-body-sm text-pretty",
        calloutToneStyles[tone],
      )}
    >
      {node.body}
    </aside>
  );
}

function renderNode(node: PortableTextBlock, index: number): React.ReactNode {
  if (isCodeBlockNode(node)) {
    return renderCodeBlock(node, index);
  }

  if (isCalloutNode(node)) {
    return renderCallout(node, index);
  }

  if (isBlockNode(node) && !node.listItem) {
    return renderBlock(node);
  }

  return null;
}

export interface RichTextProps {
  value: PortableTextValue;
  className?: string;
}

/**
 * Renders Sanity Portable Text aligned with Phase 2 CMS schema.
 */
export function RichText({ value, className }: RichTextProps) {
  if (!value?.length) {
    return null;
  }

  return (
    <div className={cn("rich-text max-w-none", className)}>
      {groupListBlocks(value)}
    </div>
  );
}
