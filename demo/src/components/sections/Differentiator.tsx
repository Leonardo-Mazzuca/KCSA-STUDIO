import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/data/site";

const lines = ["Seu momento.", "Minha direção.", "Uma história."];

export function Differentiator() {
  return (
    <section id="diferencial" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeader
            index="04"
            label="Direção"
            title="Eu não fotografo apenas o que acontece. Eu procuro o que você sente."
          />
          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-foreground/76">
            <p>
              Meu trabalho une fotografia, audiovisual e direção para
              transformar cada sessão em uma experiência.
            </p>
            <p>
              Você não precisa saber posar. Não precisa saber o que fazer
              diante da câmera. Não precisa interpretar ninguém.
            </p>
            <p>
              Eu conduzo o processo para que você possa simplesmente viver o
              momento.
            </p>
            <p>
              O resultado são imagens naturais, marcantes e com identidade —
              fotografias que não parecem apenas bonitas, mas que têm algo
              para dizer.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <figure>
            <MediaFrame
              src={site.images.differentiator}
              alt={site.images.differentiatorAlt}
              className="aspect-[4/5] w-full md:aspect-[5/6]"
              sizes="(min-width: 1024px) 42vw, 100vw"
              imgClassName="object-[50%_28%]"
            />
          </figure>
        </Reveal>
      </div>

      <Reveal className="mt-20 border-y border-foreground/10 py-10 md:mt-28 md:py-16">
        <p className="font-mono mb-8 text-[10px] tracking-[0.32em] text-muted uppercase">
          A experiência
        </p>
        <ul className="grid gap-6 md:grid-cols-3 md:gap-10">
          {lines.map((line) => (
            <li
              key={line}
              className="font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl"
            >
              {line}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
