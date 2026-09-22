import { ArrowUpRight, AtSign, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const channels = [
  {
    label: site.contact.instagramHandle,
    href: site.contact.instagram,
    icon: AtSign,
    name: "Instagram",
  },
  {
    label: site.contact.whatsappLabel,
    href: site.contact.whatsapp,
    icon: MessageCircle,
    name: "WhatsApp",
  },
  {
    label: site.contact.email,
    href: `mailto:${site.contact.email}`,
    icon: Mail,
    name: "E-mail",
  },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-paper px-5 py-28 text-ink md:px-8 md:py-36 lg:px-12"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-0 font-display text-[28vw] leading-none tracking-[-0.08em] text-ink/[0.06] select-none"
      >
        KCSA
      </p>

      <p className="font-mono text-[10px] tracking-[0.32em] text-ink/45 uppercase">
        05 — Contato
      </p>
      <h2 className="font-display mt-6 max-w-5xl text-[clamp(2.5rem,6.6vw,6.2rem)] leading-[0.9] tracking-[-0.04em] text-balance">
        {site.cta.headline}
      </h2>
      <p className="mt-8 max-w-xl text-base text-ink/65 sm:text-lg">
        {site.cta.support}
      </p>

      <div className="mt-12">
        <Button
          asChild
          size="lg"
          className="bg-ink text-paper hover:bg-foreground hover:text-ink"
        >
          <a href={`mailto:${site.contact.email}`}>
            {site.cta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <ul className="mt-20 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-3">
        {channels.map((channel) => (
          <li key={channel.name}>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center justify-between gap-4 py-2"
            >
              <span className="flex items-center gap-3">
                <channel.icon className="size-4" aria-hidden="true" />
                <span>
                  <span className="font-mono block text-[10px] tracking-[0.24em] text-ink/45 uppercase">
                    {channel.name}
                  </span>
                  <span className="mt-1 block text-sm">{channel.label}</span>
                </span>
              </span>
              <ArrowUpRight
                className="size-4 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
