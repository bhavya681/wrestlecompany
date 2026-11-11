import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const merchandise = [
  { id: "1", name: "IM Logo Tee", category: "Apparel", price: "Coming Soon", image: "/images/shop/logo-tee.svg" },
  { id: "2", name: "IM Event Hoodie", category: "Apparel", price: "Coming Soon", image: "/images/shop/event-hoodie.svg" },
  { id: "3", name: "World Championship Replica", category: "Collectibles", price: "Coming Soon", image: "/images/shop/world-replica.svg" },
  { id: "4", name: "IM Snapback", category: "Accessories", price: "Coming Soon", image: "/images/shop/snapback.svg" },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        overline="Official Store"
        title={
          <>
            Wear The
            <br />
            Promotion
          </>
        }
        subtitle="Official Indus Matworks merchandise. This is a store preview — product availability and purchasing will be connected when store operations are ready."
        dark
      />

      <section className="border-b border-[var(--im-border)] bg-[var(--im-page)]">
        <div className="container-wide flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#C1272D]">
            Store Preview · Launching Soon
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
            No purchases are processed at this time.
          </p>
        </div>
      </section>

      <section className="bg-[var(--im-page)] py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div>
              <p className="im-eyebrow">The Collection</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.2rem)] font-black uppercase leading-[0.92] text-[var(--im-ink)]">
                Official Gear
              </h2>
            </div>
            <p className="max-w-sm font-body text-sm leading-6 text-[var(--im-muted)]">
              Apparel, accessories and collectibles carrying the Indus Matworks identity.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {merchandise.map((item, index) => (
              <article
                key={item.id}
                className="group border border-[var(--im-border)] bg-[var(--im-surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C1272D]/45"
                data-reveal
                style={{ "--reveal-delay": `${(index % 4) * 60}ms` } as CSSProperties}
              >
                <div className="relative aspect-[4/5] overflow-hidden border-b border-[var(--im-border)] bg-[var(--im-surface)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge variant="dark" size="sm">
                      Preview
                    </Badge>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#C1272D]">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase leading-none text-[var(--im-ink)]">
                    {item.name}
                  </h3>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--im-muted)]">
                    {item.price}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080808] py-12 text-white md:py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              Store Update
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.92]">
              Official merchandise is on the way.
            </h2>
            <p className="mt-4 max-w-xl font-body text-sm leading-7 text-white/55">
              The collection is presented for preview only. Follow the newsroom and event
              announcements for launch details.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Link href="/news" className="im-btn im-btn-light">
              Store News
            </Link>
            <Link href="/events" className="im-btn im-btn-outline">
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
