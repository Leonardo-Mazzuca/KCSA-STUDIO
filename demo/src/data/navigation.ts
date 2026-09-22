export type NavItem = {
  label: string;
  href: string;
};

export const demoPath = "/demo";

export function sectionHash(href: string) {
  const index = href.indexOf("#");
  return index >= 0 ? href.slice(index) : href;
}

export const navigation: NavItem[] = [
  { label: "Início", href: `${demoPath}#inicio` },
  { label: "Sobre", href: `${demoPath}#sobre` },
  { label: "Trabalhos", href: `${demoPath}#trabalhos` },
  { label: "Serviços", href: `${demoPath}#servicos` },
  { label: "Contato", href: `${demoPath}#contato` },
];
