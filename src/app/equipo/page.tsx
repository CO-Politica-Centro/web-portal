import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Equipo",
};

export default function EquipoPage() {
  return (
    <ComingSoon
      title="Equipo"
      description="Espacio reservado para presentar al equipo del movimiento cuando la estructura esté definida."
    />
  );
}
