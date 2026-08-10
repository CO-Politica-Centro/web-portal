import Link from "next/link";
import { site } from "@/content/site";

export function HomeClosing() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Participa</p>
        <h2 id="closing-heading" className="section-title mt-4">
          Conversemos y construyamos centro
        </h2>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          Si quieres prensa, alianzas o sumarte a las comunidades, escribe o
          únete a Discord. Este movimiento se construye en público.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contacto" className="btn-primary">
            Ir a contacto
          </Link>
          <a
            href={site.urls.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Unirse a Discord
          </a>
        </div>
      </div>
    </section>
  );
}
