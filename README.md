# MindsBehindMaking

> Where thinking meets craft — an Obsidian Atelier web studio, companion YouTube episode archive, Prompt Engineering IDE, and HTML5 Canvas asset exporter.

## Architecture & Highlights

- **Brand System (`#111111` / `#F4F1EA` / `#C6A46A`)**: Three-layer CSS tokens (`assets/design-tokens.css` & `assets/design-tokens.json`) synced to Tailwind CSS v4 with a custom geometric **Circle ∩ Square** vector emblem.
- **Cinema Hero & Interactive Craft Slider**: Full-viewport hero with pointer-tracked specular light, scroll-linked geometry, and a 60fps `clip-path` comparison slider contrasting default AI templates with engineered craft.
- **Prompt Engineering IDE (`/prompts`)**: Master-detail workbench with scenario presets, inline variable compilation, 3-mode inspection (*Engineered Spec*, *Lazy AI Prompt*, *Expected Output*), JSON export, local bookmarking, and direct ChatGPT / Claude deep launches.
- **Builds & Episode Blueprints (`/builds`, `/builds/[slug]`)**: Custom `16:9` miniature UI artworks, clickable chapter timestamps, architectural decisions, and *What Broke → Fix* engineering logs.
- **Creator Asset Studio (`/studio`)**: Export `16:9` YouTube thumbnails (`1280×720`), `4:5` social cards, and `1:1` graphics straight from HTML5 Canvas, plus a one-click YouTube description & timestamp formatter.
- **Founder About & Intake Studio (`/about`, `/contact`)**: Philosophy manifesto, daily driver tools/websites, Season 01 slate, and multi-category inquiry brief generator.
- **Zero-Latency Command Bar (`⌘K` / `/`)**: Instant keyboard navigation across episodes, prompts, and pages.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```
