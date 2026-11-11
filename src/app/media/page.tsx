"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { VideoCard } from "@/components/media/VideoCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { mediaItems } from "@/data";
import type { MediaCategory } from "@/types";
import { cn } from "@/lib/utils";

type Filter = "all" | MediaCategory;
const labels: [Filter, string][] = [
  ["all", "All"],
  ["latest-video", "Latest"],
  ["highlights", "Highlights"],
  ["matches", "Matches"],
  ["backstage", "Backstage"],
  ["interviews", "Interviews"],
  ["photo-gallery", "Gallery"],
];

export default function MediaPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () => mediaItems.filter((item) => filter === "all" || item.category === filter),
    [filter]
  );
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHeader
        overline="Media Hub"
        title={
          <>
            Videos, Highlights
            <br />
            &amp; Features
          </>
        }
        subtitle="Match highlights, interviews, backstage content, and featured media from Indus Matworks."
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-10 md:py-16">
        <div className="container-wide">
          <div className="mb-7 flex flex-col gap-4 border-b border-[var(--im-border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="im-scroll-x">
              {labels.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className="im-chip shrink-0"
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]" aria-live="polite">
              {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </p>
          </div>

          {featured ? (
            <div data-reveal>
              <VideoCard item={featured} variant="featured" />
            </div>
          ) : null}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((item, index) => (
              <div key={item.id} data-reveal style={{ "--reveal-delay": `${(index % 3) * 60}ms` } as CSSProperties}>
                <VideoCard item={item} />
              </div>
            ))}
          </div>

          {!filtered.length ? (
            <p className="border border-[var(--im-border)] bg-[var(--im-surface)] p-6 font-body text-sm text-[var(--im-muted)]">
              No media found for this category.
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-[#C1272D] py-12 text-white md:py-16">
        <div className="container-wide flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              Never Miss A Moment
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase leading-none sm:text-4xl">
              Follow every fall and every feud.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={mediaItems[0]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("im-btn im-btn-light", !mediaItems[0]?.url && "pointer-events-none opacity-50")}
            >
              Watch Latest
            </a>
            <a
              href={mediaItems[0]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("im-btn im-btn-outline", !mediaItems[0]?.url && "pointer-events-none opacity-50")}
            >
              YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
