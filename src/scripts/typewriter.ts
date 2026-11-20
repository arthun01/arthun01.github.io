let isTyping = false;
let currentTimerIds: number[] = [];

export function playTypewriter(force = false): void {
  const line1El = document.getElementById('hero-line-1');
  const line2El = document.getElementById('hero-line-2');
  const cursorEl = document.getElementById('hero-cursor');

  if (!line1El || !line2El) return;

  const text1 = 'Arthur';
  const text2 = 'Ramos Vieira';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    line1El.textContent = text1;
    line2El.textContent = text2;
    return;
  }

  if (isTyping && !force) return;

  // Clear any existing typing timeouts
  currentTimerIds.forEach((id) => clearTimeout(id));
  currentTimerIds = [];

  isTyping = true;
  line1El.textContent = '';
  line2El.textContent = '';
  if (cursorEl) cursorEl.style.display = 'inline';

  const charDelay = 48; // ms per character (fluid & energetic)
  let totalDelay = 80;

  // Type line 1: "Arthur"
  for (let i = 0; i <= text1.length; i++) {
    const sub = text1.slice(0, i);
    const tid = window.setTimeout(() => {
      line1El.textContent = sub;
    }, totalDelay);
    currentTimerIds.push(tid);
    totalDelay += charDelay;
  }

  // Brief breathing pause between lines
  totalDelay += 140;

  // Type line 2: "Ramos Vieira"
  for (let i = 0; i <= text2.length; i++) {
    const sub = text2.slice(0, i);
    const tid = window.setTimeout(() => {
      line2El.textContent = sub;
      if (i === text2.length) {
        isTyping = false;
      }
    }, totalDelay);
    currentTimerIds.push(tid);
    totalDelay += charDelay;
  }
}
