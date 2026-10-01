import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { MediaFrame } from "@/components/MediaFrame";
import { DepthPhoto } from "@/components/media/DepthPhoto";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

function byId(id: string) {
  return projects.find((item) => item.id === id);
}

function ProjectMeta({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        <p className="font-display text-base tracking-tight md:text-2xl">
          {project.title}
        </p>
        <p className="font-mono mt-1 text-[10px] tracking-[0.22em] text-muted uppercase">
          {project.category}
          {project.location ? ` · ${project.location}` : ""}
        </p>
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
        {project.year}
      </span>
    </div>
  );
}

function ProjectButton({
  project,
  className,
  sizes,
  imgClassName,
  onSelect,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  imgClassName?: string;
  onSelect: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={cn("group relative block w-full overflow-hidden text-left", className)}
    >
      <MediaFrame
        src={project.image}
        alt={project.alt}
        className="h-full w-full"
        sizes={sizes}
        imgClassName={imgClassName}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl bg-paper/92 px-4 py-3 text-ink opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <ProjectMeta project={project} className="text-ink" />
      </div>
    </button>
  );
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = byId("esconderijo");
  const olhar = byId("o-olhar");
  const noiva = byId("noiva");
  const samba = byId("samba");
  const danca = byId("danca");
  const presenca = byId("presenca");
  const fe = byId("gesto-de-fe");
  const maos = byId("maos-no-ar");
  const strip = ["afeto", "terra", "festa-memoria", "voz"]
    .map(byId)
    .filter((item): item is Project => Boolean(item));

  return (
    <section id="trabalhos" className="px-5 py-16 md:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="mb-10 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <SectionHeader
            index="02"
            label="Portfólio"
            title="O que fica quando o momento passa."
          />
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="max-w-md space-y-5 text-sm leading-relaxed text-foreground/72 sm:text-base">
            <p>Cada fotografia aqui carrega um instante que não se repete.</p>
            <p>
              Meu trabalho é encontrar aquilo que acontece entre uma pose e
              outra: o olhar, o gesto, a conexão, a espontaneidade.
            </p>
            <p>
              Mais do que registrar pessoas e acontecimentos, busco criar
              imagens que continuem fazendo sentido mesmo muitos anos depois.
            </p>
            <a
              href="#galeria"
              className="group font-mono mt-2 inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase"
            >
              {site.cta.portfolio}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

      <div id="galeria">
        {featured ? (
          <Reveal>
            <DepthPhoto className="w-full" intensity={0.7}>
            <button
              type="button"
              onClick={() => setSelected(featured)}
              className="group relative block w-full overflow-hidden"
            >
              <MediaFrame
                src={featured.image}
                alt={featured.alt}
                className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[16/10]"
                sizes="100vw"
                imgClassName="object-[50%_42%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 md:right-8 md:bottom-8 md:left-8">
                <ProjectMeta project={featured} className="text-white" />
                <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-paper group-hover:text-ink">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </button>
            </DepthPhoto>
          </Reveal>
        ) : null}

        <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-12 md:gap-5">
          {olhar ? (
            <Reveal className="md:col-span-7">
              <ProjectButton
                project={olhar}
                className="relative aspect-[3/4]"
                sizes="(min-width: 768px) 58vw, 100vw"
                imgClassName="object-[50%_28%]"
                onSelect={setSelected}
              />
              <ProjectMeta project={olhar} className="mt-4 md:hidden" />
            </Reveal>
          ) : null}

          <div className="grid gap-4 md:col-span-5 md:gap-5">
            {noiva ? (
              <Reveal delay={0.08}>
                <ProjectButton
                  project={noiva}
                  className="relative aspect-[4/5]"
                  sizes="(min-width: 768px) 38vw, 100vw"
                  imgClassName="object-[50%_22%]"
                  onSelect={setSelected}
                />
                <ProjectMeta project={noiva} className="mt-4 md:hidden" />
              </Reveal>
            ) : null}
            {samba ? (
              <Reveal delay={0.12}>
                <ProjectButton
                  project={samba}
                  className="relative aspect-[4/5]"
                  sizes="(min-width: 768px) 38vw, 100vw"
                  onSelect={setSelected}
                />
                <ProjectMeta project={samba} className="mt-4 md:hidden" />
              </Reveal>
            ) : null}
          </div>
        </div>

        {danca ? (
          <Reveal className="mt-4 md:mt-5">
            <ProjectButton
              project={danca}
              className="relative aspect-[4/5] sm:aspect-[16/9]"
              sizes="100vw"
              imgClassName="object-[50%_30%]"
              onSelect={setSelected}
            />
            <ProjectMeta project={danca} className="mt-4 md:hidden" />
          </Reveal>
        ) : null}

        <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
          {presenca ? (
            <Reveal>
              <ProjectButton
                project={presenca}
                className="relative aspect-[3/4]"
                sizes="(min-width: 768px) 50vw, 100vw"
                imgClassName="object-[50%_20%]"
                onSelect={setSelected}
              />
              <ProjectMeta project={presenca} className="mt-4 md:hidden" />
            </Reveal>
          ) : null}
          {fe ? (
            <Reveal delay={0.08}>
              <ProjectButton
                project={fe}
                className="relative aspect-[3/4]"
                sizes="(min-width: 768px) 50vw, 100vw"
                onSelect={setSelected}
              />
              <ProjectMeta project={fe} className="mt-4 md:hidden" />
            </Reveal>
          ) : null}
        </div>

        {maos ? (
          <Reveal className="mt-4 md:mt-5">
            <ProjectButton
              project={maos}
              className="relative aspect-[4/5] sm:aspect-[16/8]"
              sizes="100vw"
              imgClassName="object-[50%_40%]"
              onSelect={setSelected}
            />
            <ProjectMeta project={maos} className="mt-4 md:hidden" />
          </Reveal>
        ) : null}

        <div className="mt-10 md:mt-24">
          <p className="font-mono mb-5 text-[10px] tracking-[0.28em] text-muted uppercase">
            Outros instantes
          </p>
          <div className="no-scrollbar grid grid-cols-2 gap-3 md:-mx-8 md:flex md:snap-x md:snap-mandatory md:gap-4 md:overflow-x-auto md:px-8 lg:-mx-12 lg:px-12">
            {strip.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelected(project)}
                className="group w-full min-w-0 text-left md:w-[42vw] md:shrink-0 md:snap-start lg:w-[24vw]"
              >
                <MediaFrame
                  src={project.image}
                  alt={project.alt}
                  className="aspect-[4/5]"
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 42vw, 48vw"
                />
                <ProjectMeta project={project} className="mt-3" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProjectLightbox project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
