import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { WrestlerPortrait } from "@/components/wrestlers/WrestlerPortrait";
import { stories, wrestlers } from "@/data";
import type { Wrestler } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) return { title: "Not Found" };
  return {
    title: story.title,
    description: story.subtitle || story.excerpt,
    openGraph: { title: story.title, description: story.subtitle || story.excerpt, images: [{ url: story.image }] },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) notFound();
  const participants = story.participants
    .map((id) => wrestlers.find((wrestler) => wrestler.id === id))
    .filter((wrestler): wrestler is Wrestler => Boolean(wrestler));
  const otherStories = stories.filter((item) => item.id !== story.id).slice(0, 2);

  return (
    <>
      <PageHeader
        overline={story.status === "active" ? "Active Storyline" : "Story Archive"}
        title={story.title}
        subtitle={story.subtitle}
        backgroundImage={story.image}
        dark
      />

      <article className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-10 md:py-16">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3 border-b border-[var(--im-border)] pb-4">
                <Badge variant={story.status === "active" ? "red" : "muted"}>{story.status}</Badge>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                  Storyline · {story.participants.length} participants
                </p>
              </div>

              <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]" data-reveal>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[#C1272D]" aria-hidden />
              </div>

              <div className="mt-8 max-w-3xl">
                <ReactMarkdown
                  components={{
                    h2: (props) => (
                      <h2 className="mt-9 font-display text-2xl font-bold uppercase leading-tight text-[var(--im-ink)]" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="mt-7 font-display text-xl font-bold uppercase leading-tight text-[var(--im-ink)]" {...props} />
                    ),
                    p: (props) => (
                      <p className="mb-5 font-body text-[15px] leading-8 text-[var(--im-muted)] sm:text-base" {...props} />
                    ),
                    strong: (props) => (
                      <strong className="font-semibold text-[var(--im-ink)]" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="mb-5 ml-5 list-disc space-y-1.5 font-body text-[15px] leading-7 text-[var(--im-muted)] sm:text-base" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="my-7 border-l-2 border-[#C1272D] bg-[var(--im-surface)] py-4 pl-5 pr-4 font-display text-lg font-semibold uppercase leading-snug text-[var(--im-ink)]"
                        {...props}
                      />
                    ),
                    a: (props) => (
                      <a className="text-[#C1272D] underline underline-offset-4 hover:text-[#991B1B]" {...props} />
                    ),
                  }}
                >
                  {story.content}
                </ReactMarkdown>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--im-border)] pt-6">
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)] transition-colors hover:text-[#C1272D]"
                >
                  <span aria-hidden>←</span> All Stories
                </Link>
                <Link href="/roster" className="im-btn im-btn-dark">
                  Explore The Roster
                </Link>
              </div>
            </div>

            <aside className="h-fit space-y-5 lg:sticky lg:top-28">
              <div className="border border-[var(--im-border)] bg-[var(--im-surface)] p-5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C1272D]">
                  Involved
                </p>
                <div className="mt-4 space-y-2">
                  {participants.map((wrestler) => (
                    <Link
                      key={wrestler.id}
                      href={`/roster/${wrestler.id}`}
                      className="group flex items-center gap-3 border border-[var(--im-border)] bg-[var(--im-page)] p-2 transition-colors hover:border-[#C1272D]/50"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]">
                        <WrestlerPortrait
                          wrestler={wrestler}
                          mask="none"
                          sizes="56px"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-bold uppercase leading-tight text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                          {wrestler.ringName}
                        </p>
                        <p className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--im-muted)]">
                          {wrestler.division}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {!participants.length && (
                    <p className="font-body text-sm text-[var(--im-muted)]">Participant details unavailable.</p>
                  )}
                </div>
              </div>

              {otherStories.length > 0 ? (
                <div className="border border-[var(--im-border)] bg-[var(--im-surface)] p-5">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C1272D]">
                    More Stories
                  </p>
                  <div className="mt-4 divide-y divide-[var(--im-border)]">
                    {otherStories.map((item) => (
                      <Link key={item.id} href={`/stories/${item.slug}`} className="group block py-4 first:pt-0 last:pb-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                          {item.status}
                        </p>
                        <p className="mt-1 font-display text-base font-bold uppercase leading-tight text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
