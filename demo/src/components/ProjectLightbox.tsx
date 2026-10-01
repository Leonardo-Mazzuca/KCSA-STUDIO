import { useEffect } from "react";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectLightboxProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="projeto-titulo"
      className="fixed inset-0 z-[70] bg-black"
    >
      <div className="grid h-[100svh] md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
        <img
          src={project.image}
          alt={project.alt}
          className="h-[58svh] w-full object-cover md:h-full"
        />
        <div className="flex flex-col justify-between gap-10 overflow-y-auto border-t border-white/10 px-5 py-8 md:border-t-0 md:border-l md:px-10 md:py-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
              {project.category} · {project.year}
            </p>
            <h2
              id="projeto-titulo"
              className="font-display mt-4 text-4xl tracking-tight md:text-5xl"
            >
              {project.title}
            </h2>
            {project.location ? (
              <p className="mt-4 text-sm text-muted">{project.location}</p>
            ) : null}
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-foreground/70">
              Uma imagem selecionada do arquivo de Kelvin Carlos. O instante
              que permanece depois do momento passar.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.28em] uppercase"
          >
            <X className="size-4" aria-hidden="true" />
            Fechar
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label="Fechar projeto"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center border border-white/20 bg-black/40 text-white md:top-6 md:right-6"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
