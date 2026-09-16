import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";

const footerNav = {
  navigation: [
    { href: "/roster", label: "Wrestlers" },
    { href: "/championships", label: "Championships" },
    { href: "/events", label: "Events" },
    { href: "/results", label: "Results" },
    { href: "/news", label: "News" },
    { href: "/media", label: "Media" },
    { href: "/events", label: "Tickets" },
    { href: "/shop", label: "Shop" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Media" },
  ],
  legal: [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "Cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-wide py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <ImLogo size="lg" />
            </div>
            <div className="mb-4 space-y-1">
              <p className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                INDUS MATWORKS
              </p>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent-red">
                Wrestling From India.
                <br />
                Built For The World.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <SocialIcon href="#" label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h4 className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-foreground-muted">
                  Navigation
                </h4>
                <ul className="space-y-3 font-body">
                  {footerNav.navigation.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-foreground transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-foreground-muted">
                  Company
                </h4>
                <ul className="space-y-3 font-body">
                  {footerNav.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-foreground transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-foreground-muted">
                  Legal
                </h4>
                <ul className="space-y-3 font-body">
                  {footerNav.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-foreground transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-foreground-muted">
                  The IM Universe
                </h4>
                <p className="mb-4 text-xs text-foreground-muted leading-relaxed">
                  Join the newsletter for early ticket access, exclusive content, and event updates.
                </p>
                <form className="flex flex-col gap-2" action="#">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground placeholder-foreground-muted/40 focus:border-accent-red focus:outline-none"
                    aria-label="Email address"
                    required
                  />
                  <button
                    type="submit"
                    className="border border-accent-red bg-accent-red px-4 py-2.5 font-display text-xs font-bold uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent-red-hover"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted/60">
            &copy; {new Date().getFullYear()} Indus Matworks. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerNav.legal.map((link) => (
              <Link
                key={`bottom-${link.label}`}
                href={link.href}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-muted/60 transition-colors hover:text-accent-red"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-border text-foreground-muted transition-all duration-200 hover:border-accent-red hover:text-accent-red"
    >
      {children}
    </a>
  );
}
