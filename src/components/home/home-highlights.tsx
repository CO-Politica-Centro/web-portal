import Link from "next/link";
import { site } from "@/content/site";

export function HomeHighlights() {
  return (
    <section
      aria-labelledby="highlights-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Destacados</p>
            <h2 id="highlights-heading" className="section-title mt-4">
              Por dónde empezar
            </h2>
          </div>
          <Link href="/propuestas" className="btn-primary w-full md:w-auto">
            Ver programa completo
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {site.highlights.map((item) => (
            <li key={item.title} className="border-foreground/10 border-t pt-5">
              <h3 className="font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-muted mt-3 leading-relaxed">{item.text}</p>
              {"external" in item && item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green mt-4 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                >
                  Abrir enlace
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-brand-green mt-4 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                >
                  Ir ahora
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
