import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { RevealController } from "@/components/reveal-controller";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { mailto, site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font — no request to Google at runtime,
// so the webfonts cost nothing in third-party connections and never shift layout.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    locale: "en_GB",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

/**
 * Runs before first paint: replays the stored theme and accent so the toggle
 * never flashes, and arms `.reveal-ready`. Reveal styles are gated on that
 * class, which means a JS failure leaves the page fully visible rather than
 * blank.
 */
const BOOT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t;var a=localStorage.getItem("accent");if(a)d.dataset.accent=a}catch(e){}d.classList.add("reveal-ready")})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      // BOOT mutates this element before React hydrates — the theme/accent
      // datasets and the `reveal-ready` class. Without this, React reports a
      // mismatch on <html> and discards the boot script's work.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-hot focus:px-3 focus:py-2 focus:text-onhot"
        >
          Skip to content
        </a>

        {/* Ink field 1 of 3. */}
        <header className="field-ink sticky top-0 z-40 py-[14px]">
          <div className="frame flex flex-wrap items-center justify-between gap-4">
            <SiteNav />
            <ThemeToggle />
          </div>
        </header>

        <main id="main">{children}</main>

        {/* Full accent field. */}
        <footer className="field-hot field">
          <div className="frame">
            <p className="t-meta t-on-mut">Elsewhere</p>
            <ul className="mt-6 flex flex-col gap-1">
              <li>
                <a href={site.github} className="t-project-title block">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} className="t-project-title block">
                  LinkedIn
                </a>
              </li>
            </ul>
            <div className="mt-12 border-t border-current/55 pt-5">
              <p className="t-meta t-on-mut">
                <a href={mailto}>{site.name}</a> · AI helped
              </p>
            </div>
          </div>
        </footer>

        <RevealController />
      </body>
    </html>
  );
}
