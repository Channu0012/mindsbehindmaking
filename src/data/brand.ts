export interface SocialChannel {
  id: "youtube" | "x" | "github" | "instagram";
  name: string;
  handle: string;
  url: string;
  role: string;
  primary?: boolean;
  cadence: string;
}

export interface DispatchNote {
  id: string;
  source: "Founder Note" | "Prompt Spec" | "Shipped";
  date: string;
  title: string;
  body: string;
  href: string;
  featured?: boolean;
}

export interface ProcessStage {
  id: "deconstruct" | "system" | "build" | "publish";
  step: string;
  name: string;
  headline: string;
  description: string;
  deliverable: string;
  tools: string[];
  rule: string;
}

export interface TopicProposal {
  id: string;
  code: string;
  title: string;
  angle: string;
  initialVotes: number;
}

export const SITE_CONFIG = {
  name: "MindsBehindMaking",
  displayTitle: "MINDS BEHIND MAKING",
  shortName: "MBM",
  domain: "mindsbehindmaking.com",
  tagline:
    "How founders, designers, and engineers actually think—and build. Every YouTube breakdown opens the system prompts, tools, websites, and architectural tradeoffs behind what ships.",
  founderNote:
    "Building Season 01 in public. No exaggerated promises, no gated templates—just real software engineering, intentional design, and honest lessons.",
  heroStatus: "Season 01 · YouTube Long-Form & Engineering Studio",
  youtubePrimaryUrl: "https://www.youtube.com/@mindsbehindmaking?sub_confirmation=1",
  youtubeChannelUrl: "https://www.youtube.com/@mindsbehindmaking",
  email: "hello@mindsbehindmaking.com",
} as const;

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: "youtube",
    name: "YouTube",
    handle: "@mindsbehindmaking",
    url: "https://www.youtube.com/@mindsbehindmaking",
    role: "Main Channel · Full-length build breakdowns, live architecture & craft studies",
    primary: true,
    cadence: "Long-Form Primary",
  },
  {
    id: "x",
    name: "X",
    handle: "@mindsbehindmaking",
    url: "https://x.com/mindsbehindmaking",
    role: "Daily build-in-public commits, motion tests & prompt diffs",
    cadence: "Daily Dispatches",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "mindsbehindmaking",
    url: "https://github.com/mindsbehindmaking",
    role: "Design tokens, Next.js starters & open episode repositories",
    cadence: "Every Release",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@mindsbehindmaking",
    url: "https://instagram.com/mindsbehindmaking",
    role: "60-second UI details, typography studies & studio reels",
    cadence: "Short Cuts",
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "deconstruct",
    step: "01",
    name: "Deconstruct",
    headline: "Strip the problem before opening an editor.",
    description:
      "Every build starts with sharp constraints: why do existing solutions look generic, sluggish, or dishonest? We map the real user workflow and cut decorative bloat before writing code.",
    deliverable: "Architecture Brief & Anti-Slop Checklist",
    tools: ["Figma", "Linear Benchmark", "Stripe Press"],
    rule: "Never prompt or code until you know what you are deliberately refusing to build.",
  },
  {
    id: "system",
    step: "02",
    name: "Design System",
    headline: "Lock three-layer tokens & optical hierarchy.",
    description:
      "Palette contrast, tracking curves, and surface depth live in semantic CSS tokens. Anchored in Obsidian (#111111), Cream (#F4F1EA), and Brushed Gold (#C6A46A), every view scales cleanly.",
    deliverable: "design-tokens.css + Type Scale + Brand Mark",
    tools: ["Tailwind CSS v4", "Inter Tight", "Instrument Serif"],
    rule: "Zero hardcoded hex leaks inside JSX components. Tokens drive web and video packaging.",
  },
  {
    id: "build",
    step: "03",
    name: "Prompt & Engineer",
    headline: "Constrain AI like a principal peer.",
    description:
      "Instead of lazy one-liners, we engineer constrained prompts naming exact curves, accessible contrast ratios, and failure states. Every snag is logged inside the episode's What Broke section.",
    deliverable: "Typed Next.js App + Versioned Prompt Specs",
    tools: ["Next.js", "Motion", "JetBrains Mono"],
    rule: "Animate only GPU-safe transforms and opacity; keep keyboard commands at 0ms mount.",
  },
  {
    id: "publish",
    step: "04",
    name: "Package & Ship",
    headline: "Turn each video into a living engineering artifact.",
    description:
      "Every YouTube breakdown drops with its companion build blueprint, live-compiled prompts, referenced tools, and 16:9 Canvas-exported thumbnail—one clean link in every description.",
    deliverable: "YouTube Episode + Companion Page + PNG Cover",
    tools: ["Screen Studio", "Canvas Studio (/studio)", "YouTube"],
    rule: "Respect viewer intelligence: show the finished craft in frame one, never clickbait.",
  },
];

