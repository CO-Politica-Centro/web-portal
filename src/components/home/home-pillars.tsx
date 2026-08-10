import Link from "next/link";
import { site } from "@/content/site";

export function HomePillars() {
  return (
    <section
      id="propuestas"
      aria-labelledby="pillars-heading"
      className="section-space border-foreground/10 scroll-mt-28 border-t"
    >
      <div className="container-page">
        <div data-reveal-head>
          <p className="eyebrow">Programa</p>
          <h2 id="pillars-heading" className="section-title mt-4 max-w-2xl">
            Cuatro pilares para orientar el debate
          </h2>
          <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
            Ejes claros, al estilo de un portal temático moderno: para leer,
            discutir y profundizar sin ruido.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {site.pillars.map((pillar, index) => (
            <li
              key={pillar.slug}
              data-reveal-item
              id={`pilar-${pillar.slug}`}
              className="border-foreground/10 bg-surface scroll-mt-28 rounded-2xl border p-6"
            >
              <p className="text-muted text-sm font-semibold tracking-wide">
                0{index + 1}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold">
                {pillar.title}
              </h3>
              <p className="text-muted mt-3 leading-relaxed">
                {pillar.summary}
              </p>
              <Link
                href={`/propuestas#${pillar.slug}`}
                className="text-brand-green mt-5 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
              >
                Ver en propuestas
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
