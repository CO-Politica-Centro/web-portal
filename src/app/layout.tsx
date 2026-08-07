import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CO Politica Centro — Portal",
    template: "%s · CO Politica Centro",
  },
  description:
    "Portal del movimiento político de centro en Colombia. Liberalismo social, liderado por Rafael Solano.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-foreground/10 text-muted border-t px-6 py-8 text-sm">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>CO Politica Centro — movimiento en consolidación.</p>
            <a
              className="hover:text-foreground underline-offset-4 hover:underline"
              href="mailto:rafaelsolanov@web.de"
            >
              rafaelsolanov@web.de
            </a>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
