"use client";

import React, { useEffect, useState } from "react";

export function BootLoader() {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("gone");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("mbm-atelier-booted");
    if (reduced || seen) {
      setPhase("gone");
      return;
    }

    setPhase("show");
    const fadeTimer = window.setTimeout(() => {
      setPhase("fade");
      window.sessionStorage.setItem("mbm-atelier-booted", "1");
    }, 1350);
    const doneTimer = window.setTimeout(() => {
      setPhase("gone");
    }, 1800);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-[#111111] transition-opacity duration-500 ${
        phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-7">
        {/* Animated Circle ∩ Square Convergence */}
        <svg
          width="88"
          height="88"
          viewBox="12 12 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 40 L40 64 A24 24 0 1 1 64 40 Z"
            fill="#F4F1EA"
            className="animate-[mbm-circle-in_0.75s_cubic-bezier(0.22,1,0.36,1)_both]"
          />
          <path
            d="M64 40 L84 40 L84 84 L40 84 L40 64 A24 24 0 0 0 64 40 Z"
            fill="#F4F1EA"
            className="animate-[mbm-square-in_0.75s_cubic-bezier(0.22,1,0.36,1)_both]"
          />
          <path
            d="M40 40 L64 40 A24 24 0 0 1 40 64 Z"
            fill="#C6A46A"
            className="animate-[mbm-wedge-in_0.45s_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
          />
        </svg>

        <div className="text-center space-y-2 animate-[mbm-fade-up_0.55s_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="text-[13px] font-semibold tracking-[0.22em] uppercase text-[#F4F1EA]">
            Minds Behind Making
          </div>
          <div className="mbm-m text-[10px] text-[#C6A46A]">
            Where Thinking Meets Craft
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mbm-circle-in {
          from { opacity: 0; transform: translate(-10px, -10px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes mbm-square-in {
          from { opacity: 0; transform: translate(10px, 10px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes mbm-wedge-in {
          from { opacity: 0; transform: scale(0.88); transform-origin: 40px 40px; }
          to { opacity: 1; transform: scale(1); transform-origin: 40px 40px; }
        }
        @keyframes mbm-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
