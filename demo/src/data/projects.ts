/**
 * Trabalhos selecionados.
 * Títulos, categorias, anos e locais são placeholders editáveis.
 * As imagens estão em /public/images.
 */
export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  location?: string;
  image: string;
  alt: string;
  featured?: boolean;
  layout?: "tall" | "wide" | "square";
};

export const projects: Project[] = [
  {
    id: "gesto-de-fe",
    title: "Gesto de fé",
    category: "Retrato",
    year: "2025",
    location: "São Paulo",
    image: "/images/gesto-de-fe.jpg",
    alt: "Dois homens de jaleco branco em um momento de emoção, um cobrindo o rosto com a mão",
    featured: true,
    layout: "tall",
  },
  {
    id: "maos-no-ar",
    title: "Mãos no ar",
    category: "Documentário",
    year: "2025",
    location: "São Paulo",
    image: "/images/maos-no-ar.jpg",
    alt: "Crianças com as mãos erguidas contra um fundo escuro",
    featured: true,
    layout: "wide",
  },
  {
    id: "luz-de-ouro",
    title: "Luz de ouro",
    category: "Retrato",
    year: "2025",
    image: "/images/luz-de-ouro.jpg",
    alt: "Bebê no colo de um adulto, iluminado por luz de fim de tarde",
    layout: "tall",
  },
  {
    id: "danca",
    title: "Dança",
    category: "Street",
    year: "2025",
    location: "São Paulo",
    image: "/images/danca.jpg",
    alt: "Casal dançando, o homem beija a testa da mulher que sorri de olhos fechados",
    layout: "tall",
  },
  {
    id: "festa-memoria",
    title: "Festa e memória",
    category: "Editorial",
    year: "2025",
    image: "/images/festa-memoria.jpg",
    alt: "Menina sorrindo vestida de festa junina, brincando com fubá no chão",
    layout: "tall",
  },
  {
    id: "palco-gesto",
    title: "Palco",
    category: "Cena",
    year: "2025",
    location: "São Paulo",
    image: "/images/palco-gesto.jpg",
    alt: "Grupo de crianças e jovens no palco, cobrindo o rosto com as mãos",
    layout: "wide",
  },
  {
    id: "voz",
    title: "Voz",
    category: "Performance",
    year: "2025",
    image: "/images/voz.jpg",
    alt: "Dois homens em close, um em primeiro plano de olhos baixos e outro ao microfone",
    layout: "tall",
  },
  {
    id: "palco-ensaio",
    title: "Ensaio",
    category: "Cena",
    year: "2025",
    location: "São Paulo",
    image: "/images/palco-ensaio.jpg",
    alt: "Ensaio teatral em palco escuro, pessoas reunidas ao redor de caixas de madeira",
    layout: "wide",
  },
  {
    id: "biblioteca-samba",
    title: "Essa Biblioteca dá Samba",
    category: "Documentário",
    year: "2025",
    location: "Sapopemba, SP",
    image: "/images/biblioteca-samba-grupo.jpg",
    alt: "Grupo sorrindo em evento cultural da Biblioteca do Samba",
    layout: "tall",
  },
  {
    id: "biblioteca-samba-banner",
    title: "Essa Biblioteca dá Samba",
    category: "Registro",
    year: "2025",
    location: "Sapopemba, SP",
    image: "/images/biblioteca-samba-banner.jpg",
    alt: "Banner do projeto Essa Biblioteca dá Samba com microfone em silhueta",
    layout: "tall",
  },
];

export const heroImage = projects[0];
export const aboutImages = [projects[2], projects[3]];
export const featuredProject = projects[1];
export const selectedWork = projects.filter((project) => project.id !== heroImage.id);
