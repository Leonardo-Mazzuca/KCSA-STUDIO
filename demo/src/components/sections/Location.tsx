import { projects } from "@/data/projects";
import { site } from "@/data/site";

export function Location() {
  const background = projects.find((item) => item.id === "palco-ensaio");

  return (
    <section
      aria-labelledby="localizacao-titulo"
      className="relative isolate min-h-[70svh] overflow-hidden"
    >
      {background ? (
        <img
          src={background.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 flex min-h-[70svh] flex-col justify-end px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <p className="font-mono text-[10px] tracking-[0.32em] text-white/60 uppercase">
          Localização
        </p>
        <h2
          id="localizacao-titulo"
          className="font-display mt-6 text-[clamp(3.2rem,12vw,9rem)] leading-[0.82] tracking-[-0.05em] text-white"
        >
          {site.location.city} —{" "}
          <em className="italic">{site.location.state}</em>
        </h2>
        <p className="mt-8 max-w-lg text-lg text-white/80">
          {site.location.coverage}. O set pode ser aqui, ou onde a imagem
          precisar acontecer.
        </p>
      </div>
    </section>
  );
}
