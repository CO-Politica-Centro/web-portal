"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [pathnameSnapshot, setPathnameSnapshot] = useState(pathname);
  const titleId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  if (pathname !== pathnameSnapshot) {
    setPathnameSnapshot(pathname);
    if (open) {
      setOpen(false);
    }
  }

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="border-foreground/20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Cerrar" : "Menú"}
      </button>

      {open ? (
        <div
          className="bg-foreground/40 fixed inset-0 z-50"
          onClick={close}
          aria-hidden="true"
        />
      ) : null}

      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        hidden={!open}
        className={cn(
          "bg-surface border-foreground/10 fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l p-6 shadow-xl transition-transform",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <p id={titleId} className="font-display text-lg font-semibold">
            Menú
          </p>
          <button
            type="button"
            className="border-foreground/20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border text-sm font-semibold"
            onClick={close}
          >
            Cerrar
          </button>
        </div>
        <nav aria-label="Principal móvil" className="flex flex-col gap-2">
          {items.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-foreground/5 min-h-11 rounded-md px-3 py-3 text-base font-medium"
                onClick={close}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "hover:bg-foreground/5 min-h-11 rounded-md px-3 py-3 text-base font-medium",
                  pathname === item.href && "bg-foreground/5 text-brand-green",
                )}
                onClick={close}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
