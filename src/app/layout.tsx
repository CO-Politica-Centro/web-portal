import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLdOrganization, JsonLdWebsite } from "@/components/seo/json-ld";
import { motionInitScript } from "@/lib/motion";
import { getSiteUrl, SITE_SEO } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_SEO.titleDefault,
    template: SITE_SEO.titleTemplate,
  },
  description: SITE_SEO.description,
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_SEO.siteName,
  authors: [{ name: SITE_SEO.siteName }],
  creator: SITE_SEO.siteName,
  keywords: [
    "CO Politica Centro",
    "centro político Colombia",
    "liberalismo social",
    "propuestas",
    "transparencia",
    "voluntariado político",
  ],
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE_SEO.siteName,
    title: SITE_SEO.titleDefault,
    description: SITE_SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SEO.titleDefault,
    description: SITE_SEO.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
        <JsonLdOrganization />
        <JsonLdWebsite />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
