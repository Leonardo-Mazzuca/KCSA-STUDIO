import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-background" : "bg-transparent",
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        <a
          href="#inicio"
          className="font-mono text-[11px] tracking-[0.34em] uppercase"
        >
          {site.name}
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigation.filter((item) => item.href !== "#contato").map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] tracking-[0.26em] text-foreground/70 uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-paper px-4 py-2 font-mono text-[10px] tracking-[0.26em] text-ink uppercase transition-colors hover:bg-foreground"
          >
            Contato
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
          className="bg-background border-t border-foreground/10 lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex min-h-[calc(100svh-72px)] flex-col justify-between px-5 pt-10 pb-28"
          >
            <ul className="flex flex-col gap-2">
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display flex items-baseline gap-4 text-5xl tracking-tight"
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
