/**
 * TypeScript mirror of CSS design tokens (src/styles/tokens.css).
 * Use for programmatic access; styling should prefer Tailwind utilities + CSS vars.
 */
export const colors = {
  background: "#0b0d11",
  foreground: "#eef0f4",
  surface: "#12151c",
  surfaceSecondary: "#181c26",
  surfaceElevated: "#1e2430",
  textPrimary: "#eef0f4",
  textSecondary: "#8b93a3",
  textTertiary: "#6b7280",
  accent: "#5b8def",
  accentHover: "#7aa3f5",
  border: "#252b38",
  borderSubtle: "#1a1f2a",
  success: "#4ade80",
  warning: "#fbbf24",
  destructive: "#ef4444",
} as const;

export const typography = {
  display: { size: "3.5rem", lineHeight: 1.08, letterSpacing: "-0.03em" },
  h1: { size: "2.5rem", lineHeight: 1.12, letterSpacing: "-0.025em" },
  h2: { size: "2rem", lineHeight: 1.15, letterSpacing: "-0.02em" },
  h3: { size: "1.5rem", lineHeight: 1.25, letterSpacing: "-0.015em" },
  h4: { size: "1.25rem", lineHeight: 1.3, letterSpacing: "-0.01em" },
  bodyLg: { size: "1.125rem", lineHeight: 1.65 },
  body: { size: "1rem", lineHeight: 1.7 },
  bodySm: { size: "0.875rem", lineHeight: 1.6 },
  caption: { size: "0.75rem", lineHeight: 1.5 },
  overline: { size: "0.6875rem", lineHeight: 1.4, letterSpacing: "0.12em" },
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  sectionSm: "3rem",
  sectionMd: "4rem",
  sectionLg: "6rem",
  gutter: "1.5rem",
} as const;

export const containers = {
  narrow: "45rem",
  content: "72rem",
  wide: "80rem",
  padding: "1.5rem",
} as const;

export const radii = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const shadows = {
  xs: "0 1px 2px rgb(0 0 0 / 40%)",
  sm: "0 2px 8px rgb(0 0 0 / 35%)",
  md: "0 4px 16px rgb(0 0 0 / 45%)",
  lg: "0 8px 32px rgb(0 0 0 / 50%)",
  panel: "panel",
  elevated: "elevated",
  accent: "accent",
} as const;

export const motion = {
  duration: {
    instant: 100,
    fast: 150,
    normal: 250,
    slow: 400,
    slower: 600,
  },
  ease: {
    standard: [0.4, 0, 0.2, 1] as const,
    out: [0, 0, 0.2, 1] as const,
    inOut: [0.4, 0, 0.6, 1] as const,
    emphasis: [0.2, 0.8, 0.2, 1] as const,
  },
} as const;

export const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  containers,
  radii,
  shadows,
  motion,
  breakpoints,
} as const;

export type DesignTokens = typeof designTokens;
