import type { Metadata } from "next";
import Link from "next/link";
import { LeadershipDualPortrait } from "@/components/home/leadership-dual-portrait";
import { PageIntro } from "@/components/motion/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";

const title = "Equipo";
const description =
  "Liderazgo de CO Politica Centro: Rafael Solano y un equipo en consolidación.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/equipo" },
  openGraph: { title, description },
};

export default function EquipoPage() {
  const { leadership } = site;

  return (
    <div className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <LeadershipDualPortrait
            animateEntrance
            size="hero"
            className="lg:mx-0"
          />
          <PageIntro>
            <p data-intro className="eyebrow">
              Equipo
            </p>
            <h1 data-intro className="section-title mt-4">
              {leadership.name}
            </h1>
            <p
              data-intro
              className="text-brand-green mt-3 text-lg font-semibold"
            >
              {leadership.role}
            </p>
            <p data-intro className="text-muted mt-1">
              {leadership.location}
            </p>
          </PageIntro>
        </div>

        <div className="space-y-6">
          <Reveal variant="up" once>
            <p className="text-muted max-w-prose text-lg leading-relaxed">
              {leadership.bio}
            </p>
          </Reveal>
          <Reveal variant="up" once>
            <aside
              className="border-accent/40 bg-surface max-w-prose rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed"
              role="note"
            >
              <p className="font-semibold">Equipo en consolidación</p>
              <p className="text-muted mt-1">
                Más perfiles del núcleo organizativo se publicarán cuando la
                estructura esté lista. Mientras tanto, el liderazgo público y
                las comunidades son el punto de contacto.
              </p>
            </aside>
          </Reveal>
          <Reveal variant="fade" stagger="li" once>
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
          </Reveal>
          <Reveal variant="fade" once>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link href="/contacto" className="btn-primary">
                Contacto
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
          </Reveal>
        </div>
      </div>
    </div>
  );
}
