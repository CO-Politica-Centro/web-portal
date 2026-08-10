import type {
  TalentProfile,
  VolunteerProject,
} from "@/features/voluntariado/types";

export const SEED_PROJECTS: VolunteerProject[] = [
  {
    id: "secop-bot",
    category: "tech",
    title: "Bot de transparencia de contratación SECOP",
    description:
      "Automatizar alertas ciudadanas sobre contrataciones públicas relevantes para el seguimiento del movimiento.",
    skills: ["Python", "Scraping", "API", "GitHub"],
    hoursLabel: "3–5 hrs/sem",
    slotsFilled: 3,
    slotsTotal: 5,
    status: "recruiting",
  },
  {
    id: "gasto-regional",
    category: "tech",
    title: "Dashboard de gasto público regional",
    description:
      "Visualizar datos abiertos de ejecución presupuestal por departamento con foco pedagógico.",
    skills: ["React", "D3.js", "Datos abiertos"],
    hoursLabel: "4–6 hrs/sem",
    slotsFilled: 4,
    slotsTotal: 4,
    status: "completed",
  },
  {
    id: "ley-sostenibilidad",
    category: "legal",
    title: "Revisión legal: sostenibilidad y territorio",
    description:
      "Apoyo de análisis normativo para posicionamientos públicos del movimiento (sin personería jurídica aún).",
    skills: ["Derecho ambiental", "Análisis legislativo"],
    hoursLabel: "2–4 hrs/sem",
    slotsFilled: 0,
    slotsTotal: 2,
    status: "urgent",
  },
  {
    id: "infografias-salud",
    category: "diseno",
    title: "Kit de infografías: reforma de salud",
    description:
      "Piezas claras para redes y comunidades regionales que expliquen propuestas en lenguaje ciudadano.",
    skills: ["Figma", "Canva", "Ilustración"],
    hoursLabel: "3–5 hrs/sem",
    slotsFilled: 1,
    slotsTotal: 3,
    status: "recruiting",
  },
  {
    id: "guion-redes",
    category: "comunicacion",
    title: "Guiones cortos para redes y Discord",
    description:
      "Redacción de mensajes semanales alineados al tono institucional del portal.",
    skills: ["Copy", "Redes", "Edición"],
    hoursLabel: "2–3 hrs/sem",
    slotsFilled: 2,
    slotsTotal: 4,
    status: "recruiting",
  },
  {
    id: "nodos-regionales",
    category: "territorio",
    title: "Mapa vivo de nodos regionales",
    description:
      "Mantener actualizado el directorio de grupos y contactos territoriales del movimiento.",
    skills: ["Coordinación", "WhatsApp", "Datos"],
    hoursLabel: "2–4 hrs/sem",
    slotsFilled: 1,
    slotsTotal: 3,
    status: "recruiting",
  },
];

export const SEED_TALENTS: TalentProfile[] = [
  {
    id: "seed-ana",
    displayName: "Ana R.",
    headline: "Ingeniera de datos · Bogotá",
    categories: ["tech"],
    skills: ["Python", "SQL", "Visualización"],
    availability: "Fines de semana",
    bio: "Quiere aportar a transparencia y datos abiertos sin cargos inventados: trabajo técnico voluntario.",
  },
  {
    id: "seed-camilo",
    displayName: "Camilo M.",
    headline: "Diseñador de producto · Medellín",
    categories: ["diseno", "comunicacion"],
    skills: ["Figma", "Sistemas de diseño", "Accesibilidad"],
    availability: "3 hrs/sem",
    bio: "Interés en piezas educativas y kits visuales para comunidades regionales.",
  },
  {
    id: "seed-laura",
    displayName: "Laura V.",
    headline: "Abogada · Cali",
    categories: ["legal"],
    skills: ["Derecho público", "Redacción normativa"],
    availability: "Flexible",
    bio: "Disponible para revisiones legales de posicionamientos públicos del movimiento.",
  },
];
