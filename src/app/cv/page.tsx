import { statSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { absoluteUrl, asset, site } from "@/lib/site";

/** The file lives in `public/` and is served as-is. Replace it, keep the name. */
const PDF = "Olga_Maslova_CV_2026_ENG2.pdf";
const DOWNLOAD_AS = "Olga-Maslova-CV.pdf";

const description = `${site.name}'s CV — full experience, skills and education, as a PDF.`;

export const metadata: Metadata = {
  title: "CV",
  description,
  alternates: { canonical: "/cv/" },
  openGraph: {
    type: "profile",
    title: `CV — ${site.name}`,
    description,
    url: absoluteUrl("/cv/"),
  },
};

/**
 * Read at build time — a static export runs this on Node, never in the
 * browser. Missing file means no size label rather than a failed build.
 */
function pdfSize(): string | null {
  try {
    const { size } = statSync(join(process.cwd(), "public", PDF));
    return `${Math.round(size / 1024)} KB`;
  } catch {
    return null;
  }
}

export default function CV() {
  const href = asset(`/${PDF}`);
  const size = pdfSize();

  // Person, per the spec's discoverability layer. Same contact set the footer
  // publishes; the phone number stays inside the PDF.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    jobTitle: "Co-founder / CTO",
    email: site.email,
    sameAs: [site.github, site.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero — the download is the page. */}
      <section className="field-paper pb-[var(--space-field)] pt-[var(--space-hero)]">
        <div className="frame">
          <h1 className="t-statement" data-reveal>
            <span className="text-hot">CV</span>
          </h1>
          <p className="t-lead mt-8" data-reveal>
            Ten years of production software and ML, most recently as CTO of an
            AI agent startup. The whole thing is one PDF.
          </p>
          <ul className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
            <li>
              <a className="btn-ghost inline-block" href={href} download={DOWNLOAD_AS}>
                Download PDF{size ? ` · ${size}` : ""}
              </a>
            </li>
            <li>
              <a
                className="btn-ghost inline-block"
                href={site.linkedin}
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="btn-ghost inline-block"
                href={site.github}
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-[var(--space-entry)] hero-rule" />
      </section>

      {/* The file itself, inline. Hidden below ~640px, where mobile browsers
          render an embedded PDF as a blank box — the download link above is
          the whole interface there. */}
      <section className="field-paper hidden pb-[var(--space-field)] sm:block">
        <div className="frame">
          <h2 className="sr-only">CV document</h2>
          <object
            data={href}
            type="application/pdf"
            className="block h-[min(80vh,1100px)] w-full border border-line"
            aria-label={`${site.name} CV`}
          >
            <p className="t-body">
              Your browser will not display the PDF inline.{" "}
              <a className="text-ink underline" href={href} download={DOWNLOAD_AS}>
                Download it instead
              </a>
              .
            </p>
          </object>
        </div>
      </section>
    </>
  );
}
