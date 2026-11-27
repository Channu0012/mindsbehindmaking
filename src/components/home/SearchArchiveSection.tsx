"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { BUILD_EPISODES } from "@/data/builds";
import { PROMPT_ITEMS } from "@/data/prompts";
import { STACK_ENTRIES } from "@/data/stack";
import { RevealBlock } from "@/components/ui/MotionPrimitives";

interface ArchiveHit {
  id: string;
  badge: string;
  title: string;
  meta: string;
  href: string;
  keywords: string;
}

const QUICK_TOPICS = ["Prompts", "Motion", "Next.js", "Tokens", "YouTube", "Cmd+K"] as const;

export function SearchArchiveSection() {
  const [query, setQuery] = useState("");

  const index = useMemo<ArchiveHit[]>(() => {
    const epHits: ArchiveHit[] = BUILD_EPISODES.flatMap((ep) =>
      ep.chapters.map((ch) => ({
        id: `${ep.id}-${ch.time}`,
        badge: `${ep.code} · ${ch.time}`,
        title: ch.title,
        meta: `${ep.title} — ${ch.summary}`,
        href: `/builds/${ep.slug}`,
        keywords: `${ep.code} ${ep.title} ${ch.title} ${ch.summary} ${ep.tags.join(" ")}`,
      }))
    );

    const promptHits: ArchiveHit[] = PROMPT_ITEMS.map((prm) => ({
      id: prm.id,
      badge: prm.code,
      title: prm.title,
      meta: `${prm.stage} · ${prm.summary}`,
      href: `/prompts?focus=${prm.id}`,
      keywords: `${prm.code} ${prm.title} ${prm.stage} ${prm.summary} prompts`,
    }));

    const toolHits: ArchiveHit[] = STACK_ENTRIES.map((tool) => ({
      id: tool.id,
      badge: tool.category,
      title: `${tool.name} (${tool.domain})`,
      meta: `${tool.role} — ${tool.whyChosen}`,
      href: `/about#stack`,
      keywords: `${tool.name} ${tool.domain} ${tool.category} ${tool.role} tools websites`,
    }));

    return [...promptHits, ...epHits, ...toolHits];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 6);
    return index
      .filter(
        (hit) =>
          hit.title.toLowerCase().includes(q) ||
          hit.meta.toLowerCase().includes(q) ||
          hit.keywords.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [index, query]);

  return (
    <section id="search" className="border-b border-rule py-20 sm:py-28">
      <div className="mbm-wrap">
        <RevealBlock className="space-y-2">
          <span className="mbm-m text-gold">05 // UNIVERSAL INDEX</span>
          <h2 className="mbm-display text-[clamp(32px,4.6vw,58px)] text-ink">
            Every prompt, chapter &amp;{" "}
            <span className="mbm-serif italic font-normal text-gold">website,</span>{" "}
            searchable.
          </h2>
        </RevealBlock>

        <div className="mt-10 flex items-center gap-4 border-b border-rule-strong focus-within:border-gold transition-colors duration-200">
          <Search className="h-6 w-6 text-gold shrink-0" strokeWidth={1.75} aria-hidden="true" />
          <label htmlFor="home-archive-search" className="sr-only">
            Search episodes, prompts, and websites
          </label>
          <input
            id="home-archive-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: motion, tokens, YouTube, Next.js"
            autoComplete="off"
            className="w-full min-w-0 bg-transparent py-4 text-[clamp(20px,2.8vw,34px)] tracking-[-0.03em] text-ink placeholder:text-ink-muted/60 focus:outline-none"
          />
          <span className="hidden sm:inline shrink-0 mbm-m text-ink-muted">
            {index.length} entries indexed
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {QUICK_TOPICS.map((topic) => {
            const active = query.toLowerCase() === topic.toLowerCase();
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setQuery(active ? "" : topic)}
                className={`min-h-[38px] rounded-full border px-4 text-[13px] cursor-pointer transition-all duration-150 active:scale-[0.97] ${
                  active
                    ? "border-gold bg-gold text-obsidian font-semibold"
                    : "border-rule-strong bg-elevated text-ink-secondary hover:border-gold hover:text-ink"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        <div className="mt-8 mbm-m text-ink-muted pb-2">
          {query.trim() ? `${results.length} matching entries` : "Featured index entries"}
        </div>

        <div aria-live="polite" className="border-b border-rule">
          {results.length === 0 ? (
            <div className="border-t border-rule py-8 mbm-m text-ink-muted">
              NO ENTRIES MATCH &ldquo;{query}&rdquo; — TRY MOTION, TOKENS, OR YOUTUBE.
            </div>
          ) : (
            results.map((hit) => (
              <Link
                key={hit.id}
                href={hit.href}
                className="group grid grid-cols-1 sm:grid-cols-[130px_minmax(0,1fr)_auto] items-baseline gap-2 sm:gap-6 border-t border-rule px-2.5 py-5 hover:bg-elevated transition-colors duration-150"
              >
                <span className="mbm-m text-gold">{hit.badge}</span>
                <div className="min-w-0">
                  <strong className="block font-medium text-[18px] tracking-[-0.02em] text-ink group-hover:text-gold transition-colors duration-150">
                    {hit.title}
                  </strong>
                  <small className="block mt-1 text-[13px] text-ink-secondary truncate">
                    {hit.meta}
                  </small>
                </div>
                <span className="hidden sm:inline mbm-m text-ink-muted group-hover:text-gold">
                  Open <span className="mbm-arr">↗</span>
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
