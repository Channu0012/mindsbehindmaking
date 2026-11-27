"use client";

import React from "react";
import { motion } from "motion/react";

export const SPRING_SNAPPY = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.28,
};

export interface SpringTabOption<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface SpringTabsProps<T extends string> {
  options: readonly SpringTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  className?: string;
}

export function SpringTabs<T extends string>({
  options,
  value,
  onChange,
  layoutId,
  className = "",
}: SpringTabsProps<T>) {
  return (
    <div role="tablist" className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`relative z-10 inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[13px] font-medium cursor-pointer select-none transition-colors duration-200 active:scale-[0.97] ${
              active
                ? "border-gold text-obsidian font-semibold"
                : "border-rule-strong bg-elevated text-ink-secondary hover:border-gold hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING_SNAPPY}
                className="absolute inset-0 -z-10 rounded-full bg-gold"
              />
            )}
            <span>{opt.label}</span>
            {typeof opt.count === "number" && (
              <span
                className={`font-mono text-[10px] tabular-nums ${
                  active ? "text-obsidian/75" : "text-ink-muted"
                }`}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
