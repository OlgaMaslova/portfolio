import { Field } from "@/components/field";

/**
 * Design skeleton. Every string here is a placeholder marker — real copy lands
 * with the content pass. The point is that each slot in the design spec has a
 * home and the token system drives all of it.
 */

const ENTRIES = [
  { n: "01", fill: "hot" },
  { n: "02", fill: "ink" },
  { n: "03", fill: "outline" },
  { n: "04", fill: "outline" },
] as const;

const TIMELINE = [
  { year: "2021", current: false },
  { year: "2023", current: false },
  { year: "2024", current: false },
  { year: "2026", current: true },
] as const;

function TitleBlock({ n, fill }: { n: string; fill: "hot" | "ink" | "outline" }) {
  const skin =
    fill === "hot"
      ? "bg-hot text-onhot"
      : fill === "ink"
        ? "bg-ink text-onink"
        : "border-2 border-ink text-fg";

  return (
    <div className={`${skin} p-6`}>
      <p className="t-meta opacity-70">Project {n}</p>
      <h3 className="t-project-title mt-3">Title</h3>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero — paper, mono eyebrow, statement at 23ch, then the accent rule. */}
      <section className="field-paper pb-[var(--space-field)] pt-[var(--space-hero)]">
        <div className="frame">
          <p className="t-eyebrow text-mut" data-reveal>
            Founding engineer — AI systems
          </p>
          <h1 className="t-statement mt-6" data-reveal>
            I build AI systems that run in <span className="text-hot">production.</span> Always curious.
          </h1>
        </div>
        <div className="mt-[var(--space-entry)] hero-rule" />
      </section>

      {/* Ink field 2 of 3 — the about block. */}
      <Field tone="ink">
        <p className="t-eyebrow t-on-mut" data-reveal>
          About
        </p>
        <p className="t-lead mt-8" data-reveal>
          I take products from messy problem to reliable production system — end to end. I work across product, architecture, full-stack engineering, DevOps, and ML, using AI throughout the development process while keeping ownership and judgment to myself.
          Ten years of production software, as a tech lead and co-founder. Physics PhD first—because, why not?
        </p>
      </Field>

      {/* Project entries — paper, hairline between, nothing heavier. */}
      <section className="field-paper">
        <div className="frame">
          {ENTRIES.map((entry, i) => (
            <div
              key={entry.n}
              className={`cols py-[var(--space-entry)] ${i > 0 ? "rule-hair" : ""}`}
            >
              <div className="flex flex-col gap-6" data-reveal>
                <TitleBlock n={entry.n} fill={entry.fill} />
                <div>
                  <p className="t-numeral">0000</p>
                  <p className="t-meta text-mut mt-1">Stat label</p>
                </div>
              </div>
              <div data-reveal>
                <p className="t-body">
                  Body, first paragraph of an entry. Full foreground colour,
                  capped at 52 characters per line.
                </p>
                <p className="t-body-cont mt-5">
                  Continuation paragraph, muted, same measure. Everything that
                  is not prose is set in mono.
                </p>
                <p className="t-meta text-ink mt-8">Stack · placeholder</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ink field 3 of 3 — the timeline. Budget spent. */}
      <Field tone="ink">
        <p className="t-eyebrow t-on-mut" data-reveal>
          Timeline · placeholder
        </p>
        <ol className="mt-10 grid gap-x-8 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
          {TIMELINE.map((item) => (
            <li
              key={item.year}
              className="border-t-2 pt-4"
              style={{
                borderTopColor: item.current
                  ? "var(--hot)"
                  : "color-mix(in oklab, currentColor 55%, transparent)",
              }}
              data-reveal
            >
              <p className={`t-numeral ${item.current ? "text-hot" : ""}`}>
                {item.year}
              </p>
              <p className="t-meta t-on-mut mt-2">Caption placeholder</p>
            </li>
          ))}
        </ol>
      </Field>
    </>
  );
}
