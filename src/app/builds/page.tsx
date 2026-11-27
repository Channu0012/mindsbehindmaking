import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { EpisodeCoverArtwork } from "@/components/studio/EpisodeCoverArtwork";
import { BUILD_EPISODES } from "@/data/builds";
import { SITE_CONFIG } from "@/data/brand";

export const metadata: Metadata = {
  title: "Builds & Episodes",
  description:
    "Every MindsBehindMaking long-form YouTube build paired with architecture breakdowns, prompts, and websites used.",
};

export default function BuildsPage() {
  return (
    <div className="mbm-wrap py-16 sm:py-24 space-y-14">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-10">
        <div>
          <span className="mbm-m text-gold">ARCHIVE // SEASON 01 BUILDS</span>
          <h1 className="mt-2 mbm-display text-[clamp(36px,5.2vw,68px)] text-ink">
            Every build{" "}
            <span className="mbm-serif italic font-normal text-gold">documented.</span>
          </h1>
          <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-ink-secondary">
            Long-form YouTube breakdowns paired with the exact architecture choices, what broke, prompts, and websites used.
          </p>
        </div>

        <a
          href={SITE_CONFIG.youtubePrimaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mbm-btn bg-gold text-obsidian font-semibold hover:bg-ink"
        >
          <span>Subscribe on YouTube</span>
          <span className="mbm-arr" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
            <h2 className="text-[22px] font-medium tracking-[-0.03em] leading-[1.12] text-ink group-hover:text-gold transition-colors">
              {ep.title}
            </h2>
            <p className="m-0 text-[14.5px] leading-[1.55] text-ink-secondary">{ep.subtitle}</p>
            <span className="mbm-m text-[10px] text-gold">
              Inspect blueprint <span className="mbm-arr">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
