# Lovable Seed Context File

This file compiles the codebase structure and key configuration/wiring files for Hasan's Portfolio Website to provide context for UI redesigns.

---

## 1. Tailwind v4 Theme + Globals

### `postcss.config.mjs`
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### `src/app/globals.css`
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "../styles/tokens.css";

@layer base {
  *,
  *::before,
  *::after {
    border-color: var(--border);
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    position: relative;
    background-color: var(--background);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: var(--text-body-size);
    line-height: var(--text-body-height);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -9;
    pointer-events: none;
    background-image: radial-gradient(
      rgba(255, 70, 85, 0.03) 1px,
      transparent 0
    );
    background-size: 24px 24px;
  }

  ::selection {
    background-color: var(--accent-subtle);
    color: var(--text-primary);
  }

  :focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .text-pretty {
    text-wrap: pretty;
  }

  .font-heading {
    font-family: var(--font-heading);
  }

  .shadow-panel {
    box-shadow: var(--shadow-panel);
  }

  .shadow-elevated {
    box-shadow: var(--shadow-elevated);
  }

  .shadow-accent {
    box-shadow: var(--shadow-accent);
  }

  .shadow-glow-red {
    box-shadow: var(--shadow-glow-red);
  }

  .shadow-glow-crimson {
    box-shadow: var(--shadow-glow-crimson);
  }

  .transition-colors-token {
    transition: var(--transition-colors);
  }

  .max-w-container-narrow {
    max-width: var(--container-narrow);
  }

  .max-w-container-content {
    max-width: var(--container-content);
  }

  .max-w-container-wide {
    max-width: var(--container-wide);
  }

  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  .hud-clip {
    clip-path: var(--hud-clip-path);
  }

  .glow-mesh {
    position: relative;
    isolation: isolate;
    overflow: hidden;
  }

  .glow-mesh::before {
    content: "";
    position: absolute;
    inset: -20% -10%;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 55% 45% at 15% 35%,
        rgba(255, 70, 85, 0.12),
        transparent 65%
      ),
      radial-gradient(
        ellipse 40% 35% at 85% 70%,
        rgba(255, 181, 71, 0.06),
        transparent 60%
      );
  }

  /* ─── HUD Buttons ─── */
  .btn-hud {
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .btn-hud > * {
    position: relative;
    z-index: 1;
  }

  .btn-hud-primary::before,
  .btn-hud-primary::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid transparent;
    opacity: 0;
    transition:
      opacity var(--duration-fast) var(--ease-standard),
      border-color var(--duration-fast) var(--ease-standard);
    pointer-events: none;
    z-index: 2;
  }

  .btn-hud-primary::before {
    top: 2px;
    left: 2px;
    border-top-color: var(--accent-foreground);
    border-left-color: var(--accent-foreground);
  }

  .btn-hud-primary::after {
    bottom: 2px;
    right: 2px;
    border-bottom-color: var(--accent-foreground);
    border-right-color: var(--accent-foreground);
  }

  .btn-hud-primary:hover::before,
  .btn-hud-primary:hover::after,
  .btn-hud-primary:focus-visible::before,
  .btn-hud-primary:focus-visible::after {
    opacity: 1;
  }

  .btn-hud-secondary::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--accent);
    transform: translateX(-101%);
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .btn-hud-secondary:hover::before,
  .btn-hud-secondary:focus-visible::before {
    transform: translateX(0);
  }

  /* ─── HUD Cards ─── */
  .card-hud::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 4px,
      rgba(255, 70, 85, 0.04) 4px,
      rgba(255, 70, 85, 0.04) 8px
    );
    transition: opacity var(--duration-normal) var(--ease-standard);
  }

  .card-hud:hover::after,
  .card-hud:focus-within::after {
    opacity: 1;
  }

  .card-hud > * {
    position: relative;
    z-index: 1;
  }

  /* ─── Console Navigation ─── */
  .nav-console-link {
    position: relative;
  }

  .nav-console-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--accent) 50%,
      transparent
    );
    opacity: 0;
    transform: scaleX(0.6);
    transition:
      opacity var(--duration-fast) var(--ease-standard),
      transform var(--duration-normal) var(--ease-out);
    box-shadow: 0 0 8px rgba(255, 70, 85, 0.5);
  }

  .nav-console-link:hover::after,
  .nav-console-link--active::after {
    opacity: 1;
    transform: scaleX(1);
  }

  /* ─── Hero 3D Viewport Panel ─── */
  .hero-viewport-panel {
    clip-path: var(--hud-clip-path);
    border: 1px solid var(--border-accent);
    background: var(--surface-secondary);
    box-shadow:
      var(--shadow-accent),
      inset 0 0 0 1px rgba(255, 70, 85, 0.08);
  }

  .hero-viewport-grid {
    background-image:
      linear-gradient(rgba(255, 70, 85, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 70, 85, 0.06) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 85%);
    -webkit-mask-image: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      black 20%,
      transparent 85%
    );
    opacity: 0.5;
  }

  /* ─── Mobile HUD Terminal ─── */
  .gaming-menu-panel {
    background:
      linear-gradient(180deg, rgba(255, 70, 85, 0.05) 0%, transparent 40%),
      var(--surface);
    box-shadow:
      inset 0 0 0 1px rgba(255, 70, 85, 0.2),
      0 0 40px rgba(255, 70, 85, 0.1);
  }

  .gaming-menu-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(255, 70, 85, 0.02) 3px,
      rgba(255, 70, 85, 0.02) 6px
    );
  }

  .site-bg__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 65% at 50% 45%,
      transparent 35%,
      rgba(8, 8, 10, 0.8) 100%
    );
  }

  .status-pulse {
    animation: status-pulse 2s ease-in-out infinite;
  }

  .status-breathe {
    animation: status-breathe 3s ease-in-out infinite;
  }

  @keyframes status-pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
    }

    50% {
      box-shadow: 0 0 0 6px rgba(255, 181, 71, 0);
    }
  }

  @keyframes status-breathe {
    0%,
    100% {
      opacity: 0.35;
      transform: translateY(-50%) scale(1);
    }

    50% {
      opacity: 0.75;
      transform: translateY(-50%) scale(1.35);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status-pulse,
    .status-breathe {
      animation: none;
    }

    .btn-hud-secondary::before {
      transition: none;
    }

    .btn-hud-primary::before,
    .btn-hud-primary::after {
      transition: none;
    }

    .card-hud::after {
      transition: none;
    }
  }
}
```

### `src/styles/tokens.css` (Tailwind v4 theme `@theme` configuration)
```css
/*
 * Mohammed Hasan Raza OS — Design Tokens
 * Valorant / Destiny 2 HUD · Neon Crimson · Obsidian · Tactical Amber
 * Do not hardcode values in components — reference tokens.
 */

