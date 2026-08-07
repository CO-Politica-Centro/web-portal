import { HomeHero } from "@/components/home/home-hero";
import { HomeAbout } from "@/components/home/home-about";
import { HomePillars } from "@/components/home/home-pillars";
import { HomeHighlights } from "@/components/home/home-highlights";
import { HomeLeadership } from "@/components/home/home-leadership";
import { HomeUpdates } from "@/components/home/home-updates";
import { HomeCommunities } from "@/components/home/home-communities";
import { HomeClosing } from "@/components/home/home-closing";
import { Reveal } from "@/components/motion/reveal";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Reveal>
        <HomeAbout />
      </Reveal>
      <Reveal stagger="li">
        <HomePillars />
      </Reveal>
      <Reveal>
        <HomeHighlights />
      </Reveal>
      <Reveal>
        <HomeLeadership />
      </Reveal>
      <Reveal>
        <HomeUpdates />
      </Reveal>
      <Reveal>
        <HomeCommunities />
      </Reveal>
      <Reveal>
        <HomeClosing />
      </Reveal>
    </>
  );
}
