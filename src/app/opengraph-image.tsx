import { SITE_SEO } from "@/lib/seo";
import { ogContentType, ogSize, renderBrandOg } from "@/lib/og-brand";

export const alt = SITE_SEO.ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return renderBrandOg({
    eyebrow: "Movimiento · Colombia",
    title: "CO Politica Centro",
    subtitle: "Centro con ideas. Colombia con futuro.",
  });
}
