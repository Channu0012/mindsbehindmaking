"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { BRAND_SWATCHES, SITE_CONFIG, SOCIAL_CHANNELS } from "@/data/brand";
import { BUILD_EPISODES } from "@/data/builds";
import { STACK_ENTRIES } from "@/data/stack";
import { CopyButton } from "@/components/ui/CopyButton";

const PRESET_LINES = [
  {
    ep: "EP.001 // ANTI-SLOP CRAFT",
    headline: "The minds behind real software.",
    sub: "Three-layer tokens, Circle-Square craft & tactile physics.",
  },
  {
    ep: "EP.002 // KEYBOARD UX",
    headline: "Zero-latency Cmd+K systems.",
    sub: "Instant keyboard mounts without sluggish animations.",
  },
  {
    ep: "EP.003 // PACKAGING",
    headline: "Code-driven YouTube thumbnails.",
    sub: "HTML5 Canvas exporter synced to Obsidian tokens.",
  },
  {
    ep: "PROMPT SPEC // PRM-01",
    headline: "Ban clichés. Engineer contrast.",
    sub: "Why explicit constraints beat lazy AI prompting.",
  },
];

type CanvasFormat = "16:9" | "4:5" | "1:1";

const FORMAT_DIMS: Record<CanvasFormat, { w: number; h: number; label: string }> = {
  "16:9": { w: 1280, h: 720, label: "YouTube 16:9" },
  "4:5": { w: 1080, h: 1350, label: "Social 4:5" },
  "1:1": { w: 1080, h: 1080, label: "Square 1:1" },
};

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawEmblemOnCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  shapeColor: string,
  wedgeColor: string
) {
  const scale = size / 76;
  ctx.save();
  ctx.translate(x - 12 * scale, y - 12 * scale);
  ctx.scale(scale, scale);

  ctx.fillStyle = shapeColor;
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(40, 64);
  ctx.arc(40, 40, 24, Math.PI / 2, 0, false);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(64, 40);
  ctx.lineTo(84, 40);
  ctx.lineTo(84, 84);
  ctx.lineTo(40, 84);
  ctx.lineTo(40, 64);
  ctx.arc(40, 40, 24, Math.PI / 2, 0, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = wedgeColor;
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(64, 40);
  ctx.arc(40, 40, 24, 0, Math.PI / 2, false);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function CanvasStudio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [epLabel, setEpLabel] = useState(PRESET_LINES[0].ep);
  const [headline, setHeadline] = useState(PRESET_LINES[0].headline);
  const [subline, setSubline] = useState(PRESET_LINES[0].sub);
  const [format, setFormat] = useState<CanvasFormat>("16:9");
  const [selectedEpIdx, setSelectedEpIdx] = useState(0);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = FORMAT_DIMS[format];
    canvas.width = w;
    canvas.height = h;

    const bg = "#111111";
    const fg = "#F4F1EA";
    const gold = "#C6A46A";
    const muted = "#888378";
    const grid = "rgba(244,241,234,0.045)";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.fillStyle = gold;
    ctx.fillRect(0, h * 0.16, 8, h * 0.68);

    const padX = Math.round(w * 0.075);
    const padY = Math.round(h * 0.095);

    ctx.font = `500 ${Math.round(w * 0.018)}px "JetBrains Mono", monospace`;
    const badgeText = epLabel.toUpperCase();
    const badgePadX = 16;
    const badgeW = ctx.measureText(badgeText).width + badgePadX * 2;
    const badgeH = Math.round(w * 0.036);

    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.roundRect(padX, padY, badgeW, badgeH, 6);
    ctx.fill();

    ctx.fillStyle = "#111111";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, padX + badgePadX, padY + badgeH / 2 + 1);

    const emblemSize = Math.round(w * 0.068);
    drawEmblemOnCanvas(ctx, w - padX - emblemSize, padY - 4, emblemSize, fg, gold);

    const headlineSize = format === "16:9" ? Math.round(w * 0.068) : Math.round(w * 0.082);
    ctx.font = `600 ${headlineSize}px "Inter Tight", "Inter", sans-serif`;
    ctx.fillStyle = fg;
    ctx.textBaseline = "top";

    const lines = wrapLines(ctx, headline, w - padX * 2.1);
    const lineH = headlineSize * 1.02;
    const blockStart = h * 0.34;

    lines.slice(0, 4).forEach((line, idx) => {
      ctx.fillText(line, padX, blockStart + idx * lineH);
    });

    const subY = blockStart + Math.min(lines.length, 4) * lineH + Math.round(h * 0.035);
    ctx.font = `400 ${Math.round(w * 0.024)}px "Inter Tight", "Inter", sans-serif`;
    ctx.fillStyle = muted;
    const subLines = wrapLines(ctx, subline, w - padX * 2.2);
    subLines.slice(0, 2).forEach((line, idx) => {
      ctx.fillText(line, padX, subY + idx * Math.round(w * 0.034));
    });

    const footY = h - padY;
    ctx.strokeStyle = grid;
    ctx.beginPath();
    ctx.moveTo(padX, footY - 30);
    ctx.lineTo(w - padX, footY - 30);
    ctx.stroke();

    ctx.font = `500 ${Math.round(w * 0.016)}px "JetBrains Mono", monospace`;
    ctx.fillStyle = gold;
    ctx.fillText("MINDS BEHIND MAKING", padX, footY - 10);

    ctx.textAlign = "right";
    ctx.fillStyle = muted;
    ctx.fillText("MINDSBEHINDMAKING.COM", w - padX, footY - 10);
    ctx.textAlign = "left";
  }, [epLabel, headline, subline, format]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `mbm-obsidian-${format.replace(":", "x")}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const applyPreset = (idx: number) => {
    setSelectedPreset(idx);
    setEpLabel(PRESET_LINES[idx].ep);
    setHeadline(PRESET_LINES[idx].headline);
    setSubline(PRESET_LINES[idx].sub);
  };

  const selectedEpisode = BUILD_EPISODES[selectedEpIdx] ?? BUILD_EPISODES[0];
  const youtubeDescription = useMemo(() => {
    const toolsList = STACK_ENTRIES.filter((t) => selectedEpisode.toolIds.includes(t.id))
      .map((t) => `• ${t.name} — ${t.url}`)
      .join("\n");

    const chapterList = selectedEpisode.chapters
      .map((c) => `${c.time} ${c.title}`)
      .join("\n");

    const socials = SOCIAL_CHANNELS.map((s) => `${s.name}: ${s.url}`).join("\n");

    return `${selectedEpisode.subtitle}

