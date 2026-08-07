import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/propuestas", label: "Propuestas" },
  { href: "/equipo", label: "Equipo" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-foreground/10 bg-surface/80 border-b backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          CO Politica Centro
        </Link>
        <nav className="text-muted flex flex-wrap items-center gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-foreground transition-colors",
                "underline-offset-4 hover:underline",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
