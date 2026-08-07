import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Liderazgo de CO Politica Centro: Rafael Solano y un equipo en consolidación.",
};

export default function EquipoPage() {
  const { leadership } = site;

  return (
    <div className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow">Equipo</p>
          <h1 className="section-title mt-4">{leadership.name}</h1>
          <p className="text-brand-green mt-3 text-lg font-semibold">
            {leadership.role}
          </p>
          <p className="text-muted mt-1">{leadership.location}</p>
        </div>

        <div className="space-y-6">
          <p className="text-muted max-w-prose text-lg leading-relaxed">
            {leadership.bio}
          </p>
          <aside
            className="border-accent/40 bg-surface max-w-prose rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed"
            role="note"
          >
            <p className="font-semibold">Equipo en consolidación</p>
            <p className="text-muted mt-1">
              Más perfiles del núcleo organizativo se publicarán cuando la
              estructura esté lista. Mientras tanto, el liderazgo público y las
              comunidades son el punto de contacto.
            </p>
          </aside>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {leadership.links.map((link) => (
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
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Link href="/contacto" className="btn-primary">
              Contacto
            </Link>
            <a
              href={site.urls.beacons}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Comunidades
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
