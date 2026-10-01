import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { instagramImages } from "@/data/projects";
import { site } from "@/data/site";

export function Instagram() {
  return (
    <section id="instagram" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <SectionHeader
            index="08"
            label="Instagram"
            title="O trabalho continua por lá."
          />
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="max-w-md space-y-5 text-sm leading-relaxed text-foreground/72 sm:text-base">
            <p>Algumas histórias não cabem em um único portfólio.</p>
            <p>
              No Instagram, compartilho novos trabalhos, bastidores, projetos,
              processos e momentos que acontecem entre uma fotografia e outra.
            </p>
            <p>Acompanhe meu olhar além daqui.</p>
            <p className="font-mono pt-2 text-[11px] tracking-[0.28em] uppercase">
              {site.contact.instagramHandle}
            </p>
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="group font-mono inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase"
            >
              {site.cta.instagram}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {instagramImages.map((image, index) => (
            <a
              key={image.id}
              href={site.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className={`group ${index === 4 ? "hidden md:block" : ""}`}
              aria-label={`Ver ${image.title} no Instagram`}
            >
              <MediaFrame
                src={image.image}
                alt={image.alt}
                className={`aspect-[4/5] ${index === 2 ? "md:mt-10" : ""} ${index === 1 ? "md:-mt-6" : ""}`}
                sizes="(min-width: 768px) 18vw, 48vw"
              />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
