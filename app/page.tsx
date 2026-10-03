import Stats from "@/components/common/Stats";
import Marquee from "@/components/fx/Marquee";
import Contact from "@/components/sections/Contact";
import Dossier from "@/components/sections/Dossier";
import Hero from "@/components/sections/Hero";
import Junkyard from "@/components/sections/Junkyard";
import Lab from "@/components/sections/Lab";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import { marqueeStack } from "@/data/stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={marqueeStack} label={`Stack: ${marqueeStack.join(", ")}`} />
      <Stats />
      <Services />
      <Work />
      <Lab />
      <Junkyard />
      <Dossier />
      <Contact />
    </main>
  );
}
