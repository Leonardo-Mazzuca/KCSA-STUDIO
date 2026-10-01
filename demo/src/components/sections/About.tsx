import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="sobre" className="relative px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-7 lg:sticky lg:top-28">
          <SectionHeader
            index="03"
            label="Sobre"
            title="Você já conheceu meu olhar. Agora, conheça quem está por trás dele."
          />
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-foreground/76">
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
            <p className="font-display text-2xl italic text-foreground">
              Prazer, Kelvin.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5">
          <figure className="mx-auto max-w-sm lg:ml-auto lg:max-w-none">
            <MediaFrame
              src={site.images.about}
              alt={site.images.aboutAlt}
              className="aspect-[4/5] w-full"
              sizes="(min-width: 1024px) 34vw, 80vw"
              imgClassName="object-[72%_12%] grayscale"
            />
            <figcaption className="font-mono mt-4 text-[10px] tracking-[0.22em] text-muted uppercase">
              {site.name} · {site.location.city}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
