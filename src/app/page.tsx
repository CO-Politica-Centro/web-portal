import { HomeHero } from "@/components/home/home-hero";
import { HomeAbout } from "@/components/home/home-about";
import { HomePillars } from "@/components/home/home-pillars";
import { HomeHighlights } from "@/components/home/home-highlights";
import { HomeLeadership } from "@/components/home/home-leadership";
import { HomeUpdates } from "@/components/home/home-updates";
import { HomeNetworks } from "@/components/home/home-networks";
import { HomeTransparency } from "@/components/home/home-transparency";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeClosing } from "@/components/home/home-closing";
import { Reveal } from "@/components/motion/reveal";
import { JsonLdFaqPage } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLdFaqPage />
      <HomeHero />
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeAbout />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomePillars />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeHighlights />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeLeadership />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeUpdates />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeNetworks />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeTransparency />
      </Reveal>
      <Reveal variant="up" stagger="[data-reveal-item]">
        <HomeFaq />
      </Reveal>
      <Reveal variant="fade" mode="through">
        <HomeClosing />
      </Reveal>
    </>
  );
}
