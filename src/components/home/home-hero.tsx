import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "@/components/layout/external-link";
import { site } from "@/content/site";
import { LeadershipDualPortrait } from "@/components/home/leadership-dual-portrait";
import { PageIntro } from "@/components/motion/page-intro";
import { ParallaxLite } from "@/components/motion/parallax-lite";

const sectionLinks = [
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#propuestas", label: "Propuestas" },
  { href: "#liderazgo", label: "Liderazgo" },
  { href: "#comunidades", label: "Comunidades" },
  { href: "#faq", label: "Preguntas" },
] as const;

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-[4.75rem] overflow-hidden pt-[4.75rem] sm:-mt-[5.25rem] sm:pt-[5.25rem]"
    >
      <ParallaxLite
        className="pointer-events-none absolute inset-0"
        factor={0.1}
      >
        <div className="absolute -top-8 -left-16 h-72 w-72 rounded-full bg-[rgb(232_197_71_/0.22)] blur-3xl" />
        <div className="absolute top-20 -right-10 h-80 w-80 rounded-full bg-[rgb(47_107_58_/0.14)] blur-3xl" />
      </ParallaxLite>

      <div className="container-page section-space relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <PageIntro className="order-2 lg:order-1">
          <p data-intro className="eyebrow">
            {site.eyebrow}
          </p>
          <div data-intro className="mt-6 flex items-center gap-4">
            <Image
              src="/brand/logo-flor.svg"
              alt=""
              width={72}
              height={72}
              className="aspect-square size-[72px] shrink-0 overflow-hidden rounded-full object-cover"
              priority
              sizes="72px"
              unoptimized
            />
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {site.name}
            </p>
          </div>
          <h1
            data-intro
            id="hero-heading"
            className="mt-4 max-w-3xl text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
          >
            {site.tagline}
          </h1>
          <p
            data-intro
            className="text-muted mt-6 max-w-xl text-lg leading-relaxed sm:text-xl"
          >
            {site.description}
          </p>
          <div
            data-intro
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link href="/propuestas" className="btn-primary sm:w-auto">
              Conoce las propuestas
            </Link>
            <ExternalLink
              href={site.urls.discord}
              className="btn-secondary sm:w-auto"
            >
              Únete a Discord
            </ExternalLink>
            <ExternalLink
              href={site.urls.capacitacion}
              className="btn-secondary sm:w-auto"
            >
              Capacitación
            </ExternalLink>
          </div>
          <nav data-intro aria-label="En esta página" className="mt-8">
            <ul className="text-muted flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-foreground inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageIntro>

        <div className="order-1 flex flex-col items-center gap-4 lg:order-2">
          <LeadershipDualPortrait animateEntrance size="hero" />
          <p className="text-muted max-w-xs text-center text-sm leading-relaxed">
            {site.leadership.name} · {site.leadership.role}
          </p>
        </div>
      </div>
    </section>
  );
}
