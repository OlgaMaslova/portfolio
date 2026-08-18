# Portfolio site

One URL for job applications, and the home of the `doc-understanding` findings
write-up. Full brief: [portfolio-spec.md](portfolio-spec.md).

## Stack

Next.js 16 (App Router) with `output: "export"` — every route is prerendered to
static HTML at build time and served from GitHub Pages. No server, no database,
no CMS. TypeScript, Tailwind v4, content in MDX.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server on http://localhost:3000 |
| `pnpm build` | Static export to `out/` |
| `pnpm preview` | Build, then serve `out/` as a plain static host would |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |

## Layout

```
src/
  app/
    layout.tsx      Shell: ink header, accent footer, fonts, boot script
    globals.css     Riso tokens, type scale, field/layout classes, motion
    page.tsx        /  hero, about, three project entries, timeline
    cv/page.tsx     /cv  download + inline view of the CV PDF, Person JSON-LD
  components/
    field.tsx           Full-bleed band; paper | ink | hot
    theme-toggle.tsx    Stateless light/dark switch
    reveal-controller.tsx  Drives every [data-reveal] element
  lib/site.ts       Name, URL, description, nav — one source of truth for
                    metadata, JSON-LD, sitemap and llms.txt. `asset()` adds
                    the deploy's base path to anything served from public/
  mdx-components.tsx  Global MDX element mapping
public/
  Olga_Maslova_CV_2026_ENG2.pdf   The CV. /cv links and embeds this file;
                    replace it and update the constant at the top of
                    src/app/cv/page.tsx
```

## Design system — "Riso"

Implements `design_spec.html`. Two chromatics only: `--ink` (ultramarine,
hue 262) and `--hot` (the accent). Paper and text share hue 92, so the neutrals
read warm against both. Dark mode keeps the hues and lifts lightness — it is
not a hue shift.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `oklch(0.955 0.028 92)` | `oklch(0.215 0.055 262)` |
| `--fg` | `oklch(0.26 0.09 262)` | `oklch(0.955 0.025 92)` |
| `--mut` | `oklch(0.46 0.07 262)` | `oklch(0.775 0.035 92)` |
| `--line` | `oklch(0.82 0.045 92)` | `oklch(0.36 0.055 262)` |
| `--ink` | `oklch(0.42 0.20 262)` | `oklch(0.55 0.19 262)` |
| `--hot` | `oklch(0.70 0.19 45)` | `oklch(0.75 0.18 45)` |

Every token is exposed to Tailwind through `@theme inline`, so `bg-ink`,
`text-mut` and friends compile to `var(--…)` and a theme switch repaints the
whole page in one step.

**Knobs.** `data-theme` (`light`/`dark`) and `data-accent`
(`tangerine` default, `magenta`, `lime`, `cyan`) on `<html>`. Both are replayed
before first paint by the boot script in the layout.

**Geometry.** No radii, no shadows. 1px hairline `--line` or 2–3px ink.
Sections are full-bleed; only the inner `.frame` is capped at 1560px.

**Type.** Archivo (statement/title/body) and IBM Plex Mono (every non-prose
string). Self-hosted at build time by `next/font`, so there is no request to
Google at runtime and no layout shift. Scale lives in the `.t-*` classes.

**Motion.** `data-reveal` elements fade and rise on intersection — 0.75s, 80ms
sibling stagger capped at 5, with a 4s failsafe. The hero rule wipes in once on
load. Hover is colour only. The hidden state is gated behind a `.reveal-ready`
class set by the boot script, so a JS failure leaves the page fully visible
rather than blank; `prefers-reduced-motion` disables all of it.

**Contrast.** Measured with WCAG 2.x on every on-colour pair. One known
failure: light-theme text on an accent field is `2.78:1` (tangerine), below AA
even at display sizes. `--onhot` in `globals.css` carries the accessible
alternative as a commented one-liner. Everything else passes AA.

`site.nav` entries carry a `live` flag. A planned route stays out of the nav
until its page exists, so the deployed site never links to a 404.

## Deploying

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
typechecks, lints, builds, and publishes `out/` to GitHub Pages.

This project site publishes at **https://olgamaslova.github.io/portfolio/**.
The deployment workflow supplies its `/portfolio` base path and canonical URL.
One-time setup: repo Settings → Pages → Source → **GitHub Actions**.

The canonical origin is `site.url` in [`src/lib/site.ts`](src/lib/site.ts) —
OpenGraph tags, JSON-LD and the sitemap all derive from it. Override it with
`NEXT_PUBLIC_SITE_URL` at build time if a custom domain lands.
