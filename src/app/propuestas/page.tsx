import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Propuestas",
};

export default function PropuestasPage() {
  return (
    <ComingSoon
      title="Propuestas"
      description="Aquí publicaremos el programa y las propuestas del movimiento. Esta ruta está lista para contenido."
    />
  );
}