:root {
  color-scheme: dark;

  /* ─── Color: Base ─── */
  --background: #08080a;
  --foreground: #eef0f4;
  --surface: #0d0d12;
  --surface-secondary: #14141b;
  --surface-elevated: #1b1b24;
  --surface-overlay: #22222c;

  /* ─── Color: Text ─── */
  --text-primary: #eef0f4;
  --text-secondary: #8b93a3;
  --text-tertiary: #6b7280;
  --text-muted: #b4bac6;

  /* ─── Color: Accent & Status ─── */
  --accent: #ff4655;
  --accent-hover: #ff6e7a;
  --accent-muted: #9c1c26;
  --accent-foreground: #ffffff;
  --accent-subtle: rgba(255, 70, 85, 0.08);

  /* ─── Color: shadcn / semantic ─── */
  --primary: #ff4655;
  --primary-foreground: #ffffff;
  --secondary: #14141b;
  --secondary-foreground: #eef0f4;
  --card: #0d0d12;
  --card-foreground: #eef0f4;
  --ring: #ff4655;

  --success: #4ade80;
  --success-subtle: rgb(74 222 128 / 12%);
  --amber: #ffb547;
  --amber-subtle: rgba(255, 181, 71, 0.12);
  --warning: #ffb547;
  --warning-subtle: rgba(255, 181, 71, 0.12);
  --destructive: #ef4444;
  --destructive-subtle: rgb(239 68 68 / 12%);

  /* ─── Color: Border ─── */
  --border: #1a1a24;
  --border-subtle: #13131a;
  --border-strong: #2a2a36;
  --border-accent: rgba(255, 70, 85, 0.3);

  /* ─── Typography: Families ─── */
  --font-sans: var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif);
  --font-mono: var(--font-geist-mono, ui-monospace, "Cascadia Code", monospace);
  --font-heading: var(--font-sans);

  /* ─── Typography: Scale ─── */
  --text-display-size: clamp(2.25rem, 5vw, 3.25rem);
  --text-display-height: 1.08;
  --text-display-tracking: 0;

  --text-h1-size: clamp(1.75rem, 5vw, 2.5rem);
  --text-h1-height: 1.12;
  --text-h1-tracking: 0;

  --text-h2-size: clamp(1.5rem, 4vw, 2rem);
  --text-h2-height: 1.15;
  --text-h2-tracking: 0;

  --text-h3-size: clamp(1.25rem, 3vw, 1.5rem);
  --text-h3-height: 1.25;
  --text-h3-tracking: 0;

  --text-h4-size: clamp(1.0625rem, 2.5vw, 1.25rem);
  --text-h4-height: 1.3;
  --text-h4-tracking: 0;

  --text-body-lg-size: clamp(1rem, 2vw, 1.125rem);
  --text-body-lg-height: 1.65;

  --text-body-size: 1rem;
  --text-body-height: 1.7;

  --text-body-sm-size: clamp(0.8125rem, 1.5vw, 0.875rem);
  --text-body-sm-height: 1.6;

  --text-caption-size: clamp(0.6875rem, 1.25vw, 0.75rem);
  --text-caption-height: 1.5;

  --text-overline-size: 0.6875rem;
  --text-overline-height: 1.4;
  --text-overline-tracking: 0.12em;

  /* ─── Spacing: Scale ─── */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* ─── Spacing: Semantic ─── */
  --space-section-sm: var(--space-12);
  --space-section-md: var(--space-16);
  --space-section-lg: var(--space-24);
  --space-gutter: var(--space-6);
  --space-gutter-lg: var(--space-8);

  /* ─── Container ─── */
  --container-padding: var(--space-gutter);
  --container-narrow: 45rem;
  --container-content: 72rem;
  --container-wide: 80rem;

  /* ─── Border Radius ─── */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-xl: 0.5rem;
  --radius-full: 9999px;
  --radius: var(--radius-sm);

  /* ─── Shadows ─── */
  --shadow-xs: 0 1px 2px rgb(0 0 0 / 60%);
  --shadow-sm: 0 2px 8px rgb(0 0 0 / 50%);
  --shadow-md: 0 4px 16px rgb(0 0 0 / 55%);
  --shadow-lg: 0 8px 32px rgb(0 0 0 / 60%);
  --shadow-panel:
    0 0 0 1px var(--border-subtle), 0 1px 0 0 rgb(255 70 85 / 4%) inset,
    var(--shadow-sm);
  --shadow-elevated:
    0 0 0 1px var(--border), 0 1px 0 0 rgb(255 70 85 / 6%) inset,
    var(--shadow-md);
  --shadow-accent:
    0 0 0 1px var(--border-accent), 0 0 24px rgb(255 70 85 / 15%);
  --shadow-glow-red: 0 0 20px rgba(255, 70, 85, 0.15);
  --shadow-glow-crimson: 0 0 20px rgba(255, 70, 85, 0.25);

  /* ─── Motion ─── */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;

  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
  --ease-emphasis: cubic-bezier(0.2, 0.8, 0.2, 1);

  --transition-colors:
    color var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard);
  --transition-transform: transform var(--duration-normal) var(--ease-out);
  --transition-opacity: opacity var(--duration-normal) var(--ease-standard);

  /* ─── Focus ─── */
  --focus-ring: 0 0 0 2px var(--background), 0 0 0 4px var(--accent);

  /* ─── HUD ─── */
  --hud-clip-path: polygon(
    0 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% 100%,
    12px 100%,
    0 calc(100% - 12px)
  );
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
  }
}

