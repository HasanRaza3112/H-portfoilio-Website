import { ENGINEERING_CATEGORIES } from "../../src/lib/engineering-categories";
import { bulletBlock, textBlock } from "./portable-text";

export const SEED_CONTACT = {
  email: "hasanraza3112@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/hasan-raza-15812921a",
  githubUrl: "https://github.com/HasanRaza3112",
} as const;

export const SEED_PERSON_PROFILE = {
  name: "Mohammed Hasan Raza",
  title: "Technical Game Engineer",
  tagline: "Building Games, Systems, and the Future I Once Dreamed of Playing.",
  currentRole: "Junior Game Developer",
  currentCompany: "ToBa Tech Solutions",
  professionalSummary:
    "Technical Game Engineer and Junior Game Developer at ToBa Tech Solutions, shipping hyper-casual mobile games and cross-platform playable ad integrations. I build Unity SDK systems, integrate backend features—wallet, leaderboard, analytics, and rewarded ads—and design tooling that scales builds across 10+ ad network SDKs. I take production-unready SDKs to UPM-ready releases and lead outsource teams on live game projects.",
  expertiseAreas: [
    "Unity & Mobile Game Development",
    "SDK Development & UPM Packaging",
    "Playable Ads & Multi-Platform Builds",
    "Backend Integration (Nakama, REST, AWS S3)",
    "Cross-Engine Tooling",
    "Hyper-Casual Game Shipping",
    "Team Leadership & Product Direction",
    "C# / Java / JavaScript",
  ],
  profileImageAlt: "Mohammed Hasan Raza — technical game engineer mascot avatar",
} as const;

export const SEED_EXPERIENCE_TOBA = {
  _id: "experience-toba-tech",
  company: "ToBa Tech Solutions",
  role: "Junior Game Developer",
  location: "Udaipur, Rajasthan, India",
  startDate: "2026-02-16",
  endDate: "Present",
  duration: "Feb 2026 — Present",
  order: 1,
  technologies: [
    "Unity",
    "Unity UI Toolkit",
    "Nakama RPCs",
    "REST APIs",
    "AWS S3",
    "JSON Data Pipelines",
    "SDK Development",
    "Unreal Engine",
    "Godot",
    "Cocos2d-x",
    "Defold",
    "Java",
    "JavaScript",
    "Playables SDK Systems",
  ],
  responsibilities: [
    "Develop and ship hyper-casual games on Android and iOS with company backend SDK features including ads, wallet, leaderboard, and analytics.",
    "Publish playable ads across 10+ platform SDKs using consistent integration patterns and build profiles.",
    "Lead an outsource development team on a cricket mobile game—unblocking technical issues, prioritizing work, and guiding delivery as developer and product manager.",
  ],
  accomplishments: [
    "Brought the backend SDK integration to UPM-ready status and published it for internal and partner teams.",
    "Shipped titles to Google Play and the Apple App Store.",
    "Built a scripting-symbol-driven Playables SDK integration system with validator tooling, supporting 10+ ad platform SDKs from a single codebase.",
    "Stabilized and shipped ColorCrush2D and Intelliverse-X SDK after debugging UI scaling, logic issues, and non-production-ready SDK blockers.",
  ],
  featuredAccomplishment:
    "Designed a scripting-symbol-driven Playables SDK pipeline with integrated validation—supporting 10+ ad platform integrations and a roadmap of 50+ playables without manual per-build SDK swaps.",
  relatedProjectSlugs: [
    "colorcrush2d",
    "cricketx",
    "intelliverse-x-sdk",
    "quizverse",
    "levelrotator",
  ],
} as const;

