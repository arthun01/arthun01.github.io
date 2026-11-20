import './styles/tokens.css';
import './styles/base.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/cards.css';
import './styles/modal.css';
import './styles/experience.css';
import './styles/about.css';
import './styles/contact.css';

import { initDitherCanvas } from './scripts/canvas-dither.ts';
import { initCustomCursor } from './scripts/cursor.ts';
import { initThemeToggle } from './scripts/theme-toggle.ts';
import { initProjectModal } from './scripts/project-modal.ts';
import { initHeroNavbarAnimation } from './scripts/hero-navbar.ts';
import { initMobileMenu } from './scripts/mobile-menu.ts';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initThemeToggle();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize interactive canvas background
  initDitherCanvas();

  // Initialize custom pointer
  initCustomCursor();

  // Initialize project details modal
  initProjectModal();

  // Initialize GSAP scroll animations & hero-to-navbar docking
  initHeroNavbarAnimation();

  // Trigger initial reveal animations
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => {
    document.body.classList.add('ready');
  }, prefersReduced ? 0 : 120);
});
