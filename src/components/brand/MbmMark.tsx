import React from "react";

interface MbmMarkProps {
  size?: number;
  className?: string;
  goldIntersection?: boolean;
}

/**
 * Exact geometric Circle ∩ Square emblem of MindsBehindMaking.
 * Circle = Minds / Inquiry · Square = Making / Structure · Wedge = Brushed Gold Craft.
 */
export function MbmMark({
  size = 34,
  className = "",
  goldIntersection = true,
}: MbmMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="12 12 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M40 40 L40 64 A24 24 0 1 1 64 40 Z" fill="#F4F1EA" />
      <path
        d="M64 40 L84 40 L84 84 L40 84 L40 64 A24 24 0 0 0 64 40 Z"
        fill="#F4F1EA"
      />
      {goldIntersection && (
        <path d="M40 40 L64 40 A24 24 0 0 1 40 64 Z" fill="#C6A46A" />
      )}
    </svg>
  );
}

export function MbmWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <MbmMark size={30} className="shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[13.5px] font-semibold tracking-[0.14em] uppercase text-ink">
          Minds Behind Making
        </span>
        {!compact && (
          <span className="mbm-m text-[9px] text-ink-muted mt-1">
            Obsidian Build Studio
          </span>
        )}
      </span>
    </span>
  );
}
