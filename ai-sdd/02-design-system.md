# 02 — Design System & Tokens Visuais

> Diretrizes estéticas, paleta de cores, tipografia e tratamento gráfico.
> Atualizado com base em [respostas-1.md](./respostas-1.md), [consideracoes-1.md](./consideracoes-1.md) e [mudancas-2.md](./mudancas-2.md).

---

## 1. Paleta de Cores & Tokens

Mantidos os tokens consolidados para tema escuro e claro:
- Escuro: Fundo `#14110F`, Superfície `#1E1A18`, Bordas `#2E2825`, Texto `#F2EBE4`, Carmesim `#95122C`, Carmesim Claro `#E2566D`, Âmbar `#FFB800`.
- Claro: Fundo `#FBF9F6`, Superfície `#F2ECE4`, Bordas `#E8E0D8`, Texto `#65010D`, Âmbar Escurecido `#C98A00`.

---

## 2. Tipografia & Rótulos

- **Rótulos de Seção Limpos e Diretos:**
  - `projetos selecionados`
  - `trajetória profissional`
  - `sobre mim` (sem subtítulos ou tags redundantes como "perfil")
  - `conectar`

---

## 3. Comportamento do Dithering Canvas (Desktop vs Mobile)

- **Desktop (dispositivos com ponteiro fino e hover):**
  - O canvas renderiza a luz carmesim pontilhada suave que acompanha o cursor e respira em repouso.
- **Mobile (telas touch / dispositivos móveis):**
  - O canvas é desativado (`display: none`), permitindo que a tela móvel exiba a cor sólida de fundo (`#14110F` ou `#FBF9F6`), eliminando manchas circulares estáticas e priorizando 100% a leitura e a leveza.
