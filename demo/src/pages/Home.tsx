import { About } from "@/components/sections/About";
import { Closing } from "@/components/sections/Closing";
import { Differentiator } from "@/components/sections/Differentiator";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Included } from "@/components/sections/Included";
import { Instagram } from "@/components/sections/Instagram";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Portfolio />
      <About />
      <Differentiator />
      <Services />
      <Testimonials />
      <Included />
      <Instagram />
      <FinalCta />
      <Closing />
    </main>
  );
}
