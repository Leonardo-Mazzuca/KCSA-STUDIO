/**
 * Serviços exibidos no site.
 * Inclua, remova ou reordene itens conforme o portfólio real do estúdio.
 */
export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "fotografia",
    index: "01",
    title: "Fotografia",
    description:
      "Retrato, documentário e ensaio com direção de luz e enquadramento.",
  },
  {
    id: "direcao",
    index: "02",
    title: "Direção criativa",
    description:
      "Conceito visual, ritmo e presença para projetos que pedem autoria.",
  },
  {
    id: "producao",
    index: "03",
    title: "Produção visual",
    description:
      "Do briefing à entrega: set, sequência e curadoria da imagem final.",
  },
  {
    id: "conteudo",
    index: "04",
    title: "Conteúdo",
    description:
      "Narrativa em imagem para marcas, cultura e projetos autorais.",
  },
  {
    id: "autorais",
    index: "05",
    title: "Projetos personalizados",
    description:
      "Encomendas sob medida — quando o formato padrão não resolve.",
  },
];
