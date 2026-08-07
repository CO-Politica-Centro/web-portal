import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { LeadershipDualPortrait } from "@/components/home/leadership-dual-portrait";
import { ParallaxLite } from "@/components/motion/parallax-lite";

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
        <div className="order-2 lg:order-1">
          <p className="eyebrow">{site.eyebrow}</p>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/brand/logo-flor.png"
              alt=""
              width={72}
              height={72}
              className="shrink-0 rounded-full"
              priority
            />
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {site.name}
            </p>
          </div>
          <h1
            id="hero-heading"
            className="mt-4 max-w-3xl text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
          >
            {site.tagline}
          </h1>
          <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
            {site.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/propuestas" className="btn-primary sm:w-auto">
              Conoce las propuestas
            </Link>
            <a
              href={site.urls.beacons}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary sm:w-auto"
            >
              Únete a las comunidades
            </a>
          </div>
        </div>

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
