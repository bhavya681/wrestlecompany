import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { PromoPopup } from "@/components/layout/PromoPopup";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C1272D" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wrestlecompany.vercel.app"),
  title: {
    default: "Indus Matworks | Wrestling From India. Built For The World.",
    template: "%s | Indus Matworks",
  },
  description:
    "Indus Matworks is India's professional wrestling promotion — live events, championships, roster, news, and media.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Indus Matworks",
    title: "Indus Matworks",
    description:
      "Wrestling From India. Built For The World. The official home of Indus Matworks.",
    images: [{ url: "/logo.png", width: 1320, height: 660, alt: "Indus Matworks" }],
  },
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('im-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='dark'||s==='light'?s:(d?'dark':'light');var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.dataset.theme=t;r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${oswald.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh w-full bg-[var(--im-page)] text-[var(--im-ink)] antialiased dark:bg-[#080808]">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#C1272D] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
          >
            Skip to content
          </a>
          <ScrollReveal />
          <Navbar />
          <main id="main-content" className="min-h-[calc(100dvh-64px)] w-full bg-[var(--im-page)] dark:bg-[#080808]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <PromoPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
