import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PromptVaultExplorer } from "@/components/studio/PromptVaultExplorer";

export const metadata: Metadata = {
  title: "Prompt Engineering Lab",
  description:
    "Interactive prompt engineering specs with scenario presets, live variable compilation, JSON export, and side-by-side lazy prompt diffs.",
};

export default function PromptsPage() {
  return (
    <div className="mbm-wrap py-16 sm:py-24 space-y-12">
      <div className="border-b border-rule pb-10 space-y-3">
        <div className="mbm-m text-gold">PROMPT LAB // INTERACTIVE WORKBENCH</div>
        <h1 className="mbm-display text-[clamp(36px,5vw,66px)] text-ink">
          Prompts engineered for{" "}
          <span className="mbm-serif italic font-normal text-gold">real software.</span>
        </h1>
        <p className="max-w-[60ch] text-[16px] leading-[1.6] text-ink-secondary">
          Load a preset, tweak inline variables, compare lazy AI prompts against constrained specs, preview expected output structure, and export JSON or launch straight into Claude &amp; ChatGPT.
        </p>
      </div>

      <Suspense fallback={<div className="mbm-m text-ink-muted">Loading prompt lab...</div>}>
        <PromptVaultExplorer />
      </Suspense>
    </div>
  );
}
