import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/content/site";
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

const FALLBACK_SITE_URL = "http://localhost:3000";

function resolveMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
  return URL.canParse(raw) ? new URL(raw) : new URL(FALLBACK_SITE_URL);
}

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Portal`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: resolveMetadataBase(),
  icons: {
    icon: [{ url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.name,
    title: site.tagline,
    description: site.description,
    images: [
      {
        url: "/brand/logo-flor-social.jpg",
        width: 1024,
        height: 1024,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: site.tagline,
    description: site.description,
    images: ["/brand/logo-flor-social.jpg"],
  },
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
