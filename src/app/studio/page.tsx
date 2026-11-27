import React from "react";
import type { Metadata } from "next";
import { CanvasStudio } from "@/components/studio/CanvasStudio";

export const metadata: Metadata = {
  title: "Creator Asset & Brand Studio",
  description:
    "Export 16:9 YouTube thumbnails, generate formatted YouTube descriptions, and inspect MindsBehindMaking Obsidian tokens.",
};

export default function StudioPage() {
  return (
    <div className="mbm-wrap py-16 sm:py-24 space-y-12">
      <div className="border-b border-rule pb-10">
        <div className="mbm-m text-gold">STUDIO // CREATOR ASSET TOOLKIT</div>
        <h1 className="mt-2 mbm-display text-[clamp(36px,5vw,64px)] text-ink">
          Thumbnail &amp; Content{" "}
          <span className="mbm-serif italic font-normal text-gold">Studio.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-ink-secondary">
          Export 16:9 YouTube thumbnails and social graphics featuring your Circle ∩ Square emblem, format episode descriptions, and copy Obsidian color tokens.
        </p>
      </div>

      <CanvasStudio />
    </div>
  );
}
