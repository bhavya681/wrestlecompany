"use client";

import { useState } from "react";
import { NewsCard } from "@/components/news/NewsCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { articles } from "@/data";

type NewsFilter = "all" | "breaking" | "news" | "results" | "announcements" | "backstage";

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsFilter>("all");

  const filtered = articles.filter((a) => {
    if (filter === "all") return true;
    return a.category === filter;
  });

  const sortedArticles = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedArticles.find((a) => a.featured) || sortedArticles[0];
  const secondary = sortedArticles.filter((a) => a !== featured);

  return (
    <>
      <PageHeader
        title="NEWS"
        subtitle="The latest news, results, and backstage developments from Indus Matworks."
        overline="NEWSROOM"
        backgroundImage="https://picsum.photos/seed/news-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterButton label="ALL" active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterButton label="BREAKING" active={filter === "breaking"} onClick={() => setFilter("breaking")} />
            <FilterButton label="NEWS" active={filter === "news"} onClick={() => setFilter("news")} />
            <FilterButton label="RESULTS" active={filter === "results"} onClick={() => setFilter("results")} />
            <FilterButton label="ANNOUNCEMENTS" active={filter === "announcements"} onClick={() => setFilter("announcements")} />
            <FilterButton label="BACKSTAGE" active={filter === "backstage"} onClick={() => setFilter("backstage")} />
          </div>

          {sortedArticles.length === 0 ? (
            <p className="font-body text-center text-foreground-muted">
              No articles found in this category.
            </p>
          ) : (
            <>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured && <NewsCard article={featured} variant="featured" />}
                {secondary.map((article) => (
                  <NewsCard key={article.id} article={article} variant="default" />
                ))}
              </div>

              {secondary.length > 6 && (
                <div className="mt-8 text-center">
                  <button className="font-body text-sm text-foreground-muted hover:text-accent-red">
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-2 font-body text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
        active
          ? "border-accent-red bg-accent-red/10 text-accent-red"
          : "border-border text-foreground-muted hover:border-accent-red hover:text-accent-red"
      }`}
    >
      {label}
    </button>
  );
}
