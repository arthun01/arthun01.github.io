/**
 * Renders the Master Golden Ratio (Proporção Áurea) Blueprint
 * Scaled grandly to encompass nearly the entire viewport width and height.
 * Features: Fibonacci spiral, nested golden rectangles, reciprocal diagonals,
 * harmonic subdivisions, concentric Phi circles, and architectural scale markings.
 */
export function renderClassicalArtwork(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isMobile = false
): void {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // Pure black base (0 luminance)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  const PHI = 1.6180339887;
  const isPortrait = height > width || isMobile;

  // Calculate master dimensions to fill ~92% of the viewport
  let rectW: number;
  let rectH: number;

  if (isPortrait) {
    // In portrait/mobile, orient the golden rectangle vertically to fill the phone screen
    rectW = width * 0.90;
    rectH = Math.min(height * 0.88, rectW * PHI);
  } else {
    // In landscape/desktop, fill almost the full screen width and height
    const screenAspect = width / height;
    if (screenAspect >= PHI) {
      // Screen is wider than golden ratio (e.g. 16:9, ultrawide)
      rectH = height * 0.88;
      rectW = rectH * PHI;
    } else {
      // Screen is squarer (e.g. 16:10, 4:3, or tablet)
      rectW = width * 0.92;
      rectH = rectW / PHI;
    }
  }

  // Centering
  const cx = width * 0.5;
  const cy = height * 0.5;
  const originX = cx - rectW * 0.5;
  const originY = cy - rectH * 0.5;

  ctx.strokeStyle = '#FFFFFF';
  ctx.fillStyle = '#FFFFFF';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // 1. Master Outer Golden Frame & Precision Marks
  ctx.lineWidth = 1.6;
  ctx.strokeRect(originX, originY, rectW, rectH);

  // Corner crosshairs & registration marks
  const cLen = Math.max(10, Math.min(width, height) * 0.02);
  ctx.save();
  ctx.lineWidth = 1.0;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  [
    [originX, originY],
    [originX + rectW, originY],
    [originX, originY + rectH],
    [originX + rectW, originY + rectH],
  ].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x - cLen, y);
    ctx.lineTo(x + cLen, y);
    ctx.moveTo(x, y - cLen);
    ctx.lineTo(x, y + cLen);
    ctx.stroke();
  });
  ctx.restore();

  // 2. Grand Nested Fibonacci Squares (up to 10 subdivisions for dense detail)
  interface RectBox {
    x: number;
    y: number;
    w: number;
    h: number;
  }

  let current: RectBox = { x: originX, y: originY, w: rectW, h: rectH };
  const squares: { x: number; y: number; size: number; corner: number }[] = [];

  ctx.save();
  ctx.lineWidth = 0.9;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';

  const steps = isPortrait ? 8 : 10;
  for (let step = 0; step < steps; step++) {
    const mod = step % 4;
    let s: number;

    if (mod === 0) {
      // Cut square on the left (or top in portrait)
      s = isPortrait ? current.w : current.h;
      if (isPortrait) {
        // Portrait vertical progression
        squares.push({ x: current.x, y: current.y, size: s, corner: 0 });
        ctx.strokeRect(current.x, current.y, s, s);
        current = { x: current.x, y: current.y + s, w: current.w, h: current.h - s };
      } else {
        squares.push({ x: current.x, y: current.y, size: s, corner: 0 });
        ctx.strokeRect(current.x, current.y, s, s);
        current = { x: current.x + s, y: current.y, w: current.w - s, h: current.h };
      }
    } else if (mod === 1) {
      s = isPortrait ? current.h : current.w;
      if (isPortrait) {
        squares.push({ x: current.x + current.w - s, y: current.y, size: s, corner: 1 });
        ctx.strokeRect(current.x + current.w - s, current.y, s, s);
        current = { x: current.x, y: current.y, w: current.w - s, h: current.h };
      } else {
        s = current.w;
        squares.push({ x: current.x, y: current.y, size: s, corner: 1 });
        ctx.strokeRect(current.x, current.y, s, s);
        current = { x: current.x, y: current.y + s, w: current.w, h: current.h - s };
      }
    } else if (mod === 2) {
      s = isPortrait ? current.w : current.h;
      if (isPortrait) {
        squares.push({ x: current.x, y: current.y + current.h - s, size: s, corner: 2 });
        ctx.strokeRect(current.x, current.y + current.h - s, s, s);
        current = { x: current.x, y: current.y, w: current.w, h: current.h - s };
      } else {
        squares.push({ x: current.x + current.w - s, y: current.y, size: s, corner: 2 });
        ctx.strokeRect(current.x + current.w - s, current.y, s, s);
        current = { x: current.x, y: current.y, w: current.w - s, h: current.h };
      }
    } else {
      s = isPortrait ? current.h : current.w;
      if (isPortrait) {
        squares.push({ x: current.x, y: current.y, size: s, corner: 3 });
        ctx.strokeRect(current.x, current.y, s, s);
        current = { x: current.x + s, y: current.y, w: current.w - s, h: current.h };
      } else {
        squares.push({ x: current.x, y: current.y + current.h - s, size: s, corner: 3 });
        ctx.strokeRect(current.x, current.y + current.h - s, s, s);
        current = { x: current.x, y: current.y, w: current.w, h: current.h - s };
      }
    }
  }
  ctx.restore();

  // 3. The Reciprocal Harmonic Diagonals (The "Eye of God" intersection)
  ctx.save();
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.setLineDash([4, 4]);

  // Main diagonal from corner to corner
  ctx.beginPath();
  ctx.moveTo(originX, originY + rectH);
  ctx.lineTo(originX + rectW, originY);
  ctx.stroke();

  // Reciprocal diagonal (perpendicular intersection at pole)
  if (isPortrait) {
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + rectW, originY + rectH);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(originX + rectH, originY);
    ctx.lineTo(originX + rectW, originY + rectH);
    ctx.stroke();
  }

  ctx.setLineDash([]);
  ctx.restore();

  // 4. Pole (Vortex) Calculation
  const poleX = isPortrait ? originX + rectW * 0.618 : originX + rectW * (1 - 1 / (PHI * PHI));
  const poleY = isPortrait ? originY + rectH * 0.382 : originY + rectH * (1 / PHI);

  // 5. Grand Logarithmic Spiral Sweeping Across Viewport
  ctx.save();
  ctx.lineWidth = 2.0;
  ctx.strokeStyle = '#FFFFFF';

  const b = Math.log(PHI) / (Math.PI / 2); // ~0.30635
  const a0 = Math.max(width, height) * 0.0035;
  // Increase thetaMax so the spiral gracefully sweeps across the full screen
  const thetaMax = isPortrait ? Math.PI * 4.9 : Math.PI * 5.2;

  ctx.beginPath();
  let first = true;
  for (let theta = 0; theta <= thetaMax; theta += 0.03) {
    const r = a0 * Math.exp(b * theta);
    const angle = isPortrait ? theta - Math.PI * 0.98 : theta - Math.PI * 0.48;
    const px = poleX + r * Math.cos(angle);
    const py = poleY - r * Math.sin(angle);

    if (first) {
      ctx.moveTo(px, py);
      first = false;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
  ctx.restore();

  // 6. Concentric Phi (Φ) Harmonic Rings
  ctx.save();
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';

  const maxRadius = Math.max(rectW, rectH) * 0.55;
  const phiRings = [
    maxRadius * 0.08,
    maxRadius * 0.146,
    maxRadius * 0.236,
    maxRadius * 0.382,
    maxRadius * 0.618,
    maxRadius * 1.0,
  ];

  phiRings.forEach((rad) => {
    ctx.beginPath();
    ctx.arc(poleX, poleY, rad, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Phi Vortex Center Crosshairs
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(poleX, poleY, 3, 0, Math.PI * 2);
  ctx.fill();

  const crossLen = 14;
  ctx.beginPath();
  ctx.moveTo(poleX - crossLen, poleY);
  ctx.lineTo(poleX + crossLen, poleY);
  ctx.moveTo(poleX, poleY - crossLen);
  ctx.lineTo(poleX, poleY + crossLen);
  ctx.stroke();
  ctx.restore();

  // 7. Panoramic Proportional Scale & Mathematical Notations
  ctx.save();
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.fillStyle = '#FFFFFF';

  // Bottom Scale Ruler spanning full width of the golden rectangle
  const rulerY = Math.min(height - 8, originY + rectH + 18);
  ctx.beginPath();
  ctx.moveTo(originX, rulerY);
  ctx.lineTo(originX + rectW, rulerY);
  ctx.stroke();

  // Fibonacci ratio tick marks along ruler
  const fibRatios = [0, 0.056, 0.09, 0.146, 0.236, 0.382, 0.618, 0.854, 1.0];
  fibRatios.forEach((ratio) => {
    const rx = originX + rectW * ratio;
    ctx.beginPath();
    ctx.moveTo(rx, rulerY - 5);
    ctx.lineTo(rx, rulerY + 5);
    ctx.stroke();
  });

  // Top Inscriptions
  const textY = Math.max(16, originY - 12);
  ctx.font = 'bold 16px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Φ = 1.6180339887...', originX + 6, textY);

  if (!isPortrait) {
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('1 · 1 · 2 · 3 · 5 · 8 · 13 · 21 · 34 · 55 · 89 · 144 · 233', originX + rectW - 270, textY);
  }

  ctx.restore();
  ctx.restore();
}
