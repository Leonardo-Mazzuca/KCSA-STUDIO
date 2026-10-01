import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { included } from "@/data/included";

export function Included() {
  return (
    <section id="incluso" className="px-5 py-16 md:px-8 md:py-28 lg:px-12 lg:py-32">
      <div className="mb-10 max-w-4xl md:mb-16">
        <SectionHeader
          index="07"
          label="Incluso"
          title="Você cuida do momento. Eu cuido de todo o resto."
        />
      </div>

      <Reveal>
        <ol className="grid gap-x-16 gap-y-0 border-t border-foreground/10 sm:grid-cols-2">
          {included.map((item, index) => (
            <li
              key={item}
              className="flex items-baseline gap-6 border-b border-foreground/10 py-6"
            >
              <span className="font-mono text-[10px] tracking-[0.24em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl tracking-tight md:text-3xl">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
