"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="section-space border-foreground/10 relative border-t"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]"
      />
      <div className="container-page relative max-w-3xl">
        <h2 id="faq-heading" className="section-title">
          Preguntas frecuentes
        </h2>

        <ul className="mt-10 space-y-4">
          {site.faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <li key={item.question}>
                <div className="bg-surface border-foreground/10 border shadow-[0_1px_0_rgb(26_31_22_/0.04)]">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-14 w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-brand-green mt-0.5 inline-flex size-6 shrink-0 items-center justify-center text-lg font-semibold transition-transform duration-200",
                        isOpen && "rotate-90",
                      )}
                    >
                      ›
                    </span>
                    <span className="leading-snug font-semibold">
                      {item.question}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="border-foreground/8 border-t px-4 pb-5 sm:px-5"
                  >
                    <p className="text-muted pt-4 pl-9 text-base leading-relaxed">
                      {item.answer}
                    </p>
                    {item.links && item.links.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 pl-9">
                        {item.links.map((link) => {
                          const className =
                            "text-brand-green inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline";

                          if (link.external) {
                            return (
                              <li key={link.href}>
                                <a
                                  href={link.href}
                                  className={className}
                                  {...(link.href.startsWith("mailto:")
                                    ? {}
                                    : {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                      })}
                                >
                                  {link.label}
                                </a>
                              </li>
                            );
                          }

                          return (
                            <li key={link.href}>
                              <Link href={link.href} className={className}>
                                {link.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
