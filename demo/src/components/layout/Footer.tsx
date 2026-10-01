import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 px-5 py-10 md:px-8 lg:px-12">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <p className="font-mono text-[11px] tracking-[0.34em] uppercase">
          {site.name}
        </p>

        <div className="flex flex-col gap-3 sm:items-end">
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-foreground"
          >
            {site.contact.instagramHandle}
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase transition-colors hover:text-foreground"
          >
            {site.contact.email}
          </a>
          <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
            {site.location.city}
          </p>
        </div>
      </div>

      <p className="mt-12 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
