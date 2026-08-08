import { ExternalLink } from "@/components/layout/external-link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const networkIconPaths: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.5.4 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.5.2-1.2.4-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.5-.4-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .5-.2 1.2-.4 2.4-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1.2-.1 1.6-.1 4.8s0 3.5.1 4.8c0 .9.2 1.4.3 1.7.2.4.3.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1.2.1 1.6.1 4.8.1s3.5 0 4.8-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1.2.1-1.6.1-4.8s0-3.5-.1-4.8c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1.3-.1-1.6-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm6.2-2.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z",
  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.4 3.5-6.4 3.5z",
  tiktok:
    "M16.6 5.8A4.9 4.9 0 0 1 14.2 2h-3.2v13.1a2.7 2.7 0 1 1-1.9-2.6V9.2a5.9 5.9 0 1 0 5.1 5.8V9.4a8 8 0 0 0 4.7 1.5V7.7a4.9 4.9 0 0 1-2.3-1.9z",
  x: "M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.9-6.4L5.3 22H2.5l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z",
  facebook:
    "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
};

function NetworkIcon({ id }: { id: string }) {
  const path = networkIconPaths[id];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 fill-current">
      <path d={path} />
    </svg>
  );
}

export function HomeNetworks() {
  const { networks, whatsappNetwork, urls } = site;

  return (
    <section
      aria-labelledby="networks-heading"
      className="section-space border-foreground/10 border-t"
    >
      <div className="container-page space-y-16">
        <div>
          <p className="eyebrow">{networks.eyebrow}</p>
          <h2 id="networks-heading" className="section-title mt-4 max-w-2xl">
            {networks.title}
          </h2>
          <p className="text-muted mt-4 max-w-prose text-lg leading-relaxed">
            {networks.description}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {networks.profiles.map((profile) => (
              <li key={profile.id}>
                <ExternalLink
                  href={profile.href}
                  className={cn(
                    "bg-surface border-foreground/10 group flex h-full flex-col gap-4 border p-5 transition-[border-color,transform]",
                    "hover:border-brand-green/50 focus-visible:border-brand-green",
                  )}
                >
                  <span className="text-brand-green">
                    <NetworkIcon id={profile.id} />
                  </span>
                  <div className="space-y-1">
                    <p className="font-display text-xl font-semibold">
                      {profile.label}
                    </p>
                    <p className="text-muted text-sm">{profile.handle}</p>
                  </div>
                  <p className="text-muted flex-1 text-sm leading-relaxed">
                    {profile.blurb}
                  </p>
                  <span className="text-brand-green text-sm font-semibold underline-offset-4 group-hover:underline">
                    {profile.cta}
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">{whatsappNetwork.eyebrow}</p>
          <h3 className="section-title mt-4 max-w-2xl">
            {whatsappNetwork.title}
          </h3>
          <p className="text-muted mt-4 max-w-prose text-lg leading-relaxed">
            {whatsappNetwork.description}
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {whatsappNetwork.hubs.map((hub) => (
              <li key={hub.href}>
                <ExternalLink
                  href={hub.href}
                  className="bg-surface border-foreground/10 hover:border-accent/60 flex h-full flex-col gap-3 border p-6 transition-colors"
                >
                  <p className="font-display text-xl font-semibold">
                    {hub.label}
                  </p>
                  <p className="text-muted text-sm leading-relaxed">
                    {hub.description}
                  </p>
                  <span className="text-brand-green mt-auto pt-2 text-sm font-semibold underline-offset-4 hover:underline">
                    Abrir
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="font-semibold tracking-wide uppercase">
              Grupos regionales destacados
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {whatsappNetwork.featuredGroups.map((group) => (
                <li key={group.href}>
                  <ExternalLink
                    href={group.href}
                    className="border-foreground/10 bg-surface hover:border-brand-green/50 flex min-h-11 items-center justify-between gap-3 border px-4 py-3 transition-colors"
                  >
                    <span className="font-semibold">{group.label}</span>
                    <span className="text-brand-green text-sm font-semibold">
                      Unirse
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <p className="text-muted mt-5 text-sm leading-relaxed">
              Hay {whatsappNetwork.groups.length} grupos regionales de WhatsApp
              en el directorio. Consulta el listado completo en{" "}
              <ExternalLink
                href={urls.beacons}
                className="text-brand-green font-semibold underline-offset-4 hover:underline"
              >
                beacons.ai/centropd
              </ExternalLink>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
