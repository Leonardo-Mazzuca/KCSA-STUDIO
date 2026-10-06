import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PhotoPlane } from "@/components/media/PhotoPlane";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { Reveal } from "@/components/Reveal";
import { projectById, type Project } from "@/data/projects";
import { site } from "@/data/site";

function metaFor(project: Project) {
  return `${project.category} · ${project.year}`;
}

const galleryIds = [
  "esconderijo",
  "o-olhar",
  "noiva",
  "danca",
  "clareza",
  "mestre",
  "gesto-de-fe",
  "samba",
  "festa",
  "colo",
  "celebracao",
  "jorge",
  "afeto",
  "terra",
  "sol",
  "ritmo",
  "presenca",
  "canto",
  "maos-no-ar",
  "voz",
] as const;

const crops: Record<string, string> = {
  esconderijo: "object-[48%_42%]",
  "o-olhar": "object-[50%_26%]",
  noiva: "object-[50%_18%]",
  danca: "object-[50%_28%]",
  clareza: "object-[50%_18%]",
  mestre: "object-[50%_18%]",
  "gesto-de-fe": "object-[50%_22%]",
  samba: "object-[50%_28%]",
  festa: "object-[50%_32%]",
  colo: "object-[50%_36%]",
  celebracao: "object-[50%_28%]",
  jorge: "object-[50%_40%]",
  afeto: "object-[50%_32%]",
  terra: "object-[50%_28%]",
  sol: "object-[50%_30%]",
  ritmo: "object-[50%_40%]",
  presenca: "object-[50%_20%]",
  canto: "object-[50%_22%]",
  "maos-no-ar": "object-[48%_38%]",
  voz: "object-[48%_24%]",
};

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const gallery = galleryIds
    .map(projectById)
    .filter((item): item is Project => Boolean(item));

  return (
    <section id="trabalhos" className="relative">
      <div className="relative z-20 bg-background px-5 pt-24 pb-12 md:px-10 md:pt-32 md:pb-16 lg:px-14">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.36em] text-muted uppercase">
            02 / Portfólio
          </p>
          <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2.4rem,7.4vw,6.8rem)] leading-[0.88] font-light tracking-tighter">
            O que fica quando o momento passa.
          </h2>
          <div className="mt-8 max-w-md space-y-4 text-sm leading-relaxed text-foreground/70 md:mt-10 md:text-base">
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

      <div id="galeria" className="relative">
        <div className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:gap-5 md:gap-6 md:px-10 lg:gap-7 lg:px-14">
          {gallery.map((project, index) => (
            <PhotoPlane
              key={project.id}
              src={project.image}
              alt={project.alt}
              caption={project.title}
              meta={metaFor(project)}
              overlay
              priority={index < 4}
              className="w-full"
              imgClassName={`aspect-[4/5] ${crops[project.id] ?? "object-center"}`}
              sizes="(min-width: 640px) 48vw, 100vw"
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectLightbox project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
