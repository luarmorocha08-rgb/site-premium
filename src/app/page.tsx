import { Hero } from "@/components/sections/Hero";
import { Discover } from "@/components/sections/Discover";
import { Featured } from "@/components/sections/Featured";
import { Cinematic } from "@/components/sections/Cinematic";
import { BestSellers } from "@/components/sections/BestSellers";
import { FragranceFinder } from "@/components/sections/FragranceFinder";
import { Gifts } from "@/components/sections/Gifts";
import { About } from "@/components/sections/About";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Discover />
      <Featured />
      <Cinematic />
      <BestSellers />
      <FragranceFinder />
      <Gifts />
      <About />
      <InstagramFeed />
      <FinalCta />
    </>
  );
}
