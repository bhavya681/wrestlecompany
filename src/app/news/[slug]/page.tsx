import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/Button";
import { articles } from "@/data";
import { formatDateLong } from "@/lib/utils";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <article className="py-8 md:py-12">
      <div className="container-wide">
        <div className="mb-8">
          <Badge variant="red" size="sm">
            {article.category.toUpperCase()}
          </Badge>
        </div>

        <h1 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 font-body text-sm text-foreground-muted">
          <span>{article.author}</span>
          <span>·</span>
          <span>{formatDateLong(article.date)}</span>
          <span>·</span>
          <span>{article.readTime} min read</span>
        </div>

        <div className="mt-8 aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-8 max-w-3xl">
          <ReactMarkdown
            components={{
              h1: ({ node: _node, ...props }) => (
                <h1
                  className="mt-8 font-display text-3xl font-bold text-foreground"
                  {...props}
                />
              ),
              h2: ({ node: _node, ...props }) => (
                <h2
                  className="mt-6 font-display text-2xl font-bold text-foreground"
                  {...props}
                />
              ),
              h3: ({ node: _node, ...props }) => (
                <h3
                  className="mt-4 font-display text-xl font-bold text-foreground"
                  {...props}
                />
              ),
              p: ({ node: _node, ...props }) => (
                <p
                  className="mb-4 font-body text-base leading-relaxed text-foreground-muted"
                  {...props}
                />
              ),
              strong: ({ node: _node, ...props }) => (
                <strong className="font-bold text-foreground" {...props} />
              ),
              ul: ({ node: _node, ...props }) => (
                <ul
                  className="mb-4 ml-6 list-disc font-body text-foreground-muted"
                  {...props}
                />
              ),
              li: ({ node: _node, ...props }) => <li className="mb-1" {...props} />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
