"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { NewsCard } from "@/components/news/NewsCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { articles } from "@/data";
import { cn } from "@/lib/utils";

type NewsFilter = "all" | "breaking" | "news" | "results" | "announcements" | "backstage";
const filters: [NewsFilter, string][] = [
  ["all", "All"],
  ["breaking", "Breaking"],
  ["news", "News"],
  ["results", "Results"],
  ["announcements", "Announcements"],
  ["backstage", "Backstage"],
];

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsFilter>("all");
  const filtered = articles
    .filter((article) => filter === "all" || article.category === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featured = filtered.find((article) => article.featured) || filtered[0];
  const rest = filtered.filter((article) => article.id !== featured?.id);

  const countFor = (key: NewsFilter) =>
    key === "all" ? articles.length : articles.filter((article) => article.category === key).length;

  return (
    <>
      <PageHeader
        overline="Newsroom"
        title={
          <>
            News &amp;
            <br />
            Announcements
          </>
        }
        subtitle="Official news, event updates, results coverage, and backstage developments."
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#C1272D]">
            Official Newsroom
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
            {articles.length} stories published
          </p>
        </div>
      </section>

      <section className="bg-[var(--im-surface)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div
            className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <p className="im-eyebrow">Latest Coverage</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                The Newsroom
              </h2>
            </div>
            <div className="im-scroll-x -mx-1 px-1" aria-label="Filter news by category">
              {filters.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className="im-chip shrink-0 whitespace-nowrap"
                >
                  {label}
                  <span className="font-mono text-[8px] opacity-55">{countFor(key)}</span>
                </button>
              ))}
            </div>
          </div>

          {featured && (
            <div
              className="grid gap-px border border-[var(--im-border)] bg-[var(--im-border)] lg:grid-cols-[1.35fr_.65fr]"
              data-reveal
            >
              <NewsCard article={featured} variant="featured" />
              <div className="bg-[var(--im-page)] px-4 sm:px-5">
                {rest.slice(0, 4).map((article) => (
                  <NewsCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rest.slice(featured ? 4 : 0).map((article, index) => (
              <div
                key={article.id}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 60}ms` } as CSSProperties}
              >
                <NewsCard article={article} />
              </div>
            ))}
          </div>

          {!filtered.length && (
            <p className="border border-[var(--im-border)] bg-[var(--im-page)] p-6 font-body text-sm text-[var(--im-muted)]">
              No articles found.
            </p>
          )}
        </div>
      </section>

      <section className="im-cinematic border-t border-white/10 py-12 md:py-16">
        <div className="container-wide flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              Beyond The Headlines
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-black uppercase leading-[0.92] text-white">
              Watch the promotion.
            </h2>
          </div>
          <Link href="/media" className="im-btn im-btn-outline" data-reveal>
            Media Library
          </Link>
        </div>
      </section>
    </>
  );
}
