"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { MbmWordmark } from "@/components/brand/MbmMark";
import { SITE_CONFIG, SOCIAL_CHANNELS } from "@/data/brand";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-rule bg-deep text-ink pt-24 sm:pt-32 pb-10 overflow-hidden">
      <div className="mbm-wrap">
        <div className="flex flex-wrap items-end justify-between gap-12">
          <div className="space-y-5">
            <MbmWordmark />
            <h2 className="m-0 pt-2 mbm-display text-[clamp(42px,6vw,92px)] text-ink">
              Where{" "}
              <span className="mbm-serif italic font-normal text-gold">thinking</span>
              <br />
              meets craft.
            </h2>
          </div>

          <div className="w-full max-w-[420px]">
            <p className="mbm-m text-ink-muted">
              DISPATCHES · NEW EPISODE + PROMPT DROPS
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-4 flex items-center gap-2 rounded-full border border-rule-strong bg-elevated p-1.5 pl-5 focus-within:border-gold transition-colors"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setJoined(false);
                  setEmail(e.target.value);
                }}
                placeholder="founder@domain.com"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="submit"
                className="mbm-btn min-h-[42px] h-[42px] px-5 bg-gold text-obsidian text-[13px] font-semibold hover:bg-ink"
              >
                {joined ? "Saved ✓" : "Notify Me"}
              </button>
            </form>
            {joined && (
              <p className="mt-2.5 mbm-m text-gold">
                Added locally. See you inside Episode 001.
              </p>
            )}
          </div>
        </div>

        {/* 4-column index */}
        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-rule pt-12 sm:grid-cols-4">
          <div className="flex flex-col">
            <span className="mbm-m text-ink-muted mb-3.5">Navigate</span>
            <Link href="/" className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors">
              Overview
            </Link>
            <Link href="/builds" className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors">
              Build Episodes
            </Link>
            <Link href="/prompts" className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors">
              Prompt IDE
            </Link>
            <Link href="/studio" className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors">
              Creator Studio
            </Link>
            <Link href="/about" className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors">
              About &amp; Stack
            </Link>
            <Link href="/contact" className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors">
              Contact &amp; Collabs
            </Link>
          </div>

          <div className="flex flex-col">
            <span className="mbm-m text-ink-muted mb-3.5">Channels</span>
            {SOCIAL_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors"
              >
                {ch.name} {ch.primary ? "· Main" : ""}
              </a>
            ))}
          </div>

          <div className="flex flex-col">
            <span className="mbm-m text-ink-muted mb-3.5">Season 01</span>
            <Link
              href="/builds/001-anti-slop-brand-and-studio"
              className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors"
            >
              EP.001 — Anti-Slop Studio
            </Link>
            <Link
              href="/builds/002-keyboard-first-command-ui"
              className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors"
            >
              EP.002 — Zero-Latency UX
            </Link>
            <Link
              href="/builds/003-youtube-packaging-system"
              className="py-1.5 text-[15px] text-ink-secondary hover:text-gold transition-colors"
            >
              EP.003 — Packaging System
            </Link>
          </div>

          <div className="space-y-3">
            <span className="mbm-m text-ink-muted block">Studio Ethos</span>
            <p className="text-[14.5px] leading-[1.6] text-ink-secondary">
              {SITE_CONFIG.founderNote}
            </p>
            <Link
              href="/contact"
              className="inline-block mbm-m text-[10px] text-gold hover:underline pt-1"
            >
              Pitch a Collaboration →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-7">
          <div className="flex flex-wrap items-center gap-5 mbm-m text-ink-muted">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.name}</span>
            <span>[⌘K] OR [/] COMMAND SEARCH</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
            className="grid h-12 w-12 place-items-center rounded-full border border-rule-strong text-ink hover:border-gold hover:bg-gold hover:text-obsidian transition-colors cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
