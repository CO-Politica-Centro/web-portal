import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/layout/external-link";
import { PageIntro } from "@/components/motion/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Habla con el movimiento",
  description:
    "Prensa, ideas o participación: escríbenos, entra a Discord y únete a las redes de CO Politica Centro.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <div className="section-space">
      <div className="container-page max-w-3xl">
        <PageIntro>
          <p data-intro className="eyebrow">
            Contacto
          </p>
          <h1 data-intro className="section-title mt-4">
            Hablemos
          </h1>
          <p data-intro className="text-muted mt-4 text-lg leading-relaxed">
            Para publicidad, prensa o alianzas escribe al correo oficial. Para
            sumarte a la comunidad del movimiento, únete a Discord.
          </p>
        </PageIntro>

        <Reveal className="mt-12" stagger="dl > div" once>
          <dl className="space-y-8">
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
                Comunidad principal del movimiento:
              </dd>
              <dd className="mt-2">
                <ExternalLink className="btn-primary" href={site.urls.discord}>
                  Unirse a Discord
                </ExternalLink>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Redes de Rafael Solano</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {site.leadership.links.map((link) => (
                    <li key={link.href}>
                      <ExternalLink
                        href={link.href}
                        className="text-brand-green inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal variant="fade" once className="mt-12">
          <p className="text-muted text-sm leading-relaxed" role="note">
            {site.disclaimer}
          </p>
          <Link
            href="/"
            className="text-foreground mt-8 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
          >
            Volver al inicio
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
