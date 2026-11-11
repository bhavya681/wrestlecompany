import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";

const destinations = [
  { href: "/roster", label: "Roster", copy: "Athletes, champions and officials." },
  { href: "/events", label: "Events", copy: "Upcoming and past event cards." },
  { href: "/news", label: "Newsroom", copy: "Latest promotion coverage." },
];

export default function NotFound() {
  return (
    <section className="im-cinematic relative overflow-hidden border-b border-white/10 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 im-grid-lines opacity-40" aria-hidden />
      <div
        className="im-outline-type pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 text-[24rem] leading-none lg:block"
        aria-hidden
      >
        404
      </div>

      <div className="container-wide relative">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <ImLogo size="md" />
            <span className="h-8 w-px bg-white/20" aria-hidden />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#DC2626]">
              Error 404
            </p>
          </div>

          <h1 className="mt-8 font-display text-[clamp(3.2rem,10vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.04em] text-white">
            Out Of
            <br />
            Bounds.
          </h1>
          <p className="mt-5 max-w-md font-body text-sm leading-7 text-white/55">
            The page you&rsquo;re looking for doesn&rsquo;t exist, may have moved, or is not
            currently available.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link href="/" className="im-btn im-btn-red">
              Return Home
            </Link>
            <Link href="/roster" className="im-btn im-btn-outline">
              View Roster
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-white/12 bg-white/10 sm:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="group bg-[#0d0d0d] p-5 transition-colors hover:bg-[#141414]"
            >
              <p className="font-display text-lg font-bold uppercase leading-none text-white transition-colors group-hover:text-[#DC2626]">
                {destination.label}
              </p>
              <p className="mt-2 font-body text-xs leading-5 text-white/45">{destination.copy}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
