import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";

interface StoryCardProps { story: Story; variant?: "default" | "compact"; }

export function StoryCard({ story, variant = "default" }: StoryCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/stories/${story.slug}`} className="group flex gap-4 border-b border-[var(--im-border)] py-4 last:border-b-0">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
          <Image src={story.image} alt={story.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" sizes="112px" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#C1272D]">{story.status}</p>
          <h3 className="mt-1 line-clamp-2 font-display text-base font-bold uppercase leading-tight text-[var(--im-ink)] group-hover:text-[#C1272D]">{story.title}</h3>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/stories/${story.slug}`} className="group block overflow-hidden border border-[var(--im-border)] bg-[var(--im-page)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/35 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[16/10]">
        <Image src={story.image} alt={story.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width:1024px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.3] bg-[#C1272D] transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
        <div className="absolute left-4 top-4 border border-white/15 bg-black/45 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white">{story.status}</div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/72">{story.subtitle}</p>
          <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-[0.95] text-white">{story.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 font-body text-sm leading-6 text-[var(--im-muted)]">{story.excerpt}</p>
      </div>
    </Link>
  );
}