@theme inline {
  /* Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-secondary: var(--surface-secondary);
  --color-surface-elevated: var(--surface-elevated);
  --color-surface-overlay: var(--surface-overlay);
  --color-muted: var(--text-secondary);
  --color-muted-foreground: var(--text-muted);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-ring: var(--ring);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-hover: var(--accent-hover);
  --color-accent-muted: var(--accent-muted);
  --color-accent-subtle: var(--accent-subtle);
  --color-amber: var(--amber);
  --color-amber-subtle: var(--amber-subtle);
  --color-success: var(--success);
  --color-success-subtle: var(--success-subtle);
  --color-warning: var(--warning);
  --color-warning-subtle: var(--warning-subtle);
  --color-destructive: var(--destructive);
  --color-destructive-subtle: var(--destructive-subtle);
  --color-border: var(--border);
  --color-border-subtle: var(--border-subtle);
  --color-border-strong: var(--border-strong);
  --color-border-accent: var(--border-accent);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);

  /* Typography */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-heading: var(--font-heading);

  --text-display: clamp(2.25rem, 5vw, 3.25rem);
  --text-display--line-height: var(--text-display-height);
  --text-display--letter-spacing: var(--text-display-tracking);
  --text-display--font-weight: 600;
  --text-display--font-family: var(--font-heading);

  --text-h1: clamp(1.75rem, 5vw, 2.5rem);
  --text-h1--line-height: var(--text-h1-height);
  --text-h1--letter-spacing: var(--text-h1-tracking);
  --text-h1--font-weight: 600;
  --text-h1--font-family: var(--font-heading);

  --text-h2: clamp(1.5rem, 4vw, 2rem);
  --text-h2--line-height: var(--text-h2-height);
  --text-h2--letter-spacing: var(--text-h2-tracking);
  --text-h2--font-weight: 600;
  --text-h2--font-family: var(--font-heading);

  --text-h3: var(--text-h3-size);
  --text-h3--line-height: var(--text-h3-height);
  --text-h3--letter-spacing: var(--text-h3-tracking);
  --text-h3--font-weight: 600;
  --text-h3--font-family: var(--font-heading);

  --text-h4: var(--text-h4-size);
  --text-h4--line-height: var(--text-h4-height);
  --text-h4--letter-spacing: var(--text-h4-tracking);
  --text-h4--font-weight: 600;
  --text-h4--font-family: var(--font-heading);

  --text-body-lg: var(--text-body-lg-size);
  --text-body-lg--line-height: var(--text-body-lg-height);

  --text-body-sm: var(--text-body-sm-size);
  --text-body-sm--line-height: var(--text-body-sm-height);

  --text-caption: var(--text-caption-size);
  --text-caption--line-height: var(--text-caption-height);

  --text-overline: var(--text-overline-size);
  --text-overline--line-height: var(--text-overline-height);
  --text-overline--letter-spacing: var(--text-overline-tracking);
  --text-overline--font-weight: 500;
  --text-overline--font-family: var(--font-heading);

  /* Radius */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-full: var(--radius-full);

  /* Shadows */
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-panel: var(--shadow-panel);
  --shadow-elevated: var(--shadow-elevated);
  --shadow-accent: var(--shadow-accent);

  /* Semantic spacing for utilities */
  --spacing-section-sm: var(--space-section-sm);
  --spacing-section-md: var(--space-section-md);
  --spacing-section-lg: var(--space-section-lg);
  --spacing-gutter: var(--space-gutter);

  /* Breakpoints */
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;

  /* Max widths */
  --container-narrow: var(--container-narrow);
  --container-content: var(--container-content);
  --container-wide: var(--container-wide);
}
```

---

## 2. App Router Structure

### Directory Tree `src/app/`
```text
src/app/
├── layout.tsx
├── page.tsx
├── not-found.tsx
├── robots.ts
├── sitemap.ts
├── api/
│   ├── contact/
│   │   └── route.ts
│   ├── exit-preview/
│   │   └── route.ts
│   ├── preview/
│   │   └── route.ts
│   └── revalidate/
│       └── route.ts
├── contact/
│   └── page.tsx
├── devlogs/
│   ├── page.tsx
│   └── [slug]/
│       ├── not-found.tsx
│       └── page.tsx
├── engineering/
│   ├── page.tsx
│   └── [slug]/
│       ├── not-found.tsx
│       └── page.tsx
├── experience/
│   └── page.tsx
├── projects/
│   ├── page.tsx
│   └── [slug]/
│       ├── not-found.tsx
│       └── page.tsx
└── resume/
    └── page.tsx
