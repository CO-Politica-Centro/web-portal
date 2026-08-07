import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  return (
    <ComingSoon
      title="Contacto"
      description="Mientras armamos el formulario, escribe a rafaelsolanov@web.de para publicidad y prensa."
    />
  );
}
