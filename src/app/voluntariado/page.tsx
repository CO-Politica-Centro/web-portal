import type { Metadata } from "next";
import { VoluntariadoClient } from "@/features/voluntariado/voluntariado-client";
import { site } from "@/content/site";

const title = "Voluntariado";
const description =
  "Banco de proyectos y talentos de CO Politica Centro: súmate a tareas técnicas, de diseño, legal, comunicación o territorio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/voluntariado" },
  openGraph: { title, description },
};

export default function VoluntariadoPage() {
  return (
    <div className="section-space">
      <div className="container-page">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
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
          <span className="bg-accent/25 text-foreground inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
            Voluntariado técnico
          </span>
        </div>

        <div
          className="border-accent/40 bg-surface mt-8 max-w-3xl rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed"
          role="note"
        >
          <p className="font-semibold">Sobre esta convocatoria</p>
          <p className="text-muted mt-1">{site.disclaimer}</p>
        </div>

        <div className="mt-12">
          <VoluntariadoClient />
        </div>
      </div>
    </div>
  );
}
