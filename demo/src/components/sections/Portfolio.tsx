import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PhotoPlane } from "@/components/media/PhotoPlane";
import { PhotoRing } from "@/components/media/PhotoRing";
import { PhotoScene, StickyBleed } from "@/components/media/PhotoScene";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { Reveal } from "@/components/Reveal";
import { projectById, type Project } from "@/data/projects";
import { site } from "@/data/site";

function metaFor(project: Project) {
  return `${project.category} · ${project.year}`;
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projectById("esconderijo");
  const olhar = projectById("o-olhar");
  const noiva = projectById("noiva");
  const danca = projectById("danca");
  const fe = projectById("gesto-de-fe");
  const presenca = projectById("presenca");
  const samba = projectById("samba");
  const maos = projectById("maos-no-ar");
  const voz = projectById("voz");
  const strip = [
    "afeto",
    "terra",
    "celebracao",
    "jorge",
    "ritmo",
    "festa",
    "canto",
    "sol",
  ]
    .map(projectById)
    .filter((item): item is Project => Boolean(item));

  return (
    <section id="trabalhos" className="relative">
      <div className="relative z-10 px-5 pt-20 md:px-10 md:pt-32 lg:px-14">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
              02 / Portfólio
            </p>
            <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2.4rem,7.4vw,6.8rem)] leading-[0.82] font-light tracking-[-0.05em]">
              O que fica quando o momento passa.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4 lg:mb-3">
            <div className="max-w-sm space-y-4 text-sm leading-relaxed text-foreground/70 md:text-base">
              <p>Cada fotografia aqui carrega um instante que não se repete.</p>
              <p>
                Meu trabalho é encontrar aquilo que acontece entre uma pose e
                outra: o olhar, o gesto, a conexão, a espontaneidade.
              </p>
              <a
                href="#galeria"
                className="group font-mono mt-2 inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase"
              >
                {site.cta.portfolio}
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div id="galeria" className="relative mt-10 md:-mt-8">
        {featured ? (
          <StickyBleed>
            {(progress) => (
              <button
                type="button"
                onClick={() => setSelected(featured)}
                data-cursor="image"
                className="relative block h-full w-full overflow-hidden"
              >
                <img
                  src={featured.image}
                  alt={featured.alt}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: "50% 22%",
                    transform: `scale(${1.12 - progress * 0.12})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/25" />
                <div className="absolute inset-x-5 bottom-8 flex items-end justify-between gap-6 md:inset-x-14 md:bottom-12">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.32em] text-white/55 uppercase">
                      {metaFor(featured)}
                    </p>
                    <p className="font-display mt-2 text-4xl tracking-tight text-white md:text-7xl">
                      {featured.title}
                    </p>
                  </div>
                  <span className="font-mono hidden text-[10px] tracking-[0.28em] text-white/70 uppercase md:inline">
                    Abrir
                  </span>
                </div>
              </button>
            )}
          </StickyBleed>
        ) : null}

        <PhotoScene className="relative mt-4 overflow-x-clip px-5 md:mt-0 md:px-0">
          {olhar ? (
            <div className="w-[86%] md:w-[54vw] md:-ml-8 lg:-ml-12">
              <PhotoPlane
                src={olhar.image}
                alt={olhar.alt}
                caption={olhar.title}
                meta={metaFor(olhar)}
                tilt
                className="w-full"
                imgClassName="aspect-[3/4] object-[50%_26%]"
                sizes="(min-width: 768px) 54vw, 86vw"
                onOpen={() => setSelected(olhar)}
              />
            </div>
          ) : null}
          {noiva ? (
            <div className="mt-[-18%] ml-auto w-[68%] md:absolute md:top-[12%] md:right-[6%] md:mt-0 md:w-[24vw]">
              <PhotoPlane
                src={noiva.image}
                alt={noiva.alt}
                caption={noiva.title}
                meta={metaFor(noiva)}
                tilt
                intensity={0.9}
                className="w-full"
                imgClassName="aspect-[4/5] object-[50%_18%]"
                sizes="(min-width: 768px) 24vw, 68vw"
                onOpen={() => setSelected(noiva)}
              />
            </div>
          ) : null}
          {voz ? (
            <div className="mt-10 w-[54%] md:absolute md:bottom-[12%] md:left-[58%] md:mt-0 md:w-[15vw]">
              <PhotoPlane
                src={voz.image}
                alt={voz.alt}
                caption={voz.title}
                meta={metaFor(voz)}
                className="w-full"
                imgClassName="aspect-[3/4] object-[50%_20%]"
                sizes="(min-width: 768px) 15vw, 54vw"
                onOpen={() => setSelected(voz)}
              />
            </div>
          ) : null}
        </PhotoScene>

        {danca ? (
          <Reveal>
            <div className="mt-6 md:mt-0">
              <PhotoPlane
                src={danca.image}
                alt={danca.alt}
                caption={danca.title}
                meta={`${danca.location ?? site.location.city} · ${danca.year}`}
                overlay
                className="w-full"
                imgClassName="aspect-[4/5] object-[50%_28%] sm:aspect-[16/8]"
                sizes="100vw"
                onOpen={() => setSelected(danca)}
              />
            </div>
          </Reveal>
        ) : null}

        <div className="relative mt-10 grid items-start gap-6 px-5 md:mt-16 md:grid-cols-12 md:gap-0 md:px-10 lg:px-14">
          {fe ? (
            <Reveal className="md:col-span-6 md:pt-10">
              <PhotoPlane
                src={fe.image}
                alt={fe.alt}
                caption={fe.title}
                meta={metaFor(fe)}
                tilt
                className="w-full md:w-[92%]"
                imgClassName="aspect-[3/4] object-[50%_18%]"
                sizes="(min-width: 768px) 42vw, 100vw"
                onOpen={() => setSelected(fe)}
              />
            </Reveal>
          ) : null}
          {presenca ? (
            <Reveal delay={0.08} className="md:col-span-6 md:-mt-16">
              <PhotoPlane
                src={presenca.image}
                alt={presenca.alt}
                caption={presenca.title}
                meta={metaFor(presenca)}
                className="ml-auto w-[86%] md:w-full"
                imgClassName="aspect-[3/4] object-[50%_16%]"
                sizes="(min-width: 768px) 42vw, 86vw"
                onOpen={() => setSelected(presenca)}
              />
            </Reveal>
          ) : null}
        </div>

        {samba ? (
          <Reveal>
            <div className="relative mt-14 md:mt-20">
              <p className="font-display pointer-events-none absolute top-8 left-5 z-10 text-[clamp(3.5rem,14vw,12rem)] leading-none tracking-[-0.06em] text-white/15 md:top-12 md:left-14">
                Toque
              </p>
              <PhotoPlane
                src={samba.image}
                alt={samba.alt}
                overlay
                caption={samba.title}
                meta={metaFor(samba)}
                className="w-full"
                imgClassName="aspect-[4/5] object-[50%_30%] md:aspect-[16/9]"
                sizes="100vw"
                onOpen={() => setSelected(samba)}
              />
            </div>
          </Reveal>
        ) : null}

        {maos ? (
          <Reveal>
            <div className="mt-6 md:mt-8">
              <PhotoPlane
                src={maos.image}
                alt={maos.alt}
                caption={maos.title}
                meta={metaFor(maos)}
                overlay
                className="w-full"
                imgClassName="aspect-[4/5] object-[50%_40%] sm:aspect-[16/7]"
                sizes="100vw"
                onOpen={() => setSelected(maos)}
              />
            </div>
          </Reveal>
        ) : null}

        <div className="mt-16 md:mt-24">
          <p className="font-mono mb-4 px-5 text-[10px] tracking-[0.32em] text-muted uppercase md:mb-6 md:px-10 lg:px-14">
            Outros instantes
          </p>
          <PhotoRing
            projects={strip}
            onSelect={setSelected}
            paused={Boolean(selected)}
          />
        </div>
      </div>

      <ProjectLightbox project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
