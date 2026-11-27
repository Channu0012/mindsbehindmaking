"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail, Send } from "lucide-react";
import { SITE_CONFIG, SOCIAL_CHANNELS } from "@/data/brand";
import { CopyButton } from "@/components/ui/CopyButton";

type InquiryType = "sponsorship" | "critique" | "collab" | "build";

const INQUIRY_OPTIONS: {
  id: InquiryType;
  label: string;
  helper: string;
  budgetLabel: string;
  budgets: string[];
}[] = [
  {
    id: "sponsorship",
    label: "Tool / Brand Sponsorship",
    helper: "Integrated YouTube build workflows featuring dev tools or SaaS products I genuinely test.",
    budgetLabel: "Partnership Scope",
    budgets: ["Single Video Integration", "3-Episode Series", "Launch Demo + Companion"],
  },
  {
    id: "critique",
    label: "UI & Product Teardown",
    helper: "Book an engineering/design audit or live redesign video for your product.",
    budgetLabel: "Audit Format",
    budgets: ["Private Async Loom + Diff", "Featured YouTube Redesign", "Full Design System"],
  },
  {
    id: "collab",
    label: "Founder Collab / Guest",
    helper: "Co-build an open-source tool, interview, or dual-channel engineering episode.",
    budgetLabel: "Collab Type",
    budgets: ["Co-Build Episode", "Founder Conversation", "Open-Source Drop"],
  },
  {
    id: "build",
    label: "Custom Build Request",
    helper: "Have an ambitious brand, studio web app, or interactive system you want engineered?",
    budgetLabel: "Timeline",
    budgets: ["2–4 Weeks Sprint", "1–2 Months Flagship", "Advisory Only"],
  },
];

