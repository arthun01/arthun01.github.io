# 05 — Conteúdo, Dados & Assets

> Central de conteúdos reais, links sociais e arquivos de imagem.
> Atualizado com base em [respostas-1.md](./respostas-1.md) e [consideracoes-1.md](./consideracoes-1.md).

---

## 1. Dados Pessoais e Identidade

| Campo | Valor Consolidado |
|---|---|
| **Nome** | Arthur Ramos Vieira |
| **Monograma** | ARV |
| **Contato Primário** | Links diretos: GitHub, LinkedIn, Instagram, Google Docs CV |
| **Papel Atual** | Desenvolvedor Full Stack Web (Estagiário) & Designer de Interface |

---

## 2. Redes e Links Externos (Destaque Principal na Seção Contato)

- **GitHub:** [github.com/arthun01](https://github.com/arthun01/)
- **LinkedIn:** [linkedin.com/in/arthurrv](https://www.linkedin.com/in/arthurrv/)
- **Instagram:** [instagram.com/arthurr_rv](https://www.instagram.com/arthurr_rv/)
- **Currículo Oficial:** [Google Docs CV](https://docs.google.com/document/d/1K0TmDi9gzG4nhRWF_hxtISBD_efV-XSmQQyAUFkX1RI/edit?usp=sharing)

---

## 3. Assets de Mídia

- **Foto de Perfil:** `public/perfil.png` (na seção Sobre).
- **Favicon:** `public/favicon.svg`.

---

## 4. Imagens e Screenshots dos Projetos (Modal)

- Configurado no arquivo [`src/data/projects.ts`](file:///home/arthurrv/Documentos/www/portfolio/src/data/projects.ts) através do campo `imageUrl`.
- Suporta logos, prints de tela, banners ou mockups de cada projeto.
- Quando o campo `imageUrl` for preenchido, a imagem será exibida em destaque com suas cores originais dentro do modal.
- Se o campo estiver vazio (`""`), o layout se adapta suavemente sem deixar espaços vazios.
