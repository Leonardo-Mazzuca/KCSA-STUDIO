import { services } from "@/data/services";
import { SectionHeader } from "@/components/SectionHeader";

export function Services() {
  return (
    <section id="servicos" className="px-5 py-16 md:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="mb-10 max-w-4xl md:mb-16">
        <SectionHeader
          index="05"
          label="Serviços"
          title="O que podemos criar juntos?"
        />
      </div>

      <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
        {services.map((service) => (
          <li key={service.id} className="py-1.5 first:pt-2 last:pb-2">
            <article className="group grid gap-2 rounded-2xl px-4 py-5 transition-colors duration-500 hover:bg-paper hover:text-ink md:grid-cols-12 md:items-baseline md:gap-8 md:rounded-3xl md:px-7 md:py-8">
              <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase transition-colors group-hover:text-ink/50 md:col-span-2">
                {service.index}
              </p>
              <h3 className="font-display text-2xl tracking-tight md:col-span-4 md:text-4xl lg:text-5xl">
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
