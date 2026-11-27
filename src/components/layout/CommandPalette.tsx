"use client";

import React, { useCallback, useContext, createContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Command,
  Compass,
  Layers,
  Mail,
  Palette,
  Play,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { BUILD_EPISODES } from "@/data/builds";
import { PROMPT_ITEMS } from "@/data/prompts";
import { SITE_CONFIG } from "@/data/brand";

type OpenMode = "keyboard" | "pointer";

interface CommandContextValue {
  openPalette: (mode?: OpenMode) => void;
  closePalette: () => void;
}

const CommandPaletteContext = createContext<CommandContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

interface CommandEntry {
  id: string;
  group: "Actions" | "Episodes" | "Prompts" | "Pages";
  title: string;
  subtitle: string;
  badge: string;
  keywords: string;
  perform: () => void;
  icon: React.ReactNode;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMode, setOpenMode] = useState<OpenMode>("keyboard");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  const openPalette = useCallback((mode: OpenMode = "pointer") => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setOpenMode(mode);
    setActiveIndex(0);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) closePalette();
        else openPalette("keyboard");
        return;
      }

      if (!isOpen && !isTyping && e.key === "/") {
        e.preventDefault();
        openPalette("keyboard");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, openPalette, closePalette]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const entries = useMemo<CommandEntry[]>(() => {
    const actions: CommandEntry[] = [
      {
        id: "act-yt",
        group: "Actions",
        title: "Open MindsBehindMaking YouTube Channel",
        subtitle: SITE_CONFIG.youtubeChannelUrl,
        badge: "MAIN",
        keywords: "youtube channel video watch subscribe",
        icon: <Play className="h-4 w-4 text-gold fill-gold" />,
        perform: () => {
          window.open(SITE_CONFIG.youtubePrimaryUrl, "_blank", "noopener,noreferrer");
          closePalette();
        },
      },
      {
        id: "act-studio",
        group: "Actions",
        title: "Open Creator Asset Studio & YouTube Packager",
        subtitle: "Export 16:9 PNG thumbnails & formatted video descriptions",
        badge: "/studio",
        keywords: "studio thumbnail canvas export brand colors youtube description",
        icon: <Palette className="h-4 w-4 text-gold" />,
        perform: () => {
          router.push("/studio");
          closePalette();
        },
      },
      {
        id: "act-contact",
        group: "Actions",
        title: "Pitch a Collab or Sponsorship",
        subtitle: "Open interactive project & partnership intake studio",
        badge: "/contact",
        keywords: "contact email collaborate sponsor pitch work together",
        icon: <Mail className="h-4 w-4 text-gold" />,
        perform: () => {
          router.push("/contact");
          closePalette();
        },
      },
    ];

    const pages: CommandEntry[] = [
      {
        id: "pg-about",
        group: "Pages",
        title: "About — Founder Philosophy & Tech Stack",
        subtitle: "The anti-slop code of conduct, story & daily driver websites",
        badge: "/about",
        keywords: "about founder philosophy tools websites stack story",
        icon: <Compass className="h-4 w-4" />,
        perform: () => {
          router.push("/about");
          closePalette();
        },
      },
      {
        id: "pg-prompts",
        group: "Pages",
        title: "Prompt Engineering Lab",
        subtitle: "Live variable compiler, JSON schemas & AI deep launches",
        badge: "/prompts",
        keywords: "prompts lab variables presets claude gemini chatgpt",
        icon: <Terminal className="h-4 w-4" />,
        perform: () => {
          router.push("/prompts");
          closePalette();
        },
      },
    ];

    const episodes: CommandEntry[] = BUILD_EPISODES.map((ep) => ({
      id: `ep-${ep.id}`,
      group: "Episodes",
      title: `${ep.code} — ${ep.title}`,
      subtitle: ep.subtitle,
      badge: ep.publishedLabel,
      keywords: `${ep.code} ${ep.number} ${ep.title} ${ep.tags.join(" ")}`,
      icon: <Layers className="h-4 w-4" />,
      perform: () => {
        router.push(`/builds/${ep.slug}`);
        closePalette();
      },
    }));

    const prompts: CommandEntry[] = PROMPT_ITEMS.map((prm) => ({
      id: `prm-${prm.id}`,
      group: "Prompts",
      title: `${prm.code} · ${prm.title}`,
      subtitle: prm.summary,
      badge: prm.stage,
      keywords: `${prm.code} ${prm.title} ${prm.stage}`,
      icon: <Terminal className="h-4 w-4" />,
      perform: () => {
        router.push(`/prompts?focus=${prm.id}`);
        closePalette();
      },
    }));

    return [...actions, ...pages, ...episodes, ...prompts];
  }, [closePalette, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [entries, query]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-cmd-index="${activeIndex}"]`);
    if (el instanceof HTMLElement) el.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
      return;
    }
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((p) => (p + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((p) => (p - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.perform();
    }
  };

  const groups = useMemo(() => {
    const order: CommandEntry["group"][] = ["Actions", "Pages", "Episodes", "Prompts"];
    return order
      .map((g) => ({ group: g, items: filtered.filter((i) => i.group === g) }))
      .filter((s) => s.items.length > 0);
  }, [filtered]);

  let flatIdx = -1;

  return (
    <CommandPaletteContext.Provider value={{ openPalette, closePalette }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Global index command bar"
          onKeyDown={handleKeyDown}
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closePalette}
            aria-hidden="true"
          />

          <div
            className={`relative z-10 w-full max-w-[660px] overflow-hidden rounded-[14px] border border-rule-strong bg-elevated shadow-[0_28px_80px_rgba(0,0,0,0.75)] ${
              openMode === "pointer" ? "animate-[mbm-pop_140ms_cubic-bezier(0.23,1,0.32,1)]" : ""
            }`}
          >
            <style>{`
              @keyframes mbm-pop {
                from { opacity: 0; transform: scale(0.975) translateY(-4px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>

            <div className="flex items-center gap-3 border-b border-rule px-4 py-3.5">
              <Search className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search episodes, prompts, studio, about, or contact..."
                aria-label="Search global index"
                className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={closePalette}
                aria-label="Close search"
                className="grid h-8 w-8 place-items-center rounded-full border border-rule-strong text-ink-muted hover:border-gold hover:text-ink cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} className="max-h-[380px] overflow-y-auto overscroll-contain p-2">
              {groups.length === 0 ? (
                <div className="py-12 text-center mbm-m text-ink-muted">
                  NO MATCHES FOR &ldquo;{query}&rdquo;
                </div>
              ) : (
                groups.map((sec) => (
                  <div key={sec.group} className="mb-2 last:mb-0">
                    <div className="px-3 py-1.5 mbm-m text-[10px] text-ink-muted">{sec.group}</div>
                    {sec.items.map((item) => {
                      flatIdx += 1;
                      const idx = flatIdx;
                      const active = idx === activeIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-cmd-index={idx}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={item.perform}
                          className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left cursor-pointer transition-colors ${
                            active ? "bg-recessed text-ink" : "text-ink-secondary"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={`grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border ${
                                active
                                  ? "border-gold bg-bg text-gold"
                                  : "border-rule bg-bg text-ink-muted"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <div className="min-w-0">
                              <div className="truncate text-[14px] font-medium text-ink">
                                {item.title}
                              </div>
                              <div className="truncate text-[12px] text-ink-muted">{item.subtitle}</div>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span className="rounded border border-rule bg-bg px-2 py-0.5 mbm-m text-[9px] text-ink-muted">
                              {item.badge}
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-rule bg-deep px-4 py-2.5 mbm-m text-[10px] text-ink-muted">
              <div className="flex items-center gap-4">
                <span>↑↓ NAVIGATE</span>
                <span>↵ OPEN</span>
                <span>ESC CLOSE</span>
              </div>
              <span className="inline-flex items-center gap-1">
                <Command className="h-3 w-3" aria-hidden="true" />K · 0MS MOUNT
              </span>
            </div>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}
