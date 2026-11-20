# DESIGN.md — Marca pessoal (dev full stack que desenha)

> Fonte da verdade para qualquer agente de IA que gere UI, páginas, componentes ou assets desta marca.
> Regras marcadas com **MUST** e **NEVER** são obrigatórias. O restante é preferência forte.
> Idioma do conteúdo e da interface: **pt-BR**.

## 1. Contexto da marca

- **Pessoa:** estudante de Ciência da Computação, estagiário em desenvolvimento Full Stack web (Ruby on Rails). Também trabalha o lado artístico com HTML, CSS, JavaScript/TypeScript e Figma.
- **Uso principal:** portfólio pessoal, perfis profissionais e materiais de apresentação.
- **Vibes (todas ao mesmo tempo):** moderna e minimalista, profissional e confiável, criativa e ousada.
- **Direção visual:** "noir quente com carmesim", com duas influências **sussurradas** (nunca literais): **dithering** e **medieval/manuscrito**.
  - Dithering = textura fina de pontos ordenados, como grão sofisticado.
  - Medieval = pitadas de erudição (numeração romana, inicial rubricada em itálico, linhas finas com losango). Nada de fantasia, pergaminho ou gótico pesado.
- **Tagline provisória:** `Código com acabamento_` (alternativa: `Dev que desenha`).
- **Pendente (não inventar):** nome real, iniciais, e-mail, projetos reais. Usar placeholders claros (`Seu Nome`, `hello@seudominio.dev`) até o usuário fornecer.

## 2. Paleta de cores

### Tokens (tema escuro, padrão da marca)

| Token | Hex | Papel |
|---|---|---|
| `--bg` | `#14110F` | Fundo principal (carvão quente) |
| `--surface` | `#1E1A18` | Cards e superfícies |
| `--border` | `#2E2825` | Bordas e linhas finas |
| `--text` | `#F2EBE4` | Texto principal (off-white quente) |
| `--muted` | `#A39A93` | Texto secundário |
| `--sand` | `#C8A98B` | Detalhes terrosos (muito pouco) |
| `--accent` | `#95122C` | Carmesim: botões, formas grandes, pontos do dither, fundos de destaque |
| `--accent-light` | `#E2566D` | Carmesim claro: texto de destaque, links, inicial rubricada, numerais romanos |
| `--pop` | `#FFB800` | Âmbar de impacto: detalhes minúsculos |

### Tema claro (branco quente + vinho)

| Token | Hex | Papel |
|---|---|---|
| `--bg` | `#FBF9F6` | Fundo branco quente (o creme `#FCE7D1` foi testado e descartado como fundo) |
| `--wine` | `#65010D` | Vinho profundo: texto, botão primário |
| `--text` | `#65010D` | Texto principal |
| `--muted` | `#8C5A55` | Texto secundário |
| `--border` | `#E8E0D8` | Linhas finas |
| `--accent` / link / numerais | `#95122C` | Carmesim |
| `--pop` | `#C98A00` | Âmbar escurecido (o `#FFB800` perde contraste no claro) |

Implementar com `:root` (claro), `@media (prefers-color-scheme: dark)` e `[data-theme="dark"]`, mantendo os mesmos nomes de token. O tema escuro é a identidade principal.

### Regras de uso

- **MUST** usar `--accent` (`#95122C`) em superfícies e pontos do dither, nunca em texto sobre fundo escuro (contraste ~2:1).
- **MUST** usar `--accent-light` (`#E2566D`) para qualquer texto colorido em carmesim sobre fundo escuro.
- `#65010D` sobre o fundo carvão é quase invisível (~1,4:1): usar só como camada de profundidade ou no tema claro.
- **MUST** tratar `--pop` como **cor de impacto**: no máximo ~2–3% da tela, só em detalhes minúsculos.
  - Permitido: ponto de status, cursor `_` no fim de títulos, losango dos divisores, `::selection`, sublinhado de e-mail em hover.
  - **NEVER** em botões, links, fundos grandes, textos longos, avisos ou erros (âmbar lê como "atenção").
