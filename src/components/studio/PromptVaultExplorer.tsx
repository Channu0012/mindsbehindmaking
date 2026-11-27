"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  Bookmark,
  ExternalLink,
  RotateCcw,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";
import { PROMPT_ITEMS, type PromptStage } from "@/data/prompts";
import { SPRING_SNAPPY, SpringTabs } from "@/components/ui/MotionPrimitives";
import { CopyButton } from "@/components/ui/CopyButton";

type FilterStage = "All" | "Saved" | PromptStage;

const SAVED_STORAGE_KEY = "mbm-saved-prompts";

export function PromptVaultExplorer({
  initialFocusId,
}: {
  initialFocusId?: string;
}) {
  const [stage, setStage] = useState<FilterStage>("All");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const urlFocus = initialFocusId ?? searchParams.get("focus") ?? undefined;

  const [activeId, setActiveId] = useState<string>(urlFocus || PROMPT_ITEMS[0].id);
  const [varValuesById, setVarValuesById] = useState<Record<string, Record<string, string>>>(() =>
    Object.fromEntries(
      PROMPT_ITEMS.map((p) => [
        p.id,
        Object.fromEntries(p.variables.map((v) => [v.key, v.defaultValue])),
      ])
    )
  );
  const [viewMode, setViewMode] = useState<"engineered" | "lazy" | "output">("engineered");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
      if (raw) setSavedIds(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (urlFocus && PROMPT_ITEMS.some((p) => p.id === urlFocus)) {
      setActiveId(urlFocus);
    }
  }, [urlFocus]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const stageOptions = useMemo(() => {
    const base: FilterStage[] = ["All", "Architecture", "UI Craft", "Motion", "Content Ops", "Saved"];
    return base.map((s) => ({
      id: s,
      label: s,
      count:
        s === "All"
          ? PROMPT_ITEMS.length
          : s === "Saved"
          ? savedIds.length
          : PROMPT_ITEMS.filter((p) => p.stage === s).length,
    }));
  }, [savedIds.length]);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PROMPT_ITEMS.filter((p) => {
      if (stage === "Saved" && !savedIds.includes(p.id)) return false;
      if (stage !== "All" && stage !== "Saved" && p.stage !== stage) return false;
      if (!q) return true;
      return (
        p.code.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.template.toLowerCase().includes(q)
      );
    });
  }, [stage, search, savedIds]);

  const activePrompt = useMemo(
    () =>
      filteredList.find((p) => p.id === activeId) ??
      filteredList[0] ??
      PROMPT_ITEMS[0],
    [filteredList, activeId]
  );

  const activeVars = useMemo(
    () => varValuesById[activePrompt.id] ?? {},
    [varValuesById, activePrompt.id]
  );

  const compiledText = useMemo(() => {
    let out = activePrompt.template;
    for (const v of activePrompt.variables) {
      const val = activeVars[v.key]?.trim() || v.defaultValue;
      out = out.replaceAll(`{{${v.key}}}`, val);
    }
    return out;
  }, [activePrompt, activeVars]);

  const jsonPayload = useMemo(
    () =>
      JSON.stringify(
        {
          code: activePrompt.code,
          title: activePrompt.title,
          stage: activePrompt.stage,
          model: activePrompt.model,
          variables: activeVars,
          prompt: compiledText,
        },
        null,
        2
      ),
    [activePrompt, activeVars, compiledText]
  );

  const renderedNodes = useMemo(() => {
    const parts = activePrompt.template.split(/(\{\{[A-Z0-9_]+\}\})/g);
    return parts.map((part, idx) => {
      const match = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
      if (!match) return <React.Fragment key={idx}>{part}</React.Fragment>;
      const key = match[1];
      const fallback = activePrompt.variables.find((v) => v.key === key)?.defaultValue ?? key;
      const val = activeVars[key]?.trim() || fallback;
      return (
        <span
          key={idx}
          className="rounded bg-gold-soft px-1.5 py-0.5 text-gold font-semibold border border-gold/35"
        >
          {val}
        </span>
      );
    });
  }, [activePrompt, activeVars]);

  const setPromptVars = (nextVars: Record<string, string>) => {
    setVarValuesById((prev) => ({ ...prev, [activePrompt.id]: nextVars }));
  };

  const encodedPrompt = encodeURIComponent(compiledText);
  const approxTokens = Math.round(compiledText.length / 4);
  const isSaved = savedIds.includes(activePrompt.id);

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SpringTabs
          options={stageOptions}
          value={stage}
          onChange={setStage}
          layoutId="prompt-ide-stage-tabs"
        />

        <div className="relative w-full lg:w-72">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter specs, variables..."
            aria-label="Filter prompt specs"
            className="h-10 w-full rounded-full border border-rule-strong bg-elevated pl-9 pr-4 text-[13px] text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      {/* Master-Detail Split IDE Layout */}
      <div className="overflow-hidden rounded-[18px] border border-rule-strong bg-deep shadow-[0_32px_90px_-24px_rgba(0,0,0,0.85)] grid lg:grid-cols-12">
        {/* Left Master Spec Sidebar */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-rule flex flex-col">
          <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
            <span className="inline-flex items-center gap-2 mbm-m text-[10px] text-gold">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              SPEC INDEX ({filteredList.length})
            </span>
            <span className="mbm-m text-[10px] text-ink-muted">SELECT TO INSPECT</span>
          </div>

          {filteredList.length === 0 ? (
            <div className="p-8 text-center mbm-m text-[11px] text-ink-muted">
              {stage === "Saved"
                ? "NO BOOKMARKED SPECS YET."
                : `NO MATCHES FOR "${search}".`}
            </div>
          ) : (
            <div className="divide-y divide-rule">
              {filteredList.map((item) => {
                const selected = item.id === activePrompt.id;
                const starred = savedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`relative w-full px-5 py-4 text-left cursor-pointer transition-colors ${
                      selected ? "bg-elevated" : "hover:bg-elevated/50"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="prompt-ide-active-rail"
                        transition={SPRING_SNAPPY}
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-gold"
                      />
                    )}
                    <div className="flex items-center justify-between gap-2 mbm-m text-[10px]">
                      <span className={selected ? "text-gold font-semibold" : "text-ink-muted"}>
                        {item.code} · {item.stage}
                      </span>
                      <span className="text-ink-muted">
                        {starred ? "★" : `EP.${item.episodeNumber}`}
                      </span>
                    </div>
                    <div className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-ink">
                      {item.title}
                    </div>
                    <p className="mt-1 line-clamp-1 text-[12.5px] text-ink-muted">
                      {item.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Detail Compiler Workbench */}
        <div className="lg:col-span-8 p-5 sm:p-8 flex flex-col justify-between gap-6 bg-[#131311]">
          <div className="space-y-6">
            {/* Spec Title Bar */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5 mbm-m text-[10px]">
                  <span className="rounded bg-gold px-2 py-0.5 text-obsidian font-semibold">
                    {activePrompt.code}
                  </span>
                  <span className="text-gold">{activePrompt.constraintsCount} CONSTRAINTS</span>
                  <span className="text-ink-muted">·</span>
                  <span className="text-ink-muted">~{approxTokens} TOKENS</span>
                  <span className="text-ink-muted">·</span>
                  <span className="text-ink-muted">{activePrompt.model}</span>
                </div>
                <h3 className="text-[24px] sm:text-[28px] font-medium tracking-[-0.03em] text-ink">
                  {activePrompt.title}
                </h3>
                <p className="max-w-[58ch] text-[14.5px] leading-[1.55] text-ink-secondary">
                  {activePrompt.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleSave(activePrompt.id)}
                  aria-pressed={isSaved}
                  aria-label={isSaved ? "Remove bookmark" : "Bookmark spec"}
                  className={`grid h-9 w-9 place-items-center rounded-full border cursor-pointer transition-colors ${
                    isSaved
                      ? "border-gold bg-gold-soft text-gold"
                      : "border-rule-strong bg-elevated text-ink-muted hover:text-ink"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} aria-hidden="true" />
                </button>
                <Link
                  href={`/builds/${activePrompt.episodeSlug}`}
                  className="inline-flex h-9 items-center rounded-full border border-rule-strong bg-elevated px-3.5 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-gold"
                >
                  EP.{activePrompt.episodeNumber} ↗
                </Link>
              </div>
            </div>

            {/* Scenario Presets + Variable Compiler */}
            {viewMode === "engineered" && (
              <div className="rounded-[12px] border border-rule bg-deep p-4 sm:p-5 space-y-4">
                {activePrompt.presets.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                    <span className="inline-flex items-center gap-1.5 mbm-m text-[10px] text-ink-muted">
                      <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      QUICK PRESETS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activePrompt.presets.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setPromptVars(preset.values)}
                          className="rounded-full border border-rule-strong bg-elevated px-3 py-1 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-gold cursor-pointer transition-colors"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="mbm-m text-[10px] text-ink-muted">
                    PARAMETERS (LIVE COMPILE)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPromptVars(
                        Object.fromEntries(
                          activePrompt.variables.map((v) => [v.key, v.defaultValue])
                        )
                      )
                    }
                    className="inline-flex items-center gap-1 mbm-m text-[10px] text-ink-muted hover:text-gold cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Reset Defaults
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {activePrompt.variables.map((v) => (
                    <label key={v.key} className="block space-y-1">
                      <span className="block mbm-m text-[10px] text-ink-muted">{v.label}</span>
                      <input
                        type="text"
                        value={activeVars[v.key] ?? ""}
                        onChange={(e) =>
                          setPromptVars({ ...activeVars, [v.key]: e.target.value })
                        }
                        className="w-full border-b border-rule-strong bg-transparent py-1.5 font-mono text-[13px] text-ink focus:border-gold focus:outline-none"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 3-Mode Code Output Pane */}
            <div className="rounded-[12px] border border-rule bg-deep p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
                <div className="inline-flex rounded-full border border-rule bg-elevated p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("engineered")}
                    className={`rounded-full px-3.5 py-1 mbm-m text-[10px] cursor-pointer transition-colors ${
                      viewMode === "engineered"
                        ? "bg-gold text-obsidian font-semibold"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    Engineered Spec
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("lazy")}
                    className={`rounded-full px-3.5 py-1 mbm-m text-[10px] cursor-pointer transition-colors ${
                      viewMode === "lazy"
                        ? "bg-[#ff8a7a]/20 text-[#ff8a7a] font-semibold"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    Lazy AI Prompt
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("output")}
                    className={`rounded-full px-3.5 py-1 mbm-m text-[10px] cursor-pointer transition-colors ${
                      viewMode === "output"
                        ? "bg-ink text-obsidian font-semibold"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    Output Preview
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <CopyButton text={jsonPayload} label="JSON" copiedLabel="JSON ✓" />
                  <CopyButton
                    text={
                      viewMode === "lazy"
                        ? activePrompt.badPrompt
                        : viewMode === "output"
                        ? activePrompt.simulatedOutput
                        : compiledText
                    }
                    label={viewMode === "engineered" ? "Copy Spec" : "Copy"}
                  />
                </div>
              </div>

              <pre className="min-h-[210px] max-h-[280px] overflow-y-auto whitespace-pre-wrap font-mono text-[12.5px] leading-[1.7] text-ink">
                {viewMode === "engineered"
                  ? renderedNodes
                  : viewMode === "lazy"
                  ? activePrompt.badPrompt
                  : activePrompt.simulatedOutput}
              </pre>
            </div>
          </div>

          {/* Bottom Rationale + Direct AI Run Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4">
            <p className="m-0 max-w-[54ch] text-[13px] leading-[1.55] text-ink-muted">
              <strong className="text-ink font-medium">Why it works: </strong>
              {activePrompt.whyItWorks}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://chatgpt.com/?q=${encodedPrompt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-rule-strong bg-elevated px-3.5 py-1.5 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-gold transition-colors"
              >
                <span>Run in ChatGPT</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href={`https://claude.ai/new?q=${encodedPrompt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-rule-strong bg-elevated px-3.5 py-1.5 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-gold transition-colors"
              >
                <span>Run in Claude</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
