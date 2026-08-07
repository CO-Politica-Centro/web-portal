"use client";

import Link from "next/link";
import { useId, useState } from "react";
import {
  site,
  type TransparencyCategory,
  type TransparencyItem,
  type TransparencyStatus,
} from "@/content/site";
import { cn } from "@/lib/utils";

function statusClass(status: TransparencyStatus) {
  switch (status) {
    case "available":
      return "bg-brand-green/15 text-brand-green";
    case "preparing":
      return "bg-accent/20 text-foreground";
    case "future":
      return "bg-foreground/8 text-muted";
  }
}

function ItemBody({ item }: { item: TransparencyItem }) {
  const inner = (
    <>
      <span
        className="text-brand-green mt-0.5 shrink-0 font-semibold"
        aria-hidden
      >
        ›
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-foreground block font-semibold">
          {item.label}
        </span>
        <span className="text-muted mt-1 block text-sm leading-relaxed">
          {item.summary}
        </span>
        {item.href ? (
          <span className="text-brand-green mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 group-hover:underline">
            Abrir
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "shrink-0 rounded-md px-2 py-1 text-[0.65rem] font-semibold tracking-wide uppercase",
          statusClass(item.status),
        )}
      >
        {site.transparency.statusLabels[item.status]}
      </span>
    </>
  );

  if (!item.href) {
    return (
      <div className="border-foreground/8 bg-background/60 flex gap-3 rounded-lg border px-4 py-3">
        {inner}
      </div>
    );
  }

  const className =
    "group flex gap-3 rounded-lg border border-foreground/8 bg-background/60 px-4 py-3 transition-colors hover:border-brand-green/35 hover:bg-surface";

  if (item.external || item.href.startsWith("mailto:")) {
    return (
      <a
        href={item.href}
        className={className}
        {...(item.href.startsWith("mailto:")
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}

function CategoryDetail({ category }: { category: TransparencyCategory }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="eyebrow">
          {category.code}. {category.title}
        </p>
        <p className="text-muted mt-3 max-w-prose leading-relaxed">
          {category.description}
        </p>
      </div>
      <ul className="space-y-3">
        {category.items.map((item) => (
          <li key={item.label}>
            <ItemBody item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TransparencyExplorer() {
  const { transparency } = site;
  const [activeId, setActiveId] = useState(
    transparency.categories[0]?.id ?? "",
  );
  const headingId = useId();
  const active =
    transparency.categories.find((c) => c.id === activeId) ??
    transparency.categories[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-10">
      {/* Mobile: accordion */}
      <div className="space-y-3 lg:hidden">
        {transparency.categories.map((category) => {
          const open = category.id === activeId;
          return (
            <div
              key={category.id}
              className="border-foreground/10 bg-surface overflow-hidden rounded-xl border"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() =>
                  setActiveId((id) => (id === category.id ? "" : category.id))
                }
                className="flex min-h-14 w-full items-start gap-3 px-4 py-4 text-left"
              >
                <span className="text-brand-green font-display text-sm font-semibold tabular-nums">
                  {category.code}
                </span>
                <span className="min-w-0 flex-1 leading-snug font-semibold">
                  {category.title}
                </span>
                <span
                  className={cn(
                    "text-brand-green mt-0.5 shrink-0 transition-transform",
                    open && "rotate-90",
                  )}
                  aria-hidden
                >
                  ›
                </span>
              </button>
              {open ? (
                <div className="border-foreground/10 border-t px-4 py-4">
                  <CategoryDetail category={category} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Desktop: category rail */}
      <nav
        aria-labelledby={headingId}
        className="border-foreground/10 bg-surface/80 hidden h-fit rounded-2xl border p-3 lg:block"
      >
        <p id={headingId} className="sr-only">
          Categorías de transparencia
        </p>
        <ul className="space-y-1">
          {transparency.categories.map((category) => {
            const selected = category.id === active?.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(category.id)}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "flex min-h-12 w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                    selected
                      ? "bg-brand-green/12 text-foreground"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground",
                  )}
                >
                  <span className="font-display text-brand-green text-sm font-semibold tabular-nums">
                    {category.code}
                  </span>
                  <span className="text-sm leading-snug font-semibold">
                    {category.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop: detail panel */}
      <div className="border-foreground/10 bg-surface hidden rounded-2xl border p-6 sm:p-8 lg:block">
        {active ? (
          <>
            <p className="text-muted text-sm">
              Transparencia activa
              <span className="text-foreground/30 mx-2" aria-hidden>
                ›
              </span>
              <span className="text-foreground">
                {active.code}. {active.title}
              </span>
            </p>
            <div className="mt-6">
              <CategoryDetail category={active} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
