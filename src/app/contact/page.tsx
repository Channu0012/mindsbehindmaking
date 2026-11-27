import React from "react";
import type { Metadata } from "next";
import { ContactStudio } from "@/components/studio/ContactStudio";

export const metadata: Metadata = {
  title: "Contact & Collaborations",
  description:
    "Reach out for YouTube sponsorships, UI/product teardowns, founder collaborations, or custom engineering builds.",
};

export default function ContactPage() {
  return (
    <div className="mbm-wrap py-16 sm:py-24 space-y-12">
      <div className="border-b border-rule pb-10 space-y-3">
        <div className="mbm-m text-gold">CONTACT // WORK TOGETHER</div>
        <h1 className="mbm-display text-[clamp(36px,5vw,66px)] text-ink">
          Let&apos;s build something{" "}
          <span className="mbm-serif italic font-normal text-gold">worth shipping.</span>
        </h1>
        <p className="max-w-[58ch] text-[16px] leading-[1.6] text-ink-secondary">
          Open to honest tool sponsorships, design engineering critiques, founder build collaborations, and high-craft web projects.
        </p>
      </div>

      <ContactStudio />
    </div>
  );
}