- Contrastes de referência sobre `#14110F`: `--text` ~15:1, `--accent-light` ~5:1, `--pop` ~10:1. Vinho sobre branco quente: ~13:1.

### Descartados (não reintroduzir)

Magenta `#D1317F`, âmbar cobre `#E8893C`, lima `#C4E04F`/`#C8F032`, petróleo `#3FB8A5`, ciano `#2EE6D6`, azul elétrico `#5B7CFF`, amarelo `#FFD43B`, vermelho `#E5483C`.

## 3. Tipografia (todas gratuitas, Google Fonts)

| Papel | Família | Pesos | Uso |
|---|---|---|---|
| Display | **Syne** | 700, 800 | Títulos, nomes de projeto |
| Corpo | **DM Sans** | 400, 500 | Texto corrido, botões, UI |
| Mono | **JetBrains Mono** | 400 | Tags, rótulos, datas, legendas |
| Acento | **Cormorant Garamond** | 500 itálico | **Apenas** inicial rubricada e numerais romanos de lista |

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&family=Cormorant+Garamond:ital,wght@1,500&display=swap" rel="stylesheet">
```

```css
--font-display: 'Syne', system-ui, sans-serif;
--font-body: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
--font-accent: 'Cormorant Garamond', Georgia, serif;
```

### Escala

| Nível | Fonte / peso | Tamanho | Extras |
|---|---|---|---|
| Hero | Syne 800 | `clamp(44px, 11.5vw, 160px)` | `line-height .94`, `letter-spacing -.04em` |
| Título de seção/projeto | Syne 700 | `clamp(26px, 5.2vw, 64px)` | `line-height 1`, `letter-spacing -.02em` |
| Corpo | DM Sans 400 | `17px` | `line-height 1.6`, `max-width 44–60ch` |
| Rótulo/tag | JetBrains Mono 400 | `12–13px` | cor `--muted` |
| Numeral romano de lista | Cormorant 500 itálico | `22px` | cor `--accent-light` |

- **MUST** usar no máximo as 4 famílias acima. Cormorant só como acento, nunca em parágrafos nem títulos.
- **MUST** usar aspas e apóstrofos tipográficos no texto visível (`’ “ ”`) e aspas retas em código.

### Descartados

Blackletter/góticas (Jacquard 24, Jacquarda Bastarda, UnifrakturCook, Pirata One): ficaram pesadas e "grosseiras". Também: Times New Roman Condensed, Akzidenz-Grotesk, Lavonia Classy, August, CyGrotesk Key, Monument (comerciais), Libre Baskerville + Work Sans (genérica), Instrument Serif + Inter e Bricolage + Hanken (não escolhidas).

## 4. Estilo visual

- **Minimalismo:** muito espaço negativo, poucos elementos por tela, tipografia grande e confiante.
- **Linhas finas:** `1px solid var(--border)` separando blocos, em vez de caixas e sombras. **Sem sombras pesadas.**
- **Um destaque por seção:** no máximo um elemento carmesim forte por seção. Cantos de 8 a 14px.
- **Layout de projetos:** lista tipográfica em linhas (numeral romano, título grande, stack em mono, ano), não grade de cards.
- Largura máxima: 960–1200px. Margens laterais `clamp(20px, 4vw, 48px)`.

### Dithering (fino, nunca grosseiro)

- **MUST** usar dithering **ordenado Bayer 8x8**, pixel de **2px** (3px em telas < 700px), apenas para a luz carmesim do fundo e, opcionalmente, imagens pequenas.
- **NEVER** usar pixel maior que 3px, dither de 1 bit em áreas enormes, ou paletas de mais de 2 cores no dither.
- Pontos em `#95122C` sobre o fundo; pixels apagados ficam transparentes.

### Medieval (sussurro)

- Numeração romana em rótulos e listas: `I — projetos`, `II.`, `III.`; ano no topo como `MMXXVI`.
- **Inicial rubricada:** a primeira letra de um parágrafo importante em Cormorant itálico, cor `--accent-light`, ocupando 2–3 linhas. Usar no máximo uma por página.
- **Divisor:** linha fina com um pequeno losango `--pop` (6px, rotacionado 45°) ao centro.
- Opcional: esfera pontilhada dentro de anel graduado (estilo astrolábio) como elemento de marca/favicon.

