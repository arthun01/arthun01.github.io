# 03 — Arquitetura Técnica & Stack

> Decisões de stack, ferramentas de compilação, pipeline de animações e deploy.
> Atualizado com base nas decisões de [respostas-1.md](./respostas-1.md).

---

## 1. Stack Oficial Selecionada

| Tecnologia | Função | Justificativa |
|---|---|---|
| **Vite** | Bundler e Dev Server | Inicialização instantânea, Hot Module Replacement (HMR) e build minificado e otimizado para produção. |
| **TypeScript** | Linguagem Principal | Tipagem estrita de dados dos projetos, contratos de componentes e manipulação segura de eventos de DOM/Canvas. |
| **CSS Moderno Modular** | Estilização | Tokens nativos via variáveis CSS (`:root`), sintaxe de nesting padrão, sem o peso desnecessário de frameworks utilitários. |
| **GSAP (Core + ScrollTrigger)** | Orquestração de Animações | Ideal para a transição complexa do Hero para a Navbar, pinned sections e triggers precisos de scroll. |
| **Canvas 2D Nativo** | Fundo Dither Bayer 8x8 | Renderização direta via buffer `ImageData` a 30 fps com consumo mínimo de processador. |

---

## 2. Estratégia Híbrida de Animações ("O Melhor dos Dois Mundos")

1. **Canvas & Micro-efeitos Nativos (Zero Overhead):**
   - O dither Bayer roda em um canvas nativo 2D dentro de `requestAnimationFrame`.
   - Cursores e sublinhados interativos continuam com CSS puro para resposta com latência zero.
2. **GSAP + ScrollTrigger (Orquestração de Alto Nível):**
   - Transição do título do Hero ("Arthur Ramos Vieira") para a barra de navegação superior (`position: fixed`).
   - Revelação dos cards de projeto e itens da linha do tempo da experiência conforme entram no viewport.
   - Gerenciamento limpo com `gsap.context()` ou `ScrollTrigger.matchMedia()` respeitando `prefers-reduced-motion`.

---

## 3. Estrutura de Diretórios da Aplicação

```
portfolio/
├── ai-sdd/                      # Especificações formais AI-SDD
│   ├── README.md
│   ├── 01-vision-and-scope.md
│   ├── 02-design-system.md
│   ├── 03-architecture-and-tech-stack.md
│   ├── 04-features-and-interactions.md
│   ├── 05-content-and-assets.md
│   ├── 06-roadmap-and-tasks.md
│   └── respostas-1.md           # Histórico de respostas do usuário
├── public/                      # Assets estáticos
│   ├── favicon.svg              # Símbolo do Astrolábio
│   ├── perfil.png               # Foto de perfil de Arthur Ramos Vieira
│   └── og-image.png             # Imagem para Open Graph / redes sociais
├── src/
│   ├── data/
│   │   ├── projects.ts          # Dados dos 4 projetos (título, convite, descrição, links, stack)
│   │   └── experience.ts        # Dados da linha do tempo profissional
│   ├── scripts/
│   │   ├── canvas-dither.ts     # Loop Bayer 8x8 otimizado e suave
│   │   ├── hero-navbar.ts       # Transição GSAP do nome para o header
│   │   ├── project-modal.ts     # Abertura em círculo clip-path e acessibilidade
│   │   ├── theme-toggle.ts      # Alternador de tema dark/light
│   │   └── dither-photo.ts      # Shading/processamento dither da foto de perfil
│   ├── styles/
│   │   ├── tokens.css           # Variáveis de cor, tipografia e espaçamento
│   │   ├── base.css             # Reset, seleções, scrollbar e utilitários
│   │   ├── navbar.css           # Header fixo e transição
│   │   ├── hero.css             # Seção de apresentação
│   │   ├── cards.css            # Grade de cards de projeto
│   │   ├── modal.css            # Janela modal circular
│   │   ├── experience.css       # Seção de experiência profissional
│   │   └── about.css            # Seção sobre e foto
│   └── main.ts                  # Ponto de entrada da aplicação
├── index.html                   # HTML base com marcação semântica e SEO
├── package.json
├── tsconfig.json
└── vite.config.ts               # Configuração com base './' para GitHub Pages
```

---

## 4. Estratégia de Deploy no GitHub Pages

- **Vite Config:** `base: './'` ou `/portfolio/` para garantir carregamento de caminhos relativos em subdiretórios do GitHub Pages.
- **Build Output:** Pasta `dist/`.
- **Workflow Automático:** Ação do GitHub Actions (`.github/workflows/deploy.yml`) para compilar e publicar automaticamente a cada push na branch principal.
