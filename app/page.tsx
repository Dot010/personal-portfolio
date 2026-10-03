import Stats from "@/components/common/Stats";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Resume from "@/components/sections/Resume";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Resume />
      <Work />
      <Contact />
    </main>
  );
}
