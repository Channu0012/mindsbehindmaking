import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { MbmMark } from "@/components/brand/MbmMark";
import { ANTI_SLOP_PRINCIPLES, SITE_CONFIG, SOCIAL_CHANNELS } from "@/data/brand";
import { BUILD_EPISODES } from "@/data/builds";
import { STACK_ENTRIES } from "@/data/stack";

export const metadata: Metadata = {
  title: "About & Philosophy",
  description:
    "Why MindsBehindMaking exists, the engineering principles behind every build, and the tools and websites used in production.",
};

export default function AboutPage() {
  return (
    <div className="divide-y divide-rule">
      {/* Founder Manifesto Hero */}
      <section className="mbm-wrap py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="mbm-m text-gold">ABOUT // FOUNDER PHILOSOPHY</span>
            <h1 className="mbm-display text-[clamp(38px,5.4vw,76px)] text-ink">
              Built by a{" "}
              <span className="mbm-serif italic font-normal text-gold">builder,</span>{" "}
              not a prompt farm.
            </h1>
            <p className="max-w-[56ch] text-[17px] leading-[1.65] text-ink-secondary">
              MindsBehindMaking started with a simple frustration: the internet is flooded
              with 15-second AI hype demos that fall apart the moment a real user clicks a
              button. Real software lives in the invisible 20%—typography spacing, state
              transitions, contrast discipline, and clear product taste.
            </p>
            <p className="max-w-[56ch] text-[16px] leading-[1.65] text-ink-muted">
              This channel and studio document Season 01 from zero: every YouTube deep dive
              ships with the exact prompts, architecture choices, debugging mistakes, and
              websites that made it happen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={SITE_CONFIG.youtubePrimaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mbm-btn bg-gold text-obsidian font-semibold hover:bg-ink"
              >
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                <span>Watch on YouTube</span>
              </a>
              <Link
                href="/contact"
                className="mbm-btn border border-rule-strong bg-elevated text-ink hover:border-gold"
              >
                <span>Collaborate or Pitch</span>
                <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[18px] border border-rule-strong bg-deep p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-rule pb-4">
                <span className="mbm-m text-[10px] text-gold">EMBLEM THESIS</span>
                <span className="mbm-m text-[10px] text-ink-muted">CIRCLE ∩ SQUARE</span>
              </div>
              <div className="flex items-center justify-center py-4">
                <MbmMark size={136} />
              </div>
              <div className="space-y-3 border-t border-rule pt-5 text-[14px]">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="mbm-m text-[10px] text-ink">01 CIRCLE</span>
                  <span className="text-ink-secondary text-right">Inquiry, taste &amp; thinking</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="mbm-m text-[10px] text-ink">02 SQUARE</span>
                  <span className="text-ink-secondary text-right">Engineering, grids &amp; code</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="mbm-m text-[10px] text-gold">03 GOLD WEDGE</span>
                  <span className="text-gold text-right">Where mind shapes making</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Slop Standards */}
      <section className="mbm-wrap py-20 sm:py-24 space-y-10">
        <div className="space-y-2">
          <span className="mbm-m text-gold">01 // HOUSE STANDARDS</span>
          <h2 className="mbm-display text-[clamp(30px,4vw,52px)] text-ink">
            Non-negotiables in every{" "}
            <span className="mbm-serif italic font-normal text-gold">build.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ANTI_SLOP_PRINCIPLES.map((item) => (
            <div
              key={item.code}
              className="rounded-[14px] border border-rule bg-elevated p-6 space-y-3"
            >
              <span className="mbm-m text-gold">/{item.code}</span>
              <h3 className="text-[18px] font-medium tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-ink-secondary">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Driver Tools & Websites (integrated cleanly without separate Vault page) */}
      <section id="stack" className="mbm-wrap py-20 sm:py-24 space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="mbm-m text-gold">02 // DAILY STACK &amp; REFERENCES</span>
            <h2 className="mbm-display text-[clamp(30px,4vw,52px)] text-ink">
              Websites &amp; tools I{" "}
              <span className="mbm-serif italic font-normal text-gold">actually</span> use.
            </h2>
          </div>
          <Link href="/prompts" className="mbm-m text-gold hover:underline">
            Explore Prompt Lab →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-rule">
          {STACK_ENTRIES.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-r border-b border-rule bg-elevated p-6 flex flex-col justify-between gap-6 transition-colors duration-300 hover:bg-gold hover:text-obsidian"
            >
              <div className="flex items-center justify-between gap-2 mbm-m text-ink-muted group-hover:text-obsidian/80">
                <span>
                  {tool.category} · {tool.domain}
                </span>
                <span className="mbm-arr" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-[21px] font-semibold tracking-[-0.03em] leading-[1.08]">
                  {tool.name}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-ink-secondary group-hover:text-obsidian/85">
                  {tool.whyChosen}
                </p>
              </div>

              <div className="border-t border-rule group-hover:border-obsidian/20 pt-3 mbm-m text-[10px] text-ink-muted group-hover:text-obsidian/75">
                SKIPPED: {tool.replaced}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Season 01 Roadmap & Channels */}
      <section className="mbm-wrap py-20 sm:py-24 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-5">
          <span className="mbm-m text-gold">03 // SEASON 01 ROADMAP</span>
          <h2 className="mbm-display text-[30px] text-ink">Active Production Slate</h2>
          <div className="border-t border-rule">
            {BUILD_EPISODES.map((ep) => (
              <Link
                key={ep.id}
                href={`/builds/${ep.slug}`}
                className="group flex items-center justify-between gap-4 border-b border-rule py-4 hover:px-2 transition-all"
              >
                <div className="min-w-0">
                  <span className="mbm-m text-[10px] text-gold">{ep.code} · {ep.publishedLabel}</span>
                  <div className="mt-1 truncate text-[16px] font-medium text-ink group-hover:text-gold">
                    {ep.title}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-muted group-hover:text-gold shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <span className="mbm-m text-gold">04 // FOLLOW THE JOURNEY</span>
          <h2 className="mbm-display text-[30px] text-ink">Official Channels</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SOCIAL_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-[12px] border p-5 flex flex-col justify-between gap-4 transition-transform duration-200 hover:-translate-y-0.5 ${
                  ch.primary
                    ? "border-gold bg-gold text-obsidian"
                    : "border-rule bg-elevated text-ink hover:border-gold"
                }`}
              >
                <div className="flex items-center justify-between mbm-m text-[10px]">
                  <span className={ch.primary ? "text-obsidian/80" : "text-ink-muted"}>
                    {ch.cadence}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[20px] font-semibold tracking-[-0.025em]">{ch.name}</div>
                  <div className={`mt-1 mbm-m text-[10px] ${ch.primary ? "text-obsidian/75" : "text-ink-muted"}`}>
                    {ch.handle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