```

### `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

import { SiteBackground } from "@/components/layout/site-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { fontVariables } from "@/lib/fonts";
import { buildRootMetadata } from "@/lib/seo";

export const metadata: Metadata = buildRootMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${fontVariables}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SiteBackground />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### `src/app/page.tsx`
```tsx
import type { Metadata } from "next";

import { HomeJsonLd } from "@/features/home/components/home-json-ld";
import { HomePageView } from "@/features/home";
import {
  getCachedHomePageData,
  getCachedSiteSettings,
} from "@/features/home/lib/home-data";
import { buildHomeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [data, siteSettings] = await Promise.all([
    getCachedHomePageData(),
    getCachedSiteSettings(),
  ]);

  return buildHomeMetadata(data, siteSettings);
}

export default async function HomePage() {
  const [data, siteSettings] = await Promise.all([
    getCachedHomePageData(),
    getCachedSiteSettings(),
  ]);

  return (
    <>
      <HomeJsonLd data={data} siteSettings={siteSettings} />
      <HomePageView data={data} />
    </>
  );
}
```

---

## 3. Components to Redesign

### `src/features/home/components/hero-section.tsx`
```tsx
import Link from "next/link";

import {
  MotionHero,
  MotionHeroItem,
  MotionReveal,
} from "@/components/shared/motion-reveal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";
import { Hero3DCanvas } from "@/features/home/components/hero-3d-canvas";
import {
  resolveHeroEyebrow,
  resolvePersonProfile,
} from "@/features/home/lib/home-data";
import type { HomePageData } from "@/types";

interface HeroSectionProps {
  data: HomePageData | null;
}

function OpenToWorkIndicator() {
  return (
    <div className="relative inline-flex items-center gap-3">
      <span
        className="status-breathe pointer-events-none absolute -left-3 top-1/2 size-8 -translate-y-1/2 rounded-full bg-amber/30 blur-md"
        aria-hidden
      />
      <div className="relative inline-flex items-center gap-2.5 rounded-none border border-border-accent bg-accent-subtle px-3 py-1.5">
        <span className="relative flex size-2.5" aria-hidden>
          <span className="status-pulse absolute inline-flex size-full rounded-full bg-success" />
          <span className="relative inline-flex size-2.5 rounded-full bg-success ring-2 ring-amber/50" />
        </span>
        <span className="font-mono text-caption font-medium uppercase tracking-widest text-accent">
          Open to Work
        </span>
      </div>
    </div>
  );
}

export function HeroSection({ data }: HeroSectionProps) {
  const profile = resolvePersonProfile(data?.personProfile);
  const eyebrow = resolveHeroEyebrow(
    data?.homepage?.heroEyebrow,
    data?.personProfile,
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative border-b border-border-subtle py-12 md:py-24 glow-mesh"
    >
      <div className="mx-auto w-full max-w-container-content px-[var(--container-padding)]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <MotionHero className="flex flex-col gap-6 md:gap-8">
            <MotionHeroItem>
              <Heading variant="overline" tone="accent" id="hero-eyebrow">
                {eyebrow}
              </Heading>
            </MotionHeroItem>
            <MotionHeroItem>
              <Heading variant="display" as="h1" id="hero-heading">
                {profile.name}
              </Heading>
            </MotionHeroItem>
            <MotionHeroItem>
              <p className="font-heading text-h3 text-accent text-balance">
                {profile.title}
              </p>
            </MotionHeroItem>
            <MotionHeroItem>
              <OpenToWorkIndicator />
            </MotionHeroItem>
            <MotionHeroItem>
              <p className="max-w-xl text-body-lg text-muted text-pretty">
                {profile.tagline}
              </p>
            </MotionHeroItem>
            {profile.expertiseAreas.length > 0 ? (
              <MotionHeroItem>
                <ul
                  className="flex max-w-full flex-wrap gap-2"
                  aria-label="Areas of expertise"
                >
                  {profile.expertiseAreas.map((area) => (
                    <li key={area} className="max-w-full min-w-0">
                      <Tag
                        variant="accent"
                        className="max-w-full whitespace-normal break-words"
                      >
                        {area}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </MotionHeroItem>
            ) : null}
            <MotionHeroItem>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </MotionHeroItem>
          </MotionHero>

          <MotionReveal className="w-full" delay={0.15}>
            <Hero3DCanvas />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
```

