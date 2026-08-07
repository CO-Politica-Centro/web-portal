import { site } from "@/content/site";

export function HomeCommunities() {
  return (
    <section
      aria-labelledby="communities-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">Comunidades</p>
          <h2 id="communities-heading" className="section-title mt-4 max-w-2xl">
            Todas las comunidades en un solo lugar
          </h2>
          <p className="text-muted mt-4 max-w-prose text-lg leading-relaxed">
            WhatsApp, redes, grupos y puntos de encuentro del movimiento están
            organizados en Beacons. Es el directorio oficial para sumarte sin
            perderte.
          </p>
        </div>
        <a
          href={site.urls.beacons}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center lg:w-auto"
        >
          Abrir beacons.ai/centropd
        </a>
      </div>
    </section>
  );
}
