import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="h-24 bg-gradient-to-b from-black via-black/70 to-transparent" />
      </div>

      <div className="relative flex items-center justify-between px-5 py-4 md:px-10 lg:px-14">
        <a
          href="#inicio"
          className="font-mono text-[11px] tracking-[0.4em] uppercase"
        >
          {site.brand}
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation
            .filter((item) => item.href !== "#contato")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] tracking-[0.28em] text-foreground/65 uppercase transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          <a
            href={site.contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="font-mono inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase transition-colors hover:text-paper"
          >
            {site.contact.whatsappLabel}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="bg-background/95 relative min-h-[calc(100svh-72px)] backdrop-blur-sm lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex min-h-[calc(100svh-72px)] flex-col justify-between px-5 pt-10 pb-10"
          >
            <ul className="flex flex-col gap-1">
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={
                      item.href === "#contato"
                        ? site.contact.whatsapp
                        : item.href
                    }
                    target={item.href === "#contato" ? "_blank" : undefined}
                    rel={item.href === "#contato" ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="font-display flex items-baseline gap-4 py-2 text-5xl tracking-tight"
                  >
                    <span className="font-mono text-[10px] tracking-[0.24em] text-muted">
                      0{index + 1}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
              {site.location.city} · {site.role}
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
