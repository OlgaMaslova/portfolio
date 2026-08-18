import { Field } from "@/components/field";

/**
 * Entries carry their own copy. Fill follows the design spec: accent for 01,
 * ink for 02, 2px ink outline from 03 on. `stat` is the spec's optional
 * left-column numeral — no entry uses it yet.
 */

type Entry = {
  n: string;
  fill: "hot" | "ink" | "outline";
  title: string;
  stat?: { value: string; label: string };
  body: string;
  cont: string;
  stack: string;
  links?: { href: string; label: string }[];
};

const ENTRIES: Entry[] = [
  {
    n: "01",
    fill: "hot",
    title: "Document understanding, measured",
    body: "Everyone has an opinion about RAG versus long context. This one you can run: six extraction strategies answer the same question about the same document, side by side, with cost, latency and a graded answer for every cell.",
    cont: "Approach and model are two separate decisions, and people collapse them into one. Which strategy you pick decides whether a cheaper model is a saving or a downgrade. And prompt caching is a cost transform, not a retrieval strategy — it changes what an approach costs, not what it can find. Every run is reproducible, priced from published rates.",
    stack: "Next.js · Python · LLM · RAG · Context extraction · Caching",
    links: [
      { href: "https://olgamaslova.github.io/doc-understanding/", label: "Live demo" },
      { href: "https://github.com/OlgaMaslova/doc-understanding", label: "Source" },
    ],
  },
  {
    n: "02",
    fill: "ink",
    title: "Detour, a recommendation network",
    body: "Finding somewhere to eat means wading through anonymous stars, paid placement and reviews written by strangers. Detour drops the average entirely: every place on it is one a member put their name behind and said why, in their own words. No ads, no paid listings, no editors, no catalogue.",
    cont: "A recommendation is worth what the person making it is worth, so the product keeps that person visible. Invitations are what put somebody inside your circle, which means taste travels along lines people already trust rather than pooling into a score. Members publish straight to their circle — and anyone can browse the cities, the map and the feed before joining one.",
    stack: "TypeScript · Vite · PocketBase · Automatic data augmentation ",
    links: [
      { href: "https://takedetour.app", label: "Live app" },
      { href: "https://github.com/OlgaMaslova/detour", label: "Source" },
    ],
  },
  {
    n: "03",
    fill: "outline",
    title: "Talked Down, a daily negotiation game",
    body: "Talking to an AI character usually has no stakes, because the model has nothing to lose and folds the moment you push. Talked Down gives it something to defend: a secret floor price, a patience budget, and a private list of the arguments that actually move it. One ranked play per day, a score out of 100, and a percentile against everyone else who got the same scenario.",
    cont: "The engineering is in making the character unable to cheat. Every turn runs decide → validate → speak: the model proposes a move, the server clamps it against the secret spec, and a second call writes the reply once the number is already settled — so the words and the price can never contradict each other. The scenarios write themselves too. A nightly pipeline generates candidates, rejects domains that repeat recent days, runs a prompt-injection battery against the actor, and publishes only what survives.",
    stack: "TypeScript · Vite · PocketBase · LLM · Adversarial testing",
    links: [
      { href: "https://talkeddown-app.supernaut.to", label: "Play it" },
      { href: "https://github.com/OlgaMaslova/talked-down", label: "Source" },
    ],
  },
];

/**
 * Newest first, so the eye lands on the current role. The interim research
 * posts live on the CV; this keeps the four companies and where it started.
 */
const TIMELINE = [
  {
    years: "2025–2026",
    role: "Co-founder / CTO",
    org: "Supernaut AI",
    current: true,
  },
  {
    years: "2023–2025",
    role: "Senior Full-Stack Engineer",
    org: "Thesify",
    current: false,
  },
  {
    years: "2020–2023",
    role: "Tech Lead",
    org: "Smarter Data Labs",
    current: false,
  },
  {
    years: "2017–2020",
    role: "Data Scientist / SWE",
    org: "AboutGoods",
    current: false,
  },
  {
    years: "2009–2013",
    role: "PhD in Physics",
    org: "Université Paris-Sud",
    current: false,
  },
] as const;

function TitleBlock({ n, fill, title }: Pick<Entry, "n" | "fill" | "title">) {
  const skin =
    fill === "hot"
      ? "bg-hot text-onhot"
      : fill === "ink"
        ? "bg-ink text-onink"
        : "border-2 border-ink text-fg";

  return (
    <div className={`${skin} p-6`}>
      <p className="t-meta opacity-70">Project {n}</p>
      <h3 className="t-project-title mt-3">{title}</h3>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero — paper, statement at 23ch, then the accent rule. */}
      <section className="field-paper pb-[var(--space-field)] pt-[var(--space-hero)]">
        <div className="frame">
          <h1 className="t-statement" data-reveal>
            Building AI systems. From a <span className="text-hot">problem</span> to production.
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
          Ten years of production software, as a tech lead and co-founder. Physics PhD before that.
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
                <TitleBlock n={entry.n} fill={entry.fill} title={entry.title} />
                {entry.stat && (
                  <div>
                    <p className="t-numeral">{entry.stat.value}</p>
                    <p className="t-meta text-mut mt-1">{entry.stat.label}</p>
                  </div>
                )}
              </div>
              <div data-reveal>
                <p className="t-body">{entry.body}</p>
                <p className="t-body-cont mt-5">{entry.cont}</p>
                {entry.links && (
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {entry.links.map((link) => (
                      <li key={link.href}>
                        <a
                          className="btn-ghost inline-block"
                          href={link.href}
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="t-meta text-ink mt-8">{entry.stack}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ink field 3 of 3 — the timeline. Budget spent. */}
      <Field tone="ink">
        <p className="t-eyebrow t-on-mut" data-reveal>
          Timeline
        </p>
        <ol className="mt-10 grid gap-x-8 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {TIMELINE.map((item) => (
            <li
              key={item.org}
              className="border-t-2 pt-4"
              style={{
                borderTopColor: item.current
                  ? "var(--hot)"
                  : "color-mix(in oklab, currentColor 55%, transparent)",
              }}
              data-reveal
            >
              <p className={`t-numeral ${item.current ? "text-hot" : ""}`}>
                {item.years}
              </p>
              <p className="t-meta mt-3">{item.org}</p>
              <p className="t-meta t-on-mut mt-1">{item.role}</p>
            </li>
          ))}
        </ol>
      </Field>
    </>
  );
}
