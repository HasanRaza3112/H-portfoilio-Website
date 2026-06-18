export const PROJECT_CATEGORIES = [
  { slug: "game-development", title: "Game Development" },
  { slug: "sdk-engineering", title: "SDK Engineering" },
] as const;

export type ProjectCategorySlug =
  (typeof PROJECT_CATEGORIES)[number]["slug"];

const STUDIO_ROLE = "Junior Game Developer & SDK Engineer";
const PERSONAL_ROLE = "Game Developer";

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
      "Multiplayer cricket game with full backend (wallet, leaderboard, auth), ads, analytics, and native sharing.",
    overview:
      "Multiplayer cricket title with 5K+ downloads and 200+ DAU. Shipped wallet, leaderboard, auth, AdMob, Unity Ads, analytics, native sharing, and UI Toolkit integration.",
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
      "Contributed error fixes, build issue resolutions, and cross-platform publishing for all 8 production SDKs.",
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
    description: "Space shooter with enemy AI, wave management, and mobile touch controls.",
    overview:
      "Personal space shooter built in Unity with enemy AI, wave management, and mobile touch controls.",
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: ["Solo scope required enemy AI, wave pacing, and touch-first mobile controls."],
    solutions: [
      "Implemented enemy AI, wave management, and mobile touch controls for the space shooter loop.",
    ],
    lessonsLearned: ["Touch controls and wave pacing define feel in mobile arcade shooters."],
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
    description:
      "Endless runner with procedural level generation, obstacle spawning, and score tracking.",
    overview:
      "Personal endless runner with procedural level generation, obstacle spawning, and score tracking.",
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: [
      "Endless runner scope required procedural levels, obstacle spawning, and reliable score tracking.",
    ],
    solutions: [
      "Built procedural level generation, obstacle spawning, and score tracking for the runner loop.",
    ],
    lessonsLearned: [
      "Procedural spawning and score persistence anchor replayability in endless runners.",
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
    description:
      "First-person shooter with AI enemies, weapon switching, and level progression.",
    overview:
      "Personal first-person shooter featuring AI enemies, weapon switching, and level progression.",
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: [
      "FPS scope required AI enemies, weapon switching, and structured level progression.",
    ],
    solutions: [
      "Implemented AI enemies, weapon switching, and level progression for the shooter experience.",
    ],
    lessonsLearned: [
      "Weapon switching and enemy AI behavior define combat pacing in small-scope FPS titles.",
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
    description:
      "Horror survival game featuring maze navigation, atmospheric lighting, and enemy AI.",
    overview:
      "Personal horror survival game with maze navigation, atmospheric lighting, and enemy AI.",
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: [
      "Horror survival scope required maze navigation, lighting atmosphere, and enemy AI tension.",
    ],
    solutions: [
      "Built maze navigation, atmospheric lighting, and enemy AI for the survival horror loop.",
    ],
    lessonsLearned: [
      "Lighting and navigation readability drive tension in horror maze experiences.",
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
    description:
      "Endless bus driving simulation with realistic physics and route management.",
    overview:
      "Personal endless bus driving simulation with realistic physics and route management.",
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: [
      "Driving simulation scope required believable physics and manageable route systems.",
    ],
    solutions: [
      "Implemented realistic driving physics and route management for the endless bus loop.",
    ],
    lessonsLearned: [
      "Physics tuning and route clarity matter more than map size in driving sims.",
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
    description:
      "Prototype recreation of the classic Slender: The Eight Pages with enhanced atmosphere.",
    overview:
      "Personal prototype recreating Slender: The Eight Pages with enhanced atmosphere.",
    role: PERSONAL_ROLE,
    duration: "Personal release",
    status: "shipped" as const,
    technologies: ["Unity 3D", "C#"],
    challenges: [
      "Prototype scope required faithful Slender-style tension with stronger atmospheric presentation.",
    ],
    solutions: [
      "Recreated the classic Slender: The Eight Pages loop with enhanced atmosphere.",
    ],
    lessonsLearned: [
      "Atmosphere and audio carry horror prototypes more than feature breadth.",
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
