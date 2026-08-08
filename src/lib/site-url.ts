const FALLBACK_SITE_URL = "https://web-portal-co-politica.vercel.app";

export function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  return (URL.canParse(raw) ? new URL(raw) : new URL(FALLBACK_SITE_URL)).origin;
}

/** Safe JSON for embedding in a script tag (escape `<` for XSS hygiene). */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
