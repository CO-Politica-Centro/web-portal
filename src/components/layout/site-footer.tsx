import Link from "next/link";
import { BrandMark } from "@/components/layout/brand-mark";
import { ExternalLink } from "@/components/layout/external-link";
import { LinkUnderline } from "@/components/layout/link-underline";
import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

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
                    className="group text-muted hover:text-foreground inline-flex min-h-11 items-center gap-1 text-base"
                    href={item.href}
                  >
                    <LinkUnderline from="start">{item.label}</LinkUnderline>
                    <span aria-hidden="true" className="text-xs opacity-70">
                      ↗
                    </span>
                  </ExternalLink>
                ) : (
                  <Link
                    className="group text-muted hover:text-foreground inline-flex min-h-11 items-center text-base"
                    href={item.href}
                  >
                    <LinkUnderline from="start">{item.label}</LinkUnderline>
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
                className="group text-muted hover:text-foreground inline-flex min-h-11 items-center text-base"
                href={`mailto:${site.urls.email}`}
              >
                <LinkUnderline from="start">{site.urls.email}</LinkUnderline>
              </a>
            </li>
            <li>
              <ExternalLink
                className="group text-brand-green inline-flex min-h-11 items-center text-base font-medium"
                href={site.urls.beacons}
              >
                <LinkUnderline from="start">
                  Comunidades en Beacons
                </LinkUnderline>
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
                  className="group text-muted hover:text-foreground inline-flex min-h-11 items-center text-base"
                  href={item.href}
                >
                  <LinkUnderline from="start">{item.label}</LinkUnderline>
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
