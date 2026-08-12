export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type NetworkProfile = {
  id: string;
  label: string;
  href: string;
  handle: string;
  blurb: string;
  cta: string;
};

export type CommunityLink = {
  label: string;
  href: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
  links?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
};

export type Pillar = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  highlights: string[];
};

export type TransparencyStatus = "available" | "preparing" | "future";

export type TransparencyItem = {
  label: string;
  status: TransparencyStatus;
  summary: string;
  href?: string;
  external?: boolean;
};

export type TransparencyCategory = {
  id: string;
  code: string;
  title: string;
  description: string;
  items: TransparencyItem[];
};

export const site = {
  name: "CO Politica Centro",
  tagline: "Centro con ideas. Colombia con futuro.",
  description:
    "Movimiento de centro liberal social: propuestas concretas, transparencia y comunidad para construir futuro.",
  disclaimer:
    "Somos un movimiento en consolidación. Aún no somos un partido político inscrito ante la autoridad electoral.",
  eyebrow: "Movimiento político · Colombia",
  urls: {
    capacitacion: "https://web-capacitacion-co-politica.vercel.app",
    linktree: "https://linktr.ee/rafaelsolanov",
    email: "rafaelsolanov@web.de",
    discord: "https://discord.gg/VKjgAbDDvC",
    telegram: "https://t.me/+OAEKucZTUzFlY2Ux",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/propuestas", label: "Propuestas" },
    { href: "/equipo", label: "Equipo" },
    { href: "/voluntariado", label: "Voluntariado" },
    { href: "/transparencia", label: "Transparencia" },
    { href: "/contacto", label: "Contacto" },
    {
      href: "https://discord.gg/VKjgAbDDvC",
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
      text: "Únete a Discord para conversar, organizarte y seguir al movimiento.",
      href: "https://discord.gg/VKjgAbDDvC",
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
    portrait: {
      src: "/media/leadership/rafael-portrait.jpg",
      alt: "Retrato de Rafael Solano",
    },
    avatar: {
      src: "/media/leadership/rafael-avatar.jpg",
      alt: "Avatar de Rafael Solano en canales",
    },
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
        label: "X",
        href: "https://x.com/rafaelsolanov",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61558576192594",
      },
    ] as SocialLink[],
  },
  networks: {
    eyebrow: "Conexión diaria",
    title: "Redes sociales",
    description:
      "Sigue la conversación pública de Rafael Solano y del movimiento en las plataformas oficiales.",
    profiles: [
      {
        id: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/rafaelsolanov/",
        handle: "@rafaelsolanov",
        blurb: "Ideas, actualidad y presencia cercana del movimiento.",
        cta: "Seguir",
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/rafaelsolanov",
        handle: "@rafaelsolanov",
        blurb: "Charlas y contenido en profundidad, sin ruido vacío.",
        cta: "Ver canal",
      },
      {
        id: "tiktok",
        label: "TikTok",
        href: "https://www.tiktok.com/@rafaelsolanov",
        handle: "@rafaelsolanov",
        blurb: "Clips cortos para el debate cotidiano.",
        cta: "Seguir",
      },
      {
        id: "x",
        label: "X",
        href: "https://x.com/rafaelsolanov",
        handle: "@rafaelsolanov",
        blurb: "Conversación pública y reacción al momento.",
        cta: "Seguir",
      },
      {
        id: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61558576192594",
        handle: "Rafael Solano",
        blurb: "Actualizaciones y alcance comunitario.",
        cta: "Seguir",
      },
    ] as NetworkProfile[],
  },
  whatsappNetwork: {
    eyebrow: "Directo y territorial",
    title: "Red de WhatsApp y comunidades",
    description:
      "Grupos regionales de WhatsApp, Discord y Telegram del movimiento.",
    hubs: [
      {
        label: "Discord",
        href: "https://discord.gg/VKjgAbDDvC",
        description: "Comunidad digital para conversar y organizarse.",
      },
      {
        label: "Telegram",
        href: "https://t.me/+OAEKucZTUzFlY2Ux",
        description: "Canal y comunidad en Telegram del movimiento.",
      },
    ] as CommunityLink[],
    featuredGroups: [
      {
        label: "Bogotá I",
        href: "https://chat.whatsapp.com/B6p1fAQMCUUB7jdEOuwrpW",
        description: "Grupo regional de WhatsApp",
      },
      {
        label: "Antioquia",
        href: "https://chat.whatsapp.com/Bonhluz2nhCCU3aWOaQXqS",
        description: "Grupo regional de WhatsApp",
      },
      {
        label: "Valle del Cauca",
        href: "https://chat.whatsapp.com/KhfYogDIIeb3JJ5lRlcWLB",
        description: "Grupo regional de WhatsApp",
      },
      {
        label: "Santander",
        href: "https://chat.whatsapp.com/Ew61HhHVFk15unhm68GPxK",
        description: "Grupo regional de WhatsApp",
      },
      {
        label: "Internacional",
        href: "https://chat.whatsapp.com/Bur5j46Lgj57oTBNE0pdLD",
        description: "Grupo de WhatsApp para la diáspora",
      },
    ] as CommunityLink[],
    groups: [
      {
        label: "Amazonas",
        href: "https://chat.whatsapp.com/DqKHvKBZpJLCcx8ICXL6p1",
      },
      {
        label: "Antioquia",
        href: "https://chat.whatsapp.com/Bonhluz2nhCCU3aWOaQXqS",
      },
      {
        label: "Arauca",
        href: "https://chat.whatsapp.com/Dva467zyzwnCxfuzeROpia",
      },
      {
        label: "Atlántico",
        href: "https://chat.whatsapp.com/Gqnj1Vaotdm4bHQeFvWczq",
      },
      {
        label: "Bogotá I",
        href: "https://chat.whatsapp.com/B6p1fAQMCUUB7jdEOuwrpW",
      },
      {
        label: "Bogotá II",
        href: "https://chat.whatsapp.com/EahoMk3Lm3hJElIxPVhlhp",
      },
      {
        label: "Bolívar",
        href: "https://chat.whatsapp.com/COKn7N1uhBz074w8xBceAp",
      },
      {
        label: "Boyacá",
        href: "https://chat.whatsapp.com/GKI0Qcvdr9fI6w4GglExbC",
      },
      {
        label: "Caldas",
        href: "https://chat.whatsapp.com/JdWya43njGk71IugVJmsAD",
      },
      {
        label: "Caquetá",
        href: "https://chat.whatsapp.com/CbPtbaYfMsT4oYdjbxEU3C",
      },
      {
        label: "Casanare",
        href: "https://chat.whatsapp.com/JI6sd3CHXh39ChTDrHk9hf",
      },
      {
        label: "Cauca",
        href: "https://chat.whatsapp.com/DeuYszTbNJsDvhYqO6ESt9",
      },
      {
        label: "Cesar",
        href: "https://chat.whatsapp.com/LhveZdIvFOF8Qqb2YgV2Hf",
      },
      {
        label: "Chocó",
        href: "https://chat.whatsapp.com/BzhNf8XzKzx1T8rrfjxEDr",
      },
      {
        label: "Córdoba",
        href: "https://chat.whatsapp.com/DjEyGMRpFfz4EjWB0iaDAM",
      },
      {
        label: "Cundinamarca",
        href: "https://chat.whatsapp.com/Eq9Vz8F4U2U6iYUKcAJIRS",
      },
      {
        label: "Guainía",
        href: "https://chat.whatsapp.com/DVjzXuRqOS2BBg5Ti6h95Q",
      },
      {
        label: "Guaviare",
        href: "https://chat.whatsapp.com/KVIaDwMshSIIsyx1U4a0Yz",
      },
      {
        label: "Huila",
        href: "https://chat.whatsapp.com/IwNVg3ONa6u3gWBXTBrarJ",
      },
      {
        label: "Internacional",
        href: "https://chat.whatsapp.com/Bur5j46Lgj57oTBNE0pdLD",
      },
      {
        label: "La Guajira",
        href: "https://chat.whatsapp.com/GgxuK1bzjB9A2DfcQTfkQH",
      },
      {
        label: "Magdalena",
        href: "https://chat.whatsapp.com/F3qXFAl9YLMGsae2gO0k7E",
      },
      {
        label: "Meta",
        href: "https://chat.whatsapp.com/IwkaqSWbBHvGh3r338zWhA",
      },
      {
        label: "Nariño",
        href: "https://chat.whatsapp.com/GwBTAcSxfXjHK5x6JoB44f",
      },
      {
        label: "Norte de Santander",
        href: "https://chat.whatsapp.com/Dhq2cNUyIWG4RtD2Bp2EuQ",
      },
      {
        label: "Putumayo",
        href: "https://chat.whatsapp.com/LoTU0MhZTSS8eie7oDudss",
      },
      {
        label: "Quindío",
        href: "https://chat.whatsapp.com/LK5BACi4Si19lOqtUPEJoG",
      },
      {
        label: "Risaralda",
        href: "https://chat.whatsapp.com/Ec8mqkamT9H9AbHdpnSASd",
      },
      {
        label: "San Andrés & Providencia",
        href: "https://chat.whatsapp.com/FhwMhBJmSmMImyfqiUvg94",
      },
      {
        label: "Santander",
        href: "https://chat.whatsapp.com/Ew61HhHVFk15unhm68GPxK",
      },
      {
        label: "Sucre",
        href: "https://chat.whatsapp.com/FgJ24QURmkxIzSwZtai6Mz",
      },
      {
        label: "Tolima",
        href: "https://chat.whatsapp.com/IOjTHbvRopgAdaraiPwZP4",
      },
      {
        label: "Valle del Cauca",
        href: "https://chat.whatsapp.com/KhfYogDIIeb3JJ5lRlcWLB",
      },
      {
        label: "Vaupés",
        href: "https://chat.whatsapp.com/JyEecVR8UYTFPR0jd2fJ3R",
      },
      {
        label: "Vichada",
        href: "https://chat.whatsapp.com/DWYkAUZayIb0s34i9EOV0s",
      },
    ] as SocialLink[],
  },
  faq: [
    {
      question: "¿Qué es CO Politica Centro?",
      answer:
        "Es un movimiento político de centro en Colombia, orientado al liberalismo social. Buscamos ideas claras para la vida cotidiana, instituciones fuertes y una democracia con participación real.",
    },
    {
      question: "¿Ya son un partido político inscrito?",
      answer:
        "No. Somos un movimiento en consolidación. Aún no somos un partido político inscrito ante la autoridad electoral. Este portal es transparente sobre lo que ya existe y lo que todavía se construye.",
    },
    {
      question: "¿Quién lidera el movimiento?",
      answer:
        "El liderazgo público de referencia es Rafael Solano. Más perfiles del núcleo organizativo se publicarán cuando la estructura esté lista.",
      links: [{ label: "Conoce al equipo", href: "/equipo" }],
    },
    {
      question: "¿Cómo puedo unirme o participar?",
      answer:
        "La forma más directa es sumarte a las comunidades del movimiento: grupos de WhatsApp por región, Discord y Telegram. También puedes escribirnos por el correo de contacto.",
      links: [
        {
          label: "Unirse a Discord",
          href: "https://discord.gg/VKjgAbDDvC",
          external: true,
        },
        { label: "Ir a contacto", href: "/contacto" },
      ],
    },
    {
      question: "¿Dónde están las comunidades y canales?",
      answer:
        "La comunidad principal está en Discord. También hay grupos regionales de WhatsApp en el mapa del inicio y un canal en Telegram.",
      links: [
        {
          label: "Unirse a Discord",
          href: "https://discord.gg/VKjgAbDDvC",
          external: true,
        },
      ],
    },
    {
      question: "¿Cómo contacto para prensa o publicidad?",
      answer:
        "Para publicidad, prensa o alianzas escribe al correo oficial del liderazgo.",
      links: [
        {
          label: "rafaelsolanov@web.de",
          href: "mailto:rafaelsolanov@web.de",
          external: true,
        },
      ],
    },
    {
      question: "¿Qué proponen?",
      answer:
        "Trabajamos cuatro ejes: economía ciudadana, seguridad humana, educación y oportunidades, y democracia e instituciones. El detalle está en la sección de propuestas.",
      links: [{ label: "Ver propuestas", href: "/propuestas" }],
    },
  ] as FaqItem[],
  updates: [
    {
      title: "Comunidad en Discord",
      source: "Discord",
      href: "https://discord.gg/VKjgAbDDvC",
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
  transparency: {
    title: "Transparencia activa",
    eyebrow: "Rendición de cuentas",
    intro:
      "Publicamos con claridad lo que ya existe y marcamos con honestidad lo que aún se consolida. No inventamos documentos ni obligaciones de un partido inscrito: avanzamos hacia esa vocación con la misma exigencia que pedimos al poder.",
    updatedLabel: "Última actualización",
    updatedAt: "agosto 2026",
    statusLabels: {
      available: "Disponible",
      preparing: "En preparación",
      future: "Con personería",
    } as Record<TransparencyStatus, string>,
    categories: [
      {
        id: "identidad",
        code: "01",
        title: "Identidad y naturaleza",
        description:
          "Quiénes somos, cómo nos presentamos y el marco en el que operamos hoy.",
        items: [
          {
            label: "Nombre y naturaleza del movimiento",
            status: "available",
            summary:
              "CO Politica Centro es un movimiento político de centro en Colombia, orientado al liberalismo social. Aún no somos un partido inscrito ante la autoridad electoral.",
            href: "/",
          },
          {
            label: "Disclaimer público",
            status: "available",
            summary:
              "Somos un movimiento en consolidación. Aún no somos un partido político inscrito ante la autoridad electoral.",
          },
          {
            label: "Símbolos y marca",
            status: "available",
            summary:
              "La identidad visual (flor / marca oro-verde) se usa en este portal y canales oficiales. Materiales adicionales se publicarán aquí al formalizarse.",
          },
        ],
      },
      {
        id: "organizacion",
        code: "02",
        title: "Organización y liderazgo",
        description:
          "Rostro público, roles conocidos y lo que falta del núcleo organizativo.",
        items: [
          {
            label: "Liderazgo público de referencia",
            status: "available",
            summary:
              "Rafael Solano es el liderazgo público de referencia del movimiento (Bumangués en Bogotá D.C.).",
            href: "/equipo",
          },
          {
            label: "Equipo y estructura orgánica",
            status: "preparing",
            summary:
              "Más perfiles del núcleo organizativo se publicarán cuando la estructura esté lista. Mientras tanto, el liderazgo público y las comunidades son el punto de contacto.",
            href: "/equipo",
          },
          {
            label: "Organigrama formal",
            status: "future",
            summary:
              "El organigrama con cargos y funciones se publicará cuando exista personería y estructura partidaria formal.",
          },
        ],
      },
      {
        id: "programa",
        code: "03",
        title: "Programa y documentos",
        description:
          "Propuestas públicas y documentos de orientación política.",
        items: [
          {
            label: "Pilares programáticos",
            status: "available",
            summary:
              "Economía ciudadana, seguridad humana, educación y oportunidades, democracia e instituciones.",
            href: "/propuestas",
          },
          {
            label: "Estatutos y documentos constitutivos",
            status: "future",
            summary:
              "Estatutos y documentos de constitución se publicarán al avanzar el proceso de formalización partidaria.",
          },
        ],
      },
      {
        id: "finanzas",
        code: "04",
        title: "Información financiera",
        description:
          "Aportes, gastos y reportes. Hoy no hay contabilidad de partido inscrito que publicar.",
        items: [
          {
            label: "Estado actual de financiación",
            status: "available",
            summary:
              "Como movimiento en consolidación, no administramos recursos de un partido inscrito ni reportes ante autoridad electoral. Cualquier mecanismo formal de aportes se anunciará aquí con reglas claras.",
          },
          {
            label: "Aportes, donaciones y rendición",
            status: "future",
            summary:
              "Cuando exista personería, publicaremos aportes, donaciones, balances y gastos conforme a la ley colombiana aplicable.",
          },
          {
            label: "Contratos y proveedores relevantes",
            status: "future",
            summary:
              "Listados de contratos relevantes se publicarán cuando el movimiento tenga operación financiera formal que lo exija.",
          },
        ],
      },
      {
        id: "campanas",
        code: "05",
        title: "Campañas y pactos",
        description:
          "Alianzas electorales, pactos y gastos de campaña — solo cuando existan.",
        items: [
          {
            label: "Pactos o alianzas electorales",
            status: "available",
            summary:
              "Hoy no hay pactos electorales ni alianzas de campaña formalizadas que reportar. Si se suscriben, se publicarán en esta sección.",
          },
          {
            label: "Gastos e ingresos de campaña",
            status: "future",
            summary:
              "Registros de campaña se publicarán cuando el movimiento participe formalmente en procesos electorales.",
          },
        ],
      },
      {
        id: "comunidades",
        code: "06",
        title: "Comunidades y canales",
        description:
          "Dónde conversamos en público y cómo unirse sin intermediarios opacos.",
        items: [
          {
            label: "Comunidad en Discord",
            status: "available",
            summary:
              "Canal principal para conversar, organizarse y seguir al movimiento.",
            href: "https://discord.gg/VKjgAbDDvC",
            external: true,
          },
          {
            label: "Redes del liderazgo",
            status: "available",
            summary:
              "Instagram, YouTube, TikTok, X y Facebook de Rafael Solano como punto de conversación pública.",
            href: "/equipo",
          },
        ],
      },
      {
        id: "contacto",
        code: "07",
        title: "Contacto y reclamos",
        description:
          "Cómo escribirnos y dónde señalar errores u omisiones en esta publicación.",
        items: [
          {
            label: "Correo de publicidad y prensa",
            status: "available",
            summary:
              "Para publicidad, prensa o alianzas: rafaelsolanov@web.de.",
            href: "mailto:rafaelsolanov@web.de",
            external: true,
          },
          {
            label: "Señalar omisiones en transparencia",
            status: "available",
            summary:
              "Si detectas un error u omisión en esta sección, escríbenos al correo oficial. Corregiremos y actualizaremos la fecha de esta página.",
            href: "/contacto",
          },
        ],
      },
      {
        id: "hoja-ruta",
        code: "08",
        title: "Hoja de ruta institucional",
        description:
          "Qué falta para pasar de movimiento a estructura con personería.",
        items: [
          {
            label: "Consolidación del núcleo organizativo",
            status: "preparing",
            summary:
              "Se están estructurando perfiles, roles y procesos internos. Se publicarán aquí a medida que queden listos.",
          },
          {
            label: "Personería y obligaciones legales",
            status: "future",
            summary:
              "Con personería jurídica partidaria aplicarán obligaciones de transparencia ante la autoridad electoral colombiana; esta sección se ampliará entonces con los reportes correspondientes.",
          },
        ],
      },
    ] as TransparencyCategory[],
  },
} as const;

export type Site = typeof site;
