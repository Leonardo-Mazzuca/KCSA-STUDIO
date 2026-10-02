import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="sobre" className="relative overflow-x-clip pt-20 md:pt-0">
      <div className="grid items-end lg:grid-cols-12">
        <Reveal className="relative px-5 md:px-10 lg:col-span-7 lg:px-14 lg:pt-32">
          <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
            03 / Sobre
          </p>
          <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2.1rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.04em]">
            Você já conheceu meu olhar. Agora, conheça quem está por trás dele.
          </h2>
          <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-foreground/72 md:mt-12">
            <p>
              Eu sou Kelvin Carlos, fotógrafo e profissional de audiovisual,
              com formação em Produção Audiovisual, Línguas e Fotografia.
            </p>
            <p>
              Aos 20 anos, transformei minha paixão por imagens em uma forma
              de contar histórias, criar experiências e eternizar momentos.
            </p>
            <p>
              Minha base é São Paulo, mas meu trabalho pode chegar até você.
              Viajo para diferentes estados para fotografar pessoas, projetos
              e histórias que merecem ser vistas de um jeito único.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12 lg:col-span-5 lg:mt-0">
          <figure className="relative">
            <MediaFrame
              src={site.images.about}
              alt={site.images.aboutAlt}
              className="aspect-[4/5] w-full md:aspect-[3/4]"
              sizes="(min-width: 1024px) 42vw, 100vw"
              imgClassName="object-[72%_12%] grayscale"
            />
            <figcaption className="font-display pointer-events-none absolute right-5 bottom-6 left-5 text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.8] tracking-[-0.04em] text-white italic md:right-8 md:bottom-8">
              Prazer, Kelvin.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
