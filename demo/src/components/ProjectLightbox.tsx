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
      <div className="flex h-svh min-h-0 flex-col">
        <div className="relative min-h-0 flex-1 overflow-hidden px-4 py-16 md:px-16 md:py-12">
          <img
            src={project.image}
            alt={project.alt}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex items-end justify-between gap-6 px-5 py-5 md:px-10 md:py-7">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.28em] text-white/50 uppercase">
              {project.category}
              {project.location ? ` · ${project.location}` : ""} · {project.year}
            </p>
            <h2
              id="projeto-titulo"
              className="font-display mt-1 truncate text-2xl tracking-tight md:text-4xl"
            >
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono inline-flex shrink-0 items-center gap-3 text-[10px] tracking-[0.28em] uppercase"
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
        className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center text-white md:top-6 md:right-6"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
