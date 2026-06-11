import Team2, { type ChangelogEntry } from "@/components/ui/8bit-team2";

const portfolioChangelog: ChangelogEntry[] = [
  {
    date: "Mar 2026",
    title: "v2.0 — Hasan Raza OS",
    description:
      "8-bit gaming HUD theme, pixel cards, holographic nav, and 3D developer hero canvas.",
    badge: "LATEST",
  },
  {
    date: "Feb 2026",
    title: "v1.5 — Full Portfolio",
    description:
      "Projects, engineering, experience, devlogs, resume, contact, and production SEO stack.",
  },
  {
    date: "Jan 2026",
    title: "v1.0 — CMS Live",
    description:
      "Sanity CMS wired with seed content, Vercel deploy, and analytics instrumentation.",
  },
];

export function OsChangelogSection() {
  return (
    <Team2
      title="System Log"
      description="HASAN_RAZA_OS // BUILD_HISTORY"
      entries={portfolioChangelog}
      className="border-t border-border-subtle"
    />
  );
}
