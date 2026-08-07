import Link from "next/link";
import { site } from "@/content/site";
import { ParallaxLite } from "@/components/motion/parallax-lite";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <ParallaxLite
        className="pointer-events-none absolute inset-0"
        factor={0.1}
      >
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[rgb(232_197_71_/0.28)] blur-3xl" />
        <div className="absolute top-20 -right-10 h-80 w-80 rounded-full bg-[rgb(47_107_58_/0.16)] blur-3xl" />
      </ParallaxLite>

      <div className="container-page section-space relative">
        <p className="eyebrow">{site.eyebrow}</p>
        <p className="font-display mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          {site.name}
        </p>
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
    </section>
  );
}
