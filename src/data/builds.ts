export interface EpisodeChapter {
  time: string;
  seconds: number;
  title: string;
  summary: string;
  linkedPromptCode?: string;
}

export interface BuildEpisode {
  id: string;
  number: string;
  code: string;
  slug: string;
  category: "Brand & UI" | "Motion" | "AI Systems" | "Content Ops";
  status: "shipped" | "in-production" | "queued";
  topicTag: string;
  title: string;
  subtitle: string;
  publishedLabel: string;
  duration: string;
  youtubeId: string | null;
  youtubeUrl: string;
  summary: string;
  metrics: {
    buildTime: string;
    primaryStack: string;
    promptsUsed: number;
    sitesReferenced: number;
  };
  decisions: {
    heading: string;
    detail: string;
  }[];
  failuresAndFixes: {
    broke: string;
    fix: string;
  }[];
  chapters: EpisodeChapter[];
  promptIds: string[];
  toolIds: string[];
  tags: string[];
}

export const BUILD_EPISODES: BuildEpisode[] = [
  {
    id: "ep-001",
    number: "001",
    code: "MBM001",
    slug: "001-anti-slop-brand-and-studio",
    category: "Brand & UI",
    status: "shipped",
    topicTag: "Flagship Launch",
    title: "Designing MindsBehindMaking Without AI Slop",
    subtitle:
      "Turning a blank folder into a monumental creator brand, custom token architecture, and YouTube companion hub.",
    publishedLabel: "LIVE BREAKDOWN",
    duration: "24:18",
    youtubeId: null,
    youtubeUrl: "https://www.youtube.com/@mindsbehindmaking",
    summary:
      "Most creator sites generated with AI look identical within three seconds: generic rounded bento boxes, neon purple blobs, and empty buzzwords. In Episode 001, we strip the clichés out and engineer a high-contrast #0A0A0A / #EDEAE3 / #FFFC00 studio system where every YouTube drop links directly to copyable prompts and tools.",
    metrics: {
      buildTime: "11 hrs",
      primaryStack: "Next.js · Tailwind v4 · Motion",
      promptsUsed: 4,
      sitesReferenced: 6,
    },
    decisions: [
      {
        heading: "Monumental Inter Tight scale over boxed SaaS widgets",
        detail:
          "Display typography up to 124px with -0.055em tracking and 1px warm graphite hairlines creates instant authority without heavy drop shadows or clutter.",
      },
      {
        heading: "One high-voltage accent (#FFFC00) on warm film black (#0A0A0A)",
        detail:
          "Reserving pure volt yellow exclusively for rotating discipline words, live markers, equalizer bars, and full-bleed showcase bands builds instant brand memory.",
      },
      {
        heading: "Critically damped springs & 0ms keyboard tools",
        detail:
          "Shared segmented indicators settle without cartoon bounce, while the Cmd+K index mounts instantaneously on keydown.",
      },
    ],
    failuresAndFixes: [
      {
        broke:
          "First iteration felt boxed-in and too safe—lacked editorial scale and emotional punch on first paint.",
        fix: "Rebuilt the entire visual system around masked line reveals, massive Inter Tight hierarchy, hairline edge grids, and high-contrast #FFFC00 callout bands.",
      },
      {
        broke:
          "Abrupt button label swaps during clipboard copy created visual flicker.",
        fix: "Added a 140ms blur-bridge transition paired with scale(0.97) pointer-down press feedback.",
      },
    ],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "Why AI websites look identical in 3 seconds",
        summary: "Auditing vibe-coded clichés and locking our strict anti-slop rules.",
      },
      {
        time: "04:35",
        seconds: 275,
        title: "Monumental typography & 1px hairline grids",
        summary: "Setting Inter Tight display tracking (-0.055em) and #0A0A0A / #EDEAE3 / #FFFC00 tokens.",
        linkedPromptCode: "PRM-01",
      },
      {
        time: "11:20",
        seconds: 680,
        title: "Motion physics: masked reveals, springs & blur",
        summary: "Replacing sluggish transition-all rules with GPU-only transforms and custom bezier curves.",
        linkedPromptCode: "PRM-02",
      },
      {
        time: "18:05",
        seconds: 1085,
        title: "Connecting YouTube drops to Prompts & Canvas Studio",
        summary: "Building the searchable chapter archive and PNG thumbnail exporter.",
        linkedPromptCode: "PRM-03",
      },
    ],
    promptIds: ["prm-01", "prm-02", "prm-03", "prm-04"],
    toolIds: ["nextjs", "motion", "tailwind-v4", "animations-dev", "easings", "screen-studio"],
    tags: ["Design System", "Motion", "Next.js", "Brand"],
  },
  {
    id: "ep-002",
    number: "002",
    code: "MBM002",
    slug: "002-keyboard-first-command-ui",
    category: "Motion",
    status: "in-production",
    topicTag: "In Production",
    title: "Zero-Latency Command Palettes & Keyboard UX",
    subtitle:
      "Building interfaces that respond on pointer-down and never animate in front of power users.",
    publishedLabel: "IN PRODUCTION",
    duration: "18:40",
    youtubeId: null,
    youtubeUrl: "https://www.youtube.com/@mindsbehindmaking",
    summary:
      "Deep dive into building a Raycast-grade command bar with 0ms keyboard invocation, deterministic fuzzy ranking, accessible focus trapping, and smooth roving selection.",
    metrics: {
      buildTime: "In progress",
      primaryStack: "React 19 · ARIA Combobox · CSS",
      promptsUsed: 2,
      sitesReferenced: 3,
    },
    decisions: [
      {
        heading: "Zero open animation on keyboard triggers",
        detail:
          "Actions repeated dozens of times an hour feel broken when delayed by 250ms fades. Instant mount on Cmd+K; subtle fade only on mouse click.",
      },
      {
        heading: "Pointer-down feedback over click release",
        detail:
          "Active item highlights and subtle scale feedback respond immediately when pressed.",
      },
    ],
    failuresAndFixes: [
      {
        broke: "Scroll-into-view jittered the whole page when navigating long command lists.",
        fix: "Isolated scrolling with overscroll-behavior: contain and block: 'nearest'.",
      },
    ],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "Why Raycast feels instantaneous",
        summary: "Measuring input-to-paint latency across modern web command menus.",
      },
      {
        time: "06:40",
        seconds: 400,
        title: "Building accessible keyboard roving focus",
        summary: "Handling ArrowUp/Down, Escape, and active-descendant states cleanly.",
        linkedPromptCode: "PRM-05",
      },
    ],
    promptIds: ["prm-05"],
    toolIds: ["nextjs", "animations-dev", "radix-primitives"],
    tags: ["UX Craft", "Keyboard", "Accessibility"],
  },
  {
    id: "ep-003",
    number: "003",
    code: "MBM003",
    slug: "003-youtube-packaging-system",
    category: "Content Ops",
    status: "queued",
    topicTag: "Season 01",
    title: "Code-Driven YouTube Thumbnails & Social Kit",
    subtitle:
      "Replacing messy templates with a repeatable HTML5 Canvas studio synced directly to brand tokens.",
    publishedLabel: "FILMING NEXT",
    duration: "16:15",
    youtubeId: null,
    youtubeUrl: "https://www.youtube.com/@mindsbehindmaking",
    summary:
      "How a solo builder exports crisp 16:9 YouTube thumbnails, 4:5 Instagram posts, and 1:1 X build cards in seconds directly from code—keeping channel identity razor-sharp.",
    metrics: {
      buildTime: "Queued",
      primaryStack: "HTML5 Canvas · Design Tokens",
      promptsUsed: 1,
      sitesReferenced: 2,
    },
    decisions: [
      {
        heading: "Artifact-first thumbnails over reaction faces",
        detail:
          "Builders click clarity, tight typography, and real craft—not inflated shock thumbnails.",
      },
    ],
    failuresAndFixes: [],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "Designing the 16:9 high-contrast grid",
        summary: "Safe zones for YouTube timestamps and mobile feed legibility.",
        linkedPromptCode: "PRM-06",
      },
    ],
    promptIds: ["prm-06"],
    toolIds: ["figma", "screen-studio"],
    tags: ["Content Ops", "Canvas", "YouTube"],
  },
];
