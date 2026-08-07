"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/layout/brand-mark";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/content/site";

const navItems = site.nav;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 p-3 sm:p-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex h-14 max-w-[var(--max-w-page)] items-center justify-between gap-3 sm:h-14",
            "border-foreground/10 bg-surface/90 rounded-full border px-3 shadow-[0_8px_30px_rgb(0_0_0_/0.08)] backdrop-blur-md sm:px-5",
          )}
        >
          <Link
            href="/"
            aria-label={site.name}
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
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground inline-flex h-11 items-center leading-none underline-offset-4 transition-colors hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "hover:text-foreground inline-flex h-11 items-center leading-none underline-offset-4 transition-colors hover:underline",
                    pathname === item.href && "text-foreground font-semibold",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex h-11 items-center gap-2">
            <ThemeToggle />
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>
      <div className="h-[4.75rem] sm:h-[5.25rem]" aria-hidden="true" />
    </>
  );
}
