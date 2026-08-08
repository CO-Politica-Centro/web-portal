import type { MetadataRoute } from "next";

const FALLBACK_SITE_URL = "https://web-portal-co-politica.vercel.app";

function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  return (URL.canParse(raw) ? new URL(raw) : new URL(FALLBACK_SITE_URL)).origin;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  const lastModified = new Date();

  return [
    { url: origin, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${origin}/propuestas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${origin}/equipo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${origin}/transparencia`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${origin}/contacto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
