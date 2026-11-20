# 06 — Roadmap e Backlog de Tarefas

> Plano de execução consolidado do AI-SDD.
> Atualizado após a conclusão do acabamento de alta definição no mobile e unificação do botão fechar.

---

## Sprint de Refinamento 5 (Alta Definição Mobile & Modal Fechar) — CONCLUÍDO 🟢
- [x] Calibrar escala de pixels no mobile em [src/scripts/canvas-dither.ts](file:///home/arthurrv/Documentos/www/portfolio/src/scripts/canvas-dither.ts):
  - Reduzido o bloco de pixel para alta definição (`scaleFactor = 1.5 a 2.0`), eliminando o aspecto granulado/grosso em telas de alta densidade (Retina/OLED).
  - A espiral de Fibonacci e os retângulos áureos agora se comportam como uma gravura de cobre de precisão microscópica.
- [x] Atualizar o botão de fechar do modal de projetos em [index.html](file:///home/arthurrv/Documentos/www/portfolio/index.html) e [src/styles/modal.css](file:///home/arthurrv/Documentos/www/portfolio/src/styles/modal.css):
  - Removido o texto "fechar", mantendo apenas o **`✕`** centralizado.
  - Estilizado como botão quadrado minimalista de 36x36px, idêntico ao da navbar mobile.
- [x] Preservar todas as alterações manuais do usuário em [index.html](file:///home/arthurrv/Documentos/www/portfolio/index.html) (`dev & curioso`, `perfil.jpg`).
- [x] Validar compilação e build sem erros (`npm run build` aprovado em 637ms).
