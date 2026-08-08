import type { MetadataRoute } from "next";

const FALLBACK_SITE_URL = "https://web-portal-co-politica.vercel.app";

function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  return (URL.canParse(raw) ? new URL(raw) : new URL(FALLBACK_SITE_URL)).origin;
}

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
