"use client";

import { useState } from "react";
import { VideoCard } from "@/components/media/VideoCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { mediaItems } from "@/data";
import type { MediaCategory } from "@/types";

type MediaFilter = "all" | MediaCategory;

const filterLabels: Record<Exclude<MediaFilter, "all">, string> = {
  "latest-video": "LATEST VIDEO",
  highlights: "HIGHLIGHTS",
  matches: "MATCHES",
  backstage: "BACKSTAGE",
  interviews: "INTERVIEWS",
  "photo-gallery": "PHOTO GALLERY",
};

export default function MediaPage() {
  const [filter, setFilter] = useState<MediaFilter>("all");

  const filtered = mediaItems.filter((m) => {
    if (filter === "all") return true;
    return m.category === filter;
  });

  const featured = filtered.find((m) => m.category === "latest-video") || filtered[0];
  const others = filtered.filter((m) => m !== featured);

  return (
    <>
      <PageHeader
        title="MEDIA"
        subtitle="Watch, relive, and discover every moment of Indus Matworks."
        overline="MEDIA HUB"
        backgroundImage="https://picsum.photos/seed/media-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterButton
              label="ALL"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {Object.entries(filterLabels).map(([key, label]) => (
              <FilterButton
                key={key}
                label={label}
                active={filter === key}
                onClick={() => setFilter(key as Exclude<MediaFilter, "all">)}
              />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="font-body text-center text-foreground-muted">
              No media found in this category.
            </p>
          ) : (
            <div className="space-y-12">
              {featured && (
                <div>
                  <VideoCard item={featured} variant="featured" />
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((item) => (
                  <VideoCard key={item.id} item={item} variant="default" />
                ))}
              </div>

              {others.length > 6 && (
                <div className="mt-8 text-center">
                  <button className="font-body text-sm text-foreground-muted hover:text-accent-red">
                    Load More
                  </button>
                </div>
              )}
            </div>
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