### Anti-padrões: NEVER

- Blackletter, molduras duplas ornamentadas, textura de pergaminho, ícones de espada/escudo/coroa, tom "RPG".
- Gradientes roxo/azul, efeito aurora, blobs desfocados, glassmorphism generalizado.
- Fileira de 3 cards idênticos com ícone no topo.
- Selo/pílula "Novo" no hero; emojis como ícones.
- Neon espalhado; cor vibrante fora do uso de `--pop`.
- Hero genérico centralizado com dois botões iguais.

## 5. Componentes

```css
.btn-primary { background: var(--accent); color: var(--text); border-radius: 10px; padding: 11px 20px; font: 500 15px var(--font-body); }
.btn-primary:hover { background: #B01835; } /* tema claro: fundo #65010D, texto #FBF9F6 */

.btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); border-radius: 10px; padding: 11px 20px; }
.btn-ghost:hover { border-color: var(--accent-light); color: var(--accent-light); }

.tag { font: 400 12px var(--font-mono); color: var(--sand); border: 1px solid var(--border); border-radius: 6px; padding: 3px 9px; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }

/* Link de ação: texto + seta, sublinhado fino carmesim */
.link { font-weight: 500; border-bottom: 1px solid var(--accent-light); padding-bottom: 2px; } /* "Ver projetos →" */

.divider { display: flex; align-items: center; gap: 12px; }
.divider b { flex: 1; height: 1px; background: var(--border); }
.divider s { width: 6px; height: 6px; background: var(--pop); transform: rotate(45deg); }

.dropcap { float: left; font: italic 500 3.5em/.74 var(--font-accent); padding: .07em .1em 0 0; color: var(--accent-light); }

::selection { background: var(--pop); color: #14110F; }
:focus-visible { outline: 2px solid var(--pop); outline-offset: 4px; }
```

- Ponto de status pulsante `disponível para estágio` em `--pop` no topo.
- **MUST** manter `:focus-visible` visível em todo elemento interativo.

## 6. Fundo (dither carmesim animado)

O grão contínuo e o gradiente suave da primeira versão foram **substituídos** pelo dither fino. Valores aprovados:

| Parâmetro | Valor |
|---|---|
| Matriz | Bayer 8x8 |
| Pixel | 2px (3px em mobile) |
| Cor dos pontos | `#95122C` (transparente onde apagado) |
| Densidade no centro (`k`) | `0.55` no escuro, `0.40` no claro, com respiração `±8%` |
| Raio da luz | `min(largura, altura) * .5` (em pixels do canvas) |
| Intensidade | `v = (1 - d) * k * 1.1`; pixel aceso se `v > (bayer + .5)/64` |

### Comportamento

- Canvas `position: fixed; inset: 0; z-index: 0; pointer-events: none; image-rendering: pixelated`, com fade-in de ~2 s.
- A luz segue o cursor com interpolação `0.07`.
- **Idle** (2,5 s sem mover o ponteiro): orbita sozinha, centro em `x = w*(.25 + .5*p + .18*sin(t/3200))`, `y = h*(.4 + .22*cos(t/2400))`, onde `p` é o progresso do scroll. Garante vida no mobile.
- Limitar a ~30 fps e calcular só dentro da caixa do raio (desempenho).
- **MUST** respeitar `prefers-reduced-motion` (desenhar um quadro estático).

## 7. Movimento

