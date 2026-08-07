import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-28">
        <div className="space-y-6">
          <p className="text-brand-green text-sm font-semibold tracking-[0.18em] uppercase">
            Movimiento político · Colombia
          </p>
          <h1 className="text-foreground max-w-xl text-5xl leading-[1.05] font-semibold sm:text-6xl">
            Portal del centro
          </h1>
          <p className="text-muted max-w-lg text-lg leading-relaxed">
            Espacio oficial en construcción del movimiento de centro y
            liberalismo social liderado por Rafael Solano. Plantilla lista para
            contenido, propuestas y convocatoria.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/propuestas"
              className="bg-foreground text-background hover:bg-brand-green rounded-md px-5 py-2.5 text-sm font-semibold transition"
            >
              Ver propuestas
            </Link>
            <Link
              href="/contacto"
              className="border-foreground/20 bg-surface text-foreground hover:border-accent rounded-md border px-5 py-2.5 text-sm font-semibold transition"
            >
              Contacto
            </Link>
          </div>
        </div>
        <aside className="border-foreground/10 bg-surface rounded-2xl border p-6 shadow-[0_20px_60px_-40px_rgba(26,31,22,0.45)]">
          <p className="text-muted text-sm">Liderazgo</p>
          <p className="mt-2 text-2xl font-semibold">Rafael Solano</p>
          <p className="text-muted mt-1 text-sm">Bumangués en Bogotá D.C.</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a
                className="text-brand-green underline-offset-4 hover:underline"
                href="https://www.instagram.com/rafaelsolanov/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="text-brand-green underline-offset-4 hover:underline"
                href="https://www.youtube.com/rafaelsolanov"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
