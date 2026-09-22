import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";

export function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Marquee />
      <About />
      <Manifesto />
      <Portfolio />
      <Location />
      <Services />
      <Contact />
    </main>
  );
}
