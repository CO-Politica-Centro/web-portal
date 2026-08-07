import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Propuestas",
  description:
    "Programa por pilares del movimiento CO Politica Centro: economía, seguridad, educación y democracia.",
};

export default function PropuestasPage() {
  return (
    <div className="section-space">
      <div className="container-page">
        <p className="eyebrow">Programa</p>
        <h1 className="section-title mt-4 max-w-3xl">Propuestas</h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Cuatro ejes para orientar el debate público. Este es un marco
          provisional del movimiento en consolidación: ideas para discutir,
          mejorar y convertir en programa.
        </p>

        <nav aria-label="Índice de pilares" className="mt-10">
          <ul className="flex flex-wrap gap-3">
            {site.pillars.map((pillar) => (
              <li key={pillar.slug}>
                <a href={`#${pillar.slug}`} className="btn-secondary text-sm">
                  {pillar.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 space-y-16">
          {site.pillars.map((pillar, index) => (
            <article
              key={pillar.slug}
              id={pillar.slug}
              className="border-foreground/10 scroll-mt-28 border-t pt-10"
            >
              <p className="text-muted text-sm font-semibold tracking-wide">
                Pilar 0{index + 1}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold">
                {pillar.title}
              </h2>
              <p className="text-muted mt-4 max-w-prose text-lg leading-relaxed">
                {pillar.body}
              </p>
              <ul className="mt-6 space-y-2">
                {pillar.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/90 flex gap-3 text-base leading-relaxed"
                  >
                    <span className="text-brand-green" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row">
          <Link href="/contacto" className="btn-primary">
            Hablar con el movimiento
          </Link>
          <Link href="/" className="btn-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
