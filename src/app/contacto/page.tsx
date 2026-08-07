import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto de prensa y participación de CO Politica Centro: email, Beacons y redes.",
};

export default function ContactoPage() {
  return (
    <div className="section-space">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Contacto</p>
        <h1 className="section-title mt-4">Hablemos</h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          Para publicidad, prensa o alianzas escribe al correo oficial. Para
          sumarte a comunidades y canales del movimiento, usa Beacons.
        </p>

        <dl className="mt-12 space-y-8">
          <div>
            <dt className="font-semibold">Publicidad y prensa</dt>
            <dd className="mt-2">
              <a
                className="text-brand-green inline-flex min-h-11 items-center text-lg font-semibold underline-offset-4 hover:underline"
                href={`mailto:${site.urls.email}`}
              >
                {site.urls.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Comunidades</dt>
            <dd className="text-muted mt-2 leading-relaxed">
              Directorio oficial de grupos y redes:
            </dd>
            <dd className="mt-2">
              <a
                className="btn-primary"
                href={site.urls.beacons}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Beacons
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Redes de Rafael Solano</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {site.leadership.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-green inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <p className="text-muted mt-12 text-sm leading-relaxed" role="note">
          {site.disclaimer}
        </p>

        <Link
          href="/"
          className="text-foreground mt-8 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