export function ContactStudio() {
  const [inquiry, setInquiry] = useState<InquiryType>("sponsorship");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [scope, setScope] = useState(INQUIRY_OPTIONS[0].budgets[0]);
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; brief?: string }>({});
  const [receipt, setReceipt] = useState<{
    refId: string;
    summary: string;
  } | null>(null);

  const activeConfig = useMemo(
    () => INQUIRY_OPTIONS.find((o) => o.id === inquiry) ?? INQUIRY_OPTIONS[0],
    [inquiry]
  );

  const selectInquiry = (next: InquiryType) => {
    setInquiry(next);
    const found = INQUIRY_OPTIONS.find((o) => o.id === next);
    if (found) setScope(found.budgets[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string; brief?: string } = {};
    if (!name.trim()) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (brief.trim().length < 20) {
      nextErrors.brief = "Share at least 20 characters so I understand the context.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const refId = `MBM-${Math.floor(1000 + Math.random() * 9000)}`;
    const summary = `[${refId}] ${activeConfig.label}
From: ${name.trim()} (${email.trim()})${company.trim() ? ` · ${company.trim()}` : ""}
Scope: ${scope}
Brief: ${brief.trim()}`;

    setReceipt({ refId, summary });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Left Direct Channels */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-[16px] border border-rule bg-elevated p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <span className="mbm-m text-gold">DIRECT INBOX</span>
            <span className="inline-flex items-center gap-1.5 mbm-m text-[10px] text-ink-muted">
              <span className="mbm-live" />
              REPLIES &lt; 48H
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[18px] font-medium text-ink">
              <Mail className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
              <span className="truncate">{SITE_CONFIG.email}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={SITE_CONFIG.email} label="Copy Email" />
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-rule-strong bg-bg px-3 mbm-m text-[10px] text-ink-secondary hover:border-gold hover:text-gold"
              >
                <span>Open Mail App</span>
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          <p className="border-t border-rule pt-4 text-[14px] leading-[1.6] text-ink-secondary">
            Only taking on collaborations, sponsorships, and tool spotlights I would genuinely use in my own workflow. No vague cold-pitch blasts.
          </p>
        </div>

        <div className="rounded-[16px] border border-rule bg-elevated p-6 space-y-4">
          <span className="mbm-m text-[10px] text-ink-muted block">SOCIAL DISPATCHES</span>
          <div className="divide-y divide-rule">
            {SOCIAL_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="text-[14px] font-medium text-ink group-hover:text-gold transition-colors">
                    {ch.name}
                  </div>
                  <div className="mbm-m text-[10px] text-ink-muted">{ch.handle}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-muted group-hover:text-gold" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Interactive Smart Brief Form */}
      <div className="lg:col-span-7">
        {receipt ? (
          <div className="rounded-[18px] border border-gold bg-elevated p-8 space-y-6">
            <div className="flex items-center gap-3 text-gold">
              <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span className="mbm-m text-[12px]">BRIEF PREPARED · REF {receipt.refId}</span>
            </div>

            <h2 className="mbm-display text-[32px] text-ink">
              Ready to send to {SITE_CONFIG.name}.
            </h2>
            <p className="text-[15px] leading-[1.6] text-ink-secondary">
              Your structured brief is formatted below. Launch it directly in your mail client or copy the reference summary.
            </p>

            <pre className="rounded-[12px] border border-rule bg-deep p-4 whitespace-pre-wrap font-mono text-[12px] leading-[1.65] text-ink">
              {receipt.summary}
            </pre>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
                  `[${receipt.refId}] ${activeConfig.label} — ${name}`
                )}&body=${encodeURIComponent(receipt.summary)}`}
                className="mbm-btn bg-gold text-obsidian font-semibold hover:bg-ink"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Send via Email Client</span>
              </a>
              <CopyButton text={receipt.summary} label="Copy Brief Summary" />
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  setBrief("");
                }}
                className="mbm-m text-[11px] text-ink-muted hover:text-ink px-3 cursor-pointer"
              >
                Start Another Brief
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[18px] border border-rule bg-elevated p-6 sm:p-8 space-y-7"
          >
            <div className="space-y-3">
              <span className="mbm-m text-gold block">01 // SELECT INQUIRY TYPE</span>
              <div className="grid gap-2 sm:grid-cols-2">
                {INQUIRY_OPTIONS.map((opt) => {
                  const selected = opt.id === inquiry;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectInquiry(opt.id)}
                      className={`rounded-[10px] border p-3.5 text-left cursor-pointer transition-colors ${
                        selected
                          ? "border-gold bg-gold-soft text-ink"
                          : "border-rule bg-bg text-ink-secondary hover:border-rule-strong hover:text-ink"
                      }`}
                    >
                      <div className="text-[14px] font-medium">{opt.label}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[13px] text-ink-muted">{activeConfig.helper}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="mbm-m text-[10px] text-ink-muted">Your Name *</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full border-b border-rule-strong bg-transparent py-2.5 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none"
                />
                {errors.name && (
                  <span className="block text-[12px] text-[#ff8a7a]">{errors.name}</span>
                )}
              </label>

              <label className="block space-y-1.5">
                <span className="mbm-m text-[10px] text-ink-muted">Work Email *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full border-b border-rule-strong bg-transparent py-2.5 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none"
                />
                {errors.email && (
                  <span className="block text-[12px] text-[#ff8a7a]">{errors.email}</span>
                )}
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="mbm-m text-[10px] text-ink-muted">Company / Channel / URL</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="https://..."
                  className="w-full border-b border-rule-strong bg-transparent py-2.5 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none"
                />
              </label>

              <div className="space-y-2">
                <span className="mbm-m text-[10px] text-ink-muted block">
                  {activeConfig.budgetLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeConfig.budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setScope(b)}
                      className={`rounded-full border px-3 py-1.5 mbm-m text-[10px] cursor-pointer transition-colors ${
                        scope === b
                          ? "border-gold bg-gold text-obsidian font-semibold"
                          : "border-rule bg-bg text-ink-secondary hover:border-gold"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <label className="block space-y-2">
              <div className="flex items-center justify-between">
                <span className="mbm-m text-[10px] text-ink-muted">
                  Project Context / Pitch *
                </span>
                <span className="mbm-m text-[10px] text-ink-muted tabular-nums">
                  {brief.length} CHARS
                </span>
              </div>
              <textarea
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Share what you're building, target launch window, or how we can collaborate..."
                className="w-full rounded-[10px] border border-rule-strong bg-bg p-3.5 text-[14.5px] leading-[1.6] text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none resize-y"
              />
              {errors.brief && (
                <span className="block text-[12px] text-[#ff8a7a]">{errors.brief}</span>
              )}
            </label>

            <button
              type="submit"
              className="mbm-btn w-full sm:w-auto min-h-[52px] px-8 bg-gold text-obsidian font-semibold hover:bg-ink"
            >
              <span>Prepare &amp; Send Brief</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
