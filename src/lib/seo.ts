import type { Metadata } from "next";
import { siteOrigin } from "@/lib/site-url";

export function getSiteUrl(): string {
  return siteOrigin();
}

export const SITE_SEO = {
  titleDefault: "CO Politica Centro — Ideas claras para Colombia",
  titleTemplate: "%s · CO Politica Centro",
  description:
    "Movimiento de centro liberal social: propuestas concretas, transparencia y comunidad para construir futuro.",
  siteName: "CO Politica Centro",
  ogAlt: "CO Politica Centro — Centro con ideas. Colombia con futuro.",
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute URL or path under public/. Omit to use root opengraph-image. */
  image?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
};

/** Shared title/description/canonical/OG/Twitter for route pages. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  robots,
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      locale: "es_CO",
      siteName: SITE_SEO.siteName,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
