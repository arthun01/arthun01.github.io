export function initCustomCursor(): () => void {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return () => {};

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return () => {};

  let mouseX = -100;
  let mouseY = -100;
  let currentX = -100;
  let currentY = -100;
  let rafId: number;

  function onPointerMove(e: PointerEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onPointerOver(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    const isInteractive = !!target?.closest('a, button, .project-card, [role="button"], input, textarea');
    cursor?.classList.toggle('active', isInteractive);
  }

  function loop() {
    currentX += (mouseX - currentX) * 0.22;
    currentY += (mouseY - currentY) * 0.22;
    cursor!.style.transform = `translate(${currentX}px, ${currentY}px)`;
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('mouseover', onPointerOver, { passive: true });
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('mouseover', onPointerOver);
  };
}
