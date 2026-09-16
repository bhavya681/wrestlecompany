import Link from "next/link";
import { ImLogo } from "@/components/logo/ImLogo";

const footerNav = [
  { href: "/events", label: "Events" },
  { href: "/roster", label: "Roster" },
  { href: "/championships", label: "Championships" },
  { href: "/news", label: "News" },
  { href: "/media", label: "Media" },
  { href: "/shop", label: "Shop" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (    <footer className="border-t border-border bg-background-secondary">
      <div className="container-wide py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <ImLogo size="lg" />
            </div>
            <div className="mb-4 space-y-1">
              <p className="font-display text-xl font-bold tracking-wider text-foreground">
                INDUS MATWORKS
              </p>
              <p className="font-body text-sm tracking-widest text-foreground-muted">
                INDIA&apos;S PROFESSIONAL WRESTLING PROMOTION
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <SocialIcon
                href="#"
                label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C8.74 0 8.333.015 11.4.072 14.16.12 15.84.337 17.657.795c1.755.442 2.757 1.02 3.643 1.906.886.886 1.466 1.888 1.906 3.643.458 1.817.675 2.224.732 5.485s-.274 3.668-.732 5.485c-.44 1.757-1.022 2.758-1.906 3.644-.886.886-1.888 1.466-3.643 1.906-1.818.459-2.226.675-5.485.732-.459.006-.917.018-1.375.018S12.324 24 12 24s-.94-.018-1.375-.018c-3.558-.069-3.968-.285-5.485-.732-1.758-.442-2.76-1.022-3.644-1.906-.886-.887-1.466-1.888-1.906-3.643C.015 16.333 0 15.926 0 12.666S.015 8.667.072 7.148c.44-1.756 1.02-2.757 1.906-3.643.886-.886 1.888-1.466 3.643-1.906 1.817-.459 2.225-.675 5.485-.732C12.333.015 12.667 0 12 0Z" />
                  <path
                    d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Z"
                    fill="#080808"
                  />
                  <path d="M18.406 4.275a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 4.385c-.72-.72-1.87-1.1-3.48-1.1C14.69 3 12 3 12 3s-2.69 0-4.13.28c-1.61.29-2.76.98-3.48 1.7-1.13 1.12-1.13 2.67-1.13 4.28v1.44c0 2.74-.02 5.48 2.97 5.48 1.7 0 2.88-.1 4.08-1.1.89-.78 1.24-1.3 1.24-1.3l-.01-.02c0-.01.01.01.02.02 1.2-.1 1.78-.35 2.68-1.25 1.2-1.2 1.2-2.79 1.2-4.6 0-.4-.01-.78-.01-1.47 0-1.69 0-3.28-.81-3.28s-.81 1.58-.81 3.27v1.43c0 1.61.02 3.85-3.82 3.85-2.14 0-2.96-.08-4.27-.94-1.6-1.04-1.19-2.93-1.19-5.26V9.24c0-3.28.32-5.35 2.66-7.67C5.64 1.6 7.85 1 12 1s6.37.6 8.62 2.87c2.34 2.33 2.65 4.4 2.65 7.69v1.44c0 2.33-.2 3.93-1.29 5.05-.77.79-1.75 1.4-2.76 1.65l.01-2.69c2.01.02 3.35.02 3.94-.56.57-.54.8-1.74.8-3.56v-1.45c.02-1.59.02-3.27 0-4.93 0-1.69-.02-3.28-.79-3.28s-.78 1.59-.78 3.29v1.43c0 1.36-.21 2.17-.74 2.7-.53.52-1.27.79-2.19.79" />
                  <path d="M9.5 8v8l5-4z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.905 4.218c-.578-.578-1.317-.955-2.16-.955-1.26 0-1.89-.02-3.76-.04-.63 0-1.37.03-2.11.08-1.12.05-1.86.12-2.58.29-.432.09-1.12.28-1.92.54-.8.27-1.4.64-1.85 1.07-.23.22-.29.3-.37.37-.09.05-.08.07-.18.17 0 0 0 .01-.01.01l.05-.04v-.08c.03-.25.06-.5.1-.75.06-.46.17-.92.3-1.38.13-.44.32-.88.55-1.25.22-.35.5-.64.83-.87.25-.18.56-.36.88-.48.31-.12.65-.19.97-.23.31-.04.62-.05.93-.05.02 0 .03 0 .05.01 0 0 0 0-.01.01l.03.02c.23.03.47.08.7.13.24.05.48.11.72.18 1.05.29 1.99.76 2.82 1.41l.03.02c.05-.02.1-.05.15-.07.23-.1.46-.19.68-.28.23-.09.46-.17.68-.24.23-.06.46-.12.68-.15.2-.03.4-.05.6-.05.56 0 1.12.03 1.67.08l.03.02c.03-.21.08-.41.12-.61.06-.45.15-.89.27-1.33.11-.47.27-.91.46-1.34.19-.44.44-.85.72-1.19.29-.33.63-.6 1.03-.77.2-.09.41-.17.62-.22.22-.05.45-.1.68-.12l.05-.01c.03 0 .06-.03.1-.03h.05c0 0 .03.01.05.02.29.03.58.07.86.14.24.06.48.15.72.24 1.15.37 2.19.95 3.07 1.74l.02.02c.02.03.05.05.07.08.1-.27.2-.54.3-1.08.07-.45.13-.91.17-1.37.03-.36.07-.72.09-1.09.01-.26.03-.51.03-.77v-.37c0-.26-.07-.5-.2-.67-.13-.17-.33-.27-.5-.27h-.01c-.17-.01-1.02.03-2.88-.02-1.86-.05-2.8-.11-3.9-.16-1.1-.05-1.79.03-2.53.18-1.06.23-1.69.56-2.27.99-.42.32-.74.75-.91 1.21-.1.34-.18.7-.23 1.08-.03.26-.08.52-.11.78l-.02.17c0 .01 0 .03-.01.04v.01c0 .01 0 .03-.01.04.31.32.87.86 1.6 1.45 1.22 1 2.78 1.78 4.44 1.78 1.03 0 2.06-.09 3.09-.27 1.03-.18 2.08-.46 3.12-.83.3-.09-.74-.04-1.04-.11-.02-.01-.04-.01-.06-.03-.28-.08-.55-.17-.83-.27-1.36-.49-2.7-.6-4.01-.55-1.32-.73-2.64-.68-3.92.06-1.58.6-3.01 1.56-4.01.49-.5.99-.88 1.56-1.14.31-.14.65-.25.98-.31.31-.06.65-.08.97-.08.38 0 .76.03 1.13.08.12.01.23.03.35.04l.17.02c.18-.04.36-.06.55-.08.34-.03.68-.05 1.03-.05.02 0 .05 0 .07.01.02 0 .05.02.07.03l.03.01c.02 0 .05.02.07.04.01 0 .03 0 .04.01 0 .01.01.02.01.03.12.01.24.03.36.04.16.02.32.03.48.05 1 .07 2.02-.02 2.99-.1.99-.07 1.98-.26 2.94-.59.42-.15.85-.39 1.23-.73.12-.13.23-.26.34-.39l.01.01c.07-.08.14-.16.2-.25.02-.03 0-.05-.01-.07l-.01-.07c-.01-.21-.03-.42-.05-.63-.01-.21-.02-.42-.03-.63 0-.21-.01-.42-.02-.63-.02-.21-.04-.41-.07-.62h.01c.05.19.1.39.17.58.02.07.03.14.05.21.49-.37.99-.74 1.51-1.11.53-.37 1.09-.72 1.66-.97.02-.01.04-.03.07-.03.18-.09.37-.17.56-.25.38 0 .77-.03 1.15-.09.73-.14 1.46-.42 2.16-.84.72-.44 1.37-.96 1.94-1.51.03-.02.06-.05.1-.07.07-.04.14-.09.21-.13.03-.02.07-.04.1-.06.19-.12.38-.22.56-.31.59-.3.94-.44 1.29-.58l.06-.02v.02c.04.29.1.58.17.88.07.31.16.61.26.91.05.17.1.34.16.51.03.08.06.16.09.24.15.39.31.78.46 1.18.16.42.31.85.45 1.29.05.17.1.34.15.51.02.07.05.14.07.21.14.4.28.8.41 1.21.13.41.26.82.38 1.24.05.17.09.34.14.51.02.07.03.14.05.21.12.4.23.8.33 1.21.1.41.2.82.28 1.23l.02.1c.03.17.06.34.08.51.04.4.07.8.1 1.21v.31c0 .21 0 .42-.01.63v.01c0 .03-.01.07-.01.1v-2.54c.6 0 1.46-.14 2.37-.48.75-.3 1.42-.74 1.92-1.23.65-.71 1.14-1.59 1.42-2.55.06-.15.12-.31.17-.47.01-.03 0-.06-.01-.09v-.01c.01-.23.03-.46.04-.69 0 0 .03-.01.05-.04.21-.02.41-.04.62-.05.21 0 .41.01.61.02 1.6.14 2.99-.26 3.98-1.19.9-.83 1.42-1.96 1.54-3.17.02-.1.03-.2.04-.3v-.08c.02-.25.02-.5 0-.75 0-.26-.02-.51-.06-.76-.01-.02-.03-.04-.05-.06h.02c.06-.03.12-.05.17-.09.59-.35 1.16-.81 1.69-1.36.28-.31.55-.64.8-1.01.54-.84 1.02-1.75 1.39-2.74.07-.19.13-.39.18-.59l.01-.02c.03-.09.07-.18.1-.27.02-.06.03-.12.05-.18.06-.36.11-.71.14-1.07.01-.14.02-.27.02-.41v-1.7c0-1.36-.02-2.49-.6-3.38-.69-1.04-1.86-1.5-2.98-1.5" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.625v20.75C0 23.4.6 24 1.625 24h11.34v-9.294H9.85v-3.574h3.115V8.414c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.466.099 2.796.143v3.24l-1.918.001c-1.503 0-1.795.715-1.795 1.764v2.312h3.587l-.467 3.576h-3.115V24H1.625C.6 24 0 23.4 0 22.375V1.625C0 .6.6 0 1.625 0H5.85v20.75H9.84v-9.294h3.125v-3.574h-3.125V8.414c.19-.94.81-1.79 1.67-2.34.86-.55 1.86-.63 2.82-.19 1.92.38 3.78 1.15 5.25 2.3.17.14.32.29.46.45l-.01-5.84c-.01-.01-.01-.02-.01-.02Z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h4 className="mb-4 font-display text-sm font-bold tracking-widest uppercase text-foreground">
                  Navigation
                </h4>
                <ul className="space-y-2 font-body">
                  {footerNav.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground-muted transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-display text-sm font-bold tracking-widest uppercase text-foreground">
                  Legal
                </h4>
                <ul className="space-y-2 font-body">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground-muted transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-display text-sm font-bold tracking-widest uppercase text-foreground">
                  JOIN THE IM UNIVERSE
                </h4>
                <p className="mb-4 text-sm text-foreground-muted">
                  Get exclusive access to early ticket sales, behind-the-scenes
                  content, and never miss a moment.
                </p>
                <form className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full border border-border bg-background-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder-foreground-muted/50 focus:outline-none focus:ring-1 focus:ring-accent-red"
                    aria-label="Email address"
                    required
                  />
                  <button
                    type="submit"
                    className="border border-accent-red px-4 py-2 font-body text-xs font-bold tracking-widest uppercase text-accent-red transition-colors hover:bg-accent-red hover:text-background"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-4 text-center font-body text-xs text-foreground-muted">
          <p>
            &copy; {new Date().getFullYear()} Indus Matworks. All rights
            reserved.
          </p>
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
      className="flex h-10 w-10 items-center justify-center text-foreground-muted transition-all duration-200 hover:text-accent-red"
    >
      {children}
    </a>
  );
}
