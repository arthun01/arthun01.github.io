# 01 — Visão e Escopo

> Fonte consolidada da visão, posicionamento e escopo do portfólio pessoal.
> Atualizado com base em [respostas-1.md](./respostas-1.md), [consideracoes-1.md](./consideracoes-1.md) e [mudancas-2.md](./mudancas-2.md).

---

## 1. Identidade e Posicionamento

- **Nome:** Arthur Ramos Vieira
- **Monograma:** ARV
- **Perfil Profissional:** Estudante de Ciência da Computação, desenvolvedor Full Stack web focado no ecossistema Ruby on Rails no backend, e interfaces artesanais e polidas no frontend (HTML, CSS, TypeScript, Figma).
- **Vibe:** Minimalista, profissional, técnica e refinada ("noir quente com carmesim").
- **Diferencial:** Dev que constrói ponta a ponta — da modelagem de dados e arquitetura Rails ao acabamento fino de micro-interações e design visual.

---

## 2. Decisões de Design & Ajustes Críticos (Refinamento 2)

1. **Desativação do Círculo de Dithering no Mobile:**
   - **Problema:** Em telas móveis, sem o cursor do mouse para justificar o foco de luz, um círculo pontilhado estático no canto parecia uma mancha ou bug visual ("muito estranho").
   - **Decisão:** O canvas de dithering interativo com a luz carmesim agora é exclusivo para desktop (`hover: hover and pointer: fine`). No mobile, o fundo é limpo, sólido e ultra-nítido, garantindo legibilidade perfeita e acabamento elegante sem artefatos circulares.
2. **Botão Explícito de Fechar no Menu Mobile:**
   - Adicionado botão dedicado de fechar (`fechar ✕`) no topo do menu hambúrguer mobile, garantindo usabilidade imediata para fechar o overlay.
3. **Limpeza de Rótulos Desnecessários nas Seções:**
   - Removido o rótulo confuso `perfil` na seção "Sobre mim" e simplificados os metadados das seções para evitar ruído visual.
4. **Rodapé Mais Conciso:**
   - Removida a frase `código com acabamento` do rodapé. Fica apenas o copyright limpo `© 2026 Arthur Ramos Vieira` e o monograma `ARV`.

---

## 3. Delimitação de Escopo

### In Scope
- [x] Aplicação web Single Page com Vite + TypeScript + CSS modular.
- [x] Canvas interativo com dither Bayer 8x8 carmesim suave exclusivo para desktop (com mouse); mobile com fundo sólido de alto contraste.
- [x] Hero com reveal de **Arthur Ramos Vieira** e transição GSAP ScrollTrigger para a Navbar fixa.
- [x] Navbar desktop direta + Navbar mobile com menu hambúrguer animado e botão dedicado de fechar.
- [x] Grade de **Cards de Projetos** com modal circular (`clip-path: circle()`).
- [x] Seção de **Experiência** com a trajetória de estágio em Rails.
- [x] Seção **Sobre mim** limpa (sem rótulos secundários confusos) e foto de perfil.
- [x] Seção de **Contato** focada em cards diretos para GitHub, LinkedIn, Instagram e Currículo.
- [x] Footer minimalista com monograma `ARV` e copyright.
- [x] Botão toggle Dark/Light no desktop e no mobile com persistência.
- [x] Deploy automatizado no **GitHub Pages**.
