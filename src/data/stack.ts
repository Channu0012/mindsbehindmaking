export type StackCategory =
  | "Engineering"
  | "Design & Type"
  | "Motion"
  | "Video & Capture"
  | "Websites";

export interface StackEntry {
  id: string;
  name: string;
  category: StackCategory;
  url: string;
  domain: string;
  role: string;
  whyChosen: string;
  replaced: string;
  episodeNumbers: string[];
  featured?: boolean;
}

export const STACK_ENTRIES: StackEntry[] = [
  {
    id: "nextjs",
    name: "Next.js App Router",
    category: "Engineering",
    url: "https://nextjs.org",
    domain: "nextjs.org",
    role: "Static-first routing, font optimization, metadata & OG pipeline",
    whyChosen:
      "Zero-FOUT Google Font injection via next/font, instant route prefetching, and clean slug structure for YouTube bio links.",
    replaced: "Heavy client-only SPA bundles with layout shift",
    episodeNumbers: ["001", "002"],
    featured: true,
  },
  {
    id: "tailwind-v4",
    name: "Tailwind CSS v4",
    category: "Engineering",
    url: "https://tailwindcss.com",
    domain: "tailwindcss.com",
    role: "CSS-first @theme token mapping with zero runtime styling overhead",
    whyChosen:
      "@theme inline binds directly to our 3-layer CSS custom properties so light/dark themes switch cleanly without prop drilling.",
    replaced: "Scattered tailwind.config.js hex overrides",
    episodeNumbers: ["001"],
    featured: true,
  },
  {
    id: "motion",
    name: "Motion (Framer Motion)",
    category: "Motion",
    url: "https://motion.dev",
    domain: "motion.dev",
    role: "Critically damped layout springs and interruptible shared indicators",
    whyChosen:
      "Handles velocity-preserving transitions on tab switches and reducedMotion='user' wrapping cleanly.",
    replaced: "Abrupt conditional mounts and jerky keyframe resets",
    episodeNumbers: ["001"],
    featured: true,
  },
  {
    id: "animations-dev",
    name: "Animations on the Web",
    category: "Motion",
    url: "https://animations.dev",
    domain: "animations.dev",
    role: "Reference benchmark for timing, blur bridges, and asymmetric exits",
    whyChosen:
      "Best practical engineering breakdown of why bounce: 0, origin-aware transforms, and fast UI durations feel tactile.",
    replaced: "Guessing arbitrary 300ms ease transitions",
    episodeNumbers: ["001", "002"],
    featured: true,
  },
  {
    id: "easings",
    name: "Easing.dev",
    category: "Motion",
    url: "https://easing.dev",
    domain: "easing.dev",
    role: "Stronger custom cubic-bezier curves beyond weak CSS defaults",
    whyChosen:
      "Built-in CSS ease-out lacks punch; custom curves like (0.23, 1, 0.32, 1) give immediate mechanical responsiveness.",
    replaced: "Default browser ease / sluggish ease-in",
    episodeNumbers: ["001"],
  },
  {
    id: "radix-primitives",
    name: "Radix / ARIA Patterns",
    category: "Engineering",
    url: "https://www.radix-ui.com",
    domain: "radix-ui.com",
    role: "Accessible keyboard focus, dialog trapping, and semantic primitives",
    whyChosen:
      "Guarantees screen-reader and Escape/Arrow navigation fidelity without fighting rigid visual themes.",
    replaced: "Div-soup click handlers with broken keyboard focus",
    episodeNumbers: ["002"],
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design & Type",
    url: "https://figma.com",
    domain: "figma.com",
    role: "Monogram geometry, 16:9 YouTube thumbnail grids, and spacing checks",
    whyChosen:
      "Fastest canvas to verify SVG stroke alignment, thumbnail legibility at mobile feed scale, and optical type balance.",
    replaced: "Generic Canva social templates",
    episodeNumbers: ["001", "003"],
    featured: true,
  },
  {
    id: "fontshare-google",
    name: "Inter + Instrument Serif + JetBrains Mono",
    category: "Design & Type",
    url: "https://fonts.google.com",
    domain: "fonts.google.com",
    role: "Core editorial + technical variable type stack",
    whyChosen:
      "Combines Swiss UI clarity, subtle editorial serif tension, and crisp tabular numerals for engineering metadata.",
    replaced: "Over-tracked Space Grotesk + uniform font weights",
    episodeNumbers: ["001"],
  },
  {
    id: "screen-studio",
    name: "Screen Studio / OBS",
    category: "Video & Capture",
    url: "https://screen.studio",
    domain: "screen.studio",
    role: "High-DPI code & browser recordings for YouTube long-form drops",
    whyChosen:
      "Keeps cursor focus sharp on small UI details and code diffs without needing heavy manual keyframing in Premiere.",
    replaced: "Blurry 720p full-screen captures",
    episodeNumbers: ["001", "003"],
  },
  {
    id: "stripe-press",
    name: "Stripe Press & Teenage Engineering",
    category: "Websites",
    url: "https://press.stripe.com",
    domain: "press.stripe.com",
    role: "Editorial layout, tactile color restraint, and monograph pacing",
    whyChosen:
      "Proof that generous margins, crisp grid rules, and physical print warmth age 10x better than flashy WebGL gimmicks.",
    replaced: "Dribbble dark-purple hero clones",
    episodeNumbers: ["001"],
  },
  {
    id: "linear-app",
    name: "Linear Design System",
    category: "Websites",
    url: "https://linear.app",
    domain: "linear.app",
    role: "Keyboard-first navigation ergonomics and subtle surface layering",
    whyChosen:
      "Gold standard for fast darkroom contrast hierarchy and effortless Cmd+K command workflows.",
    replaced: "Bloated enterprise dashboards",
    episodeNumbers: ["001", "002"],
  },
];
