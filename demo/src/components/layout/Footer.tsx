import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 px-5 py-10 md:px-8 lg:px-12">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.34em] uppercase">
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {site.location.city} — {site.location.country}. Atuação nacional.
          </p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-3">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.contact.instagram}
          target="_blank"
          rel="noreferrer"
          className="font-mono inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase"
        >
          {site.contact.instagramHandle}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <p className="mt-12 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        © {new Date().getFullYear()} {site.name} — Demo de apresentação
      </p>
    </footer>
  );
}
