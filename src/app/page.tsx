import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MbmMark } from "@/components/brand/MbmMark";
import { HeroSection } from "@/components/home/HeroSection";
import { CraftComparisonSlider } from "@/components/home/CraftComparisonSlider";
import { MakingProcessWorkbench } from "@/components/home/MakingProcessWorkbench";
import { SearchArchiveSection } from "@/components/home/SearchArchiveSection";
import { DispatchesCarousel } from "@/components/home/DispatchesCarousel";
import { TopicQueueSection } from "@/components/home/TopicQueueSection";
import { EpisodeCoverArtwork } from "@/components/studio/EpisodeCoverArtwork";
import { PromptVaultExplorer } from "@/components/studio/PromptVaultExplorer";
import { RevealBlock } from "@/components/ui/MotionPrimitives";
import { BUILD_EPISODES } from "@/data/builds";
import { PROMPT_ITEMS } from "@/data/prompts";

const TICKER_ITEMS = [
  "EP.001 — Designing MindsBehindMaking Without AI Slop",
  "PRM-01 — Three-Layer Obsidian & Gold Token Architect",
  "EP.002 — Zero-Latency Command Palettes & Keyboard UX",
  "PRM-02 — Critically Damped Springs & GPU Motion",
  "EP.003 — Code-Driven 16:9 YouTube Packaging Studio",
  "Minds ∩ Making — Where Thinking Meets Craft",
];

export default function HomePage() {
  const tickerList = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div>
      {/* Full-Viewport Cinema Hero */}
      <HeroSection />

      {/* Continuous Horizontal Ticker */}
      <div className="border-b border-rule bg-deep overflow-hidden py-4" aria-hidden="true">
        <div className="mbm-marq">
          {tickerList.map((label, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-6 pr-6 mbm-m text-[11px] whitespace-nowrap text-ink-secondary"
            >
              <i className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* 01 — Interactive 60fps clip-path Craft Comparison Slider */}
      <CraftComparisonSlider />

      {/* 02 — Bespoke 16:9 Episode Blueprints */}
      <section className="border-b border-rule py-24 sm:py-32">
        <div className="mbm-wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <RevealBlock className="space-y-2">
              <span className="mbm-m text-gold">02 // SEASON 01 BLUEPRINTS</span>
              <h2 className="mbm-display text-[clamp(32px,4.8vw,60px)] text-ink">
                Every video unlocks the{" "}
                <span className="mbm-serif italic font-normal text-gold">entire</span>{" "}
                build.
              </h2>
            </RevealBlock>

            <Link
              href="/builds"
              className="mbm-btn mbm-surface-rim text-ink hover:border-gold"
            >
              <span>All builds</span>
              <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {BUILD_EPISODES.map((ep) => (
              <Link
                key={ep.id}
                href={`/builds/${ep.slug}`}
                className="group flex flex-col gap-3.5 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <EpisodeCoverArtwork episode={ep} />

                <div className="flex items-center gap-2.5 mbm-m text-[10px] text-ink-muted">
                  <span className="text-gold font-semibold">{ep.code}</span>
                  <span>·</span>
                  <span>
                    {ep.publishedLabel} · {ep.metrics.promptsUsed} Prompts
                  </span>
                </div>
                <h3 className="text-[22px] font-medium tracking-[-0.03em] leading-[1.12] text-ink group-hover:text-gold transition-colors">
                  {ep.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.55] text-ink-secondary">
                  {ep.subtitle}
                </p>
                <span className="mbm-m text-[10px] text-gold">
                  Inspect blueprint <span className="mbm-arr">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Master-Detail Split IDE Prompt Workbench */}
      <section className="border-b border-rule py-24 sm:py-32 bg-deep/50">
        <div className="mbm-wrap space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <RevealBlock className="space-y-2">
              <span className="mbm-m text-gold">03 // PROMPT ENGINEERING IDE</span>
              <h2 className="mbm-display text-[clamp(32px,4.8vw,60px)] text-ink">
                Presets, diffs &amp;{" "}
                <span className="mbm-serif italic font-normal text-gold">executable</span>{" "}
                specs.
              </h2>
              <p className="max-w-[56ch] text-[15px] text-ink-secondary">
                Select any spec on the left, customize variables inline, compare lazy AI prompts vs. expected output, export JSON, or run directly in ChatGPT &amp; Claude.
              </p>
            </RevealBlock>

            <Link
              href="/prompts"
              className="mbm-btn bg-gold text-obsidian font-semibold hover:bg-ink"
            >
              <span>Dedicated Lab ({PROMPT_ITEMS.length})</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <Suspense fallback={<div className="mbm-m text-ink-muted">Loading prompt IDE...</div>}>
            <PromptVaultExplorer />
          </Suspense>
        </div>
      </section>

      {/* 04 — Architectural Horizontal Making OS */}
      <MakingProcessWorkbench />

      {/* Full-Bleed Brushed Gold Atelier Band — Creator Asset Studio */}
      <section className="bg-gold text-obsidian py-24 sm:py-28 border-b border-rule">
        <div className="mbm-wrap flex flex-wrap items-center gap-12 lg:gap-16">
          <div className="flex-1 min-w-[290px] space-y-5">
            <span className="mbm-m text-obsidian/80 font-semibold">
              CREATOR TOOLKIT // /STUDIO
            </span>
            <h2 className="mbm-display text-[clamp(34px,4.8vw,62px)] text-obsidian">
              Export YouTube thumbnails &amp; descriptions in{" "}
              <span className="mbm-serif italic font-normal">seconds.</span>
            </h2>
            <p className="max-w-[46ch] text-[16px] leading-[1.6] text-obsidian/85">
              Built for shipping content fast: an HTML5 Canvas exporter drawing your
              Circle ∩ Square emblem onto 16:9 YouTube covers, plus a one-click YouTube
              description and timestamp formatter.
            </p>
            <div className="pt-2">
              <Link
                href="/studio"
                className="mbm-btn min-h-[52px] px-6 bg-obsidian text-ink font-semibold hover:bg-[#1E1E1B]"
              >
                <span>Open Creator Studio</span>
                <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex-1 min-w-[300px] grid grid-cols-[1.5fr_1fr] items-end gap-4">
            <div className="aspect-[16/10] rounded-[12px] border border-rule-strong bg-obsidian p-5 sm:p-6 text-ink flex flex-col justify-between shadow-[0_28px_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between">
                <span className="mbm-m text-[9px] text-gold">YOUTUBE · 16:9</span>
                <MbmMark size={26} />
              </div>
              <span className="font-medium tracking-[-0.04em] leading-[1.03] text-[clamp(16px,1.9vw,24px)]">
                The craft behind making real software.
              </span>
              <span className="mbm-m text-[9px] text-ink-muted">
                EP.001 // MINDS BEHIND MAKING
              </span>
            </div>

            <div className="aspect-[4/5] rounded-[14px] border border-rule-strong bg-elevated p-5 text-ink flex flex-col justify-between shadow-[0_28px_60px_rgba(0,0,0,0.35)]">
              <MbmMark size={26} />
              <span className="font-medium tracking-[-0.03em] leading-[1.08] text-[clamp(14px,1.5vw,19px)]">
                Ban AI clichés. Ship taste.
              </span>
              <span className="mbm-m text-[9px] text-gold">@MINDSBEHINDMAKING</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Universal Search Archive */}
      <SearchArchiveSection />

      {/* 06 — Field Notes & Community Topic Queue */}
      <DispatchesCarousel />
      <TopicQueueSection />
    </div>
  );
}
