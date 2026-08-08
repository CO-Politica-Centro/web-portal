import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <div className="section-space">
      <div className="container-page max-w-2xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="section-title mt-4">Página no encontrada</h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          Esta ruta no existe en el portal de {site.name}. Puedes volver al
          inicio o seguir explorando el programa y el contacto.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className="btn-primary sm:w-auto">
            Ir al inicio
          </Link>
          <Link href="/propuestas" className="btn-secondary sm:w-auto">
            Ver propuestas
          </Link>
          <Link href="/contacto" className="btn-secondary sm:w-auto">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
