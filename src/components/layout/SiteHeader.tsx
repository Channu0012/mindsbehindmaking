"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Play, Search } from "lucide-react";
import { MbmMark } from "@/components/brand/MbmMark";
import { useCommandPalette } from "@/components/layout/CommandPalette";
import { SITE_CONFIG } from "@/data/brand";
import { SPRING_SNAPPY } from "@/components/ui/MotionPrimitives";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/builds", label: "Builds" },
  { href: "/prompts", label: "Prompts" },
  { href: "/studio", label: "Studio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { openPalette } = useCommandPalette();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pointer-events-none pt-3.5 pb-2">
      <div className="mbm-wrap flex items-center justify-between gap-4">
        {/* Left Floating Brand Pill */}
        <Link
          href="/"
          className="pointer-events-auto mbm-glass-pill inline-flex h-[50px] items-center gap-3 rounded-full pl-2.5 pr-4.5 transition-transform duration-150 active:scale-[0.98]"
          aria-label="MindsBehindMaking Home"
        >
          <MbmMark size={28} className="shrink-0" />
          <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-ink whitespace-nowrap">
            Minds Behind Making
          </span>
        </Link>

        {/* Center Floating Specular Navigation Pill */}
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden lg:flex h-[50px] items-center gap-1 rounded-full mbm-glass-pill px-1.5"
        >
          {NAV_LINKS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  active ? "text-obsidian font-semibold" : "text-ink-secondary hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="floating-nav-pill"
                    transition={SPRING_SNAPPY}
                    className="absolute inset-0 -z-10 rounded-full bg-gold"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Floating Action Pill */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => openPalette("pointer")}
            aria-label="Open global command index (Cmd+K)"
            className="hidden sm:inline-flex h-[50px] items-center gap-2.5 rounded-full mbm-glass-pill px-4 text-[12px] text-ink-secondary hover:text-ink transition-colors duration-150 cursor-pointer active:scale-[0.97]"
          >
            <Search className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <kbd className="font-mono text-[11px] text-ink-muted">⌘K</kbd>
          </button>

          <a
            href={SITE_CONFIG.youtubePrimaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mbm-btn hidden sm:inline-flex h-[50px] min-h-[50px] px-5 bg-gold text-obsidian font-semibold shadow-[0_14px_34px_-10px_rgba(198,164,106,0.45)] hover:bg-ink"
          >
            <Play className="h-3 w-3 fill-current" aria-hidden="true" />
            <span>YouTube</span>
          </a>

          {/* Mobile Burger Pill */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative lg:hidden h-[50px] w-[50px] rounded-full mbm-glass-pill cursor-pointer"
          >
            <span
              className={`absolute left-[15px] right-[15px] h-[2px] bg-ink transition-all duration-300 ${
                menuOpen ? "top-[24px] rotate-45" : "top-[20px]"
              }`}
            />
            <span
              className={`absolute left-[15px] right-[15px] h-[2px] bg-ink transition-all duration-300 ${
                menuOpen ? "top-[24px] -rotate-45" : "top-[28px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {menuOpen && (
        <div className="pointer-events-auto lg:hidden mx-4 mt-3 rounded-[20px] mbm-glass-pill p-5">
          <nav className="flex flex-col">
            {NAV_LINKS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-rule/80 py-3.5 text-[19px] font-medium tracking-[-0.025em] ${
                    active ? "text-gold" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openPalette("pointer");
              }}
              className="mbm-btn w-full border border-rule-strong bg-elevated text-ink"
            >
              <Search className="h-4 w-4 text-gold" aria-hidden="true" />
              <span>Command Search (⌘K)</span>
            </button>
            <a
              href={SITE_CONFIG.youtubePrimaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mbm-btn w-full bg-gold text-obsidian font-semibold"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
