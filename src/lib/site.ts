/**
 * Single source of truth for anything that appears in metadata, JSON-LD,
 * the sitemap and llms.txt. Change it here, not in a page.
 */
export const site = {
  name: "Olga Maslova",
  // Canonical origin. Override with NEXT_PUBLIC_SITE_URL when a custom domain lands.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://olgamaslova.github.io").replace(/\/$/, ""),
  description:
    "I build AI systems that run in production. Physics PhD at first, ten years of shipping since.",
  github: "https://github.com/OlgaMaslova",
  linkedin: "https://www.linkedin.com/in/olgamaslova23/",
  // Published in plain text in the header and footer markup, so it is
  // scrapeable. Swap for a forwarding alias here and both links follow.
  email: "olga.maslova.pro@gmail.com",
  // `live: false` keeps a planned route out of the nav until its page exists,
  // so nothing on the deployed site ever links to a 404.
  nav: [
    { href: "/work/", label: "Work", live: false },
    { href: "/writing/rag-vs-long-context/", label: "Writing", live: false },
    { href: "/cv/", label: "CV", live: true },
  ],
} as const;

export const liveNav = site.nav.filter((item) => item.live);

export const mailto = `mailto:${site.email}`;

/**
 * Prefixes a file served from `public/` with the deploy's base path. Next
 * rewrites <Link> hrefs, but never a plain <a> or an asset URL, so anything
 * pointing at `public/` has to go through here or it 404s under /portfolio.
 */
export function asset(path: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
