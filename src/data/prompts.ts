export type PromptStage = "Architecture" | "UI Craft" | "Motion" | "Content Ops";

export interface PromptVariable {
  key: string;
  label: string;
  defaultValue: string;
}

export interface PromptPreset {
  label: string;
  values: Record<string, string>;
}

export interface PromptItem {
  id: string;
  code: string;
  title: string;
  stage: PromptStage;
  model: string;
  episodeNumber: string;
  episodeSlug: string;
  summary: string;
  constraintsCount: number;
  badPrompt: string;
  template: string;
  variables: PromptVariable[];
  presets: PromptPreset[];
  simulatedOutput: string;
  whyItWorks: string;
}

export const PROMPT_ITEMS: PromptItem[] = [
  {
    id: "prm-01",
    code: "PRM-01",
    title: "Anti-Slop Design System Architect",
    stage: "Architecture",
    model: "Claude / Gemini Pro",
    episodeNumber: "001",
    episodeSlug: "001-anti-slop-brand-and-studio",
    summary:
      "Forces the model to generate a calibrated 3-layer Obsidian & Gold token sheet with measurable contrast ratios and zero neon SaaS clichés.",
    constraintsCount: 7,
    badPrompt:
      "Make a super modern sleek dark AI website design system with cool glowing purple gradients and glass cards.",
    template: `Act as a Staff Design Engineer. Define a three-layer CSS token system (primitive -> semantic -> component) for {{BRAND_NAME}}, a {{PRODUCT_TYPE}}.

Hard visual bans:
- No glowing neon purple/cyan radial blurs or gradient headline text.
- No decorative sparkle icons or generic 3-card bento grids.
- Minimum 4.5:1 contrast for muted metadata; verify primary ink pairs.

Output requirements:
1. Calibrated obsidian base ({{BASE_HEX}}) + warm archival foreground ink.
2. Single restrained luxury accent ({{ACCENT_MOOD}}) strictly for active states and structural markers.
3. Typography pairing rules with explicit optical letter-spacing per scale + tabular-nums on metadata.`,
    variables: [
      { key: "BRAND_NAME", label: "Brand", defaultValue: "MindsBehindMaking" },
      { key: "PRODUCT_TYPE", label: "Product", defaultValue: "founder engineering & media hub" },
      { key: "BASE_HEX", label: "Canvas Hex", defaultValue: "#111111" },
      { key: "ACCENT_MOOD", label: "Accent", defaultValue: "Brushed Gold #C6A46A" },
    ],
    presets: [
      {
        label: "MBM Obsidian",
        values: {
          BRAND_NAME: "MindsBehindMaking",
          PRODUCT_TYPE: "founder engineering & media hub",
          BASE_HEX: "#111111",
          ACCENT_MOOD: "Brushed Gold #C6A46A",
        },
      },
      {
        label: "SaaS Developer Tool",
        values: {
          BRAND_NAME: "TraceKit",
          PRODUCT_TYPE: "API latency profiler",
          BASE_HEX: "#0E1013",
          ACCENT_MOOD: "Signal Amber #E59F3D",
        },
      },
      {
        label: "Studio Monograph",
        values: {
          BRAND_NAME: "Atelier 04",
          PRODUCT_TYPE: "industrial design archive",
          BASE_HEX: "#141312",
          ACCENT_MOOD: "Warm Limestone #D8CFC0",
        },
      },
    ],
    simulatedOutput: `/* tokens.css — Generated Output Skeleton */
:root {
  --bg: #111111;
  --bg-elevated: #171715;
  --ink: #F4F1EA;       /* 16.5:1 contrast */
  --ink-muted: #888378; /* 4.9:1 contrast  */
  --gold: #C6A46A;      /* 7.9:1 on #111   */
}
/* Type: Inter Tight (-0.048em display) + JetBrains Mono (tabular-nums) */`,
    whyItWorks:
      "Models regress to training-set clichés unless you name explicit visual bans and enforce verifiable hex contrast pairs.",
  },
  {
    id: "prm-02",
    code: "PRM-02",
    title: "Tactile Motion & Spring Physics Spec",
    stage: "Motion",
    model: "Claude / Gemini Pro",
    episodeNumber: "001",
    episodeSlug: "001-anti-slop-brand-and-studio",
    summary:
      "Replaces vague 'add smooth animations' prompts with GPU-composited properties, bounce-0 springs, and 0ms keyboard response rules.",
    constraintsCount: 6,
    badPrompt:
      "Add nice smooth framer motion animations to everything so the site feels super dynamic and bouncy.",
    template: `Refactor the UI motion layer for {{COMPONENT_SCOPE}} following design-engineering physics rules:

Constraints:
1. Animate ONLY GPU properties (transform, opacity, clip-path). Never animate width, height, padding, or transition: all.
2. Use custom ease-out cubic-bezier(0.23, 1, 0.32, 1) under {{MAX_DURATION}} for state shifts; never use ease-in for UI controls.
3. For shared segmented tabs, use a critically damped spring (bounce: 0, duration: 0.28).
4. Never enter from scale(0); start at scale(0.96) + opacity: 0 or directional clip-path reveal.
5. Add :active { transform: scale(0.97) } on pressable buttons and gate hover states inside @media (hover: hover) and (pointer: fine).
6. Respect prefers-reduced-motion: reduce completely.`,
    variables: [
      { key: "COMPONENT_SCOPE", label: "Scope", defaultValue: "tabs, copy buttons & hero lens" },
      { key: "MAX_DURATION", label: "Max Duration", defaultValue: "200ms" },
    ],
    presets: [
      {
        label: "Precision Tabs & Cards",
        values: {
          COMPONENT_SCOPE: "tabs, copy buttons & hero lens",
          MAX_DURATION: "200ms",
        },
      },
      {
        label: "Mobile Drawers & Sheets",
        values: {
          COMPONENT_SCOPE: "navigation sheets & action drawers",
          MAX_DURATION: "280ms",
        },
      },
    ],
    simulatedOutput: `export const SPRING_SNAPPY = { type: "spring", bounce: 0, duration: 0.28 };
.mbm-btn:active { transform: scale(0.97); }
@media (hover: hover) and (pointer: fine) {
  .mbm-btn:hover { transform: translateY(-1.5px); }
}`,
    whyItWorks:
      "Specifying bounce: 0, exact bezier tuples, and compositor-only properties eliminates sluggish layout thrashing and cartoon overshoot.",
  },
  {
    id: "prm-03",
    code: "PRM-03",
    title: "Companion Build Log Extractor",
    stage: "Content Ops",
    model: "Gemini Pro",
    episodeNumber: "001",
    episodeSlug: "001-anti-slop-brand-and-studio",
    summary:
      "Turns raw engineering notes into an honest build-in-public breakdown with concrete bugs hit, tradeoffs made, and chapter timestamps.",
    constraintsCount: 5,
    badPrompt:
      "Write an engaging blog post summarizing my latest YouTube coding video in an inspiring tone.",
    template: `Convert these raw build notes for {{EPISODE_CODE}} into a crisp engineering build log.

Tone rules:
- Write like a founder-engineer explaining real commits to a sharp peer.
- Ban hype adjectives: "revolutionary", "seamless", "unlock", "elevate", "game-changer", "delve".
- Lead with real constraints (timings, hex ratios, architectural tradeoffs).

Structure:
1. 2-sentence thesis stating the problem solved and constraint chosen.
2. 3 key architectural decisions (Heading + rationale).
3. At least 2 "What Broke -> How We Fixed It" pairs from real debugging.
4. Timestamped chapter index aligned to {{VIDEO_LENGTH}} runtime.`,
    variables: [
      { key: "EPISODE_CODE", label: "Episode", defaultValue: "EP. 001" },
      { key: "VIDEO_LENGTH", label: "Runtime", defaultValue: "24:18" },
    ],
    presets: [
      {
        label: "Launch Build EP.001",
        values: { EPISODE_CODE: "EP. 001", VIDEO_LENGTH: "24:18" },
      },
      {
        label: "Fast Deep Dive (15m)",
        values: { EPISODE_CODE: "EP. 002", VIDEO_LENGTH: "15:30" },
      },
    ],
    simulatedOutput: `decisions: [
  { heading: "Obsidian-only atelier surface", detail: "Eliminates light/dark split jarring..." }
]
failuresAndFixes: [
  { broke: "Google Fonts variable array regex failed in Next 15", fix: "Omitted static weight list..." }
]`,
    whyItWorks:
      "Forcing 'What Broke -> Fix' pairs turns generic promotional summaries into credible documentation engineers actually bookmark.",
  },
  {
    id: "prm-04",
    code: "PRM-04",
    title: "Principal Code & UI Diff Reviewer",
    stage: "UI Craft",
    model: "Claude / Gemini Pro",
    episodeNumber: "001",
    episodeSlug: "001-anti-slop-brand-and-studio",
    summary:
      "Audits React + Tailwind components before deploy to catch raw hex leaks, missing focus rings, and un-gated touch hovers.",
    constraintsCount: 5,
    badPrompt: "Review my React component and tell me how to make the UI cleaner.",
    template: `Audit the provided {{FRAMEWORK}} component as a Principal Design Engineer. Output ONLY concrete defects in a table (Before | After | Why):

Check for:
1. Hardcoded hex colors bypassing semantic tokens.
2. Missing focus-visible outlines, aria-labels, or contrast below 4.5:1.
3. Unbounded transition: all declarations or non-GPU property animations.
4. Missing tabular-nums on numeric counters, codes, or timestamps.
5. Responsive horizontal overflow risks at 375px width.`,
    variables: [
      { key: "FRAMEWORK", label: "Stack", defaultValue: "Next.js 15 + Tailwind v4" },
    ],
    presets: [
      { label: "Next.js + Tailwind v4", values: { FRAMEWORK: "Next.js 15 + Tailwind v4" } },
      { label: "React Native / Expo", values: { FRAMEWORK: "React Native + NativeWind" } },
    ],
    simulatedOutput: `| Before | After | Why |
| transition: all 300ms | transition: transform 150ms var(--ease-out) | Avoid layout/paint triggers |
| text-[12px] | mbm-m tabular-nums | Prevents timestamp jitter |`,
    whyItWorks:
      "Constraining output to a strict Before/After/Why diff catches subtle polish defects right before shipping.",
  },
  {
    id: "prm-05",
    code: "PRM-05",
    title: "Zero-Latency Command Palette Spec",
    stage: "UI Craft",
    model: "Claude / Gemini Pro",
    episodeNumber: "002",
    episodeSlug: "002-keyboard-first-command-ui",
    summary:
      "Architects a Raycast-speed Cmd+K command bar with 0ms keyboard mount, deterministic ranking, and focus restoration.",
    constraintsCount: 5,
    badPrompt: "Build a search modal with Cmd+K shortcut in React.",
    template: `Build an accessible Command Palette for {{APP_NAME}} with zero perceived keyboard latency.

Requirements:
1. Opening via Cmd+K / Ctrl+K or '/' mounts immediately (0ms entrance transition).
2. Clicking the trigger button applies a crisp 140ms ease-out scale from 0.975.
3. Support ArrowUp / ArrowDown wrapping, Home / End jump, Enter execute, and Escape restoring previous activeElement focus.
4. Rank results deterministically: exact prefix > title substring > tag match.
5. Isolate scrolling via overscroll-behavior: contain and scrollIntoView({ block: 'nearest' }).`,
    variables: [{ key: "APP_NAME", label: "App", defaultValue: "MindsBehindMaking" }],
    presets: [
      { label: "MindsBehindMaking", values: { APP_NAME: "MindsBehindMaking" } },
      { label: "Linear-Style Workspace", values: { APP_NAME: "Studio OS" } },
    ],
    simulatedOutput: `if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
  e.preventDefault();
  openPalette("keyboard"); // 0ms entrance delay
}`,
    whyItWorks:
      "Separating keyboard triggers (0ms) from pointer animations removes the lag that ruins web command bars.",
  },
  {
    id: "prm-06",
    code: "PRM-06",
    title: "Founder YouTube Packaging & Hook Critic",
    stage: "Content Ops",
    model: "Gemini Pro",
    episodeNumber: "003",
    episodeSlug: "003-youtube-packaging-system",
    summary:
      "Crafts high-retention YouTube titles, 4-word thumbnail overlays, and 30-second cold-open scripts tailored for smart builders.",
    constraintsCount: 4,
    badPrompt: "Give me 10 viral YouTube titles for my web development video.",
    template: `Propose 5 YouTube title + thumbnail overlay pairs for a build breakdown about {{TOPIC}}.

Audience: Engineers, founders, and serious designers.
Rules:
- Title max 55 characters; lead with the tension or real system built.
- Thumbnail text max 4 words that complement (never duplicate) the title.
- Ban hype words ("INSANE", "DESTROYS", "YOU WON'T BELIEVE").
- Include a 30-second cold open showing the shipped artifact in frame 1 before explaining why.`,
    variables: [
      {
        key: "TOPIC",
        label: "Video Topic",
        defaultValue: "building an anti-slop Obsidian brand & Next.js studio",
      },
    ],
    presets: [
      {
        label: "Brand & Web Build",
        values: { TOPIC: "building an anti-slop Obsidian brand & Next.js studio" },
      },
      {
        label: "AI Prompt Engineering",
        values: { TOPIC: "why 95% of AI prompts ship generic UI and how to constrain them" },
      },
    ],
    simulatedOutput: `Title: How I Designed a Founder Site Without AI Clichés (52 chars)
Thumb: OBSIDIAN + CRAFT
Frame 1 Hook (0:00-0:15): Show live Cmd+K + Canvas exporter before opening Figma/code.`,
    whyItWorks:
      "Respecting senior audience intelligence drives real watch retention instead of empty clickbait bounces.",
  },
];
