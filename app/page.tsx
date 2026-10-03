import Stats from "@/components/common/Stats";
import Marquee from "@/components/fx/Marquee";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Junkyard from "@/components/sections/Junkyard";
import Lab from "@/components/sections/Lab";
import Resume from "@/components/sections/Resume";
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
      <Resume />
      <Work />
      <Lab />
      <Junkyard />
      <Contact />
    </main>
  );
}
