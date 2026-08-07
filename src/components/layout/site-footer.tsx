import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-foreground/10 bg-surface/60 border-t">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="text-muted max-w-md text-sm leading-relaxed">
            {site.description}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Contacto</p>
          <a
            className="text-muted hover:text-foreground block min-h-11 underline-offset-4 hover:underline"
            href={`mailto:${site.urls.email}`}
          >
            {site.urls.email}
          </a>
          <a
            className="text-brand-green block min-h-11 font-medium underline-offset-4 hover:underline"
            href={site.urls.beacons}
            target="_blank"
            rel="noopener noreferrer"
          >
            Comunidades en Beacons
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Redes</p>
          <ul className="text-muted space-y-1">
            {site.leadership.links.map((item) => (
              <li key={item.href}>
                <a
                  className="hover:text-foreground inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
