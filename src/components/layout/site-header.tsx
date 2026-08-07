"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";
import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const navItems = [...site.nav];

  return (
    <header className="border-foreground/10 bg-surface/85 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-3 md:py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight md:text-xl"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Principal"
          className="text-muted hidden items-center gap-5 text-sm md:flex"
        >
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "hover:text-foreground inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:underline",
                  pathname === item.href && "text-foreground font-semibold",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
