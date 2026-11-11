import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { articles } from "@/data";
import { formatDateLong, getCategoryName } from "@/lib/utils";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [{ url: article.image }] },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = articles
    .filter((item) => item.id !== article.id)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <>
      <PageHeader
        overline={getCategoryName(article.category)}
        title={article.title}
        subtitle={article.excerpt}
        backgroundImage={article.image}
        dark
      />

      <article className="border-b border-[var(--im-border)] bg-[var(--im-page)] py-10 md:py-16">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[var(--im-border)] pb-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                <Badge variant="red" size="sm">
                  {getCategoryName(article.category)}
                </Badge>
                <span>{article.author}</span>
                <span aria-hidden>·</span>
                <span>{formatDateLong(article.date)}</span>
                <span aria-hidden>·</span>
                <span>{article.readTime} min read</span>
              </div>

              <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-[var(--im-border)] bg-[var(--im-surface)]" data-reveal>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[#C1272D]" aria-hidden />
              </div>

              <div className="mt-8 max-w-3xl">
                <ReactMarkdown
                  components={{
                    h1: (props) => (
                      <h1 className="mt-9 font-display text-3xl font-bold uppercase leading-tight text-[var(--im-ink)]" {...props} />
                    ),
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
                    ol: (props) => (
                      <ol className="mb-5 ml-5 list-decimal space-y-1.5 font-body text-[15px] leading-7 text-[var(--im-muted)] sm:text-base" {...props} />
                    ),
                    li: (props) => <li {...props} />,
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
                  {article.content}
                </ReactMarkdown>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--im-border)] pt-6">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--im-muted)] transition-colors hover:text-[#C1272D]"
                >
                  <span aria-hidden>←</span> Back to Newsroom
                </Link>
                <Link href="/events" className="im-btn im-btn-dark">
                  Upcoming Events
                </Link>
              </div>
            </div>

            <aside className="h-fit border border-[var(--im-border)] bg-[var(--im-surface)] p-5 lg:sticky lg:top-28">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C1272D]">
                More From The Newsroom
              </p>
              <div className="mt-4 divide-y divide-[var(--im-border)]">
                {related.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="group flex gap-3 py-4 first:pt-0 last:pb-0">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-[var(--im-border)]">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#C1272D]">
                        {getCategoryName(item.category)}
                      </p>
                      <p className="mt-1 line-clamp-2 font-display text-sm font-bold uppercase leading-tight text-[var(--im-ink)] transition-colors group-hover:text-[#C1272D]">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
