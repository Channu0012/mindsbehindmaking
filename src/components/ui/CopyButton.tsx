"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }

    setTransitioning(true);
    window.setTimeout(() => {
      setCopied(true);
      setTransitioning(false);
    }, 65);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setTransitioning(true);
      window.setTimeout(() => {
        setCopied(false);
        setTransitioning(false);
      }, 65);
    }, 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      aria-label={copied ? `${copiedLabel} to clipboard` : `${label} to clipboard`}
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full border px-3 mbm-m text-[10px] cursor-pointer select-none transition-all duration-150 active:scale-[0.97] ${
        copied
          ? "border-gold bg-gold text-obsidian font-semibold"
          : "border-rule-strong bg-elevated text-ink-secondary hover:border-gold hover:text-ink"
      } ${className}`}
    >
      <span
        className="inline-flex items-center gap-1.5"
        style={{
          transition: "filter 140ms ease, opacity 140ms ease",
          filter: transitioning ? "blur(2px)" : "blur(0px)",
          opacity: transitioning ? 0.65 : 1,
        }}
      >
        {copied ? (
          <Check className="h-3 w-3 stroke-[2.25]" aria-hidden="true" />
        ) : (
          <Copy className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
        )}
        <span>{copied ? copiedLabel : label}</span>
      </span>
    </button>
  );
}
