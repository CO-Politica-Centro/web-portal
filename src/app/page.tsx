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
      <Reveal variant="up">
        <HomeAbout />
      </Reveal>
      <Reveal variant="up" stagger="li">
        <HomePillars />
      </Reveal>
      <Reveal variant="up">
        <HomeHighlights />
      </Reveal>
      <Reveal variant="up">
        <HomeLeadership />
      </Reveal>
      <Reveal variant="up">
        <HomeUpdates />
      </Reveal>
      <Reveal variant="up">
        <HomeNetworks />
      </Reveal>
      <Reveal variant="up">
        <HomeTransparency />
      </Reveal>
      <Reveal variant="up">
        <HomeFaq />
      </Reveal>
      <Reveal variant="fade" delay={0.05}>
        <HomeClosing />
      </Reveal>
    </>
  );
}
