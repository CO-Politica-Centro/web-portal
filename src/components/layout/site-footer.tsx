import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { ExternalLink } from "@/components/layout/external-link";
import { site } from "@/content/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-foreground/10 bg-surface border-t">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8 lg:gap-12">
        <div className="space-y-4 md:max-w-sm">
          <BrandMark name={site.name} size={40} />
          <p className="text-muted text-base leading-relaxed">
            {site.description}
          </p>
        </div>

        <nav aria-label="Pie de página" className="space-y-4">
          <p className="font-display text-lg font-semibold">Navegación</p>
          <ul className="space-y-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <ExternalLink
                    className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </ExternalLink>
                ) : (
                  <Link
                    className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <p className="font-display text-lg font-semibold">Contacto</p>
          <ul className="space-y-1">
            <li>
              <a
                className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                href={`mailto:${site.urls.email}`}
              >
                {site.urls.email}
              </a>
            </li>
            <li>
              <ExternalLink
                className="text-brand-green inline-flex min-h-11 items-center text-base font-medium underline-offset-4 hover:underline"
                href={site.urls.beacons}
              >
                Comunidades en Beacons
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="font-display text-lg font-semibold">Redes</p>
          <ul className="space-y-1">
            {site.leadership.links.map((item) => (
              <li key={item.href}>
                <ExternalLink
                  className="text-muted hover:text-foreground inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                  href={item.href}
                >
                  {item.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-foreground/10 border-t">
        <div className="container-page flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <p className="text-muted max-w-2xl text-base leading-relaxed">
            {site.disclaimer}
          </p>
          <p className="text-muted shrink-0 text-base">
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
