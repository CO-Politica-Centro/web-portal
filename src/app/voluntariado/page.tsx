import type { Metadata } from "next";
import { PageIntro } from "@/components/motion/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { VoluntariadoClient } from "@/features/voluntariado/voluntariado-client";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Voluntariado: tu talento mueve al centro",
  description:
    "Proyectos abiertos en tech, diseño, legal, comunicación y territorio. Elige una tarea y suma desde hoy.",
  path: "/voluntariado",
});

export default function VoluntariadoPage() {
  return (
    <div className="section-space">
      <div className="container-page">
        <PageIntro className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div data-intro className="max-w-3xl">
            <p className="eyebrow">Voluntariado técnico y ciudadano</p>
            <h1 className="section-title mt-4">
              Tu talento hace la diferencia: banco de proyectos
            </h1>
            <p className="text-muted mt-4 text-lg leading-relaxed">
              Tablero de proyectos abiertos y perfiles voluntarios del
              movimiento. Postúlate o registra tu talento con cuenta (Google o
              email).
            </p>
          </div>
          <span
            data-intro
            className="bg-accent/25 text-foreground inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase"
          >
            Voluntariado técnico
          </span>
        </PageIntro>

        <Reveal variant="up" className="mt-8">
          <div
            className="border-accent/40 bg-surface max-w-3xl rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed"
            role="note"
          >
            <p className="font-semibold">Sobre esta convocatoria</p>
            <p className="text-muted mt-1">{site.disclaimer}</p>
          </div>
        </Reveal>

        <div className="mt-12">
          <VoluntariadoClient />
        </div>
      </div>
    </div>
  );
}