- **Easings:** `cubic-bezier(.2, .8, .2, 1)` para entradas; `cubic-bezier(.77, 0, .18, 1)` para transições de tela.
- **Reveal no scroll:** `opacity 0 → 1` e `translateY(26px) → 0`, ~0.9 s, via `IntersectionObserver`.
- **Hero:** cada linha do título dentro de máscara `overflow: hidden`, o texto sobe de `translateY(112%)`.
- **Cursor customizado:** ponto âmbar de 10px com atraso suave, cresce sobre links e botões. **MUST** aparecer só com `(hover: hover) and (pointer: fine)`, mantendo o cursor nativo.
- **Lista de projetos:** no hover, os outros itens esmaecem (~0.32) e o ativo desliza para a direita.
- **Detalhe de projeto:** `clip-path: circle()` expandindo do ponto do clique até cobrir a tela; conteúdo entra com stagger; `Esc` e "fechar" recolhem.
- **Contínuos:** cursor `_` piscando, ponto de status pulsando, sublinhado âmbar do e-mail que se desenha no hover.
- **MUST** respeitar `prefers-reduced-motion: reduce`.

## 8. Voz e conteúdo

- Direta, curiosa, com um toque de humor. Frases curtas, verbos de ação.
- Exemplos: "Código com acabamento", "Dev que desenha", "Rails por baixo, interface cuidada por cima".
- Rótulos de seção em mono, minúsculos, com numeral romano: `I — projetos`.
- **NEVER** usar jargão vazio ("soluções inovadoras", "apaixonado por tecnologia").

## 9. Requisitos técnicos

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` e respeito a `env(safe-area-inset-*)`.
- Responsivo, sem rolagem horizontal; conteúdo largo rola dentro do próprio contêiner.
- HTML, CSS e JavaScript puros ou TypeScript; sem bibliotecas pesadas para animações simples.
- Fontes com fallback e `display=swap`.
- Acessibilidade: contraste AA, `aria-hidden` em camadas decorativas (canvas, cursor), foco visível, diálogo com foco gerenciado e `Esc`.

### Bloco CSS base

```css
:root {
  --bg: #14110F; --surface: #1E1A18; --border: #2E2825;
  --text: #F2EBE4; --muted: #A39A93; --sand: #C8A98B;
  --accent: #95122C; --accent-light: #E2566D; --pop: #FFB800;
  --wine: #65010D; --paper: #FBF9F6;
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --font-accent: 'Cormorant Garamond', Georgia, serif;
  --ease-out: cubic-bezier(.2, .8, .2, 1);
  --ease-in-out: cubic-bezier(.77, 0, .18, 1);
}
```

## 10. Ideias em aberto (não implementar sem confirmação)

- **Esfera pontilhada em anel graduado ("astrolábio")** como logo/favicon: foi uma das duas opções apresentadas; o usuário escolheu a mais discreta (sem a esfera), mas pode voltar.
- **Fotos do usuário com dithering de 1 bit** em carmesim sobre carvão, e transição de página por "dissolve" pontilhado.
- **Avatar 3D estilo "raposa da MetaMask":** `.glb` com Three.js ou `<model-viewer>`, girando a cabeça conforme o mouse. Com 6 fotos, fotogrametria não funciona bem; caminho recomendado: busto estilizado (Blender/Spline) ou efeito 2.5D trocando fotos conforme o cursor.
- **Monograma com iniciais** no lugar do provisório `{_}`; versões para redes sociais (avatar, banner).

## 11. Checklist rápido para agentes

- [ ] Fundo `#14110F` com dither Bayer 8x8 (2px, `k` 0.55), luz carmesim seguindo o cursor
- [ ] Syne nos títulos, DM Sans no corpo, JetBrains Mono nos detalhes, Cormorant só na inicial e nos numerais
- [ ] Numeração romana, linhas finas, divisor com losango; sem ornamentos pesados
- [ ] `--accent` só em superfícies/pontos; `--accent-light` em textos coloridos
- [ ] `--pop` (`#FFB800`) em no máximo 2–3% da tela e só em detalhes minúsculos
- [ ] Tema claro em branco quente `#FBF9F6` + vinho `#65010D` quando necessário
- [ ] Sem blackletter, gradientes roxos, glassmorphism, blobs ou cards idênticos
- [ ] Foco visível, contraste AA, `prefers-reduced-motion` respeitado, conteúdo em pt-BR
- [ ] Placeholders explícitos para nome, e-mail e projetos até o usuário fornecer
