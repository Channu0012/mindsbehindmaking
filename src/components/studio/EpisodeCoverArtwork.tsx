import React from "react";
import { MbmMark } from "@/components/brand/MbmMark";
import type { BuildEpisode } from "@/data/builds";

/**
 * Bespoke miniature UI visual composition inside 16:9 episode frames.
 * Ensures every build card communicates real engineering artifacts at a glance.
 */
export function EpisodeCoverArtwork({ episode }: { episode: BuildEpisode }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-[14px] border border-rule-strong bg-deep text-ink">
      {/* Subtle architectural grid & ambient radial light */}
      <div className="pointer-events-none absolute inset-0 mbm-draft-grid opacity-80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 80% at 85% 15%, rgba(198,164,106,0.12), transparent 65%)",
        }}
      />

      {/* Left Gold structural rule */}
      <span className="absolute left-0 top-[18%] bottom-[18%] z-20 w-[3px] bg-gold" />

      {/* Top Overlay Badges */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-4">
        <span className="rounded-full bg-gold px-2.5 py-0.5 mbm-m text-[9.5px] font-semibold text-obsidian">
          {episode.topicTag}
        </span>
        <span className="mbm-m text-[10px] text-ink-muted">{episode.code}</span>
      </div>

      {/* Episode-Specific Miniature Visual Craft */}
      <div className="relative z-10 flex h-[calc(100%-76px)] items-center justify-center px-5">
        {episode.id === "ep-001" && (
          <div className="w-full max-w-[280px] rounded-[10px] border border-rule-strong bg-[#151513]/95 p-3.5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2">
                <MbmMark size={18} />
                <span className="font-mono text-[9px] text-ink-muted">DESIGN TOKENS</span>
              </div>
              <span className="font-mono text-[9px] text-gold">16.5:1 AA</span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              <div className="rounded border border-rule bg-[#111111] p-2">
                <span className="block h-3 w-3 rounded-full bg-[#111111] border border-rule-strong" />
                <span className="mt-1.5 block font-mono text-[8px] text-ink-muted">#111111</span>
              </div>
              <div className="rounded border border-rule bg-[#111111] p-2">
                <span className="block h-3 w-3 rounded-full bg-[#F4F1EA]" />
                <span className="mt-1.5 block font-mono text-[8px] text-ink-muted">#F4F1EA</span>
              </div>
              <div className="rounded border border-gold/40 bg-[#111111] p-2">
                <span className="block h-3 w-3 rounded-full bg-[#C6A46A]" />
                <span className="mt-1.5 block font-mono text-[8px] text-gold">#C6A46A</span>
              </div>
            </div>
          </div>
        )}

        {episode.id === "ep-002" && (
          <div className="w-full max-w-[275px] rounded-[10px] border border-rule-strong bg-[#151513]/95 p-3 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <span className="font-mono text-[9px] text-ink-secondary">⌘K Jump to...</span>
              <span className="rounded bg-gold/15 px-1.5 py-0.5 font-mono text-[8px] text-gold">
                0MS MOUNT
              </span>
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between rounded bg-recessed px-2 py-1.5 border border-gold/30">
                <span className="text-[10px] font-medium text-ink">EP.001 Blueprint</span>
                <span className="font-mono text-[8px] text-gold">↵</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-[10px] text-ink-muted">Prompt Engineering IDE</span>
                <span className="font-mono text-[8px] text-ink-muted">/prompts</span>
              </div>
            </div>
          </div>
        )}

        {episode.id === "ep-003" && (
          <div className="relative w-full max-w-[275px] aspect-[16/9] rounded-[8px] border border-dashed border-gold/45 bg-[#141412]/90 p-3 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.03]">
            <div className="flex items-center justify-between">
              <span className="rounded bg-gold px-1.5 py-0.5 font-mono text-[8px] font-bold text-obsidian">
                1280 × 720
              </span>
              <MbmMark size={16} />
            </div>
            <div className="text-[13px] font-semibold tracking-[-0.03em] leading-[1.05] text-ink">
              Code-Driven YouTube Thumbnails
            </div>
            <div className="flex items-center justify-between font-mono text-[8px] text-ink-muted">
              <span>SAFE ZONE OK</span>
              <span className="rounded bg-black/80 px-1 text-ink">16:15</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metadata Bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 pb-3">
        <span className="mbm-m text-[10px] text-ink-secondary">{episode.category}</span>
        <span className="rounded-full border border-rule-strong bg-elevated px-2.5 py-0.5 mbm-m text-[9.5px] text-ink">
          {episode.duration}
        </span>
      </div>
    </div>
  );
}
