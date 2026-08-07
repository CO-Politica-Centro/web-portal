import { site } from "@/content/site";

export function HomeUpdates() {
  return (
    <section
      aria-labelledby="updates-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page">
        <p className="eyebrow">Actualidad</p>
        <h2 id="updates-heading" className="section-title mt-4 max-w-2xl">
          Sigue la conversación donde ya estamos
        </h2>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Todavía no publicamos un blog propio. Mientras tanto, la actualidad
          del movimiento vive en los canales oficiales.
        </p>

        <ul className="divide-foreground/10 border-foreground/10 mt-10 divide-y border-y">
          {site.updates.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-foreground/5 flex min-h-14 flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="font-display text-xl font-semibold">
                  {item.title}
                </span>
                <span className="text-muted text-sm font-semibold tracking-wide uppercase">
                  {item.source}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