### `src/features/home/components/hero-3d-canvas.tsx` (Spline / 3D Canvas Section)
```tsx
"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <Hero3DLoadingState />,
});

const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_HERO_URL?.trim() ?? "";
const SPLINE_EMBED_URL =
  process.env.NEXT_PUBLIC_SPLINE_HERO_EMBED_URL?.trim() ?? "";

function Hero3DLoadingState() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-secondary/80 p-6"
      aria-hidden
    >
      <div className="size-10 animate-pulse rounded-full border-2 border-accent border-t-transparent" />
      <p className="font-mono text-caption uppercase tracking-widest text-accent">
        Loading 3D Scene…
      </p>
      <p className="text-center font-mono text-[0.625rem] text-muted">
        {`AVATAR.SYS · RENDER_INIT`}
      </p>
    </div>
  );
}

function Hero3DFallback() {
  if (SPLINE_EMBED_URL) {
    return (
      <iframe
        src={SPLINE_EMBED_URL}
        title="3D Developer Avatar"
        className="h-full w-full border-0"
        loading="lazy"
        allow="fullscreen"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-border-accent bg-surface-secondary/60 p-6 text-center">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent">
        {`3D_SCENE.PENDING`}
      </span>
      <p className="max-w-xs font-mono text-caption text-muted">
        Set <code className="text-accent">NEXT_PUBLIC_SPLINE_HERO_URL</code> or{" "}
        <code className="text-accent">NEXT_PUBLIC_SPLINE_HERO_EMBED_URL</code>{" "}
        to load the zombie developer model.
      </p>
      <div
        className="mt-2 h-32 w-32 rounded-full border border-accent/40 bg-accent-subtle shadow-glow-red"
        aria-hidden
      />
    </div>
  );
}

interface Hero3DCanvasProps {
  className?: string;
}

export function Hero3DCanvas({ className }: Hero3DCanvasProps) {
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setLoadError(false);
  }, []);

  useEffect(() => {
    if (!SPLINE_SCENE_URL || isLoaded || loadError) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoadError(true);
    }, 15000);

    return () => window.clearTimeout(timeout);
  }, [isLoaded, loadError]);

  const showSpline = SPLINE_SCENE_URL && !loadError;

  return (
    <div
      className={cn("hero-viewport-panel relative w-full", className)}
      aria-label="3D developer avatar"
    >
      <span
        className="pointer-events-none absolute top-3 left-4 z-20 font-mono text-[0.625rem] uppercase tracking-widest text-accent/80"
        aria-hidden
      >
        {`AVATAR.3D`}
      </span>
      <span
        className="pointer-events-none absolute top-3 right-4 z-20 font-mono text-[0.625rem] uppercase tracking-widest text-muted"
        aria-hidden
      >
        RENDER.LIVE
      </span>

      <div className="hero-viewport-grid pointer-events-none absolute inset-0 z-10" aria-hidden />

      <div
        className={cn(
          "relative z-0 w-full overflow-hidden bg-surface-secondary/40",
          "aspect-square md:aspect-auto md:h-[500px]",
        )}
      >
        {!showSpline ? (
          <Hero3DFallback />
        ) : (
          <>
            {!isLoaded ? <Hero3DLoadingState /> : null}
            <Spline
              scene={SPLINE_SCENE_URL}
              className={cn("h-full w-full", !isLoaded && "sr-only")}
              onLoad={handleLoad}
            />
          </>
        )}
      </div>
    </div>
  );
}
```

