const BEACONS_URL = "https://beacons.ai/centropd";

const socials = [
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
] as const;

export function SiteFooter() {
  return (
    <footer className="border-foreground/10 bg-surface/60 border-t">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold">
            CO Politica Centro
          </p>
          <p className="text-muted max-w-md text-sm leading-relaxed">
            Movimiento político de centro en Colombia — liberalismo social.
            Estamos en consolidación hacia un partido.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Contacto</p>
          <a
            className="text-muted hover:text-foreground block min-h-11 underline-offset-4 hover:underline"
            href="mailto:rafaelsolanov@web.de"
          >
            rafaelsolanov@web.de
          </a>
          <a
            className="text-brand-green block min-h-11 font-medium underline-offset-4 hover:underline"
            href={BEACONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Comunidades en Beacons
          </a>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold">Redes</p>
          <ul className="text-muted space-y-1">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  className="hover:text-foreground inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
