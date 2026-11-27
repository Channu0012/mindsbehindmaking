"use client";

import React, { useRef, useState } from "react";
import { MbmMark } from "@/components/brand/MbmMark";
import { RevealBlock } from "@/components/ui/MotionPrimitives";

/**
 * 60fps clip-path comparison slider built with Pointer Events + setPointerCapture.
 * Visually contrasts generic AI vibe-coded templates against MindsBehindMaking engineering craft.
 */
export function CraftComparisonSlider() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [split, setSplit] = useState(52);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(8, Math.min(92, Math.round(pct * 10) / 10)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  return (
    <section className="border-b border-rule py-20 sm:py-28">
      <div className="mbm-wrap space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <RevealBlock className="space-y-2">
            <span className="mbm-m text-gold">01 // THE ANTI-SLOP STANDARD</span>
            <h2 className="mbm-display text-[clamp(32px,4.8vw,62px)] text-ink">
              Drag to compare{" "}
              <span className="mbm-serif italic font-normal text-gold">craft</span> vs.
              default AI.
            </h2>
          </RevealBlock>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSplit(85)}
              className="rounded-full border border-rule-strong bg-elevated px-3.5 py-1.5 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-ink cursor-pointer"
            >
              Inspect AI Slop
            </button>
            <button
              type="button"
              onClick={() => setSplit(50)}
              className="rounded-full border border-rule-strong bg-elevated px-3.5 py-1.5 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-ink cursor-pointer"
            >
              50 / 50
            </button>
            <button
              type="button"
              onClick={() => setSplit(14)}
              className="rounded-full border border-gold bg-gold px-3.5 py-1.5 mbm-m text-[10px] font-semibold text-obsidian cursor-pointer"
            >
              Inspect MBM Craft
            </button>
          </div>
        </div>

        {/* Interactive Clip-Path Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="slider"
          aria-label="Compare generic AI design with MindsBehindMaking design craft"
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={Math.round(split)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setSplit((s) => Math.max(8, s - 6));
            if (e.key === "ArrowRight") setSplit((s) => Math.min(92, s + 6));
          }}
          className="relative h-[430px] sm:h-[500px] w-full overflow-hidden rounded-[18px] border border-rule-strong select-none touch-none cursor-ew-resize"
        >
          {/* UNDER LAYER: MindsBehindMaking Engineered Craft */}
          <div className="absolute inset-0 bg-[#111111] p-6 sm:p-12 flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-0 mbm-draft-grid" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-full border border-gold/40 bg-gold-soft px-3 py-1 mbm-m text-[10px] text-gold">
                MINDSBEHINDMAKING // ENGINEERED CRAFT
              </span>
              <span className="mbm-m text-[10px] text-ink-muted hidden sm:inline">
                CONTRAST 16.5:1 · 0MS ⌘K · BOUNCE 0
              </span>
            </div>

            <div className="relative z-10 grid items-center gap-8 md:grid-cols-12 my-auto">
              <div className="md:col-span-7 space-y-4">
                <h3 className="mbm-display text-[clamp(28px,4vw,52px)] text-ink">
                  Obsidian precision.{" "}
                  <span className="mbm-serif italic font-normal text-gold">Zero</span>{" "}
                  gimmicks.
                </h3>
                <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-secondary">
                  Three-layer design tokens, optical negative tracking, real founder copy, and GPU-composited motion under 200ms.
                </p>
              </div>
              <div className="hidden md:flex md:col-span-5 justify-end">
                <div className="rounded-[14px] border border-rule-strong bg-deep p-6 space-y-4 w-full max-w-[300px]">
                  <div className="flex items-center justify-between">
                    <MbmMark size={32} />
                    <span className="mbm-m text-[10px] text-gold">TOKENS.CSS</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px] text-ink-secondary">
                    <div>--bg: #111111;</div>
                    <div>--ink: #F4F1EA;</div>
                    <div className="text-gold">--gold: #C6A46A;</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-rule pt-4 mbm-m text-[10px] text-ink-muted">
              <span>BUILT FOR REAL BUILDERS</span>
              <span className="text-gold">DRAG HANDLE ←→</span>
            </div>
          </div>

          {/* OVER LAYER (Clipped from right): Generic AI Vibe-Coded Template */}
          <div
            className="absolute inset-0 bg-[#090814] p-6 sm:p-12 flex flex-col justify-between"
            style={{
              clipPath: `inset(0 ${100 - split}% 0 0)`,
              backgroundImage:
                "radial-gradient(circle at 22% 24%, rgba(168,85,247,0.34), transparent 46%), radial-gradient(circle at 78% 72%, rgba(34,211,238,0.24), transparent 45%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-purple-400/40 bg-purple-500/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-purple-200">
                ✨ DEFAULT AI VIBE-CODED SITE
              </span>
              <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
                TRANSITION: ALL 500MS · NEON BLUR
              </span>
            </div>

            <div className="my-auto max-w-[540px] space-y-4">
              <div className="inline-block rounded-full border border-cyan-400/30 bg-white/5 px-3 py-1 text-[11px] text-cyan-200">
                🚀 Supercharge Your Seamless Workflow
              </div>
              <h3 className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight leading-[1.08] bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Elevate Everything With Next-Gen AI Magic.
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-slate-300">
                Unlock your hidden potential with our revolutionary all-in-one glassmorphic synergy platform.
              </p>
              <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-[400px]">
                {["Fast", "Smart", "Seamless"].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md p-2.5 text-center text-[11px] text-white/80"
                  >
                    ✦ {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-purple-300/70">
              <span>GENERIC PURPLE GLOW + BUZZWORDS</span>
              <span>SAME TEMPLATE AS 10,000 SITES</span>
            </div>
          </div>

          {/* Draggable Gold Hairline Divider */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-20 w-[2px] bg-gold shadow-[0_0_20px_rgba(198,164,106,0.65)]"
            style={{ left: `${split}%` }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-obsidian bg-gold text-obsidian font-mono text-[11px] font-bold shadow-lg">
              ↔
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
