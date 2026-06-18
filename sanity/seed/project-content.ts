export const PROJECT_CATEGORIES = [
  { slug: "game-development", title: "Game Development" },
  { slug: "sdk-engineering", title: "SDK Engineering" },
] as const;

export type ProjectCategorySlug =
  (typeof PROJECT_CATEGORIES)[number]["slug"];

const STUDIO_ROLE = "Junior Game Developer & SDK Engineer";
const PERSONAL_ROLE = "Game Developer";

const PERSONAL_DESCRIPTION =
  "Personal game project developed and published independently.";
const PERSONAL_OVERVIEW =
  "Independent title in the personal game portfolio, contributing to 100K+ combined downloads across solo releases.";

export const PROJECT_CATEGORY_SEED = PROJECT_CATEGORIES.map((category) => ({
  _id: `projectCategory-${category.slug}`,
  _type: "projectCategory" as const,
  title: category.title,
  slug: { _type: "slug" as const, current: category.slug },
  domain: "project" as const,
}));

export const SEED_FEATURED_PROJECT_SLUGS = [
  "quizverse",
  "cricketx",
  "cross-platform-sdks",
] as const;

export const SEED_PROJECTS = [
  {
    _id: "project-quizverse",
    slug: "quizverse",
    title: "QuizVerse",
    categorySlug: "game-development" as const,
    description:
      "Flagship quiz game; performed QA testing, UI fixes, and bug fixes on live production build.",
    overview:
      "Flagship quiz title with 100K+ downloads. Contributed QA testing, UI fixes, and bug resolution on the live production build.",
    role: STUDIO_ROLE,
    duration: "100K+ downloads",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#", "Nakama", "AdMob"],
    challenges: [
      "Live production build required ongoing QA coverage, UI fixes, and defect resolution.",
    ],
    solutions: [
      "Performed QA testing, corrected UI issues, and fixed bugs on the shipped build.",
    ],
    lessonsLearned: [
      "High-download live titles need disciplined QA and UI polish after launch.",
    ],
    featured: true,
    featuredRank: 1,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2026-03-15T10:00:00.000Z",
  },
  {
    _id: "project-cricketx",
    slug: "cricketx",
    title: "CricketX",
    categorySlug: "game-development" as const,
    description:
      "Multiplayer cricket game with backend wallet, leaderboard, auth, ads, analytics, and native sharing.",
    overview:
      "Multiplayer cricket title with 5K+ downloads and 200+ DAU. Integrated Nakama wallet, leaderboard, and auth with AdMob, Unity Ads, analytics, native sharing, and UI Toolkit.",
    role: STUDIO_ROLE,
    duration: "5K+ downloads · 200+ DAU",
    status: "shipped" as const,
    technologies: [
      "Unity 3D",
      "C#",
      "Nakama",
      "AdMob",
      "Unity UI Toolkit",
      "Analytics",
    ],
    challenges: [
      "Multiplayer cricket game required wallet, leaderboard, auth, ads, analytics, and native sharing on one stack.",
    ],
    solutions: [
      "Integrated Nakama backend services with AdMob, Unity Ads, analytics, native sharing, and UI Toolkit.",
    ],
    lessonsLearned: [
      "Shipping live mobile features is smoother when backend, monetization, and UI systems are integrated early.",
    ],
    featured: true,
    featuredRank: 2,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2026-04-01T10:00:00.000Z",
  },
  {
    _id: "project-colorcrush2d",
    slug: "colorcrush2d",
    title: "ColorCrush2D",
    categorySlug: "game-development" as const,
    description:
      "Casual mobile game with backend wallet, leaderboard, and ad monetization integration.",
    overview:
      "Casual mobile title with 2K+ downloads. Integrated Nakama wallet and leaderboard systems with AdMob ad monetization.",
    role: STUDIO_ROLE,
    duration: "2K+ downloads",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#", "Nakama", "AdMob"],
    challenges: [
      "Casual mobile game needed wallet, leaderboard, and ad monetization integrated with backend services.",
    ],
    solutions: [
      "Integrated Nakama wallet and leaderboard features with AdMob monetization on the live build.",
    ],
    lessonsLearned: [
      "Wallet, leaderboard, and ads should be validated together on casual mobile scope.",
    ],
    featured: false,
    featuredRank: 4,
    relatedEngineeringLogIds: ["engineeringLog-colorcrush-sdk"],
    publishedAt: "2026-04-15T10:00:00.000Z",
  },
  {
    _id: "project-level-rotator",
    slug: "level-rotator",
    title: "Level Rotator",
    categorySlug: "game-development" as const,
    description:
      "Puzzle game; resolved gameplay system bugs and crash issues improving stability.",
    overview:
      "Puzzle title with 500+ downloads. Resolved gameplay system bugs and crash issues to improve stability.",
    role: STUDIO_ROLE,
    duration: "500+ downloads",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: [
      "Gameplay systems had defects and crash issues affecting player stability.",
    ],
    solutions: [
      "Resolved gameplay system bugs and crash issues to improve overall stability.",
    ],
    lessonsLearned: [
      "Core gameplay stability should be hardened before expanding puzzle content.",
    ],
    featured: false,
    featuredRank: 5,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2026-05-01T10:00:00.000Z",
  },
  {
    _id: "project-cross-platform-sdks",
    slug: "cross-platform-sdks",
    title: "8 Cross-Platform SDKs",
    categorySlug: "sdk-engineering" as const,
    description:
      "Contributed error fixes, build issue resolutions, and cross-platform publishing for 8 production SDKs.",
    overview:
      "Contributed error fixes, build issue resolutions, and cross-platform publishing across eight production SDKs for Unity, Unreal, Godot, C++, Java, JS/TS, Defold, and Cocos2dx.",
    role: STUDIO_ROLE,
    duration: "8 production SDKs",
    status: "shipped" as const,
    technologies: [
      "Unity",
      "Unreal Engine",
      "Godot",
      "C++",
      "Java",
      "JavaScript/TypeScript",
      "Defold",
      "Cocos2dx",
    ],
    challenges: [
      "Eight production SDKs required error fixes, build resolutions, and cross-platform publishing support.",
    ],
    solutions: [
      "Debugged and published SDK fixes and build resolutions across eight engine targets.",
    ],
    lessonsLearned: [
      "Cross-engine SDK delivery needs repeatable publishing and build validation per platform.",
    ],
    featured: true,
    featuredRank: 3,
    relatedEngineeringLogIds: ["engineeringLog-playables-pipeline"],
    publishedAt: "2026-05-20T10:00:00.000Z",
  },
  {
    _id: "project-galaxy-strike",
    slug: "galaxy-strike",
    title: "Galaxy Strike",
    categorySlug: "game-development" as const,
    description: PERSONAL_DESCRIPTION,
    overview: PERSONAL_OVERVIEW,
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Independent game scope required solo development and release ownership."],
    solutions: ["Developed and published the title as a personal project."],
    lessonsLearned: [
      "Personal releases build end-to-end shipping experience outside studio pipelines.",
    ],
    featured: false,
    featuredRank: 10,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2025-08-01T10:00:00.000Z",
  },
  {
    _id: "project-run-king-run",
    slug: "run-king-run",
    title: "Run King Run",
    categorySlug: "game-development" as const,
    description: PERSONAL_DESCRIPTION,
    overview: PERSONAL_OVERVIEW,
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Independent game scope required solo development and release ownership."],
    solutions: ["Developed and published the title as a personal project."],
    lessonsLearned: [
      "Personal releases build end-to-end shipping experience outside studio pipelines.",
    ],
    featured: false,
    featuredRank: 11,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2025-09-01T10:00:00.000Z",
  },
  {
    _id: "project-sharpshooter-3d",
    slug: "sharpshooter-3d",
    title: "SharpShooter 3D",
    categorySlug: "game-development" as const,
    description: PERSONAL_DESCRIPTION,
    overview: PERSONAL_OVERVIEW,
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Independent game scope required solo development and release ownership."],
    solutions: ["Developed and published the title as a personal project."],
    lessonsLearned: [
      "Personal releases build end-to-end shipping experience outside studio pipelines.",
    ],
    featured: false,
    featuredRank: 12,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2025-10-01T10:00:00.000Z",
  },
  {
    _id: "project-maze-bunker",
    slug: "maze-bunker",
    title: "Maze Bunker",
    categorySlug: "game-development" as const,
    description: PERSONAL_DESCRIPTION,
    overview: PERSONAL_OVERVIEW,
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Independent game scope required solo development and release ownership."],
    solutions: ["Developed and published the title as a personal project."],
    lessonsLearned: [
      "Personal releases build end-to-end shipping experience outside studio pipelines.",
    ],
    featured: false,
    featuredRank: 13,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2025-11-01T10:00:00.000Z",
  },
  {
    _id: "project-hrtc-bus-sim",
    slug: "hrtc-bus-sim",
    title: "HRTC Bus Sim",
    categorySlug: "game-development" as const,
    description: PERSONAL_DESCRIPTION,
    overview: PERSONAL_OVERVIEW,
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Independent game scope required solo development and release ownership."],
    solutions: ["Developed and published the title as a personal project."],
    lessonsLearned: [
      "Personal releases build end-to-end shipping experience outside studio pipelines.",
    ],
    featured: false,
    featuredRank: 14,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2025-12-01T10:00:00.000Z",
  },
  {
    _id: "project-slender-returns",
    slug: "slender-returns",
    title: "Slender Returns",
    categorySlug: "game-development" as const,
    description: PERSONAL_DESCRIPTION,
    overview: PERSONAL_OVERVIEW,
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Independent game scope required solo development and release ownership."],
    solutions: ["Developed and published the title as a personal project."],
    lessonsLearned: [
      "Personal releases build end-to-end shipping experience outside studio pipelines.",
    ],
    featured: false,
    featuredRank: 15,
    relatedEngineeringLogIds: [] as string[],
    publishedAt: "2026-01-01T10:00:00.000Z",
  },
] as const;

export function resolveFeaturedProjectRefs() {
  const projectsBySlug = new Map(
    SEED_PROJECTS.map((project) => [project.slug, project]),
  );

  return SEED_FEATURED_PROJECT_SLUGS.map((slug) => {
    const project = projectsBySlug.get(slug);
    if (!project) {
      throw new Error(`Featured project slug not found in seed data: ${slug}`);
    }

    return {
      _type: "reference" as const,
      _ref: project._id,
      _key: project._id,
    };
  });
}