export const DISPATCH_NOTES: DispatchNote[] = [
  {
    id: "d-01",
    source: "Founder Note",
    date: "THESIS // 01",
    title: "Why minds & making need each other",
    body: "Ideas without engineering stay floating circles. Engineering without taste produces rigid, soulless squares.\n\nThe gold happens at the intersection—where thinking shapes craft.",
    href: "/builds/001-anti-slop-brand-and-studio",
    featured: true,
  },
  {
    id: "d-02",
    source: "Prompt Spec",
    date: "PRM-01",
    title: "Stop asking AI to 'make it look premium'",
    body: "Models default to training clichés unless you dictate constraints: exact palette hexes, font tracking scales, and explicit layout bans.",
    href: "/prompts?focus=prm-01",
  },
  {
    id: "d-03",
    source: "Shipped",
    date: "EP.002 WIP",
    title: "Keyboard shortcuts deserve 0ms latency",
    body: "Any menu opened with Cmd+K 40 times a day feels broken behind a slow fade-scale. Snap open on keydown; save motion for pointer triggers.",
    href: "/builds/002-keyboard-first-command-ui",
  },
  {
    id: "d-04",
    source: "Founder Note",
    date: "PACKAGING",
    title: "Packaging for smart builders",
    body: "No shocked faces. No red arrows.\n\nUse disciplined typography, real UI crops, and let the shipped work earn the click.",
    href: "/studio",
  },
  {
    id: "d-05",
    source: "Prompt Spec",
    date: "PRM-03",
    title: "Document what broke, not just the win",
    body: "Clean demo reels hide reality. Logging the font build error or layout jitter builds 10x deeper trust than pretending everything worked first try.",
    href: "/prompts?focus=prm-03",
  },
];

export const TOPIC_PROPOSALS: TopicProposal[] = [
  {
    id: "prop-01",
    code: "EP.004",
    title: "Building a Local-First Founder OS in Next.js + SQLite",
    angle: "Zero-latency notes, video pipeline tracker & prompt tagging",
    initialVotes: 14,
  },
  {
    id: "prop-02",
    code: "EP.005",
    title: "Apple-Style Gesture Physics & Bottom Sheets on the Web",
    angle: "Pointer capture, velocity projection & rubber-banding math",
    initialVotes: 11,
  },
  {
    id: "prop-03",
    code: "EP.006",
    title: "AI Design Audit: Turning a Messy Prompt into Stripe-Grade Craft",
    angle: "Live before/after refactor + exact constraint prompt stack",
    initialVotes: 19,
  },
];

export const ANTI_SLOP_PRINCIPLES = [
  {
    code: "01",
    title: "Obsidian, Cream & Brushed Gold",
    detail: "Unified darkroom surface (#111111) with warm archival bone ink (#F4F1EA) and #C6A46A accent—zero neon purple/cyan blurs.",
  },
  {
    code: "02",
    title: "Critically Damped Motion",
    detail: "Bounce-free springs on shared controls, sub-200ms ease-out transitions, and 0ms keyboard command launch.",
  },
  {
    code: "03",
    title: "Builder-to-Builder Copy",
    detail: "Zero marketing fluff or fake follower badges. Concrete architecture notes, timings, and honest debugging logs.",
  },
  {
    code: "04",
    title: "Executable Prompt Engineering",
    detail: "Live variable compilers, 1-click presets, JSON schema export, and direct Claude / Gemini / ChatGPT launches.",
  },
] as const;

export const BRAND_SWATCHES = [
  { name: "Obsidian Canvas", token: "--bg", hex: "#111111", role: "Primary Canvas" },
  { name: "Deep Atelier", token: "--bg-deep", hex: "#0B0B0A", role: "Footer & Boot" },
  { name: "Charcoal Lift", token: "--bg-elevated", hex: "#171715", role: "Elevated Surface" },
  { name: "Graphite Well", token: "--bg-recessed", hex: "#1E1E1B", role: "Code & Input Bay" },
  { name: "Hairline Rule", token: "--rule", hex: "#262522", role: "1px Grid Divider" },
  { name: "Warm Cream Ink", token: "--ink", hex: "#F4F1EA", role: "Primary Type (16.5:1)" },
  { name: "Muted Stone", token: "--ink-muted", hex: "#888378", role: "Mono Metadata (4.9:1)" },
  { name: "Brushed Gold", token: "--gold", hex: "#C6A46A", role: "Brand Accent (7.9:1)" },
] as const;
