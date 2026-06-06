import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-primary underline-offset-4 hover:underline">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    ...components,
  };
}
