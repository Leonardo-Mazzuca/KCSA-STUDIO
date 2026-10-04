import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
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
      <BeforeAfter />
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
