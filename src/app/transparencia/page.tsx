import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/motion/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { TransparencyExplorer } from "./_components/transparency-explorer";

const title = "Transparencia";
const description =
  "Transparencia activa de CO Politica Centro: identidad, organización, finanzas y hoja de ruta — con honestidad sobre lo disponible y lo pendiente.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/transparencia" },
  openGraph: { title, description },
};

export default function TransparenciaPage() {
  const { transparency } = site;

  return (
    <div className="section-space">
      <div className="container-page">
        <PageIntro className="max-w-3xl">
          <p data-intro className="eyebrow">
            {transparency.eyebrow}
          </p>
          <h1 data-intro className="section-title mt-4">
            {transparency.title}
          </h1>
          <p data-intro className="text-muted mt-4 text-lg leading-relaxed">
            {transparency.intro}
          </p>
          <p data-intro className="text-muted mt-4 text-sm">
            {transparency.updatedLabel}:{" "}
            <time dateTime="2026-08">{transparency.updatedAt}</time>
          </p>
        </PageIntro>

        <Reveal variant="up" delay={0.05} className="mt-8">
          <div
            className="border-accent/40 bg-surface max-w-3xl rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed"
            role="note"
          >
            <p className="font-semibold">Sobre esta publicación</p>
            <p className="text-muted mt-1">{site.disclaimer}</p>
          </div>
        </Reveal>

        <div className="mt-12">
          <TransparencyExplorer />
        </div>

        <Reveal variant="fade" className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto" className="btn-primary sm:w-auto">
              Contacto
            </Link>
            <Link href="/propuestas" className="btn-secondary sm:w-auto">
              Ver propuestas
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
