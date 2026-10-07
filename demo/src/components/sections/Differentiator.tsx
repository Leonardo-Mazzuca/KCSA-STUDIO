import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const lines = ["Seu momento.", "Minha direção.", "Uma história."];

export function Differentiator() {
  return (
    <section id="diferencial" className="relative mt-16 min-h-svh overflow-hidden md:mt-28">
      <img
        src={site.images.differentiator}
        alt={site.images.differentiatorAlt}
        sizes="100vw"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 28%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 py-16 md:px-10 md:py-24 lg:px-14">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.36em] text-white/55 uppercase">
            04 / Direção
          </p>
          <h2 className="font-display mt-5 max-w-[18ch] text-[clamp(2.2rem,6.4vw,5.8rem)] leading-[0.9] tracking-[-0.04em] text-white">
            Eu não fotografo apenas o que acontece. Eu procuro o que você sente.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 max-w-lg space-y-4 text-sm leading-relaxed text-white/72 md:mt-10 md:text-base">
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
              momento. O resultado são imagens naturais, marcantes e com
              identidade.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-2 md:mt-16 md:grid-cols-3 md:gap-8">
          {lines.map((line) => (
            <li
              key={line}
              className="font-display text-3xl leading-[0.9] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
