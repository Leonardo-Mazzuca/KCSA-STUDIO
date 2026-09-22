import { services } from "@/data/services";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  return (
    <section id="servicos" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader index="04" label="Serviços" title="O que o estúdio faz." />
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Fotografia, direção e produção visual — com o formato que o
          projeto pedir.
        </p>
      </div>

      <ul className="border-y border-foreground/10">
        {services.map((service) => (
          <li key={service.id} className="border-b border-foreground/10 last:border-b-0">
            <article className="group grid gap-4 px-2 py-8 transition-colors duration-300 hover:bg-paper hover:text-ink md:grid-cols-12 md:items-baseline md:gap-8 md:px-5 md:py-10">
              <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase transition-colors group-hover:text-ink/50 md:col-span-2">
                {service.index}
              </p>
              <h3 className="font-display flex items-baseline gap-3 text-3xl tracking-tight md:col-span-4 md:text-4xl lg:text-5xl">
                {service.title}
                <ArrowUpRight className="size-5 translate-y-1 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/70 md:col-span-6 md:text-base">
                {service.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
