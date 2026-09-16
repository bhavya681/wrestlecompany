import "./globals.css";
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ReactNode } from "react";

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

export const metadata: Metadata = {
  title: {
    default: "Indus Matworks | India's Professional Wrestling Promotion",
    template: "%s | Indus Matworks",
  },
  description:
    "Indus Matworks. India's professional wrestling promotion built for the world. Live events, real athletes, real rivalries, real championships.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Indus Matworks",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <div className="relative isolate">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only absolute top-4 left-1/2 -translate-x-1/2 z-50 rounded-sm bg-accent-red px-4 py-2 text-xs font-bold text-background focus:outline-none"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="pb-24">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