export const SEED_ENGINEERING_LOGS = [
  {
    _id: "engineeringLog-colorcrush-sdk",
    title: "From Broken UI to Shipped SDK: Stabilizing ColorCrush2D",
    slug: "colorcrush-sdk-integration",
    categorySlug: "sdk-development",
    summary:
      "How I debugged a inherited Unity title, hardened a non-production SDK, and shipped wallet, leaderboard, and rewarded ad systems on my first studio project.",
    readTime: "7 min read",
    problem:
      "ColorCrush2D arrived with UI scaling bugs, logic defects, and an SDK that was not production-ready. Wallet and leaderboard integration had never been done on the project—and the backend SDK still needed fixes before any feature work could ship.",
    context:
      "This was my first project at ToBa Tech Solutions. The game needed company SDK features—ads, leaderboard, wallet, analytics, and rewarded revive logic—while the SDK itself required stabilization before integration could begin.",
    solution:
      "I systematically debugged UI and gameplay issues, then integrated SDK modules incrementally: analytics, rewarded ads with revive flow, leaderboard, and wallet. In parallel, I fixed SDK defects and packaged Intelliverse-X SDK for UPM distribution so future titles could integrate faster.",
    tradeoffs:
      "Fixing the SDK upstream slowed immediate feature work but reduced repeated firefighting across projects. I prioritized production readiness over quick hacks so ColorCrush2D and the SDK could ship together with maintainable patterns.",
    outcome:
      "ColorCrush2D and Intelliverse-X SDK both shipped. The integration patterns I established became reusable for later titles, and the SDK moved from unstable internal builds to a publishable UPM package.",
    technologies: [
      "Unity",
      "C#",
      "UPM",
      "Nakama",
      "REST APIs",
      "Rewarded Ads",
      "Wallet Systems",
      "Leaderboards",
    ],
    body: [
      textBlock("My first assignment at ToBa Tech was not greenfield—it was rescue work.", "normal"),
      textBlock("ColorCrush2D already existed, but it needed engineering discipline before it could carry live backend features.", "normal"),
      bulletBlock(
        "UI scaling and layout issues that broke across device aspect ratios",
      ),
      bulletBlock("Logical defects in core gameplay loops"),
      bulletBlock("An SDK that was functional in demos but not production-ready"),
      textBlock("The integration plan", "h2"),
      textBlock(
        "Once the game was stable, I wired in analytics, rewarded ads with revive logic, leaderboard, and wallet systems—each validated against real backend responses rather than mocked happy paths.",
        "normal",
      ),
      textBlock(
        "Wallet and leaderboard were especially challenging—it was my first time owning backend-facing features end to end. That learning curve forced me to understand RPC flows, error handling, and player-state edge cases deeply.",
        "blockquote",
      ),
      textBlock("Why fixing the SDK mattered", "h2"),
      textBlock(
        "Patching around SDK bugs inside the game would have created a fragile title and a worse SDK for the next engineer. I split time between ColorCrush2D integration and SDK fixes, then packaged Intelliverse-X SDK for UPM so the team could ship integrations consistently.",
        "normal",
      ),
    ],
    relatedProjectSlugs: ["colorcrush2d", "intelliverse-x-sdk"],
    publishedAt: "2026-04-15T10:00:00.000Z",
  },
  {
    _id: "engineeringLog-playables-pipeline",
    title: "Scaling Playables Across 10+ Platforms Without 500 Manual Builds",
    slug: "playables-multi-platform-build-system",
    categorySlug: "playables",
    summary:
      "Building a profile-driven Playables SDK pipeline with scripting symbols and validator tooling for 50+ playables and 500+ platform-specific builds.",
    readTime: "8 min read",
    problem:
      "Publishing a single playable to one ad network is manageable. Publishing dozens of playables across 10+ platforms—with different SDKs per network—does not scale if every build is a manual SDK swap.",
    context:
      "The Playables initiative targets roughly 50+ playables, which implies hundreds of platform-specific builds. Each network expects its own SDK integration, and human error during manual build setup becomes the bottleneck.",
    solution:
      "I designed a build-profile system driven by scripting symbols: at build time, the selected profile activates the correct SDK, and a validator tool checks configuration before artifacts leave the pipeline.",
    tradeoffs:
      "Up-front tooling time replaced repetitive manual builds. The system is less flexible for one-off experiments but dramatically safer for high-volume production where consistency matters more than speed on a single ad hoc build.",
    outcome:
      "The team can target 10+ platform SDKs from shared project code, with validation catching misconfiguration early. The pipeline is structured to absorb the full 50+ playable roadmap without linear growth in manual build labor.",
    technologies: [
      "Unity",
      "C#",
      "Scripting Symbols",
      "Playables SDK",
      "Build Automation",
      "Validator Tooling",
      "Multi-Platform CI",
    ],
    body: [
      textBlock(
        "Playables sound small until you multiply them by platforms.",
        "normal",
      ),
      textBlock(
        "One creative, ten networks, ten SDKs—and we are not shipping one playable. We are shipping a catalog.",
        "normal",
      ),
      textBlock("The bottleneck", "h2"),
      textBlock(
        "Manual SDK swapping per build does not survive contact with a 50+ playable roadmap. At roughly ten platforms per playable, we were looking at hundreds of builds where a single misconfigured symbol could waste an upload cycle.",
        "normal",
      ),
      textBlock("Profile-driven builds", "h2"),
      textBlock(
        "Each build profile selects its SDK through scripting symbols. The project stays unified; the build knows which integration to activate. A validator runs before export to catch missing symbols, wrong SDK versions, and incomplete profile metadata.",
        "normal",
      ),
      bulletBlock("Scripting-symbol profiles per ad platform SDK"),
      bulletBlock("Pre-export validator for integration completeness"),
      bulletBlock("Shared codebase across 10+ platform targets"),
      textBlock(
        "This is the kind of internal tooling that does not show up in a screenshot—but it is what makes a playable program shippable at studio scale.",
        "blockquote",
      ),
    ],
    relatedProjectSlugs: ["intelliverse-x-sdk"],
    publishedAt: "2026-05-20T10:00:00.000Z",
  },
] as const;

export const ENGINEERING_CATEGORY_SEED = ENGINEERING_CATEGORIES.map((category) => ({
  _id: `projectCategory-${category.slug}`,
  _type: "projectCategory" as const,
  title: category.title,
  slug: { _type: "slug" as const, current: category.slug },
  domain: "engineering" as const,
}));
