export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "ensaios",
    index: "01",
    title: "Ensaios",
    description:
      "Retratos, ensaios individuais, casal, família ou projetos autorais. Uma experiência pensada para traduzir sua personalidade em imagens.",
  },
  {
    id: "eventos",
    index: "02",
    title: "Eventos",
    description:
      "A espontaneidade de cada momento, a energia do ambiente e aqueles detalhes que passam rápido demais para serem percebidos.",
  },
  {
    id: "casamentos",
    index: "03",
    title: "Casamentos",
    description:
      "Mais do que registrar uma cerimônia, contar a história de um dia inteiro através de emoções, encontros e pequenos detalhes.",
  },
  {
    id: "retratos",
    index: "04",
    title: "Retratos",
    description:
      "Imagens que comunicam presença, personalidade e identidade — seja para uso pessoal ou profissional.",
  },
  {
    id: "corporativo",
    index: "05",
    title: "Corporativo",
    description:
      "Fotografia profissional para pessoas, marcas, equipes e empresas que precisam comunicar quem são através da imagem.",
  },
  {
    id: "audiovisual",
    index: "06",
    title: "Audiovisual",
    description:
      "Além da fotografia, desenvolvo projetos audiovisuais que unem movimento, narrativa, estética e identidade.",
  },
];
