export type NavItem = {
  label: string;
  href: string;
};

export const demoPath = "";

export function sectionHash(href: string) {
  const index = href.indexOf("#");
  return index >= 0 ? href.slice(index) : href;
}

export const navigation: NavItem[] = [
  { label: "Início", href: "#inicio" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];
