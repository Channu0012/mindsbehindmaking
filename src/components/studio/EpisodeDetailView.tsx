"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import type { BuildEpisode } from "@/data/builds";
import { PROMPT_ITEMS } from "@/data/prompts";
import { STACK_ENTRIES } from "@/data/stack";
import { EpisodeCoverArtwork } from "@/components/studio/EpisodeCoverArtwork";
import { CopyButton } from "@/components/ui/CopyButton";

export function EpisodeDetailView({ episode }: { episode: BuildEpisode }) {
  const [selectedChapter, setSelectedChapter] = useState(0);
  const currentChapter = episode.chapters[selectedChapter] ?? episode.chapters[0];

  const relatedPrompts = PROMPT_ITEMS.filter((p) => episode.promptIds.includes(p.id));
  const relatedTools = STACK_ENTRIES.filter((t) => episode.toolIds.includes(t.id));

  return (
    <div className="mbm-wrap py-12 sm:py-16">
      <Link href="/builds" className="mbm-m text-ink-muted hover:text-gold">
        ← All builds
      </Link>

      {/* Episode Hero */}
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold px-3 py-1 mbm-m text-[10px] font-semibold text-obsidian">
              {episode.topicTag}
            </span>
            <span className="mbm-m text-[10px] text-ink-muted">
              {episode.code} · {episode.publishedLabel} · {episode.duration}
            </span>
          </div>

          <h1 className="mbm-display text-[clamp(38px,5.5vw,76px)] text-ink">
            {episode.title}
          </h1>

          <p className="text-[18px] sm:text-[21px] leading-[1.4] tracking-[-0.02em] text-ink-secondary">
            {episode.subtitle}
          </p>
        </div>

        {/* 16:9 Interactive Player Shell */}
        <div className="lg:col-span-6">
          <div className="group relative aspect-video overflow-hidden rounded-[16px] shadow-[0_32px_72px_-20px_rgba(0,0,0,0.85)]">
            {episode.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${episode.youtubeId}?start=${
                  currentChapter?.seconds ?? 0
                }`}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <a
                href={episode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-full w-full"
              >
                <EpisodeCoverArtwork episode={episode} />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 grid h-[74px] w-[74px] place-items-center rounded-full bg-gold text-obsidian shadow-[0_0_0_10px_rgba(198,164,106,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 fill-current ml-1" aria-hidden="true" />
                </div>
              </a>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="mbm-m text-[10px] text-gold">
              CHAPTER [{currentChapter?.time}] // {currentChapter?.title}
            </span>
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mbm-m text-[10px] text-ink-muted hover:text-gold"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
      </div>

      {/* Gold Highlight Thesis */}
      {episode.decisions[0] && (
        <div className="mt-12 max-w-[700px] rounded-[16px] bg-gold p-7 text-obsidian space-y-2.5">
          <span className="mbm-m text-[10px] text-obsidian/75 font-semibold">
            CORE EPISODE THESIS
          </span>
          <p className="m-0 text-[22px] sm:text-[26px] font-medium tracking-[-0.03em] leading-[1.12]">
            {episode.decisions[0].heading}
          </p>
          <p className="m-0 text-[15px] leading-[1.6] text-obsidian/85">
            {episode.decisions[0].detail}
          </p>
        </div>
      )}

      {/* Hairline Stats Strip */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 border-t border-b border-rule">
        <div className="py-6 pr-4">
          <div className="text-[28px] sm:text-[36px] font-medium tracking-[-0.04em] tabular-nums text-ink">
            {episode.metrics.buildTime}
          </div>
          <div className="mt-1 mbm-m text-[10px] text-ink-muted">Build Time</div>
        </div>
        <div className="py-6 pr-4">
          <div className="text-[28px] sm:text-[36px] font-medium tracking-[-0.04em] tabular-nums text-ink">
            {String(episode.metrics.promptsUsed).padStart(2, "0")}
          </div>
          <div className="mt-1 mbm-m text-[10px] text-ink-muted">Prompts Extracted</div>
        </div>
        <div className="py-6 pr-4">
          <div className="text-[28px] sm:text-[36px] font-medium tracking-[-0.04em] tabular-nums text-ink">
            {String(episode.metrics.sitesReferenced).padStart(2, "0")}
          </div>
          <div className="mt-1 mbm-m text-[10px] text-ink-muted">Websites &amp; Tools</div>
        </div>
        <div className="py-6">
          <div className="text-[18px] sm:text-[21px] font-medium tracking-[-0.025em] text-ink leading-[1.2]">
            {episode.metrics.primaryStack}
          </div>
          <div className="mt-2 mbm-m text-[10px] text-ink-muted">Primary Stack</div>
        </div>
      </div>

      {/* 2-Column Decisions + Chapters */}
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="mbm-m text-gold">01 // OVERVIEW &amp; ARCHITECTURE</span>
            <p className="text-[17px] leading-[1.65] text-ink-secondary">{episode.summary}</p>
          </div>

          <div className="border-t border-rule">
            {episode.decisions.map((d, idx) => (
              <div key={idx} className="border-b border-rule py-5 space-y-1.5">
                <h2 className="text-[17px] font-medium tracking-[-0.02em] text-ink">
                  {d.heading}
                </h2>
                <p className="text-[14px] leading-[1.6] text-ink-secondary">{d.detail}</p>
              </div>
            ))}
          </div>

          {episode.failuresAndFixes.length > 0 && (
            <div className="space-y-4 pt-2">
              <span className="mbm-m text-gold">02 // WHAT BROKE &amp; HOW WE FIXED IT</span>
              <div className="space-y-3">
                {episode.failuresAndFixes.map((item, idx) => (
                  <div
                    key={idx}
                    className="mbm-surface-rim rounded-[14px] p-5 space-y-2"
                  >
                    <p className="text-[14px] text-ink-secondary">
                      <span className="mbm-m text-[#ff8a7a] font-semibold mr-2">BROKE:</span>
                      {item.broke}
                    </p>
                    <p className="text-[14px] text-ink font-medium">
                      <span className="mbm-m text-gold font-semibold mr-2">FIXED:</span>
                      {item.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-4">
          <span className="mbm-m text-gold">03 // CHAPTER TIMESTAMPS</span>
          <div className="border-t border-rule">
            {episode.chapters.map((ch, idx) => {
              const active = idx === selectedChapter;
              return (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => setSelectedChapter(idx)}
                  className={`grid w-full grid-cols-[76px_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-rule px-3 py-4 text-left cursor-pointer transition-colors duration-150 ${
                    active ? "bg-elevated" : "hover:bg-elevated/60"
                  }`}
                >
                  <span className={`mbm-m ${active ? "text-gold font-semibold" : "text-ink-muted"}`}>
                    {ch.time}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[16px] font-medium text-ink">{ch.title}</span>
                    <span className="block mt-1 text-[13px] text-ink-secondary">{ch.summary}</span>
                  </div>
                  {ch.linkedPromptCode && (
                    <span className="mbm-m text-[10px] text-gold">{ch.linkedPromptCode}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Linked Prompts */}
      {relatedPrompts.length > 0 && (
        <section className="mt-16 border-t border-rule pt-12 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mbm-m text-gold">COMPANION PROMPTS</span>
              <h2 className="mt-2 text-[28px] font-medium tracking-[-0.03em] text-ink">
                Prompts Used in {episode.code}
              </h2>
            </div>
            <Link href="/prompts" className="mbm-m text-gold hover:underline">
              Open Prompt IDE →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {relatedPrompts.map((prm) => (
              <div
                key={prm.id}
                className="mbm-surface-rim rounded-[14px] p-6 space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="mbm-m text-gold">
                    {prm.code} · {prm.stage}
                  </span>
                  <CopyButton text={prm.template} />
                </div>
                <h3 className="text-[19px] font-medium tracking-[-0.02em] text-ink">
                  {prm.title}
                </h3>
                <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-[8px] border border-rule bg-deep p-3.5 font-mono text-[12px] leading-[1.6] text-ink">
                  {prm.template}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Linked Websites & Stack */}
      {relatedTools.length > 0 && (
        <section className="mt-16 border-t border-rule pt-12 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mbm-m text-gold">TOOLS &amp; WEBSITES REFERENCED</span>
              <h2 className="mt-2 text-[28px] font-medium tracking-[-0.03em] text-ink">
                Used in {episode.code}
              </h2>
            </div>
            <Link href="/about#stack" className="mbm-m text-gold hover:underline">
              All Tools on About →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-rule">
            {relatedTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-r border-b border-rule bg-elevated p-6 flex flex-col justify-between gap-6 transition-colors duration-300 hover:bg-gold hover:text-obsidian"
              >
                <div className="flex items-center justify-between mbm-m text-ink-muted group-hover:text-obsidian/80">
                  <span>{tool.domain}</span>
                  <span className="mbm-arr">↗</span>
                </div>
                <div>
                  <div className="text-[20px] font-medium tracking-[-0.025em]">{tool.name}</div>
                  <p className="mt-1.5 text-[13px] text-ink-secondary group-hover:text-obsidian/85">
                    {tool.role}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
