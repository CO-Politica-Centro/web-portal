import { describe, expect, it } from "vitest";
import { site } from "@/content/site";

describe("site content", () => {
  it("tiene exactamente cuatro pilares con slugs únicos", () => {
    expect(site.pillars).toHaveLength(4);
    const slugs = site.pillars.map((pillar) => pillar.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("expone contacto y comunidades oficiales", () => {
    expect(site.urls.email).toContain("@");
    expect(site.urls.beacons).toMatch(/^https:\/\//);
    expect(site.urls.capacitacion).toBe(
      "https://web-capacitacion-co-politica.vercel.app",
    );
    expect(site.nav.some((item) => item.external)).toBe(true);
  });
});
