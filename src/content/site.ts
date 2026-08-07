export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Pillar = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  highlights: string[];
};

export const site = {
  name: "CO Politica Centro",
  tagline: "Centro con ideas. Colombia con futuro.",
  description:
    "Movimiento político de centro en Colombia, orientado al liberalismo social. Trabajamos con ideas claras para la vida cotidiana, las instituciones y la democracia.",
  disclaimer:
    "Somos un movimiento en consolidación. Aún no somos un partido político inscrito ante la autoridad electoral.",
  eyebrow: "Movimiento político · Colombia",
  urls: {
    beacons: "https://beacons.ai/centropd",
    email: "rafaelsolanov@web.de",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/propuestas", label: "Propuestas" },
    { href: "/equipo", label: "Equipo" },
    { href: "/contacto", label: "Contacto" },
    {
      href: "https://beacons.ai/centropd",
      label: "Comunidades",
      external: true,
    },
  ] as NavItem[],
  pillars: [
    {
      slug: "economia-ciudadana",
      title: "Economía ciudadana",
      summary:
        "Bajar la presión del costo de vida y abrir camino al trabajo digno y al emprendimiento.",
      body: "Proponemos una economía al servicio de las personas: formalización con sentido, apoyo a quienes producen y reglas claras para competir sin privilegios. El centro no es indiferencia: es priorizar resultados medibles en el bolsillo y en la dignidad laboral.",
      highlights: [
        "Costo de vida y canasta familiar",
        "Empleo formal y emprendimiento",
        "Reglas claras para producir",
      ],
    },
    {
      slug: "seguridad-humana",
      title: "Seguridad humana",
      summary:
        "Seguridad con derechos, instituciones fuertes y presencia territorial seria.",
      body: "La seguridad no se reduce a fuerza: incluye prevención, justicia oportuna y confianza en las instituciones. Buscamos un enfoque equilibrado que proteja a la ciudadanía sin sacrificar el Estado de derecho.",
      highlights: [
        "Prevención y justicia oportuna",
        "Instituciones creíbles",
        "Derechos y Estado de derecho",
      ],
    },
    {
      slug: "educacion-oportunidades",
      title: "Educación y oportunidades",
      summary:
        "Formación de calidad, juventudes con horizonte y movilidad social real.",
      body: "Sin educación no hay centro sostenible. Apostamos por trayectorias formativas útiles, acceso equitativo y puentes claros entre estudio, trabajo y proyecto de vida — especialmente para jóvenes en ciudades y regiones.",
      highlights: [
        "Calidad educativa",
        "Juventudes y primer empleo",
        "Movilidad social",
      ],
    },
    {
      slug: "democracia-instituciones",
      title: "Democracia e instituciones",
      summary:
        "Participación ciudadana, transparencia y reglas que sí se cumplan.",
      body: "Un liberalismo social serio defiende instituciones, no caudillismos. Impulsamos participación informada, control ciudadano y una política que explique el porqué de cada decisión.",
      highlights: [
        "Transparencia y control ciudadano",
        "Participación informada",
        "Instituciones sobre personalismos",
      ],
    },
  ] as Pillar[],
  highlights: [
    {
      title: "Programa por ejes",
      text: "Cuatro pilares para orientar el debate público con claridad y sin ruido.",
      href: "/propuestas",
    },
    {
      title: "Comunidades activas",
      text: "Canales y grupos del movimiento reunidos en un solo hub.",
      href: "https://beacons.ai/centropd",
      external: true,
    },
    {
      title: "Liderazgo cercano",
      text: "Un rostro público, conversación abierta y presencia en redes.",
      href: "/equipo",
    },
  ],
  leadership: {
    name: "Rafael Solano",
    role: "Liderazgo del movimiento",
    location: "Bumangués en Bogotá D.C.",
    bio: "Impulsa una política de centro y liberalismo social: ideas claras, conversación pública y construcción de un movimiento con vocación de partido.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/rafaelsolanov/",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/rafaelsolanov",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@rafaelsolanov",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61558576192594",
      },
    ] as SocialLink[],
  },
  updates: [
    {
      title: "Hub de comunidades y canales",
      source: "Beacons",
      href: "https://beacons.ai/centropd",
    },
    {
      title: "Conversación pública en Instagram",
      source: "Instagram",
      href: "https://www.instagram.com/rafaelsolanov/",
    },
    {
      title: "Contenido y charlas en YouTube",
      source: "YouTube",
      href: "https://www.youtube.com/rafaelsolanov",
    },
  ],
  about: {
    paragraphs: [
      "CO Politica Centro nace para ofrecer una alternativa democrática, moderna y cercana: ni extremos ni vacío. Creemos en el liberalismo social como brújula — libertad con responsabilidad, mercado con reglas e instituciones que funcionen.",
      "Este portal reúne quiénes somos, qué proponemos y cómo participar. Es una casa digital en construcción, transparente sobre lo que ya existe y lo que aún se consolida.",
    ],
  },
} as const;

export type Site = typeof site;
