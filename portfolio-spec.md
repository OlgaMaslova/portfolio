# Portfolio site — v1 spec

## Purpose

One URL to paste into the "GitHub / personal website" field of a job application,
and a home for the `doc-understanding` findings write-up.

**Reader:** a hiring manager or founder, giving it 90 seconds before deciding whether
I'm technically serious. Not a design portfolio. Not a blog.

**Success:** they leave knowing what I build, having seen one piece of real technical
reasoning, with a link to code they can run.

## Stack

- **Next.js (App Router), static export** — deliberate choice: React/Next.js is the
  recurring gap in the roles I'm targeting, so the site itself closes it with something
  shipped
- TypeScript, Tailwind
- Content in MDX files. No CMS, no database
- Deploy to **GitHub Pages** — `olgamaslova.github.io` from a repo of the same name,
  built and published by GitHub Actions. Chosen over Cloudflare Pages for being one
  fewer account in the loop; custom domain later if ever

## Pages (v1 — nothing more)

| Route | Content |
|---|---|
| `/` | Who I am, what I build, links out. One screen, no hero carousel |
| `/writing/rag-vs-long-context` | The `doc-understanding` findings write-up. **The centrepiece** |
| `/work` | Four short case studies: Supernaut, Thesify, Smarter Data Labs, AboutGoods |
| `/cv` | CV as an HTML page (PDF download alongside) |

## Content status

**Already written** — home intro, all four case-study paragraphs, both role
descriptions. Paste from existing drafts.

**To write** — the findings write-up. Two claims with measurements behind them:
where the RAG / long-context crossover actually sits, and why prompt caching is a cost
transform rather than a retrieval strategy. Chart + link to the live demo and repo.

**Hard constraint:** nothing from Supernaut's internal documentation goes on this site.
Case studies describe what I built and owned, at CV level of detail. No architecture
docs, no internal READMEs, no code.

## Design direction

Typography-first, near-monochrome, fast. Content width ~65ch. One accent colour.
System font stack or one well-chosen face. No animation beyond hover states.

## Discoverability layer

Because I can speak to this from the retrieval side, do it properly:

- Semantic HTML, one `h1`, real heading hierarchy
- Per-page metadata + OpenGraph, `sitemap.xml`, `robots.txt`
- JSON-LD: `Person` on `/cv`, `Article` on the write-up
- `llms.txt` at root — plain-text summary of the site
- Every section self-contained and answering its own heading; no critical fact living
  only inside an image or the PDF
- Lighthouse 100s across the board

## Non-goals

No blog engine · no dark-mode toggle · no CMS · no logo · no contact form · no
analytics beyond something trivial · no project gallery · no testimonials.

## Parked for later

Second essay on running agent-written code in production (constraints, authorship,
review — evidenced by `detour`). Custom domain. Extracted eval-harness repo.

## Build order

1. Scaffold, deploy an empty page to Cloudflare Pages — get the URL existing first
2. `/` and `/cv`
3. `/work`
4. The write-up
5. Discoverability layer, then Lighthouse pass
