import { renderClassicalArtwork } from './classical-art.ts';

export function initDitherCanvas(): () => void {
  const canvas = document.getElementById('dither-canvas') as HTMLCanvasElement | null;
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d', { willReadFrequently: false });
  if (!ctx) return () => {};

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build Bayer 8x8 Matrix
  function createBayerMatrix(size: number): number[][] {
    let matrix: number[][] = [[0]];
    while (matrix.length < size) {
      const s = matrix.length;
      const result: number[][] = [];
      for (let y = 0; y < s * 2; y++) result[y] = [];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const v = matrix[y][x] * 4;
          result[y][x] = v;
          result[y][x + s] = v + 2;
          result[y + s][x] = v + 3;
          result[y + s][x + s] = v + 1;
        }
      }
      matrix = result;
    }
    return matrix;
  }

  const BAYER_8X8 = createBayerMatrix(8);

  let isMobile = window.innerWidth <= 768;
  // High-definition pixel pitch on mobile (1.5 for high-DPR screens) for realistic, fine micro-engraving
  let scaleFactor = isMobile ? (window.devicePixelRatio >= 2 ? 1.5 : 2) : 2;
  let bufferWidth = Math.ceil(window.innerWidth / scaleFactor);
  let bufferHeight = Math.ceil(window.innerHeight / scaleFactor);
  let imageData = ctx.createImageData(bufferWidth, bufferHeight);
  let pixels = imageData.data;

  // Offscreen Artwork Buffer for Master Golden Ratio Blueprint
  const artCanvas = document.createElement('canvas');
  const artCtx = artCanvas.getContext('2d', { willReadFrequently: true });
  let artPixels: Uint8ClampedArray = new Uint8ClampedArray(0);

  function updateArtwork() {
    if (!artCtx) return;
    artCanvas.width = bufferWidth;
    artCanvas.height = bufferHeight;
    renderClassicalArtwork(artCtx, bufferWidth, bufferHeight, isMobile);
    const artData = artCtx.getImageData(0, 0, bufferWidth, bufferHeight);
    artPixels = artData.data;
  }

  function handleResize() {
    isMobile = window.innerWidth <= 768;
    scaleFactor = isMobile ? (window.devicePixelRatio >= 2 ? 1.5 : 2) : 2;
    bufferWidth = Math.ceil(window.innerWidth / scaleFactor);
    bufferHeight = Math.ceil(window.innerHeight / scaleFactor);
    canvas!.width = bufferWidth;
    canvas!.height = bufferHeight;
    imageData = ctx!.createImageData(bufferWidth, bufferHeight);
    pixels = imageData.data;
    updateArtwork();
  }

  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });

  function isDarkTheme(): boolean {
    const custom = document.documentElement.dataset.theme;
    if (custom) return custom === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Pointer & Scroll State
  const pointer = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.5,
    lastMoved: performance.now(),
    scrollProgress: 0,
  };

  function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    pointer.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  function onPointerMove(e: PointerEvent) {
    if (!isMobile) {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.lastMoved = performance.now();
    }
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  let animationFrameId: number;
  let lastTimestamp = 0;
  const targetFrameInterval = 32; // ~30 fps limit

  function render(time: number) {
    if (time - lastTimestamp < targetFrameInterval && !prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }
    lastTimestamp = time;

    let baseDensity: number;
    let radius: number;

    if (isMobile) {
      // Mobile: Light follows scroll vertically across the grand spiral
      pointer.targetX = window.innerWidth * 0.5;
      pointer.targetY = window.innerHeight * (0.28 + 0.44 * pointer.scrollProgress + 0.04 * Math.sin(time / 2800));

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      radius = Math.min(bufferWidth, bufferHeight) * 0.72;
      baseDensity = isDarkTheme() ? 0.26 : 0.19;
    } else {
      // Desktop: Generous interactive flashlight
      if (time - pointer.lastMoved > 2500) {
        // Idle: sweeps smoothly around the pole of the golden spiral
        const poleX = window.innerWidth * 0.55;
        const poleY = window.innerHeight * 0.48;
        pointer.targetX = poleX + window.innerWidth * 0.16 * Math.sin(time / 3400);
        pointer.targetY = poleY + window.innerHeight * 0.16 * Math.cos(time / 2600);
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.07;
      pointer.y += (pointer.targetY - pointer.y) * 0.07;

      radius = Math.min(bufferWidth, bufferHeight) * 0.62;
      baseDensity = isDarkTheme() ? 0.44 : 0.32;
    }

    const gx = pointer.x / scaleFactor;
    const gy = pointer.y / scaleFactor;

    // Clear buffer (all transparent)
    pixels.fill(0);

    const breathing = 0.95 + 0.05 * Math.sin(time / 2600);
    const k = baseDensity * breathing;

    const x0 = Math.max(0, (gx - radius) | 0);
    const x1 = Math.min(bufferWidth - 1, (gx + radius) | 0);
    const y0 = Math.max(0, (gy - radius) | 0);
    const y1 = Math.min(bufferHeight - 1, (gy + radius) | 0);

    // Crimson dot RGB: #95122C => (149, 18, 44)
    const cr = 149;
    const cg = 18;
    const cb = 44;

    // Highlight Crimson RGB: #E2566D => (226, 86, 109)
    const hlR = 226;
    const hlG = 86;
    const hlB = 109;

    for (let j = y0; j <= y1; j++) {
      const dy = j - gy;
      for (let i = x0; i <= x1; i++) {
        const dx = i - gx;
        const normalizedDist = Math.sqrt(dx * dx + dy * dy) / radius;
        if (normalizedDist >= 1) continue;

        // Flashlight beam falloff
        const spotlight = 0.5 * (1 + Math.cos(Math.PI * normalizedDist));

        // Sample blueprint luminance at (i, j)
        const artIdx = (j * bufferWidth + i) * 4;
        const artLuminance = artPixels[artIdx] ? artPixels[artIdx] / 255 : 0;

        // Soft ambient halo around the beam + sharp illumination of blueprint strokes
        const ambient = spotlight * (isMobile ? 0.14 : 0.20);
        const artIllumination = spotlight * artLuminance * 1.95;
        const totalIntensity = (ambient + artIllumination) * k * 1.15;

        // Bayer 8x8 threshold check
        const bayerVal = (BAYER_8X8[j & 7][i & 7] + 0.5) / 64;
        if (totalIntensity > bayerVal) {
          const q = (j * bufferWidth + i) * 4;

          // Highlight primary curves directly under the beam
          if (artLuminance > 0.65 && spotlight > 0.42 && !isMobile) {
            pixels[q] = hlR;
            pixels[q + 1] = hlG;
            pixels[q + 2] = hlB;
            pixels[q + 3] = 255;
          } else {
            pixels[q] = cr;
            pixels[q + 1] = cg;
            pixels[q + 2] = cb;
            pixels[q + 3] = 255;
          }
        }
      }
    }

    ctx!.putImageData(imageData, 0, 0);

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  animationFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', updateScrollProgress);
    window.removeEventListener('pointermove', onPointerMove);
  };
}
