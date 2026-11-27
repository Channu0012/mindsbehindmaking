import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mbm-wrap flex min-h-[64vh] flex-col items-start justify-center py-20 space-y-6">
      <span className="mbm-m text-gold">ERR // 404 NOT INDEXED</span>
      <h1 className="mbm-display text-[clamp(40px,6vw,78px)] text-ink">
        Nothing built at this URL yet.
      </h1>
      <p className="max-w-[48ch] text-[16px] leading-[1.6] text-ink-secondary">
        Jump back to the studio overview or press ⌘K to search across episodes, prompts, and pages.
      </p>
      <Link
        href="/"
        className="mbm-btn bg-gold text-obsidian font-semibold hover:bg-ink"
      >
        <span>Back to Overview</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