🔗 Full Build Blueprint, Prompts & Notes:
https://${SITE_CONFIG.domain}/builds/${selectedEpisode.slug}

🛠 Websites & Tools Used:
${toolsList}

⏱ Chapters:
${chapterList}

🌐 Follow MindsBehindMaking:
${socials}

#mindsbehindmaking #buildinpublic #designengineering`;
  }, [selectedEpisode]);

  return (
    <div className="space-y-20">
      {/* 1. HTML5 Canvas Studio */}
      <section className="flex flex-wrap items-stretch gap-5">
        <div className="flex-1 min-w-[260px] lg:max-w-[320px] rounded-[14px] border border-rule bg-elevated p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="mbm-m text-gold">01 // PRESETS</span>
            <span className="mbm-m text-ink-muted">{PRESET_LINES.length} LINES</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {PRESET_LINES.map((preset, idx) => {
              const active = idx === selectedPreset;
              return (
                <button
                  key={preset.ep}
                  type="button"
                  onClick={() => applyPreset(idx)}
                  className={`rounded-[10px] px-3.5 py-3 text-left text-[14px] leading-[1.4] cursor-pointer transition-colors ${
                    active
                      ? "bg-recessed text-ink shadow-[inset_3px_0_0_#C6A46A]"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  <div className="font-medium">{preset.headline}</div>
                  <small className="block mt-1.5 mbm-m text-[9px] text-ink-muted">
                    {preset.ep}
                  </small>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="relative flex-[2] min-w-[300px] min-h-[460px] rounded-[14px] border border-rule-strong bg-deep p-6 sm:p-10 flex items-center justify-center"
          style={{
            backgroundImage: "radial-gradient(#262522 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <span className="absolute left-4 top-3.5 mbm-m text-[10px] text-ink-muted">
            {FORMAT_DIMS[format].label}
          </span>
          <span className="absolute right-4 top-3.5 mbm-m text-[10px] text-gold">
            {FORMAT_DIMS[format].w} × {FORMAT_DIMS[format].h} PX
          </span>

          <canvas
            ref={canvasRef}
            className="block max-w-full max-h-[450px] w-auto h-auto rounded-[6px] shadow-[0_32px_72px_rgba(0,0,0,0.65)]"
          />
        </div>

        <div className="flex-1 min-w-[270px] lg:max-w-[330px] rounded-[14px] border border-rule bg-elevated p-5 flex flex-col gap-4">
          <span className="mbm-m text-gold">02 // CUSTOMIZE &amp; EXPORT</span>

          <label className="block space-y-1.5">
            <span className="mbm-m text-[10px] text-ink-muted">Episode / Tag</span>
            <input
              type="text"
              value={epLabel}
              onChange={(e) => setEpLabel(e.target.value)}
              className="w-full rounded-[8px] border border-rule-strong bg-bg px-3 py-2 text-[14px] text-ink focus:border-gold focus:outline-none"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="mbm-m text-[10px] text-ink-muted">Headline</span>
            <textarea
              rows={2}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full rounded-[8px] border border-rule-strong bg-bg px-3 py-2 text-[14px] text-ink focus:border-gold focus:outline-none resize-none"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="mbm-m text-[10px] text-ink-muted">Subline</span>
            <input
              type="text"
              value={subline}
              onChange={(e) => setSubline(e.target.value)}
              className="w-full rounded-[8px] border border-rule-strong bg-bg px-3 py-2 text-[14px] text-ink focus:border-gold focus:outline-none"
            />
          </label>

          <div className="space-y-1.5">
            <span className="mbm-m text-[10px] text-ink-muted">Format</span>
            <div className="grid grid-cols-3 gap-2">
              {(["16:9", "4:5", "1:1"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`rounded-[8px] py-2 mbm-m text-[11px] cursor-pointer transition-colors ${
                    format === fmt
                      ? "bg-gold text-obsidian font-semibold"
                      : "border border-rule-strong bg-bg text-ink-secondary hover:text-ink"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="mbm-btn mt-auto w-full min-h-[50px] bg-gold text-obsidian font-semibold hover:bg-ink"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Export PNG ({FORMAT_DIMS[format].w}px)</span>
          </button>
        </div>
      </section>

      {/* 2. YouTube Description & Chapter Formatter */}
      <section className="border-t border-rule pt-16 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="mbm-m text-gold">03 // CREATOR WORKFLOW</span>
          <h2 className="mbm-display text-[clamp(28px,3.8vw,46px)] text-ink">
            YouTube Description{" "}
            <span className="mbm-serif italic font-normal text-gold">Generator.</span>
          </h2>
          <p className="text-[15px] leading-[1.6] text-ink-secondary">
            Pick an episode and copy a structured YouTube description—complete with companion URL, referenced websites, timestamps, and channel links.
          </p>

          <div className="space-y-2 pt-2">
            {BUILD_EPISODES.map((ep, idx) => (
              <button
                key={ep.id}
                type="button"
                onClick={() => setSelectedEpIdx(idx)}
                className={`w-full rounded-[10px] border p-3.5 text-left cursor-pointer transition-colors ${
                  idx === selectedEpIdx
                    ? "border-gold bg-elevated"
                    : "border-rule bg-deep hover:border-rule-strong"
                }`}
              >
                <span className="mbm-m text-[10px] text-gold">{ep.code}</span>
                <div className="mt-1 text-[14px] font-medium text-ink">{ep.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 rounded-[14px] border border-rule bg-elevated p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <span className="mbm-m text-[10px] text-ink-muted">
              READY TO PASTE IN YOUTUBE STUDIO
            </span>
            <CopyButton text={youtubeDescription} label="Copy Description" />
          </div>
          <pre className="flex-1 whitespace-pre-wrap font-mono text-[12px] leading-[1.65] text-ink max-h-[340px] overflow-y-auto">
            {youtubeDescription}
          </pre>
        </div>
      </section>

      {/* 3. Obsidian Color Tokens Matrix */}
      <section className="border-t border-rule pt-16 space-y-8">
        <div>
          <span className="mbm-m text-gold">04 // OBSIDIAN DESIGN TOKENS</span>
          <h2 className="mt-2 mbm-display text-[clamp(28px,4vw,50px)] text-ink">
            Obsidian, Cream &amp;{" "}
            <span className="mbm-serif italic font-normal text-gold">Brushed Gold.</span>
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_SWATCHES.map((sw) => (
            <div
              key={sw.name}
              className="flex flex-col justify-between gap-4 rounded-[12px] border border-rule bg-elevated p-4"
            >
              <div
                className="h-14 w-full rounded-[8px] border border-rule-strong"
                style={{ backgroundColor: sw.hex }}
              />
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-ink">{sw.name}</p>
                  <p className="truncate mbm-m text-[9px] text-ink-muted">
                    {sw.hex} · {sw.role}
                  </p>
                </div>
                <CopyButton text={sw.hex} label="Hex" copiedLabel="OK" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
