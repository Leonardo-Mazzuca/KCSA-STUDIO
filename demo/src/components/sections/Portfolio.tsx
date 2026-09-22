import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  featuredProject,
  projects,
  type Project,
} from "@/data/projects";
import { cn } from "@/lib/utils";

function ProjectMeta({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        <p className="font-display text-xl tracking-tight md:text-2xl">
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
  onSelect,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  onSelect: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={cn("group relative block w-full overflow-hidden text-left", className)}
    >
      <MediaFrame src={project.image} alt={project.alt} className="h-full w-full" sizes={sizes} />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35 group-focus-visible:bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-paper px-4 py-4 text-ink transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <ProjectMeta project={project} className="text-ink" />
      </div>
    </button>
  );
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = featuredProject;
  const danca = projects.find((item) => item.id === "danca");
  const festa = projects.find((item) => item.id === "festa-memoria");
  const voz = projects.find((item) => item.id === "voz");
  const palco = projects.find((item) => item.id === "palco-gesto");
  const ensaio = projects.find((item) => item.id === "palco-ensaio");
  const strip = projects.filter((item) =>
    ["biblioteca-samba", "biblioteca-samba-banner", "gesto-de-fe", "luz-de-ouro"].includes(
      item.id,
    ),
  );

  return (
    <section id="trabalhos" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          index="03"
          label="Trabalhos selecionados"
          title="Selected Work"
        />
        <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
          Uma edição curta do olhar. A composição segue a imagem — não o
          formato.
        </p>
      </div>

      {featured ? (
        <Reveal>
          <button
            type="button"
            onClick={() => setSelected(featured)}
            className="group relative block w-full overflow-hidden"
          >
            <MediaFrame
              src={featured.image}
              alt={featured.alt}
              className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]"
              sizes="100vw"
              imgClassName="object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 md:right-8 md:bottom-8 md:left-8">
              <ProjectMeta project={featured} className="text-white" />
              <span className="inline-flex size-12 items-center justify-center border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-paper group-hover:text-ink">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </div>
          </button>
        </Reveal>
      ) : null}

      <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-5">
        {danca ? (
          <Reveal className="md:col-span-7">
            <ProjectButton
              project={danca}
              className="relative aspect-[3/4]"
              sizes="(min-width: 768px) 58vw, 100vw"
              onSelect={setSelected}
            />
            <ProjectMeta project={danca} className="mt-4 md:hidden" />
          </Reveal>
        ) : null}

        <div className="grid gap-6 md:col-span-5 md:gap-5">
          {festa ? (
            <Reveal delay={0.08}>
              <ProjectButton
                project={festa}
                className="relative aspect-[4/5]"
                sizes="(min-width: 768px) 38vw, 100vw"
                onSelect={setSelected}
              />
              <ProjectMeta project={festa} className="mt-4 md:hidden" />
            </Reveal>
          ) : null}
          {voz ? (
            <Reveal delay={0.12}>
              <ProjectButton
                project={voz}
                className="relative aspect-[4/5]"
                sizes="(min-width: 768px) 38vw, 100vw"
                onSelect={setSelected}
              />
              <ProjectMeta project={voz} className="mt-4 md:hidden" />
            </Reveal>
          ) : null}
        </div>
      </div>

      {palco ? (
        <Reveal className="mt-6 md:mt-5">
          <ProjectButton
            project={palco}
            className="relative aspect-[4/5] sm:aspect-[16/9]"
            sizes="100vw"
            onSelect={setSelected}
          />
          <ProjectMeta project={palco} className="mt-4 md:hidden" />
        </Reveal>
      ) : null}

      {ensaio ? (
        <Reveal className="mt-6 md:mt-5">
          <ProjectButton
            project={ensaio}
            className="relative aspect-[3/4] sm:aspect-[16/10]"
            sizes="100vw"
            onSelect={setSelected}
          />
          <ProjectMeta project={ensaio} className="mt-4 md:hidden" />
        </Reveal>
      ) : null}

      <div className="mt-16 md:mt-24">
        <p className="font-mono mb-6 text-[10px] tracking-[0.28em] text-muted uppercase">
          Contact sheet
        </p>
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
          {strip.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              className="group w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw]"
            >
              <MediaFrame
                src={project.image}
                alt={project.alt}
                className="aspect-[4/5]"
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 72vw"
              />
              <ProjectMeta project={project} className="mt-4" />
            </button>
          ))}
        </div>
      </div>

      <ProjectLightbox project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
