/**
 * Trabalhos selecionados — curadoria para o portfólio.
 * Títulos e metadados podem ser editados aqui.
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
    id: "o-olhar",
    title: "O olhar",
    category: "Ensaio",
    year: "2026",
    image: "/images/retrato-mulher.jpg",
    alt: "Mulher olha por cima do ombro de um homem de camisa branca, a mão pousada nas costas",
    featured: true,
    layout: "tall",
  },
  {
    id: "esconderijo",
    title: "Esconderijo",
    category: "Retrato",
    year: "2026",
    image: "/images/coro-maximo.jpg",
    alt: "Criança de jaqueta jeans cobre os olhos com a manga, contra um fundo quente",
    featured: true,
    layout: "tall",
  },
  {
    id: "noiva",
    title: "Noiva",
    category: "Casamento",
    year: "2026",
    image: "/images/noiva.jpg",
    alt: "Noiva com véu e buquê de rosas brancas, sorrindo em uma escada iluminada",
    layout: "tall",
  },
  {
    id: "danca",
    title: "Dança",
    category: "Ensaio",
    year: "2025",
    location: "São Paulo",
    image: "/images/casal.jpg",
    alt: "Casal dançando, o homem beija a testa da mulher que sorri de olhos fechados",
    layout: "tall",
  },
  {
    id: "gesto-de-fe",
    title: "Gesto de fé",
    category: "Documentário",
    year: "2025",
    location: "São Paulo",
    image: "/images/batismo.jpg",
    alt: "Dois homens de jaleco branco em um momento de emoção, um cobrindo o rosto com a mão",
    layout: "tall",
  },
  {
    id: "presenca",
    title: "Presença",
    category: "Evento",
    year: "2026",
    image: "/images/igreja.jpg",
    alt: "Homem canta ao microfone em um palco escuro, iluminado por luz quente",
    layout: "tall",
  },
  {
    id: "samba",
    title: "Toque",
    category: "Documentário",
    year: "2026",
    image: "/images/artista-destaque.jpg",
    alt: "Músico sorri ao tocar um tambor, com microfone em primeiro plano",
    layout: "tall",
  },
  {
    id: "afeto",
    title: "Afeto",
    category: "Família",
    year: "2026",
    image: "/images/crianca-1.jpg",
    alt: "Criança sorri no colo enquanto recebe um beijo no rosto",
    layout: "tall",
  },
  {
    id: "terra",
    title: "Terra",
    category: "Retrato",
    year: "2026",
    image: "/images/crianca-3.jpg",
    alt: "Bebê com o rosto sujo de terra, olhando para o alto",
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
    id: "maos-no-ar",
    title: "Mãos no ar",
    category: "Documentário",
    year: "2025",
    location: "São Paulo",
    image: "/images/maos-no-ar.jpg",
    alt: "Crianças com as mãos erguidas contra um fundo escuro",
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
];

export const instagramImages = [
  projects[2],
  projects[5],
  projects[6],
  projects[7],
  projects[3],
];
