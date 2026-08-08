"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/layout/external-link";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      window.requestAnimationFrame(() => {
        dialog.querySelector<HTMLElement>("a[href], button")?.focus();
      });
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const onBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) close();
    };

    dialog.addEventListener("click", onBackdropClick);
    return () => dialog.removeEventListener("click", onBackdropClick);
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="border-foreground/20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-base font-semibold"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Cerrar" : "Menú"}
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-nav-panel"
        aria-labelledby={titleId}
        onClose={close}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        className={cn(
          "bg-surface text-foreground border-foreground/10 fixed inset-y-0 right-0 m-0 ml-auto h-dvh w-[min(100%,20rem)] max-w-none translate-x-0 border-l p-0 shadow-xl open:flex open:flex-col",
          "[&::backdrop]:bg-foreground/40",
        )}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p id={titleId} className="font-display text-lg font-semibold">
              Menú
            </p>
            <button
              type="button"
              className="border-foreground/20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border text-base font-semibold"
              onClick={close}
            >
              Cerrar
            </button>
          </div>
          <nav aria-label="Principal móvil" className="flex flex-col gap-2">
            {items.map((item) =>
              item.external ? (
                <ExternalLink
                  key={item.href}
                  href={item.href}
                  className="hover:bg-foreground/5 min-h-11 rounded-md px-3 py-3 text-base font-medium"
                  onClick={close}
                >
                  {item.label}
                </ExternalLink>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "hover:bg-foreground/5 min-h-11 rounded-md px-3 py-3 text-base font-medium",
                    pathname === item.href &&
                      "bg-foreground/5 text-brand-green",
                  )}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </dialog>
    </div>
  );
}
