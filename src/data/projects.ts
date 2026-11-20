export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  stack: string[];
  year: string;
  summary: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string; // Caminho para a imagem/logo/mockup do projeto (ex: './projetos/painel.png')
}

export const projects: Project[] = [
  {
    id: "canivete-financeiro",
    index: "01",
    title: "CaniveteFinanceiro",
    tagline: "Ferramentas visuais e intuitivas para você planejar sua independência financeira. →",
    stack: ["HTML", "CSS", "Stimulus", "TypeScript"],
    year: "2026",
    summary: "Ferramentas visuais e intuitivas para você planejar seu patrimônio, traçar metas claras e acelerar sua independência financeira.",
    highlights: [
      "Design bonito e intuitivo.",
      "Resolve problemas reais de forma bem visual e analítica.",
      "Em constante atualização com novos simuladores e calculadoras."
    ],
    githubUrl: "https://github.com/arthun01/CaniveteFinanceiro",
    liveUrl: "https://arthurrv.me/CaniveteFinanceiro",
    imageUrl: "./projetos/app1.png"
  },
  {
    id: "game-qta",
    index: "02",
    title: "Game QTA",
    tagline: "Jogo de Direito Ambiental no estilo Duolingo →",
    stack: ["Paper", "Ruby on Rails", "Tailwind CSS", "PostgreSQL"],
    year: "2026",
    summary: "Jogo desenvolvido durante um projeto de extensão para servir de meio de ensino para estudantes da região com relação a conceitos de Direito Ambiental.",
    highlights: [
      "Cadastro e Login de Jogadores.",
      "Painel Administrativo para os professores.",
      "Sistema de pontuação e rankeamento dos jogadores."
    ],
    githubUrl: "https://github.com/arthun01/GameQTA",
    liveUrl: "",
    imageUrl: "./projetos/app2.png"
  },
  {
    id: "circuito-profissoes",
    index: "03",
    title: "Circuito de Profissões",
    tagline: "Landing page para apresentar o stand de Ciência da Computação →",
    stack: ["HTML5", "CSS", "Javascript", "Vercel"],
    year: "2025",
    summary: "Landing page focada em mostrar os projetos do stand de Ciência da Computação para os estudantes do ensino médio da região.",
    highlights: [
      "Design responsivo.",
      "Deploy na Vercel.",
      "Experiemntos de Computação."
    ],
    liveUrl: "https://circuito-profissoes-cic.vercel.app/",
    imageUrl: "./projetos/app3.png"
  },
  {
    id: "vidracaria-oliveira",
    index: "04",
    title: "Vidraçaria Oliveira",
    tagline: "Landing page para uma empresa regional →",
    stack: ["HTML", "CSS", "Javascript", "SEO"],
    year: "2025",
    summary: "Landing page para uma empresa regional especializada em vidros para ambientes internos.",
    highlights: [
      "Branding da Marca.",
      "Design Responsivo.",
      "SEO para melhor indexação na web."
    ],
    liveUrl: "https://oliveiravidracaria.com.br",
    imageUrl: "./projetos/app4.png"
  }
];
