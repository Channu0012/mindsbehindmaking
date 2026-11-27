"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DISPATCH_NOTES, type DispatchNote } from "@/data/brand";
import { SpringTabs } from "@/components/ui/MotionPrimitives";

type SourceFilter = "All" | DispatchNote["source"];

const FILTER_OPTIONS = [
  { id: "All", label: "All" },
  { id: "Founder Note", label: "Founder Notes" },
  { id: "Prompt Spec", label: "Prompt Specs" },
  { id: "Shipped", label: "Shipped" },
] as const;

export function DispatchesCarousel() {
  const [source, setSource] = useState<SourceFilter>("All");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const visible =
    source === "All"
      ? DISPATCH_NOTES
      : DISPATCH_NOTES.filter((item) => item.source === source);

  const updateScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress(100);
      return;
    }
    setProgress(Math.round((el.scrollLeft / maxScroll) * 100));
  };

  useEffect(() => {
    updateScroll();
  }, [source]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="border-b border-rule py-20 sm:py-28">
      <div className="mbm-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 mbm-m text-gold">
              <span className="mbm-live" />
              <span>06 // BUILD-IN-PUBLIC NOTES</span>
            </div>
            <h2 className="mbm-display text-[clamp(32px,4.6vw,58px)] text-ink">
              Field notes between{" "}
              <span className="mbm-serif italic font-normal text-gold">episodes.</span>
            </h2>
          </div>

          <SpringTabs
            options={FILTER_OPTIONS}
            value={source}
            onChange={setSource}
            layoutId="dispatch-tabs"
          />
        </div>

        <div
          ref={trackRef}
          onScroll={updateScroll}
          className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin" }}
        >
          {visible.map((note) => (
            <article
              key={note.id}
              className={`snap-start flex-none w-[84vw] sm:w-[360px] min-h-[330px] rounded-[14px] border p-7 flex flex-col justify-between gap-5 transition-transform duration-300 hover:-translate-y-1 ${
                note.featured
                  ? "border-gold bg-gold text-obsidian"
                  : "border-rule bg-elevated text-ink"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`mbm-m text-[10px] ${
                      note.featured ? "text-obsidian/80 font-semibold" : "text-gold"
                    }`}
                  >
                    {note.source}
                  </span>
                  <span
                    className={`mbm-m text-[10px] ${
                      note.featured ? "text-obsidian/70" : "text-ink-muted"
                    }`}
                  >
                    {note.date}
                  </span>
                </div>

                <h3 className="text-[21px] font-medium tracking-[-0.025em] leading-[1.2]">
                  {note.title}
                </h3>

                <p
                  className={`whitespace-pre-line text-[14.5px] leading-[1.6] ${
                    note.featured ? "text-obsidian/85" : "text-ink-secondary"
                  }`}
                >
                  {note.body}
                </p>
              </div>

              <div
                className={`flex items-center justify-between border-t pt-3 ${
                  note.featured ? "border-obsidian/20" : "border-rule"
                }`}
              >
                <span
                  className={`mbm-m text-[10px] ${
                    note.featured ? "text-obsidian/70" : "text-ink-muted"
                  }`}
                >
                  MINDS BEHIND MAKING
                </span>
                <Link
                  href={note.href}
                  className={`mbm-m text-[10px] font-semibold hover:underline ${
                    note.featured ? "text-obsidian" : "text-gold"
                  }`}
                >
                  Inspect <span className="mbm-arr">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="h-[2px] flex-1 overflow-hidden bg-rule">
            <div
              className="h-full bg-gold transition-all duration-200"
              style={{ width: `${Math.max(18, progress)}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous notes"
              className="grid h-11 w-11 place-items-center rounded-full border border-rule-strong bg-elevated text-ink hover:border-gold hover:text-gold transition-colors cursor-pointer active:scale-[0.96]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next notes"
              className="grid h-11 w-11 place-items-center rounded-full border border-rule-strong bg-elevated text-ink hover:border-gold hover:text-gold transition-colors cursor-pointer active:scale-[0.96]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
