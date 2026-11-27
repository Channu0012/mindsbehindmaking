"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Plus } from "lucide-react";
import { TOPIC_PROPOSALS, type TopicProposal } from "@/data/brand";
import { RevealBlock } from "@/components/ui/MotionPrimitives";

const VOTED_KEY = "mbm-topic-votes";
const CUSTOM_KEY = "mbm-topic-custom";

export function TopicQueueSection() {
  const [topics, setTopics] = useState<TopicProposal[]>(TOPIC_PROPOSALS);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAngle, setNewAngle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const savedVotes = window.localStorage.getItem(VOTED_KEY);
      if (savedVotes) setVotedIds(JSON.parse(savedVotes));
      const savedCustom = window.localStorage.getItem(CUSTOM_KEY);
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom) as TopicProposal[];
        setTopics([...TOPIC_PROPOSALS, ...parsed]);
      }
    } catch {}
  }, []);

  const toggleVote = (id: string) => {
    setVotedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        window.localStorage.setItem(VOTED_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const entry: TopicProposal = {
      id: `custom-${Date.now()}`,
      code: `IDEA.${String(topics.length + 1).padStart(2, "0")}`,
      title: newTitle.trim(),
      angle: newAngle.trim() || "Viewer build request",
      initialVotes: 1,
    };
    const nextTopics = [...topics, entry];
    setTopics(nextTopics);
    setVotedIds((prev) => {
      const nextVotes = [...prev, entry.id];
      try {
        window.localStorage.setItem(VOTED_KEY, JSON.stringify(nextVotes));
      } catch {}
      return nextVotes;
    });
    try {
      const customOnly = nextTopics.filter((t) => t.id.startsWith("custom-"));
      window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(customOnly));
    } catch {}
    setNewTitle("");
    setNewAngle("");
    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mbm-wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <RevealBlock className="space-y-3">
            <span className="mbm-m text-gold">07 // BUILD WITH ME</span>
            <h2 className="mbm-display text-[clamp(32px,4.4vw,54px)] text-ink">
              What should we{" "}
              <span className="mbm-serif italic font-normal text-gold">build &amp; film</span>{" "}
              next?
            </h2>
            <p className="text-[15.5px] leading-[1.6] text-ink-secondary">
              Upvote upcoming Season 01 episodes or suggest a real software product, UI refactor, or tool breakdown.
            </p>
          </RevealBlock>

          <form
            onSubmit={handleSubmit}
            className="mbm-surface-rim rounded-[16px] p-6 space-y-4"
          >
            <div className="mbm-m text-[10px] text-gold">PITCH AN EPISODE IDEA</div>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => {
                setSubmitted(false);
                setNewTitle(e.target.value);
              }}
              placeholder="e.g. Rebuild Stripe Docs command palette..."
              aria-label="Suggested episode title"
              className="w-full border-b border-rule-strong bg-transparent py-2.5 text-[15px] text-ink placeholder:text-ink-muted/70 focus:border-gold focus:outline-none"
            />
            <input
              type="text"
              value={newAngle}
              onChange={(e) => setNewAngle(e.target.value)}
              placeholder="Which stack, prompt, or UI detail?"
              aria-label="Suggested stack or angle"
              className="w-full border-b border-rule-strong bg-transparent py-2.5 text-[13.5px] text-ink placeholder:text-ink-muted/70 focus:border-gold focus:outline-none"
            />
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="mbm-btn min-h-[42px] h-[42px] px-5 bg-gold text-obsidian font-semibold text-[13px] hover:bg-ink"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Add to Queue</span>
              </button>
              {submitted && <span className="mbm-m text-[10px] text-gold">Added ✓</span>}
            </div>
          </form>
        </div>

        {/* Clean Hairline Voting Ledger (no stacked boxed borders) */}
        <div className="lg:col-span-7 border-t border-rule">
          {topics.map((item) => {
            const voted = votedIds.includes(item.id);
            const totalVotes =
              item.initialVotes + (voted && !item.id.startsWith("custom-") ? 1 : 0);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-rule py-5 px-2 hover:bg-elevated/45 transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <div className="mbm-m text-[10px] text-gold">{item.code}</div>
                  <h3 className="text-[18px] font-medium tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-ink-secondary">{item.angle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleVote(item.id)}
                  aria-pressed={voted}
                  aria-label={`Upvote ${item.title}`}
                  className={`shrink-0 flex flex-col items-center justify-center min-w-[58px] rounded-full border px-3 py-2.5 cursor-pointer transition-all duration-150 active:scale-[0.96] ${
                    voted
                      ? "border-gold bg-gold text-obsidian font-semibold"
                      : "border-rule-strong bg-elevated text-ink-secondary hover:border-gold hover:text-ink"
                  }`}
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="mt-0.5 font-mono text-[12px] tabular-nums">
                    {totalVotes}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
