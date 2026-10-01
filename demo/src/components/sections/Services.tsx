import { services } from "@/data/services";
import { SectionHeader } from "@/components/SectionHeader";

export function Services() {
  return (
    <section id="servicos" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="mb-16 max-w-4xl">
        <SectionHeader
          index="05"
          label="Serviços"
          title="O que podemos criar juntos?"
        />
      </div>

      <ul className="border-y border-foreground/10">
        {services.map((service) => (
          <li key={service.id} className="border-b border-foreground/10 last:border-b-0">
            <article className="group grid gap-4 px-1 py-8 transition-colors duration-300 hover:bg-paper hover:text-ink md:grid-cols-12 md:items-baseline md:gap-8 md:px-5 md:py-10">
              <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase transition-colors group-hover:text-ink/50 md:col-span-2">
                {service.index}
              </p>
              <h3 className="font-display text-3xl tracking-tight md:col-span-4 md:text-4xl lg:text-5xl">
                {service.title}
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
