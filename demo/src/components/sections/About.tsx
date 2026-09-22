import { aboutImages } from "@/data/projects";
import { site } from "@/data/site";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function About() {
  const [portrait, overlay] = aboutImages;

  return (
    <section id="sobre" className="relative px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeader
            index="02"
            label="Sobre"
            title="O estúdio atrás do quadro."
          />
          <div className="mt-10 max-w-md space-y-6 text-base leading-relaxed text-foreground/78 sm:text-lg">
            <p>
              O {site.name} trabalha imagem como presença — não como volume.
              Cada enquadramento é uma decisão de ritmo, luz e silêncio.
            </p>
            <p>
              A prática nasce do olhar documental e editorial: pessoas, gesto,
              fé, palco e rua. O que permanece depois da foto é o que
              interessa.
            </p>
            <p>
              Base em {site.location.city}, com trânsito pelo Brasil. O projeto
              define o território — não o contrário.
            </p>
          </div>
          <p className="font-mono mt-12 text-[10px] tracking-[0.28em] text-muted uppercase">
            {site.location.city} — {site.location.state} · {site.location.coverage}
          </p>
        </Reveal>

        <div className="relative lg:col-span-7">
          {portrait ? (
            <Reveal>
              <figure className="group">
                <MediaFrame
                  src={portrait.image}
                  alt={portrait.alt}
                  className="aspect-[4/5] w-full md:aspect-[3/4]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="font-mono mt-3 text-[10px] tracking-[0.22em] text-muted uppercase">
                  {portrait.title} · {portrait.year}
                </figcaption>
              </figure>
            </Reveal>
          ) : null}

          {overlay ? (
            <Reveal
              delay={0.12}
              className="-mt-20 ml-auto w-[62%] md:-mt-36 md:w-[48%]"
            >
              <figure className="group border border-background shadow-[0_0_0_10px_#050505]">
                <MediaFrame
                  src={overlay.image}
                  alt={overlay.alt}
                  className="aspect-[4/5]"
                  sizes="(min-width: 1024px) 24vw, 58vw"
                />
              </figure>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
