import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";

const columns = [
  {
    title: "Promotion",
    links: [
      { href: "/roster", label: "Roster" },
      { href: "/championships", label: "Championships" },
      { href: "/events", label: "Events" },
      { href: "/tag-teams", label: "Tag Teams" },
      { href: "/officials", label: "Officials" },
    ],
  },
  {
    title: "Coverage",
    links: [
      { href: "/news", label: "News" },
      { href: "/results", label: "Results" },
      { href: "/matches", label: "Match Database" },
      { href: "/media", label: "Media Hub" },
      { href: "/stories", label: "Stories" },
    ],
  },
  {
    title: "Indus Matworks",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/shop", label: "Official Shop" },
      { href: "/events", label: "Tickets" },
      { href: "/media", label: "Watch" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#080808] text-white">
      <div className="bg-[#C1272D]">
        <div className="container-wide flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-2xl">
              Never miss a fall.
            </p>
            <p className="mt-1 font-body text-xs text-white/75">
              Live events, championship nights and the stories behind them.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/events"
              className="inline-flex min-h-10 items-center border border-white bg-white px-4 font-display text-[12px] font-bold uppercase tracking-[0.1em] text-[#C1272D] transition-colors hover:bg-white/90"
            >
              Upcoming Events
            </Link>
            <Link
              href="/shop"
              className="inline-flex min-h-10 items-center border border-white/45 px-4 font-display text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Shop Merch
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-4 select-none font-display text-[clamp(12rem,26vw,26rem)] font-black leading-none text-transparent opacity-[0.035] [-webkit-text-stroke:1px_#fff]"
        >
          IM
        </div>
        <div className="container-wide relative py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] lg:gap-8">
            <div>
              <Link href="/" aria-label="Indus Matworks home" className="inline-block text-white">
                <ImLogo size="lg" />
              </Link>
              <p className="mt-5 max-w-sm font-body text-sm leading-6 text-white/55">
                An Indian professional wrestling promotion presenting athletes, championships and
                stories built for an international stage.
              </p>
              <p className="mt-5 font-mono text-[10px] font-bold uppercase leading-5 tracking-[0.18em] text-[#DC2626]">
                Wrestling From India.
                <br />
                Built For The World.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/media"
                  className="inline-flex min-h-9 items-center border border-white/20 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  Watch
                </Link>
                <Link
                  href="/news"
                  className="inline-flex min-h-9 items-center border border-white/20 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  Newsroom
                </Link>
                <Link
                  href="/roster"
                  className="inline-flex min-h-9 items-center border border-white/20 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  Athletes
                </Link>
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/38">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="im-link font-display text-[13px] font-semibold uppercase tracking-[0.04em] text-white/65 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-white/38">
              © {new Date().getFullYear()} Indus Matworks. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/38">
              <Link href="/about" className="transition-colors hover:text-white">
                About
              </Link>
              <span className="text-white/15" aria-hidden>
                /
              </span>
              <Link href="/events" className="transition-colors hover:text-white">
                Events
              </Link>
              <span className="text-white/15" aria-hidden>
                /
              </span>
              <Link href="/media" className="transition-colors hover:text-white">
                Media
              </Link>
              <span className="text-white/15" aria-hidden>
                /
              </span>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
