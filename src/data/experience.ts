export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "estagio-rails",
    role: "Desenvolvedor Full Stack (Estágio)",
    company: "Desenvolvimento Web & Sistemas",
    period: "2024 — Presente",
    isCurrent: true,
    description: "Atuação no desenvolvimento e evolução de sistemas corporativos em Ruby on Rails e PostgreSQL. Responsável pela implementação de regras de negócio complexas, otimização de consultas ao banco de dados, integração de APIs e criação de interfaces responsivas com foco no cuidado aos detalhes visuais.",
    technologies: ["Ruby on Rails", "PostgreSQL", "Stimulus", "JavaScript", "HTML/CSS", "Git", "Figma"]
  }
];
