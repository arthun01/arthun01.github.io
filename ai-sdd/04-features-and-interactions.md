# 04 — Funcionalidades e Interações

> Comportamento detalhado de cada componente, fluxo e coreografia visual.
> Atualizado com a nova especificação: "Animação de Escrita (Typewriter) do Nome no Hero".

---

## 1. Animação de Escrita (Typewriter) no Hero

O nome **Arthur Ramos Vieira** agora conta com uma **animação de digitação (typewriter) artesanal e fluida**:

- **Comportamento:**
  - O texto é digitado caractere a caractere com cadência rítmica natural (~45-55ms por letra), sem atrasos cansativos:
    1. Linha 1: Digita `Arthur`
    2. Linha 2: Digita `Ramos Vieira`
    3. Cursor de terminal âmbar `_` pisca continuamente ao final da digitação.
- **Gatilhos de Execução:**
  - **No carregamento inicial / refresh:** Inicia logo após a montagem do DOM.
  - **Ao rolar de volta para o topo (`onEnterBack`):** Sempre que o usuário rola a página para cima de volta à seção Hero, a digitação é reiniciada suavemente.
- **Acessibilidade & Zero CLS (Layout Shift):**
  - Contêineres de linha com altura mínima e `aria-label="Arthur Ramos Vieira"` no título para que leitores de tela leiam o nome completo sem interrupções.
  - Respeito a `prefers-reduced-motion`: exibe o texto imediatamente sem efeito de digitação.

---

## 2. Coreografia Hero ➔ Navbar Fixa

- Conforme o usuário rola a página para a próxima seção, a assinatura transiciona suavemente via GSAP ScrollTrigger para ancorar no canto superior esquerdo da Navbar fixa.
- Ao rolar para o topo, a assinatura da navbar desatracada e o Hero reativa a digitação do nome.
- No desktop: links diretos e alternador de tema.
- No mobile: menu hambúrguer animado com botão dedicado de fechar minimalista (`✕`), alinhado à direita e rótulo de tema conciso (`tema`).

---

## 3. Fundo Interativo: "A Espiral Áurea de Fibonacci"

- Espiral logarítmica monumental e retângulos de Fibonacci cobrindo ~92% da viewport.
- Lanterna volumétrica interativa no desktop que revela as linhas da espiral em dithering carmesim Bayer 8x8.
- No mobile: alta definição com pixels finos (DPR calibrado a 1.5/2.0), iluminando com suavidade conforme o scroll e garantindo acabamento realista de gravura sem blocos grossos.

---

## 4. Grade de Projetos, Modal, Experiência e Contato

- Cards de projetos responsivos com abertura circular (`clip-path: circle(160vmax)`).
- **Banner/Screenshot no Modal:** Exibição opcional de imagem/screenshot ou logo do projeto em suas cores e identidade originais (`imageUrl` no `projects.ts`), seguido de descrição técnica e botões.
- **Tipografia Proporcional:** Título do modal calibrado fluidamente (`clamp(24px, 4.2vw, 48px)`) com `word-break: break-word` e `overflow-wrap: break-word`, garantindo harmonia visual e zero quebras de layout mesmo com nomes compostos ou extensos (como "CaniveteFinanceiro").
- Botão de fechar do modal de projetos unificado com o botão da navbar (quadrado minimalista de 36px exibindo apenas o `✕`).
- Seção de experiência em linha do tempo com foco em Ruby on Rails.
- Seção Sobre Mim limpa com foto tratada.
- Grade de conexões diretas (GitHub, LinkedIn, Instagram e Currículo Google Docs).
- Rodapé minimalista com monograma `ARV` e `© 2026 Arthur Ramos Vieira`.
