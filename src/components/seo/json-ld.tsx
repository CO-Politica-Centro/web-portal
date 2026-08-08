import { site } from "@/content/site";

const FALLBACK_SITE_URL = "https://web-portal-co-politica.vercel.app";

export function siteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  return (URL.canParse(raw) ? new URL(raw) : new URL(FALLBACK_SITE_URL)).origin;
}

export function JsonLdOrganization() {
  const origin = siteOrigin();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: origin,
    logo: `${origin}/brand/logo-flor-512.png`,
    email: site.urls.email,
    sameAs: [
      site.urls.beacons,
      ...site.leadership.links.map((link) => link.href),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdWebsite() {
  const origin = siteOrigin();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: site.description,
    url: origin,
    inLanguage: "es-CO",
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdFaqPage() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
