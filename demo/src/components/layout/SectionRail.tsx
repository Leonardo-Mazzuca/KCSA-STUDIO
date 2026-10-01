import { useEffect, useState } from "react";
import { navigation, sectionHash } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SectionRail() {
  const [active, setActive] = useState(navigation[0]?.href ?? "#inicio");

  useEffect(() => {
    const sectionNodes = navigation
      .map((item) => ({
        href: item.href,
        node: document.querySelector(sectionHash(item.href)),
      }))
      .filter((item): item is { href: string; node: Element } => Boolean(item.node));

    if (!sectionNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const match = sectionNodes.find((item) => item.node === visible?.target);
        if (match) setActive(match.href);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -45% 0px" },
    );

    sectionNodes.forEach((item) => observer.observe(item.node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Seções"
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {navigation.map((item, index) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group flex items-center justify-end gap-3"
              aria-current={active === item.href ? "true" : undefined}
            >
              <span className="font-mono text-[9px] tracking-[0.22em] text-muted uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.label}
              </span>
              <span
                className={cn(
                  "block h-px transition-all duration-300",
                  active === item.href
                    ? "w-8 bg-foreground"
                    : "w-4 bg-foreground/35 group-hover:w-6 group-hover:bg-foreground",
                )}
              />
              <span className="sr-only">{`0${index + 1}`}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
