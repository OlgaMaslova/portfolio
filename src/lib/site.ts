/**
 * Single source of truth for anything that appears in metadata, JSON-LD,
 * the sitemap and llms.txt. Change it here, not in a page.
 */
export const site = {
  name: "Olga Maslova",
  role: "Software engineer",
  // Canonical origin. Override with NEXT_PUBLIC_SITE_URL when a custom domain lands.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://olgamaslova.github.io").replace(/\/$/, ""),
  description:
    "Software engineer building AI systems that hold up in production — retrieval, agents, and the evaluation harnesses that keep them honest.",
  github: "https://github.com/OlgaMaslova",
  linkedin: "https://www.linkedin.com/in/olgamaslova23/",
  // `live: false` keeps a planned route out of the nav until its page exists,
  // so nothing on the deployed site ever links to a 404.
  nav: [
    { href: "/work/", label: "Work", live: false },
    { href: "/writing/rag-vs-long-context/", label: "Writing", live: false },
    { href: "/cv/", label: "CV", live: false },
  ],
} as const;

export const liveNav = site.nav.filter((item) => item.live);

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