### `src/components/layout/site-header.tsx` (Navbar / Header)
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/engineering", label: "Engineering" },
  { href: "/experience", label: "Experience" },
  { href: "/devlogs", label: "Devlogs" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function GamingNavLink({
  href,
  label,
  isActive,
  onClick,
  className,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "nav-console-link group inline-flex items-center gap-1.5 font-mono text-body-sm font-medium uppercase tracking-widest transition-colors-token",
        isActive ? "text-accent nav-console-link--active" : "text-muted hover:text-accent",
        className,
      )}
    >
      <span
        className={cn(
          "size-1 rounded-full bg-accent transition-all duration-300",
          isActive
            ? "opacity-100 shadow-[0_0_6px_rgba(255,70,85,0.8)]"
            : "opacity-0 group-hover:opacity-100",
        )}
        aria-hidden
      />
      <span>{label.toUpperCase()}</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-accent/30 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none"
            aria-label={`${BRAND.name} — Home`}
            onClick={closeMobileMenu}
          >
            <span className="font-mono text-body-sm font-semibold uppercase tracking-widest text-foreground transition-colors-token group-hover:text-accent">
              {BRAND.name}
            </span>
            <span className="font-mono text-caption text-muted hidden sm:block">
              {BRAND.title}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center justify-end gap-3 lg:gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <GamingNavLink
                    href={item.href}
                    label={item.label}
                    isActive={isNavActive(pathname, item.href)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {mobileMenuOpen ? (
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-none border border-border-accent text-accent transition-colors-token hover:border-accent hover:bg-accent-subtle hover:shadow-glow-red focus-visible:outline-none md:hidden"
              aria-expanded="true"
              aria-controls="mobile-nav"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="size-5" />
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-none border border-border-accent text-accent transition-colors-token hover:border-accent hover:bg-accent-subtle hover:shadow-glow-red focus-visible:outline-none md:hidden"
              aria-expanded="false"
              aria-controls="mobile-nav"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          )}
        </Container>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        {...(mobileMenuOpen
          ? { "aria-hidden": "false" as const }
          : { "aria-hidden": "true" as const })}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          onClick={closeMobileMenu}
        />

        <nav
          aria-label="Mobile primary"
          className={cn(
            "gaming-menu-panel absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border-accent transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="relative flex h-16 items-center justify-between border-b border-border-accent/40 px-6">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-caption uppercase tracking-[0.2em] text-accent">
                {`NAV.TERM`}
              </span>
              <span className="font-mono text-[0.625rem] text-muted">
                HASAN_RAZA_OS v1.0 · TACTICAL HUD
              </span>
            </div>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-none border border-border-accent text-accent transition-colors-token hover:bg-accent-subtle hover:shadow-glow-red focus-visible:outline-none"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <X className="size-5" />
            </button>
          </div>

          <ul className="relative flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {navItems.map((item, index) => {
              const active = isNavActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "nav-console-link group flex items-center gap-3 rounded-none border border-transparent px-4 py-3 font-mono text-body-lg font-medium uppercase tracking-widest transition-colors-token",
                      active
                        ? "nav-console-link--active border-border-accent bg-accent-subtle text-accent shadow-glow-red"
                        : "text-foreground hover:border-border-accent hover:bg-surface-secondary hover:text-accent",
                    )}
                  >
                    <span className="text-caption text-muted" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "size-1.5 rounded-full bg-accent transition-opacity",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      )}
                      aria-hidden
                    />
                    <span>{item.label.toUpperCase()}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative border-t border-border-accent/40 px-6 py-4">
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted">
              SYS_STATUS: <span className="text-success">ONLINE</span>
              <span className="mx-2 text-border-strong">|</span>
              <span className="text-amber">LINK: SECURE</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
```

### `src/features/home/components/featured-projects-section.tsx` (Projects Section)
```tsx
import { EngineeringLogCardLink } from "@/components/shared/engineering-log-card";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { ProjectCardLink } from "@/components/shared/project-card";
import { SectionLink } from "@/components/shared/section-link";
import { Section } from "@/components/layout/section";
import type { EngineeringLogCard, ProjectCard } from "@/types";

interface FeaturedProjectsSectionProps {
  projects: ProjectCard[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Section
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
      divider="top"
      eyebrow="Featured Work"
      title="Featured Projects"
      titleId="featured-projects-heading"
      description="Case studies across gameplay systems, SDK work, and shipped titles."
    >
      <div className="mb-8 flex justify-end">
        <SectionLink href="/projects" label="View all projects" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <MotionReveal key={project._id} delay={index * 0.06} className="h-full">
            <ProjectCardLink project={project} priorityImage={index === 0} />
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}

interface EngineeringFocusSectionProps {
  logs: EngineeringLogCard[];
}

export function EngineeringFocusSection({ logs }: EngineeringFocusSectionProps) {
  if (logs.length === 0) {
    return null;
  }

  return (
    <Section
      id="engineering-focus"
      aria-labelledby="engineering-focus-heading"
      divider="top"
      eyebrow="Technical Thinking"
      title="Engineering Focus"
      titleId="engineering-focus-heading"
      description="Deep dives into systems, tradeoffs, and how problems were solved."
    >
      <div className="mb-8 flex justify-end">
        <SectionLink href="/engineering" label="View engineering logs" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {logs.map((log, index) => (
          <MotionReveal key={log._id} delay={index * 0.06} className="h-full">
            <EngineeringLogCardLink log={log} />
          </MotionReveal>
        ))}
      </div>
    </Section>
  );
}
```

### `src/components/shared/project-card.tsx` (Project Card Layout)
```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SanityImage } from "@/components/shared/sanity-image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import {
  projectStatusBadgeVariant,
  projectStatusLabels,
} from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { ProjectCard } from "@/types";

