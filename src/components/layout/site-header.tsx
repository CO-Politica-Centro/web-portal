"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BrandMark } from "@/components/layout/brand-mark";
import { ExternalLink } from "@/components/layout/external-link";
import { LinkUnderline } from "@/components/layout/link-underline";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MOTION } from "@/components/motion/tokens";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { isNavActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const navItems = site.nav;

export function SiteHeader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) return;

      if (reduced) {
        bar.classList.add("motion-enter-ready");
        return;
      }

      const brand = bar.querySelector("[data-header-brand]");
      const links = bar.querySelectorAll("[data-header-link]");
      const actions = bar.querySelector("[data-header-actions]");

      const tl = gsap.timeline({
        defaults: { ease: MOTION.ease },
        onComplete: () => {
          bar.classList.add("motion-enter-ready");
          gsap.set([bar, brand, links, actions].filter(Boolean), {
            clearProps: "transform,opacity,visibility",
          });
        },
      });

      tl.fromTo(
        bar,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
      );

      if (brand) {
        tl.fromTo(
          brand,
          { y: -8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45 },
          "-=0.35",
        );
      }

      if (links.length > 0) {
        tl.fromTo(
          links,
          { y: -6, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.05,
          },
          "-=0.25",
        );
      }

      if (actions) {
        tl.fromTo(
          actions,
          { y: -6, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4 },
          "-=0.3",
        );
      }
    },
    { scope: barRef, dependencies: [reduced] },
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-3 sm:p-4">
        <div
          ref={barRef}
          data-header-intro=""
          className={cn(
            "pointer-events-auto mx-auto flex h-14 max-w-[var(--max-w-page)] items-center justify-between gap-3 sm:h-14",
            "border-foreground/10 bg-surface/90 rounded-full border px-3 shadow-[0_8px_30px_rgb(0_0_0_/0.08)] backdrop-blur-md sm:px-5",
          )}
        >
          <Link
            href="/"
            aria-label={site.name}
            data-header-brand=""
            className="inline-flex h-11 shrink-0 items-center"
          >
            <BrandMark
              name={site.name}
              size={32}
              priority
              nameClassName="hidden leading-none text-base sm:inline md:text-lg lg:text-xl"
            />
          </Link>

          <nav
            aria-label="Principal"
            className="text-muted hidden h-full items-center gap-5 text-base md:flex"
          >
            {navItems.map((item) => {
              const active = !item.external && isNavActive(pathname, item.href);
              return item.external ? (
                <ExternalLink
                  key={item.href}
                  href={item.href}
                  data-header-link=""
                  className="group hover:text-foreground inline-flex h-11 items-center gap-1 leading-none transition-colors"
                >
                  <LinkUnderline>{item.label}</LinkUnderline>
                  <span aria-hidden="true" className="text-xs opacity-70">
                    ↗
                  </span>
                </ExternalLink>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  data-header-link=""
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group hover:text-foreground inline-flex h-11 items-center leading-none transition-colors",
                    active && "text-foreground font-semibold",
                  )}
                >
                  <LinkUnderline>{item.label}</LinkUnderline>
                </Link>
              );
            })}
          </nav>

          <div data-header-actions="" className="flex h-11 items-center gap-2">
            <ThemeToggle />
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>
      <div className="h-[4.75rem] sm:h-[5.25rem]" aria-hidden="true" />
    </>
  );
}
