"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PROCESS_STAGES } from "@/data/brand";
import { RevealBlock, SPRING_SNAPPY } from "@/components/ui/MotionPrimitives";

export function MakingProcessWorkbench() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = PROCESS_STAGES[activeIdx] ?? PROCESS_STAGES[0];

  return (
    <section className="border-b border-rule py-24 sm:py-32">
      <div className="mbm-wrap space-y-12">
        <RevealBlock className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="mbm-m text-gold">04 // OPERATING SYSTEM</span>
            <h2 className="mbm-display text-[clamp(32px,4.8vw,60px)] text-ink">
              From raw idea to{" "}
              <span className="mbm-serif italic font-normal text-gold">shipped</span>{" "}
              artifact.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-[1.6] text-ink-secondary">
            Every MindsBehindMaking video follows the exact same four-stage founder workflow.
          </p>
        </RevealBlock>

        {/* Clean Horizontal Architectural Rail (No cluttered stacked boxes) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-rule">
          {PROCESS_STAGES.map((stage, idx) => {
            const selected = idx === activeIdx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative px-4 py-6 text-left cursor-pointer border-r last:border-r-0 border-rule transition-colors ${
                  selected ? "bg-elevated/70" : "hover:bg-elevated/35"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="process-horizontal-bar"
                    transition={SPRING_SNAPPY}
                    className="absolute inset-x-0 top-0 h-[2px] bg-gold"
                  />
                )}
                <div className="mbm-m text-[10px] text-gold">PHASE {stage.step}</div>
                <div
                  className={`mt-2 text-[20px] font-medium tracking-[-0.025em] ${
                    selected ? "text-ink" : "text-ink-secondary"
                  }`}
                >
                  {stage.name}
                </div>
                <div className="mt-1 mbm-m text-[9.5px] text-ink-muted">
                  {stage.tools.join(" · ")}
                </div>
              </button>
            );
          })}
        </div>

        {/* Open Architectural Detail Split */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block rounded-full bg-gold px-3 py-1 mbm-m text-[10px] font-semibold text-obsidian">
              STEP {current.step} {"//"} {current.name}
            </span>
            <h3 className="mbm-display text-[clamp(28px,3.6vw,44px)] text-ink">
              {current.headline}
            </h3>
            <p className="max-w-[56ch] text-[16.5px] leading-[1.65] text-ink-secondary">
              {current.description}
            </p>
          </div>

          <div className="lg:col-span-5 mbm-surface-rim rounded-[16px] p-6 sm:p-7 space-y-5">
            <div>
              <span className="mbm-m text-[10px] text-ink-muted block">DELIVERABLE</span>
              <p className="mt-1.5 text-[16px] font-medium text-ink">{current.deliverable}</p>
            </div>
            <div className="border-t border-rule pt-4">
              <span className="mbm-m text-[10px] text-gold block">FOUNDER RULE</span>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink-secondary">
                {current.rule}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
