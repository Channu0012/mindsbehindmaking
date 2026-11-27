"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { SITE_CONFIG, SOCIAL_CHANNELS } from "@/data/brand";
import { BUILD_EPISODES } from "@/data/builds";
import { SPRING_SNAPPY } from "@/components/ui/MotionPrimitives";

type EmblemLens = "minds" | "intersection" | "making";

const LENS_COPY: Record<
  EmblemLens,
  { code: string; label: string; summary: string; href: string }
> = {
  minds: {
    code: "01 // CIRCLE · MINDS",
    label: "Minds",
    summary: "Product taste, architectural constraints & structured prompting.",
    href: "/prompts",
  },
  intersection: {
    code: "02 // GOLD WEDGE · CRAFT",
    label: "Intersection",
    summary: "Where inquiry shapes execution—every YouTube breakdown starts here.",
    href: `/builds/${BUILD_EPISODES[0].slug}`,
  },
  making: {
    code: "03 // SQUARE · MAKING",
    label: "Making",
    summary: "Production Next.js code, GPU motion physics & Canvas tooling.",
    href: "/studio",
  },
};

export function HeroSection() {
  const [lens, setLens] = useState<EmblemLens>("intersection");
  const containerRef = useRef<HTMLElement | null>(null);
  const flagship = BUILD_EPISODES[0];

  // Pointer-tracked specular lighting across hero canvas
  const mouseX = useMotionValue(720);
  const mouseY = useMotionValue(320);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });
  const ambientLight = useMotionTemplate`radial-gradient(620px circle at ${springX}px ${springY}px, rgba(198, 164, 106, 0.10), transparent 68%)`;

  // Subtle scroll-linked scale + drift on the architectural Circle ∩ Square diagram
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-[calc(100svh-86px)] flex flex-col justify-between overflow-hidden border-b border-rule pt-8 pb-10 sm:pt-12 sm:pb-14"
    >
      {/* Subtle architectural drafting grid + pointer light */}
      <div className="pointer-events-none absolute inset-0 mbm-draft-grid" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: ambientLight }}
      />

      {/* Sculptural Background Circle ∩ Square Diagram (no heavy box!) */}
      <motion.div
        style={{ y: markY, scale: markScale }}
        className="pointer-events-none absolute right-[-12%] top-[6%] sm:right-[4%] sm:top-[10%] lg:right-[6%] lg:top-[12%] opacity-[0.22] sm:opacity-[0.85]"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px]"
          aria-hidden="true"
        >
          {/* Outer optical calibration rings */}
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="rgba(244,241,234,0.06)"
            strokeWidth="0.4"
            strokeDasharray="1.5 2.5"
          />
          <line x1="40" y1="2" x2="40" y2="98" stroke="rgba(244,241,234,0.07)" strokeWidth="0.4" />
          <line x1="2" y1="40" x2="98" y2="40" stroke="rgba(244,241,234,0.07)" strokeWidth="0.4" />

          {/* Circle = Minds */}
          <path
            d="M40 40 L40 64 A24 24 0 1 1 64 40 Z"
            fill="#F4F1EA"
            className="transition-opacity duration-300"
            opacity={lens === "minds" ? 0.95 : lens === "intersection" ? 0.22 : 0.09}
          />
          {/* Square = Making */}
          <path
            d="M64 40 L84 40 L84 84 L40 84 L40 64 A24 24 0 0 0 64 40 Z"
            fill="#F4F1EA"
            className="transition-opacity duration-300"
            opacity={lens === "making" ? 0.95 : lens === "intersection" ? 0.22 : 0.09}
          />
          {/* Gold Intersection Wedge */}
          <path
            d="M40 40 L64 40 A24 24 0 0 1 40 64 Z"
            fill="#C6A46A"
            className="transition-opacity duration-300"
            opacity={lens === "intersection" ? 1 : 0.45}
          />
        </svg>
      </motion.div>

      {/* Main Editorial Stage */}
      <div className="mbm-wrap relative z-10 my-auto py-8 sm:py-12">
        <div className="max-w-[900px] space-y-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-rule-strong bg-elevated/80 px-4 py-1.5 mbm-m text-ink-secondary backdrop-blur-md">
            <span className="mbm-live" />
            <span>{SITE_CONFIG.heroStatus}</span>
          </div>

          <h1 className="mbm-display text-[clamp(54px,8.6vw,132px)] text-ink">
            <span className="mbm-word">
              <span>The minds</span>
            </span>
            <br />
            <span className="mbm-word">
              <span style={{ animationDelay: "0.1s" }}>
                <span className="mbm-serif italic font-normal text-gold pr-3">
                  behind
                </span>
                making.
              </span>
            </span>
          </h1>

          <p className="max-w-[50ch] text-[18px] sm:text-[20px] leading-[1.55] text-ink-secondary">
            {SITE_CONFIG.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href={SITE_CONFIG.youtubePrimaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mbm-btn min-h-[56px] px-7 bg-gold text-obsidian font-semibold shadow-[0_18px_45px_-12px_rgba(198,164,106,0.45)] hover:bg-ink"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-obsidian text-gold">
                <Play className="h-2.5 w-2.5 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span>Watch on YouTube</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              href={`/builds/${flagship.slug}`}
              className="mbm-btn min-h-[56px] px-7 mbm-surface-rim text-ink hover:border-gold"
            >
              <span>Explore EP.{flagship.number}</span>
              <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
            </Link>

            <Link
              href="/prompts"
              className="mbm-btn min-h-[56px] px-6 text-ink-secondary hover:text-gold"
            >
              <span>Prompt IDE</span>
              <span className="mbm-arr" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Floating Telemetry & Interactive Geometry Switcher */}
      <div className="mbm-wrap relative z-10 pt-8 border-t border-rule flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Interactive Geometry Selector */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-1 rounded-full border border-rule-strong bg-elevated p-1">
            {(["minds", "intersection", "making"] as const).map((key) => {
              const active = lens === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLens(key)}
                  className={`relative z-10 rounded-full px-3.5 py-1.5 mbm-m text-[10px] cursor-pointer transition-colors ${
                    active ? "text-obsidian font-semibold" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="hero-lens-pill"
                      transition={SPRING_SNAPPY}
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                    />
                  )}
                  {LENS_COPY[key].label}
                </button>
              );
            })}
          </div>

          <Link
            href={LENS_COPY[lens].href}
            className="group inline-flex items-center gap-2 text-[13.5px] text-ink-secondary hover:text-ink transition-colors"
          >
            <span className="mbm-m text-[10px] text-gold">{LENS_COPY[lens].code}</span>
            <span className="hidden sm:inline">— {LENS_COPY[lens].summary}</span>
            <span className="mbm-arr text-gold" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        {/* Social Channel Links */}
        <div className="flex flex-wrap items-center gap-4">
          {SOCIAL_CHANNELS.map((ch) => (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mbm-m text-[10px] transition-colors ${
                ch.primary ? "text-gold hover:text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {ch.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
