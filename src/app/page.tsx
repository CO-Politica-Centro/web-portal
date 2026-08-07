import { HomeHero } from "@/components/home/home-hero";
import { HomeAbout } from "@/components/home/home-about";
import { HomePillars } from "@/components/home/home-pillars";
import { HomeHighlights } from "@/components/home/home-highlights";
import { HomeLeadership } from "@/components/home/home-leadership";
import { HomeUpdates } from "@/components/home/home-updates";
import { HomeCommunities } from "@/components/home/home-communities";
import { HomeClosing } from "@/components/home/home-closing";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomePillars />
      <HomeHighlights />
      <HomeLeadership />
      <HomeUpdates />
      <HomeCommunities />
      <HomeClosing />
    </>
  );
}