interface ProjectCardLinkProps {
  project: ProjectCard;
  className?: string;
  priorityImage?: boolean;
}

export function ProjectCardLink({
  project,
  className,
  priorityImage = false,
}: ProjectCardLinkProps) {
  const status = project.status;
  const statusLabel = status ? projectStatusLabels[status] : null;
  const badgeVariant = status
    ? projectStatusBadgeVariant[status]
    : "secondary";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block h-full focus-visible:outline-none", className)}
    >
      <Card
        variant="interactive"
        padding="none"
        hudLabel=""
        className="flex h-full flex-col overflow-hidden"
      >
        <SanityImage
          image={project.featuredImage}
          alt={project.featuredImage?.alt ?? project.title}
          className="aspect-[16/10] w-full border-b border-border-subtle"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priorityImage}
        />
        <CardHeader className="gap-3 p-5 pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="group-hover:text-accent transition-colors-token">
              {project.title}
            </CardTitle>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </div>
          {project.duration ? (
            <p className="font-mono text-caption uppercase tracking-wider text-accent/80">
              {project.duration}
            </p>
          ) : null}
          {project.description ? (
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="mt-auto flex flex-wrap items-center gap-2 p-5 pt-2">
          {statusLabel ? (
            <Badge variant={badgeVariant as "default"}>{statusLabel}</Badge>
          ) : null}
          {project.category?.title ? (
            <Badge variant="outline">{project.category.title}</Badge>
          ) : null}
          {project.technologies?.slice(0, 3).map((tech) => (
            <Tag key={tech} variant="mono" size="sm">
              {tech}
            </Tag>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
```

### `src/features/home/components/current-mission-section.tsx` (About / Current Mission Section)
```tsx
import Link from "next/link";

import { MotionReveal } from "@/components/shared/motion-reveal";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  missionStatusBadgeVariant,
  missionStatusLabels,
} from "@/lib/labels";
import type { CurrentMission } from "@/types";

interface CurrentMissionSectionProps {
  mission: CurrentMission;
}

export function CurrentMissionSection({ mission }: CurrentMissionSectionProps) {
  const items = mission.items ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <Section
      id="current-mission"
      aria-labelledby="current-mission-heading"
      divider="top"
      eyebrow="Current Mission"
      title={mission.sectionTitle}
      titleId="current-mission-heading"
      description={mission.sectionDescription ?? undefined}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const href =
            item.relatedProject?.slug
              ? `/projects/${item.relatedProject.slug}`
              : item.relatedEngineeringLog?.slug
                ? `/engineering/${item.relatedEngineeringLog.slug}`
                : null;

          const card = (
            <Card variant="elevated" className="h-full">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{item.label}</CardTitle>
                  <Badge
                    variant={
                      missionStatusBadgeVariant[item.status] as "default"
                    }
                  >
                    {missionStatusLabels[item.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted text-pretty">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );

          return (
            <MotionReveal key={item._key} delay={index * 0.05}>
              {href ? (
                <Link
                  href={href}
                  className="block h-full focus-visible:outline-none"
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}
```

### `src/components/layout/site-footer.tsx` (Footer)
```tsx
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle py-section-sm glow-mesh">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-muted">
          © {year} {BRAND.name}. {BRAND.title.split(" | ")[0]}.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link
                href="/contact"
                className="text-body-sm text-muted transition-colors-token hover:text-foreground"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/studio"
                className="text-body-sm text-muted transition-colors-token hover:text-foreground"
              >
                CMS
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
```

---

## 4. Sanity Wiring

### `src/sanity/client.ts`
```typescript
import { createClient, type SanityClient } from "@sanity/client";

import { getServerEnv } from "@/lib/env";
import { isSanityConfigured } from "@/lib/env";
import { sanityConfig } from "@/sanity/env";

let publishedClient: SanityClient | null = null;
let previewClient: SanityClient | null = null;

function createPublishedClient(): SanityClient {
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: sanityConfig.useCdn,
    perspective: "published",
  });
}

function createPreviewClient(token: string): SanityClient {
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: false,
    token,
    perspective: "previewDrafts",
  });
}

/**
 * Lazy Sanity client — safe to import during build without CMS credentials.
 * Use `{ preview: true }` for draft content (requires SANITY_API_READ_TOKEN).
 */
export function getSanityClient(options?: { preview?: boolean }): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }

  if (options?.preview) {
    const token = getServerEnv().SANITY_API_READ_TOKEN;
    if (!token) {
      console.error("[getSanityClient] Preview requested but SANITY_API_READ_TOKEN is missing");
      return null;
    }

    previewClient ??= createPreviewClient(token);
    return previewClient;
  }

  publishedClient ??= createPublishedClient();
  return publishedClient;
}
```

### `src/sanity/queries/collections/project.ts` (Example Queries)
```typescript
import { categoryField } from "../fragments/category";
import { publishedOnly } from "../fragments/publish";

export const projectCategoriesQuery = `
  *[_type == "projectCategory"] | order(title asc) ${categoryField}
`;

export const projectsListQuery = `
  *[_type == "project" && ${publishedOnly}] | order(featured desc, featuredRank asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    role,
    status,
    duration,
    featured,
    technologies,
    category->${categoryField},
    featuredImage {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug && ($preview == true || publishStatus == "published")][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    overview,
    role,
    teamSize,
    duration,
    status,
    technologies,
    challenges,
    solutions,
    lessonsLearned,
    githubUrl,
    playableUrl,
    featured,
    featuredRank,
    publishStatus,
    publishedAt,
    category->${categoryField},
    featuredImage {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip
    },
    gallery[] {
      "url": asset->url,
      alt,
      "lqip": asset->metadata.lqip,
      caption
    },
    videos[] {
      _key,
      title,
      url,
      provider
    },
    relatedEngineeringLogs[]->{
      _id,
      title,
      "slug": slug.current,
      summary
    },
    seo {
      metaTitle,
      metaDescription,
      canonicalPath,
      noIndex,
      ogImage {
        "url": asset->url,
        alt
      }
    }
  }
`;

export const projectSlugsQuery = `
  *[_type == "project" && publishStatus == "published" && defined(slug.current)]{
    "slug": slug.current
  }.slug
`;
```

### Data Fetching and Preparation Flow
The `src/app/page.tsx` utilizes `getCachedHomePageData()` from `src/features/home/lib/home-data.ts` to retrieve the data payload.

#### `src/features/home/lib/home-data.ts` (Data Controller)
```typescript
import { cache } from "react";

import { BRAND } from "@/lib/constants";
import type { HomePageData, PersonProfile } from "@/sanity/schemas";

export function resolveHeroEyebrow(
  heroEyebrow: string | null | undefined,
  profile: PersonProfile | null | undefined,
): string {
  if (heroEyebrow?.trim()) {
    return heroEyebrow.trim();
  }

  const role = profile?.currentRole ?? BRAND.currentRole;
  const company = profile?.currentCompany ?? BRAND.currentCompany;

  return `${role} @ ${company}`;
}

export function resolvePersonProfile(
  profile: PersonProfile | null | undefined,
): PersonProfile {
  return {
    name: profile?.name ?? BRAND.name,
    title: profile?.title ?? BRAND.title,
    tagline: profile?.tagline ?? BRAND.tagline,
    profileImage: profile?.profileImage ?? null,
    currentRole: profile?.currentRole ?? BRAND.currentRole,
    currentCompany: profile?.currentCompany ?? BRAND.currentCompany,
    expertiseAreas: profile?.expertiseAreas ?? [],
    professionalSummary: profile?.professionalSummary,
  };
}

export function compactArray<T>(items: (T | null | undefined)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

export const getCachedHomePageData = cache(async (): Promise<HomePageData | null> => {
  const { getHomePageData } = await import("@/sanity/repositories/homepage");
  return getHomePageData();
});

export const getCachedSiteSettings = cache(async () => {
  const { getSiteSettings } = await import("@/sanity/repositories/site");
  return getSiteSettings();
});
```

#### `src/sanity/repositories/homepage.ts` (Sanity Data Fetcher)
```typescript
import { sanityFetch } from "@/sanity/fetch";
import { sanityTags } from "@/sanity/env";
import { currentMissionQuery, homePageQuery } from "@/sanity/queries";
import { currentMissionSchema, homePageDataSchema } from "@/sanity/schemas";

export async function getHomePageData() {
  return sanityFetch({
    query: homePageQuery,
    schema: homePageDataSchema,
    tags: [
      sanityTags.homepage,
      sanityTags.personProfile,
      sanityTags.currentMission,
      sanityTags.projects,
      sanityTags.engineeringLogs,
      sanityTags.devlogs,
      sanityTags.experience,
    ],
  });
}

export async function getCurrentMission() {
  return sanityFetch({
    query: currentMissionQuery,
    schema: currentMissionSchema,
    tags: [sanityTags.currentMission],
  });
}
```

---

## 5. Assets

### Model & Scene Embed URL
- Embedded 3D Scene/Model: `https://sketchfab.com/models/52d3c909627546688e5d03a1961e9389/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_pane=0&ui_related=0&ui_settings=0&ui_help=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0`

### Static Asset Paths (Local)
- Brand Mascot / Profile Headshot: `/brand/mascot-profile.png`
- Default OG Meta Image: `/brand/og-default.png`
