import Link from "next/link";
import { site } from "@/content/site";

export function HomeTransparency() {
  const { transparency } = site;
  const preview = transparency.categories.slice(0, 4);

  return (
    <section
      aria-labelledby="transparency-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page">
        <div data-reveal-head className="max-w-2xl">
          <p className="eyebrow">{transparency.eyebrow}</p>
          <h2 id="transparency-heading" className="section-title mt-4">
            {transparency.title}
          </h2>
          <p className="text-muted mt-4 text-lg leading-relaxed">
            Publicamos lo disponible y marcamos con claridad lo que aún se
            consolida. Sin inventar documentos de un partido que todavía no
            somos.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {preview.map((category) => (
            <li key={category.id} data-reveal-item>
              <Link
                href="/transparencia"
                className="border-foreground/10 bg-surface hover:border-brand-green/35 group flex h-full min-h-28 flex-col justify-between rounded-xl border px-5 py-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-brand-green font-display text-sm font-semibold tabular-nums">
                    {category.code}
                  </span>
                  <span className="leading-snug font-semibold group-hover:underline group-hover:underline-offset-4">
                    {category.title}
                  </span>
                </div>
                <p className="text-muted mt-3 line-clamp-2 text-sm leading-relaxed">
                  {category.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div data-reveal-item className="mt-8">
          <Link href="/transparencia" className="btn-primary sm:w-auto">
            Abrir transparencia activa
          </Link>
        </div>
      </div>
    </section>
  );
}
